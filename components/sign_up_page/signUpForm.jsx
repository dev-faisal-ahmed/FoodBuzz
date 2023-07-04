'use client';
import Link from 'next/link';
import AuthInput from '../shared/auth/authInput';
import { GoogleAuth } from '../shared/auth/googleAuth';
import { FacebookAuth } from '../shared/auth/facebookAuth';
import { auth } from '@/firebase/firebase.init';
import { postReq } from '@/helper/apiReq';
import { toast } from 'react-hot-toast';
import { toastConfig } from '@/helper/toastConfig';
import { useRouter } from 'next/navigation';
import {
  useCreateUserWithEmailAndPassword,
  useUpdateProfile,
  useSignOut,
} from 'react-firebase-hooks/auth';
import { Loader } from '../shared/loader/loader';
import { useState } from 'react';

export function SignUpForm() {
  const route = useRouter();
  const [createUserWithEmailAndPassword, , loading, errorToCreateUser] =
    useCreateUserWithEmailAndPassword(auth);
  const [updateProfile, updating, errorToUpdateProfile] =
    useUpdateProfile(auth);
  const [signOut] = useSignOut(auth);
  const [fetching, setFetching] = useState(false);

  // handle sign up
  async function handelSingUp(event) {
    setFetching(true);
    event.preventDefault();
    const form = event.target;
    const name = form.name.value;
    const email = form.email.value;
    const password = form.password.value;
    const newUser = { name, email };

    createUserWithEmailAndPassword(email, password).then(
      async (userCredential) => {
        if (userCredential.user.email) {
          // if user created update userName
          updateProfile({ displayName: name });
          fetch('/api/sign-up', postReq(newUser))
            .then((res) => res.json())
            .then(async (res) => {
              if (res.okay) {
                toast.success(res.msg, toastConfig);
                setFetching(false);
                await signOut();
                route.push('/login');
              } else {
                toast.error(res.msg, toastConfig);
              }
              setFetching(false);
            });
          setFetching(false);
        }
      }
    );
  }

  if (errorToCreateUser || errorToUpdateProfile) {
    toast.error(`Something went wrong`, toastConfig);
  }

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
      <form onSubmit={handelSingUp} className='flex flex-col lg:gap-5 gap-3'>
        <AuthInput
          title={'Name'}
          placeholder={'Enter Your Name'}
          name={'name'}
          type={'text'}
        />

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

        {updating || loading || fetching ? (
          <div className='mt-5 block px-8 lg:py-3 py-2 lg:mx-0 mx-auto bg-gray-500 w-fit rounded-lg'>
            <Loader className={'w-fit'} />
          </div>
        ) : (
          <button className='mt-5 block px-8 lg:py-3 py-2 lg:mx-0 mx-auto bg-primary-500 hover:bg-transparent border border-primary-500 text-white hover:text-primary-500 animation w-fit rounded-lg'>
            Sign Up
          </button>
        )}
      </form>
    </div>
  );
}
