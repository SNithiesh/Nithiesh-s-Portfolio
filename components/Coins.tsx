"use client";
import { useEffect } from "react";
export default function Coins() {
  useEffect(() => {
    const REDUCE = matchMedia("(prefers-reduced-motion: reduce)").matches;
    let cv: HTMLCanvasElement | null = null, cx: CanvasRenderingContext2D | null = null, parts: any[] = [], raf = 0;
    const resize = () => { if (cv) { cv.width = innerWidth; cv.height = innerHeight; } };
    const ensure = () => { if (cv) return; cv = document.createElement("canvas"); cv.className = "confetti"; document.body.appendChild(cv); cx = cv.getContext("2d"); resize(); addEventListener("resize", resize, { passive: true }); };
    const loop = () => {
      if (!cx || !cv) return;
      cx.clearRect(0, 0, cv.width, cv.height); let alive = false;
      for (const p of parts) { p.vy += .45; p.x += p.vx; p.y += p.vy; p.a -= .012; if (p.a > 0 && p.y < cv.height + 30) { alive = true; cx.globalAlpha = Math.max(0, p.a); cx.fillStyle = p.c; cx.fillRect(Math.round(p.x), Math.round(p.y), p.s, p.s); } }
      cx.globalAlpha = 1; if (alive) raf = requestAnimationFrame(loop); else { raf = 0; parts = []; }
    };
    const onClick = (e: MouseEvent) => {
      if (document.body.getAttribute("data-theme") !== "arcade" || REDUCE) return;
      ensure();
      const cols = ["#ffd60a", "#ff2e88", "#00e5ff", "#ffffff"];
      for (let i = 0; i < 4; i++) parts.push({ x: e.clientX, y: e.clientY, vx: (Math.random() - .5) * 5, vy: -(Math.random() * 7 + 7), s: Math.random() * 5 + 5, c: cols[Math.floor(Math.random() * cols.length)], a: 1 });
      if (!raf) loop();
    };
    addEventListener("click", onClick);
    return () => { removeEventListener("click", onClick); removeEventListener("resize", resize); cancelAnimationFrame(raf); cv?.remove(); };
  }, []);
  return null;
}
