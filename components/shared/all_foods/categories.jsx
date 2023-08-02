'use client';
export function Categories({ categories, onChangeCategory }) {
  return (
    <div className='flex items-center justify-between'>
      <h3 className='text-lg font-semibold' htmlFor='category'>
        Category
      </h3>
      <select
        onChange={onChangeCategory}
        className='outline-none p-1 rounded-lg'
        name='category'
        id='category'
      >
        <option key={0} value={'all'}>
          {'all'}
        </option>
        {categories?.map((data, index) => (
          <option key={index + 1} value={data?.category}>
            {data?.category}
          </option>
        ))}
      </select>
    </div>
  );
}
