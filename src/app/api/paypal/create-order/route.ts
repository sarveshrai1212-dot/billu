import { NextRequest, NextResponse } from 'next/server';

const PAYPAL_CLIENT_ID = process.env.PAYPAL_CLIENT_ID;
const PAYPAL_SECRET = process.env.PAYPAL_SECRET;
const PAYPAL_API = "https://api-m.sandbox.paypal.com";

async function getPayPalAccessToken() {
  const auth = Buffer.from(`${PAYPAL_CLIENT_ID}:${PAYPAL_SECRET}`).toString("base64");
  const response = await fetch(`${PAYPAL_API}/v1/oauth2/token`, {
    method: "POST",
    headers: {
      "Authorization": `Basic ${auth}`,
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: "grant_type=client_credentials",
  });
  const data = await response.json();
  if (!response.ok) throw new Error(data.error_description || "Failed to get PayPal access token");
  return data.access_token;
}

export async function POST(req: NextRequest) {
  try {
    const { amount, currency } = await req.json();
    const accessToken = await getPayPalAccessToken();
    const orderRes = await fetch(`${PAYPAL_API}/v2/checkout/orders`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${accessToken}`,
      },
      body: JSON.stringify({
        intent: "CAPTURE",
        purchase_units: [
          {
            amount: {
              currency_code: currency || "USD",
              value: (amount / 100).toFixed(2),
            },
            payee: { email_address: process.env.FROM_EMAIL },
          },
        ],
        application_context: {
          brand_name: "Vroom Visions",
          user_action: "PAY_NOW",
          return_url: "http://localhost:5000/payment-success",
          cancel_url: "http://localhost:5000/checkout",
        },
      }),
    });
    const orderData = await orderRes.json();
    if (!orderRes.ok) throw new Error(orderData.message || "Failed to create PayPal order");
    const approvalUrl = orderData.links.find((l: { rel: string }) => l.rel === "approve")?.href;
    return NextResponse.json({ id: orderData.id, approvalUrl });
  } catch (error) {
    const errMsg = error instanceof Error ? error.message : 'Failed to create PayPal order';
    return NextResponse.json({ message: errMsg }, { status: 500 });
  }
}
