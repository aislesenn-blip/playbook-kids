"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { ShoppingBag, MessageCircle, Star, ShieldCheck, ChevronLeft } from "lucide-react";
import { useRouter } from "next/navigation";

import { useAppStore } from "@/lib/store/app-store";
import { mockProducts, mockVendors } from "@/lib/mockData";
import { toast } from "sonner";
import Link from "next/link";

export default function ProductDetails() {
  const router = useRouter();
  const { addToCart } = useAppStore();

  // For demo, we just grab the first product if id isn't explicitly matching
  const product = mockProducts[0];
  const vendor = mockVendors.find(v => v.id === product.vendorId) || mockVendors[0];

  const handleAddToCart = () => {
    addToCart(product, 1);
    toast(`${product.name} added to cart!`, {
      action: {
        label: 'Go to Cart',
        onClick: () => router.push('/checkout')
      },
    });
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
            src={product.images[0]}
            alt={product.name}
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
            <span className="text-3xl font-black text-primary">Tsh {product.price.toLocaleString()}</span>
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
            <Link href={`/store/${vendor.id}`} className="text-primary hover:underline mb-1 font-bold inline-block">{vendor.storeName}</Link>
            <p className="text-sm text-muted-foreground">Location: {vendor.campusName}, {vendor.region}</p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4">
            <button onClick={handleAddToCart} className="flex-1 bg-gray-900 text-white hover:bg-gray-800 font-bold py-5 rounded-[1.5rem] flex items-center justify-center gap-3 transition-colors shadow-xl shadow-gray-900/20 text-lg">
              <ShoppingBag className="w-6 h-6" /> Add to Cart
            </button>
            <button
              onClick={() => router.push(`/store/${vendor.id}`)}
              className="flex-1 bg-primary/10 text-primary hover:bg-primary/20 font-bold py-5 rounded-[1.5rem] flex items-center justify-center gap-3 transition-colors text-lg"
            >
              <MessageCircle className="w-6 h-6" /> Go to Store
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
