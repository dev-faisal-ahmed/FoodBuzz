'use client';
import { useContext } from 'react';
import { Modal } from '../modal';
import { modalContext } from '@/context_provider/modalProvider';
import { CartCard } from './cartCard';
import { cartActions, cartContext } from '@/context_provider/cartProvider';
import { BsFillCartPlusFill } from 'react-icons/bs';
import { textBox } from '@/helper/uiHelper';
import { useRouter } from 'next/navigation';
import { toast } from 'react-hot-toast';
import { toastConfig } from '@/helper/toastConfig';
import { getUserInfoLocal } from '@/helper/localStorage';

export function CartModal() {
  const { openCart, onCloseCart, onOpenPaymentModal } =
    useContext(modalContext);
  const { cartData, updateCart } = useContext(cartContext);
  const router = useRouter();
  const { email } = getUserInfoLocal();
  // clear all
  function clearAll() {
    updateCart({ type: cartActions.clearAll });
    onCloseCart();
  }

  function onClickNext() {
    if (!email) {
      toast.error('Please log in first', toastConfig);
      onCloseCart();
      return router.push('/login');
    }

    onOpenPaymentModal();
    onCloseCart();
  }

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
          <h2 className='text-gray-500 font-semibold'>Nothing to show</h2>
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

            {textBox('Delivery Charge', '$ ' + 50)}
          </div>
          {textBox('Total', `$ ${cartData.subTotal + 50}`, true)}

          <div className='mt-5 center-y justify-end gap-5'>
            <div
              onClick={clearAll}
              className={`px-5 py-2 text-white hover:text-red-600 bg-red-600 hover:bg-transparent border-2 border-red-600 rounded-lg font-semibold animation`}
            >
              Clear All
            </div>
            <button
              onClick={onClickNext}
              className={`px-5 py-2 text-white hover:text-green-600 bg-green-600 hover:bg-transparent border-2 border-green-600 rounded-lg font-semibold animation`}
            >
              Next
            </button>
          </div>
        </>
      )}
    </Modal>
  );
}
