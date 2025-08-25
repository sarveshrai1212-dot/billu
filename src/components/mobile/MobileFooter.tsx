"use client";
import React from "react";
import Link from "next/link";
import Logo from "@/components/Logo";
import { Instagram } from "lucide-react";
import { motion } from "framer-motion";

const fadeInUp = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
    },
  },
};

const parentVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const MobileFooter: React.FC = () => {
  return (
    <footer className="md:hidden w-full bg-black text-white py-8 px-4 flex flex-col items-center border-t border-white/10">
      <div className="w-full max-w-lg mx-auto">
        <motion.div
          variants={parentVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          <motion.div className="flex flex-col items-center mb-6" variants={fadeInUp}>
            <Link href="/" className="mb-3">
              <Logo />
            </Link>
            <p className="text-gray-400 text-sm text-center mb-3">
              Professional car editing and color grading solutions that transform ordinary photos into extraordinary visuals.
            </p>
            <div className="flex space-x-4">
              <a href="https://www.instagram.com/vroom_visionsx?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw=="
                target="_blank"
                rel="noopener noreferrer"
                className="text-purple-400 hover:text-white transition-colors flex items-center rounded-full bg-purple-900/30 p-2 border border-white/10 shadow-glow">
                <Instagram size={18} />
              </a>
              <a href="mailto:support@vroomvisions.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-red-500 hover:text-white transition-colors flex items-center rounded-full bg-purple-900/30 p-2 border border-white/10 shadow-glow">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="4" width="20" height="16" rx="2"/><polyline points="22,6 12,13 2,6"/></svg>
              </a>
            </div>
          </motion.div>

          <motion.div
            className="w-full max-w-2xl mx-auto mb-8"
            id="before-after"
            style={{ scrollMarginTop: '80px' }}
            variants={fadeInUp}
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

          <motion.div className="grid grid-cols-2 gap-6 mb-6" variants={fadeInUp}>
            <motion.div variants={fadeInUp}>
              <h3 className="font-bold text-base mb-3">Products</h3>
              <ul className="space-y-2">
                <li>
                  <Link href="/products/instagram-export-guide" className="text-gray-400 hover:text-white text-sm">
                    Instagram Export Settings
                  </Link>
                </li>
                <li>
                  <Link href="/products/color-grading-luts-volume-2" className="text-gray-400 hover:text-white text-sm">
                    Cinematic Rec709 Luts
                  </Link>
                </li>
                <li>
                  <Link href="/products/sci-fi-luts" className="text-gray-400 hover:text-white text-sm">
                    Blackmagic Pocket 4k/6k
                  </Link>
                </li>
                <li>
                  <Link href="/products/vintage-car-luts" className="text-gray-400 hover:text-white text-sm">
                    Cinematic Lut Collection
                  </Link>
                </li>
              </ul>
            </motion.div>
            <motion.div variants={fadeInUp}>
              <h3 className="font-bold text-base mb-3">Company</h3>
              <ul className="space-y-2">
                <li>
                  <Link href="#" className="text-gray-400 hover:text-white text-sm">About Us</Link>
                </li>
                <li>
                  <Link href="#" className="text-gray-400 hover:text-white text-sm">Contact</Link>
                </li>
                <li>
                  <Link href="#" className="text-gray-400 hover:text-white text-sm">Privacy Policy</Link>
                </li>
                <li>
                  <Link href="#" className="text-gray-400 hover:text-white text-sm">Terms of Service</Link>
                </li>
              </ul>
            </motion.div>
          </motion.div>

          <motion.div className="text-center bg-purple-900/5 backdrop-blur-lg rounded-xl border border-white/5 p-3 shadow-glow" variants={fadeInUp}>
            <p className="text-gray-400 text-xs">&copy; {new Date().getFullYear()} VroomVisionX. All rights reserved.</p>
          </motion.div>
        </motion.div>
      </div>
    </footer>
  );
};

export default MobileFooter;
