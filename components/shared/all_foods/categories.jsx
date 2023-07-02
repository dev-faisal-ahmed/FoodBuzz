'use client';

import { categories } from '@/data/fakeData';

export function Categories() {
  return (
    <div className='flex items-center justify-between'>
      <h3 className='text-xl font-semibold' htmlFor='category'>
        Categories
      </h3>
      <select
        className='outline-none p-1 rounded-lg'
        name='category'
        id='category'
      >
        {categories.map((data, index) => (
          <option className='uppercase' key={index} value={data}>
            {data}
          </option>
        ))}
      </select>
    </div>
  );
}
