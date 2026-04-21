import type { backendInterface, MenuItem, OrderPublic, MenuCategory, OrderStatus } from "../backend";
import { ExternalBlob } from "../backend";

const makeBlob = (url: string): ExternalBlob => ExternalBlob.fromURL(url);

const menuItems: MenuItem[] = [
  // Pizza
  { id: BigInt(1), name: "Margherita Pizza", description: "Classic tomato sauce with fresh mozzarella and basil leaves", available: true, category: "Pizza" as unknown as MenuCategory, image: makeBlob("https://images.unsplash.com/photo-1574071318508-1cdbab80d002?w=600&q=80"), price: BigInt(249) },
  { id: BigInt(2), name: "Pepperoni Pizza", description: "Loaded with spicy pepperoni slices on rich tomato sauce", available: true, category: "Pizza" as unknown as MenuCategory, image: makeBlob("https://images.unsplash.com/photo-1628840042765-356cda07504e?w=600&q=80"), price: BigInt(299) },
  { id: BigInt(3), name: "BBQ Chicken Pizza", description: "Smoky BBQ sauce, grilled chicken and caramelized onions", available: true, category: "Pizza" as unknown as MenuCategory, image: makeBlob("https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=600&q=80"), price: BigInt(329) },
  // Burger
  { id: BigInt(4), name: "Classic Beef Burger", description: "Juicy beef patty with lettuce, tomato and special sauce", available: true, category: "Burger" as unknown as MenuCategory, image: makeBlob("https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=600&q=80"), price: BigInt(199) },
  { id: BigInt(5), name: "Veggie Delight Burger", description: "Crispy vegetable patty with fresh toppings and mayo", available: true, category: "Burger" as unknown as MenuCategory, image: makeBlob("https://images.unsplash.com/photo-1520072959219-c595dc870360?w=600&q=80"), price: BigInt(169) },
  { id: BigInt(6), name: "Spicy Crunch Burger", description: "Fiery chicken patty with jalapenos and sriracha sauce", available: true, category: "Burger" as unknown as MenuCategory, image: makeBlob("https://images.unsplash.com/photo-1553979459-d2229ba7433b?w=600&q=80"), price: BigInt(219) },
  // Momos
  { id: BigInt(7), name: "Steamed Chicken Momos", description: "Tender chicken filled dumplings steamed to perfection", available: true, category: "Momos" as unknown as MenuCategory, image: makeBlob("https://images.unsplash.com/photo-1534422298391-e4f8c172dddb?w=600&q=80"), price: BigInt(149) },
  { id: BigInt(8), name: "Pan Fried Veg Momos", description: "Crispy pan-fried vegetable momos with spicy chilli sauce", available: true, category: "Momos" as unknown as MenuCategory, image: makeBlob("https://images.unsplash.com/photo-1563245372-f21724e3856d?w=600&q=80"), price: BigInt(129) },
  { id: BigInt(9), name: "Tandoori Momos", description: "Marinated momos grilled in tandoor with mint chutney", available: true, category: "Momos" as unknown as MenuCategory, image: makeBlob("https://images.unsplash.com/photo-1496116218417-1a781b1c416c?w=600&q=80"), price: BigInt(169) },
  // Maggi
  { id: BigInt(10), name: "Classic Maggi", description: "Original Maggi noodles with authentic masala seasoning", available: true, category: "Maggi" as unknown as MenuCategory, image: makeBlob("https://images.unsplash.com/photo-1585032226651-759b368d7246?w=600&q=80"), price: BigInt(79) },
  { id: BigInt(11), name: "Cheese Maggi", description: "Creamy Maggi noodles loaded with melted cheese", available: true, category: "Maggi" as unknown as MenuCategory, image: makeBlob("https://images.unsplash.com/photo-1569718212165-3a8278d5f624?w=600&q=80"), price: BigInt(99) },
  { id: BigInt(12), name: "Masala Maggi", description: "Spicy Maggi tossed with vegetables and extra masala", available: true, category: "Maggi" as unknown as MenuCategory, image: makeBlob("https://images.unsplash.com/photo-1602253057119-44d745d9b860?w=600&q=80"), price: BigInt(89) },
  // Sandwiches
  { id: BigInt(13), name: "Club Sandwich", description: "Triple-layered sandwich with chicken, egg and veggies", available: true, category: "Sandwiches" as unknown as MenuCategory, image: makeBlob("https://images.unsplash.com/photo-1528735602780-2552fd46c7af?w=600&q=80"), price: BigInt(179) },
  { id: BigInt(14), name: "Grilled Paneer Sandwich", description: "Spiced paneer grilled with capsicum in toasted bread", available: true, category: "Sandwiches" as unknown as MenuCategory, image: makeBlob("https://images.unsplash.com/photo-1621447504864-d8686e12698c?w=600&q=80"), price: BigInt(159) },
  { id: BigInt(15), name: "BLT Sandwich", description: "Bacon, crisp lettuce and juicy tomato on sourdough bread", available: true, category: "Sandwiches" as unknown as MenuCategory, image: makeBlob("https://images.unsplash.com/photo-1553909489-cd47e0907980?w=600&q=80"), price: BigInt(189) },
  // Beverages
  { id: BigInt(16), name: "Mango Lassi", description: "Thick and creamy yogurt blended with fresh Alphonso mango", available: true, category: "Beverages" as unknown as MenuCategory, image: makeBlob("https://images.unsplash.com/photo-1527661591475-527312dd65f5?w=600&q=80"), price: BigInt(89) },
  { id: BigInt(17), name: "Cold Coffee", description: "Chilled espresso blended with milk and vanilla ice cream", available: true, category: "Beverages" as unknown as MenuCategory, image: makeBlob("https://images.unsplash.com/photo-1461023058943-07fcbe16d735?w=600&q=80"), price: BigInt(99) },
  { id: BigInt(18), name: "Masala Chai", description: "Aromatic Indian tea brewed with ginger, cardamom and spices", available: true, category: "Beverages" as unknown as MenuCategory, image: makeBlob("https://images.unsplash.com/photo-1571934811356-5cc061b6821f?w=600&q=80"), price: BigInt(49) },
  { id: BigInt(19), name: "Fresh Lime Soda", description: "Zesty lime juice with soda water and a hint of mint", available: true, category: "Beverages" as unknown as MenuCategory, image: makeBlob("https://images.unsplash.com/photo-1523677011781-c91d1bbe2f9e?w=600&q=80"), price: BigInt(59) },
];

const sampleOrder: OrderPublic = {
  id: BigInt(1),
  orderNumber: "MF-1001",
  customerName: "Rahul Sharma",
  customerPhone: "9876543210",
  deliveryAddress: "12, Park Street, New Delhi",
  paymentMethod: "Cash on Delivery",
  totalAmount: BigInt(448),
  timestamp: BigInt(Date.now() * 1_000_000),
  status: "Preparing" as unknown as OrderStatus,
  items: [
    { itemId: BigInt(1), name: "Margherita Pizza", quantity: BigInt(1), price: BigInt(249) },
    { itemId: BigInt(16), name: "Mango Lassi", quantity: BigInt(1), price: BigInt(89) },
    { itemId: BigInt(10), name: "Classic Maggi", quantity: BigInt(1), price: BigInt(79) },
  ],
};

export const mockBackend: backendInterface = {
  getMenuItems: async () => menuItems,
  getMenuItemsByCategory: async (category: MenuCategory) =>
    menuItems.filter((item) => item.category === category),
  getOrder: async (_id) => sampleOrder,
  getOrderStatus: async (_id) => "Preparing" as unknown as OrderStatus,
  getOrdersByStatus: async (_status) => [sampleOrder],
  placeOrder: async (request) => ({
    id: BigInt(2),
    orderNumber: "MF-1002",
    customerName: request.customerName,
    customerPhone: request.customerPhone,
    deliveryAddress: request.deliveryAddress,
    paymentMethod: request.paymentMethod,
    totalAmount: BigInt(299),
    timestamp: BigInt(Date.now() * 1_000_000),
    status: "Preparing" as unknown as OrderStatus,
    items: request.items.map(([itemId, qty]) => ({
      itemId,
      name: menuItems.find((m) => m.id === itemId)?.name ?? "Item",
      quantity: qty,
      price: menuItems.find((m) => m.id === itemId)?.price ?? BigInt(0),
    })),
  }),
  transform: async (input) => ({
    status: BigInt(200),
    body: input.response.body,
    headers: input.response.headers,
  }),
  updateOrderStatus: async () => true,
  _immutableObjectStorageBlobsAreLive: async () => [],
  _immutableObjectStorageBlobsToDelete: async () => [],
  _immutableObjectStorageConfirmBlobDeletion: async () => {},
  _immutableObjectStorageCreateCertificate: async () => ({ method: "", blob_hash: "" }),
  _immutableObjectStorageRefillCashier: async () => ({}),
  _immutableObjectStorageUpdateGatewayPrincipals: async () => {},
};
