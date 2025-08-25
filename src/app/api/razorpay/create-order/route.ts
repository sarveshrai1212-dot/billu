import { NextRequest, NextResponse } from 'next/server';
import Razorpay from 'razorpay';

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID!,
  key_secret: process.env.RAZORPAY_KEY_SECRET!,
});

export async function POST(req: NextRequest) {
  try {
    const { amount, currency, receipt, email } = await req.json();
    const options = {
      amount,
      currency,
      receipt,
      notes: {
        notification_email: "vroomvisionx.gmail.com",
        ...(email ? { buyer_email: email } : {})
      },
    };
    const order = await razorpay.orders.create(options);
    return NextResponse.json(order);
  } catch (error) {
    const errMsg = error instanceof Error ? error.message : 'Failed to create Razorpay order';
    return NextResponse.json({ message: errMsg }, { status: 500 });
  }
}
