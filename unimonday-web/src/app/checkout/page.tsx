"use client";


import { useAppStore } from "@/lib/store/app-store";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { useEffect, useState } from "react";

export default function CheckoutPage() {
  const router = useRouter();
  const { cart, getCartTotal, clearCart, currentUser } = useAppStore();
  const total = getCartTotal();
  const deliveryFee = 2000;
  const [deliveryMethod, setDeliveryMethod] = useState("Meetup at Campus");
  const [paymentMethod, setPaymentMethod] = useState("Pay on Delivery");

  useEffect(() => {
    if (!currentUser) {
      toast.error("Please login to proceed to checkout");
      router.push("/auth/login?redirectTo=/checkout");
    }
  }, [currentUser, router]);

  if (!currentUser) {
    return null; // Don't render anything while redirecting
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
     toast.success("We will get back to you in a couple hours as we verify and check the products. Check your chat section.", {
       duration: 5000,
     });
     clearCart();
     router.push('/chat');
  };

  return (
    <div className="max-w-xl mx-auto py-16 px-4">
      <div className="bg-white p-8 rounded-[2rem] border border-border shadow-sm text-center">
        <h1 className="text-3xl font-black mb-4">Checkout</h1>
        <p className="text-muted-foreground mb-8 font-medium">Review your order details and confirm.</p>


        <div className="bg-gray-50 rounded-2xl p-6 mb-8 text-left space-y-4">
          {cart.map((item) => (
             <div key={item.id} className="flex justify-between items-center">
               <span className="font-bold">{item.quantity}x {item.product.name}</span>
               <span className="font-bold text-gray-900">Tsh {(item.product.price * item.quantity).toLocaleString()}</span>
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

        <div className="bg-gray-50 rounded-2xl p-6 mb-8 text-left space-y-6">
          <div>
            <label className="block text-sm font-bold mb-3 text-gray-900">Delivery Method</label>
            <div className="space-y-2">
              {['Meetup at Campus', 'Leta Hostel', 'Pickup'].map((method) => (
                <label key={method} className="flex items-center gap-3 p-3 border border-border rounded-xl cursor-pointer hover:bg-white transition-colors">
                  <input
                    type="radio"
                    name="delivery"
                    value={method}
                    checked={deliveryMethod === method}
                    onChange={(e) => setDeliveryMethod(e.target.value)}
                    className="w-4 h-4 text-primary focus:ring-primary"
                  />
                  <span className="font-medium text-gray-700">{method}</span>
                </label>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-sm font-bold mb-3 text-gray-900">Payment Method</label>
            <div className="space-y-2">
              {['Pay on Delivery', 'Mobile Money'].map((method) => (
                <label key={method} className="flex items-center gap-3 p-3 border border-border rounded-xl cursor-pointer hover:bg-white transition-colors">
                  <input
                    type="radio"
                    name="payment"
                    value={method}
                    checked={paymentMethod === method}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                    className="w-4 h-4 text-primary focus:ring-primary"
                  />
                  <span className="font-medium text-gray-700">{method}</span>
                </label>
              ))}
            </div>
          </div>
        </div>

        <button onClick={handleCheckout} className="block w-full bg-primary text-white font-bold py-4 rounded-xl hover:bg-primary/90 transition-colors shadow-lg shadow-primary/20 text-lg">
          Confirm Order
        </button>

      </div>
    </div>
  );
}
