"use client";

import Link from "next/link";

export default function CheckoutPage() {
  return (
    <div className="max-w-xl mx-auto py-16 px-4">
      <div className="bg-white p-8 rounded-[2rem] border border-border shadow-sm text-center">
        <h1 className="text-3xl font-black mb-4">Checkout</h1>
        <p className="text-muted-foreground mb-8 font-medium">Review your order details and confirm.</p>

        <div className="bg-gray-50 rounded-2xl p-6 mb-8 text-left">
          <div className="flex justify-between items-center mb-4">
            <span className="font-bold">Item</span>
            <span className="font-bold text-primary">Tsh 45,000</span>
          </div>
          <div className="flex justify-between items-center text-sm text-muted-foreground">
            <span>Delivery Fee</span>
            <span>Tsh 2,000</span>
          </div>
          <hr className="my-4 border-border" />
          <div className="flex justify-between items-center">
            <span className="font-black text-lg">Total</span>
            <span className="font-black text-lg text-primary">Tsh 47,000</span>
          </div>
        </div>

        <Link href="/orders" className="block w-full bg-primary text-white font-bold py-4 rounded-xl hover:bg-primary/90 transition-colors shadow-lg shadow-primary/20">
          Confirm Order & Pay
        </Link>
      </div>
    </div>
  );
}
