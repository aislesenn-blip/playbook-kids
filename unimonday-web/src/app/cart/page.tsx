"use client";

import { useCartStore } from "@/lib/store/cart-store";
import { ArrowLeft, Minus, Plus, CreditCard, ShieldCheck, Tag } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { useState } from "react";
import { MOCK_VENDORS } from "@/lib/data/mock-data";

export default function CartPage() {
  const { items, addItem, removeItem, total, clearCart } = useCartStore();
  const router = useRouter();
  const [isProcessing, setIsProcessing] = useState(false);
  const [couponCode, setCouponCode] = useState("");
  const [discount, setDiscount] = useState<number | "FEE">(0);

  // Group items by Vendor to show the user where they are ordering from
  const vendorGroupedItems = items.reduce((acc, item) => {
    if (!acc[item.vendorId]) {
      acc[item.vendorId] = [];
    }
    acc[item.vendorId].push(item);
    return acc;
  }, {} as Record<string, typeof items>);

  const handleApplyCoupon = () => {
    if (couponCode.toUpperCase() === 'UNIMONDAY20') {
      setDiscount(0.20);
      toast.success("20% Coupon Applied!");
    } else if (couponCode.toUpperCase() === 'FREEFEE') {
      setDiscount('FEE');
      toast.success("Convenience Fee Waived!");
    } else {
      toast.error("Invalid coupon code.");
      setDiscount(0);
    }
  };

  const calculateFinalTotal = () => {
    let subtotal = total;
    let fee = 200;

    if (typeof discount === 'number') {
      subtotal = subtotal - (subtotal * discount);
    } else if (discount === 'FEE') {
      fee = 0;
    }

    return { subtotal, fee, final: subtotal + fee };
  };

  const totals = calculateFinalTotal();

  const handleCheckout = async () => {
    if (items.length === 0) return;

    setIsProcessing(true);

    // Simulate Snippe.io API call delay
    toast.loading("Initiating Snippe Pay...", { id: "checkout" });

    setTimeout(() => {
      toast.success("Payment successful!", { id: "checkout" });
      clearCart();
      setIsProcessing(false);

      router.push(`/ticket/ORD-${Math.floor(Math.random() * 10000)}`);
    }, 2000);
  };

  if (items.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] text-center px-4">
        <div className="w-24 h-24 bg-secondary rounded-full flex items-center justify-center mb-6 shadow-sm">
          <CreditCard className="w-10 h-10 text-muted-foreground opacity-50" />
        </div>
        <h2 className="text-2xl font-bold mb-2">Your cart is empty</h2>
        <p className="text-muted-foreground mb-8">Add some items from the explore page.</p>
        <Link
          href="/explore"
          className="bg-primary text-primary-foreground px-8 py-4 rounded-full font-bold hover:bg-primary/90 transition-all shadow-md active:scale-95"
        >
          Go to Explore
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto pb-32 pt-4 px-4 sm:px-0">
      <div className="flex items-center gap-4 mb-8">
        <button onClick={() => router.back()} className="p-2 bg-secondary rounded-full hover:bg-secondary/80 transition-colors">
          <ArrowLeft className="w-5 h-5" />
        </button>
        <h1 className="text-3xl font-bold tracking-tight">Your Order</h1>
      </div>

      <div className="space-y-6 mb-8">
        {Object.entries(vendorGroupedItems).map(([vendorId, vendorItems]) => {
          const vendor = MOCK_VENDORS.find(v => v.id === vendorId);
          if (!vendor) return null;

          return (
             <div key={vendorId} className="bg-white rounded-[2rem] border border-border/50 shadow-sm p-6">
                <div className="flex items-center gap-3 mb-4 pb-4 border-b border-border/50">
                  <div className="relative w-8 h-8 rounded-full overflow-hidden">
                     <Image src={vendor.image} alt={vendor.name} fill className="object-cover" />
                  </div>
                  <h2 className="font-bold text-lg">{vendor.name}</h2>
                </div>

                <div className="space-y-6">
                  {vendorItems.map((item) => (
                    <div key={item.id} className="flex items-center gap-4">
                      <div className="relative w-16 h-16 rounded-2xl overflow-hidden shrink-0">
                        <Image src={item.image} alt={item.name} fill className="object-cover" />
                      </div>

                      <div className="flex-1 min-w-0">
                        <h3 className="font-bold truncate">{item.name}</h3>
                        <p className="text-primary font-bold text-sm">Tsh {item.price}</p>
                      </div>

                      <div className="flex items-center gap-3 bg-secondary rounded-full p-1 shrink-0">
                        <button
                          onClick={() => removeItem(item.id)}
                          className="w-8 h-8 rounded-full bg-white flex items-center justify-center shadow-sm active:scale-95 text-foreground"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="font-bold text-sm w-4 text-center">{item.quantity}</span>
                        <button
                          onClick={() => addItem(item)}
                          className="w-8 h-8 rounded-full bg-primary flex items-center justify-center shadow-sm active:scale-95 text-white"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
             </div>
          );
        })}
      </div>

      {/* Coupon Code Section */}
      <div className="bg-white rounded-[2rem] border border-border/50 shadow-sm p-4 mb-8 flex items-center gap-3 focus-within:ring-2 ring-primary/20 transition-all">
        <Tag className="w-5 h-5 text-muted-foreground ml-2 shrink-0" />
        <input
          type="text"
          value={couponCode}
          onChange={(e) => setCouponCode(e.target.value)}
          placeholder="Apply Coupon (e.g. UNIMONDAY20)"
          className="flex-1 bg-transparent outline-none font-medium placeholder:text-muted-foreground/50"
        />
        <button
          onClick={handleApplyCoupon}
          disabled={!couponCode}
          className="px-4 py-2 bg-secondary text-foreground font-bold rounded-full text-sm hover:bg-secondary/80 disabled:opacity-50 transition-colors"
        >
          Apply
        </button>
      </div>

      {/* Total Section */}
      <div className="bg-white rounded-[2rem] border border-border/50 shadow-sm p-6 space-y-4">
        <div className="flex justify-between text-muted-foreground font-medium">
          <span>Subtotal</span>
          <span>Tsh {total}</span>
        </div>

        {typeof discount === 'number' && discount > 0 && (
          <div className="flex justify-between text-primary font-bold">
            <span>Discount ({(discount * 100)}%)</span>
            <span>- Tsh {total * discount}</span>
          </div>
        )}

        <div className="flex justify-between text-muted-foreground font-medium">
          <span>Convenience Fee</span>
          <span className={discount === 'FEE' ? 'line-through text-destructive' : ''}>
            Tsh {discount === 'FEE' ? '200' : totals.fee}
          </span>
        </div>

        <div className="pt-4 border-t border-border/50 flex justify-between font-black text-2xl">
          <span>Total</span>
          <span>Tsh {totals.final}</span>
        </div>

        <button
          onClick={handleCheckout}
          disabled={isProcessing}
          className="w-full mt-6 bg-foreground text-background py-5 rounded-full font-bold text-lg hover:bg-foreground/90 hover:scale-[1.02] transition-all active:scale-95 flex items-center justify-center gap-2 disabled:opacity-70 disabled:hover:scale-100 shadow-xl"
        >
          {isProcessing ? "Processing..." : `Pay Tsh ${totals.final} Instantly`}
        </button>
        <p className="text-center text-xs text-muted-foreground mt-4 font-medium flex items-center justify-center gap-1">
          Secured by Snippe.io <ShieldCheck className="w-3 h-3" />
        </p>
      </div>
    </div>
  );
}
