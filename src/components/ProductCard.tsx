"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { ShoppingCart } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { useCart } from "@/contexts/CartContext";
import { Product } from "@/data/products";
import { motion } from "framer-motion";

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { addToCart } = useCart();
  
  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product);
  };

  return (
    <Link href={`/products/${product.slug}`}>
      <motion.div 
        className="block bg-purple-900/20 backdrop-blur-lg border border-white/10 rounded-lg overflow-hidden shadow-glow group transition-all duration-300 hover:scale-[1.02] hover:shadow-lg hover:bg-purple-900/30"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="relative h-48">
          <Image 
            src={product.imageUrl[0]} 
            alt={product.name} 
            className="w-full h-full object-cover"
            fill
            sizes="(max-width: 768px) 100vw, 25vw"
            style={{ objectFit: "cover" }}
          />
          {product.discount && (
            <div className="absolute top-2 left-2 bg-purple-600/80 backdrop-blur-md text-white font-semibold text-xs py-1 px-2 rounded-full border border-white/10">-{product.discount}%</div>
          )}
        </div>
        <div className="p-4 bg-purple-900/10 backdrop-blur-md">
          <h3 className="text-lg font-bold mb-1">{product.name}</h3>
          <div className="flex flex-wrap gap-2 mb-3">
            {product.compatibility?.map((comp: string) => (
              <Badge key={comp} variant="outline" className="bg-purple-900/40 backdrop-blur-sm border border-purple-500/30 text-xs px-2 py-0.5 rounded-full">
                {comp}
              </Badge>
            ))}
          </div>
          <div className="flex justify-between items-center mt-4 p-2 rounded-lg bg-purple-950/40 backdrop-blur-md border border-white/5">
            <div className="flex items-center">
              <span className="text-lg font-bold text-white">${(product.price / 100).toFixed(2)}</span>
              {product.originalPrice && (
                <span className="text-gray-400 line-through text-sm ml-2">
                  ${(product.originalPrice / 100).toFixed(2)}
                </span>
              )}
            </div>
            <button
              onClick={handleAddToCart}
              className="ml-4 flex items-center gap-2 px-4 py-2 rounded-lg bg-gradient-to-r from-purple-500 to-purple-700 text-white font-semibold shadow-lg hover:scale-105 hover:from-purple-600 hover:to-purple-800 transition-all"
              title="Add to Cart"
            >
              <ShoppingCart size={22} />
            </button>
          </div>
        </div>
      </motion.div>
    </Link>
  );
};

export default ProductCard;
