"use client";
import { useEffect } from "react";
export default function Effects() {
  useEffect(() => {
    const REDUCE = matchMedia("(prefers-reduced-motion: reduce)").matches;
    const fine = matchMedia("(hover:hover) and (pointer:fine)").matches;
    const cleanups: (() => void)[] = [];

    // scramble hero name
    const grad = document.querySelector<HTMLElement>(".hero h1 .grad");
    if (grad && !REDUCE) {
      const final = grad.textContent || "", chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ#%*<>";
      let f = 0; const id = setInterval(() => { f++;
        grad.textContent = final.split("").map((c, i) => (i < f / 2 ? final[i] : chars[Math.floor(Math.random() * chars.length)])).join("");
        if (f / 2 >= final.length) { grad.textContent = final; clearInterval(id); }
      }, 45);
      cleanups.push(() => clearInterval(id));
    }

    if (fine && !REDUCE) {
      // magnetic buttons
      document.querySelectorAll<HTMLElement>(".btn, .cmdk-trigger").forEach((el) => {
        const m = (e: MouseEvent) => { const r = el.getBoundingClientRect(); el.style.transform = `translate(${(e.clientX - r.left - r.width / 2) * 0.3}px, ${(e.clientY - r.top - r.height / 2) * 0.4}px)`; };
        const l = () => { el.style.transform = ""; };
        el.addEventListener("mousemove", m); el.addEventListener("mouseleave", l);
        cleanups.push(() => { el.removeEventListener("mousemove", m); el.removeEventListener("mouseleave", l); });
      });
      // 3D tilt on project cards
      document.querySelectorAll<HTMLElement>(".proj").forEach((el) => {
        const m = (e: MouseEvent) => { const r = el.getBoundingClientRect(); const px = (e.clientX - r.left) / r.width - .5, py = (e.clientY - r.top) / r.height - .5; el.style.transform = `perspective(800px) rotateY(${px * 6}deg) rotateX(${-py * 6}deg) translateY(-4px)`; };
        const l = () => { el.style.transform = ""; };
        el.addEventListener("mousemove", m); el.addEventListener("mouseleave", l);
        cleanups.push(() => { el.removeEventListener("mousemove", m); el.removeEventListener("mouseleave", l); });
      });
    }
    if (fine) {
      // spotlight on cards
      document.querySelectorAll<HTMLElement>(".proj, .stat").forEach((el) => {
        const m = (e: MouseEvent) => { const r = el.getBoundingClientRect(); el.style.setProperty("--mx", e.clientX - r.left + "px"); el.style.setProperty("--my", e.clientY - r.top + "px"); };
        el.addEventListener("mousemove", m); cleanups.push(() => el.removeEventListener("mousemove", m));
      });
    }

    // scroll-spy
    const ids = ["about", "stack", "experience", "work", "contact"];
    const spy = new IntersectionObserver((es) => es.forEach((e) => {
      if (e.isIntersecting) {
        document.querySelectorAll(".navlinks a").forEach((a) => a.classList.remove("active"));
        document.querySelector(`.navlinks a[href="#${e.target.id}"]`)?.classList.add("active");
      }
    }), { rootMargin: "-45% 0px -50% 0px" });
    ids.forEach((id) => { const el = document.getElementById(id); if (el) spy.observe(el); });
    cleanups.push(() => spy.disconnect());

    return () => cleanups.forEach((c) => c());
  }, []);
  return null;
}
