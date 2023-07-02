'use client';
import { cartGetToLocal, cartSaveToLocal } from '@/helper/localStorage';
import { createContext, useState } from 'react';

export const cartContext = createContext();

export function CartProvider({ children }) {
  const localData = cartGetToLocal();
  const [cartData, setCartData] = useState(localData);

  const onAddCart = (data) => {
    setCartData((prevData) => {
      cartSaveToLocal([...prevData, { ...data, count: 1 }]);
      return [...prevData, { ...data, count: 1 }];
    });
  };

  const onRemove = (id) => {
    setCartData((prevData) => {
      const newData = prevData.filter((data) => data.id !== id);
      cartSaveToLocal(newData);
      return newData;
    });
  };

  const onIncrease = (id) => {
    setCartData((prevData) => {
      const index = prevData.findIndex((data) => data.id === id);
      prevData[index].count += 1;
      cartSaveToLocal([...prevData]);
      return [...prevData];
    });
  };

  const onDecrease = (id) => {
    setCartData((prevData) => {
      const index = prevData.findIndex((data) => data.id === id);
      prevData[index].count -= 1;

      // if count = 0 ; then remove it from cart
      if (prevData[index].count === 0) {
        const newData = prevData.filter((data) => data.id !== id);
        cartSaveToLocal(newData);
        return newData;
      }

      cartSaveToLocal([...prevData]);
      return [...prevData];
    });
  };

  return (
    <cartContext.Provider
      value={{ cartData, onAddCart, onRemove, onIncrease, onDecrease }}
    >
      {children}
    </cartContext.Provider>
  );
}
