'use client';
import { Logo } from '../shared/logo';
import { Navbar } from '../shared/navbar/navbar';
import { Profile } from '../shared/profile/profile';
import { ProfileIcon } from '../shared/profileIcon';
import { Search } from '../shared/search';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '@/firebase/firebase.init';
import { useEffect, useRef, useState } from 'react';

export function DesktopLayout({ font, children }) {
  const [user] = useAuthState(auth);
  const [showProfile, setShowProfile] = useState(false);

  const profileDiv = useRef(null);
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (profileDiv.current && !profileDiv.current.contains(event.target)) {
        setShowProfile(false);
      }
    };
    document.addEventListener('click', handleClickOutside, true);
    return () => {
      document.removeEventListener('click', handleClickOutside, true);
    };
  }, []);

  return (
    <main
      className={`${font.className} bg-primary-50 hidden md:grid xl:grid-cols-[230px_1fr_400px] md:grid-cols-[230px_1fr] gap-12 scrollbar-hidden overflow-x-hidden relative`}
    >
      {/* navbar */}
      <section className='hidden md:block sticky top-0 h-[100dvh] items-start'>
        <Navbar />
      </section>
      {/* main content */}
      <section className='relative h-[100dvh] py-8 md:pr-12 xl:pr-0 grid grid-rows-[auto_1fr]'>
        <div className='flex items-center justify-between gap-8 pb-5'>
          <Logo />
          <div className='flex items-center gap-5'>
            <Search />
            <div
              onClick={() => setShowProfile(true)}
              className='xl:hidden block cursor-pointer'
            >
              <ProfileIcon
                image={user?.photoURL}
                name={user?.displayName}
                bgColor={'white'}
              />
            </div>
          </div>
        </div>
        {/* floating profile */}

        <div
          ref={profileDiv}
          className={`absolute z-50 py-8 xl:hidden bg-white h-[100dvh] animation overflow-y-auto ${
            showProfile ? 'top-0 right-0' : 'right-[-700px]'
          }`}
        >
          <Profile />
        </div>

        <section className='overflow-y-auto'>{children}</section>
      </section>
      {/* profile bar */}
      <section className='bg-white py-8 xl:block hidden h-[100dvh] overflow-y-auto'>
        <Profile />
      </section>
    </main>
  );
}
