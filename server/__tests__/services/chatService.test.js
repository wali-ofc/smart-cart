const originalFetch = global.fetch;
const originalEnv = {
  OLLAMA_HOST: process.env.OLLAMA_HOST,
  OLLAMA_BASE_URL: process.env.OLLAMA_BASE_URL,
  OLLAMA_MODEL: process.env.OLLAMA_MODEL,
  OLLAMA_FALLBACK_MODEL: process.env.OLLAMA_FALLBACK_MODEL
};

const emptyQuery = () => ({
  populate: jest.fn().mockReturnThis(),
  sort: jest.fn().mockReturnThis(),
  limit: jest.fn().mockResolvedValue([]),
  lean: jest.fn().mockResolvedValue(null)
});

const response = (status, body) => ({
  ok: status >= 200 && status < 300,
  status,
  json: jest.fn().mockResolvedValue(body)
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

describe('ChatService Ollama configuration', () => {
  beforeEach(() => {
    jest.resetModules();
    process.env.OLLAMA_HOST = 'http://configured-ollama.test';
    delete process.env.OLLAMA_BASE_URL;
    process.env.OLLAMA_MODEL = 'mystore-bot:latest';
    process.env.OLLAMA_FALLBACK_MODEL = 'gemma3:1b';

    jest.doMock('../../models/Order', () => ({ find: jest.fn(() => emptyQuery()) }));
    jest.doMock('../../models/User', () => ({ findById: jest.fn(() => emptyQuery()) }));
    jest.doMock('../../models/ChatSession', () => ({ findOne: jest.fn(() => emptyQuery()) }));
    jest.spyOn(console, 'error').mockImplementation(() => {});
  });

  afterEach(() => {
    if (originalFetch) {
      global.fetch = originalFetch;
    } else {
      delete global.fetch;
    }
    restoreEnv();
    jest.restoreAllMocks();
    jest.dontMock('../../models/Order');
    jest.dontMock('../../models/User');
    jest.dontMock('../../models/ChatSession');
  });

  it('uses OLLAMA_HOST when OLLAMA_BASE_URL is not set', async () => {
    global.fetch = jest.fn().mockResolvedValue(response(200, { response: 'Outside SmartCart scope.' }));

    const chatService = require('../../services/chatService');
    const result = await chatService.getAIResponse('my package still has not turned up and I am worried', 'user-id');

    expect(result.reply).toBe('Outside SmartCart scope.');
    expect(global.fetch).toHaveBeenCalledTimes(1);
    expect(global.fetch).toHaveBeenCalledWith(
      'http://configured-ollama.test/api/generate',
      expect.objectContaining({ method: 'POST' })
    );
    expect(JSON.parse(global.fetch.mock.calls[0][1].body)).toMatchObject({
      model: 'mystore-bot:latest',
      stream: false
    });
  });

  it('defaults to the installed model when OLLAMA_MODEL is not set', async () => {
    delete process.env.OLLAMA_MODEL;
    global.fetch = jest.fn().mockResolvedValue(response(200, { response: 'Default model response.' }));

    const chatService = require('../../services/chatService');
    await chatService.getAIResponse('my package still has not turned up and I am worried', 'user-id');

    expect(JSON.parse(global.fetch.mock.calls[0][1].body).model).toBe('mystore-bot:latest');
  });

  it('retries the configured fallback model after a primary 404', async () => {
    global.fetch = jest
      .fn()
      .mockResolvedValueOnce(response(404, { error: "model 'mystore-bot:latest' not found" }))
      .mockResolvedValueOnce(response(200, { response: 'Fallback response.' }));

    const chatService = require('../../services/chatService');
    const result = await chatService.getAIResponse('my package still has not turned up and I am worried', 'user-id');

    expect(result.reply).toBe('Fallback response.');
    expect(global.fetch).toHaveBeenCalledTimes(2);
    expect(JSON.parse(global.fetch.mock.calls[0][1].body).model).toBe('mystore-bot:latest');
    expect(JSON.parse(global.fetch.mock.calls[1][1].body).model).toBe('gemma3:1b');
  });
});
