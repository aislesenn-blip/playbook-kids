"use client";

import Image from "next/image";
import { Store, Package, TrendingUp, Users, Plus, Star, Settings, Image as ImageIcon } from "lucide-react";

export default function VendorDashboard() {
  return (
    <div className="max-w-6xl mx-auto py-8 px-4">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-black flex items-center gap-2">
            <Store className="w-8 h-8 text-primary" /> Vendor Dashboard
          </h1>
          <p className="text-muted-foreground font-medium">Welcome back, Kicks TZ</p>
        </div>
        <button className="bg-primary text-white px-6 py-3 rounded-full font-bold flex items-center gap-2 hover:bg-primary/90 transition-colors shadow-lg shadow-primary/20">
          <Plus className="w-5 h-5" /> Add Product
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
        <div className="bg-white p-6 rounded-[2rem] border border-border shadow-sm">
          <div className="flex items-center gap-2 text-muted-foreground mb-2">
            <TrendingUp className="w-4 h-4" /> Sales (This Week)
          </div>
          <div className="text-2xl sm:text-3xl font-black">Tsh 450k</div>
        </div>
        <div className="bg-white p-6 rounded-[2rem] border border-border shadow-sm">
          <div className="flex items-center gap-2 text-muted-foreground mb-2">
            <Package className="w-4 h-4" /> Active Orders
          </div>
          <div className="text-2xl sm:text-3xl font-black">12</div>
        </div>
        <div className="bg-white p-6 rounded-[2rem] border border-border shadow-sm">
          <div className="flex items-center gap-2 text-muted-foreground mb-2">
            <Users className="w-4 h-4" /> Store Visits
          </div>
          <div className="text-2xl sm:text-3xl font-black">1.2k</div>
        </div>
        <div className="bg-white p-6 rounded-[2rem] border border-border shadow-sm">
          <div className="flex items-center gap-2 text-muted-foreground mb-2">
            <Star className="w-4 h-4" /> Rating
          </div>
          <div className="text-2xl sm:text-3xl font-black">4.9</div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Content Area */}
        <div className="lg:col-span-2 space-y-8">

          {/* Products List */}
          <section className="bg-white rounded-[2.5rem] border border-border shadow-sm p-6 sm:p-8">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-black">Your Products</h2>
              <button className="text-sm font-bold text-primary hover:underline">View All</button>
            </div>

            <div className="space-y-4">
              {/* Product 1 */}
              <div className="flex items-center gap-4 p-4 hover:bg-gray-50 rounded-2xl transition-colors border border-transparent hover:border-border cursor-pointer">
                <div className="w-16 h-16 rounded-xl bg-gray-100 overflow-hidden relative shrink-0">
                  <Image src="https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3" alt="Sneakers" fill className="object-cover" />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-bold truncate">Nike Red Runners</h3>
                  <p className="text-sm text-muted-foreground">Tsh 75,000 • 5 in stock</p>
                </div>
                <div className="flex items-center gap-2">
                  <span className="px-3 py-1 bg-green-50 text-green-600 rounded-full text-xs font-bold">Active</span>
                </div>
              </div>

              {/* Product 2 */}
              <div className="flex items-center gap-4 p-4 hover:bg-gray-50 rounded-2xl transition-colors border border-transparent hover:border-border cursor-pointer">
                <div className="w-16 h-16 rounded-xl bg-gray-100 overflow-hidden relative shrink-0 flex items-center justify-center">
                  <ImageIcon className="w-6 h-6 text-gray-400" />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-bold truncate">Draft: Blue Hoodies</h3>
                  <p className="text-sm text-muted-foreground">Tsh 40,000 • 0 in stock</p>
                </div>
                <div className="flex items-center gap-2">
                  <span className="px-3 py-1 bg-gray-100 text-gray-600 rounded-full text-xs font-bold">Draft</span>
                </div>
              </div>
            </div>
          </section>

          {/* Quick Upload Prototype */}
          <section className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-[2.5rem] p-8 text-white shadow-xl">
             <h2 className="text-2xl font-black mb-2">Quick Upload</h2>
             <p className="text-gray-400 mb-6 font-medium">Drag & drop product images from your phone.</p>
             <div className="border-2 border-dashed border-gray-600 rounded-2xl p-10 flex flex-col items-center justify-center text-center cursor-pointer hover:bg-white/5 transition-colors">
               <ImageIcon className="w-12 h-12 text-gray-400 mb-4" />
               <p className="font-bold">Tap to upload photos</p>
               <p className="text-sm text-gray-500 mt-1">PNG, JPG, up to 5MB</p>
             </div>
          </section>

        </div>

        {/* Sidebar */}
        <div className="space-y-8">
           <section className="bg-white rounded-[2.5rem] border border-border shadow-sm p-6">
             <h2 className="text-xl font-black mb-6">Store Settings</h2>
             <div className="space-y-4">
               <button className="w-full flex items-center justify-between p-4 hover:bg-gray-50 rounded-2xl transition-colors text-left group">
                 <div className="flex items-center gap-3 font-bold text-gray-700 group-hover:text-gray-900">
                   <Settings className="w-5 h-5" /> Profile & Banner
                 </div>
               </button>
               <button className="w-full flex items-center justify-between p-4 hover:bg-gray-50 rounded-2xl transition-colors text-left group">
                 <div className="flex items-center gap-3 font-bold text-gray-700 group-hover:text-gray-900">
                   <Star className="w-5 h-5" /> Reviews (42)
                 </div>
               </button>
             </div>
           </section>
        </div>

      </div>
    </div>
  );
}
