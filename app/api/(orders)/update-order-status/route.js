import { orderCollection } from '@/lib/mongoClient';
import { NextResponse } from 'next/server';

export async function POST(request) {
  try {
    const { orderId } = await request.json();
    const updateResult = await orderCollection.updateOne(
      { orderId },
      { $set: { status: 'delivered' } },
      { upsert: true }
    );
    if (!updateResult.acknowledged)
      return NextResponse.json({ okay: false, msg: 'Could not delivered' });

    return NextResponse.json({
      okay: true,
      msg: `Product ${orderId} delivered`,
    });
  } catch (err) {
    console.log(err);
    NextResponse.json({ okay: false, msg: 'Something went wrong' });
  }
}
