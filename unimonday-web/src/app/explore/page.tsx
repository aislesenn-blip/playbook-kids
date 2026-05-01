"use client";

import { useCartStore } from "@/lib/store/cart-store";
import { MOCK_MENU } from "@/lib/data/mock-menu";
import Image from "next/image";
import { Plus, Minus, ShoppingBag } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { useLocationStore } from "@/lib/store/location-store";

export default function ExplorePage() {
  const { items, addItem, removeItem, total } = useCartStore();
  const { campus } = useLocationStore();

  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="pb-24">
      <div className="mb-8 pt-4">
        <h1 className="text-3xl sm:text-4xl font-bold tracking-tight mb-2">Explore {campus ? campus : "Campus"}</h1>
        <p className="text-muted-foreground">Order from the best spots instantly.</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {MOCK_MENU.map((item) => {
          const cartItem = items.find(i => i.id === item.id);
          const quantity = cartItem?.quantity || 0;

          return (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-[2rem] overflow-hidden border border-border/50 shadow-sm hover:shadow-md transition-all group"
            >
              <div className="relative h-48 w-full overflow-hidden">
                <Image
                  src={item.image}
                  alt={item.name}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </div>
              <div className="p-6">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="font-bold text-xl">{item.name}</h3>
                  <span className="font-bold text-primary">Tsh {item.price}</span>
                </div>
                <p className="text-muted-foreground text-sm mb-6 line-clamp-2">{item.description}</p>

                <div className="flex items-center justify-between mt-auto">
                  {quantity > 0 ? (
                    <div className="flex items-center gap-4 bg-secondary rounded-full p-1">
                      <button
                        onClick={() => removeItem(item.id)}
                        className="w-10 h-10 rounded-full bg-white flex items-center justify-center shadow-sm active:scale-95 transition-transform text-foreground"
                      >
                        <Minus className="w-4 h-4" />
                      </button>
                      <span className="font-bold w-4 text-center">{quantity}</span>
                      <button
                        onClick={() => addItem(item)}
                        className="w-10 h-10 rounded-full bg-primary flex items-center justify-center shadow-sm active:scale-95 transition-transform text-white"
                      >
                        <Plus className="w-4 h-4" />
                      </button>
                    </div>
                  ) : (
                    <button
                      onClick={() => addItem(item)}
                      className="w-full py-3 rounded-full bg-secondary text-foreground font-bold hover:bg-primary hover:text-white transition-colors active:scale-95"
                    >
                      Add to order
                    </button>
                  )}
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Floating Checkout Button */}
      <AnimatePresence>
        {totalItems > 0 && (
          <motion.div
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 100, opacity: 0 }}
            className="fixed bottom-20 sm:bottom-8 left-4 right-4 sm:left-auto sm:right-8 z-50 flex justify-center sm:justify-end pointer-events-none"
          >
            <Link
              href="/cart"
              className="pointer-events-auto flex items-center justify-between bg-foreground text-background px-6 py-4 rounded-full shadow-2xl w-full sm:w-80 hover:scale-105 transition-transform active:scale-95"
            >
              <div className="flex items-center gap-3">
                <div className="bg-primary/20 text-primary w-8 h-8 rounded-full flex items-center justify-center font-bold">
                  {totalItems}
                </div>
                <span className="font-bold">View Cart</span>
              </div>
              <span className="font-bold">Tsh {total}</span>
            </Link>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
