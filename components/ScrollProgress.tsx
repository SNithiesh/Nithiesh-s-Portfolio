"use client";
import { useEffect } from "react";
export default function ScrollProgress() {
  useEffect(() => {
    const REDUCE = matchMedia("(prefers-reduced-motion: reduce)").matches;
    const bar = document.getElementById("scrollbar");
    const hero = document.querySelector(".hero") as HTMLElement | null;
    const aurora = document.querySelector(".aurora") as HTMLElement | null;
    let ticking = false;
    const update = () => {
      const y = window.scrollY; const max = document.documentElement.scrollHeight - window.innerHeight;
      if (bar) bar.style.width = (max > 0 ? (y / max) * 100 : 0) + "%";
      if (!REDUCE) {
        if (hero) { hero.style.opacity = String(Math.max(0, 1 - y / 900)); }
        if (aurora) aurora.style.transform = `translateY(${y * -0.06}px)`;
      }
      ticking = false;
    };
    const onScroll = () => { if (!ticking) { requestAnimationFrame(update); ticking = true; } };
    window.addEventListener("scroll", onScroll, { passive: true }); update();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return <div className="scroll-progress" id="scrollbar" aria-hidden="true" />;
}
