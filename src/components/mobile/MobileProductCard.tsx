"use client";

import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";

interface MobileProductCardProps {
  imageUrl: string;
  name: string;
  price: string;
  onClick?: () => void;
}

const MobileProductCard: React.FC<MobileProductCardProps> = ({ imageUrl, name, price, onClick }) => {
  return (
    <motion.div
      className="bg-purple-900/20 backdrop-blur-md rounded-lg shadow-glow border border-white/10 p-3 flex flex-col items-center cursor-pointer hover:scale-105 transition-transform"
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.97 }}
      onClick={onClick}
    >
      <Image
        src={imageUrl}
        alt={name}
        width={112}
        height={112}
        className="w-28 h-28 object-cover rounded mb-2 border border-white/10"
        priority
      />
      <div className="font-semibold text-white text-base text-center mb-1">{name}</div>
      <div className="text-purple-200 text-sm font-medium">₹{price}</div>
    </motion.div>
  );
};

export default MobileProductCard;
