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

export const useCart = create<CartState>((set, get) => ({
    items: [],
    add: (item, qty = 1) => set((s) => {
        const existing = s.items.find(i => i.id === item.id);
        if (existing) {
            return { items: s.items.map(i => i.id === item.id ? { ...i, qty: i.qty + qty } : i) };
        }
        return { items: [...s.items, { ...item, qty }] };
    }),
    remove: (id) => set((s) => ({ items: s.items.filter(i => i.id !== id) })),
    clear: () => set({ items: [] }),
    total: () => get().items.reduce((sum, i) => sum + i.price * i.qty, 0),
}));