
console.log('Loading razorpay.ts...');

import dotenv from "dotenv";
import Razorpay from "razorpay";
import path from "path";

// Always load .env from the current directory (works in build/dist too)
dotenv.config({ path: path.resolve(__dirname, ".env") });

// Replace with your actual Razorpay Key ID and Key Secret
const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

export const createRazorpayOrder = async (amount: number, currency: string, receipt: string, email?: string) => {
  const options = {
    amount: amount, // amount in the smallest currency unit
    currency: currency,
    receipt: receipt,
    notes: {
      notification_email: "vroomvisionx.gmail.com", // notify this email on order
      ...(email ? { buyer_email: email } : {})
    },
  };

  try {
    const order = await razorpay.orders.create(options);
    return order;
  } catch (error) {
    console.error("Error creating Razorpay order:", error);
    throw error;
  }
};
