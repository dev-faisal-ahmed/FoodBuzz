import { OrderRow } from './orderRow';

export function OrderTable({ orders }) {
  return (
    <table className='bg-white w-full'>
      <thead className='bg-gray-200'>
        <tr>
          <th className='text-left p-3 whitespace-nowrap'>Order ID</th>
          <th className='text-left p-3 whitespace-nowrap'>Orders</th>
          <th className='p-3 whitespace-nowrap'>Status</th>
          <th className='text-left p-3 whitespace-nowrap'>Address</th>
          <th className='text-left p-3 whitespace-nowrap'>Price</th>
          <th className='p-3 whitespace-nowrap'>Time</th>
        </tr>
      </thead>
      <tbody>
        {orders?.map((order, index) => (
          <OrderRow
            key={index}
            index={index}
            orderId={order.orderId}
            orderTitle={order.orderTitle}
            status={order.status}
            pickUpAddress={order.pickUpAddress}
            price={order.price}
            date={order.dateFormate}
          />
        ))}
      </tbody>
    </table>
  );
}
