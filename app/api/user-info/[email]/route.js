import { orderCollection, userCollection } from '@/lib/mongoClient';
import { NextResponse } from 'next/server';

export async function GET(request, context) {
  const email = context.params.email;
  const user = await userCollection.findOne({ email }, 'email address');
  if (!user) return NextResponse.json({ okay: false, msg: 'User not found' });

  // collection order information
  const ordersCursor = orderCollection.find({ email });
  const orders = await ordersCursor.toArray();

  const userInfo = {
    address: user.address,
    totalCost: user.totalCost,
    totalOrders: user.totalOrders,
    orders,
  };

  return NextResponse.json({ okay: true, data: userInfo });
}
