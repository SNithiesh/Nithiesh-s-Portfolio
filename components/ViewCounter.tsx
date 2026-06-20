"use client";
import { useEffect, useState } from "react";

export default function ViewCounter() {
  const [count, setCount] = useState<number | null>(null);
  useEffect(() => {
    let done = false;
    fetch("/api/views", { method: "POST" })
      .then((r) => r.json())
      .then((d) => { if (!done) setCount(d.count ?? null); })
      .catch(() => {});
    return () => { done = true; };
  }, []);
  return <span className="mono">{count === null ? "—" : count.toLocaleString()} views</span>;
}
