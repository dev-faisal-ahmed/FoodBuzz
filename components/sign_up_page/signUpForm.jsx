'use client';
import Link from 'next/link';
import AuthInput from '../shared/auth/authInput';
import { GoogleAuth } from '../shared/auth/googleAuth';
import { FacebookAuth } from '../shared/auth/facebookAuth';

export function SignUpForm() {
  return (
    <div className='w-full lg:p-12 p-8 bg-white lg:rounded-none lg:shadow-none shadow-md rounded-3xl'>
      {/* headers */}
      <h1 className='text-2xl font-semibold'>Sign Up</h1>
      <p className='mt-3'>
        Already Have an account?{' '}
        <Link className='text-blue-600 underline' href={'/login'}>
          Login from here
        </Link>
      </p>
      <div className='mt-8 lg:flex-row flex flex-col lg:gap-8 gap-3'>
        <GoogleAuth />
        <FacebookAuth />
      </div>

      {/* divider */}
      <div className='center-y gap-5 my-5'>
        <div className='w-full h-[1px] bg-gray-500'>&nbsp;</div>
        Or
        <div className='w-full h-[1px] bg-gray-500'>&nbsp;</div>
      </div>

      {/* sign up form */}
      <form className='flex flex-col lg:gap-5 gap-3'>
        <div className='flex lg:items-center flex-col lg:flex-row lg:gap-5 gap-3'>
          <AuthInput
            title={'First Name'}
            placeholder={'Your First Name'}
            name={'first-name'}
            type={'text'}
          />
          <AuthInput
            title={'Last Name'}
            placeholder={'Your Last Name'}
            name={'last-name'}
            type={'text'}
          />
        </div>
        <AuthInput
          title={'Email'}
          placeholder={'Enter Your Email'}
          name={'email'}
          type={'email'}
        />
        <AuthInput
          title={'Password'}
          placeholder={'Enter A Strong Password'}
          name={'password'}
          type={'password'}
        />
        <button className='mt-5 block px-8 lg:py-3 py-2 lg:mx-0 mx-auto bg-primary-500 hover:bg-transparent border border-primary-500 text-white hover:text-primary-500 animation w-fit rounded-lg'>
          Sign Up
        </button>
      </form>
    </div>
  );
}
