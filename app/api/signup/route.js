import { userCollection } from '@/lib/mongoClient';
import { NextResponse } from 'next/server';

export async function GET() {
  return NextResponse.json({ user: 'Faisal', url: process.env.mongoUri });
}
