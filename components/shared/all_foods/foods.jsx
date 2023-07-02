'use client';
import { foods } from '@/data/fakeData';
import { Categories } from './categories';
import { FoodCard } from './foodCard';

export function Foods() {
  return (
    <section>
      <Categories />

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
