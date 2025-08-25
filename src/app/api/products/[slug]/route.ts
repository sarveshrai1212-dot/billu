import { NextRequest, NextResponse } from 'next/server';
import { storage } from '@/server/storage';

export async function GET(req: NextRequest) {
  const url = new URL(req.url);
  const slug = url.pathname.split('/').pop();
  try {
    // 'slug' is now extracted from the URL above
    if (!slug) {
      return NextResponse.json({ message: 'Product not found' }, { status: 404 });
    }
    const product = await storage.getProductBySlug(slug);
    if (!product) {
      return NextResponse.json({ message: 'Product not found' }, { status: 404 });
    }
    return NextResponse.json(product);
  } catch {
    return NextResponse.json({ message: 'Failed to fetch product' }, { status: 500 });
  }
}
