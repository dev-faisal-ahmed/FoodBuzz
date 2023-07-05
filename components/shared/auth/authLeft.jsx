'use client';
import { Logo } from '../logo';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export function AuthLeft() {
  const pathName = usePathname();
  return (
    <div className='bg-primary-500 text-white p-16 flex-col justify-between gap-24 lg:flex hidden'>
      <Logo big={true} />
      <div>
        <h1 className='text-3xl font-semibold'>
          <span>{pathName === '/sign-up' && 'New User Registration'}</span>
          <span className='whitespace-nowrap'>
            {pathName === '/login' && 'Welcome Back 👋'}
          </span>
        </h1>
        <div className='mt-12 text-lg center-y gap-5'>
          <Link
            className={`${
              pathName === '/sign-up' ? '' : 'border-transparent text-gray-300'
            } border-b-2 pb-1`}
            href={'/sign-up'}
          >
            Sign Up
          </Link>
          <Link
            className={`${
              pathName === '/login' ? '' : 'border-transparent text-gray-300'
            } border-b-2 pb-1`}
            href={'/login'}
          >
            Login
          </Link>
        </div>
      </div>
      <p className='whitespace-nowrap text-center'>
        Terms of use and contradiction
      </p>
    </div>
  );
}
