import { NextResponse } from "next/server";
import { Resend } from "resend";

const toEmail = process.env.CONTACT_EMAIL || process.env.CONTACT_TO_EMAIL;

export async function POST(request: Request) {
  try {
    const { name, email, message } = await request.json();

    if (!process.env.RESEND_API_KEY || !toEmail) {
      return NextResponse.json(
        { error: "Email service is not configured." },
        { status: 500 }
      );
    }

    if (
      !name ||
      typeof name !== "string" ||
      !email ||
      typeof email !== "string" ||
      !message ||
      typeof message !== "string"
    ) {
      return NextResponse.json({ error: "Invalid payload" }, { status: 400 });
    }

    const resend = new Resend(process.env.RESEND_API_KEY);

    await resend.emails.send({
      from: process.env.RESEND_FROM as string,
      to: [toEmail],
      subject: `AI Lab contact form from ${name}`,
      text: `Name: ${name}\nEmail: ${email}\nMessage: ${message}`,
    });

    return NextResponse.json({ ok: true });
  } catch (error: unknown) {
    const msg = error instanceof Error ? error.message : "Failed to send message";
    console.error("Contact form error:", error);
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}
