"use client";
import { useEffect, useState } from "react";
const themes = [
  { id: "aurora", c: "#56d4c4", t: "Aurora · glass" },
  { id: "terminal", c: "#39ff14", t: "Terminal · hacker" },
  { id: "arcade", c: "#ff2e88", t: "Arcade · playful" },
  { id: "editorial", c: "#e9e6df", t: "Editorial · clean light" },
];
const links = [
  ["#about", "ABOUT"], ["#stack", "STACK"], ["#experience", "EXPERIENCE"],
  ["#work", "WORK"], ["#ask", "ASK AI"], ["#contact", "CONTACT"],
];
export default function Nav() {
  const [menuOpen, setMenuOpen] = useState(false);
  useEffect(() => {
    const onScroll = () => document.getElementById("nav")?.classList.toggle("scrolled", window.scrollY > 40);
    addEventListener("scroll", onScroll); return () => removeEventListener("scroll", onScroll);
  }, []);
  const set = (id: string) => { document.documentElement.setAttribute("data-theme", id); document.body.setAttribute("data-theme", id); };
  return (
    <nav id="nav" aria-label="Primary">
      <a href="#home" className="logo">dvx.mn</a>
      <div className={`navlinks${menuOpen ? " open" : ""}`}>
        {links.map(([href, label]) => (
          <a key={href} href={href} onClick={() => setMenuOpen(false)}>{label}</a>
        ))}
      </div>
      <div className="nav-right">
        <button className="menu-toggle" aria-label="Menu" aria-expanded={menuOpen} onClick={() => setMenuOpen((o) => !o)}>☰</button>
        <button className="cmdk-trigger" aria-label="Open command palette" title="Command palette"
          onClick={() => window.dispatchEvent(new Event("open-cmdk"))}>
          <span className="mono">⌘K</span>
        </button>
        <div className="themebtn" title="Try different themes!">
          <span className="mono" style={{ fontSize: 10 }}>THEME</span>
          {themes.map((t) => (
            <span key={t.id} className="swatch" role="button" tabIndex={0}
              aria-label={`Switch to ${t.id} theme`} title={t.t} style={{ background: t.c }}
              onClick={() => set(t.id)}
              onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); set(t.id); } }} />
          ))}
        </div>
      </div>
    </nav>
  );
}
