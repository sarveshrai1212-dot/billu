"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";

interface MobileBeforeAfterSliderProps {
  beforeImage: string;
  afterImage: string;
}

const MobileBeforeAfterSlider: React.FC<MobileBeforeAfterSliderProps> = ({ beforeImage, afterImage }) => {
  const [position, setPosition] = useState(50);
  const handleDrag = (e: React.TouchEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.touches[0].clientX - rect.left;
    let percent = (x / rect.width) * 100;
    percent = Math.max(0, Math.min(100, percent));
    setPosition(percent);
  };

  return (
    <div className="relative w-full max-w-xs mx-auto aspect-[4/5] select-none overflow-hidden rounded-lg shadow-glow border border-white/10 bg-black">
      <Image
        src={beforeImage}
        alt="Before"
        fill
        className="absolute inset-0 w-full h-full object-cover"
        draggable={false}
        style={{ zIndex: 1 }}
        sizes="100vw"
        priority
      />
      <Image
        src={afterImage}
        alt="After"
        fill
        className="absolute inset-0 h-full object-cover"
        draggable={false}
        style={{ width: `${position}%`, zIndex: 2, clipPath: `inset(0 ${100 - position}% 0 0)` }}
        sizes="100vw"
        priority
      />

      <motion.div
        className="absolute top-0 left-0 h-full w-1 bg-gradient-to-b from-[#7f53ac] to-[#657ced] z-10 cursor-pointer"
        style={{ x: `calc(${position}% - 2px)` }}
        drag="x"
        dragConstraints={{ left: 0, right: 220 }}
        dragElastic={0.1}
        onTouchMove={handleDrag}
        onTouchStart={handleDrag}
      >
        <div className="w-6 h-6 rounded-full bg-gradient-to-br from-[#7f53ac] to-[#657ced] border-2 border-white absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 shadow-glow flex items-center justify-center">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="8" y1="12" x2="16" y2="12" /><polyline points="12 8 16 12 12 16" /></svg>
        </div>
      </motion.div>
    </div>
  );
};

export default MobileBeforeAfterSlider;
