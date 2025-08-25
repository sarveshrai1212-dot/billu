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
  const [currentImageIndex, setCurrentImageIndex] = React.useState(0);

  const goToPreviousImage = () => {
    if (!product?.imageUrl?.length) return;
    setCurrentImageIndex(prev => prev === 0 ? product.imageUrl.length - 1 : prev - 1);
  };
  const goToNextImage = () => {
    if (!product?.imageUrl?.length) return;
    setCurrentImageIndex(prev => prev === product.imageUrl.length - 1 ? 0 : prev + 1);
  };
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
            <div className="flex flex-col items-center mb-4">
              <Image
                src={Array.isArray(product.imageUrl) ? product.imageUrl[currentImageIndex] : product.imageUrl}
                alt={product.name}
                width={300}
                height={300}
                className="w-full max-w-xs rounded-lg border border-white/10 mb-2"
                style={{ objectFit: 'cover', maxHeight: 300 }}
                priority
              />
              {Array.isArray(product.imageUrl) && product.imageUrl.length > 1 && (
                <div className="flex gap-2 mt-2">
                  <button onClick={goToPreviousImage} className="text-white/60 hover:text-white">&#8592;</button>
                  <span className="text-white/80 text-xs">{currentImageIndex + 1} / {product.imageUrl.length}</span>
                  <button onClick={goToNextImage} className="text-white/60 hover:text-white">&#8594;</button>
                </div>
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
