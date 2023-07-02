'use client';

import { user } from '@/data/fakeData';
import { Logo } from '../shared/logo';
import { NavMobile } from '../shared/navbar/navMobile';
import { ProfileIcon } from '../shared/profileIcon';

export function MobileLayout({ font, children }) {
  return (
    <main
      className={`${font.className} w-full bg-primary-50 grid md:hidden grid-rows-[auto_1fr_auto] min-h-[100svh] scrollbar-hidden`}
    >
      <section className='sticky top-0 bg-white z-50 flex justify-between items-center py-2 px-5 shadow-md w-full'>
        <Logo />
        <ProfileIcon size={'40px'} image={user.image} />
      </section>
      <section className='px-5 w-full'>{children}</section>
      <section className='block md:hidden sticky bottom-0'>
        <NavMobile />
      </section>
    </main>
  );
}
