"use client";
import { useState } from "react";
import { contact } from "@/content/projects";
export default function Contact() {
  const [status, setStatus] = useState("");
  const [sending, setSending] = useState(false);
  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const f = new FormData(e.currentTarget);
    const body = { name: f.get("name"), email: f.get("email"), message: f.get("message") };
    setSending(true); setStatus("Sending…");
    try {
      // Public Formspree endpoint (same one the static site uses). Change it here if needed.
      const res = await fetch("https://formspree.io/f/xqeopjlv", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify(body),
      });
      setStatus(res.ok ? "Thanks — message sent." : "Something went wrong; email me directly.");
      if (res.ok) (e.target as HTMLFormElement).reset();
    } catch { setStatus("Network error; email me directly."); }
    finally { setSending(false); }
  }
  return (
    <section id="contact">
      <div className="sec-head reveal"><span className="idx">/06</span><h2>Talk.</h2></div>
      <div className="contact-wrap reveal">
        <form className="contact-form glass" onSubmit={onSubmit} noValidate>
          <p className="form-intro mono">Send a message</p>
          <div className="field"><label htmlFor="cf-name">Name</label><input id="cf-name" name="name" type="text" autoComplete="name" required /></div>
          <div className="field"><label htmlFor="cf-email">Email</label><input id="cf-email" name="email" type="email" autoComplete="email" required /></div>
          <div className="field"><label htmlFor="cf-msg">Message</label><textarea id="cf-msg" name="message" rows={4} required /></div>
          <button type="submit" className="btn btn-primary" disabled={sending}>Send ↗</button>
          <p className="form-status" role="status" aria-live="polite">{status}</p>
        </form>
        <div className="contact-grid">
          {contact.map((c) => (
            <a className="contact-cell glass" href={c.href} target="_blank" rel="noreferrer" key={c.label}>
              <div className="label">{c.label}</div><div className="val">{c.val}</div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
