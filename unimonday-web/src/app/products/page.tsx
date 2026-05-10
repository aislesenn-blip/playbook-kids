/* eslint-disable @next/next/no-img-element */
"use client";

import { products } from "@/lib/mockData";
import { ShoppingCart, Tractor } from "lucide-react";
import { motion } from "framer-motion";
import { useAppStore } from "@/lib/store/app-store";

export default function ProductsPage() {
  const addToCart = useAppStore(state => state.addToCart);

  return (
    <div className="min-h-screen bg-gray-50/50 pb-24 pt-24 px-4 sm:px-6">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-black mb-4">Agriculture Marketplace</h1>
          <p className="text-muted-foreground font-medium max-w-2xl mx-auto text-lg">
            Discover tractors, fertilizers, and produce directly from verified vendors.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {products.map((prod, idx) => (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              key={prod.id}
              className="bg-white rounded-3xl overflow-hidden border border-border shadow-sm hover:shadow-md transition-all flex flex-col"
            >
              <div className="h-48 bg-gray-100 relative">
                {prod.imageUrl ? (
                  <img src={prod.imageUrl} alt={prod.title} className="w-full h-full object-cover" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-gray-400">
                    <Tractor className="w-12 h-12" />
                  </div>
                )}
                <div className="absolute top-3 right-3 bg-white/90 backdrop-blur px-3 py-1 rounded-full text-xs font-bold text-primary">
                  {prod.category}
                </div>
              </div>
              <div className="p-5 flex-1 flex flex-col">
                <h3 className="font-bold text-xl mb-1 line-clamp-1">{prod.title}</h3>
                <p className="text-muted-foreground text-sm flex-1 mb-4 line-clamp-2">{prod.description}</p>
                <div className="flex items-center justify-between mt-auto">
                  <div className="font-black text-lg">
                    TZS {prod.price.toLocaleString()} <span className="text-xs text-muted-foreground font-normal">/{prod.unit}</span>
                  </div>
                  <button
                    onClick={() => addToCart(prod.id, 1)}
                    className="w-10 h-10 rounded-full bg-primary/10 text-primary flex items-center justify-center hover:bg-primary hover:text-white transition-colors"
                  >
                    <ShoppingCart className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
