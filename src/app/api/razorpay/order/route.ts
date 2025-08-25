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
        notification_email: 'vroomvisionsx@gmail.com',
        ...(email ? { buyer_email: email } : {})
      },
    };
    const order = await razorpay.orders.create(options);
    // No thank you email here; invoice email is sent after payment success from the client
    return NextResponse.json(order);
  } catch (error) {
    console.error('Error creating Razorpay order:', error);
    return NextResponse.json({ message: 'Failed to create Razorpay order' }, { status: 500 });
  }
}
