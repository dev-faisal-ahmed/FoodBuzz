import { userCollection } from '@/lib/mongoClient';
import { NextResponse } from 'next/server';

export async function POST(request) {
  try {
    const { email, address, imageUrl } = await request.json();
    const updated = await userCollection.updateOne(
      { email: email },
      { $set: { address, imageUrl } },
      { upsert: true }
    );
    if (!updated.acknowledged)
      return NextResponse.json({
        okay: false,
        msg: 'User Info Is Not Updated',
      });

    return NextResponse.json({ okay: true, msg: 'User Info Updated' });
  } catch (err) {
    console.log(err);
    return NextResponse.json({ okay: false, msg: 'Something went wrong' });
  }
}
