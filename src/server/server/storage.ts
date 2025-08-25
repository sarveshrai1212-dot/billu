console.log('Loading storage.ts...');
import type { User, Product, Review, Subscriber } from "../../shared/schema.js";

// Modify the interface with any CRUD methods
// you might need
export interface IStorage {
  // User methods
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  createUser(user: any): Promise<User>;
  
  // Product methods
  getAllProducts(): Promise<Product[]>;
  getProductById(id: number): Promise<Product | undefined>;
  getProductBySlug(slug: string): Promise<Product | undefined>;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  createProduct(product: any): Promise<Product>;
  
  // Review methods
  getAllReviews(): Promise<Review[]>;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  createReview(review: any): Promise<Review>;
  
  // Subscriber methods
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  createSubscriber(subscriber: any): Promise<Subscriber>;
}

export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private products: Map<number, Product>;
  private reviews: Map<number, Review>;
  private subscribers: Map<number, Subscriber>;
  
  private userCurrentId: number;
  private productCurrentId: number;
  private reviewCurrentId: number;
  private subscriberCurrentId: number;

  constructor() {
    this.users = new Map();
    this.products = new Map();
    this.reviews = new Map();
    this.subscribers = new Map();
    
    this.userCurrentId = 1;
    this.productCurrentId = 1;
    this.reviewCurrentId = 1;
    this.subscriberCurrentId = 1;
    
    // Initialize with dummy products
    this.initializeProducts();
  }
  
  private initializeProducts() {
    // Create sample products
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
        imageUrl: ["https://i.imgur.com/xyz123.jpg"] // Placeholder URL
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
        imageUrl: ["https://i.imgur.com/abc456.jpg"] // Placeholder URL
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
        imageUrl: ["https://i.imgur.com/def789.jpg"] // Placeholder URL
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
        imageUrl: ["https://i.imgur.com/ghi012.jpg"] // Placeholder URL
      }
    ];
    
    // Add products to the map
    dummyProducts.forEach(product => {
      const id = this.productCurrentId++;
      this.products.set(id, { ...product, id });
    });
  }

  // User methods
  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  async createUser(insertUser: any): Promise<User> {
    const id = this.userCurrentId++;
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }
  
  // Product methods
  async getAllProducts(): Promise<Product[]> {
    return Array.from(this.products.values());
  }
  
  async getProductById(id: number): Promise<Product | undefined> {
    return this.products.get(id);
  }
  
  async getProductBySlug(slug: string): Promise<Product | undefined> {
    return Array.from(this.products.values()).find(
      (product) => product.slug === slug,
    );
  }
  
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  async createProduct(insertProduct: any): Promise<Product> {
    const id = this.productCurrentId++;
    const product: Product = {
      ...insertProduct,
      id,
      originalPrice: insertProduct.originalPrice ?? null,
      discount: insertProduct.discount ?? null,
      features: insertProduct.features ?? null,
      compatibility: insertProduct.compatibility ?? null,
    };
    this.products.set(id, product);
    return product;
  }
  
  // Review methods
  async getAllReviews(): Promise<Review[]> {
    return Array.from(this.reviews.values());
  }
  
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  async createReview(insertReview: any): Promise<Review> {
    const id = this.reviewCurrentId++;
    const review: Review = { 
      ...insertReview, 
      id, 
      createdAt: new Date()
    };
    this.reviews.set(id, review);
    return review;
  }
  
  // Subscriber methods
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  async createSubscriber(insertSubscriber: any): Promise<Subscriber> {
    // Check if email already exists
    const existingSubscriber = Array.from(this.subscribers.values()).find(
      (subscriber) => subscriber.email === insertSubscriber.email
    );
    
    if (existingSubscriber) {
      throw new Error("Email already subscribed");
    }
    
    const id = this.subscriberCurrentId++;
    const subscriber: Subscriber = { 
      ...insertSubscriber, 
      id, 
      createdAt: new Date() 
    };
    this.subscribers.set(id, subscriber);
    return subscriber;
  }
}

export const storage = new MemStorage();
