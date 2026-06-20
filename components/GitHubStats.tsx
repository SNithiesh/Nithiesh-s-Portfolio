"use client";
import { useEffect, useState } from "react";
export default function GitHubStats() {
  const [txt, setTxt] = useState("");
  useEffect(() => {
    (async () => {
      try {
        const u = await fetch("https://api.github.com/users/SNithiesh").then((r) => (r.ok ? r.json() : null));
        if (!u || typeof u.public_repos !== "number") return;
        let stars = 0;
        try {
          const repos = await fetch("https://api.github.com/users/SNithiesh/repos?per_page=100").then((r) => (r.ok ? r.json() : []));
          if (Array.isArray(repos)) stars = repos.reduce((a: number, r: any) => a + (r.stargazers_count || 0), 0);
        } catch {}
        setTxt(`Live from GitHub — ${u.public_repos} repos · ${stars} stars · ${u.followers} followers`);
      } catch {}
    })();
  }, []);
  if (!txt) return null;
  return <div className="gh-live" aria-live="polite"><span className="gh-dot" />{txt}</div>;
}
