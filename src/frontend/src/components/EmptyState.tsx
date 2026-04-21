import { Button } from "@/components/ui/button";
import { Link } from "@tanstack/react-router";
import { PackageOpen, ShoppingBag, UtensilsCrossed } from "lucide-react";

type EmptyVariant = "cart" | "orders" | "search" | "menu";

interface EmptyStateProps {
  variant?: EmptyVariant;
  title?: string;
  description?: string;
  ctaLabel?: string;
  ctaTo?: string;
}

const VARIANTS = {
  cart: {
    icon: ShoppingBag,
    title: "Your cart is empty",
    description:
      "Looks like you haven't added anything yet. Browse our menu and add something delicious!",
    ctaLabel: "Browse Menu",
    ctaTo: "/",
  },
  orders: {
    icon: PackageOpen,
    title: "No orders yet",
    description:
      "You haven't placed any orders. Order your first meal and track it live!",
    ctaLabel: "Order Now",
    ctaTo: "/",
  },
  search: {
    icon: UtensilsCrossed,
    title: "No results found",
    description:
      "We couldn't find what you're looking for. Try a different search term.",
    ctaLabel: "Clear Search",
    ctaTo: "/",
  },
  menu: {
    icon: UtensilsCrossed,
    title: "Nothing here yet",
    description:
      "This category is coming soon. Check out our other menu items!",
    ctaLabel: "See All Items",
    ctaTo: "/",
  },
};

export function EmptyState({
  variant = "cart",
  title,
  description,
  ctaLabel,
  ctaTo,
}: EmptyStateProps) {
  const config = VARIANTS[variant];
  const Icon = config.icon;
  const displayTitle = title ?? config.title;
  const displayDescription = description ?? config.description;
  const displayCtaLabel = ctaLabel ?? config.ctaLabel;
  const displayCtaTo = ctaTo ?? config.ctaTo;

  return (
    <div
      data-ocid={`${variant}.empty_state`}
      className="flex flex-col items-center justify-center text-center py-16 px-6 gap-4"
    >
      <div className="w-20 h-20 rounded-full bg-muted flex items-center justify-center">
        <Icon size={36} className="text-muted-foreground" />
      </div>
      <div className="space-y-1">
        <h3 className="text-lg font-semibold font-display text-foreground">
          {displayTitle}
        </h3>
        <p className="text-sm text-muted-foreground max-w-xs">
          {displayDescription}
        </p>
      </div>
      <Link to={displayCtaTo}>
        <Button className="gradient-primary text-primary-foreground rounded-full px-6 font-semibold">
          {displayCtaLabel}
        </Button>
      </Link>
    </div>
  );
}
