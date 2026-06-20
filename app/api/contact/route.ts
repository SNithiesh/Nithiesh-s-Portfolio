import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const { name, email, message } = await req.json().catch(() => ({}));
  if (!name || !email || !message) {
    return NextResponse.json({ error: "Missing fields." }, { status: 400 });
  }
  const key = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_TO_EMAIL;
  if (!key || !to) return NextResponse.json({ error: "Email not configured." }, { status: 500 });

  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: { authorization: `Bearer ${key}`, "content-type": "application/json" },
    body: JSON.stringify({
      from: "Portfolio <onboarding@resend.dev>", // replace with your verified domain sender
      to: [to],
      reply_to: email,
      subject: `Portfolio message from ${name}`,
      text: `From: ${name} <${email}>\n\n${message}`,
    }),
  });
  if (!res.ok) return NextResponse.json({ error: "Send failed." }, { status: 502 });
  return NextResponse.json({ ok: true });
}
