"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { Search, SlidersHorizontal, MapPin, Store, Star, ArrowRight, ShoppingBag } from "lucide-react";

export default function ExplorePage() {
  const [activeCategory, setActiveCategory] = useState("All");

  const categories = ["All", "Fashion & Apparels", "Tech & Accessories", "Beauty & Cosmetics", "Home & Decor", "Services"];

  return (
    <div className="min-h-screen bg-gray-50/50 pb-24">
      {/* Top Nav Categories (Amazon-style snug to top) */}
      <section className="bg-gray-900 text-white px-4 py-2 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto">
          <div className="flex gap-4 overflow-x-auto [&::-webkit-scrollbar]:hidden items-center text-sm font-medium">
             {categories.map((cat) => (
               <button
                 key={cat}
                 onClick={() => setActiveCategory(cat)}
                 className={`whitespace-nowrap transition-colors px-2 py-1 rounded-md ${
                   activeCategory === cat
                   ? "font-bold border border-white"
                   : "text-gray-300 hover:text-white hover:border hover:border-gray-500 border border-transparent"
                 }`}
               >
                 {cat}
               </button>
             ))}
          </div>
        </div>
      </section>

      {/* Main Content Area */}
      <div className="max-w-7xl mx-auto px-4 mt-8 space-y-12">

        {/* Fashion Apparels (Reordered as first item per request) */}
        <section>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl sm:text-2xl font-bold flex items-center gap-2">
              <Star className="w-6 h-6 text-primary" /> Trending Products
            </h2>
            <button className="text-primary font-bold hover:underline flex items-center gap-1 text-sm">
              View All <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          <div className="flex overflow-x-auto gap-4 sm:gap-6 pb-4 [&::-webkit-scrollbar]:h-2 [&::-webkit-scrollbar-track]:bg-gray-100 [&::-webkit-scrollbar-thumb]:bg-gray-300 [&::-webkit-scrollbar-thumb]:rounded-full" style={{ scrollSnapType: "x mandatory" }}>

            {/* Item 1 */}
            <Link href="/product/1" className="block min-w-[240px] sm:min-w-[280px] shrink-0" style={{ scrollSnapAlign: "start" }}>
            <motion.div whileHover={{ y: -5 }} className="bg-white rounded-xl overflow-hidden border border-gray-100 shadow-sm group cursor-pointer h-full flex flex-col">
              <div className="relative h-48 sm:h-56 w-full overflow-hidden bg-gray-50">
                <Image src="https://images.unsplash.com/photo-1523381210434-271e8be1f52b?q=80&w=2070&auto=format&fit=crop" alt="Vintage Shirt" fill className="object-cover group-hover:scale-105 transition-transform duration-500" />
                <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-md px-2 py-1 rounded-md text-xs font-bold text-gray-800">Deal</div>
              </div>
              <div className="p-4 sm:p-5 flex-grow flex flex-col justify-between">
                <div>
                  <h3 className="font-bold text-lg mb-1 line-clamp-1">Vintage Graphic Tee</h3>
                  <p className="text-sm text-gray-500 mb-3 line-clamp-1">Campus Thrift</p>
                </div>
                <div className="flex items-center justify-between mt-auto">
                  <span className="font-bold text-lg text-red-600">Tsh 15,000</span>
                  <button className="text-primary text-sm font-bold hover:underline">Add</button>
                </div>
              </div>
            </motion.div>
            </Link>

            {/* Item 2 */}
            <Link href="/product/1" className="block min-w-[240px] sm:min-w-[280px] shrink-0" style={{ scrollSnapAlign: "start" }}>
            <motion.div whileHover={{ y: -5 }} className="bg-white rounded-xl overflow-hidden border border-gray-100 shadow-sm group cursor-pointer h-full flex flex-col">
              <div className="relative h-48 sm:h-56 w-full overflow-hidden bg-gray-50">
                <Image src="https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3" alt="Casual Shirt" fill className="object-cover group-hover:scale-105 transition-transform duration-500" />
              </div>
              <div className="p-4 sm:p-5 flex-grow flex flex-col justify-between">
                <div>
                  <h3 className="font-bold text-lg mb-1 line-clamp-1">Casual Linen Shirt</h3>
                  <p className="text-sm text-gray-500 mb-3 line-clamp-1">Kicks TZ</p>
                </div>
                <div className="flex items-center justify-between mt-auto">
                  <span className="font-bold text-lg text-red-600">Tsh 18,000</span>
                  <button className="text-primary text-sm font-bold hover:underline">Add</button>
                </div>
              </div>
            </motion.div>
            </Link>

            {/* Item 3 */}
            <Link href="/product/1" className="block min-w-[240px] sm:min-w-[280px] shrink-0" style={{ scrollSnapAlign: "start" }}>
            <motion.div whileHover={{ y: -5 }} className="bg-white rounded-xl overflow-hidden border border-gray-100 shadow-sm group cursor-pointer h-full flex flex-col">
              <div className="relative h-48 sm:h-56 w-full overflow-hidden bg-gray-50">
                <Image src="https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3" alt="Socks" fill className="object-cover group-hover:scale-105 transition-transform duration-500" />
              </div>
              <div className="p-4 sm:p-5 flex-grow flex flex-col justify-between">
                <div>
                  <h3 className="font-bold text-lg mb-1 line-clamp-1">Red Sneakers</h3>
                  <p className="text-sm text-gray-500 mb-3 line-clamp-1">Sporty</p>
                </div>
                <div className="flex items-center justify-between mt-auto">
                  <span className="font-bold text-lg text-red-600">Tsh 19,500</span>
                  <button className="text-primary text-sm font-bold hover:underline">Add</button>
                </div>
              </div>
            </motion.div>
            </Link>

          </div>
        </section>

        {/* Featured Stores */}
        <section>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl sm:text-2xl font-bold flex items-center gap-2">
              <Store className="w-6 h-6 text-primary" /> Top Rated Stores
            </h2>
            <button className="text-primary font-bold hover:underline flex items-center gap-1 text-sm">
              View All <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          <div className="flex overflow-x-auto gap-6 pb-4 [&::-webkit-scrollbar]:h-2 [&::-webkit-scrollbar-track]:bg-gray-100 [&::-webkit-scrollbar-thumb]:bg-gray-300 [&::-webkit-scrollbar-thumb]:rounded-full" style={{ scrollSnapType: "x mandatory" }}>
            {/* Store 1 */}
            <Link href="/store/v2" className="block min-w-[300px] shrink-0" style={{ scrollSnapAlign: "start" }}>
              <motion.div whileHover={{ y: -5 }} className="bg-white rounded-3xl p-6 border border-border shadow-sm flex items-center gap-5 cursor-pointer">
                <div className="w-20 h-20 rounded-full overflow-hidden relative shrink-0 border border-gray-100 shadow-inner">
                  <Image src="https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3" alt="Campus Thrift" fill className="object-cover" />
                </div>
                <div>
                  <h3 className="font-bold text-xl flex items-center gap-1">Campus Thrift <div className="w-2 h-2 bg-primary rounded-full"></div></h3>
                  <p className="text-sm text-muted-foreground flex items-center gap-1 mt-1"><MapPin className="w-3 h-3" /> Block A, Room 12</p>
                  <div className="flex items-center gap-1 mt-2 text-sm font-semibold text-amber-500">
                    <Star className="w-4 h-4 fill-current" /> 4.9 <span className="text-gray-400 font-normal">(128 reviews)</span>
                  </div>
                </div>
              </motion.div>
            </Link>

            {/* Store 2 */}
            <Link href="/store/v1" className="block min-w-[300px] shrink-0" style={{ scrollSnapAlign: "start" }}>
              <motion.div whileHover={{ y: -5 }} className="bg-white rounded-3xl p-6 border border-border shadow-sm flex items-center gap-5 cursor-pointer">
                <div className="w-20 h-20 rounded-full overflow-hidden relative shrink-0 border border-gray-100 shadow-inner">
                  <Image src="https://images.unsplash.com/photo-1550009158-9ebf69173e03?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3" alt="TechZone UDSM" fill className="object-cover" />
                </div>
                <div>
                  <h3 className="font-bold text-xl flex items-center gap-1">TechZone UDSM <div className="w-2 h-2 bg-primary rounded-full"></div></h3>
                  <p className="text-sm text-muted-foreground flex items-center gap-1 mt-1"><MapPin className="w-3 h-3" /> Student Center</p>
                  <div className="flex items-center gap-1 mt-2 text-sm font-semibold text-amber-500">
                    <Star className="w-4 h-4 fill-current" /> 4.8 <span className="text-gray-400 font-normal">(95 reviews)</span>
                  </div>
                </div>
              </motion.div>
            </Link>

            {/* Store 3 */}
            <Link href="/store/v2" className="block min-w-[300px] shrink-0" style={{ scrollSnapAlign: "start" }}>
              <motion.div whileHover={{ y: -5 }} className="bg-white rounded-3xl p-6 border border-border shadow-sm flex items-center gap-5 cursor-pointer">
                <div className="w-20 h-20 rounded-full overflow-hidden relative shrink-0 border border-gray-100 shadow-inner">
                  <Image src="https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3" alt="Kicks TZ" fill className="object-cover" />
                </div>
                <div>
                  <h3 className="font-bold text-xl flex items-center gap-1">Kicks TZ <div className="w-2 h-2 bg-primary rounded-full"></div></h3>
                  <p className="text-sm text-muted-foreground flex items-center gap-1 mt-1"><MapPin className="w-3 h-3" /> Online Only</p>
                  <div className="flex items-center gap-1 mt-2 text-sm font-semibold text-amber-500">
                    <Star className="w-4 h-4 fill-current" /> 5.0 <span className="text-gray-400 font-normal">(42 reviews)</span>
                  </div>
                </div>
              </motion.div>
            </Link>
          </div>
        </section>

        {/* Trending Products Grid */}
        <section className="pb-16">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl sm:text-3xl font-black flex items-center gap-2">
              <ShoppingBag className="w-6 h-6 text-primary" /> Fashion Apparels under TZS 20,000
            </h2>
            <button className="text-primary font-bold hover:underline flex items-center gap-1 text-sm">
              View All <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          <div className="flex overflow-x-auto gap-4 sm:gap-6 pb-4 [&::-webkit-scrollbar]:h-2 [&::-webkit-scrollbar-track]:bg-gray-100 [&::-webkit-scrollbar-thumb]:bg-gray-300 [&::-webkit-scrollbar-thumb]:rounded-full" style={{ scrollSnapType: "x mandatory" }}>

            {/* Item 6 - Classic Campus Hoodie */}
            <Link href="/product/1" className="block min-w-[240px] sm:min-w-[280px] shrink-0" style={{ scrollSnapAlign: "start" }}>
            <motion.div whileHover={{ y: -5 }} className="bg-white rounded-[2rem] overflow-hidden border border-border shadow-sm group cursor-pointer">
              <div className="relative h-48 sm:h-56 w-full overflow-hidden bg-gray-100">
                <Image src="https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3" alt="Hoodie" fill className="object-cover group-hover:scale-105 transition-transform duration-500" />
                <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-md px-2 py-1 rounded-lg text-xs font-bold text-gray-800">Apparel</div>
              </div>
              <div className="p-4 sm:p-5">
                <h3 className="font-bold text-lg mb-1 truncate">Classic Campus Hoodie</h3>
                <p className="text-sm text-muted-foreground mb-3 truncate">By Campus Thrift</p>
                <div className="flex items-center justify-between">
                  <span className="font-black text-lg">Tsh 18,000</span>
                  <button className="w-8 h-8 rounded-full bg-primary/10 text-primary flex items-center justify-center hover:bg-primary hover:text-white transition-colors">
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </motion.div>
            </Link>

            {/* Item 10 - Vintage Denim */}
            <Link href="/product/1" className="block min-w-[240px] sm:min-w-[280px] shrink-0" style={{ scrollSnapAlign: "start" }}>
            <motion.div whileHover={{ y: -5 }} className="bg-white rounded-[2rem] overflow-hidden border border-border shadow-sm group cursor-pointer">
              <div className="relative h-48 sm:h-56 w-full overflow-hidden bg-gray-100">
                <Image src="https://images.unsplash.com/photo-1523381210434-271e8be1f52b?q=80&w=2070&auto=format&fit=crop" alt="Denim" fill className="object-cover group-hover:scale-105 transition-transform duration-500" />
                <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-md px-2 py-1 rounded-lg text-xs font-bold text-gray-800">Apparel</div>
              </div>
              <div className="p-4 sm:p-5">
                <h3 className="font-bold text-lg mb-1 truncate">Vintage Denim</h3>
                <p className="text-sm text-muted-foreground mb-3 truncate">By Campus Thrift</p>
                <div className="flex items-center justify-between">
                  <span className="font-black text-lg">Tsh 15,000</span>
                  <button className="w-8 h-8 rounded-full bg-primary/10 text-primary flex items-center justify-center hover:bg-primary hover:text-white transition-colors">
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </motion.div>
            </Link>

            {/* Item 7 - Nike Red Runners */}
            <Link href="/product/1" className="block min-w-[240px] sm:min-w-[280px] shrink-0" style={{ scrollSnapAlign: "start" }}>
            <motion.div whileHover={{ y: -5 }} className="bg-white rounded-[2rem] overflow-hidden border border-border shadow-sm group cursor-pointer">
              <div className="relative h-48 sm:h-56 w-full overflow-hidden bg-gray-100">
                <Image src="https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3" alt="Red Sneakers" fill className="object-cover group-hover:scale-105 transition-transform duration-500" />
                <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-md px-2 py-1 rounded-lg text-xs font-bold text-gray-800">Fashion</div>
              </div>
              <div className="p-4 sm:p-5">
                <h3 className="font-bold text-lg mb-1 truncate">Nike Red Runners</h3>
                <p className="text-sm text-muted-foreground mb-3 truncate">By Kicks TZ</p>
                <div className="flex items-center justify-between">
                  <span className="font-black text-lg">Tsh 19,500</span>
                  <button className="w-8 h-8 rounded-full bg-primary/10 text-primary flex items-center justify-center hover:bg-primary hover:text-white transition-colors">
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </motion.div>
            </Link>

            {/* Item 4 - Running Kicks */}
            <Link href="/product/1" className="block min-w-[240px] sm:min-w-[280px] shrink-0" style={{ scrollSnapAlign: "start" }}>
            <motion.div whileHover={{ y: -5 }} className="bg-white rounded-[2rem] overflow-hidden border border-border shadow-sm group cursor-pointer">
              <div className="relative h-48 sm:h-56 w-full overflow-hidden bg-gray-100">
                <Image src="https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3" alt="Sneakers" fill className="object-cover group-hover:scale-105 transition-transform duration-500" />
                <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-md px-2 py-1 rounded-lg text-xs font-bold text-gray-800">Fashion</div>
              </div>
              <div className="p-4 sm:p-5">
                <h3 className="font-bold text-lg mb-1 truncate">Running Kicks</h3>
                <p className="text-sm text-muted-foreground mb-3 truncate">By Kicks TZ</p>
                <div className="flex items-center justify-between">
                  <span className="font-black text-lg">Tsh 12,000</span>
                  <button className="w-8 h-8 rounded-full bg-primary/10 text-primary flex items-center justify-center hover:bg-primary hover:text-white transition-colors">
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </motion.div>
            </Link>

          </div>
        </section>

        {/* Tech Grid */}
        <section className="pb-16">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl sm:text-3xl font-black flex items-center gap-2">
              <ShoppingBag className="w-6 h-6 text-primary" /> Tech Picks
            </h2>
            <button className="text-primary font-bold hover:underline flex items-center gap-1 text-sm">
              View All <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          <div className="flex overflow-x-auto gap-4 sm:gap-6 pb-4 [&::-webkit-scrollbar]:h-2 [&::-webkit-scrollbar-track]:bg-gray-100 [&::-webkit-scrollbar-thumb]:bg-gray-300 [&::-webkit-scrollbar-thumb]:rounded-full" style={{ scrollSnapType: "x mandatory" }}>

            {/* Item 1 - Minimalist Smartwatch */}
            <Link href="/product/1" className="block min-w-[240px] sm:min-w-[280px] shrink-0" style={{ scrollSnapAlign: "start" }}>
            <motion.div whileHover={{ y: -5 }} className="bg-white rounded-[2rem] overflow-hidden border border-border shadow-sm group cursor-pointer">
              <div className="relative h-48 sm:h-56 w-full overflow-hidden bg-gray-100">
                <Image src="https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3" alt="Smart Watch" fill className="object-cover group-hover:scale-105 transition-transform duration-500" />
                <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-md px-2 py-1 rounded-lg text-xs font-bold text-gray-800">Tech</div>
              </div>
              <div className="p-4 sm:p-5">
                <h3 className="font-bold text-lg mb-1 truncate">Minimalist Smartwatch</h3>
                <p className="text-sm text-muted-foreground mb-3 truncate">By TechZone UDSM</p>
                <div className="flex items-center justify-between">
                  <span className="font-black text-lg">Tsh 65,000</span>
                  <button className="w-8 h-8 rounded-full bg-primary/10 text-primary flex items-center justify-center hover:bg-primary hover:text-white transition-colors">
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </motion.div>
            </Link>

            {/* Item 2 */}
            <Link href="/product/1" className="block min-w-[240px] sm:min-w-[280px] shrink-0" style={{ scrollSnapAlign: "start" }}>
            <motion.div whileHover={{ y: -5 }} className="bg-white rounded-[2rem] overflow-hidden border border-border shadow-sm group cursor-pointer">
              <div className="relative h-48 sm:h-56 w-full overflow-hidden bg-gray-100">
                <Image src="https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3" alt="Headphones" fill className="object-cover group-hover:scale-105 transition-transform duration-500" />
                <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-md px-2 py-1 rounded-lg text-xs font-bold text-gray-800">Audio</div>
              </div>
              <div className="p-4 sm:p-5">
                <h3 className="font-bold text-lg mb-1 truncate">Noise Cancelling Cans</h3>
                <p className="text-sm text-muted-foreground mb-3 truncate">By AudioPro</p>
                <div className="flex items-center justify-between">
                  <span className="font-black text-lg">Tsh 120,000</span>
                  <button className="w-8 h-8 rounded-full bg-primary/10 text-primary flex items-center justify-center hover:bg-primary hover:text-white transition-colors">
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </motion.div>
            </Link>

            {/* Item 8 */}
            <Link href="/product/1" className="block min-w-[240px] sm:min-w-[280px] shrink-0" style={{ scrollSnapAlign: "start" }}>
            <motion.div whileHover={{ y: -5 }} className="bg-white rounded-[2rem] overflow-hidden border border-border shadow-sm group cursor-pointer">
              <div className="relative h-48 sm:h-56 w-full overflow-hidden bg-gray-100">
                <Image src="https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3" alt="Laptop" fill className="object-cover group-hover:scale-105 transition-transform duration-500" />
                <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-md px-2 py-1 rounded-lg text-xs font-bold text-gray-800">Tech</div>
              </div>
              <div className="p-4 sm:p-5">
                <h3 className="font-bold text-lg mb-1 truncate">MacBook Pro M1</h3>
                <p className="text-sm text-muted-foreground mb-3 truncate">By Mac Dealers</p>
                <div className="flex items-center justify-between">
                  <span className="font-black text-lg">Tsh 2.5M</span>
                  <button className="w-8 h-8 rounded-full bg-primary/10 text-primary flex items-center justify-center hover:bg-primary hover:text-white transition-colors">
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </motion.div>
            </Link>

            {/* Item 9 */}
            <Link href="/product/1" className="block min-w-[240px] sm:min-w-[280px] shrink-0" style={{ scrollSnapAlign: "start" }}>
            <motion.div whileHover={{ y: -5 }} className="bg-white rounded-[2rem] overflow-hidden border border-border shadow-sm group cursor-pointer">
              <div className="relative h-48 sm:h-56 w-full overflow-hidden bg-gray-100">
                <Image src="https://images.unsplash.com/photo-1546868871-7041f2a55e12?q=80&w=2064&auto=format&fit=crop" alt="Apple Watch" fill className="object-cover group-hover:scale-105 transition-transform duration-500" />
                <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-md px-2 py-1 rounded-lg text-xs font-bold text-gray-800">Tech</div>
              </div>
              <div className="p-4 sm:p-5">
                <h3 className="font-bold text-lg mb-1 truncate">Apple Watch Series 7</h3>
                <p className="text-sm text-muted-foreground mb-3 truncate">By TechZone</p>
                <div className="flex items-center justify-between">
                  <span className="font-black text-lg">Tsh 600,000</span>
                  <button className="w-8 h-8 rounded-full bg-primary/10 text-primary flex items-center justify-center hover:bg-primary hover:text-white transition-colors">
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </motion.div>
            </Link>

          </div>


          <div className="mt-12 flex justify-center">
            <button className="bg-white border border-border px-8 py-3 rounded-full font-bold text-gray-700 hover:bg-gray-50 transition-colors shadow-sm">
              Load More Products
            </button>
          </div>
        </section>

      </div>
    </div>
  );
}
