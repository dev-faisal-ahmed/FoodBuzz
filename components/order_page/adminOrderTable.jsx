import { AdminOrderRow } from './adminOrderRow';

export function AdminOrderTable({ orders }) {
  return (
    <>
      <table className='w-full bg-white'>
        <thead className='bg-gray-200 rounded-lg'>
          <tr>
            <th className='w-fit p-3 whitespace-nowrap'>Mark</th>
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
            <AdminOrderRow
              index={index}
              key={index}
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
    </>
  );
}
