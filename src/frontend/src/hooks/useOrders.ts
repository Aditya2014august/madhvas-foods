import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { DeliveryAddress, Order, OrderItem, OrderStatus } from "../types";

interface OrderStore {
  orders: Order[];
  addOrder: (order: Order) => void;
  updateOrderStatus: (orderId: string, status: OrderStatus) => void;
  getOrder: (orderId: string) => Order | undefined;
}

const useOrderStore = create<OrderStore>()(
  persist(
    (set, get) => ({
      orders: [],
      addOrder: (order) => set((s) => ({ orders: [order, ...s.orders] })),
      updateOrderStatus: (orderId, status) =>
        set((s) => ({
          orders: s.orders.map((o) =>
            o.id === orderId ? { ...o, status, updatedAt: Date.now() } : o,
          ),
        })),
      getOrder: (orderId) => get().orders.find((o) => o.id === orderId),
    }),
    { name: "madhvas-orders" },
  ),
);

export function useOrders() {
  const { orders, addOrder, updateOrderStatus } = useOrderStore();

  const placeOrder = (
    items: OrderItem[],
    deliveryAddress: DeliveryAddress,
    total: number,
    paymentMethod: string,
  ): Order => {
    const newOrder: Order = {
      id: `MF${Date.now()}`,
      items,
      status: "Placed",
      total,
      deliveryAddress,
      paymentMethod,
      createdAt: Date.now(),
      updatedAt: Date.now(),
      estimatedDelivery: "30-45 minutes",
    };
    addOrder(newOrder);

    // Simulate order progression with realistic timings
    const stages: Array<[OrderStatus, number]> = [
      ["Confirmed", 5_000],
      ["Preparing", 35_000],
      ["Baking", 95_000],
      ["Ready", 185_000],
      ["OutForDelivery", 305_000],
    ];
    for (const [status, delay] of stages) {
      const capturedStatus = status;
      const capturedDelay = delay;
      setTimeout(() => {
        updateOrderStatus(newOrder.id, capturedStatus);
      }, capturedDelay);
    }

    return newOrder;
  };

  return {
    orders,
    placeOrder,
    updateOrderStatus,
    getOrder: useOrderStore.getState().getOrder,
  };
}

export function useOrderById(orderId: string) {
  const orders = useOrderStore((s) => s.orders);
  return orders.find((o) => o.id === orderId);
}
