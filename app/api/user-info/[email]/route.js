import { userCollection } from '@/lib/mongoClient';
import { NextResponse } from 'next/server';

export async function GET(request, context) {
  const email = context.params.email;
  const user = await userCollection.findOne({ email }, 'email address');
  if (!user) return NextResponse.json({ okay: false, msg: 'User not found' });
  const userInfo = {
    address: user.address,
  };

  return NextResponse.json({ okay: true, data: userInfo });
}
