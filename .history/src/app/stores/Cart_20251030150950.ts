'use client';
import { create } from 'zustand';

type CartItem = { id: string; name: string; price: number; qty: number };
type CartState = {
  items: CartItem[];
  add: (item: Omit<CartItem, 'qty'>, qty?: number) => void;
  remove: (id: string) => void;
  clear: () => void;
  total: () => number;
};

function loadCart(): CartItem[] {
  if (typeof window !== 'undefined') {
    const data = localStorage.getItem('cart');
    if (data) return JSON.parse(data);
  }
  return [];
}

export const useCart = create<CartState>((set, get) => ({
  items: loadCart(),
  add: (item, qty = 1) => set((s) => {
    const existing = s.items.find(i => i.id === item.id);
    let newItems;
    if (existing) {
      newItems = s.items.map(i => i.id === item.id ? { ...i, qty: i.qty + qty } : i);
    } else {
      newItems = [...s.items, { ...item, qty }];
    }
    if (typeof window !== 'undefined') localStorage.setItem('cart', JSON.stringify(newItems));
    return { items: newItems };
  }),
  remove: (id) => set((s) => {
    const newItems = s.items.filter(i => i.id !== id);
    if (typeof window !== 'undefined') localStorage.setItem('cart', JSON.stringify(newItems));
    return { items: newItems };
  }),
  clear: () => {
    if (typeof window !== 'undefined') localStorage.removeItem('cart');
    set({ items: [] });
  },
  total: () => get().items.reduce((sum, i) => sum + i.price * i.qty, 0),
}));