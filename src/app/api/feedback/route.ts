import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const { name, email, message } = await req.json();
  if (!name || !email || !message) {
    return NextResponse.json({ message: "Missing required fields" }, { status: 400 });
  }
  try {
    const apiKey = process.env.BREVO_API_KEY;
    if (!apiKey) throw new Error("Brevo API key not set");

    const res = await fetch("https://api.brevo.com/v3/smtp/email", {
      method: "POST",
      headers: {
        "api-key": apiKey,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        sender: { name: "Vroom Visions X", email: "vroomvisionsx@gmail.com" },
        to: [{ email: "vroomvisionsx@gmail.com" }],
        subject: `New Experience Shared by ${name}`,
        htmlContent: `<div style='font-family:sans-serif;padding:32px;background:rgba(185,147,247,0.18);backdrop-filter:blur(12px);border-radius:18px;max-width:500px;margin:auto;'>
          <h2 style='color:#a855f7;'>New Experience Shared!</h2>
          <div style='margin-bottom:12px;'><b>Name:</b> <span style='color:#b993f7;'>${name}</span></div>
          <div style='margin-bottom:12px;'><b>User Email:</b> <span style='color:#b993f7;'>${email}</span></div>
          <div style='margin-bottom:12px;'><b>Message:</b><br><span style='color:#232136;'>${message}</span></div>
        </div>`
      }),
    });

    if (!res.ok) {
      const error = await res.json();
      throw new Error(error.message || "Failed to send feedback email");
    }

    return NextResponse.json({ message: "Feedback sent successfully" }, { status: 200 });
  } catch (err) {
    const error = err as Error;
    return NextResponse.json({ message: error.message || "Failed to send feedback" }, { status: 500 });
  }
}
