'use client';
import { toastConfig } from '@/helper/toastConfig';
import { toast } from 'react-hot-toast';
import { FcGoogle } from 'react-icons/fc';

export function GoogleAuth() {
  async function handleLogin() {
    toast.error('😥 This is not functional yet', toastConfig);
  }
  return (
    <div
      onClick={handleLogin}
      className='w-full center-y justify-center gap-3 border px-8 py-2 rounded-md cursor-pointer shadow-md hover:shadow-lg animation'
    >
      <FcGoogle size={25} />
      <p className='text-lg'>Google</p>
    </div>
  );
}
