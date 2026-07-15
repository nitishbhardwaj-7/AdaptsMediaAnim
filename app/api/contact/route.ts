import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const { fullName, email, phone, company, subject, message } = await req.json();

  if (!fullName || !email || !message) {
    return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
  }

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    return NextResponse.json({ error: "Email service not configured" }, { status: 500 });
  }

  const body = `
New contact form submission from ${fullName}

Email: ${email}
Phone: ${phone || "—"}
Company: ${company || "—"}
Subject: ${subject || "—"}

Message:
${message}
  `.trim();

  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: "website@adaptsmedia.com",
      to: ["info@adaptsmedia.com"],
      reply_to: email,
      subject: `Website enquiry from ${fullName}${subject ? ` — ${subject}` : ""}`,
      text: body,
    }),
  });

  if (!res.ok) {
    const err = await res.text();
    console.error("Resend error:", err);
    return NextResponse.json({ error: "Failed to send email" }, { status: 500 });
  }

  return NextResponse.json({ ok: true });
}
