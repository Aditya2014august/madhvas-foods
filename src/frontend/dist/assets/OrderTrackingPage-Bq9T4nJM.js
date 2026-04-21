import { V as createLucideIcon, au as useParams, J as reactExports, W as jsxRuntimeExports, av as NotFound, aw as ORDER_STATUS_STEPS, ai as Link, aq as motion, ar as Clock, aj as Badge, as as STATUS_ICONS, at as STATUS_LABELS, an as User, am as MapPin, al as Button, ao as Phone } from "./index-Hyraa-Jt.js";
import { S as Separator } from "./separator-DOaE9Zed.js";
import { a as useOrderById } from "./useOrders-jEk9ljS2.js";
import { C as CircleCheck, a as CreditCard } from "./credit-card-CdLLAB0w.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$3 = [
  ["path", { d: "m12 19-7-7 7-7", key: "1l729n" }],
  ["path", { d: "M19 12H5", key: "x3x0zl" }]
];
const ArrowLeft = createLucideIcon("arrow-left", __iconNode$3);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$2 = [
  ["circle", { cx: "12", cy: "12", r: "10", key: "1mglay" }],
  ["circle", { cx: "12", cy: "12", r: "1", key: "41hilf" }]
];
const CircleDot = createLucideIcon("circle-dot", __iconNode$2);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$1 = [
  ["path", { d: "M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8", key: "v9h5vc" }],
  ["path", { d: "M21 3v5h-5", key: "1q7to0" }],
  ["path", { d: "M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16", key: "3uifl3" }],
  ["path", { d: "M8 16H3v5", key: "1cv678" }]
];
const RefreshCw = createLucideIcon("refresh-cw", __iconNode$1);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  ["line", { x1: "10", x2: "14", y1: "2", y2: "2", key: "14vaq8" }],
  ["line", { x1: "12", x2: "15", y1: "14", y2: "11", key: "17fdiu" }],
  ["circle", { cx: "12", cy: "14", r: "8", key: "1e1u0o" }]
];
const Timer = createLucideIcon("timer", __iconNode);
const STATUS_MESSAGES = {
  Placed: "We've received your order and will confirm it shortly.",
  Confirmed: "Your order is confirmed! Our kitchen is getting ready.",
  Preparing: "Our chefs are crafting your food with love. 👨‍🍳",
  Baking: "Your food is baking / cooking hot. Almost ready! 🔥",
  Ready: "Your order is packed and ready for dispatch!",
  OutForDelivery: "Your food is on the way! Our delivery partner is heading to you. 🛵",
  Delivered: "Your order has been delivered. Enjoy your meal! 🎉"
};
const STATUS_BADGE_STYLE = {
  Placed: {
    bg: "bg-muted",
    text: "text-muted-foreground",
    border: "border-border"
  },
  Confirmed: {
    bg: "bg-blue-50",
    text: "text-blue-700",
    border: "border-blue-200"
  },
  Preparing: {
    bg: "bg-amber-50",
    text: "text-amber-700",
    border: "border-amber-200"
  },
  Baking: {
    bg: "bg-orange-50",
    text: "text-orange-700",
    border: "border-orange-200"
  },
  Ready: {
    bg: "bg-purple-50",
    text: "text-purple-700",
    border: "border-purple-200"
  },
  OutForDelivery: {
    bg: "bg-primary/10",
    text: "text-primary",
    border: "border-primary/30"
  },
  Delivered: {
    bg: "bg-green-50",
    text: "text-green-700",
    border: "border-green-200"
  }
};
function getStepState(idx, currentIdx) {
  if (idx < currentIdx) return "done";
  if (idx === currentIdx) return "active";
  return "pending";
}
function useStepTimestamps(orderId, currentStatus) {
  const key = `madhvas-timestamps-${orderId}`;
  const [timestamps, setTimestamps] = reactExports.useState(() => {
    try {
      return JSON.parse(localStorage.getItem(key) ?? "{}");
    } catch {
      return {};
    }
  });
  const prevStatus = reactExports.useRef(null);
  reactExports.useEffect(() => {
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
function formatTime(ts) {
  return new Date(ts).toLocaleTimeString("en-IN", {
    hour: "2-digit",
    minute: "2-digit"
  });
}
function progressPercent(currentIdx, total) {
  if (total <= 1) return 0;
  return currentIdx / (total - 1) * 100;
}
function OrderTrackingPage() {
  const { orderId } = useParams({ from: "/orders/$orderId" });
  const order = useOrderById(orderId);
  const [lastRefresh, setLastRefresh] = reactExports.useState(Date.now());
  const [refreshing, setRefreshing] = reactExports.useState(false);
  reactExports.useEffect(() => {
    const id = setInterval(() => {
      setLastRefresh(Date.now());
    }, 1e4);
    return () => clearInterval(id);
  }, []);
  const handleManualRefresh = () => {
    setRefreshing(true);
    setTimeout(() => {
      setLastRefresh(Date.now());
      setRefreshing(false);
    }, 600);
  };
  const timestamps = useStepTimestamps(orderId, (order == null ? void 0 : order.status) ?? "Placed");
  if (!order) return /* @__PURE__ */ jsxRuntimeExports.jsx(NotFound, {});
  const currentStepIndex = ORDER_STATUS_STEPS.indexOf(order.status);
  const isDelivered = order.status === "Delivered";
  const badgeStyle = STATUS_BADGE_STYLE[order.status];
  const fill = progressPercent(currentStepIndex, ORDER_STATUS_STEPS.length);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-2xl mx-auto px-4 py-6 space-y-5", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        Link,
        {
          to: "/orders",
          "data-ocid": "order_tracking.back_link",
          className: "flex items-center gap-1.5 text-sm text-muted-foreground hover:text-primary transition-smooth",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowLeft, { size: 15 }),
            "Back to Orders"
          ]
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "button",
        {
          type: "button",
          onClick: handleManualRefresh,
          "data-ocid": "order_tracking.refresh_button",
          className: "flex items-center gap-1 text-xs text-muted-foreground hover:text-primary transition-smooth",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(RefreshCw, { size: 13, className: refreshing ? "animate-spin" : "" }),
            "Refreshed",
            " ",
            new Date(lastRefresh).toLocaleTimeString("en-IN", {
              hour: "2-digit",
              minute: "2-digit"
            })
          ]
        }
      )
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      motion.div,
      {
        initial: { opacity: 0, y: 12 },
        animate: { opacity: 1, y: 0 },
        className: "bg-card rounded-2xl border border-border p-5 space-y-4",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start justify-between gap-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-medium text-muted-foreground uppercase tracking-wide", children: "Order" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("h1", { className: "font-display font-bold text-xl text-foreground mt-0.5", children: [
                "#",
                order.id
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-[11px] text-muted-foreground mt-0.5 flex items-center gap-1", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Clock, { size: 10 }),
                new Date(order.createdAt).toLocaleString("en-IN", {
                  day: "numeric",
                  month: "short",
                  year: "numeric",
                  hour: "2-digit",
                  minute: "2-digit"
                })
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-right", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "font-bold text-xl text-foreground", children: [
                "₹",
                order.total
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground", children: [
                order.items.reduce((a, i) => a + i.quantity, 0),
                " item",
                order.items.reduce((a, i) => a + i.quantity, 0) !== 1 ? "s" : ""
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                Badge,
                {
                  className: `mt-1.5 badge-status border text-[10px] font-bold ${badgeStyle.bg} ${badgeStyle.text} ${badgeStyle.border}`,
                  variant: "outline",
                  "data-ocid": "order_tracking.status_badge",
                  children: [
                    STATUS_ICONS[order.status],
                    " ",
                    STATUS_LABELS[order.status]
                  ]
                }
              )
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "div",
            {
              className: `rounded-xl p-3.5 border ${isDelivered ? "bg-green-50 border-green-200" : "bg-primary/8 border-primary/20"}`,
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  "p",
                  {
                    className: `text-sm font-semibold flex items-center gap-2 ${isDelivered ? "text-green-700" : "text-primary"}`,
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-lg", children: STATUS_ICONS[order.status] }),
                      STATUS_LABELS[order.status]
                    ]
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mt-1", children: STATUS_MESSAGES[order.status] }),
                order.estimatedDelivery && !isDelivered && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1.5 mt-2", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Timer, { size: 12, className: "text-primary" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs font-semibold text-primary", children: [
                    "Est. delivery: ",
                    order.estimatedDelivery
                  ] })
                ] })
              ]
            }
          )
        ]
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      motion.div,
      {
        initial: { opacity: 0, y: 12 },
        animate: { opacity: 1, y: 0 },
        transition: { delay: 0.1 },
        className: "bg-card rounded-2xl border border-border p-5",
        "data-ocid": "order_tracking.stepper",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between mb-5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display font-bold text-base text-foreground", children: "Live Tracking" }),
            !isDelivered && /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-1 text-[10px] font-semibold text-primary bg-primary/8 border border-primary/20 rounded-full px-2.5 py-1", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "w-1.5 h-1.5 rounded-full bg-primary animate-pulse" }),
              "Live"
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "relative h-1.5 bg-border rounded-full mb-6 overflow-hidden", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
            motion.div,
            {
              className: "absolute left-0 top-0 h-full rounded-full gradient-primary",
              initial: { width: "0%" },
              animate: { width: `${fill}%` },
              transition: { duration: 0.8, ease: "easeOut" }
            }
          ) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute left-[18px] top-5 bottom-5 w-0.5 bg-border" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              motion.div,
              {
                className: "absolute left-[18px] top-5 w-0.5 gradient-primary",
                initial: { height: "0%" },
                animate: { height: `${fill}%` },
                transition: { duration: 0.8, ease: "easeOut" }
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-0", children: ORDER_STATUS_STEPS.map((step, idx) => {
              const state = getStepState(idx, currentStepIndex);
              const ts = timestamps[step];
              const isLast = idx === ORDER_STATUS_STEPS.length - 1;
              return /* @__PURE__ */ jsxRuntimeExports.jsxs(
                motion.div,
                {
                  "data-ocid": `tracking.step.${idx + 1}`,
                  initial: { opacity: 0, x: -8 },
                  animate: { opacity: 1, x: 0 },
                  transition: { delay: idx * 0.07 },
                  className: `relative flex items-start gap-4 pl-12 ${isLast ? "pb-0" : "pb-5"}`,
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "div",
                      {
                        className: `absolute left-0 w-9 h-9 rounded-full flex items-center justify-center z-10 border-2 transition-all duration-500 ${state === "done" ? "bg-primary border-primary text-primary-foreground shadow-sm" : state === "active" ? "bg-primary border-primary text-primary-foreground shadow-md" : "bg-card border-border text-muted-foreground"}`,
                        children: state === "done" ? /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { size: 16 }) : state === "active" ? /* @__PURE__ */ jsxRuntimeExports.jsx(
                          motion.span,
                          {
                            className: "text-base",
                            animate: { scale: [1, 1.2, 1] },
                            transition: {
                              repeat: Number.POSITIVE_INFINITY,
                              duration: 1.5
                            },
                            children: STATUS_ICONS[step]
                          }
                        ) : /* @__PURE__ */ jsxRuntimeExports.jsx(CircleDot, { size: 14, className: "opacity-40" })
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0 pt-1", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between gap-2", children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx(
                          "p",
                          {
                            className: `text-sm font-semibold leading-tight ${state === "pending" ? "text-muted-foreground" : "text-foreground"}`,
                            children: STATUS_LABELS[step]
                          }
                        ),
                        ts && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[10px] font-medium text-muted-foreground flex-shrink-0", children: formatTime(ts) })
                      ] }),
                      state === "active" && /* @__PURE__ */ jsxRuntimeExports.jsx(
                        motion.p,
                        {
                          className: "text-xs text-primary font-medium mt-0.5",
                          animate: { opacity: [0.6, 1, 0.6] },
                          transition: {
                            repeat: Number.POSITIVE_INFINITY,
                            duration: 2
                          },
                          children: "In progress…"
                        }
                      ),
                      state === "done" && ts && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[11px] text-muted-foreground mt-0.5", children: "Completed" }),
                      state === "pending" && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[11px] text-muted-foreground mt-0.5", children: "Upcoming" })
                    ] })
                  ]
                },
                step
              );
            }) })
          ] })
        ]
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      motion.div,
      {
        initial: { opacity: 0, y: 12 },
        animate: { opacity: 1, y: 0 },
        transition: { delay: 0.15 },
        className: "bg-card rounded-2xl border border-border p-5 space-y-3",
        "data-ocid": "order_tracking.items_card",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display font-bold text-base text-foreground", children: "Items Ordered" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-3", children: order.items.map((item, idx) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "div",
            {
              "data-ocid": `order_detail.item.${idx + 1}`,
              className: "flex items-center gap-3",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "img",
                  {
                    src: item.image,
                    alt: item.name,
                    className: "w-12 h-12 rounded-xl object-cover flex-shrink-0 shadow-sm"
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-semibold font-display line-clamp-1 text-foreground", children: item.name }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground", children: [
                    "Qty: ",
                    item.quantity
                  ] })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-sm font-bold text-foreground flex-shrink-0", children: [
                  "₹",
                  item.price * item.quantity
                ] })
              ]
            },
            `${item.menuItemId}-${idx}`
          )) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Separator, {}),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm font-semibold text-foreground", children: "Order Total" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-base font-bold text-foreground", children: [
              "₹",
              order.total
            ] })
          ] })
        ]
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      motion.div,
      {
        initial: { opacity: 0, y: 12 },
        animate: { opacity: 1, y: 0 },
        transition: { delay: 0.2 },
        className: "bg-card rounded-2xl border border-border p-5 space-y-4",
        "data-ocid": "order_tracking.delivery_card",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display font-bold text-base text-foreground", children: "Delivery Details" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start gap-3", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0", children: /* @__PURE__ */ jsxRuntimeExports.jsx(User, { size: 14, className: "text-primary" }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: "Recipient" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-semibold text-foreground", children: order.deliveryAddress.name }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: order.deliveryAddress.phone })
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Separator, {}),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start gap-3", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0", children: /* @__PURE__ */ jsxRuntimeExports.jsx(MapPin, { size: 14, className: "text-primary" }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: "Delivery address" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-semibold text-foreground", children: order.deliveryAddress.address }),
                order.deliveryAddress.landmark && /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground mt-0.5", children: [
                  "Near: ",
                  order.deliveryAddress.landmark
                ] })
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Separator, {}),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start gap-3", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0", children: /* @__PURE__ */ jsxRuntimeExports.jsx(CreditCard, { size: 14, className: "text-primary" }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: "Payment method" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-semibold text-foreground", children: order.paymentMethod === "cod" ? "Cash on Delivery" : order.paymentMethod === "card" ? "Card / UPI" : order.paymentMethod }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground", children: [
                  "₹",
                  order.total,
                  " to be paid"
                ] })
              ] })
            ] })
          ] })
        ]
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      motion.div,
      {
        initial: { opacity: 0, y: 12 },
        animate: { opacity: 1, y: 0 },
        transition: { delay: 0.25 },
        className: "bg-muted/40 rounded-2xl border border-border p-4 flex items-center justify-between gap-3",
        "data-ocid": "order_tracking.support_card",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-semibold text-foreground", children: "Need help?" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: "Call us at +91 82872 86500 — we're here for you." })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("a", { href: "tel:8287286500", "data-ocid": "order_tracking.call_support_button", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
            Button,
            {
              size: "sm",
              className: "rounded-full gap-1.5 gradient-primary text-primary-foreground font-semibold",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Phone, { size: 13 }),
                "Call Now"
              ]
            }
          ) })
        ]
      }
    ),
    isDelivered && /* @__PURE__ */ jsxRuntimeExports.jsxs(
      motion.div,
      {
        initial: { opacity: 0, scale: 0.95 },
        animate: { opacity: 1, scale: 1 },
        transition: { delay: 0.3 },
        className: "bg-green-50 border border-green-200 rounded-2xl p-5 text-center space-y-3",
        "data-ocid": "order_tracking.delivered_card",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-3xl", children: "🎉" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-display font-bold text-base text-green-800", children: "Order Delivered Successfully!" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-green-700", children: "Hope you enjoyed your meal. Order again for another delicious experience!" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
            Button,
            {
              className: "gradient-primary text-primary-foreground rounded-full px-8 font-semibold",
              "data-ocid": "order_tracking.order_again_button",
              children: "Order Again"
            }
          ) })
        ]
      }
    )
  ] });
}
export {
  OrderTrackingPage
};
