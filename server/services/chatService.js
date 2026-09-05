const ChatSession = require('../models/ChatSession');
const Order = require('../models/Order');
const ApiError = require('../utils/ApiError');

const OLLAMA_HOST = process.env.OLLAMA_HOST || 'http://localhost:11434';
const OLLAMA_MODEL = process.env.OLLAMA_MODEL || 'smartcart-bot';

const SYSTEM_PROMPT =
  'You are SmartCart\'s shopping assistant. Help with product recommendations, order status, ' +
  'and general shopping questions. Be concise and helpful. Use the order context provided when relevant.';

/**
 * Chat with the Ollama-backed assistant (spec §4.2.5, POST /api/chat).
 * Persists the full conversation in ChatSession (TTL 30d); injects the user's
 * most recent order as context. User message is saved even if Ollama fails.
 */
exports.sendMessage = async (userId, message) => {
  let session = await ChatSession.findOne({ user: userId });
  if (!session) {
    session = await ChatSession.create({ user: userId, messages: [], context: {} });
  }

  // Context injection: most recent order
  const recentOrder = await Order.findOne({ user: userId })
    .sort({ createdAt: -1 })
    .select('items total_price status createdAt');
  session.context = { lastOrder: recentOrder ? recentOrder.toObject() : null };

  session.messages.push({ sender: 'user', message });

  const history = session.messages
    .map((m) => `${m.sender === 'user' ? 'Customer' : 'Assistant'}: ${m.message}`)
    .join('\n');

  const prompt = `${SYSTEM_PROMPT}\n\nRecent order context:\n${JSON.stringify(session.context)}\n\nConversation:\n${history}\n\nAssistant:`;

  const reply = await callOllama(prompt);

  session.messages.push({ sender: 'ai', message: reply });
  await session.save();

  return { reply, session };
};

/** Call the local Ollama generate endpoint (stream: false, JSON response). */
async function callOllama(prompt) {
  try {
    const response = await fetch(`${OLLAMA_HOST}/api/generate`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      signal: AbortSignal.timeout(30000),
      body: JSON.stringify({ model: OLLAMA_MODEL, prompt, stream: false })
    });

    if (!response.ok) {
      throw new Error(`Ollama HTTP ${response.status}`);
    }

    const data = await response.json();
    return String(data.response || '').trim() || 'I am not sure how to answer that.';
  } catch (error) {
    throw new ApiError(503, 'AI assistant is unavailable right now. Please try again later.');
  }
}