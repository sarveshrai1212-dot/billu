import type { User, Product, Review, Subscriber } from "@/shared/schema";

export interface IStorage {
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  createUser(user: any): Promise<User>;
  getAllProducts(): Promise<Product[]>;
  getProductById(id: number): Promise<Product | undefined>;
  getProductBySlug(slug: string): Promise<Product | undefined>;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  createProduct(product: any): Promise<Product>;
  getAllReviews(): Promise<Review[]>;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  createReview(review: any): Promise<Review>;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  createSubscriber(subscriber: any): Promise<Subscriber>;
}

class MemStorage implements IStorage {
  private users: Map<number, User> = new Map();
  private products: Map<number, Product> = new Map();
  private reviews: Map<number, Review> = new Map();
  private subscribers: Map<number, Subscriber> = new Map();
  private userCurrentId = 1;
  private productCurrentId = 1;
  private reviewCurrentId = 1;
  private subscriberCurrentId = 1;

  constructor() {
    this.initializeProducts();
  }
  private initializeProducts() {
    const dummyProducts: Omit<Product, 'id'>[] = [
      {
        name: "Color Grading LUTs",
        slug: "color-grading-luts",
        description: "Professional color grading LUTs for car photography. Transform your images with just one click.",
        price: 5900,
        originalPrice: 11900,
        discount: 50,
        features: [
          "20+ unique LUTs for different lighting conditions",
          "Compatible with Adobe Premiere Pro, After Effects, and Final Cut Pro X",
          "Installation guide included",
          "Free updates for life"
        ],
        category: "luts",
        compatibility: ["AE", "PR", "FCPX"],
        imageUrl: ["https://i.imgur.com/xyz123.jpg"]
      },
      {
        name: "Color Grading LUTs Volume 2",
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
        imageUrl: ["https://i.imgur.com/abc456.jpg"]
      },
      {
        name: "Sci-Fi LUTs",
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
        imageUrl: ["https://i.imgur.com/def789.jpg"]
      },
      {
        name: "Vintage Car LUTs",
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
        imageUrl: ["https://i.imgur.com/ghi012.jpg"]
      }
    ];
    dummyProducts.forEach(product => {
      const id = this.productCurrentId++;
      this.products.set(id, { ...product, id });
    });
  }
  async getUser(id: number) { return this.users.get(id); }
  async getUserByUsername(username: string) { return Array.from(this.users.values()).find(u => u.username === username); }
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  async createUser(insertUser: any) { const id = this.userCurrentId++; const user: User = { ...insertUser, id }; this.users.set(id, user); return user; }
  async getAllProducts() { return Array.from(this.products.values()); }
  async getProductById(id: number) { return this.products.get(id); }
  async getProductBySlug(slug: string) { return Array.from(this.products.values()).find(p => p.slug === slug); }
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  async createProduct(insertProduct: any) { const id = this.productCurrentId++; const product: Product = { ...insertProduct, id, originalPrice: insertProduct.originalPrice ?? null, discount: insertProduct.discount ?? null, features: insertProduct.features ?? null, compatibility: insertProduct.compatibility ?? null, }; this.products.set(id, product); return product; }
  async getAllReviews() { return Array.from(this.reviews.values()); }
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  async createReview(insertReview: any) { const id = this.reviewCurrentId++; const review: Review = { ...insertReview, id, createdAt: new Date() }; this.reviews.set(id, review); return review; }
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  async createSubscriber(insertSubscriber: any) { const existing = Array.from(this.subscribers.values()).find(s => s.email === insertSubscriber.email); if (existing) throw new Error("Email already subscribed"); const id = this.subscriberCurrentId++; const subscriber: Subscriber = { ...insertSubscriber, id, createdAt: new Date() }; this.subscribers.set(id, subscriber); return subscriber; }
}

export const storage = new MemStorage();
