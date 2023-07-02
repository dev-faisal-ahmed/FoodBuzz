'use client';
import { navLinks } from '@/data/navLinks';
import { usePathname } from 'next/navigation';
import { ActiveNavLinks } from './activeNavLinks';
import { user } from '@/data/fakeData';
import { FiLogIn, FiLogOut } from 'react-icons/fi';

export function Navbar() {
  // variables
  const currentLink = usePathname();

  return (
    <nav className='bg-white p-5 h-full w-full flex flex-col justify-between shadow-md'>
      {/* nav links */}
      <div className='flex flex-col gap-3'>
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
      {user ? (
        <button className='py-1 px-2 flex justify-center gap-2 items-center bg-red-50 text-red-600 rounded-lg hover:bg-red-100 animation'>
          <FiLogOut size={20} />
          <span>Logout</span>
        </button>
      ) : (
        <button className='py-1 px-2 flex justify-center gap-2 items-center bg-green-50 text-green-600 rounded-lg hover:bg-green-100 animation'>
          <FiLogIn size={20} />
          <span>login</span>
        </button>
      )}
    </nav>
  );
}
