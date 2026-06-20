"use client";
import { useState } from "react";

const SUGGESTIONS = [
  "What AI/ML experience does Nithiesh have?",
  "Tell me about the portfolio optimizer project.",
  "Does he have NLP experience?",
];

export default function AskMyPortfolio() {
  const [q, setQ] = useState("");
  const [answer, setAnswer] = useState("");
  const [loading, setLoading] = useState(false);

  async function ask(question: string) {
    if (!question.trim()) return;
    setLoading(true); setAnswer("");
    try {
      const res = await fetch("/api/ask", {
        method: "POST", headers: { "content-type": "application/json" },
        body: JSON.stringify({ question }),
      });
      const data = await res.json();
      setAnswer(res.ok ? data.answer : (data.error ?? "Something went wrong."));
    } catch { setAnswer("Network error — try again."); }
    finally { setLoading(false); }
  }

  return (
    <section id="ask">
      <div className="sec-head reveal"><span className="idx">/05</span><h2>Ask my portfolio.</h2></div>
      <div className="ask-card glass reveal">
        <p className="mono" style={{ marginBottom: 14 }}>An AI assistant that answers questions about my work — RAG over my résumé &amp; projects.</p>
        <div className="ask-row">
          <input value={q} onChange={(e) => setQ(e.target.value)}
            onKeyDown={(e) => { if (e.key === "Enter") ask(q); }}
            placeholder="Ask anything about my experience…" aria-label="Ask about my portfolio" />
          <button className="btn btn-primary" onClick={() => ask(q)} disabled={loading}>{loading ? "Thinking…" : "Ask ↗"}</button>
        </div>
        <div className="ask-suggest">
          {SUGGESTIONS.map((s) => (<button key={s} className="ptag-btn" onClick={() => { setQ(s); ask(s); }}>{s}</button>))}
        </div>
        {answer && <div className="ask-answer" role="status" aria-live="polite">{answer}</div>}
      </div>
    </section>
  );
}
