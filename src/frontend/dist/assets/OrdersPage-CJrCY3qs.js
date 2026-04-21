import { V as createLucideIcon, W as jsxRuntimeExports, a0 as cn, J as reactExports, ai as Link, al as Button, aq as motion, ar as Clock, aj as Badge, as as STATUS_ICONS, at as STATUS_LABELS, ap as ChevronRight } from "./index-Hyraa-Jt.js";
import { E as EmptyState } from "./EmptyState-B8YnHf8K.js";
import { u as useOrders } from "./useOrders-jEk9ljS2.js";
import { S as ShoppingBag } from "./shopping-bag-CoI1Sl4A.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  ["path", { d: "m16 16 2 2 4-4", key: "gfu2re" }],
  [
    "path",
    {
      d: "M21 10V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l2-1.14",
      key: "e7tb2h"
    }
  ],
  ["path", { d: "m7.5 4.27 9 5.15", key: "1c824w" }],
  ["polyline", { points: "3.29 7 12 12 20.71 7", key: "ousv84" }],
  ["line", { x1: "12", x2: "12", y1: "22", y2: "12", key: "a4e8g8" }]
];
const PackageCheck = createLucideIcon("package-check", __iconNode);
function Skeleton({ className, ...props }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "div",
    {
      "data-slot": "skeleton",
      className: cn("bg-accent animate-pulse rounded-md", className),
      ...props
    }
  );
}
const STATUS_BADGE_STYLE = {
  Placed: {
    bg: "bg-muted",
    text: "text-muted-foreground",
    border: "border-border",
    dot: "bg-muted-foreground"
  },
  Confirmed: {
    bg: "bg-blue-50",
    text: "text-blue-700",
    border: "border-blue-200",
    dot: "bg-blue-500"
  },
  Preparing: {
    bg: "bg-amber-50",
    text: "text-amber-700",
    border: "border-amber-200",
    dot: "bg-amber-500"
  },
  Baking: {
    bg: "bg-orange-50",
    text: "text-orange-700",
    border: "border-orange-200",
    dot: "bg-orange-500"
  },
  Ready: {
    bg: "bg-purple-50",
    text: "text-purple-700",
    border: "border-purple-200",
    dot: "bg-purple-500"
  },
  OutForDelivery: {
    bg: "bg-primary/10",
    text: "text-primary",
    border: "border-primary/30",
    dot: "bg-primary"
  },
  Delivered: {
    bg: "bg-green-50",
    text: "text-green-700",
    border: "border-green-200",
    dot: "bg-green-500"
  }
};
const ACTIVE_STATUSES = [
  "Placed",
  "Confirmed",
  "Preparing",
  "Baking",
  "Ready",
  "OutForDelivery"
];
function OrderCardSkeleton() {
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "bg-card rounded-2xl border border-border p-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start justify-between gap-3", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex -space-x-2", children: [0, 1, 2].map((i) => /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "w-10 h-10 rounded-xl" }, i)) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-4 w-28" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-3 w-44" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-3 w-24" })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-6 w-20 rounded-full" })
  ] }) });
}
function OrdersPage() {
  const { orders } = useOrders();
  const [loading, setLoading] = reactExports.useState(true);
  reactExports.useEffect(() => {
    const t = setTimeout(() => setLoading(false), 400);
    return () => clearTimeout(t);
  }, []);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-2xl mx-auto px-4 py-6 space-y-5", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-2xl font-bold font-display text-foreground", children: "Your Orders" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground mt-0.5", children: orders.length > 0 ? `${orders.length} order${orders.length !== 1 ? "s" : ""} placed` : "Track all your deliveries here" })
      ] }),
      orders.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
        Button,
        {
          variant: "outline",
          size: "sm",
          className: "rounded-full gap-1.5 text-xs",
          "data-ocid": "orders.order_again_button",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(ShoppingBag, { size: 13 }),
            "Order Again"
          ]
        }
      ) })
    ] }),
    orders.some((o) => ACTIVE_STATUSES.includes(o.status)) && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-primary/8 border border-primary/20 rounded-2xl p-3.5 flex items-center gap-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xl animate-bounce", children: "🛵" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-semibold text-primary", children: "You have active orders!" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: "Tap any card to track live status" })
      ] })
    ] }),
    loading ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-3", children: [0, 1, 2].map((i) => /* @__PURE__ */ jsxRuntimeExports.jsx(OrderCardSkeleton, {}, i)) }) : orders.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx(EmptyState, { variant: "orders" }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { "data-ocid": "orders.list", className: "space-y-3", children: orders.map((order, idx) => {
      const style = STATUS_BADGE_STYLE[order.status];
      const isActive = ACTIVE_STATUSES.includes(order.status);
      const itemsText = order.items.map((i) => `${i.name} ×${i.quantity}`).join(", ");
      return /* @__PURE__ */ jsxRuntimeExports.jsx(
        motion.div,
        {
          initial: { opacity: 0, y: 12 },
          animate: { opacity: 1, y: 0 },
          transition: { delay: idx * 0.06, duration: 0.3 },
          children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
            Link,
            {
              to: "/orders/$orderId",
              params: { orderId: order.id },
              "data-ocid": `orders.item.${idx + 1}`,
              className: "block bg-card rounded-2xl border border-border p-4 transition-smooth hover:shadow-card hover:border-primary/30 group",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start justify-between gap-3", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-3 min-w-0 flex-1", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex -space-x-2 flex-shrink-0", children: [
                      order.items.slice(0, 3).map((item, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(
                        "img",
                        {
                          src: item.image,
                          alt: item.name,
                          className: "w-11 h-11 rounded-xl object-cover border-2 border-card shadow-sm"
                        },
                        `${item.menuItemId}-${i}`
                      )),
                      order.items.length > 3 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "w-11 h-11 rounded-xl bg-muted border-2 border-card flex items-center justify-center text-xs font-bold text-muted-foreground", children: [
                        "+",
                        order.items.length - 3
                      ] })
                    ] }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0 flex-1", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "font-semibold text-sm font-display text-foreground", children: [
                          "Order #",
                          order.id
                        ] }),
                        isActive && /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex h-2 w-2", children: [
                          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "animate-ping absolute inline-flex h-2 w-2 rounded-full bg-primary opacity-75" }),
                          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "relative inline-flex rounded-full h-2 w-2 bg-primary" })
                        ] })
                      ] }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mt-0.5 truncate", children: itemsText.length > 55 ? `${itemsText.slice(0, 55)}…` : itemsText }),
                      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 mt-1.5", children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-[11px] text-muted-foreground flex items-center gap-1", children: [
                          /* @__PURE__ */ jsxRuntimeExports.jsx(Clock, { size: 10 }),
                          new Date(order.createdAt).toLocaleDateString(
                            "en-IN",
                            {
                              day: "numeric",
                              month: "short",
                              hour: "2-digit",
                              minute: "2-digit"
                            }
                          )
                        ] }),
                        /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-xs font-bold text-foreground", children: [
                          "₹",
                          order.total
                        ] })
                      ] })
                    ] })
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col items-end gap-2 flex-shrink-0", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsxs(
                      Badge,
                      {
                        className: `badge-status border text-[10px] font-bold px-2.5 py-1 ${style.bg} ${style.text} ${style.border}`,
                        variant: "outline",
                        children: [
                          /* @__PURE__ */ jsxRuntimeExports.jsx(
                            "span",
                            {
                              className: `w-1.5 h-1.5 rounded-full ${style.dot} ${isActive ? "animate-pulse" : ""}`
                            }
                          ),
                          STATUS_ICONS[order.status],
                          " ",
                          STATUS_LABELS[order.status]
                        ]
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      ChevronRight,
                      {
                        size: 15,
                        className: "text-muted-foreground group-hover:text-primary transition-smooth"
                      }
                    )
                  ] })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-3 pt-3 border-t border-border flex items-center gap-1.5", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    PackageCheck,
                    {
                      size: 12,
                      className: "text-muted-foreground flex-shrink-0"
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[11px] text-muted-foreground truncate", children: order.deliveryAddress.address })
                ] })
              ]
            }
          )
        },
        order.id
      );
    }) })
  ] });
}
export {
  OrdersPage
};
