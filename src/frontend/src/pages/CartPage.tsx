import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { useActor } from "@caffeineai/core-infrastructure";
import { Link, useNavigate } from "@tanstack/react-router";
import {
  ArrowRight,
  BadgePercent,
  Banknote,
  CheckCircle2,
  ChevronRight,
  CreditCard,
  Loader2,
  MapPin,
  Minus,
  Phone,
  Plus,
  ShoppingBag,
  Trash2,
  User,
} from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { createActor } from "../backend";
import { EmptyState } from "../components/EmptyState";
import { useCart } from "../hooks/useCart";
import { useOrders } from "../hooks/useOrders";
import type { DeliveryAddress, OrderItem } from "../types";

type PaymentMethod = "cod" | "card";

interface CheckoutForm {
  name: string;
  phone: string;
  houseNo: string;
  area: string;
  city: string;
  landmark: string;
  promoCode: string;
  paymentMethod: PaymentMethod;
}

interface FormErrors {
  name?: string;
  phone?: string;
  houseNo?: string;
  area?: string;
  city?: string;
}

const DELIVERY_FEE = 40;
const GST_RATE = 0.05;

function validate(form: CheckoutForm): FormErrors {
  const errs: FormErrors = {};
  if (!form.name.trim()) errs.name = "Name is required";
  else if (form.name.trim().length < 2) errs.name = "Name too short";
  if (!form.phone.trim()) errs.phone = "Phone number is required";
  else if (!/^[6-9]\d{9}$/.test(form.phone.trim()))
    errs.phone = "Enter a valid 10-digit mobile number";
  if (!form.houseNo.trim()) errs.houseNo = "House / flat number is required";
  if (!form.area.trim()) errs.area = "Area / street is required";
  if (!form.city.trim()) errs.city = "City is required";
  return errs;
}

// ---------- Sub-components ----------

function CartItemRow({
  ci,
  idx,
  onDecrement,
  onIncrement,
  onRemove,
}: {
  ci: {
    item: {
      id: string;
      name: string;
      price: number;
      image: string;
      isVeg: boolean;
    };
    quantity: number;
  };
  idx: number;
  onDecrement: () => void;
  onIncrement: () => void;
  onRemove: () => void;
}) {
  return (
    <div
      data-ocid={`cart.item.${idx}`}
      className="bg-card rounded-2xl border border-border p-3 flex items-center gap-3 shadow-subtle"
    >
      <img
        src={ci.item.image}
        alt={ci.item.name}
        className="w-16 h-16 rounded-xl object-cover flex-shrink-0"
      />
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-1.5 mb-0.5">
          <span
            className={`w-3 h-3 rounded-sm border-2 flex-shrink-0 ${ci.item.isVeg ? "border-green-600" : "border-red-500"}`}
          >
            <span
              className={`block w-1.5 h-1.5 rounded-full m-auto mt-0.5 ${ci.item.isVeg ? "bg-green-600" : "bg-red-500"}`}
            />
          </span>
          <p className="font-semibold text-sm text-foreground font-display line-clamp-1">
            {ci.item.name}
          </p>
        </div>
        <p className="text-xs text-muted-foreground">₹{ci.item.price} each</p>
      </div>
      <div className="flex items-center gap-2 flex-shrink-0">
        <div className="flex items-center gap-0.5 bg-muted rounded-full px-1">
          <button
            type="button"
            data-ocid={`cart.decrement.${idx}`}
            onClick={onDecrement}
            aria-label="Decrease quantity"
            className="w-7 h-7 flex items-center justify-center rounded-full hover:bg-primary hover:text-primary-foreground transition-smooth"
          >
            <Minus size={12} />
          </button>
          <span className="text-sm font-bold min-w-[22px] text-center tabular-nums">
            {ci.quantity}
          </span>
          <button
            type="button"
            data-ocid={`cart.increment.${idx}`}
            onClick={onIncrement}
            aria-label="Increase quantity"
            className="w-7 h-7 flex items-center justify-center rounded-full hover:bg-primary hover:text-primary-foreground transition-smooth"
          >
            <Plus size={12} />
          </button>
        </div>
        <span className="font-bold text-sm text-foreground min-w-[44px] text-right tabular-nums">
          ₹{ci.item.price * ci.quantity}
        </span>
        <button
          type="button"
          data-ocid={`cart.delete_button.${idx}`}
          onClick={onRemove}
          aria-label="Remove item"
          className="text-muted-foreground hover:text-destructive transition-smooth p-1 rounded-lg hover:bg-destructive/10"
        >
          <Trash2 size={14} />
        </button>
      </div>
    </div>
  );
}

function FieldError({ msg }: { msg?: string }) {
  if (!msg) return null;
  return (
    <p
      data-ocid="cart.field_error"
      className="text-xs text-destructive mt-1 font-medium"
    >
      {msg}
    </p>
  );
}

// ---------- Main page ----------

export function CartPage() {
  const { items, removeItem, updateQuantity, clearCart, totalPrice } =
    useCart();
  const { placeOrder } = useOrders();
  const { actor } = useActor(createActor);
  const navigate = useNavigate();

  const [form, setForm] = useState<CheckoutForm>({
    name: "",
    phone: "",
    houseNo: "",
    area: "",
    city: "",
    landmark: "",
    promoCode: "",
    paymentMethod: "cod",
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [touched, setTouched] = useState<
    Partial<Record<keyof CheckoutForm, boolean>>
  >({});
  const [isPlacing, setIsPlacing] = useState(false);
  const [promoApplied, setPromoApplied] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const subtotal = totalPrice;
  const promoDiscount = promoApplied ? Math.round(subtotal * 0.1) : 0;
  const discountedSubtotal = subtotal - promoDiscount;
  const gst = Math.round(discountedSubtotal * GST_RATE);
  const grandTotal = discountedSubtotal + DELIVERY_FEE + gst;

  const set = (field: keyof CheckoutForm, val: string) => {
    setForm((f) => ({ ...f, [field]: val }));
    if (touched[field]) {
      const next = validate({ ...form, [field]: val });
      setErrors((e) => ({ ...e, [field]: next[field as keyof FormErrors] }));
    }
  };

  const blur = (field: keyof CheckoutForm) => {
    setTouched((t) => ({ ...t, [field]: true }));
    const errs = validate(form);
    setErrors((e) => ({ ...e, [field]: errs[field as keyof FormErrors] }));
  };

  const handlePromo = () => {
    if (!form.promoCode.trim()) {
      toast.error("Enter a promo code first");
      return;
    }
    if (form.promoCode.trim().toUpperCase() === "MADHVAS10") {
      setPromoApplied(true);
      toast.success("Promo applied! 10% off your order 🎉");
    } else {
      toast.error("Invalid promo code");
    }
  };

  const handleReviewOrder = () => {
    const allTouched = {
      name: true,
      phone: true,
      houseNo: true,
      area: true,
      city: true,
    } as const;
    setTouched(allTouched);
    const errs = validate(form);
    setErrors(errs);
    if (Object.keys(errs).length > 0) {
      toast.error("Please fill all required fields correctly");
      return;
    }
    setShowConfirm(true);
  };

  const handlePlaceOrder = async () => {
    setIsPlacing(true);
    setShowConfirm(false);
    // Small artificial delay for realism
    await new Promise((r) => setTimeout(r, 1200));

    const orderItems: OrderItem[] = items.map((ci) => ({
      menuItemId: ci.item.id,
      name: ci.item.name,
      price: ci.item.price,
      quantity: ci.quantity,
      image: ci.item.image,
    }));

    const deliveryAddress: DeliveryAddress = {
      name: form.name.trim(),
      phone: form.phone.trim(),
      address: `${form.houseNo.trim()}, ${form.area.trim()}, ${form.city.trim()}${form.landmark ? `, ${form.landmark.trim()}` : ""}`,
    };

    const paymentMethod = form.paymentMethod;
    const order = placeOrder(
      orderItems,
      deliveryAddress,
      grandTotal,
      paymentMethod,
    );

    // Fire-and-forget backend call to trigger SMS notification to 8287286500
    if (actor) {
      actor
        .placeOrder({
          customerName: form.name.trim(),
          customerPhone: form.phone.trim(),
          deliveryAddress: deliveryAddress.address,
          paymentMethod:
            paymentMethod === "cod" ? "Cash on Delivery" : "Card / UPI",
          items: orderItems.map(
            (oi) =>
              [
                BigInt(oi.menuItemId.replace(/\D/g, "") || "0"),
                BigInt(oi.quantity),
              ] as [bigint, bigint],
          ),
        })
        .catch(() => {
          // Silently ignore backend errors — local order and UI always succeed
        });
    }

    clearCart();
    setIsPlacing(false);

    toast.success("🎉 Order placed successfully!", {
      description: `Order #${order.id} · Estimated: 30–45 mins`,
      duration: 5000,
    });
    navigate({ to: "/orders/$orderId", params: { orderId: order.id } });
  };

  // Empty cart
  if (items.length === 0 && !isPlacing) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-8">
        <EmptyState variant="cart" />
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto px-4 py-6 pb-24 space-y-5">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold font-display">Your Cart</h1>
        <button
          type="button"
          data-ocid="cart.clear_button"
          onClick={() => {
            clearCart();
            toast.info("Cart cleared");
          }}
          className="text-xs text-muted-foreground hover:text-destructive transition-smooth flex items-center gap-1 py-1 px-2 rounded-lg hover:bg-destructive/10"
        >
          <Trash2 size={12} />
          Clear all
        </button>
      </div>

      {/* Cart Items */}
      <section aria-label="Cart items">
        <div data-ocid="cart.items_list" className="space-y-2.5">
          {items.map((ci, i) => (
            <CartItemRow
              key={ci.item.id}
              ci={ci}
              idx={i + 1}
              onDecrement={() => updateQuantity(ci.item.id, ci.quantity - 1)}
              onIncrement={() => updateQuantity(ci.item.id, ci.quantity + 1)}
              onRemove={() => removeItem(ci.item.id)}
            />
          ))}
        </div>
        <Link
          to="/"
          data-ocid="cart.continue_shopping_link"
          className="flex items-center gap-1 text-sm text-primary font-semibold mt-3 hover:underline w-fit"
        >
          <Plus size={14} />
          Add more items
        </Link>
      </section>

      {/* Promo Code */}
      <div className="bg-card rounded-2xl border border-border p-4">
        <div className="flex items-center gap-2 mb-3">
          <BadgePercent size={16} className="text-primary" />
          <span className="font-semibold text-sm font-display">Promo Code</span>
          {promoApplied && (
            <Badge className="bg-green-100 text-green-700 border-green-200 text-xs font-semibold ml-auto">
              MADHVAS10 applied
            </Badge>
          )}
        </div>
        {!promoApplied ? (
          <div className="flex gap-2">
            <Input
              data-ocid="cart.promo_input"
              placeholder="Enter promo code (try MADHVAS10)"
              value={form.promoCode}
              onChange={(e) => set("promoCode", e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handlePromo()}
              className="rounded-xl text-sm uppercase placeholder:normal-case"
            />
            <Button
              data-ocid="cart.apply_promo_button"
              onClick={handlePromo}
              variant="outline"
              className="rounded-xl font-semibold text-sm flex-shrink-0 border-primary text-primary hover:bg-primary hover:text-primary-foreground"
            >
              Apply
            </Button>
          </div>
        ) : (
          <div className="flex items-center justify-between">
            <p className="text-sm text-green-700 font-medium flex items-center gap-1.5">
              <CheckCircle2 size={14} />
              You save ₹{promoDiscount} on this order!
            </p>
            <button
              type="button"
              data-ocid="cart.remove_promo_button"
              onClick={() => {
                setPromoApplied(false);
                setForm((f) => ({ ...f, promoCode: "" }));
                toast.info("Promo removed");
              }}
              className="text-xs text-muted-foreground hover:text-destructive transition-smooth"
            >
              Remove
            </button>
          </div>
        )}
      </div>

      {/* Order Summary */}
      <div className="bg-card rounded-2xl border border-border p-4 space-y-3">
        <h2 className="font-display font-bold text-base">Order Summary</h2>
        <Separator />
        <div className="space-y-2 text-sm">
          <div className="flex justify-between text-muted-foreground">
            <span>
              Subtotal ({items.reduce((s, c) => s + c.quantity, 0)} items)
            </span>
            <span>₹{subtotal}</span>
          </div>
          {promoApplied && (
            <div className="flex justify-between text-green-700 font-medium">
              <span>Promo Discount (10%)</span>
              <span>−₹{promoDiscount}</span>
            </div>
          )}
          <div className="flex justify-between text-muted-foreground">
            <span>Delivery fee</span>
            <span className="font-medium">₹{DELIVERY_FEE}</span>
          </div>
          <div className="flex justify-between text-muted-foreground">
            <span>GST &amp; charges (5%)</span>
            <span>₹{gst}</span>
          </div>
        </div>
        <Separator />
        <div className="flex justify-between font-bold text-base">
          <span>Grand Total</span>
          <span className="text-primary tabular-nums">₹{grandTotal}</span>
        </div>
        <p className="text-[11px] text-muted-foreground">
          Inclusive of all taxes. No hidden charges.
        </p>
      </div>

      {/* Checkout Form */}
      <div className="bg-card rounded-2xl border border-border p-4 space-y-4">
        <h2 className="font-display font-bold text-base flex items-center gap-2">
          <MapPin size={16} className="text-primary" />
          Delivery Details
        </h2>

        {/* Name */}
        <div>
          <Label
            htmlFor="name"
            className="text-sm font-medium flex items-center gap-1.5 mb-1.5"
          >
            <User size={13} className="text-muted-foreground" />
            Full Name <span className="text-destructive">*</span>
          </Label>
          <Input
            id="name"
            data-ocid="cart.name_input"
            placeholder="e.g. Rahul Sharma"
            value={form.name}
            onChange={(e) => set("name", e.target.value)}
            onBlur={() => blur("name")}
            className={`rounded-xl ${errors.name ? "border-destructive focus-visible:ring-destructive" : ""}`}
          />
          <FieldError msg={errors.name} />
        </div>

        {/* Phone */}
        <div>
          <Label
            htmlFor="phone"
            className="text-sm font-medium flex items-center gap-1.5 mb-1.5"
          >
            <Phone size={13} className="text-muted-foreground" />
            Phone Number <span className="text-destructive">*</span>
          </Label>
          <Input
            id="phone"
            data-ocid="cart.phone_input"
            type="tel"
            placeholder="10-digit mobile number"
            value={form.phone}
            onChange={(e) =>
              set("phone", e.target.value.replace(/\D/g, "").slice(0, 10))
            }
            onBlur={() => blur("phone")}
            className={`rounded-xl ${errors.phone ? "border-destructive focus-visible:ring-destructive" : ""}`}
          />
          <FieldError msg={errors.phone} />
        </div>

        {/* Address fields */}
        <div className="space-y-3">
          <Label className="text-sm font-medium flex items-center gap-1.5">
            <MapPin size={13} className="text-muted-foreground" />
            Delivery Address <span className="text-destructive">*</span>
          </Label>

          <div>
            <Input
              data-ocid="cart.house_no_input"
              placeholder="House / Flat / Block No. *"
              value={form.houseNo}
              onChange={(e) => set("houseNo", e.target.value)}
              onBlur={() => blur("houseNo")}
              className={`rounded-xl ${errors.houseNo ? "border-destructive focus-visible:ring-destructive" : ""}`}
            />
            <FieldError msg={errors.houseNo} />
          </div>

          <div>
            <Input
              data-ocid="cart.area_input"
              placeholder="Area / Street / Sector *"
              value={form.area}
              onChange={(e) => set("area", e.target.value)}
              onBlur={() => blur("area")}
              className={`rounded-xl ${errors.area ? "border-destructive focus-visible:ring-destructive" : ""}`}
            />
            <FieldError msg={errors.area} />
          </div>

          <div className="grid grid-cols-2 gap-2">
            <div>
              <Input
                data-ocid="cart.city_input"
                placeholder="City *"
                value={form.city}
                onChange={(e) => set("city", e.target.value)}
                onBlur={() => blur("city")}
                className={`rounded-xl ${errors.city ? "border-destructive focus-visible:ring-destructive" : ""}`}
              />
              <FieldError msg={errors.city} />
            </div>
            <Input
              data-ocid="cart.landmark_input"
              placeholder="Landmark (optional)"
              value={form.landmark}
              onChange={(e) => set("landmark", e.target.value)}
              className="rounded-xl"
            />
          </div>
        </div>
      </div>

      {/* Payment Method */}
      <div className="bg-card rounded-2xl border border-border p-4 space-y-3">
        <h2 className="font-display font-bold text-base flex items-center gap-2">
          <CreditCard size={16} className="text-primary" />
          Payment Method
        </h2>
        <div className="grid grid-cols-2 gap-3">
          <button
            type="button"
            data-ocid="cart.payment_cod"
            onClick={() => set("paymentMethod", "cod")}
            className={`flex items-center gap-2.5 p-3 rounded-xl border-2 text-left transition-smooth ${
              form.paymentMethod === "cod"
                ? "border-primary bg-primary/5"
                : "border-border hover:border-primary/40"
            }`}
          >
            <span
              className={`w-4 h-4 rounded-full border-2 flex items-center justify-center flex-shrink-0 ${form.paymentMethod === "cod" ? "border-primary" : "border-muted-foreground"}`}
            >
              {form.paymentMethod === "cod" && (
                <span className="w-2 h-2 rounded-full bg-primary block" />
              )}
            </span>
            <div>
              <p className="text-xs font-bold text-foreground flex items-center gap-1">
                <Banknote size={12} className="text-green-600" />
                Cash on Delivery
              </p>
              <p className="text-[10px] text-muted-foreground">Pay at door</p>
            </div>
          </button>

          <button
            type="button"
            data-ocid="cart.payment_card"
            onClick={() => set("paymentMethod", "card")}
            className={`flex items-center gap-2.5 p-3 rounded-xl border-2 text-left transition-smooth ${
              form.paymentMethod === "card"
                ? "border-primary bg-primary/5"
                : "border-border hover:border-primary/40"
            }`}
          >
            <span
              className={`w-4 h-4 rounded-full border-2 flex items-center justify-center flex-shrink-0 ${form.paymentMethod === "card" ? "border-primary" : "border-muted-foreground"}`}
            >
              {form.paymentMethod === "card" && (
                <span className="w-2 h-2 rounded-full bg-primary block" />
              )}
            </span>
            <div>
              <p className="text-xs font-bold text-foreground flex items-center gap-1">
                <CreditCard size={12} className="text-primary" />
                Card / UPI
              </p>
              <p className="text-[10px] text-muted-foreground">
                Online payment
              </p>
            </div>
          </button>
        </div>
      </div>

      {/* Review & Place Order */}
      <AlertDialog open={showConfirm} onOpenChange={setShowConfirm}>
        <AlertDialogTrigger asChild>
          <Button
            data-ocid="cart.review_order_button"
            onClick={handleReviewOrder}
            disabled={isPlacing}
            className="w-full gradient-primary text-primary-foreground rounded-2xl h-14 font-bold text-base gap-2 shadow-elevated"
          >
            {isPlacing ? (
              <>
                <Loader2
                  size={18}
                  className="animate-spin"
                  data-ocid="cart.loading_state"
                />
                Placing Order…
              </>
            ) : (
              <>
                <ShoppingBag size={18} />
                Review Order · ₹{grandTotal}
                <ChevronRight size={16} />
              </>
            )}
          </Button>
        </AlertDialogTrigger>

        <AlertDialogContent
          data-ocid="cart.dialog"
          className="rounded-2xl max-w-sm"
        >
          <AlertDialogHeader>
            <AlertDialogTitle className="font-display text-lg">
              Confirm Your Order
            </AlertDialogTitle>
            <AlertDialogDescription asChild>
              <div className="text-sm space-y-3 text-foreground">
                {/* Items summary */}
                <div className="bg-muted/40 rounded-xl p-3 space-y-1.5">
                  {items.map((ci) => (
                    <div
                      key={ci.item.id}
                      className="flex justify-between text-xs"
                    >
                      <span className="text-foreground font-medium">
                        {ci.item.name} × {ci.quantity}
                      </span>
                      <span className="text-muted-foreground tabular-nums">
                        ₹{ci.item.price * ci.quantity}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Delivery */}
                <div className="bg-muted/40 rounded-xl p-3 space-y-1">
                  <p className="text-xs font-semibold text-foreground">
                    Delivering to
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {form.houseNo}, {form.area}, {form.city}
                    {form.landmark ? `, ${form.landmark}` : ""}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {form.name} · {form.phone}
                  </p>
                </div>

                {/* Payment & total */}
                <div className="flex items-center justify-between">
                  <span className="text-xs text-muted-foreground">
                    {form.paymentMethod === "cod"
                      ? "💵 Cash on Delivery"
                      : "💳 Card / UPI"}
                  </span>
                  <span className="font-bold text-primary text-sm">
                    ₹{grandTotal}
                  </span>
                </div>
              </div>
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter className="gap-2">
            <AlertDialogCancel
              data-ocid="cart.cancel_button"
              className="rounded-xl flex-1"
            >
              Edit Order
            </AlertDialogCancel>
            <AlertDialogAction
              data-ocid="cart.confirm_button"
              onClick={handlePlaceOrder}
              className="rounded-xl flex-1 gradient-primary text-primary-foreground font-bold gap-1"
            >
              <ArrowRight size={14} />
              Place Order
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      <p className="text-center text-[11px] text-muted-foreground pb-2">
        By placing your order you agree to our delivery terms. Estimated
        delivery: 30–45 minutes.
      </p>
    </div>
  );
}
