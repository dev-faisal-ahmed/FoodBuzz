import { orderCollection } from '@/lib/mongoClient';
import { NextResponse } from 'next/server';

export async function GET() {
  const orderCursor = orderCollection.find({});
  const allOrders = await orderCursor.toArray();
  // total orders
  const totalOrders = allOrders.length;
  // pending orders
  const pendingOrder = allOrders.filter(
    (order) => order.status === 'pending'
  ).length;
  // completed orders
  const completedOrders = allOrders.filter(
    (order) => order.status === 'delivered'
  ).length;
  // total revenue
  let totalRevenue = 0;
  for (let i = 0; i < allOrders.length; i++) {
    totalRevenue += allOrders[i].price;
  }

  return NextResponse.json({
    okay: true,
    data: { totalOrders, completedOrders, pendingOrder, totalRevenue },
  });
}
