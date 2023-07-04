import { userCollection } from '@/lib/mongoClient';
import { NextResponse } from 'next/server';

export async function POST(request) {
  const { email, address } = await request.json();
  const updated = await userCollection.updateOne(
    { email: email },
    { $set: { address } },
    { upsert: true }
  );
  if (!updated.acknowledged)
    return NextResponse.json({
      okay: false,
      msg: 'User Info Is Not Updated',
    });

  return NextResponse.json({ okay: true, msg: 'User Info Updated' });
}
