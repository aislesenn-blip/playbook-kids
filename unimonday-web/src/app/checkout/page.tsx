"use client";


import { useAppStore } from "@/lib/store/app-store";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { useEffect, useState } from "react";
import { Trash2, Plus, Minus } from "lucide-react";

export default function CheckoutPage() {
  const router = useRouter();
  const { currentUser, cart, getCartTotal, clearCart, updateQuantity, removeFromCart } = useAppStore();
  const [deliveryMethod, setDeliveryMethod] = useState("meetup");
  const [paymentMethod, setPaymentMethod] = useState("pod");

  const total = getCartTotal();
  const deliveryFee = deliveryMethod === "pickup" ? 0 : 2000;

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
            <span>Delivery Fee</span>
            <span>Tsh {deliveryFee.toLocaleString()}</span>
          </div>
          <hr className="my-4 border-border" />
          <div className="flex justify-between items-center">
            <span className="font-black text-lg">Total</span>
            <span className="font-black text-lg text-primary">Tsh {(total + deliveryFee).toLocaleString()}</span>
          </div>
        </div>

        <div className="text-left mb-6 space-y-4">
            <div>
              <label className="block text-sm font-bold mb-2">Delivery Method</label>
              <select
                value={deliveryMethod}
                onChange={(e) => setDeliveryMethod(e.target.value)}
                className="w-full px-4 py-4 bg-gray-50 border border-border rounded-xl font-medium focus:outline-none focus:ring-2 focus:ring-primary focus:bg-white transition-all appearance-none"
              >
                <option value="meetup">Meetup at Campus (Tsh 2,000)</option>
                <option value="hostel">Leta Hostel (Tsh 2,000)</option>
                <option value="pickup">Pickup at Store (Free)</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-bold mb-2">Payment Method</label>
              <select
                value={paymentMethod}
                onChange={(e) => setPaymentMethod(e.target.value)}
                className="w-full px-4 py-4 bg-gray-50 border border-border rounded-xl font-medium focus:outline-none focus:ring-2 focus:ring-primary focus:bg-white transition-all appearance-none"
              >
                <option value="pod">Pay on Delivery (Cash)</option>
                <option value="mobile">Mobile Money</option>
              </select>
            </div>
        </div>

        <button onClick={handleCheckout} className="block w-full bg-primary text-white font-bold py-4 rounded-xl hover:bg-primary/90 transition-colors shadow-lg shadow-primary/20">
          Confirm Order & Pay
        </button>

      </div>
    </div>
  );
}
