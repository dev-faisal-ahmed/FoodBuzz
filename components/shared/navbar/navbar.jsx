'use client';
import { navLinks } from '@/data/navLinks';
import { usePathname } from 'next/navigation';
import ActiveNavLinks from './activeNavLinks';

export function Navbar() {
  // variables
  const currentLink = usePathname();

  return (
    <nav className='bg-white p-5 h-full flex flex-col justify-between shadow-md'>
      {/* nav links */}
      <div className='flex flex-col gap-3 items-center'>
        {navLinks.map((link, index) => (
          <ActiveNavLinks
            key={index}
            currentLink={currentLink}
            icon={link.icon}
            title={link.title}
            url={link.url}
            notification={link.notification}
          />
        ))}
      </div>
      {/* profile icons */}

      <button className='py-1 px-2 bg-orange-50 text-orange-600 rounded-md hover:bg-orange-100 animation'>
        Login
      </button>
    </nav>
  );
}
