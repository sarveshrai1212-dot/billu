console.log('Loading jwt.ts...');
import jwt from 'jsonwebtoken';
import type { SignOptions } from 'jsonwebtoken';
import type { StringValue } from 'ms';

// Generate JWT token
type GenerateTokenParams = {
  userId: string;
  expiresIn?: StringValue | number;
};

export function generateToken({ userId, expiresIn = '1h' }: GenerateTokenParams): string {
  if (!process.env.JWT_SECRET) throw new Error('JWT_SECRET not set');
  // Ensure expiresIn is a string or number, but not undefined/null
  const options: SignOptions = {};
  if (expiresIn !== undefined && expiresIn !== null) {
    options.expiresIn = expiresIn as StringValue | number;
  }
  return jwt.sign({ userId }, process.env.JWT_SECRET, options);
}

// Verify JWT token
export function verifyToken(token: string): unknown {
  if (!process.env.JWT_SECRET) throw new Error('JWT_SECRET not set');
  return jwt.verify(token, process.env.JWT_SECRET) as unknown;
}
