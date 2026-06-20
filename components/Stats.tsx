"use client";
import { useEffect, useRef } from "react";
import { metrics } from "@/content/projects";

const ICONS = [
  '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/></svg>',
  '<svg viewBox="0 0 24 24" fill="currentColor"><rect x="3" y="12" width="4" height="8" rx="1"/><rect x="10" y="6" width="4" height="14" rx="1"/><rect x="17" y="9" width="4" height="11" rx="1"/></svg>',
  '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><circle cx="6" cy="6" r="2.4"/><circle cx="6" cy="18" r="2.4"/><circle cx="18" cy="8" r="2.4"/><path d="M6 8.4v7.2M18 10.4c0 4-6 1-6 5.2"/></svg>',
  '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.4"><path d="M12 2l9 5v10l-9 5-9-5V7z"/><path d="M12 12l9-5M12 12v10M12 12L3 7"/></svg>',
];

export default function Stats() {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const strip = ref.current; if (!strip) return;
    const REDUCE = matchMedia("(prefers-reduced-motion: reduce)").matches;
    const fine = matchMedia("(hover:hover) and (pointer:fine)").matches;

    const run = () => strip.querySelectorAll<HTMLElement>(".num").forEach((el) => {
      const target = Number(el.dataset.target), suffix = el.dataset.suffix || "";
      if (REDUCE) { el.textContent = target + suffix; return; }
      const dur = 1200, t0 = performance.now();
      const step = (t: number) => { const p = Math.min(1, (t - t0) / dur); const e = 1 - Math.pow(1 - p, 3); el.textContent = Math.round(target * e) + suffix; if (p < 1) requestAnimationFrame(step); };
      requestAnimationFrame(step);
    });
    const ob = new IntersectionObserver((es) => es.forEach((e) => { if (e.isIntersecting) { run(); ob.disconnect(); } }), { threshold: .4 });
    ob.observe(strip);

    // 3D tilt
    let cleanups: (() => void)[] = [];
    if (!REDUCE && fine) {
      strip.querySelectorAll<HTMLElement>(".stat").forEach((el) => {
        const move = (e: MouseEvent) => { const r = el.getBoundingClientRect(); const px = (e.clientX - r.left) / r.width - .5, py = (e.clientY - r.top) / r.height - .5; el.style.transform = `perspective(800px) rotateY(${px * 7}deg) rotateX(${-py * 7}deg) translateY(-4px)`; };
        const leave = () => { el.style.transform = ""; };
        el.addEventListener("mousemove", move); el.addEventListener("mouseleave", leave);
        cleanups.push(() => { el.removeEventListener("mousemove", move); el.removeEventListener("mouseleave", leave); });
      });
    }
    return () => { ob.disconnect(); cleanups.forEach((c) => c()); };
  }, []);

  return (
    <div className="stats-strip reveal" ref={ref}>
      {metrics.map((m, i) => (
        <div className="stat" key={m.label}>
          <div className="ic" dangerouslySetInnerHTML={{ __html: ICONS[i] || "" }} />
          <div className="num" data-target={m.n} data-suffix={m.suffix}>0{m.suffix}</div>
          <div className="lbl">{m.label}</div>
        </div>
      ))}
    </div>
  );
}
