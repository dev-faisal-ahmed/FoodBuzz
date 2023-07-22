'use client';
import { auth } from '@/firebase/firebase.init';
import { useSignOut } from 'react-firebase-hooks/auth';
import { ProfileIcon } from '../profileIcon';
import { FiLogOut } from 'react-icons/fi';
import { toast } from 'react-hot-toast';
import { toastConfig } from '@/helper/toastConfig';
import Link from 'next/link';
import { getUserInfoLocal } from '@/helper/localStorage';

export function ProfileMenu() {
  const { email, image, name } = getUserInfoLocal();
  const [signOut] = useSignOut(auth);

  function handleLogout() {
    signOut().then(() => toast.success('User Logged out!', toastConfig));
  }

  return (
    <div className='bg-white p-5 rounded-lg shadow-md min-w-[150px]'>
      <div className='flex flex-col gap-3'>
        {email ? (
          <>
            <div className='center-y gap-3 border-b hoverMenu rounded-lg p-2'>
              <ProfileIcon image={image} />
              <div>
                <h1 className='font-semibold'>{name}</h1>
                <p className='text-gray-500 text-xs'>{email}</p>
              </div>
            </div>
            <button
              onClick={handleLogout}
              className='py-1 px-2 flex justify-center gap-2 items-center bg-red-50 text-red-600 rounded-lg hover:bg-red-100 animation'
            >
              <FiLogOut size={20} />
              <span>Logout</span>
            </button>
          </>
        ) : (
          <>
            <Link className='hoverMenu px-2 py-1 rounded-md' href={'/sign-up'}>
              Sign Up
            </Link>
            <Link className='hoverMenu px-2 py-1 rounded-md' href={'/login'}>
              Log In
            </Link>
          </>
        )}
      </div>
    </div>
  );
}
