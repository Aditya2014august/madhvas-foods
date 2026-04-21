import { az as create, aA as persist } from "./index-Hyraa-Jt.js";
const useOrderStore = create()(
  persist(
    (set, get) => ({
      orders: [],
      addOrder: (order) => set((s) => ({ orders: [order, ...s.orders] })),
      updateOrderStatus: (orderId, status) => set((s) => ({
        orders: s.orders.map(
          (o) => o.id === orderId ? { ...o, status, updatedAt: Date.now() } : o
        )
      })),
      getOrder: (orderId) => get().orders.find((o) => o.id === orderId)
    }),
    { name: "madhvas-orders" }
  )
);
function useOrders() {
  const { orders, addOrder, updateOrderStatus } = useOrderStore();
  const placeOrder = (items, deliveryAddress, total, paymentMethod) => {
    const newOrder = {
      id: `MF${Date.now()}`,
      items,
      status: "Placed",
      total,
      deliveryAddress,
      paymentMethod,
      createdAt: Date.now(),
      updatedAt: Date.now(),
      estimatedDelivery: "30-45 minutes"
    };
    addOrder(newOrder);
    const stages = [
      ["Confirmed", 5e3],
      ["Preparing", 35e3],
      ["Baking", 95e3],
      ["Ready", 185e3],
      ["OutForDelivery", 305e3]
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
    getOrder: useOrderStore.getState().getOrder
  };
}
function useOrderById(orderId) {
  const orders = useOrderStore((s) => s.orders);
  return orders.find((o) => o.id === orderId);
}
export {
  useOrderById as a,
  useOrders as u
};
