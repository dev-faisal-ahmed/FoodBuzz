'use client';
import { calculateTotal } from '@/helper/cartHelper';
import { cartGetToLocal, cartSaveToLocal } from '@/helper/localStorage';
import { createContext, useState, useReducer } from 'react';

export const cartContext = createContext();

// all actions of cart
export const cartActions = {
  add: 'add',
  remove: 'remove',
  increase: 'increase',
  decrease: 'decrease',
  clearAll: 'clearAll',
};

// logic for the reducer
function handleCart(state, action) {
  switch (action.type) {
    // add a new item to the cart
    case cartActions.add: {
      const newCartList = [
        ...state.cartList,
        { count: 1, ...action.payload.data },
      ];

      const subTotal = calculateTotal(newCartList);
      const newState = { subTotal, cartList: newCartList };
      cartSaveToLocal(newState);
      return newState;
    }

    // remove any item from cart
    case cartActions.remove: {
      const newCartList = state.cartList.filter(
        (data) => data.id !== action.payload.id
      );
      const subTotal = calculateTotal(newCartList);
      const newState = { subTotal, cartList: newCartList };
      cartSaveToLocal(newState);
      return newState;
    }

    // increase items on cart
    case cartActions.increase: {
      const index = state.cartList.findIndex(
        (data) => data.id === action.payload.id
      );
      const cartList = state.cartList;
      cartList[index].count += 1;
      const subTotal = calculateTotal(cartList);
      const newSate = { subTotal, cartList };
      cartSaveToLocal(newSate);
      return newSate;
    }

    // decrease
    case cartActions.decrease: {
      const index = state.cartList.findIndex(
        (data) => data.id === action.payload.id
      );
      let cartList = state.cartList;
      cartList[index].count -= 1;
      // if count = 0
      if (cartList[index].count === 0)
        cartList = cartList.filter((data) => data.id !== action.payload.id);

      const subTotal = calculateTotal(cartList);
      const newSate = { subTotal, cartList };
      cartSaveToLocal(newSate);
      return newSate;
    }

    // clear all
    case cartActions.clearAll: {
      const newState = { subTotal: 0, cartList: [] };
      cartSaveToLocal(newState);
      return newState;
    }
    default:
      return state;
  }
}

export function CartProvider({ children }) {
  const localData = cartGetToLocal() || { subTotal: 0, cartList: [] };
  const [cartData, updateCart] = useReducer(handleCart, { ...localData });

  return (
    <cartContext.Provider value={{ cartData, updateCart }}>
      {children}
    </cartContext.Provider>
  );
}
