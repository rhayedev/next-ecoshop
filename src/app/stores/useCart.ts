'use client';

import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export type CartItem = { id: string; name: string; price: number; qty: number };

export type CartState = {
    items: CartItem[];
    add: (item: Omit<CartItem, 'qty'>, qty?: number) => void;
    remove: (id: string) => void;
    clear: () => void;
    total: () => number;
};

export const useCart = create<CartState>()(
    persist(
        (set, get) => ({
            items: [],
            add: (item, qty = 1) =>
                set((state) => {
                    const existing = state.items.find((i) => i.id === item.id);
                    if (existing) {
                        return {
                            items: state.items.map((i) =>
                                i.id === item.id ? { ...i, qty: i.qty + qty } : i
                            ),
                        };
                    }
                    return { items: [...state.items, { ...item, qty }] };
                }),
            remove: (id) => set((state) => ({ items: state.items.filter((i) => i.id !== id) })),
            clear: () => set({ items: [] }),
            total: () => get().items.reduce((sum, i) => sum + i.price * i.qty, 0),
        }),
        { name: 'ecoshoop-cart' }
    )
);
