import React from 'react';
import { FoodRow } from './foodRow';

export function FoodTable({ foods }) {
  return (
    <table className='bg-white w-full'>
      <thead className='bg-gray-200'>
        <tr>
          <th className='text-left p-3 whitespace-nowrap'>Food ID</th>
          <th className='text-left p-3 whitespace-nowrap'>Image</th>
          <th className='text-left p-3 whitespace-nowrap'>Name of Food</th>
          <th className='p-3 whitespace-nowrap'>Price</th>
          <th className='text-left p-3 whitespace-nowrap'>Category</th>
          <th className='p-3 whitespace-nowrap'>Sold</th>
        </tr>
      </thead>
      <tbody>
        {foods?.map((food, index) => (
          <FoodRow
            key={index}
            index={index}
            foodId={food.foodId}
            foodName={food.foodName}
            price={food.price}
            category={food.category}
            imageUrl={food.imageUrl}
            sold={food.sold}
          />
        ))}
      </tbody>
    </table>
  );
}
