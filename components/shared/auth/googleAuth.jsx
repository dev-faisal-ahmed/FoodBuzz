'use client';
import { toastConfig } from '@/helper/toastConfig';
import { toast } from 'react-hot-toast';
import { FcGoogle } from 'react-icons/fc';
import { useSignInWithGoogle } from 'react-firebase-hooks/auth';
import { auth } from '@/firebase/firebase.init';
import { postReq } from '@/helper/apiReq';
import { useRouter } from 'next/navigation';

export function GoogleAuth() {
  const [signInWithGoogle, _, __, error] = useSignInWithGoogle(auth);
  const route = useRouter();

  async function handleLogin() {
    const toastId = toast.loading('Wait...👀');

    signInWithGoogle().then((userCredential) => {
      if (userCredential?.user?.email) {
        fetch(
          '/api/sign-up-google',
          postReq({
            name: userCredential.user.displayName,
            email: userCredential.user.email,
          })
        )
          .then((res) => res.json())
          .then((res) => {
            console.log(res);
            if (res.okay) {
              toast.success(res.msg, toastConfig);
              route.push('/');
            } else {
              toast.error(res.msg, toastConfig);
            }
          });
      }
      toast.dismiss(toastId);
    });
  }

  if (error) toast.error(error.message, toastConfig);

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
