"use client";

import React from "react";

interface FeatureCardProps {
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  description: string;
}

const FeatureCard: React.FC<FeatureCardProps> = ({ icon: Icon, title, description }) => (
  <div className="bg-purple-900/20 backdrop-blur-lg rounded-lg p-6 border border-white/10 shadow-glow text-center">
    <div className="flex items-center justify-center mb-4">
      <Icon className="w-8 h-8 text-purple-400" />
    </div>
    <h3 className="text-lg font-bold mb-2">{title}</h3>
    <p className="text-gray-400 text-sm">{description}</p>
  </div>
);

export default FeatureCard;
