// (removed duplicate import block and duplicate component declaration)
"use client";
import React from "react";
import Footer from "@/components/Footer";
import MobileCheckoutPage from "@/components/mobile/MobileCheckoutPage";

import { useState } from "react";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import RazorpayLogo from "@/components/ui/RazorpayLogo";
import PayPalLogo from "@/components/ui/PayPalLogo";
import { useCart } from "@/contexts/CartContext";
import { motion } from "framer-motion";
import StarsCanvas from "@/components/StarBackground";

const Checkout: React.FC = () => {
  // Desktop state and logic
  const { cart, removeFromCart, getTotalPrice } = useCart();
  const [email, setEmail] = useState("");
  const [paymentStatus, setPaymentStatus] = useState<'idle' | 'processing' | 'cancelled' | 'failed'>('idle');
  const [discountCode, setDiscountCode] = useState("");
  const [discountApplying, setDiscountApplying] = useState(false);
  const [discountError, setDiscountError] = useState<string | null>(null);
  const [discountSuccess, setDiscountSuccess] = useState(false);
  // No redirect to products page if cart is empty. User wants to stay on checkout page.

  // PayPal Payment Handler
  const handlePayPalPayment = async () => {
    if (!email || !isValidEmail(email)) {
      alert('Please enter a valid email address.');
      return;
    }
    setPaymentStatus('processing');
    try {
      // Create order on backend
      const orderResponse = await fetch('/api/paypal/create-order', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          amount: finalTotalUSD,
          currency: 'USD',
          email,
        }),
      });
      const orderData = await orderResponse.json();
      if (!orderResponse.ok) throw new Error(orderData.message || 'Order creation failed');
      if (orderData.approvalUrl) {
        window.location.href = orderData.approvalUrl;
      } else {
        throw new Error('PayPal approval URL not received');
      }
    } catch (error) {
      alert((error as Error).message || 'Payment could not be processed');
      setPaymentStatus('idle');
    }
  };



  const handleRemoveItem = (productId: number) => {
    removeFromCart(productId);
  };

  // Discount logic: apply 10% off if VISION10 is applied
  const discountPercent = discountSuccess ? 10 : 0;
  const totalPriceUSD = getTotalPrice();
  const totalPriceINR = Math.round(totalPriceUSD * 85.85);
  const discountAmountUSD = Math.round(totalPriceUSD * (discountPercent / 100));
  const discountAmountINR = Math.round(totalPriceINR * (discountPercent / 100));
  const finalTotalUSD = totalPriceUSD - discountAmountUSD;
  const finalTotalINR = totalPriceINR - discountAmountINR;
  const formattedTotalUSD = (totalPriceUSD / 100).toFixed(2);
  const formattedDiscountUSD = (discountAmountUSD / 100).toFixed(2);
  const formattedFinalTotalUSD = (finalTotalUSD / 100).toFixed(2);

  // Dynamically load Razorpay script
  const loadRazorpayScript = () => {
    return new Promise((resolve) => {
      if (document.getElementById('razorpay-script')) return resolve(true);
      const script = document.createElement('script');
      script.id = 'razorpay-script';
      script.src = 'https://checkout.razorpay.com/v1/checkout.js';
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  };

  // Email validation
  const isValidEmail = (email: string) => {
    return /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/.test(email);
  };

  // Razorpay Payment Handler
  const handleRazorpayPayment = async () => {
    if (!email || !isValidEmail(email)) {
      alert('Please enter a valid email address.');
      return;
    }
    setPaymentStatus('processing');
    const res = await loadRazorpayScript();
    if (!res) {
      alert('Failed to load Razorpay SDK.');
      setPaymentStatus('idle');
      return;
    }
    try {
      // Create order on backend
      const orderResponse = await fetch('/api/razorpay/order', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          amount: finalTotalINR,
          currency: 'INR',
          receipt: `receipt_${Date.now()}`,
          email,
        }),
      });
      const orderData = await orderResponse.json();
      if (!orderResponse.ok) throw new Error(orderData.message || 'Order creation failed');
      const options = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID || 'rzp_test_myXHywY5WTMuIg',
        amount: orderData.amount,
        currency: orderData.currency,
        name: 'Vroom Visions',
        description: 'Product Purchase',
        order_id: orderData.id,
        handler: async function () {
          try {
            await fetch("/api/razorpay/invoice", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                email,
                amount: orderData.amount,
                currency: orderData.currency,
                product: cart.map(item => item.product.name).join(", "),
                invoiceId: orderData.id,
                paymentMethod: "Razorpay"
              })
            });
          } catch {
            // ignore
          }
          window.location.href = `/payment-success?email=${encodeURIComponent(email)}`;
        },
        prefill: { email },
        theme: { color: '#a259ff' },
      };
      // @ts-expect-error: Razorpay is attached to window by the script
      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (error) {
      alert((error as Error).message || 'Payment could not be processed');
      setPaymentStatus('idle');
    }
  };

  return (
    <>
      {/* Mobile-only components */}
      <div className="md:hidden">
        <MobileCheckoutPage />
        <Footer />
      </div>
      {/* Desktop-only component */}
      <div className="hidden md:block">
        {/* Main background wrapper - fixed position to cover entire viewport */}
        <div className="fixed inset-0 z-[-1]">
          {/* Video background */}
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute inset-0 bg-black/40 z-[1]" />
            <video 
              className="absolute top-0 left-0 min-w-full min-h-full object-cover opacity-80"
              autoPlay 
              muted 
              loop 
              playsInline
            >
              <source src="/videos/blackhole.webm" type="video/webm" />
              Your browser does not support the video tag.
            </video>
          </div>
          {/* StarsCanvas background */}
          <StarsCanvas />
        </div>
        <motion.section 
          className="relative py-16"
          style={{ marginTop: 44 }}
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <div className="container mx-auto px-4 relative z-10">
            {cart.length === 0 ? null : (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="md:col-span-2">
                  <div className="bg-purple-900/20 p-6 rounded-lg shadow-glow border border-white/10 sticky top-20">
                    <h2 className="text-xl font-bold mb-4">Order Summary</h2>
                    <div className="border-b border-white/10 pb-4 mb-4">
                      {cart.map((item) => (
                        <div key={item.product.id} className="flex mb-4 p-2 rounded-lg bg-purple-950/40 border border-white/5">
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img 
                            src={Array.isArray(item.product.imageUrl) ? item.product.imageUrl[0] : item.product.imageUrl} 
                            alt={item.product.name} 
                            className="w-20 h-20 rounded object-cover border border-white/10"
                          />
                          <div className="ml-3 flex-1">
                            <h3 className="font-medium">{item.product.name}</h3>
                            <div className="font-medium mt-1 text-white">${((item.product.price * item.quantity) / 100).toFixed(2)} USD</div>
                          </div>
                          <button 
                            className="ml-auto text-gray-400 hover:text-white hover:bg-red-500/20 p-1 rounded-full transition-colors"
                            onClick={() => handleRemoveItem(item.product.id)}
                          >
                            <X size={16} />
                          </button>
                        </div>
                      ))}
                    </div>
                    <div className="space-y-2 text-sm mb-4 p-3 rounded-lg bg-purple-950/40 border border-white/5">
                      <div className="flex justify-between">
                        <span className="text-white font-medium">Subtotal</span>
                        <span className="text-white font-medium">${formattedTotalUSD} USD</span>
                      </div>
                      {discountSuccess && (
                        <div className="flex justify-between text-green-400">
                          <span>Discount (10%)</span>
                          <span>- ${formattedDiscountUSD} USD</span>
                        </div>
                      )}
                      <div className="flex justify-between">
                        <span className="text-white font-medium">Taxes</span>
                        <span className="text-white font-medium">Calculated at next step</span>
                      </div>
                    </div>
                    <div className="flex justify-between font-bold text-lg p-3 rounded-lg bg-purple-950/40 border border-white/5 mt-4">
                      <span className="text-white font-bold">Total</span>
                      <span className="text-white font-bold tracking-wide">${discountSuccess ? formattedFinalTotalUSD : formattedTotalUSD} USD</span>
                    </div>
                    <div className="mt-4 text-xs text-gray-400">
                      By confirming your payment, you allow VroomVisionX LLC to charge you for this payment and future payments in accordance with their terms.
                    </div>
                  </div>
                </div>
                <div className="md:col-span-1 space-y-6">
                  <div className="bg-purple-900/20 p-6 rounded-lg shadow-glow border border-white/10">
                    <h2 className="text-xl font-bold mb-4">Contact Information</h2>
                    <div className="mb-4">
                      <Label htmlFor="checkout-email" className="block text-sm font-medium mb-1">Email</Label>
                      <Input 
                        type="email" 
                        id="checkout-email" 
                        placeholder="your@email.com" 
                        className="w-full bg-purple-950/40 backdrop-blur-md border border-white/10 rounded-md px-4 py-2 focus:border-purple-500/50 shadow-glow focus:bg-purple-950/40" 
                        value={email}
                        onChange={(e) => {
                          setEmail(e.target.value);
                          setPaymentStatus('idle');
                        }}
                      />
                    </div>
                    <div className="mb-4">
                      <Label htmlFor="discount-code" className="block text-sm font-medium mb-1">Discount Code</Label>
                      <div className="flex gap-2">
                        <Input
                          type="text"
                          id="discount-code"
                          placeholder="Enter code"
                          className="flex-1 bg-purple-950/40 backdrop-blur-md border border-white/10 rounded-md px-4 py-2 focus:border-purple-500/50 shadow-glow"
                          value={discountCode}
                          onChange={e => setDiscountCode(e.target.value)}
                        />
                        <Button
                          className="bg-purple-600/70 hover:bg-purple-600 text-white px-4 py-2 rounded-md shadow-glow border border-white/10"
                          onClick={async () => {
                            setDiscountError(null);
                            setDiscountSuccess(false);
                            setDiscountApplying(true);
                            try {
                              if (discountCode.trim().toUpperCase() === "VISION10") {
                                setDiscountSuccess(true);
                                setDiscountError(null);
                              } else {
                                setDiscountError("Invalid or expired code");
                                setDiscountSuccess(false);
                              }
                            } catch {
                              setDiscountError("Something went wrong");
                              setDiscountSuccess(false);
                            } finally {
                              setDiscountApplying(false);
                            }
                          }}
                          disabled={!discountCode || discountApplying}
                          type="button"
                        >
                          {discountApplying ? 'Applying...' : 'Apply'}
                        </Button>
                      </div>
                      {discountError && (
                        <div className="text-red-400 text-xs mt-1">{discountError}</div>
                      )}
                      {discountSuccess && (
                        <div className="text-green-400 text-xs mt-1">Discount applied!</div>
                      )}
                    </div>
                    <Button 
                      className="w-full bg-gradient-to-r from-[#7f53ac] to-[#657ced] text-white py-3 rounded-md font-semibold shadow-glow border border-white/10 mt-2 flex items-center justify-center gap-2 text-lg tracking-wide" 
                      onClick={handleRazorpayPayment}
                      disabled={paymentStatus === 'processing'}
                      style={{ minHeight: 33, fontFamily: 'inherit' }}
                    >
                      <RazorpayLogo />
                    </Button>
                    <Button
                      className="w-full bg-gradient-to-r from-[#003087] to-[#0070ba] text-white py-3 rounded-md font-semibold shadow-glow border border-white/10 mt-2 flex items-center justify-center gap-2 text-lg tracking-wide"
                      onClick={handlePayPalPayment}
                      disabled={paymentStatus === 'processing'}
                      style={{ minHeight: 33, fontFamily: 'inherit' }}
                    >
                      <PayPalLogo />
                    </Button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </motion.section>
      </div>
    </>
  );
};

export default Checkout;
