'use client';
import { orders, user } from '@/data/fakeData';
import { Cart } from './cart';
import { ProfileIcon } from '../profile_icon/profileIcon';
import { BiSolidEditAlt } from 'react-icons/bi';
import { FaBox, FaWallet } from 'react-icons/fa';
import Link from 'next/link';
import { OrderCard } from '../oder/orderCard';

export function Profile() {
  // ui functions
  function iconBox({ icon, value, key }) {
    return (
      <div className='flex gap-3'>
        <div className='w-10 h-10 bg-white rounded-full center-xy text-primary-500'>
          {icon}
        </div>
        <div>
          <p className='text-sm text-gray-600'>{key}</p>
          <h4 className='font-semibold'>{value.toLocaleString()}</h4>
        </div>
      </div>
    );
  }
  return (
    <section className='px-5 pb-8 h-full grid grid-rows-[auto_auto_1fr]'>
      {/* title && cart */}
      <div className='flex items-center justify-between'>
        <h1 className='text-xl truncate font-semibold'>My Profile</h1>
        <Cart />
      </div>

      {/* profile */}
      <div className='p-5 border mt-8 rounded-xl relative'>
        <div className='absolute top-5 right-5 rounded-md bg-primary-50 p-2 text-primary-700 cursor-pointer hover:scale-110 animation shadow-md'>
          <BiSolidEditAlt size={20} />
        </div>
        <ProfileIcon image={user.image} size={'150px'} margin={'0 auto'} />
        <h1 className='mt-5 font-semibold text-center text-xl'>
          {user.firstName + ' ' + user.lastName}
        </h1>
        <p className='text-sm text-gray-500 text-center mt-2'>{user.address}</p>
        <div className='p-3 bg-primary-50 rounded-xl mt-8 grid grid-cols-2'>
          {iconBox({
            icon: <FaBox size={20} />,
            key: 'Orders',
            value: 20,
          })}
          {iconBox({
            icon: <FaWallet size={20} />,
            key: 'Spent',
            value: 20125,
          })}
        </div>
      </div>

      {/* orders */}
      <div className='mt-8 h-full overflow-y-auto relative'>
        <div className='flex items-center justify-between pb-5 sticky top-0 bg-white'>
          {/* title */}
          <h1 className='text-xl truncate font-semibold'>Recent Orders</h1>
          <Link href={'/orders'} className='text-blue-600'>
            See all
          </Link>
        </div>

        {/* oder list */}
        <div className='flex flex-col gap-5'>
          {orders.map((order, index) => (
            <OrderCard
              key={index}
              orderTitle={order.orderTitle}
              price={order.price}
              status={order.status}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
