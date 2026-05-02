"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ShoppingBag, Star, Flame } from "lucide-react";
import { mockProducts } from "@/lib/mockData";
import { useAppStore } from "@/lib/store/app-store";
import { toast } from "sonner";

export default function TrendingPage() {
  const { addToCart } = useAppStore();

  const handleAddToCart = (e: React.MouseEvent, productId: string) => {
    e.preventDefault();
    e.stopPropagation();
    const product = mockProducts.find(p => p.id === productId);
    if (product) {
      addToCart(product);
      toast.success("Added to cart");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50/50 pb-24 pt-8">
      <div className="max-w-7xl mx-auto px-4">
        <div className="mb-12 flex flex-col sm:flex-row items-center justify-between">
          <div>
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-4xl sm:text-5xl font-black tracking-tight mb-2 flex items-center gap-3"
            >
               Trending <Flame className="w-10 h-10 text-orange-500 fill-current" />
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-xl text-muted-foreground font-medium"
            >
              The most popular items on campus right now.
            </motion.p>
          </div>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {mockProducts.map((product, index) => (
            <Link href={`/product/${product.id}`} key={product.id} className="block group">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.05 * index }}
                whileHover={{ y: -5 }}
                className="bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-sm h-full flex flex-col relative"
              >
                <div className="relative h-48 sm:h-56 w-full overflow-hidden bg-gray-50">
                  <Image
                    src={product.images[0]}
                    alt={product.name}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-2 left-2 bg-white/90 backdrop-blur-md px-2 py-0.5 rounded-md text-[10px] font-bold text-gray-800 shadow-sm max-w-[80%] truncate">
                    {product.category}
                  </div>
                  <div className="absolute top-2 right-2 bg-amber-100/90 text-amber-600 backdrop-blur-md px-2 py-0.5 rounded-md text-[10px] font-bold shadow-sm flex items-center gap-1">
                    <Star className="w-3 h-3 fill-current" /> {product.rating || 4.5}
                  </div>
                </div>
                <div className="p-4 flex flex-col flex-grow justify-between">
                  <div>
                    <h3 className="font-bold text-base mb-1 line-clamp-2 leading-tight">{product.name}</h3>
                    <Link href={`/store/${product.vendorId}`} onClick={(e) => e.stopPropagation()} className="text-xs text-gray-500 hover:text-primary hover:underline mb-2 block relative z-10">{product.vendorName}</Link>
                  </div>
                  <div className="flex items-center justify-between mt-3">
                    <span className="font-black text-lg text-gray-900">Tsh {product.price.toLocaleString()}</span>
                    <button onClick={(e) => handleAddToCart(e, product.id)} className="w-8 h-8 rounded-full bg-primary/10 text-primary flex items-center justify-center hover:bg-primary hover:text-white transition-colors">
                      <ShoppingBag className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </motion.div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
