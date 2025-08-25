"use client";
import React from "react";
import Link from "next/link";
import Logo from "./Logo";
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



const Footer: React.FC = () => {
  return (
    <footer className="bg-transparent backdrop-blur-md py-10 border-t border-white/10">
      <div className="container mx-auto px-4">
        <motion.div
          variants={parentVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8 bg-purple-900/10 backdrop-blur-lg rounded-xl border border-white/10 shadow-glow p-6">
            <motion.div variants={fadeInUp}>
              <div>
                <Link href="/" className="cursor-pointer mb-4 inline-block">
                  <Logo />
                </Link>
                <p className="text-gray-400 text-sm mb-4">
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
                    {/* Gmail envelope icon, styled to match Lucide icons */}
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="4" width="20" height="16" rx="2"/><polyline points="22,6 12,13 2,6"/></svg>
                  </a>
                </div>
              </div>
            </motion.div>
            <motion.div variants={fadeInUp}>
              <div>
                <h3 className="font-bold text-lg mb-4">Products</h3>
                <ul className="space-y-2">
                  <li>
                    <Link href="/products/instagram-export-guide" className="text-gray-400 hover:text-white">
                      Instagram Export Settings
                    </Link>
                  </li>
                  <li>
                    <Link href="/products/color-grading-luts-volume-2" className="text-gray-400 hover:text-white">
                      Cinematic Rec709 Luts
                    </Link>
                  </li>
                  <li>
                    <Link href="/products/sci-fi-luts" className="text-gray-400 hover:text-white">
                      Blackmagic Pocket 4k/6k
                    </Link>
                  </li>
                  <li>
                    <Link href="/products/vintage-car-luts" className="text-gray-400 hover:text-white">
                      Cinematic Lut Collection
                    </Link>
                  </li>
                </ul>
              </div>
            </motion.div>
            <motion.div variants={fadeInUp}>
              <div>
                <h3 className="font-bold text-lg mb-4">Resources</h3>
                <ul className="space-y-2">
                  <li>
                    <Link href="#" className="text-gray-400 hover:text-white">Tutorials</Link>
                  </li>
                  <li>
                    <Link href="#" className="text-gray-400 hover:text-white">Blog</Link>
                  </li>
                  <li>
                    <Link href="#" className="text-gray-400 hover:text-white">FAQ</Link>
                  </li>
                  <li>
                    <Link href="#" className="text-gray-400 hover:text-white">Support</Link>
                  </li>
                </ul>
              </div>
            </motion.div>
            <motion.div variants={fadeInUp}>
              <div>
                <h3 className="font-bold text-lg mb-4">Company</h3>
                <ul className="space-y-2">
                  <li>
                    <Link href="#" className="text-gray-400 hover:text-white">About Us</Link>
                  </li>
                  <li>
                    <Link href="#" className="text-gray-400 hover:text-white">Contact</Link>
                  </li>
                  <li>
                    <Link href="#" className="text-gray-400 hover:text-white">Privacy Policy</Link>
                  </li>
                  <li>
                    <Link href="#" className="text-gray-400 hover:text-white">Terms of Service</Link>
                  </li>
                </ul>
              </div>
            </motion.div>
          </div>
          <motion.div
            className="mt-6 text-center bg-purple-900/5 backdrop-blur-lg rounded-xl border border-white/5 p-4 shadow-glow"
            variants={fadeInUp}
          >
            <p className="text-gray-400 text-sm">&copy; {new Date().getFullYear()} VroomVisionX. All rights reserved.</p>
          </motion.div>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;
