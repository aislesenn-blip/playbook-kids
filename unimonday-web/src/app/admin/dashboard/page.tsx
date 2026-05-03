"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { ShieldAlert, Users, Store, PackageSearch, Tag, LogOut, CheckCircle2, XCircle } from "lucide-react";
import { useAppStore } from "@/lib/store/app-store";
import { useRouter } from "next/navigation";

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState("applications");
  const { setUser } = useAppStore();
  const router = useRouter();

  const handleLogout = () => {
    setUser(null);
    router.push("/");
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-24 pt-8">
      <div className="max-w-7xl mx-auto px-4">

        {/* Header */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-border shadow-sm mb-8 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 bg-red-100 text-red-600 rounded-2xl flex items-center justify-center">
              <ShieldAlert className="w-8 h-8" />
            </div>
            <div>
              <h1 className="text-2xl sm:text-3xl font-black text-gray-900">Staff Control Room</h1>
              <p className="text-muted-foreground font-medium">Manage stores, products, and applications.</p>
            </div>
          </div>
          <button onClick={handleLogout} className="flex items-center gap-2 bg-gray-100 hover:bg-gray-200 text-gray-900 px-4 py-2 rounded-xl font-bold transition-colors">
            <LogOut className="w-4 h-4" /> Exit
          </button>
        </div>

        {/* Tab Navigation */}
        <div className="flex overflow-x-auto gap-2 mb-8 pb-2 hide-scrollbar">
          {[
            { id: "applications", label: "Partner Applications", icon: Users },
            { id: "stores", label: "Manage Stores", icon: Store },
            { id: "products", label: "Manage Products", icon: PackageSearch },
            { id: "promos", label: "Promo Codes", icon: Tag },
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-6 py-3 rounded-2xl font-bold whitespace-nowrap transition-colors ${activeTab === tab.id ? 'bg-gray-900 text-white' : 'bg-white text-gray-600 hover:bg-gray-100 border border-border'}`}
            >
              <tab.icon className="w-4 h-4" /> {tab.label}
            </button>
          ))}
        </div>

        {/* Content Area */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-border shadow-sm min-h-[400px]">

          {activeTab === "applications" && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
              <h2 className="text-xl font-bold mb-6">Pending Partner Applications</h2>
              <div className="space-y-4">
                {/* Mock Application Card */}
                <div className="border border-border rounded-2xl p-5 flex flex-col md:flex-row justify-between items-start md:items-center gap-4 hover:border-primary transition-colors">
                  <div>
                    <h3 className="font-bold text-lg">Kicks TZ (Sneakers)</h3>
                    <p className="text-sm text-muted-foreground">Owner: John Doe • 0712 345 678 • Dar es Salaam</p>
                  </div>
                  <div className="flex gap-2 w-full md:w-auto">
                    <button className="flex-1 md:flex-none flex items-center justify-center gap-2 px-4 py-2 bg-green-100 text-green-700 hover:bg-green-200 rounded-xl font-bold text-sm transition-colors">
                      <CheckCircle2 className="w-4 h-4" /> Approve & Create Store
                    </button>
                    <button className="flex-1 md:flex-none flex items-center justify-center gap-2 px-4 py-2 bg-red-100 text-red-700 hover:bg-red-200 rounded-xl font-bold text-sm transition-colors">
                      <XCircle className="w-4 h-4" /> Reject
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {activeTab === "stores" && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold">Managed Stores</h2>
                <button className="bg-primary text-white px-4 py-2 rounded-xl font-bold text-sm">+ Add Store Manually</button>
              </div>
              <p className="text-muted-foreground mb-4">You manage these storefronts. Vendors only share links.</p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                 <div className="border border-border rounded-2xl p-5">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="font-bold">TechZone UDSM</h3>
                      <span className="bg-primary/10 text-primary text-xs font-bold px-2 py-1 rounded-lg">Featured</span>
                    </div>
                    <p className="text-xs text-muted-foreground mb-3">Link: unimonday.com/store/techzone</p>
                    <button className="text-sm font-bold text-gray-900 border border-gray-300 rounded-lg px-3 py-1.5 hover:bg-gray-50">Manage Store</button>
                 </div>
              </div>
            </motion.div>
          )}

          {activeTab === "products" && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold">Master Inventory</h2>
                <button className="bg-primary text-white px-4 py-2 rounded-xl font-bold text-sm">+ Upload Product</button>
              </div>
              <p className="text-muted-foreground">Add products and assign them to specific managed stores.</p>
            </motion.div>
          )}

          {activeTab === "promos" && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold">Vendor Promo Codes</h2>
                <button className="bg-primary text-white px-4 py-2 rounded-xl font-bold text-sm">+ Generate Code</button>
              </div>
              <p className="text-muted-foreground">Create codes for partners so they can earn when they refer sales.</p>
            </motion.div>
          )}

        </div>
      </div>
    </div>
  );
}
