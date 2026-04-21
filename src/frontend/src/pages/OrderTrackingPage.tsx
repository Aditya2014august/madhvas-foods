import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Link, useParams } from "@tanstack/react-router";
import {
  ArrowLeft,
  CheckCircle2,
  CircleDot,
  Clock,
  CreditCard,
  MapPin,
  Phone,
  RefreshCw,
  Timer,
  User,
} from "lucide-react";
import { motion } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { useOrderById } from "../hooks/useOrders";
import {
  ORDER_STATUS_STEPS,
  type OrderStatus,
  STATUS_ICONS,
  STATUS_LABELS,
} from "../types";
import { NotFound } from "./NotFound";

/* ── Status-specific messaging ── */
const STATUS_MESSAGES: Record<OrderStatus, string> = {
  Placed: "We've received your order and will confirm it shortly.",
  Confirmed: "Your order is confirmed! Our kitchen is getting ready.",
  Preparing: "Our chefs are crafting your food with love. 👨‍🍳",
  Baking: "Your food is baking / cooking hot. Almost ready! 🔥",
  Ready: "Your order is packed and ready for dispatch!",
  OutForDelivery:
    "Your food is on the way! Our delivery partner is heading to you. 🛵",
  Delivered: "Your order has been delivered. Enjoy your meal! 🎉",
};

const STATUS_BADGE_STYLE: Record<
  OrderStatus,
  { bg: string; text: string; border: string }
> = {
  Placed: {
    bg: "bg-muted",
    text: "text-muted-foreground",
    border: "border-border",
  },
  Confirmed: {
    bg: "bg-blue-50",
    text: "text-blue-700",
    border: "border-blue-200",
  },
  Preparing: {
    bg: "bg-amber-50",
    text: "text-amber-700",
    border: "border-amber-200",
  },
  Baking: {
    bg: "bg-orange-50",
    text: "text-orange-700",
    border: "border-orange-200",
  },
  Ready: {
    bg: "bg-purple-50",
    text: "text-purple-700",
    border: "border-purple-200",
  },
  OutForDelivery: {
    bg: "bg-primary/10",
    text: "text-primary",
    border: "border-primary/30",
  },
  Delivered: {
    bg: "bg-green-50",
    text: "text-green-700",
    border: "border-green-200",
  },
};

/* ── Step state helpers ── */
function getStepState(idx: number, currentIdx: number) {
  if (idx < currentIdx) return "done";
  if (idx === currentIdx) return "active";
  return "pending";
}

/* ── Timestamp store: records when each step was first reached ── */
function useStepTimestamps(orderId: string, currentStatus: OrderStatus) {
  const key = `madhvas-timestamps-${orderId}`;
  const [timestamps, setTimestamps] = useState<
    Partial<Record<OrderStatus, number>>
  >(() => {
    try {
      return JSON.parse(localStorage.getItem(key) ?? "{}");
    } catch {
      return {};
    }
  });
  const prevStatus = useRef<OrderStatus | null>(null);

  useEffect(() => {
    if (prevStatus.current !== currentStatus) {
      setTimestamps((prev) => {
        if (prev[currentStatus]) return prev;
        const next = { ...prev, [currentStatus]: Date.now() };
        localStorage.setItem(key, JSON.stringify(next));
        return next;
      });
      prevStatus.current = currentStatus;
    }
  }, [currentStatus, key]);

  return timestamps;
}

/* ── Format short time ── */
function formatTime(ts: number) {
  return new Date(ts).toLocaleTimeString("en-IN", {
    hour: "2-digit",
    minute: "2-digit",
  });
}

/* ── Progress bar fill percentage ── */
function progressPercent(currentIdx: number, total: number) {
  if (total <= 1) return 0;
  return (currentIdx / (total - 1)) * 100;
}

/* ─────────────────────────────── */
export function OrderTrackingPage() {
  const { orderId } = useParams({ from: "/orders/$orderId" });
  const order = useOrderById(orderId);
  const [lastRefresh, setLastRefresh] = useState(Date.now());
  const [refreshing, setRefreshing] = useState(false);

  /* ── Auto-refresh every 10 seconds ── */
  useEffect(() => {
    const id = setInterval(() => {
      setLastRefresh(Date.now());
    }, 10_000);
    return () => clearInterval(id);
  }, []);

  const handleManualRefresh = () => {
    setRefreshing(true);
    setTimeout(() => {
      setLastRefresh(Date.now());
      setRefreshing(false);
    }, 600);
  };

  const timestamps = useStepTimestamps(orderId, order?.status ?? "Placed");

  if (!order) return <NotFound />;

  const currentStepIndex = ORDER_STATUS_STEPS.indexOf(order.status);
  const isDelivered = order.status === "Delivered";
  const badgeStyle = STATUS_BADGE_STYLE[order.status];
  const fill = progressPercent(currentStepIndex, ORDER_STATUS_STEPS.length);

  return (
    <div className="max-w-2xl mx-auto px-4 py-6 space-y-5">
      {/* ── Back + refresh row ── */}
      <div className="flex items-center justify-between">
        <Link
          to="/orders"
          data-ocid="order_tracking.back_link"
          className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-primary transition-smooth"
        >
          <ArrowLeft size={15} />
          Back to Orders
        </Link>
        <button
          type="button"
          onClick={handleManualRefresh}
          data-ocid="order_tracking.refresh_button"
          className="flex items-center gap-1 text-xs text-muted-foreground hover:text-primary transition-smooth"
        >
          <RefreshCw size={13} className={refreshing ? "animate-spin" : ""} />
          Refreshed{" "}
          {new Date(lastRefresh).toLocaleTimeString("en-IN", {
            hour: "2-digit",
            minute: "2-digit",
          })}
        </button>
      </div>

      {/* ── Order header card ── */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-card rounded-2xl border border-border p-5 space-y-4"
      >
        <div className="flex items-start justify-between gap-3">
          <div>
            <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
              Order
            </p>
            <h1 className="font-display font-bold text-xl text-foreground mt-0.5">
              #{order.id}
            </h1>
            <p className="text-[11px] text-muted-foreground mt-0.5 flex items-center gap-1">
              <Clock size={10} />
              {new Date(order.createdAt).toLocaleString("en-IN", {
                day: "numeric",
                month: "short",
                year: "numeric",
                hour: "2-digit",
                minute: "2-digit",
              })}
            </p>
          </div>
          <div className="text-right">
            <p className="font-bold text-xl text-foreground">₹{order.total}</p>
            <p className="text-xs text-muted-foreground">
              {order.items.reduce((a, i) => a + i.quantity, 0)} item
              {order.items.reduce((a, i) => a + i.quantity, 0) !== 1 ? "s" : ""}
            </p>
            <Badge
              className={`mt-1.5 badge-status border text-[10px] font-bold ${badgeStyle.bg} ${badgeStyle.text} ${badgeStyle.border}`}
              variant="outline"
              data-ocid="order_tracking.status_badge"
            >
              {STATUS_ICONS[order.status]} {STATUS_LABELS[order.status]}
            </Badge>
          </div>
        </div>

        {/* Live status message strip */}
        <div
          className={`rounded-xl p-3.5 border ${isDelivered ? "bg-green-50 border-green-200" : "bg-primary/8 border-primary/20"}`}
        >
          <p
            className={`text-sm font-semibold flex items-center gap-2 ${isDelivered ? "text-green-700" : "text-primary"}`}
          >
            <span className="text-lg">{STATUS_ICONS[order.status]}</span>
            {STATUS_LABELS[order.status]}
          </p>
          <p className="text-xs text-muted-foreground mt-1">
            {STATUS_MESSAGES[order.status]}
          </p>
          {order.estimatedDelivery && !isDelivered && (
            <div className="flex items-center gap-1.5 mt-2">
              <Timer size={12} className="text-primary" />
              <p className="text-xs font-semibold text-primary">
                Est. delivery: {order.estimatedDelivery}
              </p>
            </div>
          )}
        </div>
      </motion.div>

      {/* ── Live Tracking Stepper ── */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="bg-card rounded-2xl border border-border p-5"
        data-ocid="order_tracking.stepper"
      >
        <div className="flex items-center justify-between mb-5">
          <h2 className="font-display font-bold text-base text-foreground">
            Live Tracking
          </h2>
          {!isDelivered && (
            <span className="flex items-center gap-1 text-[10px] font-semibold text-primary bg-primary/8 border border-primary/20 rounded-full px-2.5 py-1">
              <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
              Live
            </span>
          )}
        </div>

        {/* Progress bar (horizontal fill) */}
        <div className="relative h-1.5 bg-border rounded-full mb-6 overflow-hidden">
          <motion.div
            className="absolute left-0 top-0 h-full rounded-full gradient-primary"
            initial={{ width: "0%" }}
            animate={{ width: `${fill}%` }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          />
        </div>

        {/* Steps list */}
        <div className="relative">
          {/* Vertical connector line */}
          <div className="absolute left-[18px] top-5 bottom-5 w-0.5 bg-border" />
          <motion.div
            className="absolute left-[18px] top-5 w-0.5 gradient-primary"
            initial={{ height: "0%" }}
            animate={{ height: `${fill}%` }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          />

          <div className="space-y-0">
            {ORDER_STATUS_STEPS.map((step, idx) => {
              const state = getStepState(idx, currentStepIndex);
              const ts = timestamps[step];
              const isLast = idx === ORDER_STATUS_STEPS.length - 1;

              return (
                <motion.div
                  key={step}
                  data-ocid={`tracking.step.${idx + 1}`}
                  initial={{ opacity: 0, x: -8 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.07 }}
                  className={`relative flex items-start gap-4 pl-12 ${isLast ? "pb-0" : "pb-5"}`}
                >
                  {/* Step icon */}
                  <div
                    className={`absolute left-0 w-9 h-9 rounded-full flex items-center justify-center z-10 border-2 transition-all duration-500 ${
                      state === "done"
                        ? "bg-primary border-primary text-primary-foreground shadow-sm"
                        : state === "active"
                          ? "bg-primary border-primary text-primary-foreground shadow-md"
                          : "bg-card border-border text-muted-foreground"
                    }`}
                  >
                    {state === "done" ? (
                      <CheckCircle2 size={16} />
                    ) : state === "active" ? (
                      <motion.span
                        className="text-base"
                        animate={{ scale: [1, 1.2, 1] }}
                        transition={{
                          repeat: Number.POSITIVE_INFINITY,
                          duration: 1.5,
                        }}
                      >
                        {STATUS_ICONS[step]}
                      </motion.span>
                    ) : (
                      <CircleDot size={14} className="opacity-40" />
                    )}
                  </div>

                  {/* Step text */}
                  <div className="flex-1 min-w-0 pt-1">
                    <div className="flex items-center justify-between gap-2">
                      <p
                        className={`text-sm font-semibold leading-tight ${
                          state === "pending"
                            ? "text-muted-foreground"
                            : "text-foreground"
                        }`}
                      >
                        {STATUS_LABELS[step]}
                      </p>
                      {ts && (
                        <span className="text-[10px] font-medium text-muted-foreground flex-shrink-0">
                          {formatTime(ts)}
                        </span>
                      )}
                    </div>

                    {state === "active" && (
                      <motion.p
                        className="text-xs text-primary font-medium mt-0.5"
                        animate={{ opacity: [0.6, 1, 0.6] }}
                        transition={{
                          repeat: Number.POSITIVE_INFINITY,
                          duration: 2,
                        }}
                      >
                        In progress…
                      </motion.p>
                    )}
                    {state === "done" && ts && (
                      <p className="text-[11px] text-muted-foreground mt-0.5">
                        Completed
                      </p>
                    )}
                    {state === "pending" && (
                      <p className="text-[11px] text-muted-foreground mt-0.5">
                        Upcoming
                      </p>
                    )}
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </motion.div>

      {/* ── Items ordered ── */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.15 }}
        className="bg-card rounded-2xl border border-border p-5 space-y-3"
        data-ocid="order_tracking.items_card"
      >
        <h2 className="font-display font-bold text-base text-foreground">
          Items Ordered
        </h2>
        <div className="space-y-3">
          {order.items.map((item, idx) => (
            <div
              key={`${item.menuItemId}-${idx}`}
              data-ocid={`order_detail.item.${idx + 1}`}
              className="flex items-center gap-3"
            >
              <img
                src={item.image}
                alt={item.name}
                className="w-12 h-12 rounded-xl object-cover flex-shrink-0 shadow-sm"
              />
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold font-display line-clamp-1 text-foreground">
                  {item.name}
                </p>
                <p className="text-xs text-muted-foreground">
                  Qty: {item.quantity}
                </p>
              </div>
              <span className="text-sm font-bold text-foreground flex-shrink-0">
                ₹{item.price * item.quantity}
              </span>
            </div>
          ))}
        </div>
        <Separator />
        <div className="flex items-center justify-between">
          <span className="text-sm font-semibold text-foreground">
            Order Total
          </span>
          <span className="text-base font-bold text-foreground">
            ₹{order.total}
          </span>
        </div>
      </motion.div>

      {/* ── Delivery details ── */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="bg-card rounded-2xl border border-border p-5 space-y-4"
        data-ocid="order_tracking.delivery_card"
      >
        <h2 className="font-display font-bold text-base text-foreground">
          Delivery Details
        </h2>

        <div className="space-y-3">
          {/* Recipient */}
          <div className="flex items-start gap-3">
            <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
              <User size={14} className="text-primary" />
            </div>
            <div>
              <p className="text-xs text-muted-foreground">Recipient</p>
              <p className="text-sm font-semibold text-foreground">
                {order.deliveryAddress.name}
              </p>
              <p className="text-xs text-muted-foreground">
                {order.deliveryAddress.phone}
              </p>
            </div>
          </div>

          <Separator />

          {/* Address */}
          <div className="flex items-start gap-3">
            <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
              <MapPin size={14} className="text-primary" />
            </div>
            <div>
              <p className="text-xs text-muted-foreground">Delivery address</p>
              <p className="text-sm font-semibold text-foreground">
                {order.deliveryAddress.address}
              </p>
              {order.deliveryAddress.landmark && (
                <p className="text-xs text-muted-foreground mt-0.5">
                  Near: {order.deliveryAddress.landmark}
                </p>
              )}
            </div>
          </div>

          <Separator />

          {/* Payment */}
          <div className="flex items-start gap-3">
            <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
              <CreditCard size={14} className="text-primary" />
            </div>
            <div>
              <p className="text-xs text-muted-foreground">Payment method</p>
              <p className="text-sm font-semibold text-foreground">
                {order.paymentMethod === "cod"
                  ? "Cash on Delivery"
                  : order.paymentMethod === "card"
                    ? "Card / UPI"
                    : order.paymentMethod}
              </p>
              <p className="text-xs text-muted-foreground">
                ₹{order.total} to be paid
              </p>
            </div>
          </div>
        </div>
      </motion.div>

      {/* ── Support card ── */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.25 }}
        className="bg-muted/40 rounded-2xl border border-border p-4 flex items-center justify-between gap-3"
        data-ocid="order_tracking.support_card"
      >
        <div>
          <p className="text-sm font-semibold text-foreground">Need help?</p>
          <p className="text-xs text-muted-foreground">
            Call us at +91 82872 86500 — we're here for you.
          </p>
        </div>
        <a href="tel:8287286500" data-ocid="order_tracking.call_support_button">
          <Button
            size="sm"
            className="rounded-full gap-1.5 gradient-primary text-primary-foreground font-semibold"
          >
            <Phone size={13} />
            Call Now
          </Button>
        </a>
      </motion.div>

      {/* ── Order again CTA (post-delivery) ── */}
      {isDelivered && (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3 }}
          className="bg-green-50 border border-green-200 rounded-2xl p-5 text-center space-y-3"
          data-ocid="order_tracking.delivered_card"
        >
          <p className="text-3xl">🎉</p>
          <p className="font-display font-bold text-base text-green-800">
            Order Delivered Successfully!
          </p>
          <p className="text-sm text-green-700">
            Hope you enjoyed your meal. Order again for another delicious
            experience!
          </p>
          <Link to="/">
            <Button
              className="gradient-primary text-primary-foreground rounded-full px-8 font-semibold"
              data-ocid="order_tracking.order_again_button"
            >
              Order Again
            </Button>
          </Link>
        </motion.div>
      )}
    </div>
  );
}
