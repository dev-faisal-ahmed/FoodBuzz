'use client';
import './globals.css';
import { Poppins } from 'next/font/google';
import { MobileLayout } from '@/components/layout/mobileLayout';
import { DesktopLayout } from '@/components/layout/desktopLayout';
import { ModalProvider } from '@/context_provider/modalProvider';
import { CartModal } from '@/components/shared/profile/cartModal';
import { CartProvider } from '@/context_provider/cartProvider';
import { ClientOnly } from '@/components/shared/clientOnly';

const font = Poppins({ subsets: ['latin'], weight: ['400', '600'] });

export const metadata = {
  title: 'FoodBuzz',
  description: 'This is a food delivery app',
};

export default function RootLayout({ children }) {
  return (
    <html lang='en'>
      <body>
        <ClientOnly>
          <ModalProvider>
            <CartProvider>
              <CartModal />
              <DesktopLayout font={font}>{children}</DesktopLayout>
              <MobileLayout font={font}>{children}</MobileLayout>
            </CartProvider>
          </ModalProvider>
        </ClientOnly>
      </body>
    </html>
  );
}
