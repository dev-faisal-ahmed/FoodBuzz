'use client';
import { toastConfig } from '@/helper/toastConfig';
import { toast } from 'react-hot-toast';
import { BsFacebook } from 'react-icons/bs';

export function FacebookAuth() {
  async function handleLogin() {
    toast.error('😥 This is not functional yet', toastConfig);
  }

  return (
    <div
      onClick={handleLogin}
      className='w-full center-y justify-center gap-3 border px-8 py-2 rounded-md cursor-pointer shadow-md hover:shadow-lg animation'
    >
      <BsFacebook className='text-blue-600' size={25} />
      <p className='text-lg'>Facebook</p>
    </div>
  );
}
