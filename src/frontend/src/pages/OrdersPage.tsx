import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Link } from "@tanstack/react-router";
import { ChevronRight, Clock, PackageCheck, ShoppingBag } from "lucide-react";
import { motion } from "motion/react";
import { useEffect, useState } from "react";
import { EmptyState } from "../components/EmptyState";
import { useOrders } from "../hooks/useOrders";
import type { OrderStatus } from "../types";
import { STATUS_ICONS, STATUS_LABELS } from "../types";

const STATUS_BADGE_STYLE: Record<
  OrderStatus,
  { bg: string; text: string; border: string; dot: string }
> = {
  Placed: {
    bg: "bg-muted",
    text: "text-muted-foreground",
    border: "border-border",
    dot: "bg-muted-foreground",
  },
  Confirmed: {
    bg: "bg-blue-50",
    text: "text-blue-700",
    border: "border-blue-200",
    dot: "bg-blue-500",
  },
  Preparing: {
    bg: "bg-amber-50",
    text: "text-amber-700",
    border: "border-amber-200",
    dot: "bg-amber-500",
  },
  Baking: {
    bg: "bg-orange-50",
    text: "text-orange-700",
    border: "border-orange-200",
    dot: "bg-orange-500",
  },
  Ready: {
    bg: "bg-purple-50",
    text: "text-purple-700",
    border: "border-purple-200",
    dot: "bg-purple-500",
  },
  OutForDelivery: {
    bg: "bg-primary/10",
    text: "text-primary",
    border: "border-primary/30",
    dot: "bg-primary",
  },
  Delivered: {
    bg: "bg-green-50",
    text: "text-green-700",
    border: "border-green-200",
    dot: "bg-green-500",
  },
};

const ACTIVE_STATUSES: OrderStatus[] = [
  "Placed",
  "Confirmed",
  "Preparing",
  "Baking",
  "Ready",
  "OutForDelivery",
];

function OrderCardSkeleton() {
  return (
    <div className="bg-card rounded-2xl border border-border p-4">
      <div className="flex items-start justify-between gap-3">
        <div className="flex gap-3">
          <div className="flex -space-x-2">
            {[0, 1, 2].map((i) => (
              <Skeleton key={i} className="w-10 h-10 rounded-xl" />
            ))}
          </div>
          <div className="space-y-1.5">
            <Skeleton className="h-4 w-28" />
            <Skeleton className="h-3 w-44" />
            <Skeleton className="h-3 w-24" />
          </div>
        </div>
        <Skeleton className="h-6 w-20 rounded-full" />
      </div>
    </div>
  );
}

export function OrdersPage() {
  const { orders } = useOrders();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 400);
    return () => clearTimeout(t);
  }, []);

  return (
    <div className="max-w-2xl mx-auto px-4 py-6 space-y-5">
      {/* Page header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold font-display text-foreground">
            Your Orders
          </h1>
          <p className="text-sm text-muted-foreground mt-0.5">
            {orders.length > 0
              ? `${orders.length} order${orders.length !== 1 ? "s" : ""} placed`
              : "Track all your deliveries here"}
          </p>
        </div>
        {orders.length > 0 && (
          <Link to="/">
            <Button
              variant="outline"
              size="sm"
              className="rounded-full gap-1.5 text-xs"
              data-ocid="orders.order_again_button"
            >
              <ShoppingBag size={13} />
              Order Again
            </Button>
          </Link>
        )}
      </div>

      {/* Active orders banner */}
      {orders.some((o) => ACTIVE_STATUSES.includes(o.status)) && (
        <div className="bg-primary/8 border border-primary/20 rounded-2xl p-3.5 flex items-center gap-3">
          <span className="text-xl animate-bounce">🛵</span>
          <div>
            <p className="text-sm font-semibold text-primary">
              You have active orders!
            </p>
            <p className="text-xs text-muted-foreground">
              Tap any card to track live status
            </p>
          </div>
        </div>
      )}

      {loading ? (
        <div className="space-y-3">
          {[0, 1, 2].map((i) => (
            <OrderCardSkeleton key={i} />
          ))}
        </div>
      ) : orders.length === 0 ? (
        <EmptyState variant="orders" />
      ) : (
        <div data-ocid="orders.list" className="space-y-3">
          {orders.map((order, idx) => {
            const style = STATUS_BADGE_STYLE[order.status];
            const isActive = ACTIVE_STATUSES.includes(order.status);
            const itemsText = order.items
              .map((i) => `${i.name} ×${i.quantity}`)
              .join(", ");
            return (
              <motion.div
                key={order.id}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.06, duration: 0.3 }}
              >
                <Link
                  to="/orders/$orderId"
                  params={{ orderId: order.id }}
                  data-ocid={`orders.item.${idx + 1}`}
                  className="block bg-card rounded-2xl border border-border p-4 transition-smooth hover:shadow-card hover:border-primary/30 group"
                >
                  <div className="flex items-start justify-between gap-3">
                    {/* Left: thumb stack + info */}
                    <div className="flex gap-3 min-w-0 flex-1">
                      <div className="flex -space-x-2 flex-shrink-0">
                        {order.items.slice(0, 3).map((item, i) => (
                          <img
                            key={`${item.menuItemId}-${i}`}
                            src={item.image}
                            alt={item.name}
                            className="w-11 h-11 rounded-xl object-cover border-2 border-card shadow-sm"
                          />
                        ))}
                        {order.items.length > 3 && (
                          <div className="w-11 h-11 rounded-xl bg-muted border-2 border-card flex items-center justify-center text-xs font-bold text-muted-foreground">
                            +{order.items.length - 3}
                          </div>
                        )}
                      </div>

                      <div className="min-w-0 flex-1">
                        <div className="flex items-center gap-2">
                          <p className="font-semibold text-sm font-display text-foreground">
                            Order #{order.id}
                          </p>
                          {isActive && (
                            <span className="flex h-2 w-2">
                              <span className="animate-ping absolute inline-flex h-2 w-2 rounded-full bg-primary opacity-75" />
                              <span className="relative inline-flex rounded-full h-2 w-2 bg-primary" />
                            </span>
                          )}
                        </div>
                        <p className="text-xs text-muted-foreground mt-0.5 truncate">
                          {itemsText.length > 55
                            ? `${itemsText.slice(0, 55)}…`
                            : itemsText}
                        </p>
                        <div className="flex items-center gap-3 mt-1.5">
                          <span className="text-[11px] text-muted-foreground flex items-center gap-1">
                            <Clock size={10} />
                            {new Date(order.createdAt).toLocaleDateString(
                              "en-IN",
                              {
                                day: "numeric",
                                month: "short",
                                hour: "2-digit",
                                minute: "2-digit",
                              },
                            )}
                          </span>
                          <span className="text-xs font-bold text-foreground">
                            ₹{order.total}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Right: status + chevron */}
                    <div className="flex flex-col items-end gap-2 flex-shrink-0">
                      <Badge
                        className={`badge-status border text-[10px] font-bold px-2.5 py-1 ${style.bg} ${style.text} ${style.border}`}
                        variant="outline"
                      >
                        <span
                          className={`w-1.5 h-1.5 rounded-full ${style.dot} ${isActive ? "animate-pulse" : ""}`}
                        />
                        {STATUS_ICONS[order.status]}{" "}
                        {STATUS_LABELS[order.status]}
                      </Badge>
                      <ChevronRight
                        size={15}
                        className="text-muted-foreground group-hover:text-primary transition-smooth"
                      />
                    </div>
                  </div>

                  {/* Delivery address */}
                  <div className="mt-3 pt-3 border-t border-border flex items-center gap-1.5">
                    <PackageCheck
                      size={12}
                      className="text-muted-foreground flex-shrink-0"
                    />
                    <p className="text-[11px] text-muted-foreground truncate">
                      {order.deliveryAddress.address}
                    </p>
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </div>
      )}
    </div>
  );
}
