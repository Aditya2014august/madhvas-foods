export type Category =
  | "Pizza"
  | "Burger"
  | "Momos"
  | "Maggi"
  | "Sandwiches"
  | "Beverages";

export type OrderStatus =
  | "Placed"
  | "Confirmed"
  | "Preparing"
  | "Baking"
  | "Ready"
  | "OutForDelivery"
  | "Delivered";

export interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
  category: Category;
  image: string;
  isVeg: boolean;
  isPopular?: boolean;
  rating?: number;
  prepTime?: string;
}

export interface CartItem {
  item: MenuItem;
  quantity: number;
}

export interface OrderItem {
  menuItemId: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
}

export interface DeliveryAddress {
  name: string;
  phone: string;
  address: string;
  landmark?: string;
}

export interface Order {
  id: string;
  items: OrderItem[];
  status: OrderStatus;
  total: number;
  deliveryAddress: DeliveryAddress;
  paymentMethod: string;
  createdAt: number;
  updatedAt: number;
  estimatedDelivery?: string;
}

export const CATEGORIES: Category[] = [
  "Pizza",
  "Burger",
  "Momos",
  "Maggi",
  "Sandwiches",
  "Beverages",
];

export const ORDER_STATUS_STEPS: OrderStatus[] = [
  "Placed",
  "Confirmed",
  "Preparing",
  "Baking",
  "Ready",
  "OutForDelivery",
  "Delivered",
];

export const STATUS_LABELS: Record<OrderStatus, string> = {
  Placed: "Order Placed",
  Confirmed: "Order Confirmed",
  Preparing: "Preparing Your Food",
  Baking: "Baking / Cooking",
  Ready: "Ready for Pickup",
  OutForDelivery: "Out for Delivery",
  Delivered: "Delivered",
};

export const STATUS_ICONS: Record<OrderStatus, string> = {
  Placed: "📋",
  Confirmed: "✅",
  Preparing: "👨‍🍳",
  Baking: "🔥",
  Ready: "📦",
  OutForDelivery: "🛵",
  Delivered: "🎉",
};
