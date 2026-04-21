import { Separator } from "@/components/ui/separator";
import { Link } from "@tanstack/react-router";
import {
  ChevronRight,
  Clock,
  MapPin,
  Phone,
  ShoppingBag,
  Star,
  User,
} from "lucide-react";
import { useOrders } from "../hooks/useOrders";

const PROFILE_MENU = [
  { label: "My Addresses", icon: MapPin, to: "/" },
  { label: "My Orders", icon: ShoppingBag, to: "/orders" },
  { label: "Favourite Items", icon: Star, to: "/" },
  { label: "Order History", icon: Clock, to: "/orders" },
];

export function ProfilePage() {
  const { orders } = useOrders();

  return (
    <div className="max-w-2xl mx-auto px-4 py-6 space-y-6">
      {/* Profile header */}
      <div className="bg-card rounded-2xl border border-border p-5">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-2xl gradient-primary flex items-center justify-center shadow-card">
            <User size={28} className="text-primary-foreground" />
          </div>
          <div>
            <h1 className="font-display font-bold text-xl text-foreground">
              Welcome!
            </h1>
            <p className="text-sm text-muted-foreground flex items-center gap-1 mt-0.5">
              <Phone size={12} />
              8287286500
            </p>
            <p className="text-xs text-primary font-semibold mt-1">
              {orders.length} order{orders.length !== 1 ? "s" : ""} placed
            </p>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-3">
        {[
          { label: "Orders", value: orders.length, icon: "📦" },
          { label: "Saved", value: "₹149", icon: "💰" },
          { label: "Rating", value: "5.0", icon: "⭐" },
        ].map(({ label, value, icon }) => (
          <div
            key={label}
            className="bg-card rounded-2xl border border-border p-3 text-center space-y-1"
          >
            <div className="text-2xl">{icon}</div>
            <p className="font-bold text-lg font-display text-foreground">
              {value}
            </p>
            <p className="text-xs text-muted-foreground">{label}</p>
          </div>
        ))}
      </div>

      {/* Menu list */}
      <div className="bg-card rounded-2xl border border-border overflow-hidden">
        {PROFILE_MENU.map((item, idx) => (
          <div key={item.label}>
            <Link
              to={item.to}
              data-ocid={`profile.menu_item.${idx + 1}`}
              className="flex items-center justify-between p-4 hover:bg-muted/50 transition-smooth"
            >
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-muted flex items-center justify-center">
                  <item.icon size={16} className="text-primary" />
                </div>
                <span className="text-sm font-semibold text-foreground">
                  {item.label}
                </span>
              </div>
              <ChevronRight size={16} className="text-muted-foreground" />
            </Link>
            {idx < PROFILE_MENU.length - 1 && <Separator />}
          </div>
        ))}
      </div>

      {/* Recent orders */}
      {orders.length > 0 && (
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <h2 className="font-display font-bold text-base">Recent Orders</h2>
            <Link
              to="/orders"
              className="text-xs text-primary font-semibold hover:underline"
            >
              View all
            </Link>
          </div>
          {orders.slice(0, 3).map((order, idx) => (
            <Link
              key={order.id}
              to="/orders/$orderId"
              params={{ orderId: order.id }}
              data-ocid={`profile.recent_order.${idx + 1}`}
              className="flex items-center gap-3 bg-card rounded-2xl border border-border p-3 hover:shadow-card transition-smooth"
            >
              <div className="flex -space-x-1.5">
                {order.items.slice(0, 2).map((item, i) => (
                  <img
                    key={`${item.menuItemId}-${i}`}
                    src={item.image}
                    alt={item.name}
                    className="w-10 h-10 rounded-xl object-cover border-2 border-card"
                  />
                ))}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold font-display text-foreground truncate">
                  {order.items.map((i) => i.name).join(", ")}
                </p>
                <p className="text-xs text-muted-foreground">
                  ₹{order.total} · {order.status}
                </p>
              </div>
              <ChevronRight
                size={14}
                className="text-muted-foreground flex-shrink-0"
              />
            </Link>
          ))}
        </div>
      )}

      {/* App info */}
      <div className="text-center text-xs text-muted-foreground py-4 space-y-1">
        <p className="font-display font-bold text-sm text-foreground">
          Madhvas Foods
        </p>
        <p>Fresh · Fast · Flavourful</p>
        <p>
          © {new Date().getFullYear()} · Built with{" "}
          <a
            href={`https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(typeof window !== "undefined" ? window.location.hostname : "")}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary hover:underline"
          >
            caffeine.ai
          </a>
        </p>
      </div>
    </div>
  );
}
