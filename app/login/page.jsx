import { LoginForm } from '@/components/login_page/loginForm';
import { AuthLeft } from '@/components/shared/auth/authLeft';

export default function LoginPage() {
  return (
    <section className='flex gap-5 h-[100dvh] center-xy bg-primary-50 p-3'>
      <div className='sm:w-fit min-w-[400px] w-full rounded-3xl overflow-hidden flex lg:shadow-md lg:p-0 p-5'>
        <AuthLeft />
        <LoginForm />
      </div>
    </section>
  );
}
