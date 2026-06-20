"use client";
import { useEffect, useState } from "react";

type Entry = { name: string; message: string; at: number };

export default function Guestbook() {
  const [entries, setEntries] = useState<Entry[]>([]);
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState("");

  useEffect(() => {
    fetch("/api/guestbook").then((r) => r.json()).then((d) => setEntries(d.entries ?? [])).catch(() => {});
  }, []);

  async function sign() {
    if (!name.trim() || !message.trim()) { setStatus("Add your name and a message."); return; }
    setStatus("Signing…");
    try {
      const res = await fetch("/api/guestbook", { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify({ name, message }) });
      const d = await res.json();
      if (res.ok) { setEntries((e) => [d.entry, ...e]); setName(""); setMessage(""); setStatus("Thanks for signing!"); }
      else setStatus(d.error ?? "Could not sign.");
    } catch { setStatus("Network error."); }
  }

  return (
    <section id="guestbook">
      <div className="sec-head reveal"><span className="idx">/07</span><h2>Guestbook.</h2></div>
      <div className="gb-card glass reveal">
        <div className="gb-row">
          <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Name" aria-label="Your name" maxLength={40} />
          <input value={message} onChange={(e) => setMessage(e.target.value)} placeholder="Leave a message…" aria-label="Your message" maxLength={200}
            onKeyDown={(e) => { if (e.key === "Enter") sign(); }} />
          <button className="btn btn-primary" onClick={sign}>Sign ↗</button>
        </div>
        {status && <p className="form-status">{status}</p>}
        <ul className="gb-list">
          {entries.length === 0 && <li className="gb-empty">Be the first to sign.</li>}
          {entries.map((e, i) => (
            <li className="gb-entry" key={i}><span className="gb-name">{e.name}</span><span className="gb-msg">{e.message}</span></li>
          ))}
        </ul>
      </div>
    </section>
  );
}
