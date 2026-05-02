with open('unimonday-web/src/app/vendor/dashboard/page.tsx', 'r') as f:
    content = f.read()

# Make add product open a simulated modal and list orders
import re

new_vendor = """"use client";

import { useState } from "react";
import Image from "next/image";
import { Store, Package, TrendingUp, Users, Plus, Star, Settings, Image as ImageIcon, X } from "lucide-react";
import { toast } from "sonner";

export default function VendorDashboard() {
  const [isAddingProduct, setIsAddingProduct] = useState(false);

  const handleAddProduct = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Product added successfully!");
    setIsAddingProduct(false);
  }

  return (
    <div className="max-w-6xl mx-auto py-8 px-4 relative">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-black flex items-center gap-2">
            <Store className="w-8 h-8 text-primary" /> Vendor Dashboard
          </h1>
          <p className="text-muted-foreground font-medium">Welcome back, Kicks TZ</p>
        </div>
        <button onClick={() => setIsAddingProduct(true)} className="bg-primary text-white px-6 py-3 rounded-full font-bold flex items-center gap-2 hover:bg-primary/90 transition-colors shadow-lg shadow-primary/20">
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
            <Star className="w-4 h-4" /> Store Rating
          </div>
          <div className="text-2xl sm:text-3xl font-black">4.8</div>
        </div>
        <div className="bg-white p-6 rounded-[2rem] border border-border shadow-sm">
          <div className="flex items-center gap-2 text-muted-foreground mb-2">
            <Users className="w-4 h-4" /> Profile Views
          </div>
          <div className="text-2xl sm:text-3xl font-black">1.2k</div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Recent Orders Table */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-[2rem] border border-border shadow-sm p-6 overflow-hidden">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-black">Recent Orders</h2>
              <button className="text-primary font-bold text-sm hover:underline">View All</button>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="text-muted-foreground border-b border-border text-sm">
                    <th className="pb-3 font-bold">Order ID</th>
                    <th className="pb-3 font-bold">Item</th>
                    <th className="pb-3 font-bold">Price</th>
                    <th className="pb-3 font-bold">Status</th>
                  </tr>
                </thead>
                <tbody className="text-sm font-medium">
                  <tr className="border-b border-border/50">
                    <td className="py-4">#ORD-9821</td>
                    <td className="py-4 flex items-center gap-2">
                      <div className="w-8 h-8 rounded bg-gray-100 overflow-hidden relative shrink-0">
                         <Image src="https://images.unsplash.com/photo-1543163521-1bf539c55dd2?q=80&w=100&auto=format&fit=crop" alt="item" fill className="object-cover"/>
                      </div>
                      Classic Sneakers
                    </td>
                    <td className="py-4">Tsh 55,000</td>
                    <td className="py-4"><span className="bg-amber-100 text-amber-700 px-2 py-1 rounded font-bold text-xs">Pending</span></td>
                  </tr>
                  <tr className="border-b border-border/50">
                    <td className="py-4">#ORD-9820</td>
                    <td className="py-4 flex items-center gap-2">
                      <div className="w-8 h-8 rounded bg-gray-100 overflow-hidden relative shrink-0">
                         <Image src="https://images.unsplash.com/photo-1523381210434-271e8be1f52b?q=80&w=100&auto=format&fit=crop" alt="item" fill className="object-cover"/>
                      </div>
                      Vintage Jacket
                    </td>
                    <td className="py-4">Tsh 35,000</td>
                    <td className="py-4"><span className="bg-green-100 text-green-700 px-2 py-1 rounded font-bold text-xs">Paid</span></td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Quick Actions / Store Info */}
        <div className="space-y-4">
           <div className="bg-white rounded-[2rem] border border-border shadow-sm p-6">
              <h2 className="text-xl font-black mb-4">Quick Actions</h2>
              <div className="space-y-2">
                <button className="w-full flex items-center justify-between p-3 bg-gray-50 hover:bg-gray-100 rounded-xl font-bold transition-colors">
                  <span className="flex items-center gap-2"><Settings className="w-4 h-4"/> Store Settings</span>
                </button>
                <button className="w-full flex items-center justify-between p-3 bg-gray-50 hover:bg-gray-100 rounded-xl font-bold transition-colors">
                  <span className="flex items-center gap-2"><ImageIcon className="w-4 h-4"/> Update Banners</span>
                </button>
              </div>
           </div>
        </div>
      </div>

      {/* Add Product Modal */}
      {isAddingProduct && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-gray-900/40 backdrop-blur-sm">
           <div className="bg-white w-full max-w-md rounded-[2rem] shadow-2xl p-6 border border-border relative">
             <button onClick={() => setIsAddingProduct(false)} className="absolute top-4 right-4 p-2 bg-gray-100 hover:bg-gray-200 rounded-full">
               <X className="w-5 h-5"/>
             </button>
             <h2 className="text-2xl font-black mb-6">Add New Product</h2>
             <form onSubmit={handleAddProduct} className="space-y-4">
                <div>
                  <label className="block text-sm font-bold mb-1">Product Name</label>
                  <input required type="text" className="w-full border border-border bg-gray-50 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary" placeholder="e.g. Nike Air Force 1" />
                </div>
                <div>
                  <label className="block text-sm font-bold mb-1">Price (Tsh)</label>
                  <input required type="number" className="w-full border border-border bg-gray-50 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary" placeholder="45000" />
                </div>
                <div>
                  <label className="block text-sm font-bold mb-1">Category</label>
                  <select className="w-full border border-border bg-gray-50 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary appearance-none">
                    <option>Fashion</option>
                    <option>Tech</option>
                    <option>Services</option>
                  </select>
                </div>
                <button type="submit" className="w-full bg-primary text-white font-bold py-3 rounded-xl hover:bg-primary/90 mt-2">Publish Product</button>
             </form>
           </div>
        </div>
      )}
    </div>
  );
}
"""

with open('unimonday-web/src/app/vendor/dashboard/page.tsx', 'w') as f:
    f.write(new_vendor)

print("Vendor details patched")
