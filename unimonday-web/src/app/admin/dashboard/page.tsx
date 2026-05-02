"use client";

import { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { ShieldCheck, Users, Store, Settings, Eye, Star, TrendingUp } from "lucide-react";
import { Switch } from "@/components/ui/switch";

const MOCK_STORES = [
  {
    id: 1,
    name: "Campus Thrift",
    category: "Fashion",
    image: "https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?w=500&auto=format&fit=crop&q=60",
    rating: 4.9,
    sales: 1240,
    isVisible: true,
    isFeatured: true,
    isVerified: true,
  },
  {
    id: 2,
    name: "TechZone UDSM",
    category: "Tech",
    image: "https://images.unsplash.com/photo-1550009158-9ebf69173e03?w=500&auto=format&fit=crop&q=60",
    rating: 4.7,
    sales: 856,
    isVisible: true,
    isFeatured: false,
    isVerified: true,
  },
  {
    id: 3,
    name: "Kicks TZ",
    category: "Fashion",
    image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500&auto=format&fit=crop&q=60",
    rating: 4.5,
    sales: 430,
    isVisible: false,
    isFeatured: false,
    isVerified: false,
  }
];

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState("stores");
  const [stores, setStores] = useState(MOCK_STORES);

  const toggleStoreProp = (id: number, prop: keyof typeof MOCK_STORES[0]) => {
    setStores(stores.map(store =>
      store.id === id ? { ...store, [prop]: !store[prop] } : store
    ));
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col md:flex-row pt-16">
      {/* Sidebar */}
      <aside className="w-full md:w-64 bg-gray-900 text-white shrink-0 md:min-h-[calc(100vh-4rem)] p-4 flex flex-col gap-2">
        <div className="flex items-center gap-2 px-3 py-4 mb-4 border-b border-gray-800">
          <ShieldCheck className="w-6 h-6 text-primary" />
          <span className="font-black text-xl tracking-tight">GodMode</span>
        </div>

        <button
          onClick={() => setActiveTab("stores")}
          className={`flex items-center gap-3 p-3 rounded-xl font-bold transition-colors ${activeTab === "stores" ? "bg-primary text-white" : "text-gray-400 hover:bg-gray-800 hover:text-white"}`}
        >
          <Store className="w-5 h-5" /> Stores
        </button>
        <button
          onClick={() => setActiveTab("users")}
          className={`flex items-center gap-3 p-3 rounded-xl font-bold transition-colors ${activeTab === "users" ? "bg-primary text-white" : "text-gray-400 hover:bg-gray-800 hover:text-white"}`}
        >
          <Users className="w-5 h-5" /> Users
        </button>
        <button
          onClick={() => setActiveTab("settings")}
          className={`flex items-center gap-3 p-3 rounded-xl font-bold transition-colors ${activeTab === "settings" ? "bg-primary text-white" : "text-gray-400 hover:bg-gray-800 hover:text-white"}`}
        >
          <Settings className="w-5 h-5" /> Settings
        </button>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-4 sm:p-8 overflow-y-auto">
        {activeTab === "stores" && (
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-8">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h1 className="text-3xl font-black text-gray-900">Store Management</h1>
                <p className="text-muted-foreground mt-1">Control visibility, verify vendors, and manage featured placements.</p>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-6">
              {stores.map((store) => (
                <div key={store.id} className="bg-white rounded-3xl border border-border shadow-sm p-4 sm:p-6 flex flex-col lg:flex-row gap-6 items-start lg:items-center">

                  {/* Store Info */}
                  <div className="flex items-center gap-4 flex-1">
                    <div className="w-20 h-20 rounded-full overflow-hidden relative shrink-0 border border-gray-100">
                      <Image src={store.image} alt={store.name} fill className="object-cover" />
                    </div>
                    <div>
                      <h3 className="font-bold text-xl flex items-center gap-2">
                        {store.name}
                        {store.isVerified && <ShieldCheck className="w-5 h-5 text-blue-500" />}
                      </h3>
                      <p className="text-sm text-muted-foreground font-medium">{store.category}</p>
                      <div className="flex items-center gap-3 mt-2 text-sm font-semibold">
                        <span className="flex items-center gap-1 text-amber-500"><Star className="w-4 h-4 fill-current" /> {store.rating}</span>
                        <span className="text-gray-300">|</span>
                        <span className="flex items-center gap-1 text-gray-600"><TrendingUp className="w-4 h-4" /> {store.sales} sales</span>
                      </div>
                    </div>
                  </div>

                  {/* Controls */}
                  <div className="w-full lg:w-auto bg-gray-50 rounded-2xl p-4 flex flex-col sm:flex-row gap-6 shrink-0 border border-gray-100">
                    <div className="flex items-center justify-between gap-3">
                      <label className="text-sm font-bold flex items-center gap-2 text-gray-700">
                        <Eye className="w-4 h-4" /> Visible
                      </label>
                      <Switch checked={store.isVisible} onCheckedChange={() => toggleStoreProp(store.id, 'isVisible')} />
                    </div>

                    <div className="flex items-center justify-between gap-3">
                      <label className="text-sm font-bold flex items-center gap-2 text-gray-700">
                        <Star className="w-4 h-4" /> Featured
                      </label>
                      <Switch checked={store.isFeatured} onCheckedChange={() => toggleStoreProp(store.id, 'isFeatured')} />
                    </div>

                    <div className="flex items-center justify-between gap-3">
                      <label className="text-sm font-bold flex items-center gap-2 text-gray-700">
                        <ShieldCheck className="w-4 h-4" /> Verified
                      </label>
                      <Switch checked={store.isVerified} onCheckedChange={() => toggleStoreProp(store.id, 'isVerified')} />
                    </div>
                  </div>

                </div>
              ))}
            </div>
          </motion.div>
        )}

        {activeTab !== "stores" && (
           <div className="flex flex-col items-center justify-center h-full text-center p-8 opacity-50">
             <Settings className="w-16 h-16 mb-4" />
             <h2 className="text-2xl font-bold">Coming Soon</h2>
             <p>This section is under construction.</p>
           </div>
        )}
      </main>
    </div>
  );
}
