import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const { email, amount, currency, product, invoiceId, paymentMethod } = await req.json();
  if (!email || !amount || !currency) {
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
        sender: { name: "Vroom Visions", email: "vroomvisionsx@gmail.com" },
        to: [{ email }],
        subject: "Your Invoice from Vroom Visions",
        htmlContent: (() => {
          const today = new Date();
          const formattedDate = today.toLocaleDateString('en-IN', { year: 'numeric', month: 'long', day: 'numeric', timeZone: 'Asia/Kolkata' });
          const formattedTime = today.toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: true, timeZone: 'Asia/Kolkata' });
          return `<style>
@media (prefers-color-scheme: light) {
  .invoice-card { background: #f3e8ff !important; color: #232136 !important; }
  .invoice-value { color: #7c3aed !important; }
}
</style>
<div style="font-family:sans-serif;color:#232136;text-align:center;">
  <div style="font-weight:bold;font-size:2rem;display:block;margin-bottom:12px;">
    <span style='color:#232136;display:inline-block;'>Vroom</span>
    <span style='color:#b993f7;display:inline-block;'>Visions</span>
    <span style='color:#a855f7;display:inline-block;'>X</span>
  </div>
  <h1 style="font-size:1.3rem;font-weight:700;margin-bottom:8px;">Thank You for Your Purchase!</h1>
  <div class="invoice-card" style="background:rgba(185,147,247,0.18);backdrop-filter:blur(12px);-webkit-backdrop-filter:blur(12px);margin:24px auto 16px auto;padding:24px 16px;border-radius:18px;max-width:400px;text-align:left;box-shadow:0 4px 24px #a855f7;border:1px solid rgba(185,147,247,0.35);">
    <div style="margin-bottom:14px;font-size:1.15rem;"><b>Product:</b> <span class="invoice-value" style='color:#b993f7;font-weight:600;'>${product || 'Vroom Visions Product'}</span></div>
    <div style="margin-bottom:14px;font-size:1.15rem;"><b>Amount:</b> <span class="invoice-value" style='color:#b993f7;font-weight:600;'>${(amount/100).toFixed(2)} ${currency}</span></div>
    <div style="margin-bottom:14px;font-size:1.15rem;"><b>Invoice ID:</b> <span class="invoice-value" style='color:#b993f7;font-weight:600;'>${invoiceId || 'Auto-generated'}</span></div>
    <div style="margin-bottom:14px;font-size:1.15rem;"><b>Date:</b> <span class="invoice-value" style='color:#b993f7;font-weight:600;'>${formattedDate} ${formattedTime}</span></div>
    <div style="margin-bottom:14px;font-size:1.15rem;"><b>Payment Method:</b> <span class="invoice-value" style='color:#b993f7;font-weight:600;'>${paymentMethod || 'Online'}</span></div>
  </div>
  <div style="margin-top:24px;font-size:0.95rem;color:#000;">
    Need help? Contact <a href="mailto:vroomvisionsx@gmail.com" style="color:#a855f7;">vroomvisionsx@gmail.com</a><br>
    &copy; ${today.getFullYear()} Vroom Visions X. All rights reserved.
  </div>
</div>`;
        })(),
      }),
    });

    if (!res.ok) {
      const error = await res.json();
      throw new Error(error.message || "Failed to send email");
    }

    return NextResponse.json({ message: "Invoice email sent" }, { status: 200 });
  } catch (err) {
    const error = err as Error;
    return NextResponse.json({ message: error.message || "Failed to send invoice email" }, { status: 500 });
  }
}
