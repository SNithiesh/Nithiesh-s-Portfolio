import { NextRequest, NextResponse } from "next/server";
import { kv } from "@/lib/kv";
export const runtime = "edge";

type Entry = { name: string; message: string; at: number };
const clean = (s: string) => s.replace(/[<>]/g, "").trim();

const hits = new Map<string, { n: number; t: number }>();
function limited(ip: string) {
  const now = Date.now(); const r = hits.get(ip);
  if (!r || now - r.t > 60_000) { hits.set(ip, { n: 1, t: now }); return false; }
  r.n++; return r.n > 3;
}

export async function GET() {
  const raw = (await kv.lrange("guestbook", 0, 49)) ?? [];
  const entries: Entry[] = raw.map((s) => { try { return JSON.parse(s); } catch { return null; } }).filter(Boolean) as Entry[];
  return NextResponse.json({ entries });
}

export async function POST(req: NextRequest) {
  const ip = req.headers.get("x-forwarded-for") ?? "anon";
  if (limited(ip)) return NextResponse.json({ error: "Slow down a moment." }, { status: 429 });
  const body = await req.json().catch(() => ({}));
  const name = clean(String(body.name ?? "")).slice(0, 40);
  const message = clean(String(body.message ?? "")).slice(0, 200);
  if (!name || !message) return NextResponse.json({ error: "Name and message required." }, { status: 400 });
  const entry: Entry = { name, message, at: Date.now() };
  await kv.lpush("guestbook", JSON.stringify(entry));
  return NextResponse.json({ ok: true, entry });
}
