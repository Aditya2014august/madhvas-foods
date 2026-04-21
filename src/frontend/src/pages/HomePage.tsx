import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  ChevronRight,
  Clock,
  Flame,
  Leaf,
  Search,
  Sparkles,
  Star,
  Tag,
  X,
  Zap,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useRef, useState } from "react";
import { toast } from "sonner";
import { useCart } from "../hooks/useCart";
import { MENU_ITEMS, usePopularItems } from "../hooks/useMenuItems";
import { CATEGORIES } from "../types";
import type { Category, MenuItem } from "../types";

// Unsplash images — one distinct URL per item
const ITEM_IMAGES: Record<string, string> = {
  "pizza-001":
    "https://images.unsplash.com/photo-1513104890138-7c749659a591?w=600&q=80",
  "pizza-002":
    "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=600&q=80",
  "burger-001":
    "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=600&q=80",
  "burger-002":
    "https://images.unsplash.com/photo-1553979459-d2229ba7433b?w=600&q=80",
  "momos-001":
    "https://images.unsplash.com/photo-1626776876729-bab4369a5a5a?w=600&q=80",
  "momos-002":
    "https://images.unsplash.com/photo-1534422298391-e4f8c172dddb?w=600&q=80",
  "maggi-001":
    "https://images.unsplash.com/photo-1555126634-323283e090fa?w=600&q=80",
  "maggi-002":
    "https://images.unsplash.com/photo-1619894991209-9f9694be045a?w=600&q=80",
  "sandwich-001":
    "https://images.unsplash.com/photo-1528735602780-2552fd46c7af?w=600&q=80",
  "sandwich-002":
    "https://images.unsplash.com/photo-1600555379765-f0d5de51c0bd?w=600&q=80",
  "bev-001":
    "https://images.unsplash.com/photo-1544145945-f90425340c7e?w=600&q=80",
  "bev-002":
    "https://images.unsplash.com/photo-1546173159-315724a31696?w=600&q=80",
};

const CATEGORY_EMOJI: Record<Category, string> = {
  Pizza: "🍕",
  Burger: "🍔",
  Momos: "🥟",
  Maggi: "🍜",
  Sandwiches: "🥪",
  Beverages: "🥤",
};

const CATEGORY_HERO: Record<Category, string> = {
  Pizza:
    "https://images.unsplash.com/photo-1513104890138-7c749659a591?w=800&q=80",
  Burger:
    "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=800&q=80",
  Momos:
    "https://images.unsplash.com/photo-1626776876729-bab4369a5a5a?w=800&q=80",
  Maggi: "https://images.unsplash.com/photo-1555126634-323283e090fa?w=800&q=80",
  Sandwiches:
    "https://images.unsplash.com/photo-1528735602780-2552fd46c7af?w=800&q=80",
  Beverages:
    "https://images.unsplash.com/photo-1544145945-f90425340c7e?w=800&q=80",
};

const SPECIAL_OFFERS = [
  {
    id: "offer-1",
    code: "MADHVAS20",
    title: "20% Off Your First Order",
    sub: "Use code at checkout",
    emoji: "🎉",
    color: "from-orange-500 to-red-600",
  },
  {
    id: "offer-2",
    code: "FREEDEL",
    title: "Free Delivery",
    sub: "On orders above ₹499",
    emoji: "🛵",
    color: "from-amber-500 to-orange-600",
  },
  {
    id: "offer-3",
    code: "COMBO30",
    title: "Combo Saver 30%",
    sub: "Pizza + Beverage combos",
    emoji: "🍕",
    color: "from-rose-500 to-pink-700",
  },
];

// ─── MenuItemCard ─────────────────────────────────────────────────────────────

function MenuItemCard({
  item,
  index,
}: {
  item: MenuItem;
  index: number;
}) {
  const { getItemQuantity, incrementItem, decrementItem } = useCart();
  const qty = getItemQuantity(item.id);
  const imgSrc = ITEM_IMAGES[item.id] ?? item.image;

  const handleAdd = () => {
    incrementItem(item);
    toast.success(`${item.name} added to cart! 🎉`, { duration: 1500 });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: index * 0.04 }}
      data-ocid={`menu.item.${index + 1}`}
      className="bg-card rounded-2xl overflow-hidden border border-border food-card-hover group"
    >
      {/* Image */}
      <div className="relative aspect-[4/3] overflow-hidden bg-muted">
        <img
          src={imgSrc}
          alt={item.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-smooth"
          loading="lazy"
          onError={(e) => {
            (e.currentTarget as HTMLImageElement).src = item.image;
          }}
        />
        {item.isPopular && (
          <div className="absolute top-2 left-2">
            <span className="bg-accent text-accent-foreground text-[10px] font-bold px-2 py-0.5 rounded-full flex items-center gap-1 shadow-subtle">
              <Flame size={9} />
              Popular
            </span>
          </div>
        )}
        <div className="absolute top-2 right-2">
          <span
            className={`w-4 h-4 flex items-center justify-center rounded border-2 text-[8px] font-extrabold ${
              item.isVeg
                ? "border-green-600 text-green-600 bg-card"
                : "border-red-600 text-red-600 bg-card"
            }`}
            title={item.isVeg ? "Veg" : "Non-Veg"}
          >
            ●
          </span>
        </div>
        <Badge className="absolute bottom-2 left-2 text-[10px] bg-foreground/70 text-card border-none backdrop-blur-sm px-1.5 py-0">
          {CATEGORY_EMOJI[item.category]} {item.category}
        </Badge>
      </div>

      {/* Content */}
      <div className="p-3 space-y-2">
        <div>
          <h3 className="font-display font-semibold text-foreground text-sm leading-tight line-clamp-1">
            {item.name}
          </h3>
          <p className="text-xs text-muted-foreground line-clamp-2 mt-0.5 leading-relaxed">
            {item.description}
          </p>
        </div>

        {/* Meta */}
        <div className="flex items-center gap-3 text-xs text-muted-foreground">
          {item.rating && (
            <span className="flex items-center gap-0.5 text-amber-600 font-semibold">
              <Star size={10} fill="currentColor" />
              {item.rating}
            </span>
          )}
          {item.prepTime && (
            <span className="flex items-center gap-0.5">
              <Clock size={10} />
              {item.prepTime}
            </span>
          )}
          {item.isVeg && (
            <span className="flex items-center gap-0.5 text-green-600 font-medium">
              <Leaf size={9} />
              Pure Veg
            </span>
          )}
        </div>

        {/* Price + Add */}
        <div className="flex items-center justify-between pt-1">
          <div>
            <span className="font-bold text-foreground font-display text-base">
              ₹{item.price}
            </span>
          </div>
          {qty === 0 ? (
            <Button
              data-ocid={`menu.add_button.${index + 1}`}
              size="sm"
              onClick={handleAdd}
              className="gradient-primary text-primary-foreground rounded-full h-7 px-4 text-xs font-bold shadow-card hover:opacity-90"
            >
              ADD
            </Button>
          ) : (
            <div
              data-ocid={`menu.qty_control.${index + 1}`}
              className="flex items-center gap-0 bg-primary rounded-full overflow-hidden shadow-card"
            >
              <button
                type="button"
                data-ocid={`menu.decrement.${index + 1}`}
                onClick={() => decrementItem(item.id)}
                className="w-7 h-7 flex items-center justify-center text-primary-foreground font-bold text-lg hover:bg-black/10 transition-smooth"
                aria-label="Decrease quantity"
              >
                −
              </button>
              <span className="text-primary-foreground font-bold text-xs min-w-[20px] text-center">
                {qty}
              </span>
              <button
                type="button"
                data-ocid={`menu.increment.${index + 1}`}
                onClick={() => incrementItem(item)}
                className="w-7 h-7 flex items-center justify-center text-primary-foreground font-bold text-lg hover:bg-black/10 transition-smooth"
                aria-label="Increase quantity"
              >
                +
              </button>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
}

// ─── PopularCard (horizontal scroll) ─────────────────────────────────────────

function PopularCard({ item }: { item: MenuItem }) {
  const { getItemQuantity, incrementItem, decrementItem } = useCart();
  const qty = getItemQuantity(item.id);
  const imgSrc = ITEM_IMAGES[item.id] ?? item.image;

  return (
    <div className="flex-shrink-0 w-48 bg-card rounded-2xl overflow-hidden border border-border food-card-hover group shadow-card">
      <div className="relative h-28 overflow-hidden bg-muted">
        <img
          src={imgSrc}
          alt={item.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-smooth"
          loading="lazy"
          onError={(e) => {
            (e.currentTarget as HTMLImageElement).src = item.image;
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
        <span className="absolute bottom-1.5 left-2 text-white font-display font-bold text-xs leading-tight line-clamp-1">
          {item.name}
        </span>
        {item.rating && (
          <span className="absolute top-1.5 right-1.5 bg-amber-400 text-amber-900 text-[9px] font-bold px-1.5 py-0.5 rounded-full flex items-center gap-0.5">
            <Star size={8} fill="currentColor" />
            {item.rating}
          </span>
        )}
      </div>
      <div className="p-2.5 flex items-center justify-between">
        <span className="font-bold text-sm text-foreground font-display">
          ₹{item.price}
        </span>
        {qty === 0 ? (
          <button
            type="button"
            data-ocid={`popular.add_button.${item.id}`}
            onClick={() => {
              incrementItem(item);
              toast.success(`${item.name} added! 🎉`, { duration: 1500 });
            }}
            className="text-[10px] font-bold text-primary border border-primary rounded-full px-2.5 py-0.5 hover:bg-primary hover:text-primary-foreground transition-smooth"
          >
            ADD
          </button>
        ) : (
          <div className="flex items-center gap-0 bg-primary rounded-full overflow-hidden">
            <button
              type="button"
              onClick={() => decrementItem(item.id)}
              className="w-5 h-5 flex items-center justify-center text-primary-foreground font-bold text-sm hover:bg-black/10"
              aria-label="Decrease"
            >
              −
            </button>
            <span className="text-primary-foreground font-bold text-[10px] min-w-[14px] text-center">
              {qty}
            </span>
            <button
              type="button"
              onClick={() => incrementItem(item)}
              className="w-5 h-5 flex items-center justify-center text-primary-foreground font-bold text-sm hover:bg-black/10"
              aria-label="Increase"
            >
              +
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

// ─── OfferCard ─────────────────────────────────────────────────────────────────

function OfferCard({
  offer,
}: {
  offer: (typeof SPECIAL_OFFERS)[0];
}) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(offer.code).catch(() => {});
    setCopied(true);
    toast.success(`Code "${offer.code}" copied!`, { duration: 2000 });
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div
      data-ocid={`offer.card.${offer.id}`}
      className={`flex-shrink-0 w-64 bg-gradient-to-br ${offer.color} rounded-2xl p-4 text-white relative overflow-hidden shadow-elevated`}
    >
      <div className="absolute -right-4 -top-4 text-5xl opacity-20 select-none">
        {offer.emoji}
      </div>
      <div className="absolute right-2 bottom-2 text-4xl opacity-10 select-none">
        {offer.emoji}
      </div>
      <Tag size={14} className="mb-2 opacity-80" />
      <p className="font-display font-bold text-base leading-tight">
        {offer.title}
      </p>
      <p className="text-white/80 text-xs mt-0.5 mb-3">{offer.sub}</p>
      <button
        type="button"
        data-ocid={`offer.copy_button.${offer.id}`}
        onClick={handleCopy}
        className="bg-white/20 backdrop-blur-sm border border-white/30 text-white text-xs font-bold px-3 py-1.5 rounded-full hover:bg-white/30 transition-smooth flex items-center gap-1.5"
      >
        {copied ? "Copied!" : offer.code}
        {!copied && <span className="text-[9px] opacity-70">TAP TO COPY</span>}
      </button>
    </div>
  );
}

// ─── HomePage ─────────────────────────────────────────────────────────────────

export function HomePage() {
  const [activeCategory, setActiveCategory] = useState<Category | "All">("All");
  const [searchQuery, setSearchQuery] = useState("");
  const menuRef = useRef<HTMLDivElement>(null);
  const { data: popularItems } = usePopularItems();

  const allItems = MENU_ITEMS;
  const filtered = (() => {
    let items =
      activeCategory === "All"
        ? allItems
        : allItems.filter((i) => i.category === activeCategory);
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      items = items.filter(
        (i) =>
          i.name.toLowerCase().includes(q) ||
          i.description.toLowerCase().includes(q) ||
          i.category.toLowerCase().includes(q),
      );
    }
    return items;
  })();

  const scrollToMenu = () => {
    menuRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const handleCategoryChange = (cat: Category | "All") => {
    setActiveCategory(cat);
    setSearchQuery("");
  };

  return (
    <div className="max-w-6xl mx-auto">
      {/* ── Hero Banner ─────────────────────────────────────────────────── */}
      <section
        data-ocid="home.hero_section"
        className="relative overflow-hidden"
      >
        <div className="relative h-64 md:h-80 lg:h-[380px]">
          <AnimatePresence mode="wait">
            <motion.img
              key={activeCategory}
              initial={{ opacity: 0, scale: 1.04 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
              src={
                activeCategory !== "All"
                  ? CATEGORY_HERO[activeCategory]
                  : "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=1200&q=80"
              }
              alt="Madhvas Foods — Fresh food delivered"
              className="absolute inset-0 w-full h-full object-cover"
            />
          </AnimatePresence>
          <div className="absolute inset-0 gradient-hero" />
          <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/30 to-transparent" />

          <div className="absolute inset-0 flex flex-col justify-end p-5 md:p-10">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 0.1 }}
            >
              <div className="flex items-center gap-2 mb-2">
                <span className="bg-accent text-accent-foreground text-[10px] font-bold px-2.5 py-1 rounded-full flex items-center gap-1 shadow-subtle">
                  <Zap size={9} />
                  Free delivery on ₹499+
                </span>
                <span className="bg-white/10 backdrop-blur-sm text-white text-[10px] font-semibold px-2.5 py-1 rounded-full border border-white/20">
                  📍 Delhi NCR
                </span>
              </div>
              <h1 className="font-display font-bold text-white text-3xl md:text-5xl tracking-tight leading-tight drop-shadow-lg">
                Madhvas Foods
              </h1>
              <p className="text-white/85 text-sm md:text-base mt-1 font-body">
                Fresh · Fast · Flavourful — Delivered to your door
              </p>
              <div className="flex gap-3 mt-4">
                <Button
                  data-ocid="home.order_now_button"
                  onClick={scrollToMenu}
                  className="gradient-primary text-primary-foreground font-bold rounded-full px-5 py-2 text-sm shadow-elevated hover:opacity-90 transition-smooth"
                >
                  Order Now
                </Button>
                <Button
                  data-ocid="home.track_orders_button"
                  variant="outline"
                  asChild
                  className="bg-white/10 backdrop-blur-sm border-white/30 text-white rounded-full px-5 text-sm hover:bg-white/20 font-semibold"
                >
                  <a href="/orders" className="flex items-center gap-1.5">
                    Track Order <ChevronRight size={14} />
                  </a>
                </Button>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <div className="px-4 py-5 space-y-7">
        {/* ── Search ──────────────────────────────────────────────────── */}
        <div className="relative" data-ocid="home.search_input">
          <Search
            size={17}
            className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none"
          />
          <Input
            type="search"
            placeholder="Search pizza, burgers, momos..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 pr-10 h-11 rounded-full border-border bg-card text-sm placeholder:text-muted-foreground focus-visible:ring-primary shadow-subtle"
          />
          {searchQuery && (
            <button
              type="button"
              aria-label="Clear search"
              onClick={() => setSearchQuery("")}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-smooth"
            >
              <X size={16} />
            </button>
          )}
        </div>

        {/* ── Category Pills ───────────────────────────────────────────── */}
        <div
          data-ocid="home.category_filter"
          className="flex gap-2 overflow-x-auto pb-1 -mx-4 px-4"
          style={{ scrollbarWidth: "none" }}
        >
          <button
            type="button"
            data-ocid="home.filter.all"
            onClick={() => handleCategoryChange("All")}
            className={`flex-shrink-0 flex items-center gap-1.5 px-4 py-2 rounded-full font-semibold text-sm transition-smooth border ${
              activeCategory === "All"
                ? "gradient-primary text-primary-foreground border-transparent shadow-card"
                : "bg-card text-muted-foreground border-border hover:border-primary hover:text-primary"
            }`}
          >
            🍽️ All
          </button>
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              type="button"
              data-ocid={`home.filter.${cat.toLowerCase()}`}
              onClick={() => handleCategoryChange(cat)}
              className={`flex-shrink-0 flex items-center gap-1.5 px-4 py-2 rounded-full font-semibold text-sm transition-smooth border ${
                activeCategory === cat
                  ? "gradient-primary text-primary-foreground border-transparent shadow-card"
                  : "bg-card text-muted-foreground border-border hover:border-primary hover:text-primary"
              }`}
            >
              {CATEGORY_EMOJI[cat]} {cat}
            </button>
          ))}
        </div>

        {/* ── Special Offers ───────────────────────────────────────────── */}
        {activeCategory === "All" && !searchQuery && (
          <motion.section
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            data-ocid="home.offers_section"
          >
            <div className="flex items-center justify-between mb-3">
              <h2 className="font-display font-bold text-lg text-foreground flex items-center gap-2">
                <Sparkles size={18} className="text-primary" />
                Special Offers
              </h2>
            </div>
            <div
              className="flex gap-3 overflow-x-auto pb-1 -mx-4 px-4"
              style={{ scrollbarWidth: "none" }}
            >
              {SPECIAL_OFFERS.map((offer) => (
                <OfferCard key={offer.id} offer={offer} />
              ))}
            </div>
          </motion.section>
        )}

        {/* ── Popular Picks ────────────────────────────────────────────── */}
        {activeCategory === "All" && !searchQuery && (
          <motion.section
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            data-ocid="home.popular_section"
          >
            <div className="flex items-center justify-between mb-3">
              <h2 className="font-display font-bold text-lg text-foreground flex items-center gap-2">
                <Flame size={18} className="text-accent" />
                Popular Right Now
              </h2>
            </div>
            <div
              className="flex gap-3 overflow-x-auto pb-2 -mx-4 px-4"
              style={{ scrollbarWidth: "none" }}
            >
              {popularItems.map((item) => (
                <PopularCard key={item.id} item={item} />
              ))}
            </div>
          </motion.section>
        )}

        {/* ── Menu Grid ────────────────────────────────────────────────── */}
        <section ref={menuRef} data-ocid="home.menu_section">
          <div className="flex items-center justify-between mb-3">
            <h2 className="font-display font-bold text-lg text-foreground">
              {searchQuery
                ? `Results for "${searchQuery}"`
                : activeCategory === "All"
                  ? "Full Menu"
                  : `${CATEGORY_EMOJI[activeCategory]} ${activeCategory}`}
            </h2>
            <span className="text-xs text-muted-foreground bg-muted px-2 py-0.5 rounded-full">
              {filtered.length} item{filtered.length !== 1 ? "s" : ""}
            </span>
          </div>

          <AnimatePresence mode="wait">
            {filtered.length === 0 ? (
              <motion.div
                key="empty"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                data-ocid="home.menu_empty_state"
                className="text-center py-16 space-y-3"
              >
                <div className="text-5xl">🔍</div>
                <p className="font-semibold text-foreground">No items found</p>
                <p className="text-sm text-muted-foreground">
                  Try a different search or category
                </p>
                <button
                  type="button"
                  onClick={() => {
                    setSearchQuery("");
                    setActiveCategory("All");
                  }}
                  className="text-primary text-sm font-semibold hover:underline mt-1"
                >
                  Clear filters
                </button>
              </motion.div>
            ) : (
              <motion.div
                key={`${activeCategory}-${searchQuery}`}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                data-ocid="home.menu_grid"
                className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-4"
              >
                {filtered.map((item, idx) => (
                  <MenuItemCard key={item.id} item={item} index={idx} />
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </section>

        {/* ── Why Madhvas ──────────────────────────────────────────────── */}
        <section
          data-ocid="home.features_section"
          className="bg-muted/40 rounded-2xl p-5 border border-border"
        >
          <h3 className="font-display font-bold text-center text-sm text-muted-foreground uppercase tracking-widest mb-4">
            Why Madhvas Foods?
          </h3>
          <div className="grid grid-cols-3 gap-4">
            {[
              { icon: "🚀", label: "Fast Delivery", sub: "30-45 min avg" },
              { icon: "🔥", label: "Always Fresh", sub: "Made to order" },
              { icon: "📞", label: "24/7 Support", sub: "8287286500" },
            ].map(({ icon, label, sub }) => (
              <div key={label} className="text-center space-y-1">
                <div className="text-3xl">{icon}</div>
                <p className="text-xs font-bold text-foreground">{label}</p>
                <p className="text-[10px] text-muted-foreground">{sub}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ── Track Order CTA ──────────────────────────────────────────── */}
        <div className="rounded-2xl overflow-hidden border border-border">
          <div className="relative bg-foreground p-5 flex items-center justify-between gap-4">
            <div className="absolute inset-0 opacity-10 bg-[radial-gradient(ellipse_at_top_right,_oklch(0.62_0.21_42),_transparent_60%)]" />
            <div className="relative">
              <p className="font-display font-bold text-lg text-card leading-tight">
                Live Order Tracking
              </p>
              <p className="text-card/70 text-xs mt-0.5">
                Watch your food being prepared, baked &amp; delivered — just
                like Dominos
              </p>
            </div>
            <Button
              data-ocid="home.track_orders_cta_button"
              className="gradient-primary text-primary-foreground rounded-full font-bold text-xs px-4 flex-shrink-0 shadow-elevated"
              asChild
            >
              <a href="/orders" className="flex items-center gap-1">
                Track <ChevronRight size={13} />
              </a>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
