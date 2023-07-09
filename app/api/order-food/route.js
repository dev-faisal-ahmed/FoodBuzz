import { getDateObject, idGenerator } from '@/helper/serverHelper';
import { orderCollection, userCollection } from '@/lib/mongoClient';
import { NextResponse } from 'next/server';

export async function POST(request) {
  const { email, cartData, pickUpAddress } = await request.json();
  const cartList = cartData.cartList;
  let orderTitle = '';
  const date = new Date();
  const dateObject = getDateObject(date);

  cartList.forEach((cart) => {
    orderTitle += `${cart.count} ${cart.title} `;
  });

  const orderId = idGenerator(date.getTime());

  const orderInfo = {
    orderTitle,
    price: cartData.subTotal + 50,
    status: 'pending',
    email,
    orderId,
    pickUpAddress,
    date: dateObject.date,
    time: dateObject.time,
  };

  const docStatus = await orderCollection.insertOne(orderInfo);
  if (!docStatus.acknowledged)
    return NextResponse.json({
      okay: false,
      msg: 'Can not take your order at this moment',
    });

  // updating users database to track order count
  const userInfo = await userCollection.findOne({ email });
  let totalOrders = userInfo.totalOrders;
  let totalCost = userInfo.totalCost;

  if (!totalCost) totalCost = 0;
  if (!totalOrders) totalOrders = 0;

  totalCost += cartData.subTotal + 50;
  totalOrders += 1;

  const userInfoUpdateStatus = userCollection.updateOne(
    { email },
    { $set: { totalCost, totalOrders } },
    { upsert: true }
  );

  if (!userInfoUpdateStatus)
    return NextResponse.json({
      okay: true,
      msg: 'Order taken 😊, but stat can not be updated😥',
    });

  return NextResponse.json({
    okay: true,
    msg: `Your order is taken🔥`,
  });
}
