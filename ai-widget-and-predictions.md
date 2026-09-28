# SmartCart — How the AI Widget Responds & How AI Predictions Work

> Deep-dive into the two "AI" features the examiner will ask about. Every snippet is real code from this repo — paths are clickable in VS Code.
>
> - **AI Widget (chatbot):** `client/src/components/common/ChatWidget.jsx` → `server/routes/chatRoutes.js` → `server/controllers/chatController.js` → `server/services/chatService.js` → `server/models/ChatSession.js`
> - **AI Predictions (seller):** `client/src/pages/seller/SellerAiPredictionsPage.jsx` → `server/controllers/sellerController.js` (`getPredictions`) → `server/services/predictionService.js`

**Shared DNA (lead with this):** both features are **hybrid** — a *deterministic core that always works* (regex intents / statistical forecasting) plus an *optional Ollama-generated narrative that degrades gracefully* when the local model is down. Neither feature ever fails the endpoint because the AI layer is unavailable; the AI just gets skipped.

---

# PART 1 — THE AI WIDGET: how a message becomes a response

## 1.1 Who it is & where it lives

- A floating button bottom-**right** of every page, mounted once in `App.jsx` (`<ChatWidget />`).
- **Signed-in users only** — the widget renders `null` when `useAuth().user` is falsy.
- Conversations persist **server-side** (`ChatSession`, MongoDB, TTL 30 days), so history survives reloads.

## 1.2 End-to-end flow (memorize this)

```
USER TYPES "how many orders do I have?"
   │
   ▼  ChatWidget.sendMessage()
POST /api/chat  { message }                          ← axios instance (baseURL '/api', withCredentials)
   │
   ▼  Express middleware chain (server/routes/chatRoutes.js)
   protect        → verifies JWT cookie → req.user.id        (401 if no/invalid token)
   chatLimiter    → 50 msgs / user / DAY                    (429 if exceeded)
   │
   ▼  chatController.sendMessage()
   validate message (required, ≤ 2000 chars) → chatService.getAIResponse(msg, userId)
   │
   ▼  chatService.getAIResponse()  ← THE HYBRID DECISION
   ├─ 1) INTENTS: try every regex in the INTENTS map
   │       → if a pattern matches → handleIntent() runs a DETERMINISTIC handler
   │         (queries MongoDB for REAL order/cart data, returns { reply, actions })
   │         → done. No AI involved. Fast, free, deterministic.
   │
   └─ 2) NO intent matched → Ollama path:
         buildAIPrompt(msg, realOrders, realCart, last 6 msgs)   ← injects REAL user context
         callOllama(OLLAMA_MODEL)    fetch POST /api/generate     (60s timeout)
         parseAIResponse(raw)        "Label|/url" lines → clickable action buttons
         on failure → retry once with OLLAMA_FALLBACK_MODEL → else ApiError(503)
   │
   ▼  chatService.saveMessage()   (fire-and-forget — user msg saved even if AI failed)
   ChatSession.findOneAndUpdate({user}, { $push: { messages: { $each: [user, ai], $slice: -50 } } }, { upsert: true })
   │
   ▼  HTTP 200 → ChatWidget
   appends { role: 'ai', text: data.reply, actions: data.actions } → renders bubble + buttons
```

## 1.3 The chat widget (client) — `ChatWidget.jsx`

**Sending a message:**

```jsx
const sendMessage = async (e) => {
  e.preventDefault();
  const text = input.trim();
  if (!text || loading) return;
  setInput('');
  setMessages((prev) => [...prev, { role: 'user', text }]);   // echo the user bubble
  setLoading(true);
  const controller = new AbortController();                    // enables the "Stop" button
  abortControllerRef.current = controller;
  try {
    const { data } = await api.post('/chat', { message: text }, { signal: controller.signal });
    setMessages((prev) => [...prev, { role: 'ai', text: data.reply, actions: data.actions || [] }]);
  } catch (err) {
    // CanceledError → "Generation stopped by user."  ·  else → err.response.data.error or generic fallback
  } finally {
    setLoading(false);
  }
};
```

**Hydrating history on mount** (so the widget opens with the last conversation):

```jsx
useEffect(() => {
  if (!user) return;
  api.get('/chat/history').then(({ data }) => {
    setMessages((data.messages || []).map((m) => ({
      role: m.sender === 'user' ? 'user' : 'ai',
      text: m.message,
      actions: m.actions || []
    })));
  }).catch(() => {});   // history is a nice-to-have — never block the widget on it
}, [user]);
```

**Action buttons** — the AI replies with optional `actions: [{ label, url }]`. The widget renders them as small buttons that navigate. Special case: there is **no `/login` or `/register` route** in this app, so those URLs open the Bootstrap modal instead of navigating (else it would 404).

```jsx
const handleActionClick = (url) => {
  const authTarget = url === '/register' ? 'register' : url === '/login' ? 'login' : null;
  if (authTarget) bootstrap.Modal.getOrCreateInstance(document.getElementById(authTarget)).show();
  else navigate(url);
};
```

**Clear chat** = wipe local state **and** `DELETE /api/chat/history` (so it stays gone after reload).

## 1.4 The controller — `chatController.js`

```js
exports.sendMessage = async (req, res) => {
  const { message } = req.body || {};
  if (!message || !String(message).trim()) throw new ApiError(400, 'Message is required');
  if (String(message).trim().length > 2000) throw new ApiError(400, 'Message too long (max 2000 characters)');

  const userId = req.user.id;                       // set by `protect`
  // Hybrid: deterministic intent handler OR Ollama fallback — both yield { reply, actions }
  const { reply, actions } = await chatService.getAIResponse(msg, userId);

  chatService.saveMessage(userId, msg, reply, actions).catch(console.error);  // persist, don't block response
  res.status(200).json({ success: true, reply, actions, timestamp: new Date().toISOString() });
};
```

## 1.5 The heart — `chatService.getAIResponse()` (hybrid decision)

```js
async getAIResponse(message, userId) {
  // ── PATH 1: deterministic intent matching (no AI needed) ──
  const detectedIntent = Object.entries(INTENTS)
    .find(([, regex]) => regex.test(message))?.[0];       // first regex that matches wins

  if (detectedIntent) {
    const result = await handleIntent(detectedIntent, message, userId);
    if (result) return result;                            // { reply, actions: [{type:'navigate',label,url}] }
  }

  // ── PATH 2: Ollama with real user context ──
  try {
    const orders  = await getOrders(userId, 10);          // REAL orders, populated with items
    const cart    = await getCartDetails(userId);         // REAL cart contents
    const history = await this.getChatHistory(userId);    // last messages for continuity
    const prompt = buildAIPrompt(message, orders, cart, history);
    const rawReply = await callOllama(OLLAMA_MODEL, prompt);
    const parsed = parseAIResponse(rawReply);
    if (!parsed.reply) throw new Error('Empty AI response');
    return parsed;
  } catch (error) {
    // graceful fallback: retry once with the small model
    try {
      const prompt = buildAIPrompt(message, await getOrders(userId, 10), await getCartDetails(userId), []);
      return parseAIResponse(await callOLLAMA(OLLAMA_FALLBACK_MODEL, prompt));
    } catch (fbErr) {
      throw new ApiError(503, 'AI assistant is unavailable right now. Please try again later.');
    }
  }
}
```

**Why the AI can't hallucinate your data:** the prompt injects the user's *actual* orders and cart (fetched from MongoDB), and instructs the model:

> "Answer based on the real order and cart data above. Do NOT fabricate orders or details… include its full_id in any action URL… under 120 words… If outside e-commerce, politely decline."

The `INTENTS` map is a set of **ordered** regexes — field-level patterns come before generic ones so "price of order #abc123" matches `orderPriceOf` before plain `specificOrder`. Deterministic handlers query the DB directly:

```js
case 'orderCount': {
  const orders = await getOrders(userId, 100);
  return {
    reply: orders.length
      ? `You have ${orders.length} order${orders.length !== 1 ? 's' : ''} in total.`
      : "You don't have any orders yet. Start shopping to place your first order!",
    actions: [{ type: 'navigate', label: 'View My Orders', url: '/orders' }]
  };
}
```

## 1.6 Ollama transport & response parsing

```js
async function callOllama(model, prompt) {
  const response = await fetch(`${OLLAMA_BASE_URL}/api/generate`, {   // http://localhost:11434
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    signal: AbortSignal.timeout(60000),
    body: JSON.stringify({ model, prompt, stream: false })
  });
  if (!response.ok) throw new Error(`Ollama HTTP ${response.status}`);
  return String((await response.json()).response || '').trim();
}

// The model emits navigation as "Label|/url" lines — we parse them into buttons:
function parseAIResponse(rawReply) {
  const actions = [], textLines = [];
  for (const line of rawReply.split('\n')) {
    const m = line.match(/^(.+?)\|(\/[^\s]+)$/);          // e.g. "View My Orders|/orders"
    if (m) actions.push({ type: 'navigate', label: m[1].trim(), url: m[2].trim() });
    else textLines.push(line);
  }
  return { reply: textLines.join('\n').trim(), actions: actions.slice(0, 3) };  // max 3 buttons
}
```

## 1.7 Rate limit & storage — `rateLimitMiddleware.js` + `ChatSession.js`

```js
const chatLimiter = rateLimit({
  windowMs: Number(process.env.RATE_LIMIT_WINDOW_MS) || 24 * 60 * 60 * 1000,  // 1 day
  limit: Number(process.env.RATE_LIMIT_MAX_REQUESTS) || 50,                    // 50 msgs
  keyGenerator: (req) => (req.user ? `user:${req.user.id}` : ipKeyGenerator(req)),  // per-user
  handler: (req, res) => res.status(429).json({ success: false,
    error: 'Daily message limit reached (50 messages/day). Please try again tomorrow.' })
});
```

```js
// ChatSession model — 30-day TTL, so old conversations self-delete
chatSessionSchema.index({ createdAt: 1 }, { expireAfterSeconds: 30 * 24 * 3600 });
// messages: [{ sender: 'user'|'ai', message, actions, timestamp }] — capped at last 50 via $slice:-50
```

**Env config:** `OLLAMA_BASE_URL` (`http://localhost:11434`), `OLLAMA_MODEL` (`smartcart-bot`), `OLLAMA_FALLBACK_MODEL` (`gemma3:1b`), `RATE_LIMIT_MAX_REQUESTS` / `RATE_LIMIT_WINDOW_MS`.

---

# PART 2 — AI PREDICTIONS: how the seller forecast is computed

## 2.1 The pitch

> **"For each product the seller owns, we forecast how many units will sell in the next 7 and 30 days — purely from the seller's own order history (last 28 days, only completed/in-transit orders). We also classify each product's stock health (out / critical / low / ok / over) and, when Ollama is available, generate a plain-English briefing on top. The math always runs; the AI text is optional."**

**Endpoint:** `GET /api/seller/predictions` (`protect` + `authorize('seller')`) → `sellerController.getPredictions` → `predictionService.getPredictions(sellerId)`.

## 2.2 The pipeline (one picture)

```
Seller's orders, last 28 days (status: processing | shipped | delivered)
   │
   ▼  Order.aggregate() [MONGO]
   $match   seller + status filter + createdAt >= now-28d
   $unwind  '$items'                       (one row per ordered line-item)
   $group   _id: { product, day(%Y-%m-%d) }  →  units: $sum quantity
   │
   ▼  buildDailySeries() — zero-filled 28-day series per product (oldest → newest)
   │
   ▼  Math (pure functions, exported & unit-testable):
   recentRate   = avg units/day over last 7 days          ← primary signal
   weightedRate = recency-weighted avg over 28 days       ← half-life: weight halves every 7 days
   rate         = MAX(recentRate, weightedRate)           ← effective daily rate
   │
   forecast7  = round(rate × 7)
   forecast30 = round(rate × 30)          revenueForecast30 = price × forecast30
   │
   ▼  trendOf(): compare last-7 avg vs previous-21 avg
   > +15% → rising | < -15% → falling | else → stable   (also % change)
   ▼  classifyRisk(stock, rate, forecast30):
   stock ≤ 0              → 'out'
   no recent demand       → 'over'
   forecast30 ≥ stock     → 'critical'
   daysOfStock ≤ 45       → 'low'          (daysOfStock = stock / rate)
   daysOfStock ≥ 120      → 'over'
   otherwise              → 'ok'
   │
   ▼  buildInsights() — deterministic bullet text (top seller, rising, slowing, at-risk, dormant)
   ▼  tryAISummary() — OPTIONAL Ollama briefing (never throws; try main model → fallback → null)
   │
   ▼  Response { summary, products[sort by forecast30 desc], insights, aiAvailable, aiSummary, generatedAt }
        ↓
   React page: 4 stat cards · AI Insights panel · recharts bar chart (top 10) · per-product table
```

## 2.3 The Mongo aggregation (the raw data)

```js
const orderRows = await Order.aggregate([
  {
    $match: {
      ...sellerMatch(sellerId),                  // seller is this seller (ObjectId or String)
      status: { $in: ['processing', 'shipped', 'delivered'] },   // ⭐ only "real" sales count
      createdAt: { $gte: since }                 // since = now − 28 days
    }
  },
  { $unwind: '$items' },                         // flatten cart lines into rows
  {
    $group: {
      _id: {
        product: '$items.product',
        day: { $dateToString: { format: '%Y-%m-%d', date: '$createdAt' } }
      },
      units: { $sum: '$items.quantity' }
    }
  }
]);
// → rows like { _id: { product: ObjectId, day: '2026-08-25' }, units: 3 }
```

Then rows are grouped into `Map<productId, Map<dateKey, units>>` for fast lookup per product.

## 2.4 The forecast math (the "how does it work" answer)

```js
// zero-filled 28-day daily series, oldest → newest
function buildDailySeries(salesByDay, now = new Date()) {
  const series = [];
  for (let i = HISTORY_DAYS - 1; i >= 0; i--) {          // HISTORY_DAYS = 28
    const d = new Date(now);
    d.setUTCDate(d.getUTCDate() - i);
    series.push({ date: d.toISOString().slice(0, 10), units: salesByDay?.get(key) || 0 });
  }
  return series;
}

// recency-weighted average: weight halves every 7 days going back
function weightedRate(series) {
  let weightSum = 0, unitsSum = 0;
  series.forEach((point, idx) => {
    const ageDays = series.length - 1 - idx;      // 0 = today
    const w = Math.pow(0.5, ageDays / 7);         // ⭐ 7-day half-life
    weightSum += w;
    unitsSum += point.units * w;
  });
  return weightSum ? unitsSum / weightSum : 0;
}

// primary signal: plain average of the last 7 days
function recentRate(series) {
  const recent = series.slice(-7);
  return recent.reduce((s, p) => s + p.units, 0) / recent.length;
}

// effective rate = MAX(recent, weighted) — a good week is NOT diluted by earlier zero days;
// dormant products still decay toward their long-run average (weighted floor)
function effectiveDailyRate(series) {
  return Math.max(recentRate(series), weightedRate(series));
}

// trend: last 7 days vs the previous 21 — ±15% band
function trendOf(series) {
  const recent = series.slice(-7);
  const prev = series.slice(0, series.length - 7);
  const recentAvg = recent.reduce((s, p) => s + p.units, 0) / recent.length;
  const prevAvg = prev.length ? prev.reduce((s, p) => s + p.units, 0) / prev.length : 0;
  if (prevAvg <= 0) return { trend: recentAvg > 0 ? 'rising' : 'stable', pct: recentAvg > 0 ? 100 : 0 };
  const pct = Math.round(((recentAvg - prevAvg) / prevAvg) * 100);
  return { trend: pct > 15 ? 'rising' : pct < -15 ? 'falling' : 'stable', pct };
}

// stock health classification
function classifyRisk(stock, rate, forecast30) {
  const daysOfStock = rate > 0 ? stock / rate : null;     // how many days current stock covers
  if (stock <= 0)          return { level: 'out',       daysOfStock: 0 };
  if (rate <= 0)           return { level: 'over',      daysOfStock: null };   // no recent demand
  if (forecast30 >= stock) return { level: 'critical',  daysOfStock };
  if (daysOfStock <= 45)   return { level: 'low',       daysOfStock };
  if (daysOfStock >= 120)  return { level: 'over',      daysOfStock };         // overstocked
  return { level: 'ok', daysOfStock };
}
```

**Design choice worth explaining:** the projection is deliberately *conservative* and explainable — `forecast = rate × horizon` (no fancy ML) — so a seller (or examiner) can verify every number by hand. The "smart" parts are the **recency weighting** and the **risk classification**; the AI layer only narrates the numbers, never computes them.

## 2.5 The optional AI briefing (graceful degradation)

```js
function buildAIPrompt(summary, forecasts) {
  // hands the model ONLY the computed stats: totalForecast30, top 5 products,
  // at-risk inventory list → then instructs:
  // "Write a concise briefing for the seller (under 90 words, plain text, no markdown).
  //  Cover: strongest predicted sellers, at-risk inventory, slowing products, and ONE
  //  concrete recommendation (restock, promote, or refresh). Base everything ONLY on
  //  the stats above — never invent data."
}

async function tryAISummary(summary, forecasts) {
  const prompt = buildAIPrompt(summary, forecasts);
  if (!prompt) return null;                                   // no sales → no briefing at all
  for (const model of [OLLAMA_MODEL, OLLAMA_FALLBACK_MODEL]) { // try main, then fallback
    try {
      const text = await callOllama(model, prompt);           // 20s timeout (lighter than chat)
      if (text) return { text, available: true };
    } catch (err) {
      console.warn(`[predictions] Ollama ${model} unavailable: ${err.message}`);
    }
  }
  return { text: null, available: false };                     // ⭐ endpoint still succeeds
}
```

If Ollama is down, the client just doesn't get the green **AI-GENERATED** badge — the numbers, insights, and table still render.

## 2.6 Deterministic insights (always present) — `buildInsights()`

Generated as bullet lines from the computed forecasts:

1. **Top seller** — "`{name}` is your top predicted seller — about `{n}` units expected over the next 30 days."
2. **Rising** — demand rising for up to 3 products (+week-over-week % for the first).
3. **Falling** — demand slowed for up to 3 products → *"consider a promotion or refresh."*
4. **At risk** — "`{n}` products may run out of stock within the forecast window: … Consider restocking soon."
5. **Dormant** — products with zero sales in 28 days → *"may need promotion or removal from the catalog."*
6. Special case: **no sales at all** → explanatory message ("Orders in processing/shipped/delivered status feed the model…").

## 2.7 The page that renders it — `pages/seller/SellerAiPredictionsPage.jsx`

```jsx
// fetch once on mount (seller role only)
api.get('/seller/predictions').then(({ data: res }) => setData(res.data || null));

const { summary, products, insights, aiAvailable, aiSummary } = data;

// 4 stat cards upfront
cards = [
  { label: "30-Day Forecast", value: `${summary.totalForecast30} units` },
  { label: "7-Day Forecast",  value: `${summary.totalForecast7} units` },
  { label: "Est. Revenue (30d)", value: `$${summary.totalRevenueForecast30.toFixed(2)}` },
  { label: "At-Risk Products", value: summary.atRiskCount },
];

// bar chart: top 10 products by forecast30 (recharts, horizontal bars)
const chartData = products.filter((p) => p.forecast30 > 0).slice(0, 10)
  .map((p) => ({ name: p.name.length > 24 ? `${p.name.slice(0, 24)}…` : p.name, units: p.forecast30 }))
  .reverse();                              // reverse → biggest bar on top
<BarChart data={chartData} layout="vertical">
  <XAxis type="number" allowDecimals={false} />
  <YAxis type="category" dataKey="name" width={150} />
  <Tooltip formatter={(v) => [`${v} units`, "Predicted demand (30d)"]} />
  <Bar dataKey="units" fill="#4e7c58" radius={[0, 4, 4, 0]} barSize={16} />
</BarChart>
```

Per-product table columns: **Product · Price · Avg/Day · Trend · 7-Day · 30-Day · Stock · Stock Health**, with color-coded badges defined in the page:

```js
const TREND_COLOR = { rising: "#198754", falling: "#dc3545", stable: "#6c757d" };   // green/red/grey
const RISK_COLOR  = { out: "#dc3545", critical: "#dc3545", low: "#fd7e14",
                      ok: "#198754", over: "#6c757d" };
// Stock Health shows e.g. "Low stock" + "~23 days of stock" under the badge
```

Empty states handled gracefully: no sales yet → "forecasts will appear once customers place orders" (+ button to `/seller/products`); no products → "Add your first product".

---

## Part 3 — Comparison table (quick viva answers)

| | AI Widget (chat) | AI Predictions |
|---|---|---|
| Who | signed-in **customers** | **sellers** |
| Endpoint | `POST /api/chat` | `GET /api/seller/predictions` |
| Deterministic core | regex intent map → queries orders/cart | 28-day order aggregation → forecast math |
| AI layer | Ollama chat with real order/cart context | Ollama briefing of computed stats |
| Rate limited | yes — 50/user/day | no (computed server-side, cached per request) |
| Storage | ChatSession (TTL 30d, last 50 msgs) | none — computed on demand |
| Failure mode | fallback model → 503 if both down | briefing skipped, numbers still served |
| Timeout | 60 s | 20 s |
| Model env vars (`OLLAMA_*`) | same | same |

**One-liner for the examiner:** *"Both features implement the same philosophy — a deterministic engine that always works, with an optional local-LLM narrative layered on top that never breaks the feature when it's unavailable."*