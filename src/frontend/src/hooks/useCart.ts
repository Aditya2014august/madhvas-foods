import { useCartStore } from "../store/cartStore";
import type { MenuItem } from "../types";

export function useCart() {
  const {
    items,
    addItem,
    removeItem,
    updateQuantity,
    clearCart,
    totalItems,
    totalPrice,
  } = useCartStore();

  const getItemQuantity = (itemId: string): number => {
    const cartItem = items.find((ci) => ci.item.id === itemId);
    return cartItem?.quantity ?? 0;
  };

  const isInCart = (itemId: string): boolean => {
    return items.some((ci) => ci.item.id === itemId);
  };

  const incrementItem = (item: MenuItem) => {
    addItem(item);
  };

  const decrementItem = (itemId: string) => {
    const cartItem = items.find((ci) => ci.item.id === itemId);
    if (cartItem) {
      updateQuantity(itemId, cartItem.quantity - 1);
    }
  };

  return {
    items,
    addItem,
    removeItem,
    updateQuantity,
    clearCart,
    totalItems: totalItems(),
    totalPrice: totalPrice(),
    getItemQuantity,
    isInCart,
    incrementItem,
    decrementItem,
  };
}
