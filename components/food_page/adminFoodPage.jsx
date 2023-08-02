import { modalContext } from '@/context_provider/modalProvider';
import { useGetFoods } from '@/hooks/useGetFoods';
import React, { useContext } from 'react';
import { FoodTable } from '../shared/table/foodTable';

export function AdminFoodPage() {
  const { onOpenAddFoodModal } = useContext(modalContext);
  const { foodsData } = useGetFoods();
  console.log(foodsData?.foods);

  return (
    <>
      <button
        onClick={onOpenAddFoodModal}
        className='button bg-primary-500 font-semibold rounded-md text-white block ml-auto'
      >
        + Add Food
      </button>
      {foodsData?.foods?.length > 0 ? (
        <>
          <h1 className='text-xl font-semibold mb-5'>Foods</h1>
          <FoodTable foods={foodsData?.foods} />
        </>
      ) : (
        <h2>Nothing Found</h2>
      )}
    </>
  );
}
