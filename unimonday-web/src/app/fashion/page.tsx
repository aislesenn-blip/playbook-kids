"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ShoppingBag } from "lucide-react";

export default function FashionPage() {
  const products = [
    {
      id: 1,
      name: "Vintage Denim Jacket",
      vendor: "Campus Thrift",
      price: "Tsh 35,000",
      image: "https://images.unsplash.com/photo-1523381210434-271e8be1f52b?q=80&w=2070&auto=format&fit=crop"
    },
    {
      id: 2,
      name: "Classic Urban Sneakers",
      vendor: "Kicks TZ",
      price: "Tsh 55,000",
      image: "https://images.unsplash.com/photo-1543163521-1bf539c55dd2?q=80&w=2080&auto=format&fit=crop"
    },
    {
      id: 3,
      name: "Classic Campus Hoodie",
      vendor: "Campus Thrift",
      price: "Tsh 40,000",
      image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3"
    },
    {
      id: 4,
      name: "Nike Red Runners",
      vendor: "Kicks TZ",
      price: "Tsh 75,000",
      image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3"
    },
    {
      id: 5,
      name: "Streetwear Cargo Pants",
      vendor: "Urban Fits",
      price: "Tsh 45,000",
      image: "https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?q=80&w=2000&auto=format&fit=crop"
    },
    {
      id: 6,
      name: "Retro Sunglasses",
      vendor: "Accessories Hub",
      price: "Tsh 15,000",
      image: "https://images.unsplash.com/photo-1511499767150-a48a237f0083?q=80&w=2000&auto=format&fit=crop"
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
            Fresh <span className="text-primary">Fashion</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-xl text-muted-foreground font-medium max-w-2xl mx-auto"
          >
            Upgrade your campus wardrobe with the latest streetwear, thrift finds, and kicks.
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
                    Fashion
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
