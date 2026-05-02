"use client";


import { useAppStore } from "@/lib/store/app-store";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { useEffect, useState } from "react";
import { Trash2, Plus, Minus } from "lucide-react";

export default function CheckoutPage() {
  const router = useRouter();
  const { currentUser, cart, getCartTotal, clearCart, updateQuantity, removeFromCart } = useAppStore();

  const total = getCartTotal();
  // We assume delivery is coordinated with the vendor

  useEffect(() => {
    if (!currentUser) {
      toast.error("Please login to place an order");
      router.push('/auth/login?redirectTo=/checkout');
    }
  }, [currentUser, router]);

  if (!currentUser) {
    return null; // Return nothing while redirecting
  }

  if (cart.length === 0) {
    return (
      <div className="max-w-xl mx-auto py-16 px-4 text-center">
        <h1 className="text-2xl font-bold mb-4">Your cart is empty</h1>
        <button onClick={() => router.push('/explore')} className="text-primary hover:underline font-bold">Start Shopping</button>
      </div>
    );
  }

  const handleCheckout = () => {
     toast.success("Order placed successfully!");
     toast("We will get back to you shortly in a couple of hours as we verify and check the products. Please check your chat section.", {
        duration: 8000,
     });
     clearCart();
     router.push('/chat');
  };

  return (
    <div className="max-w-xl mx-auto py-16 px-4">
      <div className="bg-white p-8 rounded-[2rem] border border-border shadow-sm text-center">
        <h1 className="text-3xl font-black mb-4">Checkout</h1>
        <p className="text-muted-foreground mb-6 font-medium">Review your order details and confirm.</p>


        <div className="bg-gray-50 rounded-2xl p-6 mb-6 text-left space-y-6">
          {cart.map((item) => (
             <div key={item.id} className="flex flex-col gap-3">
               <div className="flex justify-between items-start">
                 <span className="font-bold max-w-[70%]">{item.product.name}</span>
                 <span className="font-bold text-gray-900 shrink-0">Tsh {(item.product.price * item.quantity).toLocaleString()}</span>
               </div>
               <div className="flex items-center justify-between">
                 <div className="flex items-center gap-3 bg-white border border-border rounded-lg px-2 py-1">
                   <button
                     onClick={() => updateQuantity(item.id, item.quantity - 1)}
                     className="p-1 hover:bg-gray-100 rounded text-gray-600"
                   >
                     <Minus className="w-4 h-4" />
                   </button>
                   <span className="font-bold w-4 text-center text-sm">{item.quantity}</span>
                   <button
                     onClick={() => updateQuantity(item.id, item.quantity + 1)}
                     className="p-1 hover:bg-gray-100 rounded text-gray-600"
                   >
                     <Plus className="w-4 h-4" />
                   </button>
                 </div>
                 <button
                   onClick={() => removeFromCart(item.id)}
                   className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                 >
                   <Trash2 className="w-4 h-4" />
                 </button>
               </div>
             </div>
          ))}

          <hr className="my-4 border-border" />
          <div className="flex justify-between items-center text-sm text-muted-foreground">
            <span>Subtotal</span>
            <span>Tsh {total.toLocaleString()}</span>
          </div>
        </div>

        <div className="bg-amber-50 border border-amber-200 rounded-2xl p-6 text-left mb-6 space-y-4">
            <h3 className="font-bold text-amber-900">Payment & Delivery Info</h3>
            <div className="space-y-3 text-sm text-amber-800/90 font-medium leading-relaxed">
              <p>📍 <strong>Delivery:</strong> Handled by the vendor. It can be Free delivery within Dar es Salaam, or depends on your exact location. You will discuss this in the chat.</p>
              <p>💳 <strong>Payment:</strong> Do not pay within the app. Vendor accepts Mobile Money (M-Pesa, etc.) or Pay on Delivery. Once agreed in chat, you will send the proof of payment.</p>
            </div>
        </div>

        <button onClick={handleCheckout} className="block w-full bg-primary text-white font-bold py-4 rounded-xl hover:bg-primary/90 transition-colors shadow-lg shadow-primary/20">
          Confirm Order & Pay
        </button>

      </div>
    </div>
  );
}
