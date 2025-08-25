export interface Product {
  id: number;
  name: string;
  slug: string;
  description: string;
  price: number;
  originalPrice?: number;
  discount?: number;
  features?: string[];
  category?: string;
  compatibility?: string[];
  imageUrl: string[];
}


const products: Product[] = [
  {
    id: 1,
    name: "Instagram Export Settings",
    slug: "instagram-export-guide",
    description: "Best export settings for Instagram to avoid compression and quality loss.",
    price: 900, // $9.00 in cents
    originalPrice: 1500, // $15.00
    discount: 40,
    features: [
      "After Effects render settings for best quality",
      "Media Encoder export settings to reduce compression",
      "Topaz AI upscaling & noise reduction tips",
      "Step-by-step installation guide included"
    ],
    category: "guide",
    compatibility: ["AE", "ME", "TVA"],
    imageUrl: [
      "/attached_assets/Instagram_Export_settings_cover.jpg",
      "/static-assets/LUT.jpg",
      "/static-assets/LUTS.jpg"
    ]
  },
  {
    id: 2,
    name: "Cinematic Rec709 Luts",
    slug: "color-grading-luts-volume-2",
    description: "Expand your car photography toolkit with our second volume of professional LUTs. Perfect for moody and dramatic car shots.",
    price: 5900,
    originalPrice: 11900,
    discount: 50,
    features: [
      "15 new cinematic LUTs for diverse lighting",
      "Compatible with all major editing software",
      "Before/after examples included",
      "One-click application"
    ],
    category: "luts",
    compatibility: ["AE", "PR", "FCPX"],
    imageUrl: [
      "/attached_assets/Rec_709_LUTS.jpg",
      "/static-assets/LUT.jpg",
      "/static-assets/LUTS.jpg"
    ]
  },
  {
    id: 3,
    name: "Blackmagic Pocket 4k/6k",
    slug: "sci-fi-luts",
    description: "Give your automotive photography a futuristic sci-fi look with these specialized LUTs. Perfect for concept cars and night shots.",
    price: 3900,
    originalPrice: 7900,
    discount: 50,
    features: [
      "10 futuristic color grading presets",
      "Neon and cyberpunk effects",
      "Compatible with major editing software",
      "Video tutorial included"
    ],
    category: "luts",
    compatibility: ["AE", "PR", "FCPX"],
    imageUrl: [
      "/attached_assets/Blackmagic_Professional_LUTs_cover.jpg",
      "/static-assets/LUT.jpg",
      "/static-assets/LUTS.jpg"
    ]
  },
  {
    id: 4,
    name: "Cinematic Lut Collection",
    slug: "vintage-car-luts",
    description: "Specialized LUTs designed for classic and vintage car photography. Add nostalgic film looks to your automotive shots.",
    price: 3900,
    originalPrice: 7900,
    discount: 50,
    features: [
      "12 vintage film emulation LUTs",
      "Perfect for classic car photography",
      "Period-appropriate color profiles",
      "Works with JPG and RAW images"
    ],
    category: "luts",
    compatibility: ["AE", "PR", "FCPX"],
    imageUrl: [
      "/attached_assets/Cinematic_Lut_Collection.jpg",
      "/static-assets/LUT.jpg",
      "/static-assets/LUTS.jpg"
    ]
  }
];

export default products;
