"use client";

import { Printer, Download, CheckCircle, Clock, FileText, Search, Settings, MapPin, DollarSign, Edit3, Save } from "lucide-react";
import { useState } from "react";

export default function VendorDashboardPage() {
  const [activeTab, setActiveTab] = useState<"queue" | "completed" | "settings">("queue");
  const [isEditingSettings, setIsEditingSettings] = useState(false);

  const printQueue = [
    { id: "PJ-101", student: "John Doe", file: "Research_Proposal.pdf", copies: 2, color: "Black & White", time: "10 mins ago", status: "pending" },
    { id: "PJ-102", student: "Sarah Smith", file: "Chemistry_Report.pdf", copies: 1, color: "Full Color", time: "25 mins ago", status: "pending" },
    { id: "PJ-103", student: "Michael Johnson", file: "Leave_Letter.pdf", copies: 1, color: "Black & White", time: "1 hour ago", status: "pending" },
  ];

  const [shopSettings, setShopSettings] = useState({
    name: "Mlimani Campus Main Print",
    location: "Near Yombo 4, UDSM",
    bwPrice: "100",
    colorPrice: "500",
    bindingPrice: "2000",
    services: "A4 B&W, Color, Binding",
    status: "Online"
  });

  return (
    <div className="min-h-screen bg-gray-50 pt-20 pb-24 font-sans">
      <div className="w-full mx-auto px-4 md:px-8">

        {/* Dashboard Header */}
        <div className="bg-gray-900 rounded-3xl p-8 mb-8 text-white flex flex-col md:flex-row justify-between items-center gap-6 shadow-xl">
          <div className="flex items-center gap-6">
            <div className="w-16 h-16 bg-white/10 rounded-2xl flex items-center justify-center border border-white/20">
              <Printer className="w-8 h-8 text-primary" />
            </div>
            <div>
              <h1 className="text-3xl font-black tracking-tight mb-1">Mlimani Print Center</h1>
              <p className="text-gray-400 font-medium text-sm flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span> Receiving Jobs
              </p>
            </div>
          </div>
          <div className="flex gap-4 w-full md:w-auto">
             <div className="bg-white/10 p-4 rounded-2xl flex-1 md:w-32 text-center border border-white/10">
               <p className="text-gray-400 text-xs font-bold uppercase tracking-wider mb-1">In Queue</p>
               <p className="text-2xl font-black text-white">{printQueue.length}</p>
             </div>
             <div className="bg-white/10 p-4 rounded-2xl flex-1 md:w-32 text-center border border-white/10">
               <p className="text-gray-400 text-xs font-bold uppercase tracking-wider mb-1">Completed</p>
               <p className="text-2xl font-black text-white">124</p>
             </div>
          </div>
        </div>

        <div className="bg-white sm:rounded-3xl shadow-sm border-y sm:border border-gray-200 overflow-hidden -mx-4 sm:mx-0">
           {/* Tabs & Search */}
           <div className="p-4 border-b border-gray-100 flex flex-col sm:flex-row gap-4 items-center justify-between bg-gray-50/50">
             <div className="flex gap-2 w-full sm:w-auto overflow-x-auto hide-scrollbar pb-2 sm:pb-0">
               <button
                 onClick={() => setActiveTab("queue")}
                 className={`px-6 py-2.5 rounded-xl font-bold text-sm transition-colors whitespace-nowrap ${activeTab === 'queue' ? 'bg-gray-900 text-white' : 'bg-white text-gray-600 border border-gray-200 hover:bg-gray-50'}`}
               >
                 Print Queue
               </button>
               <button
                 onClick={() => setActiveTab("completed")}
                 className={`px-6 py-2.5 rounded-xl font-bold text-sm transition-colors whitespace-nowrap ${activeTab === 'completed' ? 'bg-gray-900 text-white' : 'bg-white text-gray-600 border border-gray-200 hover:bg-gray-50'}`}
               >
                 Completed
               </button>
               <button
                 onClick={() => setActiveTab("settings")}
                 className={`px-6 py-2.5 rounded-xl font-bold text-sm transition-colors whitespace-nowrap flex items-center gap-2 ${activeTab === 'settings' ? 'bg-gray-900 text-white' : 'bg-white text-gray-600 border border-gray-200 hover:bg-gray-50'}`}
               >
                 <Settings className="w-4 h-4" /> Shop Profile
               </button>
             </div>
             {activeTab !== "settings" && (
               <div className="relative w-full sm:w-80">
                  <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    placeholder="Search by ID or Student..."
                    className="w-full bg-white border border-gray-200 rounded-xl pl-9 pr-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-gray-900"
                  />
               </div>
             )}
          </div>

          {/* Queue List */}
          <div className="p-0 sm:p-6">
            <div className="flex flex-col sm:grid sm:grid-cols-1 gap-0 sm:gap-4 divide-y sm:divide-y-0 divide-gray-100">
              {activeTab === "queue" && printQueue.map((job) => (
                <div key={job.id} className="border-0 sm:border border-gray-200 sm:rounded-2xl p-4 sm:p-6 flex flex-col md:flex-row justify-between items-start md:items-center gap-4 sm:gap-6 hover:shadow-md transition-shadow bg-white">
                  <div className="flex items-start gap-4 w-full md:w-auto">
                     <div className="w-12 h-12 bg-primary/10 text-primary rounded-xl flex items-center justify-center shrink-0">
                       <FileText className="w-6 h-6" />
                     </div>
                     <div>
                       <div className="flex items-center gap-3 mb-1">
                         <span className="text-xs font-bold px-2 py-0.5 bg-gray-100 rounded text-gray-600">{job.id}</span>
                         <h3 className="font-bold text-gray-900">{job.file}</h3>
                       </div>
                       <p className="text-sm text-gray-500 font-medium mb-2">Student: {job.student}</p>
                       <div className="flex flex-wrap gap-2">
                         <span className="text-[10px] font-bold uppercase tracking-wider bg-gray-100 text-gray-600 px-2 py-1 rounded-full">{job.copies} Copies</span>
                         <span className="text-[10px] font-bold uppercase tracking-wider bg-gray-100 text-gray-600 px-2 py-1 rounded-full">{job.color}</span>
                         <span className="text-[10px] font-bold uppercase tracking-wider flex items-center gap-1 text-amber-600 bg-amber-50 px-2 py-1 rounded-full"><Clock className="w-3 h-3"/> {job.time}</span>
                       </div>
                     </div>
                  </div>

                  <div className="flex items-center gap-3 w-full md:w-auto border-t md:border-t-0 border-gray-100 pt-4 md:pt-0">
                    <button className="flex-1 md:flex-none flex items-center justify-center gap-2 bg-gray-100 hover:bg-gray-200 text-gray-900 font-bold px-6 py-3 rounded-xl transition-colors text-sm">
                      <Download className="w-4 h-4" /> Download PDF
                    </button>
                    <button className="flex-1 md:flex-none flex items-center justify-center gap-2 bg-primary hover:bg-primary/90 text-white font-bold px-6 py-3 rounded-xl transition-colors text-sm shadow-md">
                      <CheckCircle className="w-4 h-4" /> Mark Printed
                    </button>
                  </div>
                </div>
              ))}
              {activeTab === "completed" && (
                <div className="text-center py-20 text-gray-500">
                  <CheckCircle className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                  <p className="font-bold text-lg">No completed jobs to show.</p>
                </div>
              )}

              {activeTab === "settings" && (
                <div className="w-full mx-auto space-y-8 py-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h2 className="text-2xl font-black text-gray-900">Shop Profile & Pricing</h2>
                      <p className="text-gray-500 font-medium text-sm mt-1">Configure your stationary details to attract students on the Print Network.</p>
                    </div>
                    <button
                      onClick={() => setIsEditingSettings(!isEditingSettings)}
                      className={`px-4 py-2 rounded-xl text-sm font-bold flex items-center gap-2 transition-colors ${isEditingSettings ? 'bg-primary text-white' : 'bg-gray-100 text-gray-800 hover:bg-gray-200'}`}
                    >
                      {isEditingSettings ? <><Save className="w-4 h-4"/> Save Changes</> : <><Edit3 className="w-4 h-4"/> Edit Profile</>}
                    </button>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-xs font-bold text-gray-500 uppercase tracking-wider flex items-center gap-2"><Settings className="w-4 h-4"/> Shop Name</label>
                      <input
                        type="text"
                        disabled={!isEditingSettings}
                        value={shopSettings.name}
                        onChange={(e) => setShopSettings({...shopSettings, name: e.target.value})}
                        className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 font-bold text-gray-900 disabled:opacity-70 focus:ring-2 focus:ring-primary focus:outline-none"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-bold text-gray-500 uppercase tracking-wider flex items-center gap-2"><MapPin className="w-4 h-4"/> Location</label>
                      <input
                        type="text"
                        disabled={!isEditingSettings}
                        value={shopSettings.location}
                        onChange={(e) => setShopSettings({...shopSettings, location: e.target.value})}
                        className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 font-bold text-gray-900 disabled:opacity-70 focus:ring-2 focus:ring-primary focus:outline-none"
                      />
                    </div>
                  </div>

                  <div className="bg-gray-50 rounded-2xl p-6 border border-gray-200">
                    <h3 className="font-bold text-lg text-gray-900 mb-4 flex items-center gap-2"><DollarSign className="w-5 h-5 text-primary"/> Pricing per Page (TZS)</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                      <div className="space-y-2">
                        <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">Black & White</label>
                        <input
                          type="number"
                          disabled={!isEditingSettings}
                          value={shopSettings.bwPrice}
                          onChange={(e) => setShopSettings({...shopSettings, bwPrice: e.target.value})}
                          className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 font-bold text-gray-900 disabled:opacity-70 focus:ring-2 focus:ring-primary focus:outline-none"
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">Full Color</label>
                        <input
                          type="number"
                          disabled={!isEditingSettings}
                          value={shopSettings.colorPrice}
                          onChange={(e) => setShopSettings({...shopSettings, colorPrice: e.target.value})}
                          className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 font-bold text-gray-900 disabled:opacity-70 focus:ring-2 focus:ring-primary focus:outline-none"
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">Binding</label>
                        <input
                          type="number"
                          disabled={!isEditingSettings}
                          value={shopSettings.bindingPrice}
                          onChange={(e) => setShopSettings({...shopSettings, bindingPrice: e.target.value})}
                          className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 font-bold text-gray-900 disabled:opacity-70 focus:ring-2 focus:ring-primary focus:outline-none"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">Services Offered (Comma separated)</label>
                    <input
                      type="text"
                      disabled={!isEditingSettings}
                      value={shopSettings.services}
                      onChange={(e) => setShopSettings({...shopSettings, services: e.target.value})}
                      className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 font-bold text-gray-900 disabled:opacity-70 focus:ring-2 focus:ring-primary focus:outline-none"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">Shop Status</label>
                    <select
                      disabled={!isEditingSettings}
                      value={shopSettings.status}
                      onChange={(e) => setShopSettings({...shopSettings, status: e.target.value})}
                      className="w-full md:w-1/3 bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 font-bold text-gray-900 disabled:opacity-70 focus:ring-2 focus:ring-primary focus:outline-none appearance-none"
                    >
                      <option>Online</option>
                      <option>Busy</option>
                      <option>Offline</option>
                    </select>
                  </div>

                </div>
              )}
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
