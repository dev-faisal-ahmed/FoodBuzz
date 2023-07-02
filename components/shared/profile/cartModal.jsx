'use client';

import { useContext } from 'react';
import { Modal } from '../modal';
import { modalContext } from '@/context_provider/modalProvider';
import { CartCard } from './cartCard';
import { cartContext } from '@/context_provider/cartProvider';

export function CartModal() {
  const { openCart, onCloseCart } = useContext(modalContext);
  const { cartData } = useContext(cartContext);

  return (
    <Modal
      openModal={openCart}
      onCloseModal={onCloseCart}
      title={'Cart'}
      width={'450px'}
    >
      <div className='flex flex-col gap-5'>
        {cartData.map((data) => (
          <CartCard
            key={data.id}
            id={data.id}
            image={data.image}
            price={data.price}
            title={data.title}
            count={data.count}
          />
        ))}
      </div>
    </Modal>
  );
}
