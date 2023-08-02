import Image from 'next/image';
import React from 'react';

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
    </tr>
  );
}
