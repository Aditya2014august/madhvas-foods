import { W as jsxRuntimeExports, an as User, ao as Phone, am as MapPin, ax as Star, ar as Clock, ai as Link, ap as ChevronRight } from "./index-Hyraa-Jt.js";
import { S as Separator } from "./separator-DOaE9Zed.js";
import { u as useOrders } from "./useOrders-jEk9ljS2.js";
import { S as ShoppingBag } from "./shopping-bag-CoI1Sl4A.js";
const PROFILE_MENU = [
  { label: "My Addresses", icon: MapPin, to: "/" },
  { label: "My Orders", icon: ShoppingBag, to: "/orders" },
  { label: "Favourite Items", icon: Star, to: "/" },
  { label: "Order History", icon: Clock, to: "/orders" }
];
function ProfilePage() {
  const { orders } = useOrders();
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-2xl mx-auto px-4 py-6 space-y-6", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "bg-card rounded-2xl border border-border p-5", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-16 h-16 rounded-2xl gradient-primary flex items-center justify-center shadow-card", children: /* @__PURE__ */ jsxRuntimeExports.jsx(User, { size: 28, className: "text-primary-foreground" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display font-bold text-xl text-foreground", children: "Welcome!" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm text-muted-foreground flex items-center gap-1 mt-0.5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Phone, { size: 12 }),
          "8287286500"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-primary font-semibold mt-1", children: [
          orders.length,
          " order",
          orders.length !== 1 ? "s" : "",
          " placed"
        ] })
      ] })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-3 gap-3", children: [
      { label: "Orders", value: orders.length, icon: "📦" },
      { label: "Saved", value: "₹149", icon: "💰" },
      { label: "Rating", value: "5.0", icon: "⭐" }
    ].map(({ label, value, icon }) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        className: "bg-card rounded-2xl border border-border p-3 text-center space-y-1",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-2xl", children: icon }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-bold text-lg font-display text-foreground", children: value }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: label })
        ]
      },
      label
    )) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "bg-card rounded-2xl border border-border overflow-hidden", children: PROFILE_MENU.map((item, idx) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        Link,
        {
          to: item.to,
          "data-ocid": `profile.menu_item.${idx + 1}`,
          className: "flex items-center justify-between p-4 hover:bg-muted/50 transition-smooth",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-9 h-9 rounded-xl bg-muted flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(item.icon, { size: 16, className: "text-primary" }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm font-semibold text-foreground", children: item.label })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronRight, { size: 16, className: "text-muted-foreground" })
          ]
        }
      ),
      idx < PROFILE_MENU.length - 1 && /* @__PURE__ */ jsxRuntimeExports.jsx(Separator, {})
    ] }, item.label)) }),
    orders.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display font-bold text-base", children: "Recent Orders" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Link,
          {
            to: "/orders",
            className: "text-xs text-primary font-semibold hover:underline",
            children: "View all"
          }
        )
      ] }),
      orders.slice(0, 3).map((order, idx) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
        Link,
        {
          to: "/orders/$orderId",
          params: { orderId: order.id },
          "data-ocid": `profile.recent_order.${idx + 1}`,
          className: "flex items-center gap-3 bg-card rounded-2xl border border-border p-3 hover:shadow-card transition-smooth",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex -space-x-1.5", children: order.items.slice(0, 2).map((item, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(
              "img",
              {
                src: item.image,
                alt: item.name,
                className: "w-10 h-10 rounded-xl object-cover border-2 border-card"
              },
              `${item.menuItemId}-${i}`
            )) }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-semibold font-display text-foreground truncate", children: order.items.map((i) => i.name).join(", ") }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground", children: [
                "₹",
                order.total,
                " · ",
                order.status
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              ChevronRight,
              {
                size: 14,
                className: "text-muted-foreground flex-shrink-0"
              }
            )
          ]
        },
        order.id
      ))
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center text-xs text-muted-foreground py-4 space-y-1", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-display font-bold text-sm text-foreground", children: "Madhvas Foods" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: "Fresh · Fast · Flavourful" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { children: [
        "© ",
        (/* @__PURE__ */ new Date()).getFullYear(),
        " · Built with",
        " ",
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "a",
          {
            href: `https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(typeof window !== "undefined" ? window.location.hostname : "")}`,
            target: "_blank",
            rel: "noopener noreferrer",
            className: "text-primary hover:underline",
            children: "caffeine.ai"
          }
        )
      ] })
    ] })
  ] });
}
export {
  ProfilePage
};
