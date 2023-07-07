'use client';

import { navLinks } from '@/data/navLinks';
import { ActiveNavLinks } from './activeNavLinks';
import { usePathname } from 'next/navigation';

export function NavMobile() {
  const currentLink = usePathname();
  return (
    <nav className='flex items-center justify-center gap-5 bg-white shadow-[0_0_5px_2px] shadow-gray-200 py-2'>
      {navLinks.map((link, index) => (
        <ActiveNavLinks
          key={index}
          currentLink={currentLink}
          url={link.url}
          icon={link.icon}
          notification={link.notification}
        />
      ))}
    </nav>
  );
}
