'use client';

import { AdminOrderTable } from '@/components/order_page/adminOrderTable';
import { OrderTable } from '@/components/order_page/orderTable';
import { getUserInfoLocal } from '@/helper/localStorage';
import { useGetUser } from '@/hooks/useGetUser';

export default function OrderPage() {
  const { email, role } = getUserInfoLocal();
  const { userInfo } = useGetUser(email);

  return (
    <section className='mt-5 md:mt-0'>
      <h1 className='text-xl font-semibold mb-5'>All Orders</h1>
      <div className='overflow-auto pb-1'>
        {role === 'admin' ? (
          <AdminOrderTable orders={userInfo?.orders} />
        ) : (
          <>
            {userInfo?.orders ? (
              <OrderTable orders={userInfo.orders} />
            ) : (
              <h1>No orders found</h1>
            )}
          </>
        )}
      </div>
    </section>
  );
}
