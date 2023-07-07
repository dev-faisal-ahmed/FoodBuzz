'use client';
import { IoFastFoodSharp } from 'react-icons/io5';

export function OrderCard({ orderTitle, price, status }) {
  return (
    <div className='p-5 border rounded-xl grid grid-cols-3 gap-5 bg-white'>
      <div className='center-xy bg-primary-50 p-5 rounded-xl text-primary-600'>
        <IoFastFoodSharp size={40} />
      </div>
      <div className='col-span-2'>
        <h1 className='w-full truncate font-semibold'>{orderTitle}</h1>

        {/* for pending */}
        {status === 'pending' && (
          <div className='text-gray-500 center-y gap-2'>
            <p className='w-2 h-2 block rounded-full bg-orange-400 mt-1'>
              &nbsp;
            </p>
            Pending
          </div>
        )}

        {/* for delivered */}
        {status === 'delivered' && (
          <div className='text-gray-500 center-y gap-2'>
            <p className='w-2 h-2 block rounded-full bg-green-400 mt-1'>
              &nbsp;
            </p>
            Delivered
          </div>
        )}

        {price && (
          <h2 className='text-xl font-semibold mt-2 text-red-600'>
            $ {price?.toLocaleString()}
          </h2>
        )}
      </div>
    </div>
  );
}
