'use client';
import { useEffect, useState } from 'react';
import { Categories } from './categories';
import { FoodCard } from './foodCard';
import { useGetFoods } from '@/hooks/useGetFoods';

export function Foods() {
  const { foodsData } = useGetFoods();
  const [foods, setFoods] = useState([]);

  useEffect(() => {
    setFoods(foodsData?.foods);
  }, [foodsData]);

  function onChangeCategory(event) {
    const selectedCategory = event.target.value;
    if (selectedCategory === 'all') {
      setFoods(foodsData?.foods);
      return;
    }
    const selectedFoods = foodsData?.foods?.filter(
      (food) => food.category === selectedCategory
    );
    setFoods(selectedFoods);
  }
  return (
    <section>
      <Categories
        categories={foodsData?.categories}
        onChangeCategory={onChangeCategory}
      />
      <section className='mt-8 grid 2xl:grid-cols-3 sm:grid-cols-2 gap-8'>
        {foods?.map((food) => (
          <FoodCard
            key={food.foodId}
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
