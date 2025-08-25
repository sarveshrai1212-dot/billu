console.log('Loading paypal.ts...');
import express, { Request, Response } from "express";
import fetch from "node-fetch";
import SibApiV3Sdk from 'sib-api-v3-sdk';

const router = express.Router();

const PAYPAL_CLIENT_ID = process.env.PAYPAL_CLIENT_ID;
const PAYPAL_SECRET = process.env.PAYPAL_SECRET;
const PAYPAL_API = "https://api-m.sandbox.paypal.com"; // Use sandbox for testing

// Get PayPal access token
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
  const data = await response.json() as Record<string, unknown>;
  if (!response.ok) throw new Error(typeof data.error_description === 'string' ? data.error_description : "Failed to get PayPal access token");
  return (data as { access_token?: string }).access_token;
}

// Create PayPal order
router.post("/api/paypal/create-order", async (req: Request, res: Response) => {
  try {
    const { amount, currency } = req.body;
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
    const orderData = await orderRes.json() as { message?: string; links?: Array<{ rel: string; href: string }>; };
    if (!orderRes.ok) throw new Error(orderData.message || "Failed to create PayPal order");
    const approvalUrl = orderData.links?.find((l) => l.rel === "approve")?.href;
    res.json({ approvalUrl });
  } catch (err) {
    if (err instanceof Error) {
      res.status(500).json({ message: err.message || "PayPal order creation failed" });
    } else {
      res.status(500).json({ message: "PayPal order creation failed" });
    }
  }
});

// Utility to send invoice email via Brevo
async function sendInvoiceEmail(to: string, amount: number, currency: string) {
  const apiKey = process.env.BREVO_API_KEY;
  if (!apiKey) throw new Error("Brevo API key not set");
  SibApiV3Sdk.ApiClient.instance.authentications['api-key'].apiKey = apiKey;
  const apiInstance = new SibApiV3Sdk.TransactionalEmailsApi();
  const sendSmtpEmail = new SibApiV3Sdk.SendSmtpEmail();
  sendSmtpEmail.subject = "Your Invoice from Vroom Visions";
  sendSmtpEmail.htmlContent = `<h2>Thank you for your purchase!</h2><p>Here is your invoice:</p><ul><li>Amount: <b>${amount/100} ${currency}</b></li></ul><p>If you have any questions, reply to this email.</p>`;
  sendSmtpEmail.sender = { name: "Vroom Visions", email: process.env.FROM_EMAIL };
  sendSmtpEmail.to = [{ email: to }];
  await apiInstance.sendTransacEmail(sendSmtpEmail);
}

// PayPal Webhook Handler
router.post("/api/paypal/webhook", express.json({ type: "application/json" }), async (req: Request, res: Response) => {
  // For security, you should validate the webhook signature here using PayPal's API
  // See: https://developer.paypal.com/docs/api/webhooks/v1/#verify-webhook-signature_post
  // For now, just log the event and return 200
  console.log("Received PayPal webhook:", JSON.stringify(req.body, null, 2));

  // Send invoice if payment is completed
  try {
    if (req.body.event_type === "CHECKOUT.ORDER.APPROVED") {
      const payerEmail = req.body.resource?.payer?.email_address;
      const amount = parseFloat(req.body.resource?.purchase_units?.[0]?.amount?.value || "0") * 100;
      const currency = req.body.resource?.purchase_units?.[0]?.amount?.currency_code || "USD";
      if (payerEmail && amount > 0) {
        await sendInvoiceEmail(payerEmail, amount, currency);
        console.log("Invoice email sent to", payerEmail);
      }
    }
  } catch (err) {
    if (err instanceof Error) {
      console.error("Failed to send invoice email:", err.message);
    } else {
      console.error("Failed to send invoice email:", err);
    }
  }

  res.status(200).send("OK");
});

export default router;
