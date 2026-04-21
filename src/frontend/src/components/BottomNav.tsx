import { Link, useLocation } from "@tanstack/react-router";
import { ClipboardList, Home, ShoppingCart, User } from "lucide-react";
import { useCart } from "../hooks/useCart";

const NAV_ITEMS = [
  { to: "/", label: "Home", icon: Home, ocid: "nav.home" },
  { to: "/cart", label: "Cart", icon: ShoppingCart, ocid: "nav.cart" },
  { to: "/orders", label: "Orders", icon: ClipboardList, ocid: "nav.orders" },
  { to: "/profile", label: "Profile", icon: User, ocid: "nav.profile" },
];

export function BottomNav() {
  const location = useLocation();
  const { totalItems } = useCart();

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 bg-card border-t border-border shadow-elevated md:hidden">
      <div className="flex items-center justify-around h-16 max-w-lg mx-auto px-2">
        {NAV_ITEMS.map(({ to, label, icon: Icon, ocid }) => {
          const isActive =
            to === "/"
              ? location.pathname === "/"
              : location.pathname.startsWith(to);
          const isCart = to === "/cart";

          return (
            <Link
              key={to}
              to={to}
              data-ocid={ocid}
              className={`flex flex-col items-center gap-1 px-3 py-2 rounded-xl transition-smooth min-w-[56px] relative ${
                isActive
                  ? "text-primary"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              <div className="relative">
                <Icon
                  size={22}
                  strokeWidth={isActive ? 2.5 : 2}
                  className={isActive ? "text-primary" : ""}
                />
                {isCart && totalItems > 0 && (
                  <span className="absolute -top-2 -right-2 bg-accent text-accent-foreground text-[10px] font-bold rounded-full min-w-[16px] h-4 flex items-center justify-center px-1 leading-none">
                    {totalItems > 99 ? "99+" : totalItems}
                  </span>
                )}
              </div>
              <span
                className={`text-[10px] font-semibold tracking-wide ${
                  isActive ? "text-primary" : ""
                }`}
              >
                {label}
              </span>
              {isActive && (
                <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-4 h-0.5 rounded-full gradient-primary" />
              )}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
