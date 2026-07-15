import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const data = await req.json();
  const { name, email, company, projectType, goals, budget, timeline, description } = data;

  if (!name || !email || !projectType) {
    return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
  }

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    return NextResponse.json({ error: "Email service not configured" }, { status: 500 });
  }

  const body = `
New project enquiry from ${name}

Email: ${email}
Company: ${company || "—"}
Project Type: ${projectType}
Goals: ${Array.isArray(goals) ? goals.join(", ") : goals || "—"}
Budget: ${budget || "—"}
Timeline: ${timeline || "—"}

Description:
${description || "—"}
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
      subject: `New project enquiry from ${name} — ${projectType}`,
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
