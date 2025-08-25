import { NextRequest, NextResponse } from 'next/server';
import { storage } from '@/server/storage';
import { insertReviewSchema } from '@/shared/schema';

export async function GET() {
  try {
    const reviews = await storage.getAllReviews();
    return NextResponse.json(reviews);
  } catch {
    return NextResponse.json({ message: 'Failed to fetch reviews' }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    if (body.review && !body.comment) {
      body.comment = body.review;
    }
    const validatedData = insertReviewSchema.parse(body);
    const review = await storage.createReview(validatedData);
    return NextResponse.json(review);
  } catch {
    return NextResponse.json({ message: 'Failed to create review' }, { status: 400 });
  }
}
