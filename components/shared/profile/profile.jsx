'use client';
import { Cart } from './cart';
import { BiSolidEditAlt } from 'react-icons/bi';
import { FaBox, FaWallet } from 'react-icons/fa';
import { OrderCard } from '../orderCard';
import { ProfileIcon } from '../profileIcon';
import { useContext } from 'react';
import { modalContext } from '@/context_provider/modalProvider';
import { useGetUser } from '@/hooks/useGetUser';
import { iconBox } from '@/helper/uiHelper';
import { getUserInfoLocal } from '@/helper/localStorage';
import Link from 'next/link';

export function Profile({ mobileDevice }) {
  const { email, image, name, role } = getUserInfoLocal();
  const { onOpenProfileModal } = useContext(modalContext);
  const { userInfo } = useGetUser(email);

  return (
    <section className={`${mobileDevice ? 'py-3' : 'px-5'}`}>
      {/* title && cart */}
      {!mobileDevice && (
        <div className='flex items-center justify-between'>
          <h1 className='text-xl truncate font-semibold'>My Profile</h1>
          <Cart />
        </div>
      )}

      {/* profile */}
      <div
        className={`p-5 border ${
          mobileDevice ? 'm-0' : 'mt-8'
        } rounded-xl relative bg-white`}
      >
        <div
          onClick={onOpenProfileModal}
          className='absolute top-5 right-5 rounded-md bg-primary-50 p-2 text-primary-700 cursor-pointer hover:scale-110 animation shadow-md'
        >
          <BiSolidEditAlt size={20} />
        </div>
        <ProfileIcon image={image} size={150} margin={'0 auto'} big={true} />
        <h1 className='mt-5 font-semibold text-center text-xl'>{name}</h1>
        <p className='text-sm text-gray-500 text-center mt-2'>
          {userInfo?.address}
        </p>

        {role !== 'admin' && (
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
        )}
      </div>
      {/* orders */}

      <div className='mt-8'>
        {userInfo?.orders?.length !== 0 && (
          <div
            className={`flex items-center justify-between pb-5 border-b mb-5 ${
              mobileDevice ? 'bg-transparent' : 'bg-white'
            }`}
          >
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
