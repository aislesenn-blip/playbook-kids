"use client";

import { use } from "react";
import { mockVendors, mockProducts } from "@/lib/mockData";
import { useAppStore } from "@/lib/store/app-store";
import { notFound, useRouter } from "next/navigation";
import Image from "next/image";
import { ShieldCheck, MessageCircle, Star, MapPin, ArrowRight, ShoppingBag, Info, MessageSquareHeart, LayoutGrid, List } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";
import { useState } from "react";

export default function VendorStore({ params }: { params: Promise<{ vendor_id: string }> }) {
  const router = useRouter();
  const unwrappedParams = use(params);
  const [activeTab, setActiveTab] = useState("shop");
  const [layout, setLayout] = useState<'grid2' | 'grid1'>('grid2');
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const { vendorProducts } = useAppStore();

  // For demo we just match or fallback to first vendor
  const vendor = mockVendors.find((v) => v.id === unwrappedParams.vendor_id) || mockVendors[0];
  const products = mockProducts.filter((p) => p.vendorId === vendor.id);

  if (!vendor) return notFound();

  return (
    <div className="max-w-6xl mx-auto px-4 pb-16 pt-4 sm:pt-8">
      {/* Cover Photo */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative w-full h-48 md:h-80 rounded-[2rem] md:rounded-[3rem] overflow-hidden bg-gray-100 mb-8 shadow-xl"
      >
        <Image
          src={vendor.logoUrl || "https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80"}
          alt="Cover"
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
      </motion.div>

      {/* Vendor Profile Info */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="relative -mt-32 mb-12 px-4 md:px-12 flex flex-col md:flex-row items-center md:items-end gap-6"
      >
        <div className="relative w-40 h-40 md:w-48 md:h-48 rounded-[2rem] border-4 border-white shadow-2xl overflow-hidden bg-white shrink-0 rotate-3 hover:rotate-0 transition-transform duration-300">
          <Image
            src={vendor.logoUrl || "https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80"}
            alt={vendor.storeName}
            fill
            className="object-cover"
          />
        </div>

        <div className="flex-1 text-center md:text-left mb-2 z-10">
          <div className="flex flex-col md:flex-row items-center md:items-center gap-3 mb-2">
            <h1 className="text-4xl md:text-5xl font-black text-gray-900 tracking-tight drop-shadow-sm md:text-white md:-mt-16">{vendor.storeName}</h1>
            {vendor.isVerified && (
              <span className="inline-flex items-center gap-1 bg-white md:bg-white/20 text-primary md:text-white backdrop-blur-md px-3 py-1 rounded-full text-xs font-bold shrink-0 md:-mt-16 shadow-sm">
                <ShieldCheck className="w-4 h-4" /> Verified
              </span>
            )}
          </div>
          <p className="text-muted-foreground md:text-gray-200 font-medium mb-4 max-w-2xl text-lg md:-mt-2">{vendor.description}</p>

          <div className="flex flex-wrap items-center justify-center md:justify-start gap-4 text-sm font-bold text-gray-700">
            <span className="flex items-center gap-1 bg-amber-50 text-amber-600 px-3 py-1 rounded-full">
              <Star className="w-4 h-4 fill-current" />
              {vendor.rating} Rating
            </span>
            <span className="flex items-center gap-1 bg-gray-100 text-gray-700 px-3 py-1 rounded-full">
              <MapPin className="w-4 h-4" />
              {vendor.campusName}, {vendor.region}
            </span>
          </div>
        </div>

      </motion.div>

      {/* Navigation Tabs */}
      <div className="sticky top-14 z-30 bg-white/80 backdrop-blur-xl border-b border-border mb-8 -mx-4 px-4 py-2 sm:px-6 md:px-0 md:mx-0 flex items-center justify-between">
        <div className="flex gap-6 overflow-x-auto [&::-webkit-scrollbar]:hidden">
        <button
          onClick={() => setActiveTab("shop")}
          className={`flex items-center gap-2 font-bold py-3 px-2 border-b-2 transition-colors whitespace-nowrap ${activeTab === 'shop' ? 'border-primary text-primary' : 'border-transparent text-gray-500 hover:text-gray-900'}`}
        >
          <ShoppingBag className="w-4 h-4" /> Shop
        </button>
        <button
          onClick={() => setActiveTab("about")}
          className={`flex items-center gap-2 font-bold py-3 px-2 border-b-2 transition-colors whitespace-nowrap ${activeTab === 'about' ? 'border-primary text-primary' : 'border-transparent text-gray-500 hover:text-gray-900'}`}
        >
          <Info className="w-4 h-4" /> About
        </button>
        <button
          onClick={() => setActiveTab("reviews")}
          className={`flex items-center gap-2 font-bold py-3 px-2 border-b-2 transition-colors whitespace-nowrap ${activeTab === 'reviews' ? 'border-primary text-primary' : 'border-transparent text-gray-500 hover:text-gray-900'}`}
        >
          <MessageSquareHeart className="w-4 h-4" /> Reviews
        </button>
        </div>

        {/* Layout Toggle - Only show when Shop tab is active */}
        {activeTab === 'shop' && (
          <div className="flex items-center bg-gray-100 rounded-lg p-1 ml-4 shrink-0">
             <button
                onClick={() => setLayout('grid2')}
                className={`p-2 rounded-md transition-colors ${layout === 'grid2' ? 'bg-white shadow-sm text-gray-900' : 'text-gray-500 hover:text-gray-900'}`}
                title="View 2x2"
             >
                <LayoutGrid className="w-4 h-4" />
             </button>
             <button
                onClick={() => setLayout('grid1')}
                className={`p-2 rounded-md transition-colors ${layout === 'grid1' ? 'bg-white shadow-sm text-gray-900' : 'text-gray-500 hover:text-gray-900'}`}
                title="View 1x1"
             >
                <div className="w-4 h-4 flex flex-col gap-[2px]">
                   <div className="w-full h-full bg-current rounded-sm"></div>
                </div>
             </button>
          </div>
        )}
      </div>

      <div className="mb-8 min-h-[40vh]">
        {activeTab === "shop" && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>

        {products.length === 0 ? (
          <div className="text-center py-16 bg-gray-50 rounded-[2rem] border border-border">
            <ShoppingBag className="w-12 h-12 text-gray-300 mx-auto mb-4" />
            <h3 className="text-xl font-bold text-gray-900 mb-2">No products yet</h3>
            <p className="text-muted-foreground font-medium">This vendor hasn&apos;t added any products.</p>
          </div>
        ) : (
          <div className={`grid gap-4 md:gap-8 ${layout === 'grid2' ? 'grid-cols-2 lg:grid-cols-4' : 'grid-cols-1'}`}>
            {products.map((product) => (
              <Link key={product.id} href={`/product/${product.id}`} className="block group">
                <motion.div whileHover={{ y: -8 }} className={`bg-white rounded-[2.5rem] overflow-hidden border border-border/50 shadow-md hover:shadow-xl transition-shadow duration-300 cursor-pointer flex flex-col h-full relative`}>
                  <div className={`relative overflow-hidden bg-gray-50 shrink-0 ${layout === 'grid2' ? 'h-48 sm:h-56 md:h-48' : 'h-72 sm:h-96'} w-full`}>
                    <Image src={product.images[0] || "https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80"} alt={product.name} fill className="object-cover group-hover:scale-110 transition-transform duration-700 ease-out" />
                    <div className={`absolute top-3 left-3 bg-white/90 backdrop-blur-md px-2 py-1 rounded-md text-[10px] font-bold text-gray-800 shadow-sm max-w-[80%] truncate`}>
                      {product.category}
                    </div>
                  </div>
                  <div className={`flex flex-col flex-grow bg-white p-5 md:p-6`}>
                    <h3 className={`font-bold line-clamp-2 leading-tight group-hover:text-primary transition-colors text-lg md:text-xl mb-2`}>{product.name}</h3>
                    <div className="mt-auto flex items-end justify-between pt-4">
                      <span className="font-black text-xl tracking-tight">Tsh {product.price.toLocaleString()}</span>
                      <div className="w-10 h-10 rounded-full bg-gray-50 text-gray-900 flex items-center justify-center group-hover:bg-primary group-hover:text-white transition-all transform group-hover:-rotate-45 shrink-0 shadow-sm border border-border/50">
                        <ArrowRight className="w-5 h-5" />
                      </div>
                    </div>
                  </div>
                </motion.div>
              </Link>
            ))}
          </div>
        )}
          </motion.div>
        )}

        {activeTab === "about" && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="bg-white rounded-[2rem] p-8 border border-border">
            <h3 className="text-2xl font-black mb-4">About {vendor.storeName}</h3>
            <p className="text-muted-foreground font-medium leading-relaxed mb-6">{vendor.description}</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-xl">
                <MapPin className="w-5 h-5 text-gray-500" />
                <div>
                  <p className="font-bold">Location</p>
                  <p className="text-sm text-muted-foreground">{vendor.campusName}, {vendor.region}</p>
                </div>
              </div>
              <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-xl">
                <ShieldCheck className="w-5 h-5 text-green-500" />
                <div>
                  <p className="font-bold">Status</p>
                  <p className="text-sm text-muted-foreground">Verified Vendor</p>
                </div>
              </div>
            </div>

            <div className="bg-blue-50/50 p-6 rounded-2xl border border-blue-100">
              <h4 className="font-bold text-lg mb-2 text-blue-900">Payment & Delivery</h4>
              <p className="text-gray-700 leading-relaxed font-medium">
                {vendor.paymentAndDeliveryInfo || "Contact vendor directly for their payment and delivery policies."}
              </p>
            </div>
          </motion.div>
        )}

        {activeTab === "reviews" && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-8">
            <div className="bg-white rounded-[2rem] p-6 border border-border shadow-sm flex flex-col items-center text-center">
              <h3 className="text-xl font-black mb-2">Write a Review</h3>
              <p className="text-muted-foreground text-sm font-medium mb-6">Share your experience with {vendor.storeName}</p>

              <div className="flex gap-2 mb-6">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    onClick={() => setRating(star)}
                    onMouseEnter={() => setHoverRating(star)}
                    onMouseLeave={() => setHoverRating(0)}
                    className={`${
                      star <= (hoverRating || rating) ? 'text-amber-500' : 'text-gray-300'
                    } transition-colors`}
                  >
                    <Star className="w-8 h-8 fill-current" />
                  </button>
                ))}
              </div>

              <textarea
                placeholder="What did you like about their products or service?"
                className="w-full bg-gray-50 border border-border rounded-xl p-4 min-h-[120px] focus:outline-none focus:ring-2 focus:ring-primary font-medium text-sm mb-4"
              ></textarea>

              <button className="bg-gray-900 text-white font-bold py-3 px-8 rounded-xl hover:bg-gray-800 transition-colors w-full sm:w-auto">
                Submit Review
              </button>
            </div>

            <div className="text-center py-12 bg-gray-50 rounded-[2rem] border border-border">
              <MessageSquareHeart className="w-10 h-10 text-gray-300 mx-auto mb-3" />
              <h3 className="text-lg font-bold text-gray-900 mb-1">No reviews yet</h3>
              <p className="text-muted-foreground text-sm font-medium">Be the first to review this vendor after your purchase.</p>
            </div>
          </motion.div>
        )}
      </div>

      {/* Floating Chat CTA (FAB) */}
      <div className="fixed bottom-20 right-6 md:bottom-10 md:right-10 z-50">
        <button
          onClick={() => router.push('/chat')}
          className="bg-primary hover:bg-primary/90 text-white p-4 rounded-full shadow-2xl flex items-center justify-center hover:scale-110 transform transition-all duration-200"
          aria-label="Chat with Vendor"
        >
          <MessageCircle className="w-7 h-7" />
        </button>
      </div>

    </div>
  );
}