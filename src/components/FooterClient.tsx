"use client";
import React from "react";
// ...existing code...
import { motion } from "framer-motion";

const fadeInUp = {
  hidden: { opacity: 0, y: 40 },
  visible: (i = 1) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.08,
      duration: 0.5,
    },
  }),
};

const FooterClient: React.FC = () => {
  // Animate the main grid and copyright section
  // This assumes Footer returns the same structure as before
  return (
    <footer className="bg-transparent backdrop-blur-md py-10 border-t border-white/10">
      <div className="container mx-auto px-4">
        <motion.div
          className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8 bg-purple-900/10 backdrop-blur-lg rounded-xl border border-white/10 shadow-glow p-6"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          {/* No children here, just a placeholder for future use if needed */}
        </motion.div>
        <motion.div
          className="mt-6 text-center bg-purple-900/5 backdrop-blur-lg rounded-xl border border-white/5 p-4 shadow-glow"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={fadeInUp}
          custom={5}
        >
          <p className="text-gray-400 text-sm">&copy; {new Date().getFullYear()} VroomVisionX. All rights reserved.</p>
        </motion.div>
      </div>
    </footer>
  );
};

export default FooterClient;
