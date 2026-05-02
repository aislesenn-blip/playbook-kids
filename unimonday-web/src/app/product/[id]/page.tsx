"use client";

import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { ShoppingBag, MessageCircle, Star, ShieldCheck, ChevronLeft, CheckCircle2, X } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function ProductDetails() {
  const router = useRouter();
  const [showCheckout, setShowCheckout] = useState(false);
  const [orderComplete, setOrderComplete] = useState(false);

  const handleCheckout = () => {
    setOrderComplete(true);
    setTimeout(() => {
      router.push('/orders');
    }, 2000);
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <button
        onClick={() => router.back()}
        className="flex items-center gap-2 text-muted-foreground hover:text-gray-900 font-bold mb-8 transition-colors"
      >
        <ChevronLeft className="w-5 h-5" /> Back
      </button>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        {/* Images */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="relative h-[500px] md:h-[600px] rounded-[3rem] overflow-hidden shadow-xl"
        >
          <Image
            src="https://images.unsplash.com/photo-1546868871-7041f2a55e12?q=80&w=2064&auto=format&fit=crop"
            alt="Pro Wireless Earbuds"
            fill
            className="object-cover"
            priority
          />
        </motion.div>

        {/* Details */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="flex flex-col justify-center"
        >
          <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full font-bold text-sm mb-6 w-fit">
            <ShieldCheck className="w-4 h-4" /> Verified Vendor
          </div>

          <h1 className="text-4xl sm:text-5xl font-black text-gray-900 mb-4 tracking-tight">Pro Wireless Earbuds</h1>

          <div className="flex items-center gap-4 mb-6">
            <span className="text-3xl font-black text-primary">Tsh 45,000</span>
            <div className="flex items-center text-amber-500">
              <Star className="w-5 h-5 fill-current" />
              <Star className="w-5 h-5 fill-current" />
              <Star className="w-5 h-5 fill-current" />
              <Star className="w-5 h-5 fill-current" />
              <Star className="w-5 h-5 fill-current opacity-30" />
              <span className="text-muted-foreground text-sm font-medium ml-2 text-gray-600">(24 Reviews)</span>
            </div>
          </div>

          <p className="text-lg text-muted-foreground mb-8 leading-relaxed font-medium">
            High-quality wireless earbuds perfect for studying in the library or commuting. Features active noise cancellation, 24-hour battery life, and deep bass. Includes a free silicone protective case.
          </p>

          <div className="bg-gray-50 rounded-[2rem] p-6 mb-8 border border-border">
            <h3 className="font-bold text-gray-900 mb-2">Vendor Information</h3>
            <p className="text-gray-600 mb-1 font-medium">TechZone UDSM</p>
            <p className="text-sm text-muted-foreground">Location: Block A, Room 12</p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4">
            <button
              onClick={() => setShowCheckout(true)}
              className="flex-1 bg-gray-900 text-white hover:bg-gray-800 font-bold py-5 rounded-[1.5rem] flex items-center justify-center gap-3 transition-colors shadow-xl shadow-gray-900/20 text-lg"
            >
              <ShoppingBag className="w-6 h-6" /> Order Now
            </button>
            <button
              onClick={() => router.push('/chat')}
              className="flex-1 bg-primary/10 text-primary hover:bg-primary/20 font-bold py-5 rounded-[1.5rem] flex items-center justify-center gap-3 transition-colors text-lg"
            >
              <MessageCircle className="w-6 h-6" /> Chat with Seller
            </button>
          </div>
        </motion.div>
      </div>

      {/* Checkout Modal */}
      <AnimatePresence>
        {showCheckout && (
          <div className="fixed inset-0 z-50 flex items-center justify-center px-4 bg-gray-900/40 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="bg-white rounded-[2rem] shadow-2xl w-full max-w-md overflow-hidden relative"
            >
              {!orderComplete ? (
                <>
                  <div className="p-6 border-b border-border flex items-center justify-between">
                    <h2 className="text-2xl font-black">Instant Checkout</h2>
                    <button onClick={() => setShowCheckout(false)} className="p-2 bg-gray-100 hover:bg-gray-200 rounded-full transition-colors">
                      <X className="w-5 h-5 text-gray-600" />
                    </button>
                  </div>

                  <div className="p-6">
                    <div className="flex items-center gap-4 mb-6 bg-gray-50 p-4 rounded-2xl border border-border">
                       <div className="relative w-16 h-16 rounded-xl overflow-hidden shrink-0">
                        <Image src="https://images.unsplash.com/photo-1546868871-7041f2a55e12?q=80&w=2064&auto=format&fit=crop" alt="Item" fill className="object-cover" />
                       </div>
                       <div>
                         <h4 className="font-bold">Pro Wireless Earbuds</h4>
                         <p className="text-primary font-black text-lg">Tsh 45,000</p>
                       </div>
                    </div>

                    <div className="space-y-4 mb-8">
                      <h3 className="font-bold text-gray-900">Payment Method</h3>
                      <button className="w-full flex items-center justify-between p-4 border-2 border-primary bg-primary/5 rounded-2xl">
                         <span className="font-bold flex items-center gap-2">📱 Mobile Money</span>
                         <span className="w-5 h-5 rounded-full border-4 border-primary bg-white"></span>
                      </button>
                      <button className="w-full flex items-center justify-between p-4 border border-border hover:bg-gray-50 rounded-2xl transition-colors text-gray-500">
                         <span className="font-bold flex items-center gap-2">💵 Pay on Pickup</span>
                         <span className="w-5 h-5 rounded-full border-2 border-gray-300"></span>
                      </button>
                    </div>

                    <button
                      onClick={handleCheckout}
                      className="w-full bg-primary hover:bg-primary/90 text-white font-black py-4 rounded-xl flex items-center justify-center gap-2 transition-transform active:scale-95 text-lg"
                    >
                      Pay Tsh 45,000 Now
                    </button>
                  </div>
                </>
              ) : (
                <div className="p-10 flex flex-col items-center justify-center text-center min-h-[400px]">
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", bounce: 0.5 }}
                    className="w-24 h-24 bg-primary/20 text-primary rounded-full flex items-center justify-center mb-6"
                  >
                    <CheckCircle2 className="w-12 h-12" />
                  </motion.div>
                  <h2 className="text-3xl font-black mb-2">Payment Successful!</h2>
                  <p className="text-muted-foreground text-lg mb-6">Your order has been placed. Generating your pickup ticket...</p>
                  <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
                </div>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
