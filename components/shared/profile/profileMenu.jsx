'use client';
import { auth } from '@/firebase/firebase.init';
import { useAuthState, useSignOut } from 'react-firebase-hooks/auth';
import { ProfileIcon } from '../profileIcon';
import { FiLogOut } from 'react-icons/fi';
import { toast } from 'react-hot-toast';
import { toastConfig } from '@/helper/toastConfig';
import Link from 'next/link';

export function ProfileMenu() {
  const [user] = useAuthState(auth);
  const [signOut] = useSignOut(auth);

  function handleLogout() {
    signOut().then(() => toast.success('User Logged out!', toastConfig));
  }

  return (
    <div className='bg-white p-5 rounded-lg shadow-md min-w-[150px]'>
      <div className='flex flex-col gap-3'>
        {user ? (
          <>
            <div className='center-y gap-3 border-b hoverMenu rounded-lg p-2'>
              <ProfileIcon image={user.photoURL} />
              <div>
                <h1 className='font-semibold'>{user.displayName}</h1>
                <p className='text-gray-500 text-xs'>{user.email}</p>
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
