'use client';
import { modalContext } from '@/context_provider/modalProvider';
import Image from 'next/image';
import { useContext } from 'react';

export function FoodRow({
  foodId,
  foodName,
  sold,
  category,
  price,
  imageUrl,
  index,
}) {
  const size = 40;
  const { onOpenEditFoodModal, setModalFoodId } = useContext(modalContext);

  function onOpenFoodModal() {
    setModalFoodId(foodId);
    onOpenEditFoodModal();
  }
  return (
    <tr className={`${index % 2 !== 0 && 'bg-gray-200'}`}>
      <td className='py-4 px-3 text-blue-500 font-semibold whitespace-nowrap'>
        #{foodId}
      </td>
      <td className='py-4 px-3 whitespace-nowrap'>
        <Image
          className='rounded-md'
          style={{
            width: size + 'px',
            height: size + 'px',
            objectFit: 'cover',
          }}
          src={imageUrl}
          width={size}
          height={size}
          alt=''
        />
      </td>
      <td className='py-4 px-3 whitespace-nowrap'>{foodName}</td>
      <td className='py-4 px-3 whitespace-nowrap text-center'>{price}</td>
      <td className='py-4 px-3 whitespace-nowrap'> {category}</td>
      <td className='py-4 px-3 text-center whitespace-nowrap'>{sold}</td>
      <td className='py-4 px-3 text-center whitespace-nowrap'>
        <button
          onClick={onOpenFoodModal}
          className='button bg-green-500 text-white rounded-md hover:scale-110'
        >
          Edit
        </button>
      </td>
    </tr>
  );
}
