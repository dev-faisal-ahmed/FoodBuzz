import { LoginForm } from '@/components/login_page/loginForm';
import { AuthLeft } from '@/components/shared/auth/authLeft';

export default function LoginPage() {
  return (
    <section className='flex gap-5 h-[100svh] center-xy bg-primary-50'>
      <div className='w-fit rounded-3xl overflow-hidden flex lg:shadow-md lg:p-0 p-5'>
        <AuthLeft />
        <LoginForm />
      </div>
    </section>
  );
}
