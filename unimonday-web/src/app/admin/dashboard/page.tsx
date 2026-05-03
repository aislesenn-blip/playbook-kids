
"use client";

import { ShieldAlert, Users, Store, Activity, Power, Zap, CheckCircle, XCircle, Search, SlidersHorizontal, Settings2, Eye, LayoutDashboard, Database, MessageSquare, Star, Award, MessageCircle } from "lucide-react";
import { toast } from "sonner";
import { useState } from "react";
import Image from "next/image";

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState<'overview' | 'algorithm' | 'godseye' | 'reputation'>('algorithm');

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

          <div className="flex flex-wrap gap-2 bg-gray-800 p-1 rounded-xl">
             <button onClick={() => setActiveTab('overview')} className={`px-3 sm:px-4 py-2 rounded-lg text-sm font-bold flex items-center gap-2 transition-colors ${activeTab === 'overview' ? 'bg-white text-gray-900' : 'text-gray-300 hover:text-white'}`}>
                <LayoutDashboard className="w-4 h-4"/> <span className="hidden sm:inline">Overview</span>
             </button>
             <button onClick={() => setActiveTab('algorithm')} className={`px-3 sm:px-4 py-2 rounded-lg text-sm font-bold flex items-center gap-2 transition-colors ${activeTab === 'algorithm' ? 'bg-emerald-400 text-gray-900' : 'text-gray-300 hover:text-emerald-400'}`}>
                <Settings2 className="w-4 h-4"/> <span className="hidden sm:inline">Algorithm</span>
             </button>
             <button onClick={() => setActiveTab('reputation')} className={`px-3 sm:px-4 py-2 rounded-lg text-sm font-bold flex items-center gap-2 transition-colors ${activeTab === 'reputation' ? 'bg-blue-500 text-white' : 'text-gray-300 hover:text-blue-400'}`}>
                <Star className="w-4 h-4"/> <span className="hidden sm:inline">Reputation</span>
             </button>
             <button onClick={() => setActiveTab('godseye')} className={`px-3 sm:px-4 py-2 rounded-lg text-sm font-bold flex items-center gap-2 transition-colors ${activeTab === 'godseye' ? 'bg-red-500 text-white' : 'text-gray-300 hover:text-red-400'}`}>
                <Eye className="w-4 h-4"/> <span className="hidden sm:inline">Gods Eye</span>
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
                   <table className="w-full text-left min-w-max">
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


        {activeTab === 'algorithm' && (
           <div className="space-y-6 animate-in fade-in zoom-in-95 duration-200">
             <div className="flex justify-between items-end">
               <div>
                 <h2 className="text-2xl font-black">Algorithm Engine</h2>
                 <p className="text-muted-foreground font-medium">Manually dictate product visibility and placement across the marketplace.</p>
               </div>
               <button className="bg-emerald-500 text-white font-bold py-2 px-6 rounded-xl hover:bg-emerald-600 transition-colors shadow-lg shadow-emerald-500/20">
                 Sync Algorithm Changes
               </button>
             </div>

             <div className="bg-white rounded-[2rem] border border-gray-200 shadow-sm overflow-hidden">
                <div className="p-4 border-b border-gray-100 bg-gray-50 flex gap-4">
                  <div className="relative flex-1">
                    <Search className="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                    <input type="text" placeholder="Search products or vendors..." className="w-full pl-10 pr-4 py-2 rounded-xl border border-gray-200 focus:ring-2 focus:ring-emerald-500 outline-none font-medium" />
                  </div>
                  <select className="py-2 px-4 rounded-xl border border-gray-200 focus:ring-2 focus:ring-emerald-500 outline-none font-bold bg-white">
                    <option>All Placements</option>
                    <option>Hero Banner</option>
                    <option>Featured</option>
                    <option>Trending</option>
                  </select>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full text-left min-w-max">
                    <thead>
                      <tr className="text-gray-500 text-sm border-b border-gray-200">
                        <th className="p-4 font-bold">Product</th>
                        <th className="p-4 font-bold">Vendor</th>
                        <th className="p-4 font-bold">Placement</th>
                        <th className="p-4 font-bold">Priority (1-10)</th>
                        <th className="p-4 font-bold text-center">Status</th>
                      </tr>
                    </thead>
                    <tbody className="text-sm font-medium">
                      {[
                        { id: 'p1', name: 'Air Jordan 1 Retro', vendor: 'SneakerHeadz', placement: 'Hero Banner', priority: 10, img: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&q=80&w=200' },
                        { id: 'p2', name: 'MacBook Pro M2', vendor: 'TechZone UDSM', placement: 'Featured', priority: 8, img: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&q=80&w=200' },
                        { id: 'p3', name: 'Vintage Denim Jacket', vendor: 'Campus Thrift', placement: 'None', priority: 1, img: 'https://images.unsplash.com/photo-1551028719-00167b16eac5?auto=format&fit=crop&q=80&w=200' },
                        { id: 'p4', name: 'LED Room Lights', vendor: 'Decor Hub', placement: 'Trending', priority: 5, img: 'https://images.unsplash.com/photo-1550989460-0adf9ea622e2?auto=format&fit=crop&q=80&w=200' },
                      ].map((prod) => (
                        <tr key={prod.id} className="border-b border-gray-100 last:border-0 hover:bg-gray-50 transition-colors">
                          <td className="p-4">
                            <div className="flex items-center gap-3">
                              <div className="w-12 h-12 rounded-lg overflow-hidden bg-gray-100 relative">
                                <Image src={prod.img} alt={prod.name} fill className="object-cover" />
                              </div>
                              <span className="font-bold">{prod.name}</span>
                            </div>
                          </td>
                          <td className="p-4 text-gray-600">{prod.vendor}</td>
                          <td className="p-4">
                            <select defaultValue={prod.placement} className="w-full p-2 border border-gray-200 rounded-lg font-bold text-sm bg-white focus:ring-2 focus:ring-emerald-500 outline-none">
                              <option value="Hero Banner">🔥 Hero Banner</option>
                              <option value="Featured">⭐ Featured</option>
                              <option value="Trending">📈 Trending</option>
                              <option value="None">None (Organic)</option>
                            </select>
                          </td>
                          <td className="p-4">
                             <div className="flex items-center gap-2">
                               <input type="range" min="1" max="10" defaultValue={prod.priority} className="w-24 accent-emerald-500" />
                               <span className="w-6 text-center font-bold bg-gray-100 rounded text-xs py-1">{prod.priority}</span>
                             </div>
                          </td>
                          <td className="p-4 text-center">
                             <button className="text-red-500 hover:bg-red-50 p-2 rounded-lg font-bold text-xs transition-colors">
                               Hide Product
                             </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <div className="p-4 bg-amber-50 text-amber-800 text-xs font-bold border-t border-amber-100 flex items-center gap-2">
                  <Database className="w-4 h-4" /> Products assigned to &apos;Featured&apos; will automatically shuffle within their block to keep the UI fresh.
                </div>
             </div>
           </div>
        )}


        {activeTab === 'reputation' && (
           <div className="space-y-6 animate-in fade-in zoom-in-95 duration-200">
             <div>
               <h2 className="text-2xl font-black text-blue-600 flex items-center gap-2">
                  <Star className="w-6 h-6" /> Reputation Engine
               </h2>
               <p className="text-muted-foreground font-medium">Control brand perception. Moderate reviews and assign badges to top vendors.</p>
             </div>

             <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Review Moderation */}
                <div className="bg-white rounded-[2rem] border border-gray-200 shadow-sm overflow-hidden flex flex-col">
                   <div className="p-4 border-b border-gray-100 bg-gray-50 flex items-center justify-between">
                     <h3 className="font-black flex items-center gap-2"><MessageCircle className="w-5 h-5"/> Pending Reviews</h3>
                   </div>
                   <div className="p-4 space-y-4">
                      <div className="border border-gray-100 rounded-xl p-4 bg-gray-50/50">
                         <div className="flex justify-between items-start mb-2">
                            <div>
                               <p className="font-bold text-sm">Review for: Pro Wireless Earbuds</p>
                               <div className="flex text-amber-400 mt-1">
                                 <Star className="w-3 h-3 fill-current"/><Star className="w-3 h-3 fill-current"/><Star className="w-3 h-3 fill-current"/><Star className="w-3 h-3 fill-current"/><Star className="w-3 h-3 fill-current"/>
                               </div>
                            </div>
                            <span className="text-xs font-bold text-gray-500">By Student_12</span>
                         </div>
                         <p className="text-sm font-medium text-gray-700 italic">&quot;Amazing product and fast delivery!&quot;</p>
                         <div className="mt-4 flex gap-2">
                            <button className="flex-1 bg-emerald-100 text-emerald-700 hover:bg-emerald-200 text-xs font-bold py-2 rounded-lg transition-colors">Approve & Pin</button>
                            <button className="flex-1 bg-red-100 text-red-700 hover:bg-red-200 text-xs font-bold py-2 rounded-lg transition-colors">Hide / Delete</button>
                         </div>
                      </div>

                      <div className="border border-gray-100 rounded-xl p-4 bg-gray-50/50">
                         <div className="flex justify-between items-start mb-2">
                            <div>
                               <p className="font-bold text-sm">Review for: Vintage Jacket</p>
                               <div className="flex text-amber-400 mt-1">
                                 <Star className="w-3 h-3 fill-current"/><Star className="w-3 h-3 text-gray-300"/><Star className="w-3 h-3 text-gray-300"/><Star className="w-3 h-3 text-gray-300"/><Star className="w-3 h-3 text-gray-300"/>
                               </div>
                            </div>
                            <span className="text-xs font-bold text-gray-500">By Jane_Doe</span>
                         </div>
                         <p className="text-sm font-medium text-gray-700 italic">&quot;Terrible quality, total scam.&quot;</p>
                         <div className="mt-4 flex gap-2">
                            <button className="flex-1 bg-gray-100 text-gray-700 hover:bg-gray-200 text-xs font-bold py-2 rounded-lg transition-colors">Keep Visible</button>
                            <button className="flex-1 bg-red-100 text-red-700 hover:bg-red-200 text-xs font-bold py-2 rounded-lg transition-colors">Hide (Flagged)</button>
                         </div>
                      </div>
                   </div>
                </div>

                {/* Vendor Profile Boosts */}
                <div className="bg-white rounded-[2rem] border border-gray-200 shadow-sm overflow-hidden flex flex-col">
                   <div className="p-4 border-b border-gray-100 bg-gray-50 flex items-center justify-between">
                     <h3 className="font-black flex items-center gap-2"><Award className="w-5 h-5"/> Profile Boosts</h3>
                   </div>
                   <div className="p-4 space-y-4">
                      <div className="flex items-center justify-between p-4 border border-emerald-100 bg-emerald-50/30 rounded-xl">
                         <div>
                            <p className="font-black">TechZone UDSM</p>
                            <p className="text-xs text-gray-500 font-medium">98% positive ratings</p>
                         </div>
                         <div className="flex items-center gap-2">
                            <span className="bg-emerald-100 text-emerald-700 text-xs font-bold px-2 py-1 rounded flex items-center gap-1"><CheckCircle className="w-3 h-3"/> Top Seller</span>
                            <button className="text-xs font-bold text-red-500 hover:underline">Revoke</button>
                         </div>
                      </div>

                      <div className="flex items-center justify-between p-4 border border-gray-100 rounded-xl flex-wrap gap-4">
                         <div>
                            <p className="font-black">SneakerHeadz</p>
                            <p className="text-xs text-gray-500 font-medium mb-2">85% positive ratings</p>
                            <div className="flex gap-2">
                               <input type="text" placeholder="Fake Reviews (e.g. 150)" className="text-xs border border-gray-200 rounded px-2 py-1 outline-none w-32" />
                               <input type="text" placeholder="Fake Rating (e.g. 4.9)" className="text-xs border border-gray-200 rounded px-2 py-1 outline-none w-32" />
                               <button onClick={() => toast.success("Store metrics spoofed/boosted successfully.")} className="text-xs bg-gray-900 text-white px-3 py-1 rounded hover:bg-gray-800">
                                  Boost Store
                               </button>
                            </div>
                         </div>
                         <button onClick={() => toast.success("Badge Assigned")} className="bg-blue-100 text-blue-700 hover:bg-blue-200 text-xs font-bold px-4 py-2 rounded-lg transition-colors flex items-center gap-1 h-fit">
                            <Award className="w-3 h-3"/> Assign Badge
                         </button>
                      </div>
                   </div>
                </div>
             </div>
           </div>
        )}

        {activeTab === 'godseye' && (
           <div className="space-y-6 animate-in fade-in zoom-in-95 duration-200">
             <div>
               <h2 className="text-2xl font-black text-red-600 flex items-center gap-2">
                  <Eye className="w-6 h-6" /> Gods Eye: Chat Moderation
               </h2>
               <p className="text-muted-foreground font-medium">Monitor communications between students and vendors for quality control and security.</p>
             </div>

             <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-[600px]">
                {/* Chat List */}
                <div className="bg-white rounded-[2rem] border border-gray-200 shadow-sm overflow-hidden flex flex-col">
                   <div className="p-4 border-b border-gray-100 bg-gray-50">
                     <h3 className="font-black">Active Threads</h3>
                   </div>
                   <div className="flex-1 overflow-y-auto p-2 space-y-1">
                      {[
                        { id: 1, student: 'Mary J.', vendor: 'TechZone', lastMessage: 'Kaka ile simu imefika, asante sana!', time: '10:42 AM', alert: false },
                        { id: 2, student: 'Peter', vendor: 'SneakerHeadz', lastMessage: 'Nitakutumia kwa namba hii ya TigoPesa...', time: '09:15 AM', alert: true },
                        { id: 3, student: 'Aisha', vendor: 'Campus Eats', lastMessage: 'Chakula kimechelewa sana leo.', time: 'Yesterday', alert: false },
                      ].map((chat) => (
                        <div key={chat.id} className="p-3 rounded-xl hover:bg-gray-50 cursor-pointer flex gap-3 border border-transparent hover:border-gray-100 transition-colors">
                           <div className="w-10 h-10 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center font-black flex-shrink-0">
                             {chat.student[0]}
                           </div>
                           <div className="flex-1 min-w-0">
                              <div className="flex justify-between items-center mb-1">
                                <span className="font-bold text-sm truncate">{chat.student} <span className="text-gray-400 font-medium text-xs">vs</span> {chat.vendor}</span>
                                <span className="text-xs text-gray-400 font-medium">{chat.time}</span>
                              </div>
                              <div className="flex items-center gap-2">
                                {chat.alert && <ShieldAlert className="w-3 h-3 text-red-500 flex-shrink-0" />}
                                <p className={`text-xs truncate ${chat.alert ? 'text-red-600 font-bold' : 'text-gray-500'}`}>{chat.lastMessage}</p>
                              </div>
                           </div>
                        </div>
                      ))}
                   </div>
                </div>

                {/* Chat Log Viewer */}
                <div className="lg:col-span-2 bg-white rounded-[2rem] border border-gray-200 shadow-sm flex flex-col relative overflow-hidden">
                   {/* Overlay Watermark */}
                   <div className="absolute inset-0 pointer-events-none flex items-center justify-center opacity-[0.03]">
                      <Eye className="w-64 h-64" />
                   </div>

                   <div className="p-4 border-b border-gray-100 flex flex-col sm:flex-row justify-between items-start sm:items-center bg-gray-50 z-10 gap-4">
                      <div>
                        <h3 className="font-black text-lg">Peter <span className="text-gray-400 text-sm font-medium">interacting with</span> SneakerHeadz</h3>
                        <p className="text-xs text-red-600 font-bold flex items-center gap-1"><ShieldAlert className="w-3 h-3"/> Flagged: Payment mentioned outside platform</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <button onClick={() => toast.success("Vendor storefront access locked.")} className="bg-red-50 text-red-600 font-bold px-4 py-2 rounded-lg text-sm hover:bg-red-100 transition-colors whitespace-nowrap">
                          Suspend Vendor
                        </button>
                      </div>
                   </div>

                   <div className="flex-1 overflow-y-auto p-6 space-y-4 z-10 bg-[url('https://i.pinimg.com/originals/8c/98/99/8c98994518b575bfd8c949e91d20548b.jpg')] bg-cover bg-center bg-fixed" style={{boxShadow: 'inset 0 0 0 2000px rgba(255,255,255,0.9)'}}>
                      {/* Mock Messages */}
                      <div className="flex flex-col gap-1 max-w-[80%]">
                         <span className="text-xs font-bold text-gray-500 ml-2">Peter (Student)</span>
                         <div className="bg-white p-3 rounded-2xl rounded-tl-sm shadow-sm border border-gray-100 text-sm font-medium w-fit">
                           Kaka naomba Jordan 1 za blue size 42.
                         </div>
                      </div>

                      <div className="flex flex-col gap-1 max-w-[80%] self-end items-end ml-auto">
                         <span className="text-xs font-bold text-emerald-600 mr-2">SneakerHeadz (Vendor)</span>
                         <div className="bg-emerald-500 text-white p-3 rounded-2xl rounded-tr-sm shadow-sm text-sm font-medium w-fit">
                           Zipo kaka, lakini malipo fanya kwa namba yangu ya TigoPesa ili nikuletee chap.
                         </div>
                      </div>

                      <div className="flex flex-col gap-1 max-w-[80%]">
                         <span className="text-xs font-bold text-gray-500 ml-2">Peter (Student)</span>
                         <div className="bg-white p-3 rounded-2xl rounded-tl-sm shadow-sm border border-gray-100 text-sm font-medium w-fit">
                           Nitakutumia kwa namba hii ya TigoPesa?
                         </div>
                      </div>

                      <div className="flex justify-center my-6">
                         <span className="bg-red-100 text-red-700 font-bold text-xs px-3 py-1 rounded-full flex items-center gap-1 shadow-sm">
                           <ShieldAlert className="w-3 h-3" /> System Auto-Flagged
                         </span>
                      </div>
                   </div>

                   <div className="p-4 bg-gray-50 border-t border-gray-100 z-10">
                      <div className="relative">
                        <MessageSquare className="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                        <input type="text" placeholder="Send an admin warning message to this chat..." className="w-full pl-10 pr-24 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-red-500 outline-none font-medium text-sm" />
                        <button className="absolute right-2 top-1/2 -translate-y-1/2 bg-gray-900 text-white font-bold text-xs px-4 py-1.5 rounded-lg">
                          Warn
                        </button>
                      </div>
                   </div>
                </div>
             </div>
           </div>
        )}

      </div>
    </div>
  );
}
