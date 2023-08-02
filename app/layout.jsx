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
import { PaymentModal } from '@/components/shared/profile/paymentModal';
import { AddFoodModal } from '@/components/food_page/addFoodModal';

const font = Poppins({ subsets: ['latin'], weight: ['400', '600'] });

export const metadata = {
  title: 'FoodBuzz',
  description: 'This is a food delivery app',
};

export default function RootLayout({ children }) {
  return (
    <html lang='en'>
      <body>
        {/* ------------ query provider ------------ */}
        <ClientOnly>
          <QueryProvider>
            {/* ----- context api ----- */}
            <ModalProvider>
              <CartProvider>
                <Toaster />
                {/* modal */}
                <CartModal />
                <ProfileModal />
                <PaymentModal />
                <AddFoodModal />
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
