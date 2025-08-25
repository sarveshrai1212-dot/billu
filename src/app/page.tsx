"use client";

import React from "react";
import Home from "@/components/Home";
import MobileHome from "@/components/mobile/MobileHome";
// ...existing code...
import Footer from "@/components/Footer";

export default function Page() {
  return (
    <>
      {/* Mobile-only components */}
      <div className="md:hidden">
        <MobileHome />
        <Footer />
      </div>
      {/* Desktop-only component */}
      <div className="hidden md:block">
        <Home />
      </div>
    </>
  );
}
