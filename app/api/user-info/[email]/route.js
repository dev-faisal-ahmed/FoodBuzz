import { orderCollection, userCollection } from '@/lib/mongoClient';
import { NextResponse } from 'next/server';

export async function GET(_, context) {
  const email = context.params.email;
  const user = await userCollection.findOne({ email }, 'email address');
  if (!user) return NextResponse.json({ okay: false, msg: 'User not found' });

  // collection order information
  const query = user.role === 'admin' ? {} : { email };
  const ordersCursor = orderCollection.find(query);
  let orders = await ordersCursor.toArray();
  if (!orders) orders = [];

  const userInfo = {
    address: user.address,
    totalCost: user.totalCost,
    totalOrders: user.totalOrders,
    role: user.role,
    name: user.name,
    orders: orders.reverse(),
  };

  return NextResponse.json({ okay: true, data: userInfo });
}
