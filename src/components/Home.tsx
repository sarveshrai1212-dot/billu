"use client";

const fadeInUp = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.7,
    },
  },
};

const parentVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.35,
    },
  },
};

import React, { useEffect } from "react";
import { ArrowRight } from "lucide-react";

import Link from "next/link";

import ProductCard from "@/components/ProductCard";
import FeatureCard from "@/components/FeatureCard";
import ReviewForm from "@/components/ReviewForm";
// import Newsletter from "@/components/Newsletter";
import StarsCanvas from "@/components/StarBackground";

import { mainFeatures, whyChooseUs, Feature } from "@/data/features";
import products, { Product } from "@/data/products";
import { motion } from "framer-motion";



const Home: React.FC = () => {
  useEffect(() => {
    if (typeof window !== 'undefined' && window.location.hash) {
      history.replaceState(null, '', window.location.pathname);
      setTimeout(() => {
        window.scrollTo(0, 0);
      }, 50);
    }
  }, []);

  // Use local data for products
  // Show only first 4 products for homepage
  const displayProducts: Product[] = products.slice(0, 4);

  return (
    <>
      {/* Navbar removed to avoid duplicate navigation bar */}
      {/* Main background wrapper - fixed position to cover entire viewport (mobile + desktop) */}
      <div
        className="fixed inset-0 z-[-1] w-screen h-screen overflow-hidden"
        style={{ minHeight: '100dvh', minWidth: '100vw' }}
      >
        {/* Fallback background color for video loading */}
        <div className="absolute inset-0 bg-black" style={{ zIndex: 0 }} />
        {/* Video background */}
        <div className="absolute inset-0 overflow-hidden" style={{ zIndex: 1 }}>
          <div className="absolute inset-0 bg-black/40" style={{ zIndex: 2 }} />
          <video
            className="absolute top-0 left-0"
            style={{
              width: '100vw',
              height: '100dvh',
              minWidth: '100vw',
              minHeight: '100dvh',
              objectFit: 'cover',
              objectPosition: 'center',
              opacity: 0.8,
              zIndex: 1,
              background: '#000',
              maxWidth: 'none',
              maxHeight: 'none',
              pointerEvents: 'none',
            }}
            autoPlay
            muted
            loop
            playsInline
          >
            <source src="/videos/blackhole.webm" type="video/webm" />
            Your browser does not support the video tag.
          </video>
        </div>
      </div>

      {/* StarsCanvas background - background wrapper ke andar */}
      <div
        className="absolute inset-0 w-full h-full pointer-events-none"
        style={{ zIndex: 3 }}
      >
        <StarsCanvas />
      </div>
      {/* Hero Section */}
      <motion.section 
        className="relative pt-24 pb-20 overflow-hidden"
        variants={parentVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
      >
        <div className="container relative mx-auto px-4 z-[5]">
          <motion.div className="text-center mb-10" variants={fadeInUp}>
            <motion.h1 className="text-3xl md:text-5xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-white to-purple-300" variants={fadeInUp}>
              Transform Your Car Photography
            </motion.h1>
            <motion.p className="text-lg text-gray-300 max-w-2xl mx-auto" variants={fadeInUp}>
              Professional color grading that turns ordinary car photos into showroom-quality imagery with just one click.
            </motion.p>
          </motion.div>
          {/* Image Comparison Slider */}
          <motion.div className="max-w-2xl mx-auto mb-8" id="before-after" style={{ scrollMarginTop: '80px' }} variants={fadeInUp}>
            <iframe
              src="/slider.html"
              title="Before After Slider"
              className="w-full aspect-video border-none rounded-lg"
              style={{ height: 'auto', minHeight: '300px' }}
            ></iframe>
            <motion.p className="text-center mt-3 text-gray-400" variants={fadeInUp}>
              Drag the slider to see the dramatic difference our premium LUTs make.
            </motion.p>
          </motion.div>
        </div>
      </motion.section>
      {/* Features Section */}
      <motion.section 
        className="py-16 bg-brand-dark" id="features"
        variants={parentVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
      >
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {mainFeatures.map((feature: Feature, index: number) => (
              <motion.div key={index} variants={fadeInUp}>
                <FeatureCard
                  icon={feature.icon}
                  title={feature.title}
                  description={feature.description}
                />
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>
      {/* LUTs Section */}
      <motion.section 
        className="py-16 relative overflow-hidden" id="luts-section"
        variants={parentVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
      >
        <div className="container mx-auto px-4 relative z-10">
          <motion.div className="flex justify-between items-center mb-8" variants={fadeInUp}>
            <h2 className="text-2xl md:text-3xl font-bold">Products</h2>
            <Link href="/products" className="text-brand-purple hover:underline flex items-center">
              Show all <ArrowRight className="ml-2 w-4 h-4" />
            </Link>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {displayProducts.map((product: Product) => (
              <motion.div key={product.id} variants={fadeInUp}>
                <ProductCard product={product} />
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>
      {/* Why Choose Us */}
      <motion.section 
        className="py-16 bg-brand-dark"
        variants={parentVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
      >
        <div className="container mx-auto px-4">
          <motion.h2 className="text-2xl md:text-3xl font-bold mb-10 text-center" variants={fadeInUp}>
            Why Choose Us
          </motion.h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {whyChooseUs.map((feature: Feature, index: number) => (
              <motion.div key={index} className="text-center" variants={fadeInUp}>
                <div className="w-12 h-12 bg-brand-purple bg-opacity-20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <feature.icon className="text-brand-purple text-xl" />
                </div>
                <h3 className="text-lg font-bold mb-2">{feature.title}</h3>
                <p className="text-gray-400 text-sm">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>
      {/* Review Form */}
      <motion.section 
        className="py-16 bg-brand-dark" id="reviews" style={{ scrollMarginTop: '80px' }}
        variants={parentVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
      >
        <div className="container mx-auto px-4">
          <motion.h2 className="text-2xl md:text-3xl font-bold mb-10 text-center" variants={fadeInUp}>
            Share Your Experience
          </motion.h2>
          <motion.div variants={fadeInUp}>
            <ReviewForm />
          </motion.div>
        </div>
      </motion.section>
      {/* Newsletter removed as per user request */}
    </>
  );
};

export default Home;
