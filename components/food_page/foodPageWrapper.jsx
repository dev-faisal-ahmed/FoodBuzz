'use client';
import { getUserInfoLocal } from '@/helper/localStorage';
import { Foods } from '../shared/all_foods/foods';
import { useClientSide } from '@/hooks/useClientSide';
import { useContext } from 'react';
import { modalContext } from '@/context_provider/modalProvider';

export function FoodPageWrapper() {
  const isClient = useClientSide();
  const { onOpenAddFoodModal } = useContext(modalContext);

  if (!isClient) return null;
  const { role } = getUserInfoLocal();

  return (
    <section className='mt-4'>
      {role === 'admin' ? (
        <>
          <button
            onClick={onOpenAddFoodModal}
            className='button bg-primary-500 font-semibold rounded-md text-white block ml-auto'
          >
            + Add Food
          </button>
        </>
      ) : (
        <>
          <Foods />
        </>
      )}
    </section>
  );
}
