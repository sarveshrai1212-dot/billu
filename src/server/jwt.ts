import jwt from 'jsonwebtoken';
import type { SignOptions } from 'jsonwebtoken';
import type { StringValue } from 'ms';

type GenerateTokenParams = {
  userId: string;
  expiresIn?: StringValue | number;
};

export function generateToken({ userId, expiresIn = '1h' }: GenerateTokenParams): string {
  if (!process.env.JWT_SECRET) throw new Error('JWT_SECRET not set');
  const options: SignOptions = {};
  if (expiresIn !== undefined && expiresIn !== null) {
    options.expiresIn = expiresIn as StringValue | number;
  }
  return jwt.sign({ userId }, process.env.JWT_SECRET, options);
}

export function verifyToken(token: string): unknown {
  if (!process.env.JWT_SECRET) throw new Error('JWT_SECRET not set');
  return jwt.verify(token, process.env.JWT_SECRET);
}
