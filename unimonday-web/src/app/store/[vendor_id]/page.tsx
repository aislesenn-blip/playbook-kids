"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { ShieldCheck, MessageCircle, Star, Package } from "lucide-react";
import { useRouter } from "next/navigation";
import { mockVendors, mockProducts } from "@/lib/mockData";
import Link from "next/link";
import { use } from "react";

export default function VendorStorefront({ params }: { params: Promise<{ vendor_id: string }> }) {
  const router = useRouter();

  // Use React.use to unwrap params
  const { vendor_id } = use(params);

  // Find vendor, fallback to first if not found
  const vendor = mockVendors.find(v => v.id === vendor_id) || mockVendors[0];

  // Get products for this vendor
  const vendorProducts = mockProducts.filter(p => p.vendorId === vendor.id);

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      {/* Cover/Banner */}
      <div className="relative h-[200px] md:h-[300px] rounded-[2rem] overflow-hidden mb-8 shadow-md">
        <Image
          src={vendor.logoUrl || "https://images.unsplash.com/photo-1557821552-17105176677c?q=80&w=2069&auto=format&fit=crop"}
          alt="Cover Photo"
          fill
          className="object-cover blur-sm brightness-75"
          priority
        />

        {/* Vendor Info Overlay */}
        <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-white text-center">
          <div className="w-24 h-24 relative rounded-full border-4 border-white overflow-hidden mb-4 shadow-xl">
            <Image
              src={vendor.logoUrl || "https://images.unsplash.com/photo-1557821552-17105176677c?q=80&w=2069&auto=format&fit=crop"}
              alt={vendor.storeName}
              fill
              className="object-cover"
            />
          </div>
          <div className="flex items-center gap-2 mb-2">
            <h1 className="text-3xl md:text-4xl font-black drop-shadow-md">{vendor.storeName}</h1>
            {vendor.isVerified && <ShieldCheck className="w-6 h-6 text-primary drop-shadow-md" />}
          </div>
          <div className="flex items-center gap-2 text-amber-400 font-bold mb-4">
            <Star className="w-5 h-5 fill-current" />
            <span className="text-white drop-shadow-md">{vendor.rating} Rating</span>
          </div>
          <p className="max-w-xl text-white/90 drop-shadow-md font-medium">{vendor.description}</p>
        </div>
      </div>

      {/* Action Bar */}
      <div className="bg-white rounded-2xl p-4 border border-border shadow-sm flex flex-col sm:flex-row justify-between items-center gap-4 mb-12">
        <div className="flex items-center gap-2 text-gray-600 font-bold">
          <Package className="w-5 h-5" />
          <span>{vendorProducts.length} Products</span>
        </div>
        <button
          onClick={() => router.push('/chat')}
          className="w-full sm:w-auto bg-primary text-white font-bold py-3 px-8 rounded-xl hover:bg-primary/90 transition-colors flex items-center justify-center gap-2 shadow-lg shadow-primary/20"
        >
          <MessageCircle className="w-5 h-5" />
          Chat with Vendor
        </button>
      </div>

      {/* Products Grid */}
      <h2 className="text-2xl font-black text-gray-900 mb-6">Store Catalog</h2>

      {vendorProducts.length === 0 ? (
        <div className="text-center py-12 bg-gray-50 rounded-3xl border border-border">
          <Package className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-bold text-gray-900 mb-2">No products yet</h3>
          <p className="text-muted-foreground">This vendor hasn&apos;t added any products to their store.</p>
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
          {vendorProducts.map((product, idx) => (
            <Link href={`/product/${product.id}`} key={product.id}>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                className="group bg-white rounded-2xl border border-border overflow-hidden hover:shadow-xl transition-all hover:-translate-y-1 h-full flex flex-col cursor-pointer"
              >
                <div className="relative aspect-square overflow-hidden bg-gray-100">
                  <Image
                    src={product.images[0]}
                    alt={product.name}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="p-4 flex flex-col flex-grow">
                  <div className="text-xs font-bold text-primary mb-1 uppercase tracking-wider">{product.category}</div>
                  <h3 className="font-bold text-gray-900 mb-2 line-clamp-2 leading-tight group-hover:text-primary transition-colors">{product.name}</h3>
                  <div className="mt-auto pt-2 flex items-center justify-between">
                    <span className="font-black text-lg text-gray-900">Tsh {product.price.toLocaleString()}</span>
                  </div>
                </div>
              </motion.div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
