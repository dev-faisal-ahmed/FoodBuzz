'use client';
import { AuthLeft } from '@/components/shared/auth/authLeft';
import { SignUpForm } from '@/components/sign_up_page/signUpForm';

export default function SignUpPage() {
  return (
    <section className='flex gap-5 h-[100svh] center-xy bg-primary-50'>
      <div className='w-fit rounded-3xl overflow-hidden flex lg:shadow-md lg:p-0 p-5'>
        <AuthLeft />
        <SignUpForm />
      </div>
    </section>
  );
}
