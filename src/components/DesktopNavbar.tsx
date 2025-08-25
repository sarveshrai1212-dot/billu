import React from "react";
import Link from "next/link";
import Image from "next/image";

const WOLF_LOGO = "/wolf-head-purple.png";
const CART_ICON = (
  <svg width="28" height="28" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2 9m13-9l2 9m-5-9V6a2 2 0 10-4 0v3" />
  </svg>
);
const NAV_LINKS = [
  { label: "Features", href: "#features" },
  { label: "Products", href: "#products" },
  { label: "Reviews", href: "#reviews" },
];

const DesktopNavbar: React.FC = () => {
  return (
    <nav className="w-full flex items-center justify-between px-8 py-4 bg-black text-white fixed top-0 left-0 z-30 hidden md:flex">
      {/* Logo and Name */}
      <div className="flex items-center gap-3">
        <Image src={WOLF_LOGO} alt="Wolf Logo" width={40} height={40} />
        <span className="font-bold text-xl tracking-wide">LUTFACTORY</span>
      </div>
      {/* Links */}
      <div className="flex gap-8">
        {NAV_LINKS.map((link) => (
          <Link
            key={link.label}
            href={link.href}
            className="text-lg font-medium hover:text-purple-400 transition-colors"
          >
            {link.label}
          </Link>
        ))}
      </div>
      {/* Cart */}
      <Link href="/cart" aria-label="Cart" className="hover:text-purple-400">{CART_ICON}</Link>
    </nav>
  );
};

export default DesktopNavbar;
