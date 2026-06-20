"use client";
import { useEffect, useState } from "react";
export default function ToTop() {
  const [show, setShow] = useState(false);
  useEffect(() => { const on = () => setShow(window.scrollY > 600); addEventListener("scroll", on, { passive: true }); return () => removeEventListener("scroll", on); }, []);
  const click = () => { const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches; scrollTo({ top: 0, behavior: reduce ? "auto" : "smooth" }); };
  return <button className={`to-top${show ? " show" : ""}`} aria-label="Back to top" onClick={click}>↑</button>;
}
