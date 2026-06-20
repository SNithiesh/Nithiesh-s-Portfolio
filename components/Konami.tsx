"use client";
import { useEffect } from "react";
export default function Konami() {
  useEffect(() => {
    console.log("%cBuilt by S. Nithiesh", "color:#56d4c4;font-size:18px;font-weight:700;font-family:monospace");
    console.log("%cAI / ML Engineer · github.com/SNithiesh\nTry the Konami code: ↑ ↑ ↓ ↓ ← → ← → B A", "color:#8b93a7;font-family:monospace;line-height:1.6");
    const seq = ["arrowup", "arrowup", "arrowdown", "arrowdown", "arrowleft", "arrowright", "arrowleft", "arrowright", "b", "a"];
    let i = 0;
    const onKey = (e: KeyboardEvent) => { const k = e.key.toLowerCase(); i = (k === seq[i]) ? i + 1 : (k === seq[0] ? 1 : 0); if (i === seq.length) { i = 0; burst(); } };
    addEventListener("keydown", onKey);
    function burst() {
      if (matchMedia("(prefers-reduced-motion: reduce)").matches) return;
      const c = document.createElement("canvas"); c.className = "confetti"; document.body.appendChild(c);
      const x = c.getContext("2d")!; const W = c.width = innerWidth, H = c.height = innerHeight;
      const cs = getComputedStyle(document.body); const cols = [cs.getPropertyValue("--accent").trim(), cs.getPropertyValue("--accent2").trim(), "#ffffff"];
      const P = Array.from({ length: 170 }, () => ({ x: W / 2, y: H * 0.5, vx: (Math.random() - .5) * 15, vy: (Math.random() - .5) * 15 - 5, s: Math.random() * 6 + 3, c: cols[Math.floor(Math.random() * cols.length)], a: 1, rot: Math.random() * 6 }));
      (function run() { x.clearRect(0, 0, W, H); let alive = false; for (const p of P) { p.vy += .28; p.x += p.vx; p.y += p.vy; p.rot += .15; p.a -= .011; if (p.a > 0) { alive = true; x.save(); x.globalAlpha = Math.max(0, p.a); x.translate(p.x, p.y); x.rotate(p.rot); x.fillStyle = p.c; x.fillRect(-p.s / 2, -p.s / 2, p.s, p.s * 0.6); x.restore(); } } if (alive) requestAnimationFrame(run); else c.remove(); })();
    }
    return () => removeEventListener("keydown", onKey);
  }, []);
  return null;
}
