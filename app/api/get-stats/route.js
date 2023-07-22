import { orderCollection } from '@/lib/mongoClient';
import { NextResponse } from 'next/server';

export async function GET() {
  const orderCursor = orderCollection.find({});
  const allOrders = await orderCursor.toArray();
  const date = new Date();
  // previous months orders
  const previousMonthOrders = allOrders.filter(
    (order) => order.date?.getMonth() === date.getMonth() - 1
  );
  // current months orders
  const currentMonthOrders = allOrders.filter(
    (order) => order.date?.getMonth() === date.getMonth()
  );
  // completed orders
  const completedOrders = allOrders.filter(
    (order) => order.status === 'delivered'
  ).length;
  // total revenue
  let totalRevenue = 0;
  for (let i = 0; i < allOrders.length; i++) {
    totalRevenue += allOrders[i].price;
  }
  // total revenue for this month
  let currentMonthRevenue = 0;
  for (let i = 0; i < currentMonthOrders.length; i++) {
    currentMonthRevenue += currentMonthOrders[i].price;
  }
  // total revenue for previous month
  let previousMonthRevenue = 0;
  for (let i = 0; i < previousMonthOrders.length; i++) {
    previousMonthRevenue += previousMonthOrders[i].price;
  }

  return NextResponse.json({
    okay: true,
    data: {
      totalOrders: allOrders.length,
      currentMonthOrders: currentMonthOrders.length,
      previousMonthOrders: previousMonthOrders.length,
      completedOrders,
      totalRevenue,
      currentMonthRevenue,
      previousMonthRevenue,
    },
  });
}
