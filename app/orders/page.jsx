'use client';

import { OrderTable } from '@/components/order_page/orderTable';
import { getUserInfoLocal } from '@/helper/localStorage';
import { useGetUser } from '@/hooks/useGetUser';

export default function OrderPage() {
  const { email } = getUserInfoLocal();
  const { userInfo } = useGetUser(email);

  return (
    <section className='mt-5 md:mt-0'>
      <div className='bg-white shadow-md p-5 rounded-lg px-4'>
        {userInfo?.orders ? (
          <OrderTable orders={userInfo.orders} />
        ) : (
          <h1>No orders found</h1>
        )}
      </div>
    </section>
  );
}
