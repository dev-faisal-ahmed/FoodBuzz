import React from 'react';
import { OrderRow } from './orderRow';

export function OrderTable({ orders }) {
  const gridClass = `w-full grid grid-cols-3 sm:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-5 border-b pb-3 bigger:grid-cols-7`;
  return (
    <div>
      <h1 className='text-xl font-semibold mb-5'>All Orders</h1>
      <div className={gridClass}>
        <div className='font-semibold'>Order Id</div>
        <div className='font-semibold text-center bigger:col-span-2'>
          Orders
        </div>
        <div className='font-semibold text-center'>Status</div>
        <div className='font-semibold hidden sm:block text-center'>Address</div>
        <div className='font-semibold hidden xl:block text-center'>Price</div>
        <div className='font-semibold hidden 2xl:block text-center'>Time</div>
      </div>

      {orders?.map((order, index) => (
        <OrderRow
          key={index}
          orderId={order.orderId}
          orderTitle={order.orderTitle}
          status={order.status}
          pickUpAddress={order.pickUpAddress}
          price={order.price}
          date={order.dateFormate}
          time={order.time}
          className={gridClass}
        />
      ))}
    </div>
  );
}
