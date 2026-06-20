import { NextRequest, NextResponse } from "next/server";
import { buildPortfolioContext } from "@/lib/portfolioContext";

export const runtime = "edge";

// Small in-memory rate limit (per warm instance). Free OpenRouter models are
// already capped (~20 req/min, ~200 req/day), so this just adds a friendly local guard.
const hits = new Map<string, { n: number; t: number }>();
function limited(ip: string) {
  const now = Date.now();
  const rec = hits.get(ip);
  if (!rec || now - rec.t > 60_000) { hits.set(ip, { n: 1, t: now }); return false; }
  rec.n += 1;
  return rec.n > 8; // 8 questions / minute / IP
}

export async function POST(req: NextRequest) {
  const ip = req.headers.get("x-forwarded-for") ?? "anon";
  if (limited(ip)) return NextResponse.json({ error: "Too many questions, give it a minute." }, { status: 429 });

  const { question } = await req.json().catch(() => ({ question: "" }));
  if (!question || typeof question !== "string" || question.length > 500) {
    return NextResponse.json({ error: "Ask a short question." }, { status: 400 });
  }

  const key = process.env.OPENROUTER_API_KEY;
  if (!key) return NextResponse.json({ error: "AI not configured." }, { status: 500 });

  // Any OpenRouter model id works. Models ending in ":free" cost nothing.
  // "openrouter/free" auto-routes to whatever free model is available — most resilient
  // since the free roster changes. Override via the OPENROUTER_MODEL env var, e.g.
  // "meta-llama/llama-3.3-70b-instruct:free" or "deepseek/deepseek-r1:free".
  const model = process.env.OPENROUTER_MODEL || "openrouter/free";

  const system =
    "You are the portfolio assistant for S. Nithiesh. Answer recruiter and visitor questions " +
    "ONLY from the facts below. Be concise, confident, and specific. If something isn't covered, " +
    "say so briefly and point them to the contact section. Never invent skills or experience.\n\n" +
    "=== PORTFOLIO FACTS ===\n" + buildPortfolioContext();

  let res: Response;
  try {
    res = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        "content-type": "application/json",
        authorization: `Bearer ${key}`,
        // Optional, recommended by OpenRouter (shows your site on their rankings):
        "HTTP-Referer": process.env.SITE_URL || "http://localhost:3000",
        "X-Title": "S. Nithiesh - Portfolio",
      },
      body: JSON.stringify({
        model,
        max_tokens: 400,
        messages: [
          { role: "system", content: system },
          { role: "user", content: question },
        ],
      }),
    });
  } catch {
    return NextResponse.json({ error: "Couldn't reach the AI service — check your connection and try again." }, { status: 502 });
  }

  if (!res.ok) {
    const detail = await res.text().catch(() => "");
    const hint = res.status === 401 ? "Invalid or missing OpenRouter API key."
      : res.status === 429 ? "Rate limit hit — wait a minute and try again."
      : "AI request failed.";
    return NextResponse.json({ error: hint, detail: detail.slice(0, 200) }, { status: res.status });
  }
  const data = await res.json().catch(() => null);
  const answer = (data?.choices?.[0]?.message?.content ?? "").trim();
  if (!answer) return NextResponse.json({ error: "The model returned an empty answer — try again or rephrase." }, { status: 502 });
  return NextResponse.json({ answer });
}
