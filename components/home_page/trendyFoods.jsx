'use client';

import Link from 'next/link';
import { FoodCard } from '../shared/all_foods/foodCard';
import { foods } from '@/data/fakeData';

export function TrendyFoods() {
  return (
    <section>
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
      <section className='mt-8 grid xl:grid-cols-3 sm:grid-cols-2 gap-8'>
        {foods.map((food) => (
          <FoodCard
            key={food.id}
            title={food.title}
            image={food.image}
            price={food.price}
            id={food.id}
          />
        ))}
      </section>
    </section>
  );
}
