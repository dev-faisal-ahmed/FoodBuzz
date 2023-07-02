'use client';
import { createContext, useState } from 'react';

export const modalContext = createContext();

export function ModalProvider({ children }) {
  const [openCart, setCartOpen] = useState(false);

  const onOpenCart = () => setCartOpen(true);
  const onCloseCart = () => setCartOpen(false);

  return (
    <modalContext.Provider value={{ openCart, onCloseCart, onOpenCart }}>
      {children}
    </modalContext.Provider>
  );
}
