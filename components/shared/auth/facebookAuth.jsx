'use client';
import { BsFacebook } from 'react-icons/bs';

export function FacebookAuth() {
  return (
    <div className='w-full center-y justify-center gap-3 border px-8 py-2 rounded-md cursor-pointer shadow-md hover:shadow-lg animation'>
      <BsFacebook className='text-blue-600' size={25} />
      <p className='text-lg'>Facebook</p>
    </div>
  );
}
