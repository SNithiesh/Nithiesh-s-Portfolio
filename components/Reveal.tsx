"use client";
import { useEffect } from "react";
export default function Reveal() {
  useEffect(() => {
    const io = new IntersectionObserver((es) => {
      es.forEach((e) => { if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); } });
    }, { threshold: 0.1 });
    document.querySelectorAll<HTMLElement>(".reveal").forEach((el, i) => {
      el.style.transitionDelay = `${(i % 4) * 60}ms`; io.observe(el);
    });
    return () => io.disconnect();
  }, []);
  return null;
}
