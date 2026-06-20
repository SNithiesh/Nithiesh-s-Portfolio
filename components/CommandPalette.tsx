"use client";
import { useCallback, useEffect, useRef, useState } from "react";
import { site } from "@/config/site";

type Cmd = { ico: string; lbl: string; hint: string; run: () => void };
type Mode = "commands" | "ask";

const SUGGESTIONS = [
  "What AI/ML experience does Nithiesh have?",
  "Tell me about the portfolio optimizer.",
  "Does he have NLP experience?",
];

export default function CommandPalette() {
  const [open, setOpen] = useState(false);
  const [mode, setMode] = useState<Mode>("commands");
  const [q, setQ] = useState("");
  const [active, setActive] = useState(0);
  const [answer, setAnswer] = useState("");
  const [asking, setAsking] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const close = useCallback(() => setOpen(false), []);
  const setTheme = (id: string) => document.documentElement.setAttribute("data-theme", id);
  const go = (id: string) => { close(); document.querySelector(id)?.scrollIntoView({ behavior: "smooth" }); };

  const enterAsk = (question?: string) => {
    setMode("ask"); setAnswer("");
    if (question) { setQ(question); runAsk(question); } else { setQ(""); }
    setTimeout(() => inputRef.current?.focus(), 0);
  };

  async function runAsk(question: string) {
    if (!question.trim()) return;
    setAsking(true); setAnswer("");
    try {
      const res = await fetch("/api/ask", {
        method: "POST", headers: { "content-type": "application/json" },
        body: JSON.stringify({ question }),
      });
      const data = await res.json();
      setAnswer(res.ok ? data.answer : (data.error ?? "Something went wrong."));
    } catch { setAnswer("Network error — try again."); }
    finally { setAsking(false); }
  }

  const commands: Cmd[] = [
    { ico: "✦", lbl: "Ask my portfolio (AI)", hint: "ai", run: () => enterAsk() },
    { ico: "→", lbl: "Go to About", hint: "nav", run: () => go("#about") },
    { ico: "→", lbl: "Go to Stack", hint: "nav", run: () => go("#stack") },
    { ico: "→", lbl: "Go to Experience", hint: "nav", run: () => go("#experience") },
    { ico: "→", lbl: "Go to Work", hint: "nav", run: () => go("#work") },
    { ico: "→", lbl: "Go to Contact", hint: "nav", run: () => go("#contact") },
    { ico: "◐", lbl: "Theme — Aurora (glass)", hint: "theme", run: () => { setTheme("aurora"); close(); } },
    { ico: "◐", lbl: "Theme — Terminal (hacker)", hint: "theme", run: () => { setTheme("terminal"); close(); } },
    { ico: "◐", lbl: "Theme — Arcade (playful)", hint: "theme", run: () => { setTheme("arcade"); close(); } },
    { ico: "◐", lbl: "Theme — Editorial (light)", hint: "theme", run: () => { setTheme("editorial"); close(); } },
    { ico: "@", lbl: "Copy email address", hint: "copy", run: async () => { try { await navigator.clipboard.writeText(site.email); } catch {} close(); } },
    { ico: "↗", lbl: "Download résumé", hint: "open", run: () => { window.open(site.resumeUrl, "_blank"); close(); } },
    { ico: "⎙", lbl: "Print / Save as résumé (PDF)", hint: "print", run: () => { close(); setTimeout(() => window.print(), 150); } },
    { ico: "↗", lbl: "Open GitHub", hint: "open", run: () => { window.open(site.socials.github, "_blank"); close(); } },
    { ico: "↗", lbl: "Open LinkedIn", hint: "open", run: () => { window.open(site.socials.linkedin, "_blank"); close(); } },
  ];

  const matched = q.trim()
    ? commands.filter((c) => c.lbl.toLowerCase().includes(q.toLowerCase()) || c.hint.includes(q.toLowerCase()))
    : commands;
  // when there's free text, always offer an inline "Ask AI" action
  const askItem: Cmd | null = q.trim()
    ? { ico: "✦", lbl: `Ask AI: “${q.trim()}”`, hint: "enter", run: () => enterAsk(q.trim()) }
    : null;
  const items = askItem ? [askItem, ...matched] : matched;

  useEffect(() => {
    const openPalette = () => { setMode("commands"); setQ(""); setActive(0); setAnswer(""); setOpen(true); };
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") { e.preventDefault(); setOpen((o) => !o); }
      else if (e.key === "/" && !open && !/input|textarea/i.test(document.activeElement?.tagName ?? "")) { e.preventDefault(); openPalette(); }
    };
    window.addEventListener("keydown", onKey);
    window.addEventListener("open-cmdk", openPalette as EventListener);
    return () => { window.removeEventListener("keydown", onKey); window.removeEventListener("open-cmdk", openPalette as EventListener); };
  }, [open]);

  useEffect(() => { if (open) { setMode("commands"); setTimeout(() => inputRef.current?.focus(), 0); } }, [open]);

  if (!open) return null;

  return (
    <div className="cmdk-overlay" role="dialog" aria-modal="true" aria-label="Command palette"
      onClick={(e) => { if (e.target === e.currentTarget) close(); }}
      onKeyDown={(e) => {
        if (e.key === "Escape") { mode === "ask" ? setMode("commands") : close(); return; }
        if (mode === "ask") { if (e.key === "Enter") { e.preventDefault(); runAsk(q); } return; }
        if (e.key === "ArrowDown") { e.preventDefault(); setActive((a) => (a + 1) % items.length); }
        else if (e.key === "ArrowUp") { e.preventDefault(); setActive((a) => (a - 1 + items.length) % items.length); }
        else if (e.key === "Enter") { e.preventDefault(); items[active]?.run(); }
      }}>
      <div className="cmdk-panel glass">
        <input ref={inputRef} className="cmdk-input" value={q}
          placeholder={mode === "ask" ? "Ask anything about my experience…" : "Type a command, or ask a question…"}
          aria-label={mode === "ask" ? "Ask the portfolio assistant" : "Search commands"} autoComplete="off"
          onChange={(e) => { setQ(e.target.value); setActive(0); }} />

        {mode === "commands" && (
          <>
            <ul className="cmdk-list" role="listbox" aria-label="Commands">
              {items.length === 0 && <li className="cmdk-empty">No matching commands.</li>}
              {items.map((c, i) => (
                <li key={c.lbl} className="cmdk-item" role="option" aria-selected={i === active}
                  onMouseMove={() => setActive(i)} onClick={() => c.run()}>
                  <span className="ico">{c.ico}</span><span className="lbl">{c.lbl}</span><span className="hint">{c.hint}</span>
                </li>
              ))}
            </ul>
            <div className="cmdk-foot mono"><span>↑↓ navigate</span><span>↵ select</span><span>esc close</span></div>
          </>
        )}

        {mode === "ask" && (
          <div className="cmdk-ask">
            {!answer && !asking && (
              <div className="cmdk-suggest">
                {SUGGESTIONS.map((s) => (
                  <button key={s} className="ptag-btn" onClick={() => { setQ(s); runAsk(s); }}>{s}</button>
                ))}
              </div>
            )}
            {asking && <div className="cmdk-answer mono">Thinking…</div>}
            {answer && !asking && <div className="cmdk-answer" role="status" aria-live="polite">{answer}</div>}
            <div className="cmdk-foot mono"><span>↵ ask</span><span>esc ← commands</span></div>
          </div>
        )}
      </div>
    </div>
  );
}
