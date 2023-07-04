'use client';

import { user } from '@/data/fakeData';
import { Logo } from '../shared/logo';
import { Navbar } from '../shared/navbar/navbar';
import { Profile } from '../shared/profile/profile';
import { ProfileIcon } from '../shared/profileIcon';
import { Search } from '../shared/search';

export function DesktopLayout({ font, children }) {
  return (
    <main
      className={`${font.className} bg-primary-50 hidden md:grid xl:grid-cols-[230px_1fr_400px] md:grid-cols-[230px_1fr] gap-12 scrollbar-hidden relative`}
    >
      {/* navbar */}
      <section className='hidden md:block sticky top-0 h-[100dvh] items-start'>
        <Navbar />
      </section>
      {/* main content */}
      <section className='h-[100svh] py-8 md:pr-12 xl:pr-0 grid grid-rows-[auto_1fr]'>
        <div className='flex items-center justify-between pb-5'>
          <Logo />
          <div className='flex items-center gap-5'>
            <Search />
            <div className='xl:hidden block'>
              <ProfileIcon image={user.image} />
            </div>
          </div>
        </div>
        <section className='overflow-y-auto'>{children}</section>
      </section>
      {/* profile bar */}
      <section className='bg-white py-8 xl:block hidden h-[100svh]'>
        <Profile />
      </section>
    </main>
  );
}
