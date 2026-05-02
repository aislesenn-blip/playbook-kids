with open('unimonday-web/src/app/checkout/page.tsx', 'r') as f:
    content = f.read()

content = content.replace('import Link from "next/link";', 'import Link from "next/link";\nimport { useAppStore } from "@/lib/store/app-store";\nimport { useRouter } from "next/navigation";\nimport { toast } from "sonner";')

hook_injection = """export default function CheckoutPage() {
  const router = useRouter();
  const { cart, getCartTotal, clearCart } = useAppStore();
  const total = getCartTotal();
  const deliveryFee = 2000;

  if (cart.length === 0) {
    return (
      <div className="max-w-xl mx-auto py-16 px-4 text-center">
        <h1 className="text-2xl font-bold mb-4">Your cart is empty</h1>
        <button onClick={() => router.push('/explore')} className="text-primary hover:underline font-bold">Start Shopping</button>
      </div>
    );
  }

  const handleCheckout = () => {
     toast.success("Order confirmed!");
     clearCart();
     router.push('/orders');
  };
"""

import re
content = re.sub(r'export default function CheckoutPage\(\) \{', hook_injection, content)

cart_ui = """
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

        <button onClick={handleCheckout} className="block w-full bg-primary text-white font-bold py-4 rounded-xl hover:bg-primary/90 transition-colors shadow-lg shadow-primary/20">
          Confirm Order & Pay
        </button>
"""

content = re.sub(r'<div className="bg-gray-50 rounded-2xl p-6 mb-8 text-left">.*?</Link>', cart_ui, content, flags=re.DOTALL)

with open('unimonday-web/src/app/checkout/page.tsx', 'w') as f:
    f.write(content)

print("Checkout details patched")
