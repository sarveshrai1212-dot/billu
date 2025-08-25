"use client";

import React, { useEffect } from "react";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import ProductCard from "@/components/ProductCard";
import FeatureCard from "@/components/FeatureCard";
import ReviewForm from "@/components/ReviewForm";
import StarsCanvas from "@/components/StarBackground";
import { mainFeatures, whyChooseUs, Feature } from "@/data/features";
import products, { Product } from "@/data/products";
import { motion } from "framer-motion";

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

const MobileHome: React.FC = () => {
  useEffect(() => {
    if (typeof window !== 'undefined' && window.location.hash) {
      history.replaceState(null, '', window.location.pathname);
      setTimeout(() => {
        window.scrollTo(0, 0);
      }, 50);
    }
  }, []);

  const displayProducts: Product[] = products.slice(0, 4);

  return (
    <>
      {/* Mobile background and stars */}
      <div
        className="fixed inset-0 z-[-1] w-screen h-screen overflow-hidden"
        style={{ minHeight: '100dvh', minWidth: '100vw' }}
      >
        <div className="absolute inset-0 bg-black" style={{ zIndex: 0 }} />
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
      <div
        className="absolute inset-0 w-full h-full pointer-events-none"
        style={{ zIndex: 3 }}
      >
        <StarsCanvas />
      </div>
      {/* Hero Section */}
      <motion.section 
        className="relative pt-24 pb-20 overflow-hidden"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
      >
        <div className="container relative mx-auto px-4 z-[5]">
          <motion.div className="text-center mb-10" variants={fadeInUp} custom={1}>
            <motion.h1
              className="text-3xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-white to-purple-300"
              variants={fadeInUp}
              custom={1}
            >
              Transform Your Car Photography
            </motion.h1>
            <motion.p
              className="text-lg text-gray-300 max-w-2xl mx-auto"
              variants={fadeInUp}
              custom={2}
            >
              Professional color grading that turns ordinary car photos into showroom-quality imagery with just one click.
            </motion.p>
          </motion.div>
          {/* Image Comparison Slider */}
          <motion.div
            className="max-w-2xl mx-auto mb-8"
            id="before-after"
            style={{ scrollMarginTop: '80px' }}
            variants={fadeInUp}
            custom={3}
          >
            <iframe
              src="/slider.html"
              title="Before After Slider"
              className="w-full aspect-video border-none rounded-lg"
              style={{ height: 'auto', minHeight: '300px' }}
            ></iframe>
            <p className="text-center mt-3 text-gray-400">
              Drag the slider to see the dramatic difference our premium LUTs make.
            </p>
          </motion.div>
        </div>
      </motion.section>
      {/* Features Section */}
      <motion.section 
        className="py-16 bg-brand-dark" id="features"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
      >
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 gap-6">
            {mainFeatures.map((feature: Feature, index: number) => (
              <motion.div key={index} variants={fadeInUp} custom={index + 1}>
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
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.1 }}
      >
        <div className="container mx-auto px-4 relative z-10">
          <motion.div className="flex justify-between items-center mb-8" variants={fadeInUp} custom={1}>
            <h2 className="text-2xl font-bold">Products</h2>
            <Link href="/products" className="text-brand-purple hover:underline flex items-center">
              Show all <ArrowRight className="ml-2 w-4 h-4" />
            </Link>
          </motion.div>
          <div className="grid grid-cols-1 gap-6">
            {displayProducts.map((product: Product, idx: number) => (
              <motion.div key={product.id} variants={fadeInUp} custom={idx + 2}>
                <ProductCard product={product} />
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>
      {/* Why Choose Us */}
      <motion.section 
        className="py-16 bg-brand-dark"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
      >
        <div className="container mx-auto px-4">
          <motion.h2 className="text-2xl font-bold mb-10 text-center" variants={fadeInUp} custom={1}>
            Why Choose Us
          </motion.h2>
          <div className="grid grid-cols-1 gap-8">
            {whyChooseUs.map((feature: Feature, index: number) => (
              <motion.div key={index} className="text-center" variants={fadeInUp} custom={index + 2}>
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
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
      >
        <div className="container mx-auto px-4">
          <motion.h2 className="text-2xl font-bold mb-10 text-center" variants={fadeInUp} custom={1}>
            Share Your Experience
          </motion.h2>
          <motion.div variants={fadeInUp} custom={2}>
            <ReviewForm />
          </motion.div>
        </div>
      </motion.section>
    </>
  );
};

export default MobileHome;
