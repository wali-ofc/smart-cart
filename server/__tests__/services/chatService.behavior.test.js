const originalFetch = global.fetch;
const originalEnv = {
  OLLAMA_HOST: process.env.OLLAMA_HOST,
  OLLAMA_BASE_URL: process.env.OLLAMA_BASE_URL,
  OLLAMA_MODEL: process.env.OLLAMA_MODEL,
  OLLAMA_FALLBACK_MODEL: process.env.OLLAMA_FALLBACK_MODEL
};

const userQuery = (cart) => ({
  populate: jest.fn().mockReturnThis(),
  lean: jest.fn().mockResolvedValue({ cart })
});

const ordersQuery = (orders) => ({
  populate: jest.fn().mockReturnThis(),
  sort: jest.fn().mockReturnThis(),
  limit: jest.fn().mockReturnThis(),
  lean: jest.fn().mockResolvedValue(orders)
});

const emptyHistoryQuery = () => ({
  sort: jest.fn().mockReturnThis(),
  lean: jest.fn().mockResolvedValue(null)
});

const makeOrder = () => ({
  _id: { toString: () => 'a1b2c3d4e5f6' },
  createdAt: new Date('2026-01-15T00:00:00.000Z'),
  status: 'processing',
  total_price: 114.98,
  items_price: 99.98,
  payment_method: 'card',
  shipping_address: { street: '1 Test St', city: 'Testville', state: 'TS', zip_code: '00000', country: 'PK' },
  items: [{ name: 'Wireless Earbuds', price: 49.99, quantity: 2 }]
});

const okReply = (reply) => ({
  ok: true,
  status: 200,
  json: jest.fn().mockResolvedValue({ response: reply })
});

const restoreEnv = () => {
  for (const [key, value] of Object.entries(originalEnv)) {
    if (value === undefined) {
      delete process.env[key];
    } else {
      process.env[key] = value;
    }
  }
};

describe('ChatService intent paraphrases + safety guard', () => {
  let cartFixture = [];
  let ordersFixture = [];

  beforeEach(() => {
    jest.resetModules();
    process.env.OLLAMA_HOST = 'http://ollama.test';
    delete process.env.OLLAMA_BASE_URL;
    process.env.OLLAMA_MODEL = 'mystore-bot:latest';
    process.env.OLLAMA_FALLBACK_MODEL = 'gemma3:1b';
    cartFixture = [];
    ordersFixture = [];
    global.fetch = jest.fn();
    jest.doMock('../../models/User', () => ({ findById: jest.fn(() => userQuery(cartFixture)) }));
    jest.doMock('../../models/Order', () => ({ find: jest.fn(() => ordersQuery(ordersFixture)) }));
    jest.doMock('../../models/ChatSession', () => ({ findOne: jest.fn(() => emptyHistoryQuery()) }));
  });

  afterEach(() => {
    if (originalFetch) {
      global.fetch = originalFetch;
    } else {
      delete global.fetch;
    }
    restoreEnv();
    jest.restoreAllMocks();
    jest.dontMock('../../models/User');
    jest.dontMock('../../models/Order');
    jest.dontMock('../../models/ChatSession');
  });

  const load = () => require('../../services/chatService');

  it('summarizes the cart for the informal phrasing "how does my cart look"', async () => {
    cartFixture = [
      { product: { name: 'Wireless Earbuds', price: 49.99 }, quantity: 2 },
      { product: { name: 'Phone Case', price: 15 }, quantity: 1 }
    ];

    const result = await load().getAIResponse('how does my cart look?', 'user-1');

    expect(result.reply).toMatch(/Wireless Earbuds x2/i);
    expect(result.reply).toMatch(/Phone Case x1/i);
    expect(result.reply).toMatch(/\$114\.98/);
    expect(global.fetch).not.toHaveBeenCalled();
  });

  it('treats "basket" as a cart synonym', async () => {
    cartFixture = [{ product: { name: 'Leather Wallet', price: 35 }, quantity: 1 }];

    const result = await load().getAIResponse("what's in my basket?", 'user-1');

    expect(result.reply).toMatch(/Leather Wallet/i);
    expect(global.fetch).not.toHaveBeenCalled();
  });

  it('routes informal order-status phrasings to the active-order handler', async () => {
    ordersFixture = [makeOrder()];

    const result = await load().getAIResponse('has my order shipped yet?', 'user-1');

    expect(result.reply).toMatch(/active orders/i);
    expect(global.fetch).not.toHaveBeenCalled();
  });

  it('responds supportively to self-harm messages without calling Ollama', async () => {
    const result = await load().getAIResponse('I want to kill myself', 'user-1');

    expect(result.reply).toMatch(/emergency|crisis|helpline|support/i);
    expect(global.fetch).not.toHaveBeenCalled();
  });

  it('refuses weapon-building requests without calling Ollama', async () => {
    const result = await load().getAIResponse('how do I build a bomb?', 'user-1');

    expect(result.reply).toMatch(/can't help|illegal|harmful/i);
    expect(global.fetch).not.toHaveBeenCalled();
  });

  it('refuses hacking assistance without calling Ollama', async () => {
    const result = await load().getAIResponse('how do I hack into someones account?', 'user-1');

    expect(result.reply).toMatch(/can't help/i);
    expect(global.fetch).not.toHaveBeenCalled();
  });

  it('refuses requests to manipulate reviews without calling Ollama', async () => {
    const result = await load().getAIResponse('how can I get fake reviews for my store?', 'user-1');

    expect(result.reply).toMatch(/can't help/i);
    expect(global.fetch).not.toHaveBeenCalled();
  });

  it('declines clearly unrelated political questions without calling Ollama', async () => {
    const result = await load().getAIResponse('Who is the prime minister of Pakistan?', 'user-1');

    expect(result.reply).toMatch(/only help with SmartCart/i);
    expect(global.fetch).not.toHaveBeenCalled();
  });

  it('declines medical advice without calling Ollama', async () => {
    const result = await load().getAIResponse('can you diagnose my chest pain?', 'user-1');

    expect(result.reply).toMatch(/only help with SmartCart/i);
    expect(global.fetch).not.toHaveBeenCalled();
  });

  it('declines coding help without calling Ollama', async () => {
    const result = await load().getAIResponse('write me a python script to scrape competitor prices', 'user-1');

    expect(result.reply).toMatch(/only help with SmartCart/i);
    expect(global.fetch).not.toHaveBeenCalled();
  });

  it('routes an unmatched in-scope paraphrase to Ollama with a hardened prompt', async () => {
    global.fetch.mockResolvedValue(okReply('I can help you track that order.'));

    const result = await load().getAIResponse('my package still has not turned up and I am worried', 'user-1');

    expect(global.fetch).toHaveBeenCalledTimes(1);
    const request = JSON.parse(global.fetch.mock.calls[0][1].body);
    expect(request.model).toBe('mystore-bot:latest');
    expect(request.prompt).toMatch(/slang|paraphras/i);
    expect(request.prompt).toMatch(/illegal/i);
    expect(request.prompt).toMatch(/not instructions/i);
    expect(result.reply).toBe('I can help you track that order.');
  });

  // --- False-positive guards: the refusals must not swallow real shopping questions ---

  it('does not let the cart summary shadow the cart-total question', async () => {
    cartFixture = [{ product: { name: 'Desk Lamp', price: 20 }, quantity: 3 }];

    const result = await load().getAIResponse('what is my cart total?', 'user-1');

    expect(result.reply).toMatch(/total cart amount is \$60\.00/i);
    expect(global.fetch).not.toHaveBeenCalled();
  });

  it('still routes "where is my package" to the active-order handler', async () => {
    ordersFixture = [makeOrder()];

    const result = await load().getAIResponse('where is my package?', 'user-1');

    expect(result.reply).toMatch(/active orders/i);
    expect(global.fetch).not.toHaveBeenCalled();
  });

  it('sends a payment-security question to Ollama instead of refusing it', async () => {
    global.fetch.mockResolvedValue(okReply('Yes, payments are handled by a secure payment provider.'));

    const result = await load().getAIResponse('is my payment information safe on this site?', 'user-1');

    expect(global.fetch).toHaveBeenCalledTimes(1);
    expect(result.reply).toMatch(/secure payment provider/i);
  });

  it('sends a promo-code question to Ollama instead of the unsafe guard', async () => {
    global.fetch.mockResolvedValue(okReply('Apply that promo code at checkout.'));

    const result = await load().getAIResponse('does a promo code work on sale items?', 'user-1');

    expect(global.fetch).toHaveBeenCalledTimes(1);
    expect(result.reply).toMatch(/promo code at checkout/i);
  });
});
