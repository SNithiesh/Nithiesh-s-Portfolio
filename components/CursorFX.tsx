"use client";
import { useEffect } from "react";
export default function CursorFX() {
  useEffect(() => {
    const REDUCE = matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (REDUCE || !matchMedia("(hover:hover) and (pointer:fine)").matches) return;
    const dot = document.createElement("div"); dot.className = "cursor-dot";
    const ring = document.createElement("div"); ring.className = "cursor-ring";
    document.body.append(dot, ring); document.body.classList.add("cursor-on");
    let mx = innerWidth / 2, my = innerHeight / 2, rx = mx, ry = my, raf = 0;
    const move = (e: MouseEvent) => { mx = e.clientX; my = e.clientY; dot.style.transform = `translate(${mx}px,${my}px) translate(-50%,-50%)`; };
    const loop = () => { rx += (mx - rx) * .18; ry += (my - ry) * .18; ring.style.transform = `translate(${rx}px,${ry}px) translate(-50%,-50%)`; raf = requestAnimationFrame(loop); };
    const HOT = "a,button,.swatch,.cmdk-item,.stat,.proj,.contact-cell,input,textarea";
    const over = (e: Event) => { if ((e.target as HTMLElement).closest(HOT)) ring.classList.add("hot"); };
    const out = (e: Event) => { if ((e.target as HTMLElement).closest(HOT)) ring.classList.remove("hot"); };
    addEventListener("mousemove", move, { passive: true }); addEventListener("mouseover", over); addEventListener("mouseout", out); loop();
    return () => { cancelAnimationFrame(raf); removeEventListener("mousemove", move); removeEventListener("mouseover", over); removeEventListener("mouseout", out); dot.remove(); ring.remove(); document.body.classList.remove("cursor-on"); };
  }, []);
  return null;
}
