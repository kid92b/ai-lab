import { NextResponse } from "next/server";
import Groq from "groq-sdk";

export async function POST(req: Request) {
  try {
    const { message, lang, history } = await req.json();

    if (!process.env.GROQ_API_KEY) {
      return NextResponse.json({ error: "GROQ_API_KEY is missing" }, { status: 500 });
    }

    const client = new Groq({
      apiKey: process.env.GROQ_API_KEY,
    });

    if (!message || typeof message !== "string") {
      return NextResponse.json({ error: "No message provided" }, { status: 400 });
    }

    const systemPrompt = `
You are an AI assistant inside the website "AI Lab".
Match the user's language: ${lang || "en"}.
Respond clearly, briefly and helpfully.
    `;

    const chatMessages: { role: "system" | "user" | "assistant"; content: string }[] = [
      { role: "system", content: systemPrompt },
    ];

    if (Array.isArray(history) && history.length > 0) {
      for (const m of history) {
        if (!m || typeof m.text !== "string") continue;
        const role = m.role === "assistant" ? "assistant" : "user";
        chatMessages.push({ role, content: m.text });
      }
    } else {
      chatMessages.push({ role: "user", content: message });
    }

    const completion = await client.chat.completions.create({
      model: "llama-3.1-8b-instant",
      messages: chatMessages,
    });

    const answer = completion.choices[0]?.message?.content || "Не удалось получить ответ.";

    return NextResponse.json({ answer });
  } catch (err: unknown) {
    console.error("Groq API error:", err);
    const message = err instanceof Error ? err.message : "AI request failed";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
