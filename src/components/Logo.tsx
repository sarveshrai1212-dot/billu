import React from "react";
import Image from "next/image";

const Logo: React.FC = () => {
  return (
    <div className="font-bold text-xl flex items-center gap-1 zap-glow">
      <Image
        src="/attached_assets/wolf-head-purple.png"
        alt="Wolf Head"
        width={48}
        height={48}
        className="h-12 w-12 mr-1"
        style={{ display: "inline" }}
        priority
      />
      <span className="text-white">Vroom</span>
      <span className="bg-gradient-to-r from-white via-[#b993f7] to-[#a855f7] bg-clip-text text-transparent">
        Visions
      </span>
      <span className="text-[#a855f7]">X</span>
    </div>
  );
};

export default Logo;
