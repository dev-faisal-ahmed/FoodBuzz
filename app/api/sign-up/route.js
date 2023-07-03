import { userCollection } from '@/lib/mongoClient';
import { NextResponse } from 'next/server';

export async function POST(request) {
  const user = await request.json();
  const newUser = await userCollection.insertOne(user);
  if (!newUser.acknowledged)
    return NextResponse.json({ okay: false, msg: `Account Can't be created` });

  return NextResponse.json({ okay: true, msg: 'User Account Created' });
}
