"use client";

import { useState } from "react";
import Image from "next/image";
import { Store, Package, TrendingUp, Users, Plus, Star, Settings, Image as ImageIcon, X, Copy, Share2 } from "lucide-react";
import { toast } from "sonner";
import { useAppStore } from "@/lib/store/app-store";
import { Order } from "@/types";

export default function VendorDashboard() {
  const [isAddingProduct, setIsAddingProduct] = useState(false);
  const { orders, updateOrderStatus } = useAppStore();
  const storeName = "Kicks TZ";
  const vendorOrders = orders.filter((o: Order) => o.vendor === storeName);

  const handleAddProduct = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Product added successfully!");
    setIsAddingProduct(false);
  }

  const storeSlug = "kicks-tz"; // Mock store slug for current user

  const handleCopyLink = () => {
    navigator.clipboard.writeText(`https://unimonday.com/store/${storeSlug}`);
    toast.success("Link copied! Paste to your WhatsApp Status to get more sales 🚀", {
      icon: "🎉",
      duration: 5000,
    });
  };

  return (
    <div className="max-w-6xl mx-auto py-8 px-4 relative">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-black flex items-center gap-2">
            <Store className="w-8 h-8 text-primary" /> Vendor Dashboard
          </h1>
          <p className="text-muted-foreground font-medium">Welcome back, Kicks TZ</p>
        </div>
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full sm:w-auto">
          <button
            onClick={handleCopyLink}
            className="bg-green-100 text-green-700 hover:bg-green-200 px-6 py-3 rounded-full font-bold flex items-center justify-center gap-2 transition-colors shadow-sm whitespace-nowrap"
          >
            <Copy className="w-5 h-5" /> Copy Store Link
          </button>
          <button onClick={() => setIsAddingProduct(true)} className="bg-primary text-white px-6 py-3 rounded-full font-bold flex items-center justify-center gap-2 hover:bg-primary/90 transition-colors shadow-lg shadow-primary/20 whitespace-nowrap">
            <Plus className="w-5 h-5" /> Add Product
          </button>
        </div>
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

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
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
                  {vendorOrders.slice(0, 5).map((order: Order) => (
                    <tr key={order.id} className="border-b border-border/50">
                      <td className="py-4 font-bold">{order.id}</td>
                      <td className="py-4 flex items-center gap-2">
                        {order.image ? (
                          <div className="w-10 h-10 rounded-lg bg-gray-100 overflow-hidden relative shrink-0">
                             <Image src={order.image} alt="item" fill className="object-cover"/>
                          </div>
                        ) : (
                          <div className="w-10 h-10 rounded-lg bg-gray-100 flex items-center justify-center shrink-0">
                             <Package className="w-5 h-5 text-gray-400" />
                          </div>
                        )}
                        <span className="truncate max-w-[150px]">{order.title}</span>
                      </td>
                      <td className="py-4">{order.price}</td>
                      <td className="py-4 flex flex-col gap-2">
                        <span className={`px-2 py-1 rounded font-bold text-xs w-fit ${
                          order.status === 'Pending' ? 'bg-amber-100 text-amber-700' :
                          order.status === 'Paid' ? 'bg-blue-100 text-blue-700' :
                          order.status === 'Delivered' ? 'bg-green-100 text-green-700' :
                          'bg-gray-100 text-gray-700'
                        }`}>
                          {order.status}
                        </span>
                        {order.status === 'Pending' && (
                           <button
                             onClick={() => {
                               updateOrderStatus(order.id, 'Paid');
                               toast.success(`Order ${order.id} confirmed!`);
                             }}
                             className="text-[10px] bg-primary text-white px-2 py-1 rounded hover:bg-primary/90 w-fit"
                           >
                             Confirm Order
                           </button>
                        )}
                      </td>
                    </tr>
                  ))}
                  {vendorOrders.length === 0 && (
                    <tr>
                      <td colSpan={4} className="py-8 text-center text-muted-foreground">No recent orders.</td>
                    </tr>
                  )}
                </tbody>

              </table>
            </div>
          </div>
        </div>

        {/* Quick Actions / Store Info */}
        <div className="space-y-6">
           <div className="bg-primary/5 rounded-[2rem] border border-primary/20 shadow-sm p-6 relative overflow-hidden group">
              <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                 <Share2 className="w-24 h-24 text-primary" />
              </div>
              <h2 className="text-xl font-black mb-2 text-gray-900 relative z-10">Drive Traffic</h2>
              <p className="text-sm font-medium text-gray-600 mb-6 relative z-10">Share your clean store link on WhatsApp to convert your audience into instant buyers.</p>

              <div className="bg-white rounded-xl border border-border p-3 flex items-center justify-between relative z-10">
                <span className="text-xs font-bold text-gray-500 truncate mr-2">unimonday.com/store/{storeSlug}</span>
                <button onClick={handleCopyLink} className="bg-gray-100 hover:bg-gray-200 text-gray-900 p-2 rounded-lg transition-colors shrink-0">
                  <Copy className="w-4 h-4" />
                </button>
              </div>
           </div>

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
                <div className="w-full h-40 bg-gray-100 rounded-xl border-2 border-dashed border-gray-300 flex flex-col items-center justify-center cursor-pointer hover:bg-gray-50 transition-colors group">
                    <ImageIcon className="w-8 h-8 text-gray-400 group-hover:text-primary mb-2 transition-colors" />
                    <span className="text-sm font-bold text-gray-500">Click to upload and crop</span>
                    <span className="text-xs text-gray-400 mt-1">1:1 ratio recommended</span>
                </div>
                <div>
                  <label className="block text-sm font-bold mb-1">Product Name</label>
                  <input required type="text" className="w-full border border-border bg-gray-50 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary" placeholder="e.g. Nike Air Force 1" />
                </div>
                <div className="grid grid-cols-2 gap-4">
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
                </div>
                <button type="submit" className="w-full bg-primary text-white font-bold py-4 rounded-xl hover:bg-primary/90 mt-4 shadow-lg shadow-primary/20">Publish Product</button>
             </form>

           </div>
        </div>
      )}
    </div>
  );
}
