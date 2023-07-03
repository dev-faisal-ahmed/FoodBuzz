import { HiMiniShoppingCart } from 'react-icons/hi2';
import { useContext } from 'react';
import { modalContext } from '@/context_provider/modalProvider';
import { cartContext } from '@/context_provider/cartProvider';

export function Cart() {
  const { onOpenCart } = useContext(modalContext);
  const { cartData } = useContext(cartContext);

  return (
    <div onClick={onOpenCart} className='relative cursor-pointer'>
      <HiMiniShoppingCart size={30} />
      {cartData.cartList.length !== 0 && (
        <span
          style={{ top: '-12px', left: '20px' }}
          className='absolute bg-red-600 text-white w-6 h-6 text-xs flex justify-center items-center rounded-full font-semibold'
        >
          {cartData.cartList.length}
        </span>
      )}
    </div>
  );
}
