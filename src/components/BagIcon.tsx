import React from "react";

const BagIcon: React.FC<{ width?: number; height?: number; color?: string; className?: string }> = ({ width = 28, height = 28, color = "white", className }) => (
  <svg
    width={width}
    height={height}
    viewBox="0 0 32 32"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    style={{ display: "inline-block", verticalAlign: "middle" }}
    className={className}
  >
  <rect x="6" y="10" width="20" height="20" rx="3" stroke={color} strokeWidth="2.5" />
    <path d="M10 10V8a6 6 0 0 1 12 0v2" stroke={color} strokeWidth="2.5" />
  {/* % symbol inside the bag */}
  </svg>
);

export default BagIcon;
