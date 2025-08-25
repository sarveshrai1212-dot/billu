"use client";
import React from "react";


import ProductCard from "@/components/ProductCard";
import products from "@/data/products";
import StarsCanvas from "@/components/StarsCanvas";
// ...existing code...
import MobileProductsPage from "@/components/mobile/MobileProductsPage";

const Products: React.FC = () => {
  return (
    <>
      {/* Mobile-only components */}
      <div className="md:hidden">
        <MobileProductsPage />
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
        </div>
        <div className="relative z-10">
          <h2 className="text-3xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-cyan-500 text-center mt-32 mb-4">Products</h2>
          <StarsCanvas />
          <div className="w-full max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6 py-8 px-4">
            {products.map((product) => (
              <ProductCard key={product.slug} product={product} />
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Products;
