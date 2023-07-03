'use client';
import { useContext } from 'react';
import { Modal } from '../modal';
import { modalContext } from '@/context_provider/modalProvider';
import { CartCard } from './cartCard';
import { cartActions, cartContext } from '@/context_provider/cartProvider';
import { BsFillCartPlusFill } from 'react-icons/bs';

export function CartModal() {
  const { openCart, onCloseCart } = useContext(modalContext);
  const { cartData, updateCart } = useContext(cartContext);

  // ui functions
  function textBox(key, value, bold = false) {
    return (
      <p className={`center-y justify-between gap-5 ${bold ? 'mt-3' : ''}`}>
        <span className={`${bold ? 'font-semibold' : 'text-gray-500'} text-lg`}>
          {key}
        </span>
        <span className={`${bold ? 'font-semibold' : 'text-gray-500'} text-lg`}>
          {value}
        </span>
      </p>
    );
  }

  // clear all
  const clearAll = () => updateCart({ type: cartActions.clearAll });

  return (
    <Modal
      openModal={openCart}
      onCloseModal={onCloseCart}
      title={'Cart'}
      width={'450px'}
    >
      {cartData.cartList.length === 0 ? (
        <div className='center-y gap-2 mx-auto w-fit'>
          <BsFillCartPlusFill size={20} />
          <h2 className='text-gray-500 font-semibold'>
            Please add something to your cart first
          </h2>
        </div>
      ) : (
        <>
          <div className='flex flex-col gap-5'>
            {cartData?.cartList?.map((data) => (
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
          <div className='mt-3 border-b pb-3'>
            {textBox('Sub Total', '$ ' + cartData.subTotal)}
            {textBox('Vat 5%', '$ ' + (cartData.subTotal * 0.05).toFixed(2))}
            {textBox('Delivery Charge', '$ ' + 50)}
          </div>
          {textBox(
            'Total',
            `$ ${cartData.subTotal + cartData.subTotal * 0.05 + 50}`,
            true
          )}
          <div className='mt-5 center-y justify-center gap-5'>
            <button
              onClick={clearAll}
              className={`px-5 py-2 text-white hover:text-red-600 bg-red-600 hover:bg-transparent border-2 border-red-600 rounded-lg font-semibold animation`}
            >
              Clear All
            </button>
            <button
              className={`px-5 py-2 text-white hover:text-green-600 bg-green-600 hover:bg-transparent border-2 border-green-600 rounded-lg font-semibold animation`}
            >
              Order
            </button>
          </div>
        </>
      )}
    </Modal>
  );
}
