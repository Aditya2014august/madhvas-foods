import { V as createLucideIcon, W as jsxRuntimeExports, ai as Link, al as Button } from "./index-Hyraa-Jt.js";
import { S as ShoppingBag } from "./shopping-bag-CoI1Sl4A.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$1 = [
  ["path", { d: "M12 22v-9", key: "x3hkom" }],
  [
    "path",
    {
      d: "M15.17 2.21a1.67 1.67 0 0 1 1.63 0L21 4.57a1.93 1.93 0 0 1 0 3.36L8.82 14.79a1.655 1.655 0 0 1-1.64 0L3 12.43a1.93 1.93 0 0 1 0-3.36z",
      key: "2ntwy6"
    }
  ],
  [
    "path",
    {
      d: "M20 13v3.87a2.06 2.06 0 0 1-1.11 1.83l-6 3.08a1.93 1.93 0 0 1-1.78 0l-6-3.08A2.06 2.06 0 0 1 4 16.87V13",
      key: "1pmm1c"
    }
  ],
  [
    "path",
    {
      d: "M21 12.43a1.93 1.93 0 0 0 0-3.36L8.83 2.2a1.64 1.64 0 0 0-1.63 0L3 4.57a1.93 1.93 0 0 0 0 3.36l12.18 6.86a1.636 1.636 0 0 0 1.63 0z",
      key: "12ttoo"
    }
  ]
];
const PackageOpen = createLucideIcon("package-open", __iconNode$1);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  ["path", { d: "m16 2-2.3 2.3a3 3 0 0 0 0 4.2l1.8 1.8a3 3 0 0 0 4.2 0L22 8", key: "n7qcjb" }],
  [
    "path",
    { d: "M15 15 3.3 3.3a4.2 4.2 0 0 0 0 6l7.3 7.3c.7.7 2 .7 2.8 0L15 15Zm0 0 7 7", key: "d0u48b" }
  ],
  ["path", { d: "m2.1 21.8 6.4-6.3", key: "yn04lh" }],
  ["path", { d: "m19 5-7 7", key: "194lzd" }]
];
const UtensilsCrossed = createLucideIcon("utensils-crossed", __iconNode);
const VARIANTS = {
  cart: {
    icon: ShoppingBag,
    title: "Your cart is empty",
    description: "Looks like you haven't added anything yet. Browse our menu and add something delicious!",
    ctaLabel: "Browse Menu",
    ctaTo: "/"
  },
  orders: {
    icon: PackageOpen,
    title: "No orders yet",
    description: "You haven't placed any orders. Order your first meal and track it live!",
    ctaLabel: "Order Now",
    ctaTo: "/"
  },
  search: {
    icon: UtensilsCrossed,
    title: "No results found",
    description: "We couldn't find what you're looking for. Try a different search term.",
    ctaLabel: "Clear Search",
    ctaTo: "/"
  },
  menu: {
    icon: UtensilsCrossed,
    title: "Nothing here yet",
    description: "This category is coming soon. Check out our other menu items!",
    ctaLabel: "See All Items",
    ctaTo: "/"
  }
};
function EmptyState({
  variant = "cart",
  title,
  description,
  ctaLabel,
  ctaTo
}) {
  const config = VARIANTS[variant];
  const Icon = config.icon;
  const displayTitle = title ?? config.title;
  const displayDescription = description ?? config.description;
  const displayCtaLabel = ctaLabel ?? config.ctaLabel;
  const displayCtaTo = ctaTo ?? config.ctaTo;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      "data-ocid": `${variant}.empty_state`,
      className: "flex flex-col items-center justify-center text-center py-16 px-6 gap-4",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-20 h-20 rounded-full bg-muted flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { size: 36, className: "text-muted-foreground" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-lg font-semibold font-display text-foreground", children: displayTitle }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground max-w-xs", children: displayDescription })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: displayCtaTo, children: /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { className: "gradient-primary text-primary-foreground rounded-full px-6 font-semibold", children: displayCtaLabel }) })
      ]
    }
  );
}
export {
  EmptyState as E
};
