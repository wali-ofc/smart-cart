const ChatSession = require('../models/ChatSession');
const Order = require('../models/Order');
const User = require('../models/User');
const ApiError = require('../utils/ApiError');

const OLLAMA_BASE_URL = process.env.OLLAMA_BASE_URL || 'http://localhost:11434';
const OLLAMA_MODEL = process.env.OLLAMA_MODEL || 'smartcart-bot';
const OLLAMA_FALLBACK_MODEL = process.env.OLLAMA_FALLBACK_MODEL || 'gemma3:1b';

// ---------------------------------------------------------------------------
// Intent patterns — order matters: specific/field-level patterns BEFORE the
// generic ones so the best match wins (e.g. `price of order #x` before `order #x`).
// ---------------------------------------------------------------------------
const INTENTS = {
  // Order intents
  orderCount:       /\b(how\s+many\s+orders|total\s+orders|number\s+of\s+orders|order\s+count|count\s+(of\s+)?(my\s+)?orders?)\b/i,
  orderTotal:       /\b(total\s+(spent|price|cost|amount)|how\s+much\s+(have\s+i\s+)?spent|total\s+spending|spending\s+total)\b/i,
  orderPriceOf:     /\b(price|cost|total|amount)\s+(of\s+)?order\s*#?\s*([a-f0-9]{6,24})\b/i,
  orderStatusOf:    /\b(status|state|where|update|track)\s+(of\s+)?order\s*#?\s*([a-f0-9]{6,24})\b/i,
  orderNameOf:      /\b(what('s|\s+is)\s+)?(in\s+)?order\s*#?\s*([a-f0-9]{6,24})|items?\s+in\s+order\s*#?\s*([a-f0-9]{6,24})\b/i,
  specificOrder:    /\border\s*#?\s*([a-f0-9]{6,24})\b/i,
  orderStatus:      /\b(where\s+(is|are)\s+my|track|status\s+of|how\s+is|update\s+on)\s+(order|delivery|package)/i,
  myOrders:         /\b(my\s+orders?|order\s+history|show\s+(my\s+)?orders?|view\s+(my\s+)?orders?|all\s+orders?|list\s+(my\s+)?orders?)\b/i,

  // Cart intents
  cartCount:        /\b(how\s+many\s+items?\s+(in\s+)?(my\s+)?cart|cart\s+count|number\s+of\s+items?\s+in\s+cart|items?\s+(in\s+)?(my\s+)?cart)\b/i,
  cartTotal:        /\b(cart\s+total|total\s+price\s+of\s+cart|how\s+much\s+is\s+(my\s+)?cart|cost\s+of\s+(my\s+)?cart|what('?s|\s+is)\s+my\s+cart\s+total)\b/i,
  cart:             /\b(my\s+cart|view\s+cart|cart\s+contents?|open\s+cart|go\s+to\s+cart)\b/i,

  // Navigation
  shop:             /\b(browse|shop|products?|catalog|go\s+to\s+shop|view\s+products?|show\s+products?|see\s+products?)\b/i,
  home:             /\b(go\s+home|homepage|main\s+page)\b/i,
  profile:          /\b(my\s+account|profile|account\s+settings|edit\s+(my\s+)?profile)\b/i,

  // Platform info
  help:             /\b(hello|hi|hey|what\s+can\s+you\s+do|help|how\s+does\s+this\s+work|commands?|options?)\b/i,
  sellOnPlatform:   /\b(how\s+to\s+sell|become\s+a\s+seller|sell\s+(on|my)|start\s+selling|selling\s+on|sell\s+products?)\b/i,
  deliveryJob:      /\b(become\s+a\s+delivery|delivery\s+(driver|job|work)|how\s+to\s+deliver|deliver\s+for|delivering\s+on)\b/i,
  shippingPolicy:   /\b(ship(ing)?\s+(policy|info|details|time)|delivery\s+(policy|time|info|details)|how\s+long\s+(does|is)\s+(delivery|shipping)|when\s+will\s+(my\s+order|i\s+get\s+my))\b/i,
  returnPolicy:     /\b(return\s+policy|refund|exchange|send\s+back|money\s+back)\b/i,
  paymentMethods:   /\b(payment\s+(method|option|way)|how\s+(do\s+)?(can\s+)?(i\s+)?pay|pay\s+with|accepted\s+payment|card\s+accepted)\b/i,
  contactSupport:   /\b(contact\s+support|customer\s+service|reach\s+support|help\s+desk|get\s+help|talk\s+to\s+(a\s+)?human|support\s+email)\b/i,
};

// ---------------------------------------------------------------------------
// Data helpers
// ---------------------------------------------------------------------------
async function getOrders(userId, limit = 10) {
  try {
    return await Order.find({ user: userId })
      .populate('items.product', 'name image price')
      .sort({ createdAt: -1 })
      .limit(limit)
      .lean();
  } catch (err) {
    console.error('Failed to fetch orders:', err.message);
    return [];
  }
}

async function findOrderByIdentifier(userId, identifier) {
  try {
    const mongoose = require('mongoose');
    if (mongoose.Types.ObjectId.isValid(identifier) && identifier.length === 24) {
      const order = await Order.findOne({ _id: identifier, user: userId })
        .populate('items.product', 'name image price')
        .lean();
      if (order) return order;
    }
    // Fall back to short-ID match: full _id ends with the identifier.
    const orders = await Order.find({ user: userId })
      .populate('items.product', 'name image price')
      .sort({ createdAt: -1 })
      .lean();
    return orders.find((o) => o._id.toString().slice(-identifier.length) === identifier.toLowerCase()) || null;
  } catch (err) {
    console.error('Failed to find order:', err.message);
    return null;
  }
}

async function getCartDetails(userId) {
  try {
    const user = await User.findById(userId)
      .populate('cart.product', 'name price image stock')
      .lean();
    return user?.cart || [];
  } catch (err) {
    console.error('Failed to fetch cart:', err.message);
    return [];
  }
}

function statusLabel(s) {
  const map = { pending: 'Pending', processing: 'Processing', shipped: 'Shipped', delivered: 'Delivered', cancelled: 'Cancelled' };
  return map[s] || s;
}

function shortId(o) {
  return o._id.toString().slice(-6);
}

function formatSingleOrder(o) {
  const date = new Date(o.createdAt).toLocaleDateString('en-US', {
    year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit'
  });
  const items = (o.items || []).map((it) =>
    `  - ${it.name || 'Unknown'} x${it.quantity} @ $${Number(it.price).toFixed(2)} = $${(it.price * it.quantity).toFixed(2)}`
  ).join('\n');
  const addr = o.shipping_address
    ? `${o.shipping_address.street}, ${o.shipping_address.city}, ${o.shipping_address.state} ${o.shipping_address.zip_code}, ${o.shipping_address.country}`
    : 'N/A';

  return `Order #${shortId(o)}
Status: ${statusLabel(o.status)}
Placed: ${date}
Payment: ${o.payment_method || 'N/A'}
Items:
${items}
Subtotal: $${Number(o.items_price || 0).toFixed(2)}
Total: $${Number(o.total_price || 0).toFixed(2)}
Shipping Address: ${addr}
${o.notes ? `Notes: ${o.notes}` : ''}`;
}

// ---------------------------------------------------------------------------
// Deterministic intent handlers (no AI needed)
// ---------------------------------------------------------------------------
async function handleIntent(intent, message, userId) {
  switch (intent) {
    case 'orderCount': {
      const orders = await getOrders(userId, 100);
      return {
        reply: orders.length
          ? `You have ${orders.length} order${orders.length !== 1 ? 's' : ''} in total.`
          : "You don't have any orders yet. Start shopping to place your first order!",
        actions: orders.length > 0
          ? [{ type: 'navigate', label: 'View My Orders', url: '/profile?section=orders' }]
          : [{ type: 'navigate', label: 'Browse Products', url: '/shop' }]
      };
    }

    case 'orderTotal': {
      const orders = await getOrders(userId, 100);
      const totalSpent = orders.reduce((sum, o) => sum + (o.total_price || 0), 0);
      return {
        reply: orders.length
          ? `You've spent a total of $${totalSpent.toFixed(2)} across ${orders.length} order${orders.length !== 1 ? 's' : ''}.`
          : "You haven't placed any orders yet.",
        actions: orders.length > 0
          ? [{ type: 'navigate', label: 'View My Orders', url: '/profile?section=orders' }]
          : [{ type: 'navigate', label: 'Start Shopping', url: '/shop' }]
      };
    }

    case 'specificOrder': {
      const match = message.match(INTENTS.specificOrder);
      const identifier = match[1];
      const order = await findOrderByIdentifier(userId, identifier);
      if (!order) {
        return {
          reply: `I couldn't find an order matching "${identifier}". Please check the order ID and try again, or ask "show my orders" to see all your orders.`,
          actions: [{ type: 'navigate', label: 'View All Orders', url: '/profile?section=orders' }]
        };
      }
      return {
        reply: formatSingleOrder(order),
        actions: [{ type: 'navigate', label: `View Order #${shortId(order)}`, url: `/orders/${order._id}` }]
      };
    }

    case 'orderPriceOf': {
      const match = message.match(INTENTS.orderPriceOf);
      const identifier = match[3];
      const order = await findOrderByIdentifier(userId, identifier);
      if (!order) {
        return {
          reply: `I couldn't find an order matching "${identifier}". Try asking "show my orders" to see all your orders.`,
          actions: [{ type: 'navigate', label: 'View All Orders', url: '/profile?section=orders' }]
        };
      }
      return {
        reply: `Order #${shortId(order)} total is $${Number(order.total_price || 0).toFixed(2)} (items: $${Number(order.items_price || 0).toFixed(2)}).`,
        actions: [{ type: 'navigate', label: `View Order #${shortId(order)}`, url: `/orders/${order._id}` }]
      };
    }

    case 'orderStatusOf': {
      const match = message.match(INTENTS.orderStatusOf);
      const identifier = match[3];
      const order = await findOrderByIdentifier(userId, identifier);
      if (!order) {
        return {
          reply: `I couldn't find an order matching "${identifier}". Try asking "show my orders" to see all your orders.`,
          actions: [{ type: 'navigate', label: 'View All Orders', url: '/profile?section=orders' }]
        };
      }
      return {
        reply: `Order #${shortId(order)} is currently ${statusLabel(order.status)}.`,
        actions: [{ type: 'navigate', label: `View Order #${shortId(order)}`, url: `/orders/${order._id}` }]
      };
    }

    case 'orderNameOf': {
      const match = message.match(INTENTS.orderNameOf);
      const identifier = match[4] || match[5];
      const order = await findOrderByIdentifier(userId, identifier);
      if (!order) {
        return {
          reply: `I couldn't find an order matching "${identifier}". Try asking "show my orders" to see all your orders.`,
          actions: [{ type: 'navigate', label: 'View All Orders', url: '/profile?section=orders' }]
        };
      }
      const items = (order.items || []).map((it) => `${it.name || 'Unknown'} x${it.quantity}`).join(', ');
      return {
        reply: `Order #${shortId(order)} contains: ${items || 'no items'}.`,
        actions: [{ type: 'navigate', label: `View Order #${shortId(order)}`, url: `/orders/${order._id}` }]
      };
    }

    case 'myOrders': {
      const orders = await getOrders(userId, 10);
      if (!orders.length) {
        return {
          reply: "You don't have any orders yet. Start shopping to place your first order!",
          actions: [{ type: 'navigate', label: 'Browse Products', url: '/shop' }]
        };
      }
      const lines = orders.map((o) => {
        const date = new Date(o.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
        const itemCount = (o.items || []).reduce((sum, it) => sum + it.quantity, 0);
        return `Order #${shortId(o)} - ${statusLabel(o.status)} - ${itemCount} item${itemCount !== 1 ? 's' : ''} - $${Number(o.total_price || 0).toFixed(2)} - ${date}`;
      });
      return {
        reply: `You have ${orders.length} recent order${orders.length !== 1 ? 's' : ''}:\n\n${lines.join('\n')}`,
        actions: orders.slice(0, 5).map((o) => ({
          type: 'navigate',
          label: `Order #${shortId(o)} - ${statusLabel(o.status)}`,
          url: `/orders/${o._id}`
        }))
      };
    }

    case 'orderStatus': {
      const orders = await getOrders(userId, 5);
      const active = orders.filter((o) => !['delivered', 'cancelled'].includes(o.status));
      if (!active.length) {
        return {
          reply: orders.length
            ? 'You have no active orders right now. All your recent orders have been delivered or cancelled.'
            : "You don't have any orders yet.",
          actions: orders.length > 0
            ? [{ type: 'navigate', label: 'View Order History', url: '/profile?section=orders' }]
            : [{ type: 'navigate', label: 'Browse Products', url: '/shop' }]
        };
      }
      const lines = active.map((o) => `Order #${shortId(o)} - ${statusLabel(o.status)} - $${Number(o.total_price || 0).toFixed(2)}`);
      return {
        reply: `Here are your active orders:\n\n${lines.join('\n')}`,
        actions: active.map((o) => ({
          type: 'navigate',
          label: `Order #${shortId(o)} - ${statusLabel(o.status)}`,
          url: `/orders/${o._id}`
        }))
      };
    }

    case 'cartCount': {
      const cart = await getCartDetails(userId);
      const totalItems = cart.reduce((sum, it) => sum + it.quantity, 0);
      return {
        reply: totalItems > 0
          ? `You have ${totalItems} item${totalItems !== 1 ? 's' : ''} in your cart (${cart.length} product${cart.length !== 1 ? 's' : ''}).`
          : 'Your cart is empty.',
        actions: totalItems > 0
          ? [{ type: 'navigate', label: 'View My Cart', url: '/profile?section=cart' }]
          : [{ type: 'navigate', label: 'Start Shopping', url: '/shop' }]
      };
    }

    case 'cartTotal': {
      const cart = await getCartDetails(userId);
      const totalItems = cart.reduce((sum, it) => sum + it.quantity, 0);
      if (totalItems === 0) {
        return {
          reply: 'Your cart is empty.',
          actions: [{ type: 'navigate', label: 'Start Shopping', url: '/shop' }]
        };
      }
      const total = cart.reduce((sum, it) => sum + (it.product?.price || 0) * it.quantity, 0);
      const breakdown = cart.map((it) =>
        `  - ${it.product?.name || 'Unknown'} x${it.quantity} = $${((it.product?.price || 0) * it.quantity).toFixed(2)}`
      ).join('\n');
      return {
        reply: `Your cart total is $${total.toFixed(2)} for ${totalItems} item${totalItems !== 1 ? 's' : ''}:\n\n${breakdown}`,
        actions: [{ type: 'navigate', label: 'View My Cart', url: '/profile?section=cart' }]
      };
    }

    case 'cart':
      return {
        reply: 'Opening your cart.',
        actions: [{ type: 'navigate', label: 'View Cart', url: '/profile?section=cart' }]
      };

    case 'shop':
      return {
        reply: 'Here you go! Browse our full product catalog with filters for category, price, and ratings.',
        actions: [{ type: 'navigate', label: 'Open Shop', url: '/shop' }]
      };

    case 'home':
      return {
        reply: 'Taking you to the homepage.',
        actions: [{ type: 'navigate', label: 'Go to Homepage', url: '/' }]
      };

    case 'profile':
      return {
        reply: 'Opening your account settings.',
        actions: [{ type: 'navigate', label: 'Open Profile', url: '/profile' }]
      };

    case 'help':
      return {
        reply: "Hi! I'm your SmartCart shopping assistant. Here's what I can help with:\n\n"
          + '- Ask about orders: "How many orders do I have?"\n'
          + '- Look up a specific order: "Show order #abc123"\n'
          + '- Check order details: "What\'s the price/status of order #abc123?"\n'
          + '- Cart info: "How many items in my cart?" or "What\'s my cart total?"\n'
          + '- Browse products: "Show me products"\n'
          + '- Navigate anywhere: "Take me to my cart"\n'
          + '- Selling or delivery questions: "How do I sell on SmartCart?"\n\n'
          + 'What would you like to do?',
        actions: [
          { type: 'navigate', label: 'Browse Products', url: '/shop' },
          { type: 'navigate', label: 'My Orders', url: '/profile?section=orders' },
          { type: 'navigate', label: 'My Cart', url: '/profile?section=cart' }
        ]
      };

    case 'sellOnPlatform':
      return {
        reply: "To sell on SmartCart, you need a Seller account. If you're registering new, choose \"Seller\" as your account type. Once registered, you can:\n\n"
          + '- Add products with images, descriptions, and pricing\n'
          + '- Manage your product catalog from your profile\n'
          + '- View and fulfill orders from customers\n'
          + '- Assign delivery drivers to your orders',
        actions: [{ type: 'navigate', label: 'Register as Seller', url: '/register' }]
      };

    case 'deliveryJob':
      return {
        reply: "SmartCart delivery drivers are onboarded by sellers. If a seller adds you as a driver, you'll be able to:\n\n"
          + '- Claim available deliveries\n'
          + '- Update delivery status in real time\n'
          + '- Track your earnings and completion rate\n\n'
          + 'Contact a seller on the platform to get started!',
        actions: []
      };

    case 'shippingPolicy':
      return {
        reply: 'Shipping details:\n\n'
          + '- Orders are processed within 1-2 business days\n'
          + '- Delivery times depend on the seller and your location\n'
          + '- You can track your order status from your order history\n\n'
          + 'For specific delivery estimates, check the order details after placing your order.',
        actions: [{ type: 'navigate', label: 'My Orders', url: '/profile?section=orders' }]
      };

    case 'returnPolicy':
      return {
        reply: "SmartCart's return policy:\n\n"
          + '- You can request a return within 14 days of delivery\n'
          + '- Items must be unused and in original packaging\n'
          + '- Refunds are processed within 5-7 business days after the return is approved\n\n'
          + 'Contact the seller directly from your order page to initiate a return.',
        actions: [{ type: 'navigate', label: 'My Orders', url: '/profile?section=orders' }]
      };

    case 'paymentMethods':
      return {
        reply: 'SmartCart accepts the following payment methods:\n\n'
          + '- Credit/Debit Card\n'
          + '- Cash on Delivery (COD)\n\n'
          + 'You can select your preferred payment method during checkout.',
        actions: [{ type: 'navigate', label: 'Start Shopping', url: '/shop' }]
      };

    case 'contactSupport':
      return {
        reply: 'You can reach our support team at:\n\n'
          + '- Email: support@smartcart.com\n\n'
          + 'For order-specific issues, it\'s fastest to check your order details first - many answers are right there!',
        actions: [{ type: 'navigate', label: 'My Orders', url: '/profile?section=orders' }]
      };

    default:
      return null;
  }
}

// ---------------------------------------------------------------------------
// AI prompt builder + response parser
// ---------------------------------------------------------------------------
function buildAIPrompt(message, orders, cartItems, chatHistory) {
  const orderContext = !orders.length
    ? 'No orders found.'
    : orders.map((o) => {
      const id = o._id.toString();
      const date = new Date(o.createdAt).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
      const items = (o.items || []).map((it) =>
        `  - ${it.name || 'Unknown'} x${it.quantity} @ $${Number(it.price).toFixed(2)}`
      ).join('\n');
      return `[Order #${shortId(o)} | full_id: ${id}]\nStatus: ${o.status}\nDate: ${date}\nTotal: $${Number(o.total_price || 0).toFixed(2)}\nItems:\n${items || '  (no items)'}`;
    }).join('\n\n');

  const cartContext = !cartItems.length
    ? 'Cart is empty.'
    : cartItems.map((it) =>
      `- ${it.product?.name || 'Unknown'} x${it.quantity} @ $${(it.product?.price || 0).toFixed(2)}`
    ).join('\n');

  const historyContext = (chatHistory || []).slice(-6).map((m) =>
    `${m.sender === 'user' ? 'Customer' : 'Assistant'}: ${m.message}`
  ).join('\n');

  return `You are Violet, a professional customer service AI assistant for SmartCart, an e-commerce store.

AVAILABLE PAGES (you may suggest these as actions):
- /shop - Product catalog with filters
- / - Homepage
- /profile - Account settings
- /profile?section=orders - Order history
- /orders/{order_id} - Specific order detail
- /profile?section=cart - Shopping cart
- /register - Register a new account
- /login - Log in

CUSTOMER'S RECENT ORDERS:
${orderContext}

CUSTOMER'S CART:
${cartContext}

${historyContext ? `RECENT CONVERSATION:\n${historyContext}\n` : ''}
CUSTOMER MESSAGE: ${message}

INSTRUCTIONS:
- Answer based on the real order and cart data above. Do NOT fabricate orders or details.
- When referencing an order, always use its short ID (last 6 chars) and include its full_id in any action URL.
- Keep responses under 120 words. Be concise and helpful. Use plain text, no markdown.
- If the customer asks about shipping, returns, payments, or how the platform works, answer from general knowledge about e-commerce.
- If the customer asks something completely outside e-commerce, customer service, or SmartCart (for example: politics, personal advice, coding, general trivia), politely decline:
  "I'm sorry, I can only help with SmartCart orders, products, and shopping-related questions. Is there anything about your orders or our products I can help with?"
- For navigation actions, append lines in this exact format: ACTION_LABEL|ACTION_URL
  You may include at most 3 ACTION lines.

Provide your response now:`;
}

function parseAIResponse(rawReply) {
  const lines = rawReply.split('\n');
  const actions = [];
  const textLines = [];

  for (const line of lines) {
    const actionMatch = line.match(/^(.+?)\|(\/[^\s]+)$/);
    if (actionMatch) {
      const label = actionMatch[1].trim();
      const url = actionMatch[2].trim();
      if (url.startsWith('/') && !url.startsWith('//')) {
        actions.push({ type: 'navigate', label, url });
      }
    } else {
      textLines.push(line);
    }
  }

  return {
    reply: textLines.join('\n').trim(),
    actions: actions.slice(0, 3)
  };
}

// ---------------------------------------------------------------------------
// Ollama transport (native fetch — no extra dependency)
// ---------------------------------------------------------------------------
async function callOllama(model, prompt) {
  const response = await fetch(`${OLLAMA_BASE_URL}/api/generate`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    signal: AbortSignal.timeout(60000),
    body: JSON.stringify({ model, prompt, stream: false })
  });

  if (!response.ok) {
    throw new Error(`Ollama HTTP ${response.status}`);
  }

  const data = await response.json();
  return String(data.response || '').trim();
}

// ---------------------------------------------------------------------------
// Main service
// ---------------------------------------------------------------------------
class ChatService {
  async getAIResponse(message, userId) {
    const detectedIntent = Object.entries(INTENTS).find(([, regex]) => regex.test(message))?.[0];

    if (detectedIntent) {
      const result = await handleIntent(detectedIntent, message, userId);
      if (result) {
        console.log(`Chat: User ${userId} intent="${detectedIntent}" -> deterministic response (${result.actions.length} actions)`);
        return result;
      }
    }

    // No deterministic handler — use AI with rich context.
    try {
      const orders = await getOrders(userId, 10);
      const cartItems = await getCartDetails(userId);
      const chatHistory = await this.getChatHistory(userId);

      const prompt = buildAIPrompt(message, orders, cartItems, chatHistory);
      const rawReply = await callOllama(OLLAMA_MODEL, prompt);
      const parsed = parseAIResponse(rawReply);

      if (!parsed.reply) {
        throw new Error('Empty AI response');
      }
      return parsed;
    } catch (error) {
      console.error('Ollama API error:', error.message);

      // Fallback: retry once on the fallback model.
      try {
        const orders = await getOrders(userId, 10);
        const cartItems = await getCartDetails(userId);
        const prompt = buildAIPrompt(message, orders, cartItems, []);
        const rawReply = await callOllama(OLLAMA_FALLBACK_MODEL, prompt);
        return parseAIResponse(rawReply);
      } catch (fbErr) {
        console.error('Ollama fallback error:', fbErr.message);
        throw new ApiError(503, 'AI assistant is unavailable right now. Please try again later.');
      }
    }
  }

  async getChatHistory(userId) {
    try {
      const session = await ChatSession.findOne({ user: userId })
        .sort({ createdAt: -1 })
        .lean();
      return session?.messages || [];
    } catch {
      return [];
    }
  }

  async saveMessage(userId, message, reply, actions = []) {
    try {
      let session = await ChatSession.findOne({ user: userId }).sort({ createdAt: -1 });
      if (!session) {
        session = new ChatSession({ user: userId, messages: [], context: {} });
      }

      session.messages.push({ sender: 'user', message, timestamp: new Date() });
      session.messages.push({
        sender: 'ai',
        message: typeof reply === 'string' ? reply : (reply.reply || ''),
        actions,
        timestamp: new Date()
      });

      // Cap history to the last 50 messages.
      if (session.messages.length > 50) {
        session.messages = session.messages.slice(-50);
      }

      await session.save();
    } catch (error) {
      console.error('Failed to save chat message:', error);
    }
  }
}

module.exports = new ChatService();
