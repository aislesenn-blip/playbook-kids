"use client";

import { useCartStore } from "@/lib/store/cart-store";
import { ArrowLeft, Minus, Plus, CreditCard } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { useState } from "react";

export default function CartPage() {
  const { items, addItem, removeItem, total, clearCart } = useCartStore();
  const router = useRouter();
  const [isProcessing, setIsProcessing] = useState(false);

  const handleCheckout = async () => {
    if (items.length === 0) return;

    setIsProcessing(true);

    // Simulate Snippe.io API call delay
    toast.loading("Initiating Snippe Pay...", { id: "checkout" });

    setTimeout(() => {
      // In a real app, this would redirect to Snippe checkout URL or open a modal
      // and wait for webhook confirmation before clearing cart and showing ticket.

      toast.success("Payment successful!", { id: "checkout" });
      clearCart();
      setIsProcessing(false);

      // Redirect to the active ticket page (mocking an order ID)
      router.push(`/ticket/ORDER-${Math.floor(Math.random() * 10000)}`);
    }, 2000);
  };

  if (items.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] text-center px-4">
        <div className="w-24 h-24 bg-secondary rounded-full flex items-center justify-center mb-6">
          <CreditCard className="w-10 h-10 text-muted-foreground opacity-50" />
        </div>
        <h2 className="text-2xl font-bold mb-2">Your cart is empty</h2>
        <p className="text-muted-foreground mb-8">Add some items from the explore page.</p>
        <Link
          href="/explore"
          className="bg-primary text-primary-foreground px-8 py-4 rounded-full font-bold hover:bg-primary/90 transition-colors"
        >
          Go to Explore
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto pb-24 pt-4">
      <div className="flex items-center gap-4 mb-8">
        <button onClick={() => router.back()} className="p-2 bg-secondary rounded-full hover:bg-secondary/80 transition-colors">
          <ArrowLeft className="w-5 h-5" />
        </button>
        <h1 className="text-3xl font-bold tracking-tight">Your Order</h1>
      </div>

      <div className="bg-white rounded-[2rem] border border-border/50 shadow-sm p-6 mb-8 space-y-6">
        {items.map((item) => (
          <div key={item.id} className="flex items-center gap-4 py-2 border-b border-border/50 last:border-0">
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

      <div className="bg-white rounded-[2rem] border border-border/50 shadow-sm p-6 space-y-4">
        <div className="flex justify-between text-muted-foreground">
          <span>Subtotal</span>
          <span>Tsh {total}</span>
        </div>
        <div className="flex justify-between text-muted-foreground">
          <span>Convenience Fee</span>
          <span>Tsh 200</span>
        </div>
        <div className="pt-4 border-t border-border/50 flex justify-between font-black text-xl">
          <span>Total</span>
          <span>Tsh {total + 200}</span>
        </div>

        <button
          onClick={handleCheckout}
          disabled={isProcessing}
          className="w-full mt-6 bg-primary text-primary-foreground py-5 rounded-full font-bold text-lg hover:bg-primary/90 hover:scale-[1.02] transition-all active:scale-95 flex items-center justify-center gap-2 disabled:opacity-70 disabled:hover:scale-100"
        >
          {isProcessing ? "Processing..." : `Pay Tsh ${total + 200} Instantly`}
        </button>
        <p className="text-center text-xs text-muted-foreground mt-4 font-medium flex items-center justify-center gap-1">
          Secured by Snippe.io <ShieldIcon />
        </p>
      </div>
    </div>
  );
}

function ShieldIcon() {
  return (
    <svg width="12" height="14" viewBox="0 0 12 14" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M6 0L0 2.66667V6.66667C0 10.3667 2.56 13.82 6 14.6667C9.44 13.82 12 10.3667 12 6.66667V2.66667L6 0ZM6 6.66667H10.6667C10.2933 9.4 8.44667 11.8333 6 12.5533V6.66667H1.33333V3.71333L6 1.64V6.66667Z" fill="currentColor"/>
    </svg>
  );
}
