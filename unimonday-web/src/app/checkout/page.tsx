"use client";


import { useAppStore } from "@/lib/store/app-store";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { useEffect } from "react";
import { Trash2, Plus, Minus } from "lucide-react";
import { mockVendors } from "@/lib/mockData";

export default function CheckoutPage() {
  const router = useRouter();
  const { currentUser, cart, getCartTotal, clearCart, updateQuantity, removeFromCart } = useAppStore();

  const total = getCartTotal();

  // Get unique vendors from cart items
  const cartVendorIds = Array.from(new Set(cart.map((item) => item.product.vendorId)));
  const cartVendors = mockVendors.filter((vendor) => cartVendorIds.includes(vendor.id));

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
     // Generate order messages for each vendor
     cartVendors.forEach(vendor => {
       const vendorItems = cart.filter(item => item.product.vendorId === vendor.id);
       const itemsText = vendorItems.map(item => `${item.quantity}x ${item.product.name}`).join(", ");
       const vendorTotal = vendorItems.reduce((acc, item) => acc + (item.product.price * item.quantity), 0);

       const message = `Hello! I just placed an order for: ${itemsText}. Total: Tsh ${vendorTotal.toLocaleString()}. How do we proceed with payment and delivery?`;
       useAppStore.getState().addPendingMessage(vendor.id, message);
     });

     toast.success("Order placed successfully!");
     toast("We will get back to you shortly in a couple of hours as we verify and check the products. Please check your chat section.", {
        duration: 8000,
     });
     clearCart();

     // Intelligent routing: if 1 vendor, go to their chat. If multiple, go to inbox.
     if (cartVendors.length === 1) {
       router.push(`/chat?vendor=${cartVendors[0].id}`);
     } else {
       router.push('/chat');
     }
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
          <div className="flex justify-between items-center">
            <span className="font-black text-lg">Total Items</span>
            <span className="font-black text-lg text-primary">Tsh {total.toLocaleString()}</span>
          </div>
        </div>

        {cartVendors.length > 0 && (
          <div className="bg-blue-50/50 p-6 rounded-2xl border border-blue-100 mb-6 text-left">
            <h3 className="font-bold text-lg mb-4 text-blue-900">Payment & Delivery Information</h3>
            <div className="space-y-4">
              {cartVendors.map((vendor) => (
                <div key={vendor.id} className="bg-white p-4 rounded-xl border border-blue-50 shadow-sm">
                  <h4 className="font-bold text-gray-900 mb-2">{vendor.storeName}</h4>
                  <p className="text-sm text-gray-700 leading-relaxed">
                    {vendor.paymentAndDeliveryInfo || "Contact vendor for payment and delivery details."}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}

        <button onClick={handleCheckout} className="block w-full bg-primary text-white font-bold py-4 rounded-xl hover:bg-primary/90 transition-colors shadow-lg shadow-primary/20">
          Place Order & Contact Vendor
        </button>

      </div>
    </div>
  );
}
