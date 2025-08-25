"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";


import { ShoppingCart } from "lucide-react";
import { useCart } from "@/contexts/CartContext";

const WOLF_LOGO = "/attached_assets/wolf-head-purple.png"; // same as desktop
// Variant 1: Simple Shopping Bag
const CART_ICON_BAG = (
  <span style={{ position: 'relative', display: 'inline-block', width: 33, height: 33, verticalAlign: 'middle' }}>
    <svg width="33" height="33" viewBox="0 0 33 33" fill="none" stroke="currentColor" strokeWidth="1.65" strokeLinecap="round" strokeLinejoin="round" style={{ position: 'relative', top: '2.5px' }}>
      <rect x="8.5" y="11" width="16" height="13" rx="4.5" stroke="currentColor" fill="none" />
      <path d="M12 11V8a4.5 4.5 0 0 1 9 0v3" stroke="currentColor" fill="none" />
    </svg>
    <span style={{ position: 'absolute', top: 2.5, right: 2.5, width: 7.5, height: 7.5, background: '#a855f7', borderRadius: '50%', border: '2.2px solid #fff' }} />
  </span>
);

// Variant 2: Shopping Cart (Basket)
const CART_ICON_BASKET = (
  <span style={{ position: 'relative', display: 'inline-block', width: 28, height: 28, verticalAlign: 'middle' }}>
    <svg width="28" height="28" viewBox="0 0 28 28" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" style={{ position: 'relative', top: '2px' }}>
      <rect x="6" y="10" width="16" height="9" rx="3" stroke="currentColor" fill="none" />
      <circle cx="10" cy="22" r="2" stroke="currentColor" fill="none" />
      <circle cx="18" cy="22" r="2" stroke="currentColor" fill="none" />
      <path d="M8 10V7h12v3" stroke="currentColor" fill="none" />
    </svg>
    <span style={{ position: 'absolute', top: 2, right: 2, width: 6, height: 6, background: '#a855f7', borderRadius: '50%', border: '2px solid #fff' }} />
  </span>
);

// Variant 3: Minimal Shopping Tote
const CART_ICON_TOTE = (
  <span style={{ position: 'relative', display: 'inline-block', width: 28, height: 28, verticalAlign: 'middle' }}>
    <svg width="28" height="28" viewBox="0 0 28 28" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" style={{ position: 'relative', top: '2px' }}>
      <rect x="8" y="10" width="12" height="10" rx="3" stroke="currentColor" fill="none" />
      <path d="M10 10V8a4 4 0 0 1 8 0v2" stroke="currentColor" fill="none" />
    </svg>
    <span style={{ position: 'absolute', top: 2, right: 2, width: 6, height: 6, background: '#a855f7', borderRadius: '50%', border: '2px solid #fff' }} />
  </span>
);

// Change this to try different icons:
const CART_ICON = CART_ICON_BAG;
const HAMBURGER_ICON = (
  <svg width="32" height="32" fill="none" viewBox="0 0 32 32" stroke="currentColor">
    <rect x="5" y="8" width="22" height="1.2" rx="0.6" fill="currentColor" />
    <rect x="5" y="15" width="22" height="1.2" rx="0.6" fill="currentColor" />
    <rect x="5" y="22" width="22" height="1.2" rx="0.6" fill="currentColor" />
  </svg>
);
const CLOSE_ICON = (
  <svg width="32" height="32" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
  </svg>
);

const NAV_LINKS = [
  { label: "Features", path: "#", scrollId: "before-after" },
  { label: "Products", path: "/products" },
  { label: "Reviews", path: "#", scrollId: "reviews" },
];

import { useRouter } from "next/navigation";

const MobileNavbar: React.FC = () => {
  // Desktop-style nav click handler
  const handleNavClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    path: string,
    scrollId?: string
  ) => {
    if (scrollId) {
      e.preventDefault();
      if (window.location.pathname === "/") {
        const el = document.getElementById(scrollId);
        if (el) {
          el.scrollIntoView({ behavior: "smooth", block: "start" });
        }
      } else {
        // Go to home, then scroll
        window.location.href = `/${scrollId ? "#" + scrollId : ""}`;
      }
      setMenuOpen(false);
    } else if (path) {
      setMenuOpen(false);
      router.push(path);
    }
  };
  const [menuOpen, setMenuOpen] = useState(false);
  const [showCart, setShowCart] = useState(false);
  const router = useRouter();
  const { cart, removeFromCart, getTotalPrice, updateQuantity } = useCart();

  // Desktop-style nav click handler
  return (
    <>
      {/* Navbar with framer-motion slide-down animation */}
      <motion.nav
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="w-full flex items-center justify-between px-4 py-3 bg-black/30 backdrop-blur-md text-white fixed top-0 left-0 z-30 md:hidden"
        style={{ boxShadow: 'none', filter: 'none', background: 'rgba(0,0,0,0.3)' }}
      >
        {/* Left: Hamburger icon (slide from left) */}
        <motion.div
          initial={{ x: -60, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.15, ease: "easeOut" }}
          className="flex items-center"
        >
          <button
            onClick={() => setMenuOpen(true)}
            aria-label="Open Menu"
            className="focus:outline-none"
            style={{ background: "none", border: "none", padding: 0 }}
          >
            {HAMBURGER_ICON}
          </button>
        </motion.div>
        {/* Center: Brand text (slide from top) */}
        <motion.div
          initial={{ y: -40, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.25, ease: "easeOut" }}
          className="flex-1 flex items-center justify-center"
        >
          <span className="text-white font-bold text-xl mr-1">Vroom</span>
          <span className="bg-gradient-to-r from-white via-[#b993f7] to-[#a855f7] bg-clip-text text-transparent font-bold text-xl mr-1">Visions</span>
          <span className="text-[#a855f7] font-bold text-xl">X</span>
        </motion.div>
        {/* Right: Cart icon (slide from right) */}
        <motion.div
          initial={{ x: 60, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.35, ease: "easeOut" }}
          className="flex items-center"
        >
          {/* BagIcon with click to open mobile cart slider */}
          <button
            aria-label="Open Cart"
            onClick={() => setShowCart(true)}
            style={{ background: 'none', border: 'none', padding: 0, margin: 0, cursor: 'pointer' }}
          >
            {CART_ICON}
          </button>
        </motion.div>
      </motion.nav>

        {/* Mobile Cart Slider (slide from right) - moved outside navbar so it covers full screen */}
        {showCart && (
          <div className="fixed inset-0 z-50">
            {/* Backdrop */}
            <div
              className="absolute inset-0 bg-black/30 backdrop-blur-sm"
              onClick={() => setShowCart(false)}
            />
            {/* Cart Panel */}
            <div className="absolute top-0 right-0 h-full w-[90vw] max-w-xs bg-[#1a1333] shadow-2xl z-50 border-l border-white/10 rounded-l-2xl p-4 flex flex-col animate-slideInCart">
              <div className="flex items-center justify-between mb-2">
                <span className="text-lg font-bold text-white" style={{ fontFamily: 'var(--font-geist-mono), Geist Mono, monospace', letterSpacing: '0.04em' }}>Cart</span>
                <button className="text-white hover:text-purple-400 text-2xl" onClick={() => setShowCart(false)}>&times;</button>
              </div>
              <div className="flex items-center justify-center mb-4">
                <div className="h-0.5 w-full bg-gradient-to-r from-purple-500 via-purple-400 to-purple-600 opacity-80 rounded-full" />
              </div>
              <div className="flex-1 flex flex-col gap-6 overflow-y-auto">
                {cart.length === 0 ? (
                  <div className="flex flex-col items-center justify-center h-[40vh] w-full">
                    <span className="text-white/70 text-lg font-semibold" style={{fontFamily: 'var(--font-geist-sans), Geist, sans-serif'}}>YOUR CART IS EMPTY</span>
                  </div>
                ) : (
                  cart.map(item => (
                    <div key={item.product.id} className="flex flex-row items-center gap-4 px-2">
                      <Image src={item.product.imageUrl[0]} alt={item.product.name} width={80} height={80} className="rounded-lg shadow" />
                      <div className="flex-1 flex flex-col justify-center">
                        <span className="font-semibold text-sm text-white mb-1" style={{fontFamily: 'var(--font-geist-sans), Geist, sans-serif'}}>{item.product.name}</span>
                        <span className="text-xs text-gray-400 mb-2">RS. {(item.product.price).toLocaleString('en-IN', {minimumFractionDigits: 2})}</span>
                        <div className="flex items-center gap-2 mt-2">
                          <div className="grid grid-cols-3 items-center justify-center rounded border border-purple-500 bg-transparent overflow-hidden w-[70px]">
                            <button onClick={() => updateQuantity(item.product.id, Math.max(1, item.quantity - 1))} className="h-7 w-full text-sm text-white bg-transparent flex items-center justify-center">-</button>
                            <span className="h-7 w-full text-sm font-medium text-white select-none bg-transparent flex items-center justify-center">{item.quantity}</span>
                            <button onClick={() => updateQuantity(item.product.id, item.quantity + 1)} className="h-7 w-full text-sm text-white bg-transparent flex items-center justify-center">+</button>
                          </div>
                          <button onClick={() => removeFromCart(item.product.id)} className="ml-2 text-xs text-gray-400 underline hover:text-purple-500">Remove</button>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>
              {/* Order note & taxes info */}
              <div className="w-full bg-[#1a1333] rounded-xl p-3 mt-4">
                <span className="block text-white text-base font-semibold mb-1" style={{fontFamily: 'var(--font-geist-sans), Geist, sans-serif'}}>Add order note</span>
                <span className="block text-gray-400 text-sm font-normal" style={{fontFamily: 'var(--font-geist-sans), Geist, sans-serif'}}>Taxes and shipping calculated at checkout</span>
              </div>
              {/* Total & Checkout */}
              {cart.length > 0 && (
                <div className="mt-4 pt-4 border-t border-white/10">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-white font-bold text-base">Total:</span>
                    <span className="text-purple-400 font-bold text-lg">RS. {cart.reduce((total, item) => total + item.product.price * item.quantity, 0).toLocaleString('en-IN', {maximumFractionDigits: 0})}</span>
                  </div>
                  <button className="w-full py-3 rounded-xl bg-gradient-to-r from-purple-500 to-purple-700 text-white font-bold text-lg shadow-lg hover:scale-105 transition-all">Checkout</button>
                </div>
              )}
            </div>
            <style jsx>{`
              .animate-slideInCart {
                animation: slideInCart 0.3s cubic-bezier(0.4,0,0.2,1);
              }
              @keyframes slideInCart {
                from { transform: translateX(100%); opacity: 0; }
                to { transform: translateX(0); opacity: 1; }
              }
            `}</style>
          </div>
        )}

        {/* Overlay Menu with animated hamburger to X */}
        {menuOpen && (
          <div className="fixed inset-0 z-40 flex items-center justify-center">
            {/* Backdrop */}
            <div
              className="absolute inset-0 bg-black/30 backdrop-blur-sm"
              onClick={() => setMenuOpen(false)}
            />
            {/* Centered Box */}
            <div className="relative flex flex-col items-center justify-center w-11/12 max-w-xs min-h-[220px] bg-white/10 backdrop-blur-lg rounded-3xl shadow-xl p-8 animate-fadeIn">
              <button
                className="absolute top-4 right-4 text-white hover:text-purple-400"
                onClick={() => setMenuOpen(false)}
                aria-label="Close Menu"
              >
                {CLOSE_ICON}
              </button>
              <div className="flex flex-col items-center gap-8 w-full mt-2">
                {NAV_LINKS.map((link) => {
                  return (
                    <a
                      key={link.label}
                      href={link.path}
                      className="text-2xl font-normal text-white hover:text-purple-400 transition-colors w-full text-center"
                      style={{ fontFamily: 'Inter, Arial, sans-serif', fontWeight: 400 }}
                      onClick={e => handleNavClick(e, link.path, link.scrollId)}
                    >
                      {link.label}
                    </a>
                  );
                })}
              </div>
            </div>
            <style jsx>{`
              .animate-fadeIn {
                animation: fadeInBox 0.25s cubic-bezier(0.4,0,0.2,1);
              }
              @keyframes fadeInBox {
                from { opacity: 0; transform: scale(0.95); }
                to { opacity: 1; transform: scale(1); }
              }
            `}</style>
          </div>
        )}
    </>
  );
};

export default MobileNavbar;
