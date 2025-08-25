"use client";

import React from "react";
import StarsCanvas from "@/components/StarBackground";
import products, { Product } from "@/data/products";
import ProductCard from "@/components/ProductCard";

const MobileProductsPage: React.FC = () => (
  <>
    {/* Mobile background and stars */}
    <div className="fixed inset-0 z-[-1] w-screen h-screen overflow-hidden">
      <div className="absolute inset-0 bg-black" />
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
    </div>
    <div className="absolute inset-0 w-full h-full pointer-events-none z-0">
      <StarsCanvas />
    </div>
    <div className="relative z-10 w-full px-4 py-16" style={{ paddingTop: '90px' }}>
      <h2 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-cyan-500 text-center mb-8">Products</h2>
      <div className="w-full max-w-2xl mx-auto grid grid-cols-1 gap-6">
        {products.map((product: Product) => (
          <ProductCard key={product.slug} product={product} />
        ))}
      </div>
    </div>
  </>
);

export default MobileProductsPage;
