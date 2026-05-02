"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ShoppingBag } from "lucide-react";

export default function BeautyPage() {
  const products = [
    {
      id: 11,
      name: "Organic Face Cleanser",
      vendor: "Glow Beauty Campus",
      price: "Tsh 15,000",
      image: "https://images.unsplash.com/photo-1556228578-0d85b1a4d571?q=80&w=2000&auto=format&fit=crop"
    },
    {
      id: 12,
      name: "Matte Lipstick Set",
      vendor: "Campus Cosmetics",
      price: "Tsh 25,000",
      image: "https://images.unsplash.com/photo-1586495777744-4413f21062fa?q=80&w=2000&auto=format&fit=crop"
    },
    {
      id: 13,
      name: "Premium Hair Extensions",
      vendor: "Dorm Salon",
      price: "Tsh 40,000",
      image: "https://images.unsplash.com/photo-1519699047748-de8e457a634e?q=80&w=2000&auto=format&fit=crop"
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50/50 pb-24 pt-8">
      <div className="max-w-6xl mx-auto px-4">
        {/* Header */}
        <div className="mb-12 text-center">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl sm:text-5xl font-black tracking-tight mb-4"
          >
            Beauty <span className="text-primary">& Cosmetics</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-xl text-muted-foreground font-medium max-w-2xl mx-auto"
          >
            Everything you need for your face, hair, and skincare routine on campus.
          </motion.p>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {products.map((product, index) => (
            <Link href={`/product/${product.id}`} key={product.id} className="block">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * index }}
                whileHover={{ y: -10 }}
                className="bg-white rounded-[2rem] overflow-hidden border border-border shadow-md group cursor-pointer h-full flex flex-col"
              >
                <div className="relative h-48 w-full overflow-hidden bg-gray-100">
                  <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-md px-3 py-1.5 rounded-xl text-xs font-bold text-gray-800 shadow-sm">
                    Beauty
                  </div>
                </div>
                <div className="p-6 flex flex-col flex-grow">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-bold text-xl line-clamp-1" title={product.name}>{product.name}</h3>
                  </div>
                  <p className="text-muted-foreground text-sm mb-4">By {product.vendor}</p>

                  <div className="mt-auto flex items-center justify-between pt-4 border-t border-border">
                    <span className="font-black text-xl text-gray-900">{product.price}</span>
                    <button className="w-10 h-10 rounded-full bg-primary/10 text-primary flex items-center justify-center hover:bg-primary hover:text-white transition-colors">
                      <ShoppingBag className="w-5 h-5" />
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
