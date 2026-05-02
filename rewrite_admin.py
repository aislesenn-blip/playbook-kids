with open('unimonday-web/src/app/admin/dashboard/page.tsx', 'w') as f:
    f.write("""
"use client";

import { ShieldAlert, Users, Store, Activity, Power, Zap, CheckCircle, XCircle, Search, SlidersHorizontal, Settings2, Eye, LayoutDashboard, Database, MessageSquare } from "lucide-react";
import { toast } from "sonner";
import { useState } from "react";
import Image from "next/image";

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState<'overview' | 'algorithm' | 'godseye'>('algorithm');

  const [stores, setStores] = useState([
    { id: 1, name: "TechZone UDSM", owner: "John D.", status: "Verified" },
    { id: 2, name: "SneakerHeadz", owner: "Ali K.", status: "Pending Verification" },
    { id: 3, name: "Campus Eats", owner: "Sarah M.", status: "Verified" }
  ]);

  const verifyStore = (id: number) => {
    setStores(stores.map(s => s.id === id ? { ...s, status: "Verified" } : s));
    toast.success("Store verified successfully.");
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto py-8 px-4 font-sans">
        {/* Header */}
        <div className="bg-gray-900 text-white p-4 rounded-2xl mb-8 flex flex-col md:flex-row items-center justify-between shadow-lg shadow-gray-900/20 gap-4">
          <div className="flex items-center gap-3">
            <ShieldAlert className="w-8 h-8 text-emerald-400" />
            <div>
              <h1 className="text-xl font-black tracking-widest uppercase">Staff Control Room</h1>
              <p className="text-xs text-gray-400 font-medium">Manual Algorithm & System Override</p>
            </div>
          </div>
          <div className="flex gap-2 bg-gray-800 p-1 rounded-xl">
             <button onClick={() => setActiveTab('overview')} className={`px-4 py-2 rounded-lg text-sm font-bold flex items-center gap-2 transition-colors ${activeTab === 'overview' ? 'bg-white text-gray-900' : 'text-gray-300 hover:text-white'}`}>
                <LayoutDashboard className="w-4 h-4"/> Overview
             </button>
             <button onClick={() => setActiveTab('algorithm')} className={`px-4 py-2 rounded-lg text-sm font-bold flex items-center gap-2 transition-colors ${activeTab === 'algorithm' ? 'bg-emerald-400 text-gray-900' : 'text-gray-300 hover:text-emerald-400'}`}>
                <Settings2 className="w-4 h-4"/> Algorithm Engine
             </button>
             <button onClick={() => setActiveTab('godseye')} className={`px-4 py-2 rounded-lg text-sm font-bold flex items-center gap-2 transition-colors ${activeTab === 'godseye' ? 'bg-red-500 text-white' : 'text-gray-300 hover:text-red-400'}`}>
                <Eye className="w-4 h-4"/> God's Eye
             </button>
          </div>
        </div>

        {/* Dynamic Content */}
        {activeTab === 'overview' && (
           <div className="space-y-8 animate-in fade-in zoom-in-95 duration-200">
              {/* Stats */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="bg-white p-6 rounded-[2rem] border border-gray-200 shadow-sm">
                  <div className="text-gray-500 text-sm font-bold mb-1 flex items-center gap-2"><Store className="w-4 h-4" /> Total Stores</div>
                  <div className="text-3xl font-black text-gray-900">142</div>
                </div>
                <div className="bg-white p-6 rounded-[2rem] border border-gray-200 shadow-sm">
                  <div className="text-gray-500 text-sm font-bold mb-1 flex items-center gap-2"><Users className="w-4 h-4" /> Users</div>
                  <div className="text-3xl font-black text-gray-900">8.4k</div>
                </div>
                <div className="bg-white p-6 rounded-[2rem] border border-gray-200 shadow-sm">
                  <div className="text-gray-500 text-sm font-bold mb-1 flex items-center gap-2"><Activity className="w-4 h-4" /> Transactions</div>
                  <div className="text-3xl font-black text-gray-900">1,204</div>
                </div>
                <div className="bg-white p-6 rounded-[2rem] border border-gray-200 shadow-sm">
                  <div className="text-gray-500 text-sm font-bold mb-1 flex items-center gap-2"><Zap className="w-4 h-4" /> GMV</div>
                  <div className="text-3xl font-black text-gray-900">Tsh 4.2m</div>
                </div>
              </div>

              {/* Stores Table */}
              <div className="bg-white p-6 rounded-[2rem] border border-gray-200 shadow-sm">
                 <h2 className="text-xl font-black mb-6">Store Verifications & Management</h2>
                 <div className="overflow-x-auto">
                   <table className="w-full text-left">
                      <thead>
                        <tr className="text-gray-500 text-sm border-b border-gray-200">
                          <th className="pb-3 font-bold">Store Name</th>
                          <th className="pb-3 font-bold">Owner</th>
                          <th className="pb-3 font-bold">Status</th>
                          <th className="pb-3 font-bold text-right">Action</th>
                        </tr>
                      </thead>
                      <tbody className="text-sm font-medium">
                        {stores.map(store => (
                          <tr key={store.id} className="border-b border-gray-100 last:border-0">
                            <td className="py-4">{store.name}</td>
                            <td className="py-4">{store.owner}</td>
                            <td className="py-4">
                               <span className={`px-2 py-1 rounded text-xs font-bold ${store.status === 'Verified' ? 'bg-emerald-100 text-emerald-700' : 'bg-amber-100 text-amber-700'}`}>
                                 {store.status}
                               </span>
                            </td>
                            <td className="py-4 text-right">
                               {store.status === 'Pending Verification' ? (
                                 <button onClick={() => verifyStore(store.id)} className="text-emerald-600 hover:text-emerald-700 font-bold flex items-center justify-end gap-1 w-full">
                                   Approve <CheckCircle className="w-4 h-4"/>
                                 </button>
                               ) : (
                                 <button className="text-gray-400 hover:text-red-500 font-bold flex items-center justify-end gap-1 w-full">
                                   Revoke <XCircle className="w-4 h-4"/>
                                 </button>
                               )}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                   </table>
                 </div>
              </div>
           </div>
        )}

        {/* Placeholders for Step 2 and 3 */}
        {activeTab === 'algorithm' && (
           <div className="bg-white p-8 rounded-[2rem] border border-gray-200 shadow-sm text-center">
             <h2 className="text-2xl font-black">Algorithm Engine Loading...</h2>
           </div>
        )}

        {activeTab === 'godseye' && (
           <div className="bg-white p-8 rounded-[2rem] border border-gray-200 shadow-sm text-center">
             <h2 className="text-2xl font-black text-red-600">Gods Eye Loading...</h2>
           </div>
        )}

      </div>
    </div>
  );
}
""")
