'use client';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface CartItem {
  id: string;
  name: string;
  price: number;
  qty: number;
}

interface CartState {
  items: CartItem[];
  add: (item: CartItem) => void;
  remove: (id: string) => void;
  clear: () => void;
  total: () => number;
}

export const useCart = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      add: (item) => {
        const existing = get().items.find(i => i.id === item.id);
        if (existing) {
          set({ items: get().items.map(i => i.id === item.id ? { ...i, qty: i.qty + item.qty } : i) });
        } else {
          set({ items: [...get().items, item] });
        }
      },
      remove: (id) => set({ items: get().items.filter(i => i.id !== id) }),
      clear: () => set({ items: [] }),
      total: () => get().items.reduce((sum, i) => sum + i.price * i.qty, 0)
    }),
    { name: 'ecoshop-cart' }
  )
);
