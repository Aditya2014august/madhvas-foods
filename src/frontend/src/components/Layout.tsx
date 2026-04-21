import { Link, useLocation } from "@tanstack/react-router";
import { MapPin, Phone, ShoppingCart } from "lucide-react";
import type { ReactNode } from "react";
import { useCart } from "../hooks/useCart";
import { BottomNav } from "./BottomNav";

interface LayoutProps {
  children: ReactNode;
}

export function Layout({ children }: LayoutProps) {
  const { totalItems } = useCart();
  const location = useLocation();

  const isHomePage = location.pathname === "/";

  return (
    <div className="min-h-screen flex flex-col bg-background">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-card border-b border-border shadow-subtle">
        <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
          {/* Logo */}
          <Link
            to="/"
            className="flex items-center gap-2 group"
            data-ocid="header.logo_link"
          >
            <div className="w-9 h-9 rounded-xl gradient-primary flex items-center justify-center shadow-card">
              <span className="text-primary-foreground font-display font-bold text-lg leading-none">
                M
              </span>
            </div>
            <div className="leading-tight">
              <span className="font-display font-bold text-foreground text-lg tracking-tight">
                Madhvas
              </span>
              <span className="font-display font-bold text-primary text-lg tracking-tight">
                {" "}
                Foods
              </span>
              <p className="text-[10px] text-muted-foreground font-body tracking-wide hidden sm:block">
                Fresh · Fast · Flavourful
              </p>
            </div>
          </Link>

          {/* Location + Right actions */}
          <div className="flex items-center gap-3">
            {/* Delivery location (desktop only) */}
            <button
              type="button"
              className="hidden md:flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-smooth px-3 py-1.5 rounded-lg hover:bg-muted"
            >
              <MapPin size={14} className="text-primary" />
              <span className="font-medium">Delivering to Delhi</span>
            </button>

            {/* Cart button (desktop — shown outside bottom nav) */}
            <Link
              to="/cart"
              data-ocid="header.cart_button"
              className="relative hidden md:flex items-center gap-2 bg-primary text-primary-foreground px-4 py-2 rounded-full font-semibold text-sm transition-smooth hover:opacity-90 shadow-card"
            >
              <ShoppingCart size={16} />
              <span>Cart</span>
              {totalItems > 0 && (
                <span className="bg-accent text-accent-foreground text-[10px] font-bold rounded-full min-w-[18px] h-[18px] flex items-center justify-center px-1">
                  {totalItems}
                </span>
              )}
            </Link>

            {/* Phone number (desktop) */}
            <a
              href="tel:8287286500"
              className="hidden lg:flex items-center gap-1.5 text-xs text-muted-foreground hover:text-primary transition-smooth"
            >
              <Phone size={12} />
              <span>8287286500</span>
            </a>
          </div>
        </div>

        {/* Promo banner */}
        {isHomePage && (
          <div className="gradient-primary text-primary-foreground text-center text-xs font-semibold py-1.5 tracking-wide">
            🔥 Free delivery on orders above ₹499 · Use code MADHVAS20 for 20%
            off
          </div>
        )}
      </header>

      {/* Main content */}
      <main className="flex-1 pb-20 md:pb-8">{children}</main>

      {/* Footer (desktop) */}
      <footer className="hidden md:block bg-card border-t border-border">
        <div className="max-w-6xl mx-auto px-4 py-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg gradient-primary flex items-center justify-center">
                <span className="text-primary-foreground font-bold text-base">
                  M
                </span>
              </div>
              <span className="font-display font-bold text-foreground">
                Madhvas Foods
              </span>
            </div>
            <div className="text-center">
              <p className="text-xs text-muted-foreground">
                © {new Date().getFullYear()}. Built with love using{" "}
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
            <div className="flex items-center gap-4 text-xs text-muted-foreground">
              <a
                href="tel:8287286500"
                className="hover:text-primary transition-smooth flex items-center gap-1"
              >
                <Phone size={12} />
                <span>8287286500</span>
              </a>
              <span className="text-border">|</span>
              <span>Delhi NCR</span>
            </div>
          </div>
        </div>
      </footer>

      {/* Mobile bottom navigation */}
      <BottomNav />
    </div>
  );
}
