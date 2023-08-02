'use client';
import { getUserInfoLocal } from '@/helper/localStorage';
import { Foods } from '../shared/all_foods/foods';
import { useClientSide } from '@/hooks/useClientSide';
import { AdminFoodPage } from './adminFoodPage';

export function FoodPageWrapper() {
  const isClient = useClientSide();
  if (!isClient) return null;
  const { role } = getUserInfoLocal();

  return (
    <section className='mt-4'>
      {role === 'admin' ? (
        <AdminFoodPage />
      ) : (
        <>
          <Foods />
        </>
      )}
    </section>
  );
}
