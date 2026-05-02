
"use client";


import { ShieldAlert, Users, Store, Activity,Power, Zap,CheckCircle, XCircle } from "lucide-react";
import { toast } from "sonner";
import { useState } from "react";

export default function AdminDashboard() {
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
        <div className="bg-gray-900 text-white p-4 rounded-2xl mb-8 flex items-center justify-between shadow-lg shadow-gray-900/20">
          <div className="flex items-center gap-3">
            <ShieldAlert className="w-6 h-6 text-emerald-400" />
            <h1 className="text-xl font-black tracking-widest uppercase">Staff Dashboard</h1>
          </div>
          <button className="flex items-center gap-2 bg-white/10 hover:bg-white/20 px-4 py-2 rounded-xl text-sm font-bold transition-colors">
            <Power className="w-4 h-4" /> Exit
          </button>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
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
            <div className="text-gray-500 text-sm font-bold mb-1 flex items-center gap-2"><Zap className="w-4 h-4" /> Revenue</div>
            <div className="text-3xl font-black text-gray-900">Tsh 4.2m</div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Store Management Panel */}
          <div className="lg:col-span-2 bg-white p-6 rounded-[2rem] border border-gray-200 shadow-sm">
             <h2 className="text-xl font-black mb-6">Store Verifications</h2>
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

          {/* Disputes / Alerts Panel */}
          <div className="bg-white p-6 rounded-[2rem] border border-gray-200 shadow-sm">
             <h2 className="text-xl font-black mb-6">Active Disputes</h2>
             <div className="space-y-4">
               <div className="p-4 bg-red-50 border border-red-100 rounded-xl">
                 <div className="flex justify-between items-start mb-2">
                   <h3 className="font-bold text-red-700">Order #ORD-9820</h3>
                   <span className="text-xs font-bold text-red-600 bg-red-100 px-2 py-1 rounded">High Priority</span>
                 </div>
                 <p className="text-sm text-red-800 mb-3">Customer claims item was not delivered.</p>
                 <button className="w-full bg-red-600 text-white font-bold py-2 rounded-lg hover:bg-red-700 text-sm">Review Dispute</button>
               </div>

               <div className="p-4 bg-gray-50 border border-gray-100 rounded-xl">
                 <div className="flex justify-between items-start mb-2">
                   <h3 className="font-bold text-gray-700">Reported Review</h3>
                 </div>
                 <p className="text-sm text-gray-600 mb-3">Inappropriate language used in store review.</p>
                 <button className="w-full bg-gray-900 text-white font-bold py-2 rounded-lg hover:bg-gray-800 text-sm">Review Report</button>
               </div>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
}
