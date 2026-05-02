"use client";

import Image from "next/image";
import { ShieldAlert, Users, Store, Activity, Eye, Edit3, Trash2, Power, Zap, Star } from "lucide-react";

export default function AdminDashboard() {
  return (
    <div className="max-w-7xl mx-auto py-8 px-4 font-sans">
      <div className="bg-red-500 text-white p-4 rounded-2xl mb-8 flex items-center justify-between shadow-lg shadow-red-500/20">
        <div className="flex items-center gap-3">
          <ShieldAlert className="w-6 h-6 animate-pulse" />
          <h1 className="text-xl font-black tracking-widest uppercase">Godmode Active</h1>
        </div>
        <button className="flex items-center gap-2 bg-white/20 hover:bg-white/30 px-4 py-2 rounded-xl text-sm font-bold transition-colors">
          <Power className="w-4 h-4" /> Exit
        </button>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        <div className="bg-white p-6 rounded-[2rem] border border-border shadow-sm">
          <div className="text-muted-foreground text-sm font-bold mb-1 flex items-center gap-2"><Store className="w-4 h-4" /> Total Stores</div>
          <div className="text-3xl font-black text-gray-900">142</div>
        </div>
        <div className="bg-white p-6 rounded-[2rem] border border-border shadow-sm">
          <div className="text-muted-foreground text-sm font-bold mb-1 flex items-center gap-2"><Users className="w-4 h-4" /> Users</div>
          <div className="text-3xl font-black text-gray-900">8.4k</div>
        </div>
        <div className="bg-white p-6 rounded-[2rem] border border-border shadow-sm">
          <div className="text-muted-foreground text-sm font-bold mb-1 flex items-center gap-2"><Activity className="w-4 h-4" /> Transactions</div>
          <div className="text-3xl font-black text-gray-900">1,204</div>
        </div>
        <div className="bg-white p-6 rounded-[2rem] border border-border shadow-sm">
          <div className="text-muted-foreground text-sm font-bold mb-1 flex items-center gap-2"><Zap className="w-4 h-4" /> System Health</div>
          <div className="text-3xl font-black text-primary">100%</div>
        </div>
      </div>

      <div className="bg-white rounded-[2rem] border border-border shadow-sm overflow-hidden">
        <div className="p-6 border-b border-border flex items-center justify-between bg-gray-50/50">
          <h2 className="text-xl font-black">Store Management</h2>
          <input type="text" placeholder="Search stores..." className="bg-white border border-border px-4 py-2 rounded-xl text-sm outline-none focus:border-primary" />
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-border bg-gray-50/50">
                <th className="p-4 font-bold text-gray-600 text-sm">Store</th>
                <th className="p-4 font-bold text-gray-600 text-sm">Owner</th>
                <th className="p-4 font-bold text-gray-600 text-sm">Status</th>
                <th className="p-4 font-bold text-gray-600 text-sm">Visibility (God Control)</th>
                <th className="p-4 font-bold text-gray-600 text-sm text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {/* Store Row 1 */}
              <tr className="border-b border-border hover:bg-gray-50 transition-colors group">
                <td className="p-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-gray-100 overflow-hidden relative border border-border">
                       <Image src="https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3" alt="Store" fill className="object-cover" />
                    </div>
                    <div>
                      <div className="font-bold text-gray-900">Campus Thrift</div>
                      <div className="text-xs text-muted-foreground">ID: ST-001</div>
                    </div>
                  </div>
                </td>
                <td className="p-4 text-sm font-medium">Juma Kassim</td>
                <td className="p-4">
                  <span className="px-2 py-1 bg-green-50 text-green-600 rounded-md text-xs font-bold border border-green-200">Active</span>
                </td>
                <td className="p-4">
                  <div className="flex items-center gap-2">
                    <span className="px-2 py-1 bg-amber-50 text-amber-600 rounded-md text-xs font-bold border border-amber-200 flex items-center gap-1"><Star className="w-3 h-3 fill-current" /> Featured</span>
                    <button className="text-xs text-blue-500 hover:underline font-bold">Boost</button>
                  </div>
                </td>
                <td className="p-4 text-right">
                  <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button className="p-2 hover:bg-gray-200 rounded-lg text-gray-600" title="Inspect Store"><Eye className="w-4 h-4" /></button>
                    <button className="p-2 hover:bg-blue-100 rounded-lg text-blue-600" title="Edit Data"><Edit3 className="w-4 h-4" /></button>
                    <button className="p-2 hover:bg-red-100 rounded-lg text-red-600" title="Ban Store"><Trash2 className="w-4 h-4" /></button>
                  </div>
                </td>
              </tr>

              {/* Store Row 2 */}
              <tr className="border-b border-border hover:bg-gray-50 transition-colors group">
                <td className="p-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-gray-100 overflow-hidden relative border border-border">
                       <Image src="https://images.unsplash.com/photo-1550009158-9ebf69173e03?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3" alt="Store" fill className="object-cover" />
                    </div>
                    <div>
                      <div className="font-bold text-gray-900">TechZone UDSM</div>
                      <div className="text-xs text-muted-foreground">ID: ST-042</div>
                    </div>
                  </div>
                </td>
                <td className="p-4 text-sm font-medium">Aisha M.</td>
                <td className="p-4">
                  <span className="px-2 py-1 bg-green-50 text-green-600 rounded-md text-xs font-bold border border-green-200">Active</span>
                </td>
                <td className="p-4">
                  <div className="flex items-center gap-2">
                    <span className="px-2 py-1 bg-gray-100 text-gray-600 rounded-md text-xs font-bold border border-gray-200">Standard</span>
                    <button className="text-xs text-primary hover:underline font-bold">Make Featured</button>
                  </div>
                </td>
                <td className="p-4 text-right">
                  <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button className="p-2 hover:bg-gray-200 rounded-lg text-gray-600"><Eye className="w-4 h-4" /></button>
                    <button className="p-2 hover:bg-blue-100 rounded-lg text-blue-600"><Edit3 className="w-4 h-4" /></button>
                    <button className="p-2 hover:bg-red-100 rounded-lg text-red-600"><Trash2 className="w-4 h-4" /></button>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
