"use client";

import { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Search, SlidersHorizontal, MapPin, Store, Star, ArrowRight } from "lucide-react";

export default function ExplorePage() {
  const [activeCategory, setActiveCategory] = useState("All");

  const categories = ["All", "Fashion", "Tech & Accessories", "Verified Services", "Stores", "Groceries"];

  return (
    <div className="min-h-screen bg-gray-50/50 pb-24">
      {/* Search & Hero Section */}
      <section className="bg-white border-b border-border pt-32 pb-12 px-4">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-8"
          >
            <h1 className="text-4xl md:text-5xl font-black mb-4">Explore Campus Hub</h1>
            <p className="text-muted-foreground text-lg">Find the best deals, verified services, and top stores around campus.</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="max-w-3xl mx-auto flex gap-2"
          >
            <div className="relative flex-1">
              <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                className="w-full pl-12 pr-4 py-4 bg-gray-100 rounded-full border-none focus:ring-2 focus:ring-primary text-lg font-medium"
                placeholder="Search products, services, or stores..."
              />
            </div>
            <button className="bg-gray-900 text-white p-4 rounded-full hover:bg-gray-800 transition-colors flex items-center justify-center shrink-0 shadow-sm">
              <SlidersHorizontal className="h-6 w-6" />
            </button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="mt-8 flex gap-3 overflow-x-auto pb-4 scrollbar-hide justify-center"
          >
             {categories.map((cat) => (
               <button
                 key={cat}
                 onClick={() => setActiveCategory(cat)}
                 className={`px-6 py-2.5 rounded-full font-bold whitespace-nowrap transition-all ${
                   activeCategory === cat
                   ? "bg-primary text-white shadow-md shadow-primary/20"
                   : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                 }`}
               >
                 {cat}
               </button>
             ))}
          </motion.div>
        </div>
      </section>

      {/* Main Content Area */}
      <div className="max-w-7xl mx-auto px-4 mt-12 space-y-16">

        {/* Featured Stores */}
        <section>
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl sm:text-3xl font-black flex items-center gap-2">
              <Store className="w-6 h-6 text-primary" /> Featured Stores
            </h2>
            <button className="text-primary font-bold hover:underline flex items-center gap-1 text-sm">
              View All <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Store 1 */}
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

            {/* Store 2 */}
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

            {/* Store 3 */}
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
          </div>
        </section>

        {/* Discover Products Grid */}
        <section className="pb-16">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl sm:text-3xl font-black">Discover Products</h2>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">

            {/* Item 1 */}
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

            {/* Item 2 */}
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

            {/* Item 3 */}
            <motion.div whileHover={{ y: -5 }} className="bg-white rounded-[2rem] overflow-hidden border border-border shadow-sm group cursor-pointer">
              <div className="relative h-48 sm:h-56 w-full overflow-hidden bg-gray-100">
                <Image src="https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3" alt="Study Lamp" fill className="object-cover group-hover:scale-105 transition-transform duration-500" />
                <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-md px-2 py-1 rounded-lg text-xs font-bold text-gray-800">Home</div>
              </div>
              <div className="p-4 sm:p-5">
                <h3 className="font-bold text-lg mb-1 truncate">LED Desk Lamp</h3>
                <p className="text-sm text-muted-foreground mb-3 truncate">By Campus Essentials</p>
                <div className="flex items-center justify-between">
                  <span className="font-black text-lg">Tsh 25,000</span>
                  <button className="w-8 h-8 rounded-full bg-primary/10 text-primary flex items-center justify-center hover:bg-primary hover:text-white transition-colors">
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </motion.div>

            {/* Item 4 */}
            <motion.div whileHover={{ y: -5 }} className="bg-white rounded-[2rem] overflow-hidden border border-border shadow-sm group cursor-pointer">
              <div className="relative h-48 sm:h-56 w-full overflow-hidden bg-gray-100">
                <Image src="https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3" alt="Sneakers" fill className="object-cover group-hover:scale-105 transition-transform duration-500" />
                <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-md px-2 py-1 rounded-lg text-xs font-bold text-gray-800">Fashion</div>
              </div>
              <div className="p-4 sm:p-5">
                <h3 className="font-bold text-lg mb-1 truncate">Running Kicks</h3>
                <p className="text-sm text-muted-foreground mb-3 truncate">By Kicks TZ</p>
                <div className="flex items-center justify-between">
                  <span className="font-black text-lg">Tsh 55,000</span>
                  <button className="w-8 h-8 rounded-full bg-primary/10 text-primary flex items-center justify-center hover:bg-primary hover:text-white transition-colors">
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </motion.div>

            {/* Item 5 */}
            <motion.div whileHover={{ y: -5 }} className="bg-white rounded-[2rem] overflow-hidden border border-border shadow-sm group cursor-pointer">
              <div className="relative h-48 sm:h-56 w-full overflow-hidden bg-gray-100">
                <Image src="https://images.unsplash.com/photo-1551488831-00ddcb6c6bd3?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3" alt="Notebooks" fill className="object-cover group-hover:scale-105 transition-transform duration-500" />
                <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-md px-2 py-1 rounded-lg text-xs font-bold text-gray-800">Stationery</div>
              </div>
              <div className="p-4 sm:p-5">
                <h3 className="font-bold text-lg mb-1 truncate">Premium Notebook Set</h3>
                <p className="text-sm text-muted-foreground mb-3 truncate">By Stationers Hub</p>
                <div className="flex items-center justify-between">
                  <span className="font-black text-lg">Tsh 15,000</span>
                  <button className="w-8 h-8 rounded-full bg-primary/10 text-primary flex items-center justify-center hover:bg-primary hover:text-white transition-colors">
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </motion.div>

            {/* Item 6 */}
            <motion.div whileHover={{ y: -5 }} className="bg-white rounded-[2rem] overflow-hidden border border-border shadow-sm group cursor-pointer">
              <div className="relative h-48 sm:h-56 w-full overflow-hidden bg-gray-100">
                <Image src="https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3" alt="Hoodie" fill className="object-cover group-hover:scale-105 transition-transform duration-500" />
                <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-md px-2 py-1 rounded-lg text-xs font-bold text-gray-800">Apparel</div>
              </div>
              <div className="p-4 sm:p-5">
                <h3 className="font-bold text-lg mb-1 truncate">Classic Campus Hoodie</h3>
                <p className="text-sm text-muted-foreground mb-3 truncate">By Campus Thrift</p>
                <div className="flex items-center justify-between">
                  <span className="font-black text-lg">Tsh 40,000</span>
                  <button className="w-8 h-8 rounded-full bg-primary/10 text-primary flex items-center justify-center hover:bg-primary hover:text-white transition-colors">
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </motion.div>

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
