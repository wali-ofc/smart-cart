/**
 * Demand-forecast service for the seller AI Predictions tab (documentation.md F023).
 *
 * Hybrid design mirrored from chatService: a deterministic statistical core that
 * ALWAYS produces results (28-day sales aggregation → recency-weighted daily rate →
 * 7/30-day forecasts + trend + stock risk + template insights), plus an OPTIONAL
 * Ollama-generated natural-language briefing that degrades gracefully (never
 * fails the endpoint) when the local model is unavailable.
 */

const Product = require('../models/Product');
const Order = require('../models/Order');
const mongoose = require('mongoose');

// Ollama transport config — same env vars as the chat service.
const OLLAMA_BASE_URL = process.env.OLLAMA_BASE_URL || process.env.OLLAMA_HOST || 'http://localhost:11434';
const OLLAMA_MODEL = process.env.OLLAMA_MODEL || 'mystore-bot:latest';
const OLLAMA_FALLBACK_MODEL = process.env.OLLAMA_FALLBACK_MODEL || 'gemma3:1b';

const ACTIVE_ORDER_STATUSES = ['processing', 'shipped', 'delivered'];
const HISTORY_DAYS = 28; // rolling window the forecast is computed from

// Aggregation $match does NOT auto-cast — match both ObjectId and String values (sellerController pattern).
const sellerMatch = (sellerId) => {
  if (mongoose.Types.ObjectId.isValid(sellerId)) {
    return {
      $or: [
        { seller: new mongoose.Types.ObjectId(sellerId) },
        { seller: String(sellerId) }
      ]
    };
  }
  return { seller: sellerId };
};

// ---------------------------------------------------------------------------
// Pure forecast math (exported for unit tests)
// ---------------------------------------------------------------------------

/** Build a 0-filled per-day series for the last HISTORY_DAYS days, oldest → newest. */
function buildDailySeries(salesByDay, now = new Date()) {
  const series = [];
  for (let i = HISTORY_DAYS - 1; i >= 0; i--) {
    const d = new Date(now);
    d.setUTCDate(d.getUTCDate() - i);
    const key = d.toISOString().slice(0, 10);
    series.push({ date: key, units: (salesByDay && salesByDay.get(key)) || 0 });
  }
  return series;
}

/**
 * Recency-weighted average units/day over the full window. Weight halves every
 * 7 days going back, so recent behavior dominates while sparse older sales
 * still count. Used as the history floor for products with no recent sales.
 */
function weightedRate(series) {
  const n = series.length;
  let weightSum = 0;
  let unitsSum = 0;
  series.forEach((point, idx) => {
    const ageDays = n - 1 - idx; // 0 = newest day
    const w = Math.pow(0.5, ageDays / 7);
    weightSum += w;
    unitsSum += point.units * w;
  });
  return weightSum ? unitsSum / weightSum : 0;
}

/** Simple average units/day over the last 7 days (the primary demand signal). */
function recentRate(series) {
  const recent = series.slice(-7);
  if (!recent.length) return 0;
  return recent.reduce((s, p) => s + p.units, 0) / recent.length;
}

/**
 * Effective daily rate used for forecasting: the recent week wins when it has
 * demand; a good week is NOT diluted by earlier zero days (a product selling
 * 1/day for a week forecasts 7 units, not 4). The full-window weighted average
 * is the floor, so dormant products still decay toward their long-run average.
 */
function effectiveDailyRate(series) {
  return Math.max(recentRate(series), weightedRate(series));
}

/** Compare the last 7 days vs the previous 21; returns { trend, pct }. */
function trendOf(series) {
  const recent = series.slice(-7);
  const prev = series.slice(0, series.length - 7);
  const recentAvg = recent.length ? recent.reduce((s, p) => s + p.units, 0) / recent.length : 0;
  const prevAvg = prev.length ? prev.reduce((s, p) => s + p.units, 0) / prev.length : 0;
  if (prevAvg <= 0) {
    return { trend: recentAvg > 0 ? 'rising' : 'stable', pct: recentAvg > 0 ? 100 : 0 };
  }
  const pct = Math.round(((recentAvg - prevAvg) / prevAvg) * 100);
  return { trend: pct > 15 ? 'rising' : pct < -15 ? 'falling' : 'stable', pct };
}

/**
 * Inventory health classification.
 * levels: 'out' (no stock) | 'critical' (forecast exceeds stock) |
 *         'low' (less than ~6 weeks of cover) | 'ok' | 'over' (slow/overstocked)
 */
function classifyRisk(stock, rate, forecast30) {
  const daysOfStock = rate > 0 ? stock / rate : null;
  if (stock <= 0) return { level: 'out', daysOfStock: 0 };
  if (rate <= 0) return { level: 'over', daysOfStock: null }; // no recent demand
  if (forecast30 >= stock) return { level: 'critical', daysOfStock };
  if (daysOfStock <= 45) return { level: 'low', daysOfStock };
  if (daysOfStock >= 120) return { level: 'over', daysOfStock };
  return { level: 'ok', daysOfStock };
}

const round1 = (x) => Math.round(x * 10) / 10;

const AT_RISK_LEVELS = ['out', 'critical', 'low'];

function buildInsights(summary, forecasts) {
  const lines = [];
  if (summary.withSales === 0) {
    lines.push(
      'No sales in the last 28 days, so no demand forecast could be generated. ' +
      'Orders in processing/shipped/delivered status feed the model — once customers order, ' +
      'forecasts will appear here.'
    );
    return lines;
  }

  const top = forecasts[0]; // sorted by forecast30 desc
  lines.push(
    `${top.name} is your top predicted seller — about ${top.forecast30} units expected over the next 30 days.`
  );

  const rising = forecasts.filter((f) => f.trend === 'rising' && f.forecast30 > 0);
  if (rising.length) {
    lines.push(
      `Demand is rising for ${rising.slice(0, 3).map((f) => f.name).join(', ')}` +
      `${rising[0].trendPct > 0 ? ` (+${rising[0].trendPct}% week-over-week for ${rising[0].name})` : ''}.`
    );
  }

  const falling = forecasts.filter((f) => f.trend === 'falling' && f.forecast30 > 0);
  if (falling.length) {
    lines.push(
      `Demand has slowed for ${falling.slice(0, 3).map((f) => f.name).join(', ')} ` +
      `(${falling[0].trendPct}% week-over-week) — consider a promotion or refresh.`
    );
  }

  const atRisk = forecasts.filter((f) => AT_RISK_LEVELS.includes(f.risk));
  if (atRisk.length) {
    lines.push(
      `${atRisk.length === 1 ? 'One product' : `${atRisk.length} products`} may run out of stock within the forecast window: ` +
      `${atRisk.slice(0, 4).map((f) => f.name).join(', ')}. Consider restocking soon.`
    );
  }

  const dormant = forecasts.filter((f) => f.risk === 'over' && f.forecast30 === 0);
  if (dormant.length) {
    lines.push(
      `${dormant.slice(0, 4).map((f) => f.name).join(', ')} saw no sales in the last 28 days ` +
      `and may need promotion or removal from the catalog.`
    );
  }

  return lines;
}

const round2 = (x) => Math.round(x * 100) / 100;

// ---------------------------------------------------------------------------
// Optional AI narrative (Ollama) — never throws
// ---------------------------------------------------------------------------

function buildAIPrompt(summary, forecasts) {
  if (summary.withSales === 0) return null;

  const top = forecasts.slice(0, 5)
    .map((f, i) => `${i + 1}. ${f.name} — ${f.forecast30} units (30d), trend ${f.trend} (${f.trendPct}%)`)
    .join('\n');
  const atRisk = forecasts.filter((f) => AT_RISK_LEVELS.includes(f.risk));
  const riskText = atRisk.length
    ? atRisk.slice(0, 5).map((f) => `${f.name} (risk ${f.risk}, ${f.daysOfStock === null ? 'no demand' : `${Math.round(f.daysOfStock)} days of stock`})`).join(', ')
    : 'none';

  return `You are the analytics assistant for SmartCart, an e-commerce platform. A seller asked for a demand-forecast briefing.

COMPUTED STORE STATS (next 30 days):
- Forecast total: ${summary.totalForecast30} units (~$${round2(summary.totalRevenueForecast30)} revenue)
- Products analyzed: ${summary.productsAnalyzed} (${summary.withSales} with sales)
- Top predicted products:
${top}
- At-risk inventory: ${riskText}

INSTRUCTIONS:
Write a concise briefing for the seller (under 90 words, plain text, no markdown, no bullet points). Cover: the strongest predicted sellers, any at-risk inventory to restock, any slowing products, and ONE concrete recommendation (restock, promote, or refresh). Base everything ONLY on the stats above — never invent data. Respond now:`;
}

// See the note in chatService.callOllama: Ollama's default 5-minute keep_alive
// means a cold model can exceed this tighter 20s budget and silently blank the
// seller briefing. Pinning a long keep_alive keeps it resident so the briefing
// renders instead of dropping to aiAvailable: false.
const OLLAMA_KEEP_ALIVE = process.env.OLLAMA_KEEP_ALIVE || '30m';

async function callOllama(model, prompt) {
  const response = await fetch(`${OLLAMA_BASE_URL}/api/generate`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    signal: AbortSignal.timeout(20000),
    body: JSON.stringify({ model, prompt, stream: false, keep_alive: OLLAMA_KEEP_ALIVE })
  });
  if (!response.ok) throw new Error(`Ollama HTTP ${response.status}`);
  const data = await response.json();
  return String(data.response || '').trim();
}

async function tryAISummary(summary, forecasts) {
  const prompt = buildAIPrompt(summary, forecasts);
  if (!prompt) return null;
  for (const model of [OLLAMA_MODEL, OLLAMA_FALLBACK_MODEL]) {
    try {
      const text = await callOllama(model, prompt);
      if (text) return { text, available: true };
    } catch (err) {
      console.warn(`[predictions] Ollama ${model} unavailable: ${err.message}`);
    }
  }
  return { text: null, available: false };
}

// ---------------------------------------------------------------------------
// Main service
// ---------------------------------------------------------------------------

/**
 * GET /api/seller/predictions payload: per-product forecasts + store summary +
 * deterministic insights + optional AI briefing. Robust when the catalog is
 * empty or when nothing has sold.
 */
async function getPredictions(sellerId) {
  const since = new Date(Date.now() - HISTORY_DAYS * 24 * 60 * 60 * 1000);

  const [products, orderRows] = await Promise.all([
    Product.find({ seller: sellerId }).select('_id name image price category stock').lean(),
    Order.aggregate([
      {
        $match: {
          ...sellerMatch(sellerId),
          status: { $in: ACTIVE_ORDER_STATUSES },
          createdAt: { $gte: since }
        }
      },
      { $unwind: '$items' },
      {
        $group: {
          _id: {
            product: '$items.product',
            day: { $dateToString: { format: '%Y-%m-%d', date: '$createdAt' } }
          },
          units: { $sum: '$items.quantity' }
        }
      }
    ])
  ]);

  // salesByDay per product: Map<productId, Map<dateKey, units>>
  const byProduct = new Map();
  for (const row of orderRows) {
    const productId = String(row._id.product);
    const day = row._id.day;
    if (!byProduct.has(productId)) byProduct.set(productId, new Map());
    byProduct.get(productId).set(day, row.units);
  }

  const now = new Date();
  const forecasts = products.map((p) => {
    const series = buildDailySeries(byProduct.get(String(p._id)), now);
    const rate = effectiveDailyRate(series);
    const { trend, pct } = trendOf(series);
    const forecast7 = Math.round(rate * 7);
    const forecast30 = Math.round(rate * 30);
    const { level, daysOfStock } = classifyRisk(p.stock, rate, forecast30);
    return {
      _id: p._id,
      name: p.name,
      image: p.image,
      price: p.price,
      category: p.category,
      stock: p.stock,
      avgDailyUnits: round1(rate),
      trend,
      trendPct: pct,
      forecast7,
      forecast30,
      revenueForecast30: round2(p.price * forecast30),
      risk: level,
      daysOfStock: daysOfStock === null ? null : round1(daysOfStock)
    };
  });

  forecasts.sort((a, b) => b.forecast30 - a.forecast30);

  const withSales = forecasts.filter((f) => f.forecast30 > 0);
  const totalForecast7 = forecasts.reduce((s, f) => s + f.forecast7, 0);
  const totalForecast30 = forecasts.reduce((s, f) => s + f.forecast30, 0);
  const totalRevenueForecast30 = forecasts.reduce((s, f) => s + f.revenueForecast30, 0);
  const atRiskCount = forecasts.filter((f) => AT_RISK_LEVELS.includes(f.risk)).length;

  const summary = {
    productsAnalyzed: forecasts.length,
    withSales: withSales.length,
    totalForecast7,
    totalForecast30,
    totalRevenueForecast30: round2(totalRevenueForecast30),
    atRiskCount,
    topProducts: withSales.slice(0, 5).map((f) => ({
      _id: f._id,
      name: f.name,
      forecast30: f.forecast30
    }))
  };

  const insights = buildInsights(summary, forecasts);
  const ai = await tryAISummary(summary, forecasts);

  return {
    summary,
    products: forecasts,
    insights,
    aiAvailable: ai ? ai.available : false,
    aiSummary: ai ? ai.text : null,
    generatedAt: now.toISOString()
  };
}

module.exports = {
  getPredictions,
  buildDailySeries,
  weightedRate,
  recentRate,
  effectiveDailyRate,
  trendOf,
  classifyRisk,
  buildInsights,
  buildAIPrompt
};