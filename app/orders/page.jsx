'use client';

import { OrderTable } from '@/components/order_page/orderTable';
import { auth } from '@/firebase/firebase.init';
import { useGetUser } from '@/hooks/useGetUser';
import { useAuthState } from 'react-firebase-hooks/auth';

export default function OrderPage() {
  const [user] = useAuthState(auth);
  const { userInfo } = useGetUser(user?.email);

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
