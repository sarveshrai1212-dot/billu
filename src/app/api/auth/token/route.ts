import { NextRequest, NextResponse } from 'next/server';
import { generateToken } from '@/server/jwt';

export async function POST(req: NextRequest) {
  try {
    const { userId, expiresIn } = await req.json();
    const token = generateToken({ userId, expiresIn });
    return NextResponse.json({ token });
  } catch (error) {
    const errMsg = error instanceof Error ? error.message : 'Failed to generate token';
    return NextResponse.json({ message: errMsg }, { status: 500 });
  }
}
