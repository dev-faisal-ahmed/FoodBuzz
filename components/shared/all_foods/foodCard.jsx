'use client';

import { useContext } from 'react';
import { cartActions, cartContext } from '@/context_provider/cartProvider';
import { isCardAdded } from '@/helper/cartHelper';

export function FoodCard({ image, title, price, id }) {
  const { cartData, updateCart } = useContext(cartContext);
  const size = 200;

  const addFood = () =>
    updateCart({
      type: cartActions.add,
      payload: { data: { id, title, image, price } },
    });

  const removeFood = () =>
    updateCart({ type: cartActions.remove, payload: { id } });

  return (
    <div className='relative bg-primary-500 text-white p-5 rounded-2xl mt-24'>
      <div
        className='border-[5px] border-primary-50 cursor-pointer rounded-full overflow-hidden'
        style={{
          position: 'absolute',
          top: `-${size / 2}px`,
          left: '50%',
          transform: 'translateX(-50%)',
        }}
      >
        <p
          className='hover:scale-110 animation'
          style={{
            backgroundImage: `url(${image})`,
            width: size + 'px',
            height: size + 'px',
            backgroundPosition: 'center',
            backgroundSize: 'cover',
          }}
        ></p>
      </div>
      <h3 className='mt-32 text-lg font-semibold mb-2 w-full truncate text-gray-200'>
        {title}
      </h3>
      <div className='flex items-center justify-between'>
        <h2 className='text-2xl font-semibold text-orange-400'>${price}</h2>
        {isCardAdded(cartData.cartList, id) ? (
          <button
            onClick={removeFood}
            className='px-5 py-2 border border-white rounded-lg hover:text-orange-400 hover:border-orange-400 animation'
          >
            - Remove
          </button>
        ) : (
          <button
            onClick={addFood}
            className='px-5 py-2 border border-white rounded-lg hover:text-orange-400 hover:border-orange-400 animation'
          >
            + Add
          </button>
        )}
      </div>
    </div>
  );
}
