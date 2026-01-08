'use client';

import { createContext, useContext, useState, ReactNode } from 'react';

type CartContextType = {
  total: number;
  addToCart: (price: number) => void;
};

const CartContext = createContext<CartContextType | null>(null);

export function CartProvider({ children }: { children: ReactNode }) {
  const [total, setTotal] = useState(0);

  const addToCart = (price: number) => {
    setTotal(prev => prev + price);
  };

  return (
    <CartContext.Provider value={{ total, addToCart }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) {
    throw new Error('useCart must be used within CartProvider');
  }
  return ctx;
}
