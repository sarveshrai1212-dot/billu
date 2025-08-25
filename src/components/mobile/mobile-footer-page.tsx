"use client";
import React from "react";
import Footer from "@/components/Footer";
import { motion } from "framer-motion";

const fadeInUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

export default function MobileFooterPage() {
  return (
    <footer className="md:hidden w-full bg-black text-white py-6 px-4 flex flex-col items-center border-t border-white/10">
      <motion.div
        className="w-full"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
      >
        {/* Animate each section inside Footer for mobile */}
        <motion.div variants={fadeInUp} custom={1}>
          <Footer />
        </motion.div>
      </motion.div>
    </footer>
  );
}
