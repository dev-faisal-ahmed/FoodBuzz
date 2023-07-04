'use client';
import { Logo } from '../shared/logo';
import { NavMobile } from '../shared/navbar/navMobile';
import { ProfileIcon } from '../shared/profileIcon';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '@/firebase/firebase.init';
import { Cart } from '../shared/profile/cart';

export function MobileLayout({ font, children }) {
  const [user] = useAuthState(auth);

  return (
    <main
      className={`${font.className} w-full bg-primary-50 grid md:hidden grid-rows-[auto_1fr_auto] min-h-[100dvh] scrollbar-hidden relative`}
    >
      <section className='sticky top-0 bg-white z-50 flex justify-between items-center py-2 px-5 shadow-md w-full'>
        <Logo />
        <div className='center-y gap-5'>
          <Cart size={25} />

          <ProfileIcon
            size={45}
            image={user?.photoURL}
            name={user?.displayName}
          />
        </div>
      </section>
      <section className='px-5 w-full'>{children}</section>
      <section className='block md:hidden sticky bottom-0'>
        <NavMobile />
      </section>
    </main>
  );
}
