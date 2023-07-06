'use client';
import { Cart } from './cart';
import { BiSolidEditAlt } from 'react-icons/bi';
import { FaBox, FaWallet } from 'react-icons/fa';
import Link from 'next/link';
import { OrderCard } from '../orderCard';
import { ProfileIcon } from '../profileIcon';
import { useContext } from 'react';
import { modalContext } from '@/context_provider/modalProvider';
import { useGetUser } from '@/hooks/useGetUser';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '@/firebase/firebase.init';
import { Loader } from '../loader/loader';
import { iconBox } from '@/helper/uiHelper';

export function Profile() {
  const [user, loading] = useAuthState(auth);
  const { onOpenProfileModal } = useContext(modalContext);
  const { userInfo } = useGetUser(user?.email);

  if (loading) {
    return <Loader />;
  }

  console.log(userInfo?.orders);

  return (
    <section className='px-5 pb-8 h-full grid grid-rows-[auto_auto_1fr]'>
      {/* title && cart */}
      <div className='flex items-center justify-between'>
        <h1 className='text-xl truncate font-semibold'>My Profile</h1>
        <Cart />
      </div>
      {/* profile */}
      <div className='p-5 border mt-8 rounded-xl relative'>
        <div
          onClick={onOpenProfileModal}
          className='absolute top-5 right-5 rounded-md bg-primary-50 p-2 text-primary-700 cursor-pointer hover:scale-110 animation shadow-md'
        >
          <BiSolidEditAlt size={20} />
        </div>
        <ProfileIcon
          image={user?.photoURL}
          size={150}
          margin={'0 auto'}
          big={true}
        />
        <h1 className='mt-5 font-semibold text-center text-xl'>
          {user?.displayName}
        </h1>
        <p className='text-sm text-gray-500 text-center mt-2'>
          {userInfo?.address}
        </p>

        <div className='p-3 bg-primary-50 rounded-xl mt-8 grid grid-cols-2'>
          {userInfo ? (
            <>
              {iconBox({
                icon: <FaBox size={20} />,
                key: 'Orders',
                value: userInfo?.totalOrders || 0,
              })}
              {iconBox({
                icon: <FaWallet size={20} />,
                key: 'Spent',
                value: userInfo?.totalCost || 0,
              })}
            </>
          ) : (
            <h1 className='text-center col-span-2 font-semibold'>
              Please Login
            </h1>
          )}
        </div>
      </div>
      {/* orders */}

      <div className='mt-8 h-full overflow-y-auto relative'>
        {userInfo?.orders?.length !== 0 && (
          <div className='flex items-center justify-between pb-5 sticky top-0 bg-white'>
            {/* title */}
            <h1 className='text-xl truncate font-semibold'>Recent Orders</h1>
            <Link className='text-blue-600 font-semibold' href={'/orders'}>
              See all
            </Link>
          </div>
        )}

        {/* oder list */}
        <div className='flex flex-col gap-5'>
          {userInfo?.orders?.length !== 0 ? (
            <>
              {userInfo?.orders.map((order, index) => (
                <OrderCard
                  key={index}
                  orderTitle={order.orderTitle}
                  price={order.price}
                  status={order.status}
                />
              ))}
            </>
          ) : (
            <h1 className='font-semibold text-center'>{`You haven't ordered anything yet! 😥`}</h1>
          )}
        </div>
      </div>
    </section>
  );
}
