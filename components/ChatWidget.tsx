"use client";
import { useState, useRef, useEffect } from "react";

const SUGGEST = [
  "What AI/ML experience does he have?",
  "Tell me about the Portfolio Optimizer.",
  "Does he have NLP experience?",
];
type Msg = { role: "user" | "bot"; text: string };

export default function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [msgs, setMsgs] = useState<Msg[]>([
    { role: "bot", text: "Hi! I'm Nithiesh's portfolio assistant. Ask me about his AI/ML experience, projects, or skills." },
  ]);
  const [q, setQ] = useState("");
  const [busy, setBusy] = useState(false);
  const bodyRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => { if (bodyRef.current) bodyRef.current.scrollTop = bodyRef.current.scrollHeight; }, [msgs, busy]);
  useEffect(() => { if (open) setTimeout(() => inputRef.current?.focus(), 220); }, [open]);
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") setOpen(false); };
    addEventListener("keydown", onKey); return () => removeEventListener("keydown", onKey);
  }, []);

  async function ask(question: string) {
    if (!question.trim() || busy) return;
    setQ(""); setBusy(true);
    setMsgs((m) => [...m, { role: "user", text: question }]);
    try {
      const res = await fetch("/api/ask", {
        method: "POST", headers: { "content-type": "application/json" },
        body: JSON.stringify({ question }),
      });
      const data = await res.json().catch(() => null);
      const text = res.ok && data?.answer ? data.answer : (data?.error ?? "Something went wrong — try again.");
      setMsgs((m) => [...m, { role: "bot", text }]);
    } catch {
      setMsgs((m) => [...m, { role: "bot", text: "Network error — try again." }]);
    } finally { setBusy(false); }
  }

  return (
    <>
      <button className="chat-fab" aria-label="Open AI assistant" aria-expanded={open} onClick={() => setOpen((o) => !o)}>
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
        </svg>
      </button>
      <div className={`chat-panel${open ? " open" : ""}`} role="dialog" aria-label="Ask my portfolio" aria-hidden={!open}>
        <div className="chat-head">
          <b><span className="dot" />Ask my portfolio</b>
          <button className="chat-close" aria-label="Close assistant" onClick={() => setOpen(false)}>×</button>
        </div>
        <div className="chat-body" ref={bodyRef}>
          {msgs.map((m, i) => (<div key={i} className={`chat-msg ${m.role}`}>{m.text}</div>))}
          {busy && <div className="chat-msg bot typing">Thinking…</div>}
        </div>
        <div className="chat-suggest">
          {SUGGEST.map((s) => (<button key={s} onClick={() => ask(s)}>{s}</button>))}
        </div>
        <form className="chat-input" onSubmit={(e) => { e.preventDefault(); ask(q); }}>
          <input ref={inputRef} value={q} onChange={(e) => setQ(e.target.value)} placeholder="Ask anything…" autoComplete="off" aria-label="Your question" />
          <button type="submit" aria-label="Send">↗</button>
        </form>
      </div>
    </>
  );
}
