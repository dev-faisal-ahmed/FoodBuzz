'use client';
import { useContext, useState } from 'react';
import { TbTrashXFilled } from 'react-icons/tb';
import { AiOutlinePlus, AiOutlineMinus } from 'react-icons/ai';
import { cartActions, cartContext } from '@/context_provider/cartProvider';

export function CartCard({ title, price, image, id, count }) {
  const { updateCart } = useContext(cartContext);

  const increase = () =>
    updateCart({ type: cartActions.increase, payload: { id } });

  const decrease = () =>
    updateCart({ type: cartActions.decrease, payload: { id } });

  const remove = () =>
    updateCart({ type: cartActions.remove, payload: { id } });

  return (
    <div className='grid grid-cols-5 gap-5 border-b pb-5'>
      {/* image */}
      <div className='col-span-2'>
        <div
          className='w-full rounded-lg'
          style={{
            height: '120px',
            backgroundImage: `url(${image})`,
            backgroundPosition: 'center',
            backgroundSize: 'cover',
          }}
        ></div>
      </div>

      {/* texts */}
      <div className='col-span-2 h-full flex flex-col justify-between'>
        <div>
          <h2 className='px-3 text-lg font-semibold mb-1 text-gray-500'>
            {title}
          </h2>
          <h2 className='px-3 text-xl font-semibold'>$ {price}</h2>
        </div>

        <button
          onClick={remove}
          className='center-y gap-2 font-semibold text-gray-500 hover:text-black hover:bg-gray-300 px-3 py-1 rounded-md animation'
        >
          <TbTrashXFilled size={20} /> Remove
        </button>
      </div>

      {/* counter */}
      <div className='text-center h-full flex flex-col items-center justify-between'>
        <button
          onClick={increase}
          className='text-xl bg-gray-100 p-1 rounded-md'
        >
          <AiOutlinePlus />
        </button>
        <h1 className='text-3xl'>{count}</h1>
        <button
          onClick={decrease}
          className='text-xl bg-gray-100 p-1 rounded-md'
        >
          <AiOutlineMinus />
        </button>
      </div>
    </div>
  );
}
