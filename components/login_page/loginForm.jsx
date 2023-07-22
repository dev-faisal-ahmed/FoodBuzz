'use client';
import Link from 'next/link';
import { Input } from '../shared/input/input';
import { FacebookAuth } from '../shared/auth/facebookAuth';
import { GoogleAuth } from '../shared/auth/googleAuth';
import { useSignInWithEmailAndPassword } from 'react-firebase-hooks/auth';
import { Loader } from '../shared/loader/loader';
import { auth } from '@/firebase/firebase.init';
import { toast } from 'react-hot-toast';
import { toastConfig } from '@/helper/toastConfig';
import { useRouter } from 'next/navigation';
import { getUserInfoLocal, setUserInfoLocal } from '@/helper/localStorage';

export function LoginForm() {
  const [signInWithEmailAndPassword, , loading, error] =
    useSignInWithEmailAndPassword(auth);
  const router = useRouter();

  // login handler
  function handleLogin(event) {
    event.preventDefault();
    const form = event.target;
    const email = form.email.value;
    const password = form.password.value;

    signInWithEmailAndPassword(email, password).then((userCredential) => {
      if (!userCredential) return;
      fetch(`/api/user-info/${email}`)
        .then((res) => res.json())
        .then((res) => {
          if (res.okay) {
            setUserInfoLocal({
              email,
              image: userCredential.user?.photoURL,
              role: res.data?.role,
              name: res.data?.name,
            });
          }
        });
      const { name } = getUserInfoLocal();
      toast.success(`Logged in as ${name}`);
      router.push('/');
    });
  }

  if (error) toast.error(error.message, toastConfig);

  return (
    <div className='w-full lg:p-12 p-8 bg-white lg:rounded-none lg:shadow-none shadow-md rounded-3xl'>
      {/* headers */}
      <h1 className='text-2xl font-semibold'>Login</h1>
      <p className='mt-3'>
        New Here?{' '}
        <Link className='text-blue-600 underline' href={'/sign-up'}>
          Sign Up from here
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

      {/* login form */}
      <form onSubmit={handleLogin} className='flex flex-col lg:gap-5 gap-3'>
        <Input
          name={'email'}
          title={'Email'}
          placeholder={'Enter Your Email'}
          type={'email'}
          required={true}
        />
        <Input
          name={'password'}
          title={'Password'}
          placeholder={'Enter Your Password'}
          type={'password'}
          required={true}
        />
        {loading ? (
          <div className='mt-5 block px-8 lg:mx-0 mx-auto bg-gray-500 w-fit rounded-lg'>
            <Loader />
          </div>
        ) : (
          <button className='mt-5 block px-8 lg:py-3 py-2 lg:mx-0 mx-auto bg-primary-500 hover:bg-transparent border border-primary-500 text-white hover:text-primary-500 animation w-fit rounded-lg'>
            Login
          </button>
        )}
      </form>
    </div>
  );
}
