"use client";

import { useState } from "react";
import Image from "next/image";
import { Store, Package, TrendingUp, Users, Plus, Star, Settings, Image as ImageIcon, X, Copy, Share2, MessageCircle } from "lucide-react";
import Link from "next/link";
import { toast } from "sonner";
import { useAppStore } from "@/lib/store/app-store";
import { Order, Product } from "@/types";

export default function VendorDashboard() {

  const [isAddingProduct, setIsAddingProduct] = useState(false);
  const [isCropping, setIsCropping] = useState(false);
  const [tempImage, setTempImage] = useState<string | null>(null);
  const [croppedImage, setCroppedImage] = useState<string | null>(null);

  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [isBannersOpen, setIsBannersOpen] = useState(false);
  const [paymentInfo, setPaymentInfo] = useState("Free delivery Dar es Salaam. Mobile Money preferred.");
  const { orders, updateOrderStatus, addVendorProduct } = useAppStore();
  const [newProduct, setNewProduct] = useState({ name: "", price: "", category: "Fashion & Apparels", supplierPhone: "", supplierLocation: "" });
  const storeName = "Kicks TZ";
  const vendorOrders = orders.filter((o: Order) => o.vendor === storeName);


  const handleAddProduct = (e: React.FormEvent) => {
    e.preventDefault();
    const product: Product = {
      id: "p" + Date.now(),
      vendorId: "v1", // Kicks TZ ID
      vendorName: storeName,
      name: newProduct.name,
      description: "A newly added product.",
      price: parseInt(newProduct.price),
      category: newProduct.category as "Fashion & Apparels" | "Tech & Accessories" | "Beauty & Cosmetics" | "Home & Decor" | "Services",
      images: ["https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80"], // Default image for demo
      inStock: true
    };
    addVendorProduct(product);
    toast.success("Product added successfully!");
    setIsAddingProduct(false);
    setNewProduct({ name: "", price: "", category: "Fashion", supplierPhone: "", supplierLocation: "" });
  }


  const storeSlug = "kicks-tz"; // Mock store slug for current user

  const handleCopyLink = () => {
    navigator.clipboard.writeText(`https://unimonday.com/store/${storeSlug}`);
    toast.success("Link copied successfully.", {
      description: "Paste to your WhatsApp Status to drive traffic.",
      duration: 5000,
    });
  };

  return (
    <div className="max-w-6xl mx-auto py-8 px-4 relative">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-black flex items-center gap-2 mb-2">
            <Store className="w-8 h-8 text-primary" /> Internal Inventory Dashboard
          </h1>
          <p className="text-muted-foreground font-medium text-lg">Welcome back, uNiMONDAY Inventory Admin</p>
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
           {/* Earnings Widget - Psychological Boost */}
           <div className="bg-gray-900 text-white rounded-[2rem] border border-gray-800 shadow-xl p-6 relative overflow-hidden group">
              <div className="absolute -right-4 -top-4 w-32 h-32 bg-emerald-500 rounded-full opacity-20 blur-2xl"></div>
              <h2 className="text-sm font-bold text-gray-400 mb-1">Total Earnings</h2>
              <p className="text-4xl font-black mb-4">Tsh 450,000</p>
              <div className="flex items-center gap-2 text-sm font-bold text-emerald-400">
                 <span className="bg-emerald-500/20 px-2 py-1 rounded">+12% this week</span>
              </div>
           </div>

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
                <Link href="/chat" className="w-full flex items-center justify-between p-3 bg-gray-50 hover:bg-gray-100 rounded-xl font-bold transition-colors">
                  <span className="flex items-center gap-2 text-primary"><MessageCircle className="w-4 h-4"/> Inbox & Orders</span>
                </Link>
                <button onClick={() => setIsSettingsOpen(true)} className="w-full flex items-center justify-between p-3 bg-gray-50 hover:bg-gray-100 rounded-xl font-bold transition-colors">
                  <span className="flex items-center gap-2"><Settings className="w-4 h-4"/> Store Settings</span>
                </button>
                <button onClick={() => setIsBannersOpen(true)} className="w-full flex items-center justify-between p-3 bg-gray-50 hover:bg-gray-100 rounded-xl font-bold transition-colors">
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


             {isCropping ? (
               <div className="space-y-4">
                 <h2 className="text-2xl font-black mb-2">Perfect Crop</h2>
                 <p className="text-sm text-gray-500 mb-4 font-medium">Pinch or drag to fit your product in the 1:1 square. This ensures your store looks clean and professional.</p>
                 <div className="relative w-full aspect-square bg-black rounded-xl overflow-hidden group cursor-move">
                    {/* Mock crop view */}
                    <Image src={tempImage || "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800"} alt="Crop" fill className="object-cover opacity-80 group-hover:scale-105 transition-transform duration-700" />

                    {/* Crop Grid Overlay */}
                    <div className="absolute inset-0 pointer-events-none border-2 border-white/50">
                       <div className="w-full h-1/3 border-b border-white/30"></div>
                       <div className="w-full h-1/3 border-b border-white/30"></div>
                    </div>
                    <div className="absolute inset-0 pointer-events-none flex">
                       <div className="h-full w-1/3 border-r border-white/30"></div>
                       <div className="h-full w-1/3 border-r border-white/30"></div>
                    </div>
                 </div>
                 <div className="flex gap-3 mt-6">
                   <button onClick={() => { setIsCropping(false); setTempImage(null); }} className="flex-1 py-3 px-4 bg-gray-100 hover:bg-gray-200 text-gray-900 rounded-xl font-bold transition-colors">Cancel</button>
                   <button onClick={() => { setCroppedImage(tempImage); setIsCropping(false); }} className="flex-1 py-3 px-4 bg-primary hover:bg-primary/90 text-white rounded-xl font-bold shadow-lg shadow-primary/20 transition-colors">Done Cropping</button>
                 </div>
               </div>
             ) : (
               <>
                 <h2 className="text-2xl font-black mb-6">Add New Product</h2>
                 <form onSubmit={handleAddProduct} className="space-y-4">
                    {croppedImage ? (
                        <div className="w-full h-40 bg-gray-100 rounded-xl border border-border relative overflow-hidden group">
                           <Image src={croppedImage} alt="Preview" fill className="object-cover" />
                           <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                              <button type="button" onClick={() => setCroppedImage(null)} className="bg-white text-gray-900 px-4 py-2 rounded-lg font-bold text-sm">Remove</button>
                           </div>
                        </div>
                    ) : (
                        <div onClick={() => { setTempImage("https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800"); setIsCropping(true); }} className="w-full h-40 bg-gray-100 rounded-xl border-2 border-dashed border-gray-300 flex flex-col items-center justify-center cursor-pointer hover:bg-gray-50 transition-colors group">
                            <ImageIcon className="w-8 h-8 text-gray-400 group-hover:text-primary mb-2 transition-colors" />
                            <span className="text-sm font-bold text-gray-500">Click to upload and crop</span>
                            <span className="text-xs text-gray-400 mt-1">1:1 ratio recommended</span>
                        </div>
                    )}
                    <div>

                  <label className="block text-sm font-bold mb-1">Product Name</label>
                  <input required type="text" value={newProduct.name} onChange={e => setNewProduct({...newProduct, name: e.target.value})} className="w-full border border-border bg-gray-50 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary" placeholder="e.g. Nike Air Force 1" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-bold mb-1">Price (Tsh)</label>
                    <input required type="number" value={newProduct.price} onChange={e => setNewProduct({...newProduct, price: e.target.value})} className="w-full border border-border bg-gray-50 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary" placeholder="45000" />
                  </div>
                  <div>
                    <label className="block text-sm font-bold mb-1">Category</label>
                    <select value={newProduct.category} onChange={e => setNewProduct({...newProduct, category: e.target.value})} className="w-full border border-border bg-gray-50 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary appearance-none">
                      <option value="Fashion & Apparels">Fashion & Apparels</option>
                      <option value="Tech & Accessories">Tech & Accessories</option>
                      <option value="Beauty & Cosmetics">Beauty & Cosmetics</option>
                      <option value="Home & Decor">Home & Decor</option>
                      <option value="Services">Services</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 mt-4 border-t border-border pt-4">
                  <div className="col-span-2">
                    <span className="text-xs font-black text-primary uppercase tracking-wider bg-primary/10 px-2 py-1 rounded">Internal Use Only (Not visible to users)</span>
                  </div>
                  <div>
                    <label className="block text-sm font-bold mb-1">Supplier Phone</label>
                    <input required type="text" value={newProduct.supplierPhone} onChange={e => setNewProduct({...newProduct, supplierPhone: e.target.value})} className="w-full border border-border bg-gray-50 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary" placeholder="07XX XXX XXX" />
                  </div>
                  <div>
                    <label className="block text-sm font-bold mb-1">Supplier Location</label>
                    <input required type="text" value={newProduct.supplierLocation} onChange={e => setNewProduct({...newProduct, supplierLocation: e.target.value})} className="w-full border border-border bg-gray-50 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary" placeholder="e.g. Kariakoo, Mtaa wa Congo" />
                  </div>
                </div>
                <button type="submit" className="w-full bg-primary text-white font-bold py-4 rounded-xl hover:bg-primary/90 mt-4 shadow-lg shadow-primary/20">Publish Product</button>

                 </form>
               </>
             )}

           </div>
        </div>
      )}

      {/* Store Settings Modal */}
      {isSettingsOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-gray-900/40 backdrop-blur-sm">
           <div className="bg-white w-full max-w-md rounded-[2rem] shadow-2xl p-6 border border-border relative">
             <button onClick={() => setIsSettingsOpen(false)} className="absolute top-4 right-4 p-2 bg-gray-100 hover:bg-gray-200 rounded-full">
               <X className="w-5 h-5"/>
             </button>
             <h2 className="text-2xl font-black mb-6">Store Settings</h2>
             <form onSubmit={(e) => { e.preventDefault(); toast.success("Settings saved successfully."); setIsSettingsOpen(false); }} className="space-y-4">
                <div>
                  <label className="block text-sm font-bold mb-1">Store Name</label>
                  <input required type="text" defaultValue="Kicks TZ" className="w-full border border-border bg-gray-50 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary font-medium" />
                </div>
                <div>
                  <label className="block text-sm font-bold mb-1">Payment & Delivery Policy</label>
                  <textarea required value={paymentInfo} onChange={(e) => setPaymentInfo(e.target.value)} className="w-full border border-border bg-gray-50 rounded-xl px-4 py-3 min-h-[100px] focus:outline-none focus:ring-2 focus:ring-primary font-medium" placeholder="E.g. Pay via M-Pesa 07XX... Free delivery on campus."></textarea>
                  <p className="text-xs text-muted-foreground mt-1 font-medium">This will be displayed to students during Checkout.</p>
                </div>
                <button type="submit" className="w-full bg-gray-900 text-white font-bold py-4 rounded-xl hover:bg-gray-800 mt-4 shadow-lg shadow-gray-900/20">Save Settings</button>
             </form>
           </div>
        </div>
      )}

      {/* Update Banners Modal */}
      {isBannersOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-gray-900/40 backdrop-blur-sm">
           <div className="bg-white w-full max-w-md rounded-[2rem] shadow-2xl p-6 border border-border relative">
             <button onClick={() => setIsBannersOpen(false)} className="absolute top-4 right-4 p-2 bg-gray-100 hover:bg-gray-200 rounded-full">
               <X className="w-5 h-5"/>
             </button>
             <h2 className="text-2xl font-black mb-6">Update Banners</h2>
             <div className="space-y-6">
                <div>
                  <label className="block text-sm font-bold mb-2">Store Cover Photo</label>
                  <div className="w-full h-32 bg-gray-100 rounded-xl border-2 border-dashed border-gray-300 flex flex-col items-center justify-center cursor-pointer hover:bg-gray-50 transition-colors group relative overflow-hidden">
                    <Image src="https://images.unsplash.com/photo-1542239898-08fcea4abd2e?w=800&auto=format&fit=crop" alt="Cover" fill className="object-cover opacity-50" />
                    <ImageIcon className="w-6 h-6 text-gray-900 mb-2 relative z-10" />
                    <span className="text-sm font-bold text-gray-900 relative z-10">Change Cover</span>
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-bold mb-2">Store Logo (Avatar)</label>
                  <div className="w-20 h-20 bg-gray-100 rounded-full border-2 border-dashed border-gray-300 flex flex-col items-center justify-center cursor-pointer hover:bg-gray-50 transition-colors group mx-auto">
                    <ImageIcon className="w-6 h-6 text-gray-400 group-hover:text-primary transition-colors" />
                  </div>
                </div>
                <button onClick={() => { toast.success("Banners updated."); setIsBannersOpen(false); }} className="w-full bg-primary text-white font-bold py-4 rounded-xl hover:bg-primary/90 shadow-lg shadow-primary/20">Apply Changes</button>
             </div>
           </div>
        </div>
      )}
    </div>
  );
}
