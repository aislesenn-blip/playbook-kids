"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { ShoppingBag, Wrench, ShieldCheck, ArrowRight, Star, Truck } from "lucide-react";
import Link from "next/link";

export default function Home() {




  return (
    <div className="flex flex-col items-center justify-center w-full overflow-x-hidden selection:bg-primary/20 selection:text-primary">

      {/* Hero Section */}
      <section className="relative w-full max-w-7xl mx-auto pt-20 pb-16 sm:pb-24 px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Link href="/explore">
            <motion.div
              whileHover={{ scale: 1.02 }}
              className="bg-white rounded-2xl overflow-hidden shadow-sm border border-border flex flex-col h-full cursor-pointer group"
            >
              <div className="p-6 pb-4">
                <h2 className="text-2xl font-bold tracking-tight text-gray-900 mb-1">Gifts for Mom</h2>
                <p className="text-sm text-muted-foreground">Show your appreciation</p>
              </div>
              <div className="relative flex-1 min-h-[200px] w-full mt-auto p-4 pt-0">
                 <div className="relative w-full h-full rounded-xl overflow-hidden">
                    <Image
                      src="https://images.unsplash.com/photo-1607083206869-4c7672e72a8a?q=80&w=2070&auto=format&fit=crop"
                      alt="Gifts for Mom"
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                 </div>
              </div>
              <div className="p-4 pt-0">
                <span className="text-primary font-medium text-sm group-hover:underline">Shop now</span>
              </div>
            </motion.div>
          </Link>

          <Link href="/explore">
            <motion.div
              whileHover={{ scale: 1.02 }}
              className="bg-white rounded-2xl overflow-hidden shadow-sm border border-border flex flex-col h-full cursor-pointer group"
            >
              <div className="p-6 pb-4">
                <h2 className="text-2xl font-bold tracking-tight text-gray-900 mb-1">Tech Essentials</h2>
                <p className="text-sm text-muted-foreground">Upgrade your campus setup</p>
              </div>
              <div className="relative flex-1 min-h-[200px] w-full mt-auto p-4 pt-0">
                 <div className="relative w-full h-full rounded-xl overflow-hidden">
                    <Image
                      src="https://images.unsplash.com/photo-1496181133206-80ce9b88a853?q=80&w=2071&auto=format&fit=crop"
                      alt="Tech Essentials"
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                 </div>
              </div>
              <div className="p-4 pt-0">
                <span className="text-primary font-medium text-sm group-hover:underline">Shop now</span>
              </div>
            </motion.div>
          </Link>

          <Link href="/explore">
            <motion.div
              whileHover={{ scale: 1.02 }}
              className="bg-white rounded-2xl overflow-hidden shadow-sm border border-border flex flex-col h-full cursor-pointer group"
            >
              <div className="p-6 pb-4">
                <h2 className="text-2xl font-bold tracking-tight text-gray-900 mb-1">Fresh Fits</h2>
                <p className="text-sm text-muted-foreground">Latest campus fashion</p>
              </div>
              <div className="relative flex-1 min-h-[200px] w-full mt-auto p-4 pt-0">
                 <div className="relative w-full h-full rounded-xl overflow-hidden">
                    <Image
                      src="https://images.unsplash.com/photo-1523381210434-271e8be1f52b?q=80&w=2070&auto=format&fit=crop"
                      alt="Fresh Fits"
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                 </div>
              </div>
              <div className="p-4 pt-0">
                <span className="text-primary font-medium text-sm group-hover:underline">Shop now</span>
              </div>
            </motion.div>
          </Link>

          <Link href="/explore">
            <motion.div
              whileHover={{ scale: 1.02 }}
              className="bg-white rounded-2xl overflow-hidden shadow-sm border border-border flex flex-col h-full cursor-pointer group"
            >
              <div className="p-6 pb-4">
                <h2 className="text-2xl font-bold tracking-tight text-gray-900 mb-1">Dorm Decor</h2>
                <p className="text-sm text-muted-foreground">Make it feel like home</p>
              </div>
              <div className="grid grid-cols-2 gap-2 p-4 pt-0 mt-auto">
                 <div className="relative aspect-square rounded-xl overflow-hidden">
                    <Image src="https://images.unsplash.com/photo-1513694203232-719a280e022f?q=80&w=2069&auto=format&fit=crop" alt="Decor 1" fill className="object-cover" />
                 </div>
                 <div className="relative aspect-square rounded-xl overflow-hidden">
                    <Image src="https://images.unsplash.com/photo-1505691938895-1758d7feb511?q=80&w=2070&auto=format&fit=crop" alt="Decor 2" fill className="object-cover" />
                 </div>
                 <div className="relative aspect-square rounded-xl overflow-hidden">
                    <Image src="https://images.unsplash.com/photo-1499933374294-4584851497cc?q=80&w=2070&auto=format&fit=crop" alt="Decor 3" fill className="object-cover" />
                 </div>
                 <div className="relative aspect-square rounded-xl overflow-hidden">
                    <Image src="https://images.unsplash.com/photo-1583847268964-b28dc8f51f92?q=80&w=1974&auto=format&fit=crop" alt="Decor 4" fill className="object-cover" />
                 </div>
              </div>
              <div className="p-4 pt-0">
                <span className="text-primary font-medium text-sm group-hover:underline">See more</span>
              </div>
            </motion.div>
          </Link>
        </div>
      </section>

      {/* Featured Products */}
      <section className="w-full max-w-6xl mx-auto px-4 pb-24">
        <div className="flex items-center justify-between mb-10">
          <h2 className="text-3xl sm:text-4xl font-black tracking-tight">Featured Products</h2>
          <button className="text-primary font-bold hover:underline flex items-center gap-1">
            See All <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Product Card 1 */}
          <Link href="/product/1" className="block">
            <motion.div whileHover={{ y: -10 }} className="bg-white rounded-[2rem] overflow-hidden border border-border shadow-md group cursor-pointer">
            <div className="relative h-64 w-full overflow-hidden">
              <Image
                src="https://images.unsplash.com/photo-1523381210434-271e8be1f52b?q=80&w=2070&auto=format&fit=crop"
                alt="Vintage Jacket"
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-500"
              />
            </div>
            <div className="p-6">
              <div className="flex justify-between items-start mb-2">
                <h3 className="font-bold text-xl">Vintage Denim Jacket</h3>
                <span className="bg-primary/10 text-primary px-3 py-1 rounded-full text-sm font-bold">Tsh 35,000</span>
              </div>
              <p className="text-muted-foreground text-sm mb-4">By Campus Thrift</p>
              <button className="w-full bg-gray-100 hover:bg-primary hover:text-white text-gray-900 font-bold py-3 rounded-xl transition-colors flex items-center justify-center gap-2">
                <ShoppingBag className="w-4 h-4" /> Order Now
              </button>
            </div>
          </motion.div>
          </Link>

          {/* Product Card 2 */}
          <Link href="/product/1" className="block">
            <motion.div whileHover={{ y: -10 }} className="bg-white rounded-[2rem] overflow-hidden border border-border shadow-md group cursor-pointer">
            <div className="relative h-64 w-full overflow-hidden">
              <Image
                src="https://images.unsplash.com/photo-1546868871-7041f2a55e12?q=80&w=2064&auto=format&fit=crop"
                alt="Wireless Earbuds"
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-500"
              />
            </div>
            <div className="p-6">
              <div className="flex justify-between items-start mb-2">
                <h3 className="font-bold text-xl">Pro Wireless Earbuds</h3>
                <span className="bg-primary/10 text-primary px-3 py-1 rounded-full text-sm font-bold">Tsh 45,000</span>
              </div>
              <p className="text-muted-foreground text-sm mb-4">By TechZone UDSM</p>
              <button className="w-full bg-gray-100 hover:bg-primary hover:text-white text-gray-900 font-bold py-3 rounded-xl transition-colors flex items-center justify-center gap-2">
                <ShoppingBag className="w-4 h-4" /> Order Now
              </button>
            </div>
          </motion.div>
          </Link>

          {/* Product Card 3 */}
          <Link href="/product/1" className="block">
            <motion.div whileHover={{ y: -10 }} className="bg-white rounded-[2rem] overflow-hidden border border-border shadow-md group cursor-pointer">
            <div className="relative h-64 w-full overflow-hidden bg-gray-100">
              <Image
                src="https://images.unsplash.com/photo-1543163521-1bf539c55dd2?q=80&w=2080&auto=format&fit=crop"
                alt="Classic Sneakers"
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-500"
              />
            </div>
            <div className="p-6">
              <div className="flex justify-between items-start mb-2">
                <h3 className="font-bold text-xl">Classic Urban Sneakers</h3>
                <span className="bg-primary/10 text-primary px-3 py-1 rounded-full text-sm font-bold">Tsh 55,000</span>
              </div>
              <p className="text-muted-foreground text-sm mb-4">By Kicks TZ</p>
              <button className="w-full bg-gray-100 hover:bg-primary hover:text-white text-gray-900 font-bold py-3 rounded-xl transition-colors flex items-center justify-center gap-2">
                <ShoppingBag className="w-4 h-4" /> Order Now
              </button>
            </div>
          </motion.div>
          </Link>
        </div>
      </section>

      {/* Verified Services Section */}
      <section className="pb-24 max-w-6xl mx-auto px-4 w-full">
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-black tracking-tight mb-4">Verified Services</h2>
          <p className="text-xl text-muted-foreground font-medium max-w-2xl mx-auto">
            Vetted professionals for your campus needs. Safe, reliable, and affordable.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <motion.div
            whileHover={{ y: -10 }}
            className="flex flex-col p-10 rounded-[3rem] bg-white border border-border/50 shadow-lg group relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 p-6 opacity-5 group-hover:opacity-10 transition-opacity">
              <Wrench className="w-32 h-32" />
            </div>
            <div className="w-16 h-16 bg-blue-50 text-blue-500 rounded-2xl flex items-center justify-center mb-8 relative z-10 border border-blue-100">
              <ShieldCheck className="w-8 h-8" />
            </div>
            <h3 className="text-2xl font-black mb-4 relative z-10">Phone Repair</h3>
            <p className="text-muted-foreground font-medium leading-relaxed text-lg relative z-10 mb-6">
              Cracked screen? Battery issues? Get it fixed by a verified technician right on campus.
            </p>
            <Link href="/services" className="mt-auto flex items-center gap-2 text-blue-500 font-bold hover:underline">
               Find a Technician <ArrowRight className="w-4 h-4" />
            </Link>
          </motion.div>

          <motion.div
            whileHover={{ y: -10 }}
            className="flex flex-col p-10 rounded-[3rem] bg-white border border-border/50 shadow-lg group relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 p-6 opacity-5 group-hover:opacity-10 transition-opacity">
              <Truck className="w-32 h-32" />
            </div>
            <div className="w-16 h-16 bg-amber-50 text-amber-500 rounded-2xl flex items-center justify-center mb-8 relative z-10 border border-amber-100">
              <Truck className="w-8 h-8" />
            </div>
            <h3 className="text-2xl font-black mb-4 relative z-10">Campus Delivery</h3>
            <p className="text-muted-foreground font-medium leading-relaxed text-lg relative z-10 mb-6">
              Get your food or packages delivered straight to your hostel with our trusted network.
            </p>
            <Link href="/services" className="mt-auto flex items-center gap-2 text-amber-500 font-bold hover:underline">
               Book Delivery <ArrowRight className="w-4 h-4" />
            </Link>
          </motion.div>

          <motion.div
            whileHover={{ y: -10 }}
            className="flex flex-col p-10 rounded-[3rem] bg-white border border-border/50 shadow-lg group relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 p-6 opacity-5 group-hover:opacity-10 transition-opacity">
              <Star className="w-32 h-32" />
            </div>
            <div className="w-16 h-16 bg-primary/10 text-primary rounded-2xl flex items-center justify-center mb-8 relative z-10 border border-primary/20">
              <Star className="w-8 h-8" />
            </div>
            <h3 className="text-2xl font-black mb-4 relative z-10">PC Maintenance</h3>
            <p className="text-muted-foreground font-medium leading-relaxed text-lg relative z-10 mb-6">
              Software installation, virus removal, or hardware upgrades. Handled by pros.
            </p>
            <Link href="/services" className="mt-auto flex items-center gap-2 text-primary font-bold hover:underline">
               Find a Pro <ArrowRight className="w-4 h-4" />
            </Link>
          </motion.div>
        </div>
      </section>

    </div>
  );
}
