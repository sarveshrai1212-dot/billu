import { pgTable, text, serial, integer, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
export const users = pgTable("users", {
    id: serial("id").primaryKey(),
    username: text("username").notNull().unique(),
    password: text("password").notNull(),
});
export const insertUserSchema = createInsertSchema(users).pick({
    username: true,
    password: true,
});
export const products = pgTable("products", {
    id: serial("id").primaryKey(),
    name: text("name").notNull(),
    slug: text("slug").notNull().unique(),
    description: text("description").notNull(),
    price: integer("price").notNull(),
    originalPrice: integer("original_price"),
    discount: integer("discount"),
    features: text("features").array(),
    category: text("category").notNull(),
    compatibility: text("compatibility").array(),
    imageUrl: text("image_url").array().notNull(),
});
export const insertProductSchema = createInsertSchema(products).omit({
    id: true,
});
export const reviews = pgTable("reviews", {
    id: serial("id").primaryKey(),
    name: text("name").notNull(),
    email: text("email").notNull(),
    comment: text("comment").notNull(),
    rating: integer("rating").notNull(),
    createdAt: timestamp("created_at").defaultNow(),
});
export const insertReviewSchema = createInsertSchema(reviews).omit({
    id: true,
    createdAt: true,
});
export const subscribers = pgTable("subscribers", {
    id: serial("id").primaryKey(),
    email: text("email").notNull().unique(),
    createdAt: timestamp("created_at").defaultNow(),
});
export const insertSubscriberSchema = createInsertSchema(subscribers).omit({
    id: true,
    createdAt: true,
});
