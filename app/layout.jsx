import './globals.css';
import { Poppins } from 'next/font/google';
import { ModalProvider } from '@/context_provider/modalProvider';
import { CartModal } from '@/components/shared/profile/cartModal';
import { CartProvider } from '@/context_provider/cartProvider';
import { ClientOnly } from '@/components/shared/clientOnly';
import { LayoutProvider } from '@/components/layout/layoutProvider';
import { Toaster } from 'react-hot-toast';
import { ProfileModal } from '@/components/shared/profile/profileModal';
import { QueryProvider } from '@/context_provider/queryProvider';

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
          {/* query provider */}
          <QueryProvider>
            {/* context api */}
            <ModalProvider>
              <CartProvider>
                {/* toast */}
                <Toaster />
                {/* modal */}
                <CartModal />
                <ProfileModal />
                {/* layout */}
                <LayoutProvider font={font}>{children}</LayoutProvider>
              </CartProvider>
            </ModalProvider>
          </QueryProvider>
        </ClientOnly>
      </body>
    </html>
  );
}
