"use client";

import { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { LayoutDashboard, Package, TrendingUp, Star, Upload, Plus, Trash2, Edit3, Image as ImageIcon } from "lucide-react";

export default function VendorDashboard() {
  const [activeTab, setActiveTab] = useState("overview");

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col md:flex-row pt-16">
      {/* Sidebar */}
      <aside className="w-full md:w-64 bg-white border-r border-border shrink-0 md:min-h-[calc(100vh-4rem)] p-4 flex flex-col gap-2">
        <button
          onClick={() => setActiveTab("overview")}
          className={`flex items-center gap-3 p-3 rounded-xl font-bold transition-colors ${activeTab === "overview" ? "bg-primary text-white" : "text-gray-600 hover:bg-gray-100"}`}
        >
          <LayoutDashboard className="w-5 h-5" /> Overview
        </button>
        <button
          onClick={() => setActiveTab("products")}
          className={`flex items-center gap-3 p-3 rounded-xl font-bold transition-colors ${activeTab === "products" ? "bg-primary text-white" : "text-gray-600 hover:bg-gray-100"}`}
        >
          <Package className="w-5 h-5" /> My Products
        </button>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-4 sm:p-8 overflow-y-auto">
        {activeTab === "overview" && (
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
            <h1 className="text-3xl font-black mb-6">Store Dashboard</h1>

            {/* Stats */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
              <div className="bg-white p-6 rounded-3xl border border-border shadow-sm flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-primary/10 text-primary flex items-center justify-center">
                  <TrendingUp className="w-6 h-6" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground font-bold">Total Sales</p>
                  <p className="text-2xl font-black">Tsh 450,000</p>
                </div>
              </div>
              <div className="bg-white p-6 rounded-3xl border border-border shadow-sm flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-blue-500/10 text-blue-500 flex items-center justify-center">
                  <Package className="w-6 h-6" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground font-bold">Active Products</p>
                  <p className="text-2xl font-black">24</p>
                </div>
              </div>
              <div className="bg-white p-6 rounded-3xl border border-border shadow-sm flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-amber-500/10 text-amber-500 flex items-center justify-center">
                  <Star className="w-6 h-6" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground font-bold">Store Rating</p>
                  <p className="text-2xl font-black">4.8 / 5.0</p>
                </div>
              </div>
            </div>

            <div className="bg-white p-8 rounded-[2rem] border border-border shadow-sm text-center">
               <h2 className="text-xl font-bold mb-2">Welcome to your God-Mode vendor dashboard</h2>
               <p className="text-muted-foreground">This is a high-end prototype. Explore the &apos;My Products&apos; tab to upload and manage inventory.</p>
            </div>
          </motion.div>
        )}

        {activeTab === "products" && (
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-8">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <h1 className="text-3xl font-black">Product Management</h1>
            </div>

            {/* Upload Section */}
            <div className="bg-white p-6 sm:p-8 rounded-[2rem] border border-border shadow-sm">
              <h2 className="text-xl font-bold mb-6 flex items-center gap-2"><Plus className="w-5 h-5 text-primary"/> Add New Product</h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Image Upload UI */}
                <div className="border-2 border-dashed border-gray-300 rounded-3xl h-64 flex flex-col items-center justify-center bg-gray-50 hover:bg-gray-100 transition-colors cursor-pointer group">
                  <div className="w-16 h-16 bg-white rounded-full shadow-sm flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                    <ImageIcon className="w-8 h-8 text-gray-400" />
                  </div>
                  <p className="font-bold text-gray-700">Drag & Drop Image Here</p>
                  <p className="text-sm text-muted-foreground mt-1">or click to browse</p>
                </div>

                {/* Form Inputs */}
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-1">Product Title</label>
                    <input type="text" className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent outline-none" placeholder="e.g. Vintage Denim Jacket" />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-1">Price (Tsh)</label>
                    <input type="number" className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent outline-none" placeholder="35000" />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-1">Description</label>
                    <textarea rows={3} className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent outline-none resize-none" placeholder="Describe the item..." />
                  </div>
                  <button className="w-full py-3 bg-primary text-white rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-primary/90 transition-colors">
                    <Upload className="w-5 h-5" /> Publish Product
                  </button>
                </div>
              </div>
            </div>

            {/* Product List */}
            <h2 className="text-xl font-bold mt-8 mb-4">Your Inventory</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* Mock Product 1 */}
              <div className="bg-white rounded-3xl border border-border shadow-sm overflow-hidden group">
                <div className="relative h-48 w-full bg-gray-100">
                  <Image src="https://images.unsplash.com/photo-1523381210434-271e8be1f52b?w=500&auto=format&fit=crop&q=60" alt="Product" fill className="object-cover" />
                </div>
                <div className="p-4">
                  <h3 className="font-bold text-lg">Vintage Denim</h3>
                  <p className="text-muted-foreground font-medium mb-4">Tsh 35,000</p>
                  <div className="flex items-center gap-2">
                    <button className="flex-1 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg font-bold flex items-center justify-center gap-2 transition-colors">
                      <Edit3 className="w-4 h-4" /> Edit
                    </button>
                    <button className="p-2 bg-red-50 hover:bg-red-100 text-red-500 rounded-lg transition-colors">
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              </div>

              {/* Mock Product 2 */}
              <div className="bg-white rounded-3xl border border-border shadow-sm overflow-hidden group">
                <div className="relative h-48 w-full bg-gray-100">
                  <Image src="https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500&auto=format&fit=crop&q=60" alt="Product" fill className="object-cover" />
                </div>
                <div className="p-4">
                  <h3 className="font-bold text-lg">Nike Red Runners</h3>
                  <p className="text-muted-foreground font-medium mb-4">Tsh 75,000</p>
                  <div className="flex items-center gap-2">
                    <button className="flex-1 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg font-bold flex items-center justify-center gap-2 transition-colors">
                      <Edit3 className="w-4 h-4" /> Edit
                    </button>
                    <button className="p-2 bg-red-50 hover:bg-red-100 text-red-500 rounded-lg transition-colors">
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              </div>

            </div>

          </motion.div>
        )}
      </main>
    </div>
  );
}
