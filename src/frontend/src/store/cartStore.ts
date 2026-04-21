import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { CartItem, MenuItem } from "../types";

interface CartState {
  items: CartItem[];
  addItem: (item: MenuItem) => void;
  removeItem: (itemId: string) => void;
  updateQuantity: (itemId: string, quantity: number) => void;
  clearCart: () => void;
  totalItems: () => number;
  totalPrice: () => number;
}

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],

      addItem: (menuItem: MenuItem) => {
        set((state) => {
          const existing = state.items.find((ci) => ci.item.id === menuItem.id);
          if (existing) {
            return {
              items: state.items.map((ci) =>
                ci.item.id === menuItem.id
                  ? { ...ci, quantity: ci.quantity + 1 }
                  : ci,
              ),
            };
          }
          return { items: [...state.items, { item: menuItem, quantity: 1 }] };
        });
      },

      removeItem: (itemId: string) => {
        set((state) => ({
          items: state.items.filter((ci) => ci.item.id !== itemId),
        }));
      },

      updateQuantity: (itemId: string, quantity: number) => {
        if (quantity <= 0) {
          get().removeItem(itemId);
          return;
        }
        set((state) => ({
          items: state.items.map((ci) =>
            ci.item.id === itemId ? { ...ci, quantity } : ci,
          ),
        }));
      },

      clearCart: () => set({ items: [] }),

      totalItems: () => {
        return get().items.reduce((sum, ci) => sum + ci.quantity, 0);
      },

      totalPrice: () => {
        return get().items.reduce(
          (sum, ci) => sum + ci.item.price * ci.quantity,
          0,
        );
      },
    }),
    {
      name: "madhvas-cart",
    },
  ),
);
