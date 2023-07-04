import { PiShoppingBagOpenFill } from 'react-icons/pi';
import { useContext } from 'react';
import { modalContext } from '@/context_provider/modalProvider';
import { cartContext } from '@/context_provider/cartProvider';

export function Cart({ size }) {
  const { onOpenCart } = useContext(modalContext);
  const { cartData } = useContext(cartContext);

  return (
    <div onClick={onOpenCart} className='relative cursor-pointer'>
      <PiShoppingBagOpenFill className='text-primary-600' size={size || 30} />
      {cartData.cartList.length !== 0 && (
        <span
          style={{ top: '-8px', left: '15px' }}
          className='absolute bg-red-600 text-white w-5 h-5 text-xs flex justify-center items-center rounded-full font-semibold'
        >
          {cartData.cartList.length}
        </span>
      )}
    </div>
  );
}
