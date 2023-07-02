import { RiShoppingCartFill } from 'react-icons/ri';

export function Cart() {
  return (
    <div className='relative cursor-pointer'>
      <RiShoppingCartFill size={30} />
      <span
        style={{ top: '-12px', left: '20px' }}
        className='absolute bg-red-600 text-white w-6 h-6 text-xs flex justify-center items-center rounded-full font-semibold'
      >
        9+
      </span>
    </div>
  );
}
