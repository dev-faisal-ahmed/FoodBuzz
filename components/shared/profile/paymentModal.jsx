'use client';
import { useContext, useState } from 'react';
import { Modal } from '../modal';
import { modalContext } from '@/context_provider/modalProvider';
import { Input } from '../input/input';
import { textBox } from '@/helper/uiHelper';
import { cartContext, cartActions } from '@/context_provider/cartProvider';
import { postReq } from '@/helper/apiReq';
import { toast } from 'react-hot-toast';
import { toastConfig } from '@/helper/toastConfig';
import { Loader } from '../loader/loader';
import { useRouter } from 'next/navigation';
import { useGetUser } from '@/hooks/useGetUser';
import { getUserInfoLocal } from '@/helper/localStorage';

export function PaymentModal() {
  const { email } = getUserInfoLocal();
  const { openPaymentModal, onClosePaymentModal } = useContext(modalContext);
  const { cartData, updateCart } = useContext(cartContext);
  const [loading, setLoading] = useState(false);
  const { refetch } = useGetUser(email);

  function handlePayment(e) {
    setLoading(true);
    e.preventDefault();
    const address = e.target.address.value;
    const toastId = toast.loading('Ordering Your Food....');

    fetch(
      '/api/order-food',
      postReq({ address, cartData, email, pickUpAddress: address })
    )
      .then((res) => res.json())
      .then((res) => {
        toast.dismiss(toastId);
        setLoading(false);
        if (res.okay) {
          toast.success(res.msg, toastConfig);
          refetch();
        } else toast.error(res.msg);
        onClosePaymentModal();
        updateCart({ type: cartActions.clearAll });
      });
  }

  return (
    <Modal
      title={'Payment'}
      openModal={openPaymentModal}
      onCloseModal={onClosePaymentModal}
      width={'400px'}
    >
      <form onSubmit={handlePayment}>
        <Input
          name={'address'}
          title={'Address'}
          placeholder={'Input Pickup Location'}
          type={'text'}
          required={true}
        />
        <div className='mt-3 border-y py-3'>
          {textBox('Sub Total', '$ ' + cartData.subTotal)}
          {textBox('Delivery Charge', '$ ' + 50)}
        </div>
        {textBox('Total', `$ ${cartData.subTotal + 50}`, true)}
        {loading ? (
          <div className={`mt-8 w-full px-5 bg-gray-500`}>
            <Loader className={'mx-auto w-fit'} />
          </div>
        ) : (
          <button
            className={`mt-8 w-full px-5 py-2 text-white hover:text-green-600 bg-green-600 hover:bg-transparent border-2 border-green-600 rounded-lg font-semibold animation`}
          >
            Order
          </button>
        )}
      </form>
    </Modal>
  );
}
