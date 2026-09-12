import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '@/api/axios';
import { useAuth } from '@/context/AuthContext';

/**
 * ChatWidget (documentation.md §4.3.3) — floating AI shopping assistant.
 * POST /api/chat (protected, rate-limited 50/day). Signed-in users only.
 * Placed on the bottom-right of the screen per layout specification.
 */
export default function ChatWidget() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const threadRef = useRef(null);
  const abortControllerRef = useRef(null);

  // Persisted conversation is server-side (ChatSession, 30d TTL) — hydrate on
  // mount so history survives page reloads / widget reopens.
  useEffect(() => {
    if (!user) return;
    let cancelled = false;
    api
      .get('/chat/history')
      .then(({ data }) => {
        if (cancelled) return;
        const history = (data.messages || []).map((m) => ({
          role: m.sender === 'user' ? 'user' : 'ai',
          text: m.message,
          actions: m.actions || []
        }));
        setMessages(history);
      })
      .catch(() => {
        // history is a nice-to-have; never block the widget on it
      });
    return () => {
      cancelled = true;
    };
  }, [user]);

  useEffect(() => {
    if (threadRef.current) {
      threadRef.current.scrollTop = threadRef.current.scrollHeight;
    }
  }, [messages, loading, open]);

  if (!user) return null;

  const sendMessage = async (e) => {
    e.preventDefault();
    const text = input.trim();
    if (!text || loading) return;

    setInput('');
    setMessages((prev) => [...prev, { role: 'user', text }]);
    setLoading(true);

    const controller = new AbortController();
    abortControllerRef.current = controller;

    try {
      const { data } = await api.post('/chat', { message: text }, { signal: controller.signal });
      setMessages((prev) => [
        ...prev,
        { role: 'ai', text: data.reply, actions: data.actions || [] }
      ]);
    } catch (err) {
      if (err?.name === 'CanceledError' || err?.name === 'AbortError' || err?.code === 'ERR_CANCELED') {
        setMessages((prev) => [
          ...prev,
          { role: 'ai', text: 'Generation stopped by user.', stopped: true }
        ]);
      } else {
        const message =
          err?.response?.data?.error ||
          'AI assistant is unavailable right now. Please try again later.';
        setMessages((prev) => [...prev, { role: 'ai', text: message, error: true }]);
      }
    } finally {
      setLoading(false);
      abortControllerRef.current = null;
    }
  };

  const stopGeneration = () => {
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }
  };

  const clearChat = () => {
    setMessages([]);
    // clear the server-side conversation too, so it also stays gone on reload
    api.delete('/chat/history').catch(() => {});
  };

  // Auth is handled by the Login/Register modals (there are no /login or
  // /register pages in this app) — open the matching modal instead of
  // navigating to a route that would 404.
  const handleActionClick = (url) => {
    const authTarget =
      url === '/register' ? 'register' : url === '/login' ? 'login' : null;
    if (authTarget) {
      import('bootstrap')
        .then((bootstrap) => {
          const el = document.getElementById(authTarget);
          if (el) {
            bootstrap.Modal.getOrCreateInstance(el).show();
          } else {
            navigate('/');
          }
        })
        .catch(() => navigate('/'));
    } else {
      navigate(url);
    }
  };

  const iconSvg = (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
    </svg>
  );

  return (
    <div
      className="chat-widget"
      style={{
        position: "fixed",
        right: 20,
        bottom: 20,
        zIndex: 950,
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-end"
      }}
    >
      {open && (
        <div className="card chat-widget-panel shadow-sm" style={{ width: 340, marginBottom: 12, overflow: "hidden" }}>
          <div className="card-header d-flex align-items-center justify-content-between py-2">
            <span className="fw-5 d-flex align-items-center gap-2">
              {iconSvg}
              SmartCart Assistant
            </span>
            <div className="d-flex align-items-center gap-2">
              {messages.length > 0 && (
                <button
                  className="btn btn-link p-0 text-dark border-0"
                  onClick={clearChat}
                  aria-label="Clear chat history"
                  title="Clear chat"
                >
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M3 6h18" />
                    <path d="M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
                    <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6" />
                  </svg>
                </button>
              )}
              <button
                className="btn btn-link p-0 text-dark border-0"
                onClick={() => setOpen(false)}
                aria-label="Close chat"
              >
                <span className="icon-close icon-close-popup" />
              </button>
            </div>
          </div>
          <div
            ref={threadRef}
            className="card-body"
            style={{ maxHeight: 320, overflowY: "auto", background: "#f6f6f6" }}
          >
            {messages.length === 0 && (
              <p className="small text-secondary mb-0 text-center py-2">
                Hi {user?.name?.split(" ")[0] || "there"}! Ask me about products,
                cart contents, or your orders.
              </p>
            )}
            {messages.map((m, i) => (
              <div
                key={i}
                className={`d-flex mb-2 ${
                  m.role === "user" ? "justify-content-end" : "justify-content-start"
                }`}
              >
                <div
                  className={`px-3 py-2 rounded-3 small ${
                    m.role === "user"
                      ? "bg-dark text-white"
                      : m.error
                        ? "bg-white border text-danger"
                        : m.stopped
                          ? "bg-white border text-secondary fst-italic"
                          : "bg-white border"
                  }`}
                  style={{ maxWidth: "85%", wordBreak: "break-word", whiteSpace: "pre-wrap" }}
                >
                  <div>{m.text}</div>
                  {m.role === "ai" && m.actions && m.actions.length > 0 && (
                    <div className="mt-2 pt-2 border-top d-flex flex-wrap gap-1">
                      {m.actions.map((act, idx) => (
                        <button
                          key={idx}
                          type="button"
                          onClick={() => handleActionClick(act.url)}
                          className="btn btn-sm btn-outline-dark py-0 px-2 radius-3"
                          style={{ fontSize: "11px" }}
                        >
                          {act.label}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            ))}
            {loading && (
              <div className="small text-secondary fst-italic py-1">
                SmartCart is typing...
              </div>
            )}
          </div>
          <form onSubmit={sendMessage} className="card-footer d-flex gap-2 py-2">
            <input
              className="form-control form-control-sm"
              placeholder="Ask about products, cart, orders..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              disabled={loading}
            />
            {loading ? (
              <button
                type="button"
                onClick={stopGeneration}
                className="btn btn-danger btn-sm radius-3 d-flex align-items-center gap-1"
                title="Stop generation"
              >
                <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
                  <rect x="4" y="4" width="16" height="16" rx="2" />
                </svg>
                <span>Stop</span>
              </button>
            ) : (
              <button
                type="submit"
                className="tf-btn btn-fill animate-hover-btn radius-3"
                disabled={!input.trim()}
              >
                <span>Send</span>
              </button>
            )}
          </form>
        </div>
      )}
      <button
        onClick={() => setOpen((v) => !v)}
        className="tf-btn btn-fill animate-hover-btn chat-widget-toggle d-flex align-items-center justify-content-center"
        style={{ width: 56, height: 56, borderRadius: "50%", padding: 0 }}
        aria-label={open ? "Close chat" : "Open chat"}
      >
        {iconSvg}
      </button>
    </div>
  );
}