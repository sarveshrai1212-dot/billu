import React from "react";
import MobileNavbar from "./MobileNavbar";
import DesktopNavbar from "./DesktopNavbar";

const ResponsiveNavbar: React.FC = () => {
  return (
    <>
      <MobileNavbar />
      <DesktopNavbar />
      {/* Add spacing below navbar for fixed position */}
      <div className="h-16 md:h-20" />
    </>
  );
};

export default ResponsiveNavbar;
