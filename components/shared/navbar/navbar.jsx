'use client';
import { navLinks } from '@/data/navLinks';
import { usePathname } from 'next/navigation';
import { ActiveNavLinks } from './activeNavLinks';
import { FiLogIn, FiLogOut } from 'react-icons/fi';
import { useSignOut } from 'react-firebase-hooks/auth';
import { auth } from '@/firebase/firebase.init';
import { toast } from 'react-hot-toast';
import { toastConfig } from '@/helper/toastConfig';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
  deleteUserInfoFromLocal,
  getUserInfoLocal,
} from '@/helper/localStorage';

export function Navbar() {
  // variables
  const currentLink = usePathname();
  const { email } = getUserInfoLocal();
  const [signOut] = useSignOut(auth);
  const router = useRouter();

  // signing out
  async function handleSignOut() {
    signOut().then(() => {
      toast.success('Sign out user', toastConfig);
      deleteUserInfoFromLocal();
      router.push('/login');
    });
  }

  return (
    <nav className='bg-white p-5 h-full w-full flex flex-col justify-between shadow-md'>
      {/* nav links */}
      <div className='flex flex-col gap-3'>
        {navLinks
          .filter((link) => !link.mobileOnly)
          .map((link, index) => (
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

      <>
        {email ? (
          <button
            onClick={handleSignOut}
            className='py-1 px-2 flex justify-center gap-2 items-center bg-red-50 text-red-600 rounded-lg hover:bg-red-100 animation'
          >
            <FiLogOut size={20} />
            <span>Logout</span>
          </button>
        ) : (
          <Link
            href={'/login'}
            className='py-1 px-2 flex justify-center gap-2 items-center bg-green-50 text-green-600 rounded-lg hover:bg-green-100 animation'
          >
            <FiLogIn size={20} />
            <span>login</span>
          </Link>
        )}
      </>
    </nav>
  );
}
