"use client";

import { useCartStore } from "@/lib/store/cart-store";
import { useVendorStore } from "@/lib/store/vendor-store";
import Image from "next/image";
import { Plus, Minus, ArrowLeft } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { use } from "react";
import { notFound, useRouter } from "next/navigation";

export default function VendorProfilePage({ params }: { params: Promise<{ vendorId: string }> }) {
  const resolvedParams = use(params);
  const router = useRouter();
  const { items, addItem, removeItem } = useCartStore();
  const { vendors, menuItems } = useVendorStore();

  const vendor = vendors.find(v => v.id === resolvedParams.vendorId);
  const vendorMenu = menuItems.filter(m => m.vendorId === resolvedParams.vendorId);

  if (!vendor) return notFound();

  // Only count items in cart from THIS vendor
  const cartItemsFromThisVendor = items.filter(i => i.vendorId === vendor.id);
  const totalItems = cartItemsFromThisVendor.reduce((sum, item) => sum + item.quantity, 0);
  const vendorTotal = cartItemsFromThisVendor.reduce((sum, i) => sum + (i.price * i.quantity), 0);

  return (
    <div className="pb-40 max-w-3xl mx-auto relative min-h-screen">
      {/* Vendor Header */}
      <div className="relative h-64 w-full rounded-[2.5rem] overflow-hidden mb-8 shadow-md">
         <Image
            src={vendor.image}
            alt={vendor.name}
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

          <button
             onClick={() => router.back()}
             className="absolute top-6 left-6 p-3 bg-white/20 backdrop-blur-md text-white rounded-full hover:bg-white/30 transition-colors"
          >
             <ArrowLeft className="w-5 h-5" />
          </button>

          <div className="absolute bottom-8 left-8 text-white">
             <h1 className="font-black text-4xl mb-2">{vendor.name}</h1>
             <div className="flex items-center gap-3">
               <span className="font-medium opacity-90">{vendor.category}</span>
               <span className="w-1.5 h-1.5 rounded-full bg-white/50" />
               <span className={vendor.isOpen ? "text-primary font-bold" : "text-destructive font-bold"}>
                 {vendor.isOpen ? "Open" : vendor.statusText || "Closed"}
               </span>
             </div>
          </div>
      </div>

      <div className="px-4 sm:px-0">
        <h2 className="text-2xl font-bold mb-6">Menu</h2>

        <div className="grid gap-4">
          {vendorMenu.map((item) => {
            const cartItem = items.find(i => i.id === item.id);
            const quantity = cartItem?.quantity || 0;

            return (
              <div
                key={item.id}
                className={`flex gap-4 bg-white p-4 rounded-[2rem] border border-border/50 shadow-sm transition-all ${!item.isAvailable ? 'opacity-60 grayscale-[0.5]' : ''}`}
              >
                <div className="flex-1 min-w-0">
                  <div className="flex justify-between items-start mb-1">
                    <h3 className="font-bold text-lg truncate pr-2">{item.name}</h3>
                    <span className="font-bold text-primary whitespace-nowrap">Tsh {item.price}</span>
                  </div>
                  <p className="text-muted-foreground text-sm mb-4 line-clamp-2 pr-4">{item.description}</p>

                  {item.isAvailable && vendor.isOpen ? (
                     <div>
                        {quantity > 0 ? (
                          <div className="inline-flex items-center gap-4 bg-secondary rounded-full p-1">
                            <button
                              onClick={() => removeItem(item.id)}
                              className="w-8 h-8 rounded-full bg-white flex items-center justify-center shadow-sm active:scale-95 text-foreground"
                            >
                              <Minus className="w-3 h-3" />
                            </button>
                            <span className="font-bold text-sm w-4 text-center">{quantity}</span>
                            <button
                              onClick={() => addItem(item)}
                              className="w-8 h-8 rounded-full bg-primary flex items-center justify-center shadow-sm active:scale-95 text-white"
                            >
                              <Plus className="w-3 h-3" />
                            </button>
                          </div>
                        ) : (
                          <button
                            onClick={() => addItem(item)}
                            className="px-6 py-2 rounded-full bg-secondary text-foreground font-bold hover:bg-primary hover:text-white transition-colors active:scale-95 text-sm"
                          >
                            Add
                          </button>
                        )}
                     </div>
                  ) : (
                     <div className="inline-flex px-4 py-1.5 rounded-full bg-secondary text-muted-foreground font-bold text-sm">
                        {item.isAvailable ? "Store Closed" : "Sold Out"}
                     </div>
                  )}
                </div>

                <div className="relative w-28 h-28 rounded-[1.5rem] overflow-hidden shrink-0">
                  <Image
                    src={item.image}
                    alt={item.name}
                    fill
                    className="object-cover"
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Sticky Bottom Cart Bar */}
      <AnimatePresence>
        {totalItems > 0 && (
          <motion.div
            initial={{ y: 100 }}
            animate={{ y: 0 }}
            exit={{ y: 100 }}
            className="fixed bottom-[4rem] sm:bottom-0 left-0 right-0 z-[40] bg-white/90 backdrop-blur-xl border-t border-border/50 shadow-[0_-10px_40px_rgba(0,0,0,0.05)] pb-safe pt-4 px-4 sm:px-8 flex flex-col items-center"
          >
            <div className="w-full max-w-3xl flex items-center justify-between gap-4 pb-4">
              <div className="flex flex-col">
                <span className="text-muted-foreground font-medium text-sm">Total ({totalItems} items)</span>
                <span className="text-2xl font-black">Tsh {vendorTotal}</span>
              </div>
              <Link
                href="/cart"
                className="bg-primary text-primary-foreground px-8 py-4 rounded-full font-bold text-lg hover:bg-primary/90 transition-all active:scale-95 shadow-lg shadow-primary/20 flex items-center gap-2"
              >
                Checkout
                <ArrowLeft className="w-5 h-5 rotate-180" />
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
