"use client";

import React from "react";
import BeforeAfterSlider from "../../../components/BeforeAfterSlider.jsx";
import { useRouter } from "next/navigation";
import { useCart } from "@/contexts/CartContext";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, ChevronLeft, ChevronRight, ZoomIn, ZoomOut, Star } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import StarsCanvas from "@/components/StarsCanvas";
import Footer from "@/components/Footer";
import products from "@/data/products";

const fadeInUp = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5 },
  },
};

const staggerParent = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.13 } },
};

function ProductDetailClient({ slug }) {
  // ...existing code...
  const [showSlider, setShowSlider] = React.useState(false);
  const router = useRouter();
  const { addToCart } = useCart();
  const [currentImageIndex, setCurrentImageIndex] = React.useState(0);
  const [isZoomed, setIsZoomed] = React.useState(false);
  const [productData, setProductData] = React.useState(null);

  React.useEffect(() => {
    if (slug) {
      const found = products.find((p) => p.slug === slug);
      setProductData(found || null);
    }
  }, [slug]);

  if (!productData || !productData.imageUrl) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <span className="text-white text-lg">Loading product details...</span>
      </div>
    );
  }

  // Safe to use productData now
  const isInstagramExportSettings = productData.slug === "instagram-export-guide";
  const beforeImage = "/attached_assets/Instagram_Export_settings_cover.jpg";
  const afterImage = "/attached_assets/Instagram_Export_settings_cover (1).jpg";

  const handleAddToCart = () => addToCart(productData);
  const handleBuyNow = () => {
    addToCart(productData);
    router.push("/checkout");
  };
  const goToPreviousImage = () => {
    if (!productData?.imageUrl?.length) return;
    setCurrentImageIndex(prev => prev === 0 ? productData.imageUrl.length - 1 : prev - 1);
  };
  const goToNextImage = () => {
    if (!productData?.imageUrl?.length) return;
    setCurrentImageIndex(prev => prev === productData.imageUrl.length - 1 ? 0 : prev + 1);
  };
  const handleZoomToggle = () => setIsZoomed(prev => !prev);

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
      <motion.section 
        className="relative py-16 z-10"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
      >
        {/* Back to products button */}
        <motion.div className="w-full max-w-6xl mx-auto flex flex-col items-start px-4 md:px-0" style={{ marginBottom: 24, marginTop: 36 }} variants={fadeInUp} custom={1}>
          <button
            onClick={() => router.push("/#luts-section")}
            type="button"
            className="text-gray-400 hover:text-white flex items-center"
            style={{ marginLeft: 0, alignSelf: 'flex-start' }}
          >
            <ArrowLeft className="mr-2 w-4 h-4" /> Back to products
          </button>
        </motion.div>
        <motion.div 
          className="w-full max-w-6xl mx-auto flex flex-col md:flex-row gap-8 items-start justify-center px-4 md:px-0"
          variants={fadeInUp}
        >
          {/* Image carousel section */}
          <motion.div className="flex-1 flex flex-col items-center justify-center" variants={fadeInUp} custom={2}>
            {isInstagramExportSettings ? (
              <div className="relative w-full max-w-xl h-[450px] flex items-center justify-center">
                {/* Show first image by default */}
                <>
                  {!showSlider ? (
                    <img
                      src={beforeImage}
                      alt="Instagram Export Settings Cover"
                      className="w-full h-full object-cover rounded-2xl"
                      style={{ objectPosition: 'center center' }}
                    />
                  ) : (
                    <BeforeAfterSlider before="/static-assets/LUT.jpg" after="/static-assets/LUTS.jpg" />
                  )}
                  {/* Left arrow to go back to first image */}
                  <button
                    className="absolute left-3 top-1/2 -translate-y-1/2 bg-black/60 hover:bg-black/80 text-white p-2 rounded-full z-10"
                    onClick={() => setShowSlider(false)}
                    aria-label="Back to image"
                    disabled={!showSlider}
                    style={{ opacity: showSlider ? 1 : 0.5, pointerEvents: showSlider ? 'auto' : 'none' }}
                  >
                    <ChevronLeft className="w-6 h-6" />
                  </button>
                  {/* Right arrow to show slider */}
                  <button
                    className="absolute right-3 top-1/2 -translate-y-1/2 bg-black/60 hover:bg-black/80 text-white p-2 rounded-full z-10"
                    onClick={() => setShowSlider(true)}
                    aria-label="Show slider"
                    disabled={showSlider}
                    style={{ opacity: !showSlider ? 1 : 0.5, pointerEvents: !showSlider ? 'auto' : 'none' }}
                  >
                    <ChevronRight className="w-6 h-6" />
                  </button>
                </>
              </div>
            ) : (
              <div className="relative w-full max-w-xl h-[450px] flex items-center justify-center">
                {/* Show main image or BeforeAfterSlider for all products, exactly like first product */}
                {!showSlider ? (
                  <img
                    src={productData.imageUrl[0]}
                    alt={productData.name}
                    className="w-full h-full object-cover rounded-2xl"
                    style={{ objectPosition: 'center center' }}
                  />
                ) : (
                  <BeforeAfterSlider before={productData.imageUrl[0]} after={productData.imageUrl[1]} />
                )}
                {/* Left arrow to go back to main image */}
                <button
                  className="absolute left-3 top-1/2 -translate-y-1/2 bg-black/60 hover:bg-black/80 text-white p-2 rounded-full z-10"
                  onClick={() => setShowSlider(false)}
                  aria-label="Back to image"
                  disabled={!showSlider}
                  style={{ opacity: showSlider ? 1 : 0.5, pointerEvents: showSlider ? 'auto' : 'none' }}
                >
                  <ChevronLeft className="w-6 h-6" />
                </button>
                {/* Right arrow to show slider */}
                {productData.imageUrl.length > 1 && (
                  <button
                    className="absolute right-3 top-1/2 -translate-y-1/2 bg-black/60 hover:bg-black/80 text-white p-2 rounded-full z-10"
                    onClick={() => setShowSlider(true)}
                    aria-label="Show slider"
                    disabled={showSlider}
                    style={{ opacity: !showSlider ? 1 : 0.5, pointerEvents: !showSlider ? 'auto' : 'none' }}
                  >
                    <ChevronRight className="w-6 h-6" />
                  </button>
                )}
              </div>
            )}
          </motion.div>
          {/* Details card section */}
          <motion.div 
            className="flex-1 w-full max-w-lg bg-purple-900/30 rounded-2xl shadow-glow p-6 md:p-8 border border-white/10 backdrop-blur-md flex flex-col"
            variants={staggerParent}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
          >
            <motion.h1 className="text-3xl md:text-4xl font-bold mb-2 bg-clip-text text-transparent bg-gradient-to-r from-white to-purple-300" variants={fadeInUp}>
              {productData.name}
            </motion.h1>
            <motion.div className="flex items-center mb-2" variants={fadeInUp}>
              <div className="flex text-yellow-400 mr-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star key={star} className={`w-4 h-4 ${star <= 4.5 ? "fill-current" : ""}`} />
                ))}
              </div>
              <span className="text-gray-400">(42 reviews)</span>
            </motion.div>
            <motion.div className="flex items-center mb-4" variants={fadeInUp}>
              <span className="text-2xl font-bold mr-2 text-white">${(productData.price / 100).toFixed(2)}</span>
              {productData.originalPrice && (
                <span className="text-gray-400 line-through">${(productData.originalPrice / 100).toFixed(2)}</span>
              )}
              {productData.discount && (
                <span className="text-green-400 font-semibold ml-2">-{productData.discount}%</span>
              )}
            </motion.div>
            <motion.div className="flex flex-wrap gap-2 mb-4" variants={fadeInUp}>
              {productData.compatibility?.map((comp) => (
                <Badge 
                  key={comp} 
                  variant="outline" 
                  className="bg-purple-900/10 backdrop-blur-sm border border-purple-500/30 text-xs px-2 py-0.5 rounded-full"
                >
                  {comp}
                </Badge>
              ))}
            </motion.div>
            <motion.p className="text-gray-300 mb-4" variants={fadeInUp}>{productData.description}</motion.p>
            <motion.div className="mb-6" variants={fadeInUp}>
              <h3 className="font-semibold text-lg mb-2">Key Features</h3>
              <ul className="list-disc list-inside space-y-2 text-gray-300">
                {productData.features?.map((feature, index) => (
                  <li key={index}>{feature}</li>
                ))}
              </ul>
            </motion.div>
            <motion.div className="flex gap-3 mt-auto" variants={fadeInUp}>
              <Button 
                variant="outline"
                className="bg-transparent hover:bg-purple-900/40 border border-white/20 text-white px-6 py-3 rounded-md font-medium shadow-glow"
                onClick={handleBuyNow}
              >
                Buy Now
              </Button>
              {/* Add to Cart button removed as per user request */}
            </motion.div>
          </motion.div>
        </motion.div>
      </motion.section>
      {/* Mobile Footer for mobile view */}
      <div className="md:hidden">
        <Footer />
      </div>
    </>
  );
}

export default ProductDetailClient;
