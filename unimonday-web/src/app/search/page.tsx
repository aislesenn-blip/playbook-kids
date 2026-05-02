"use client";

import { useSearchParams } from "next/navigation";
import { mockProducts } from "@/lib/mockData";
import { Search, ShoppingBag, ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

export default function SearchPage() {
  const searchParams = useSearchParams();
  const query = searchParams.get("q") || "";

  const results = mockProducts.filter((product) =>
    product.name.toLowerCase().includes(query.toLowerCase()) ||
    product.description.toLowerCase().includes(query.toLowerCase()) ||
    product.category.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <div className="mb-10">
        <h1 className="text-3xl font-black text-gray-900 tracking-tight flex items-center gap-3">
          <Search className="w-8 h-8 text-primary" /> Search Results
        </h1>
        <p className="text-muted-foreground mt-2 font-medium">
          Showing results for <span className="font-bold text-gray-900">&quot;{query}&quot;</span>
        </p>
      </div>

      {results.length === 0 ? (
        <div className="text-center py-24 bg-white rounded-[3rem] border border-border shadow-sm">
          <div className="w-24 h-24 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-6">
            <Search className="w-10 h-10 text-gray-300" />
          </div>
          <h2 className="text-2xl font-bold mb-2">No results found</h2>
          <p className="text-muted-foreground font-medium max-w-md mx-auto mb-8">
            We couldn&apos;t find anything matching &quot;{query}&quot;. Try checking your spelling or using more general terms.
          </p>
          <Link href="/explore" className="inline-flex items-center gap-2 bg-gray-900 text-white font-bold py-4 px-8 rounded-xl hover:bg-gray-800 transition-colors">
            <ShoppingBag className="w-5 h-5" /> Back to Explore
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-8">
          {results.map((product) => (
            <Link key={product.id} href={`/product/${product.id}`} className="block group">
              <motion.div whileHover={{ y: -8 }} className="bg-white rounded-[2.5rem] overflow-hidden border border-border/50 shadow-md hover:shadow-xl transition-shadow duration-300 cursor-pointer h-full flex flex-col relative">
                <div className="relative h-56 md:h-48 w-full overflow-hidden bg-gray-50">
                  <Image src={product.images[0] || "https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80"} alt={product.name} fill className="object-cover group-hover:scale-110 transition-transform duration-700 ease-out" />
                  <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-md px-3 py-1.5 rounded-xl text-xs font-bold text-gray-900 shadow-sm">{product.category}</div>
                </div>
                <div className="p-5 md:p-6 flex flex-col flex-grow bg-white">
                  <h3 className="font-bold text-lg md:text-xl mb-2 line-clamp-2 leading-tight group-hover:text-primary transition-colors">{product.name}</h3>
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
    </div>
  );
}