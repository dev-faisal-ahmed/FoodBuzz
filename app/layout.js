import { Navbar } from '@/components/shared/navbar/navbar';
import './globals.css';
import { Poppins } from 'next/font/google';

const font = Poppins({ subsets: ['latin'], weight: ['400', '600'] });

export const metadata = {
  title: 'FoodBuzz',
  description: 'This is a food delivery app',
};

export default function RootLayout({ children }) {
  return (
    <html lang='en'>
      <body
        className={`${font.className} bg-bgColor flex gap-8 scrollbar-hidden relative`}
      >
        {/* navbar */}
        <section className='sticky top-0 h-[100svh]'>
          <Navbar />
        </section>
        <section className='flex-grow'>{children}</section>
      </body>
    </html>
  );
}
