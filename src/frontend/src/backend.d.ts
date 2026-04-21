import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export class ExternalBlob {
    getBytes(): Promise<Uint8Array<ArrayBuffer>>;
    getDirectURL(): string;
    static fromURL(url: string): ExternalBlob;
    static fromBytes(blob: Uint8Array<ArrayBuffer>): ExternalBlob;
    withUploadProgress(onProgress: (percentage: number) => void): ExternalBlob;
}
export interface PlaceOrderRequest {
    customerName: string;
    deliveryAddress: string;
    paymentMethod: string;
    customerPhone: string;
    items: Array<[MenuItemId, bigint]>;
}
export type Timestamp = bigint;
export interface TransformationOutput {
    status: bigint;
    body: Uint8Array;
    headers: Array<http_header>;
}
export interface OrderItem {
    itemId: MenuItemId;
    name: string;
    quantity: bigint;
    price: bigint;
}
export interface OrderPublic {
    id: OrderId;
    customerName: string;
    status: OrderStatus;
    deliveryAddress: string;
    paymentMethod: string;
    customerPhone: string;
    totalAmount: bigint;
    timestamp: Timestamp;
    items: Array<OrderItem>;
    orderNumber: string;
}
export interface http_header {
    value: string;
    name: string;
}
export interface http_request_result {
    status: bigint;
    body: Uint8Array;
    headers: Array<http_header>;
}
export interface MenuItem {
    id: MenuItemId;
    name: string;
    description: string;
    available: boolean;
    category: MenuCategory;
    image: ExternalBlob;
    price: bigint;
}
export type MenuItemId = bigint;
export interface TransformationInput {
    context: Uint8Array;
    response: http_request_result;
}
export type OrderId = bigint;
export enum MenuCategory {
    Burger = "Burger",
    Pizza = "Pizza",
    Sandwiches = "Sandwiches",
    Beverages = "Beverages",
    Maggi = "Maggi",
    Momos = "Momos"
}
export enum OrderStatus {
    Delivered = "Delivered",
    Ready = "Ready",
    Baking = "Baking",
    Preparing = "Preparing",
    OutForDelivery = "OutForDelivery"
}
export interface backendInterface {
    getMenuItems(): Promise<Array<MenuItem>>;
    getMenuItemsByCategory(category: MenuCategory): Promise<Array<MenuItem>>;
    getOrder(id: OrderId): Promise<OrderPublic | null>;
    getOrderStatus(id: OrderId): Promise<OrderStatus | null>;
    getOrdersByStatus(status: OrderStatus): Promise<Array<OrderPublic>>;
    placeOrder(request: PlaceOrderRequest): Promise<OrderPublic>;
    transform(input: TransformationInput): Promise<TransformationOutput>;
    updateOrderStatus(id: OrderId, newStatus: OrderStatus): Promise<boolean>;
}
