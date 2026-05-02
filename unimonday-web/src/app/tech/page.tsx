"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

export default function TechPage() {
  return (
    <div className="min-h-screen bg-gray-50 pt-24 pb-12 px-4">
      <div className="max-w-7xl mx-auto space-y-12">
        <section className="text-center">
          <h1 className="text-4xl md:text-5xl font-black mb-4">Tech & Accessories</h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">Latest gadgets and study tools provided by verified campus vendors.</p>
        </section>

        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            <Link href="/product/3" className="block">
            <motion.div whileHover={{ y: -5 }} className="bg-white rounded-[2rem] overflow-hidden border border-border shadow-sm group cursor-pointer h-full">
              <div className="relative h-48 sm:h-56 w-full overflow-hidden bg-gray-100">
                <Image src="https://images.unsplash.com/photo-1546868871-7041f2a55e12?q=80&w=2064&auto=format&fit=crop" alt="Watch" fill className="object-cover group-hover:scale-105 transition-transform duration-500" />
                <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-md px-2 py-1 rounded-lg text-xs font-bold text-gray-800">Electronics</div>
              </div>
              <div className="p-4 sm:p-5 flex flex-col justify-between h-[140px]">
                <div>
                  <h3 className="font-bold text-lg mb-1 truncate">Apple Watch Series 7</h3>
                  <p className="text-sm text-muted-foreground mb-3 truncate">By TechZone UDSM</p>
                </div>
                <div className="flex items-center justify-between">
                  <span className="font-black text-lg">Tsh 600,000</span>
                  <button className="w-8 h-8 rounded-full bg-primary/10 text-primary flex items-center justify-center hover:bg-primary hover:text-white transition-colors">
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </motion.div>
            </Link>
        </section>
      </div>
    </div>
  );
}
