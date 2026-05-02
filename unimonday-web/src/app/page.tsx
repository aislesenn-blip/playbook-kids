"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { ShoppingBag, Wrench, ShieldCheck, ArrowRight, Star, Truck } from "lucide-react";
import Link from "next/link";

export default function Home() {




  return (
    <div className="flex flex-col items-center justify-center w-full overflow-x-hidden selection:bg-primary/20 selection:text-primary">

      {/* Hero Section */}
      <section className="relative w-full max-w-5xl mx-auto pt-20 sm:pt-32 pb-16 sm:pb-24 px-4 flex flex-col items-center text-center">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/5 rounded-full blur-3xl -z-10 pointer-events-none"></div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1, ease: "easeOut" }}
          className="w-full max-w-4xl mx-auto overflow-hidden mb-12 relative"
        >
          <div className="absolute left-0 top-0 w-16 h-full bg-gradient-to-r from-white to-transparent z-10 pointer-events-none"></div>
          <div className="absolute right-0 top-0 w-16 h-full bg-gradient-to-l from-white to-transparent z-10 pointer-events-none"></div>

          <motion.div
            className="flex gap-4 sm:gap-6 py-4"
            animate={{ x: ["0%", "-50%"] }}
            transition={{
              repeat: Infinity,
              ease: "linear",
              duration: 35,
            }}
          >
            {/* Duplicated for seamless loop */}
            {[...Array(2)].map((_, i) => (
              <div key={i} className="flex gap-4 sm:gap-6">
                {/* Card 1 */}
                <Link href="/explore">
                  <div className="w-[280px] h-[340px] rounded-[2rem] bg-[#dcfce7] p-6 relative overflow-hidden group cursor-pointer shadow-sm hover:shadow-md transition-shadow shrink-0">
                    <h2 className="text-2xl font-black text-gray-900 z-10 relative leading-tight">Find gifts for Mom</h2>
                    <Image
                      src="https://images.unsplash.com/photo-1523381210434-271e8be1f52b?q=80&w=2070&auto=format&fit=crop"
                      alt="Gifts for Mom"
                      fill
                      className="object-cover mt-16 scale-110 group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                </Link>

                {/* Card 2 */}
                <Link href="/explore">
                  <div className="w-[280px] h-[340px] rounded-[2rem] bg-[#fef08a] p-6 relative overflow-hidden group cursor-pointer shadow-sm hover:shadow-md transition-shadow shrink-0">
                    <h2 className="text-2xl font-black text-gray-900 z-10 relative leading-tight">Find gifts for Kids</h2>
                    <Image
                      src="https://images.unsplash.com/photo-1543163521-1bf539c55dd2?q=80&w=2080&auto=format&fit=crop"
                      alt="Gifts for Kids"
                      fill
                      className="object-cover mt-16 scale-110 group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                </Link>

                {/* Card 3 */}
                <Link href="/explore">
                  <div className="w-[280px] h-[340px] rounded-[2rem] bg-[#f3e8ff] p-6 relative overflow-hidden group cursor-pointer shadow-sm hover:shadow-md transition-shadow shrink-0">
                    <h2 className="text-2xl font-black text-gray-900 z-10 relative leading-tight">Score top PCs &amp; Accessories</h2>
                    <Image
                      src="https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3"
                      alt="PCs & Accessories"
                      fill
                      className="object-cover mt-16 scale-110 group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                </Link>

                {/* Card 4 */}
                <Link href="/explore">
                  <div className="w-[280px] h-[340px] rounded-[2rem] bg-[#ffedd5] p-6 relative overflow-hidden group cursor-pointer shadow-sm hover:shadow-md transition-shadow shrink-0">
                    <h2 className="text-2xl font-black text-gray-900 z-10 relative leading-tight">Campus Essentials</h2>
                    <Image
                      src="https://images.unsplash.com/photo-1552820728-8b83bb6b773f?q=80&w=2070&auto=format&fit=crop"
                      alt="Campus Essentials"
                      fill
                      className="object-cover mt-16 scale-110 group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                </Link>

                {/* Card 5 */}
                <Link href="/explore">
                  <div className="w-[280px] h-[340px] rounded-[2rem] bg-[#e0f2fe] p-6 relative overflow-hidden group cursor-pointer shadow-sm hover:shadow-md transition-shadow shrink-0">
                    <h2 className="text-2xl font-black text-gray-900 z-10 relative leading-tight">Fresh Kicks</h2>
                    <Image
                      src="https://images.unsplash.com/photo-1552346154-21d32810baa3?q=80&w=2070&auto=format&fit=crop"
                      alt="Fresh Kicks"
                      fill
                      className="object-cover mt-16 scale-110 group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                </Link>

                {/* Card 6 */}
                <Link href="/explore">
                  <div className="w-[280px] h-[340px] rounded-[2rem] bg-[#fce7f3] p-6 relative overflow-hidden group cursor-pointer shadow-sm hover:shadow-md transition-shadow shrink-0">
                    <h2 className="text-2xl font-black text-gray-900 z-10 relative leading-tight">Study Space Upgrades</h2>
                    <Image
                      src="https://images.unsplash.com/photo-1518455027359-f3f8164ba6bd?q=80&w=2070&auto=format&fit=crop"
                      alt="Study Space Upgrades"
                      fill
                      className="object-cover mt-16 scale-110 group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                </Link>

                {/* Card 7 */}
                <Link href="/explore">
                  <div className="w-[280px] h-[340px] rounded-[2rem] bg-[#fee2e2] p-6 relative overflow-hidden group cursor-pointer shadow-sm hover:shadow-md transition-shadow shrink-0">
                    <h2 className="text-2xl font-black text-gray-900 z-10 relative leading-tight">Room Decor</h2>
                    <Image
                      src="https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?q=80&w=2070&auto=format&fit=crop"
                      alt="Room Decor"
                      fill
                      className="object-cover mt-16 scale-110 group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                </Link>
              </div>
            ))}
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
          className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto"
        >
          <Link
            href="/explore"
            className="group inline-flex items-center justify-center gap-2 bg-gray-900 text-white px-8 py-4 rounded-full font-bold text-lg hover:bg-gray-800 hover:scale-[1.02] transition-all active:scale-95 shadow-lg shadow-gray-900/20"
          >
            Start Exploring
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
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
