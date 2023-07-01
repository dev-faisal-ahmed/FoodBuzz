import { NavMobile } from '@/components/shared/navbar/navMobile';
import './globals.css';
import { Navbar } from '@/components/shared/navbar/navbar';
import { Poppins } from 'next/font/google';
import { Logo } from '@/components/shared/logo/logo';
import { ProfileIcon } from '@/components/shared/profile_icon/profileIcon';
import { user } from '@/data/fakeData';

const font = Poppins({ subsets: ['latin'], weight: ['400', '600'] });

export const metadata = {
  title: 'FoodBuzz',
  description: 'This is a food delivery app',
};

export default function RootLayout({ children }) {
  return (
    <html lang='en'>
      <body>
        {/* for desktop */}
        <main
          className={`${font.className} bg-bgColor hidden md:flex gap-8 scrollbar-hidden relative`}
        >
          <section className='hidden md:block sticky top-0 h-[100dvh] items-start'>
            <Navbar />
          </section>
          <section className='flex-grow h-full'>{children}</section>
        </main>

        {/* for mobile */}
        <main
          className={`${font.className} bg-bgColor grid md:hidden grid-rows-[auto_1fr_auto] min-h-[100svh] scrollbar-hidden`}
        >
          <section className='sticky top-0 flex justify-between items-center py-2 px-3 shadow-md'>
            <Logo />
            <ProfileIcon size={'40px'} image={user.image} />
          </section>
          <section>{children}</section>
          <section className='block md:hidden sticky bottom-0'>
            <NavMobile />
          </section>
        </main>
      </body>
    </html>
  );
}
