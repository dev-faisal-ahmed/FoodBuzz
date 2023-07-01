'use client';
import { RiSearch2Line } from 'react-icons/ri';

export function Search() {
  return (
    <form className='flex items-center gap-3 bg-white py-2 px-5 rounded-full'>
      <label htmlFor='search'>
        <RiSearch2Line size={25} className='text-gray-500' />
      </label>
      <input
        className='outline-none'
        id='search'
        type='text'
        placeholder='Search Category'
      />
    </form>
  );
}
