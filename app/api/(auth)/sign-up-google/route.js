import { userCollection } from '@/lib/mongoClient';
import { NextResponse } from 'next/server';

export async function POST(request) {
  const user = await request.json();

  // checking if user has already created or not
  const userInfo = await userCollection.findOne({ email: user.email });
  if (userInfo)
    return NextResponse.json({
      okay: true,
      data: { role: userInfo.role },
      msg: `Logged in as ${user.name}`,
    });

  const userInsertStatus = await userCollection.insertOne(user);
  if (!userInsertStatus.acknowledged)
    return NextResponse.json({ okay: false, msg: 'User can not be created' });

  return NextResponse.json({ okay: true, msg: 'Account Created 🔥' });
}
