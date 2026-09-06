import React, { useEffect, useRef, useState } from 'react';
import api from '@/api/axios';
import { useAuth } from '@/context/AuthContext';

/**
 * ChatWidget (documentation.md §4.3.3) — floating AI shopping assistant.
 * POST /api/chat (protected, rate-limited 50/day). Signed-in users only.
 * Message history is held in component state — the API does not expose history.
 */
export default function ChatWidget() {
  const { user } = useAuth();
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const threadRef = useRef(null);

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
    try {
      const { data } = await api.post('/chat', { message: text });
      setMessages((prev) => [...prev, { role: 'ai', text: data.reply }]);
    } catch (err) {
      const message =
        err?.response?.data?.error ||
        'AI assistant is unavailable right now. Please try again later.';
      setMessages((prev) => [...prev, { role: 'ai', text: message, error: true }]);
    } finally {
      setLoading(false);
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
    <div className="chat-widget" style={{ position: "fixed", right: 20, bottom: 20, zIndex: 950 }}>
      {open && (
        <div className="card chat-widget-panel shadow-sm" style={{ width: 340, marginBottom: 12, overflow: "hidden" }}>
          <div className="card-header d-flex align-items-center justify-content-between py-2">
            <span className="fw-5 d-flex align-items-center gap-2">
              {iconSvg}
              SmartCart Assistant
            </span>
            <button
              className="btn btn-link p-0 text-dark border-0"
              onClick={() => setOpen(false)}
              aria-label="Close chat"
            >
              <span className="icon-close icon-close-popup" />
            </button>
          </div>
          <div
            ref={threadRef}
            className="card-body"
            style={{ maxHeight: 320, overflowY: "auto", background: "#f6f6f6" }}
          >
            {messages.length === 0 && (
              <p className="small text-secondary mb-0 text-center py-2">
                Hi {user?.name?.split(" ")[0] || "there"}! Ask me about products,
                recommendations or your orders.
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
                        : "bg-white border"
                  }`}
                  style={{ maxWidth: "80%", wordBreak: "break-word" }}
                >
                  {m.text}
                </div>
              </div>
            ))}
            {loading && (
              <div className="small text-secondary fst-italic">
                SmartCart is typing...
              </div>
            )}
          </div>
          <form onSubmit={sendMessage} className="card-footer d-flex gap-2 py-2">
            <input
              className="form-control form-control-sm"
              placeholder="Ask about products, orders..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              disabled={loading}
            />
            <button
              type="submit"
              className="tf-btn btn-fill animate-hover-btn radius-3"
              disabled={loading}
            >
              <span>Send</span>
            </button>
          </form>
        </div>
      )}
      <button
        onClick={() => setOpen((v) => !v)}
        className="tf-btn btn-fill animate-hover-btn chat-widget-toggle"
        style={{ width: 56, height: 56, borderRadius: "50%", padding: 0 }}
        aria-label={open ? "Close chat" : "Open chat"}
      >
        {iconSvg}
      </button>
    </div>
  );
}