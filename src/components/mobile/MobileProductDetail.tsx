import MobileBeforeAfterSlider from "@/components/mobile/MobileBeforeAfterSlider";
"use client";

import React from "react";
import { motion } from "framer-motion";
import StarsCanvas from "@/components/StarBackground";
import Link from "next/link";
import Image from "next/image";

const fadeInUp = {
  hidden: { opacity: 0, y: 40 },
  visible: (i = 1) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.05,
      duration: 0.5,
    },
  }),
};


import type { Product } from "@/data/products";
import { useRouter } from "next/navigation";
import { useCart } from "@/contexts/CartContext";

const parentVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.15,
    },
  },
};

interface MobileProductDetailProps {
  product: Product;
}

const MobileProductDetail: React.FC<MobileProductDetailProps> = ({ product }) => {
  const router = useRouter();
  const { addToCart } = useCart();
  const [showSlider, setShowSlider] = React.useState(false);
  const handleBuyNow = () => {
    addToCart(product);
    router.push("/checkout");
  };

  return (
    <>
      {/* Background video and stars */}
      <div className="fixed inset-0 z-[-1]">
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
        <StarsCanvas />
      </div>
      <div className="container mx-auto px-4 py-16 relative z-10" style={{ paddingTop: '90px' }}>
        <motion.div
          className="bg-purple-900/20 backdrop-blur-md p-6 rounded-lg shadow-glow border border-white/10"
          variants={parentVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          <motion.div variants={fadeInUp}>
            <h1 className="text-2xl font-bold mb-4 text-white">{product.name}</h1>
          </motion.div>
          <motion.div variants={fadeInUp}>
            <div className="flex flex-col items-center mb-4 relative w-full max-w-xs mx-auto aspect-[4/5] bg-gradient-to-br from-purple-900/40 to-black/60 rounded-xl shadow-glow border-2 border-purple-500/30 overflow-hidden" style={{ minHeight: 300 }}>
              {/* Show main image or slider */}
              {!showSlider ? (
                <Image
                  src={product.imageUrl[0]}
                  alt={product.name}
                  fill
                  className="absolute inset-0 w-full h-full object-cover rounded-xl"
                  style={{ objectFit: 'cover', objectPosition: 'center center' }}
                  priority
                />
              ) : (
                product.imageUrl.length > 1 && (
                  <MobileBeforeAfterSlider beforeImage={product.imageUrl[0]} afterImage={product.imageUrl[1]} />
                )
              )}
              {/* Left arrow to go back to main image */}
              <button
                className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/60 hover:bg-black/80 text-white p-2 rounded-full z-10"
                onClick={() => setShowSlider(false)}
                aria-label="Back to image"
                disabled={!showSlider}
                style={{ opacity: showSlider ? 1 : 0.5, pointerEvents: showSlider ? 'auto' : 'none' }}
              >
                &#8592;
              </button>
              {/* Right arrow to show slider */}
              {product.imageUrl.length > 1 && (
                <button
                  className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/60 hover:bg-black/80 text-white p-2 rounded-full z-10"
                  onClick={() => setShowSlider(true)}
                  aria-label="Show slider"
                  disabled={showSlider}
                  style={{ opacity: !showSlider ? 1 : 0.5, pointerEvents: !showSlider ? 'auto' : 'none' }}
                >
                  &#8594;
                </button>
              )}
            </div>
          </motion.div>
          <motion.div variants={fadeInUp}>
            <p className="text-white/80 mb-6">{product.description}</p>
          </motion.div>
          <motion.div variants={fadeInUp}>
            <div className="flex items-center gap-4 mb-4">
              <span className="text-lg font-bold text-white">₹{(product.price / 100).toFixed(2)}</span>
              {/* Add to Cart button removed as per user request */}
              <button className="bg-purple-700 text-white px-6 py-2 rounded-md font-semibold shadow-glow border border-white/10" onClick={handleBuyNow}>
                Buy Now
              </button>
            </div>
          </motion.div>
        </motion.div>
        <Link href="/products" className="block text-center mt-8 text-brand-purple hover:underline">
          Back to Products
        </Link>
      </div>
    </>
  );
};

export default MobileProductDetail;
