"use client";
import { useEffect, useState } from "react";
export default function Preloader() {
  const [n, setN] = useState(0);
  const [gone, setGone] = useState(false);
  useEffect(() => {
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) { setGone(true); return; }
    let v = 0; const id = setInterval(() => { v = Math.min(100, v + Math.random() * 9 + 4); setN(Math.floor(v)); if (v >= 100) { clearInterval(id); setTimeout(() => setGone(true), 280); } }, 65);
    return () => clearInterval(id);
  }, []);
  return (
    <div className={`preloader${gone ? " gone" : ""}`} aria-hidden="true">
      <div className="pl-num">{n}</div>
      <div className="pl-bar"><span style={{ width: n + "%" }} /></div>
    </div>
  );
}
