import { create } from "zustand";
import { CartState } from "../common/types"

export const useCart = create<CartState>((set, get) => ({
  items: [],

  addItem: (item) => {
    const items = get().items;
    const existing = items.find((i) => i.id === item.id);

    if (existing) {
      set({
        items: items.map((i) =>
          i.id === item.id
            ? { ...i, quantity: i.quantity + item.quantity }
            : i
        ),
      });
    } else {
      set({ items: [...items, item] });
    }
  },

  removeItem: (id) => {
    set({ items: get().items.filter((i) => i.id !== id) });
  },

  clearCart: () => set({ items: [] }),

  get total() {
    return get().items.reduce(
      (acc, item) => acc + item.price * item.quantity,
      0
    );
  },
}));
