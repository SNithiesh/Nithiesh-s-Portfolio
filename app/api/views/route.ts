import { NextResponse } from "next/server";
import { kv } from "@/lib/kv";
export const runtime = "edge";

export async function GET() {
  const count = (await kv.get("views:home")) ?? 0;
  return NextResponse.json({ count });
}
export async function POST() {
  const count = await kv.incr("views:home");
  return NextResponse.json({ count });
}
