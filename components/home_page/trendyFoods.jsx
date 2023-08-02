'use client';

import Link from 'next/link';
import { FoodCard } from '../shared/all_foods/foodCard';
import { useGetFoods } from '@/hooks/useGetFoods';

export function TrendyFoods() {
  const { foodsData } = useGetFoods();
  return (
    <section className=''>
      {/* link and title */}
      <div className='flex items-center justify-between mt-8'>
        <h3 className='text-xl font-semibold' htmlFor='category'>
          Most Ordered Foods
        </h3>
        <Link className='text-blue-600 font-semibold' href={'/foods'}>
          See all
        </Link>
      </div>

      {/* food list */}
      <section className='mt-8 grid 2xl:grid-cols-3 sm:grid-cols-2 gap-8'>
        {foodsData?.foods?.map((food) => (
          <FoodCard
            key={food.id}
            title={food.foodName}
            image={food.imageUrl}
            price={food.price}
            id={food.foodId}
          />
        ))}
      </section>
    </section>
  );
}
