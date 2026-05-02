"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Store, Star, MapPin, ShieldCheck } from "lucide-react";
import { mockVendors } from "@/lib/mockData";

export default function StoresPage() {
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
               Top Stores <Store className="w-10 h-10 text-primary" />
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-xl text-muted-foreground font-medium"
            >
              Discover the best verified student vendors on campus.
            </motion.p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {mockVendors.map((vendor, index) => (
            <Link href={`/store/${vendor.id}`} key={vendor.id} className="block">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * index }}
                whileHover={{ y: -5 }}
                className="bg-white rounded-3xl p-6 border border-border shadow-sm flex items-center gap-5 cursor-pointer h-full"
              >
                <div className="w-20 h-20 rounded-full overflow-hidden relative shrink-0 border border-gray-100 shadow-inner">
                  <Image src={vendor.logoUrl || "https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80"} alt={vendor.storeName} fill className="object-cover" />
                </div>
                <div>
                  <h3 className="font-bold text-xl flex items-center gap-1">
                    {vendor.storeName}
                    {vendor.isVerified && <ShieldCheck className="w-4 h-4 text-green-500" />}
                  </h3>
                  <p className="text-sm text-muted-foreground flex items-center gap-1 mt-1"><MapPin className="w-3 h-3" /> {vendor.campusName}</p>
                  <div className="flex items-center gap-1 mt-2 text-sm font-semibold text-amber-500">
                    <Star className="w-4 h-4 fill-current" /> {vendor.rating}
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
