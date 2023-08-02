'use client';
import { createContext, useState } from 'react';

export const modalContext = createContext();

export function ModalProvider({ children }) {
  const [openCart, setCartOpen] = useState(false);
  const [openProfileModal, setOpenProfileModal] = useState(false);
  const [openPaymentModal, setOpenPaymentModal] = useState(false);
  const [openAddFoodModal, setOpenAddFoodModal] = useState(false);

  const onOpenCart = () => setCartOpen(true);
  const onCloseCart = () => setCartOpen(false);

  const onOpenProfileModal = () => setOpenProfileModal(true);
  const onCloseProfileModal = () => setOpenProfileModal(false);

  const onOpenPaymentModal = () => setOpenPaymentModal(true);
  const onClosePaymentModal = () => setOpenPaymentModal(false);

  const onOpenAddFoodModal = () => setOpenAddFoodModal(true);
  const onCloseAddFoodModal = () => setOpenAddFoodModal(false);

  return (
    <modalContext.Provider
      value={{
        openCart,
        onCloseCart,
        onOpenCart,
        openProfileModal,
        onOpenProfileModal,
        onCloseProfileModal,
        openPaymentModal,
        onOpenPaymentModal,
        onClosePaymentModal,
        openAddFoodModal,
        onOpenAddFoodModal,
        onCloseAddFoodModal,
      }}
    >
      {children}
    </modalContext.Provider>
  );
}
