'use client';
import { BiSolidUpArrow } from 'react-icons/bi';
import { Logo } from '../shared/logo';
import { NavMobile } from '../shared/navbar/navMobile';
import { ProfileIcon } from '../shared/profileIcon';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '@/firebase/firebase.init';
import { Cart } from '../shared/profile/cart';
import { useEffect, useRef, useState } from 'react';
import { ProfileMenu } from '../shared/profile/profileMenu';

export function MobileLayout({ font, children }) {
  const [user] = useAuthState(auth);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const ref = useRef(null);

  // tracking outside click of profile menu
  useEffect(() => {
    function handleClickOutside(event) {
      if (ref.current && !ref.current.contains(event.target)) {
        setShowProfileMenu(false);
      }
    }
    document.addEventListener('click', handleClickOutside, true);
    return () => {
      document.removeEventListener('click', handleClickOutside, true);
    };
  }, []);

  return (
    <main
      className={`${font.className} w-full bg-primary-50 grid md:hidden grid-rows-[auto_1fr_auto] h-[100dvh] scrollbar-hidden `}
    >
      <section className='bg-white z-50 flex justify-between items-center py-2 px-5 shadow-md w-full'>
        <Logo />
        <div className='center-y gap-5'>
          <Cart size={25} />
          <>
            {showProfileMenu ? (
              <div
                onClick={() => setShowProfileMenu(false)} // to hide the profileMenu
                className='cursor-pointer rounded-full bg-primary-50 center-xy'
                style={{ height: '45px', width: '45px' }}
              >
                <BiSolidUpArrow size={30} />
              </div>
            ) : (
              <div
                key={2}
                onClick={() => setShowProfileMenu(true)} // to show the profileMenu
                className='cursor-pointer'
              >
                <ProfileIcon
                  size={45}
                  image={user?.photoURL}
                  name={user?.displayName}
                />
              </div>
            )}
          </>
        </div>
        <div
          ref={ref}
          className={`absolute top-[61px] p-3 animation z-50 ${
            showProfileMenu ? 'right-0' : 'right-[-500px]'
          }`}
        >
          <ProfileMenu />
        </div>
      </section>
      <section className='px-5 w-full overflow-y-auto'>{children}</section>
      <section className='block'>
        <NavMobile />
      </section>
    </main>
  );
}
