import { Wand2, Repeat, Zap, Camera, Palette, Bolt, Shield, LucideIcon } from "lucide-react";

export interface Feature {
  icon: LucideIcon;
  title: string;
  description: string;
}

export const mainFeatures: Feature[] = [
  {
    icon: Wand2,
    title: "One-Click Transformation",
    description: "Apply professional-grade color grading with a single click and transform your images instantly."
  },
  {
    icon: Repeat,
    title: "Cross-Platform Compatible",
    description: "Our LUTs work seamlessly across Lightroom, Photoshop, Capture One, and many other editing tools."
  },
  {
    icon: Zap,
    title: "Instant Results",
    description: "Save hours of editing time with our professionally crafted presets that deliver stunning results instantly."
  }
];

export const whyChooseUs: Feature[] = [
  {
    icon: Camera,
    title: "Professional Editing",
    description: "High-quality photo enhancement"
  },
  {
    icon: Palette,
    title: "Color Grading",
    description: "Expert color correction"
  },
  {
    icon: Bolt,
    title: "Quick Delivery",
    description: "24-48 hour turnaround"
  },
  {
    icon: Shield,
    title: "Satisfaction Guaranteed",
    description: "Money-back guarantee"
  }
];
