"use client";
import { useEffect, useRef } from "react";
export default function NeuralCanvas() {
  const ref = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const canvas = ref.current; if (!canvas) return;
    const ctx = canvas.getContext("2d"); if (!ctx) return;
    const REDUCE = matchMedia("(prefers-reduced-motion: reduce)").matches;
    let w = 0, h = 0, nodes: any[] = [], raf = 0, paused = false;
    const mouse = { x: -9999, y: -9999 };
    const accent = () => (getComputedStyle(document.body).getPropertyValue("--accent") || "#56d4c4").trim();
    const size = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = window.innerWidth; h = window.innerHeight;
      canvas.width = w * dpr; canvas.height = h * dpr;
      canvas.style.width = w + "px"; canvas.style.height = h + "px"; ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      const count = Math.max(40, Math.min(130, Math.floor((w * h) / 15000)));
      nodes = Array.from({ length: count }, () => ({ x: Math.random() * w, y: Math.random() * h, vx: (Math.random() - .5) * .26, vy: (Math.random() - .5) * .26, r: Math.random() * 1.6 + .7 }));
    };
    const draw = () => {
      ctx.clearRect(0, 0, w, h); const ac = accent();
      for (const n of nodes) { n.x += n.vx; n.y += n.vy; if (n.x < 0 || n.x > w) n.vx *= -1; if (n.y < 0 || n.y > h) n.vy *= -1; }
      for (let i = 0; i < nodes.length; i++) for (let j = i + 1; j < nodes.length; j++) {
        const a = nodes[i], b = nodes[j], d = Math.hypot(a.x - b.x, a.y - b.y);
        if (d < 120) { ctx.strokeStyle = ac; ctx.globalAlpha = (1 - d / 120) * .14; ctx.lineWidth = .6; ctx.beginPath(); ctx.moveTo(a.x, a.y); ctx.lineTo(b.x, b.y); ctx.stroke(); }
      }
      for (const n of nodes) { const d = Math.hypot(n.x - mouse.x, n.y - mouse.y); if (d < 175) { ctx.strokeStyle = ac; ctx.globalAlpha = (1 - d / 175) * .5; ctx.lineWidth = .8; ctx.beginPath(); ctx.moveTo(n.x, n.y); ctx.lineTo(mouse.x, mouse.y); ctx.stroke(); } }
      for (const n of nodes) { const near = Math.hypot(n.x - mouse.x, n.y - mouse.y) < 175; ctx.fillStyle = ac; ctx.globalAlpha = near ? .9 : .4; ctx.beginPath(); ctx.arc(n.x, n.y, near ? n.r * 1.7 : n.r, 0, 6.283); ctx.fill(); }
      ctx.globalAlpha = 1; if (!paused) raf = requestAnimationFrame(draw);
    };
    const onMove = (e: MouseEvent) => { mouse.x = e.clientX; mouse.y = e.clientY; };
    const onLeave = () => { mouse.x = mouse.y = -9999; };
    let rt: any; const onResize = () => { clearTimeout(rt); rt = setTimeout(size, 150); };
    window.addEventListener("mousemove", onMove, { passive: true }); window.addEventListener("mouseleave", onLeave); window.addEventListener("resize", onResize);
    size();
    const pause = () => { paused = true; cancelAnimationFrame(raf); };
    const resume = () => { if (paused) { paused = false; draw(); } };
    const vis = () => (document.hidden ? pause() : resume());
    if (REDUCE) { ctx.globalAlpha = .45; const ac = accent(); for (const n of nodes) { ctx.fillStyle = ac; ctx.beginPath(); ctx.arc(n.x, n.y, n.r, 0, 6.283); ctx.fill(); } }
    else { draw(); document.addEventListener("visibilitychange", vis); }
    return () => { cancelAnimationFrame(raf); window.removeEventListener("mousemove", onMove); window.removeEventListener("mouseleave", onLeave); window.removeEventListener("resize", onResize); document.removeEventListener("visibilitychange", vis); };
  }, []);
  return <canvas ref={ref} className="neural" aria-hidden="true" />;
}
