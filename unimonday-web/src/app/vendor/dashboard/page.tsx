"use client";

import { Printer, Download, CheckCircle, Clock, FileText, Search, Settings } from "lucide-react";
import { useState } from "react";

export default function VendorDashboardPage() {
  const [activeTab, setActiveTab] = useState<"queue" | "completed">("queue");

  const printQueue = [
    { id: "PJ-101", student: "John Doe", file: "Research_Proposal.pdf", copies: 2, color: "Black & White", time: "10 mins ago", status: "pending" },
    { id: "PJ-102", student: "Sarah Smith", file: "Chemistry_Report.pdf", copies: 1, color: "Full Color", time: "25 mins ago", status: "pending" },
    { id: "PJ-103", student: "Michael Johnson", file: "Leave_Letter.pdf", copies: 1, color: "Black & White", time: "1 hour ago", status: "pending" },
  ];

  return (
    <div className="min-h-screen bg-gray-50 pt-20 pb-24 font-sans">
      <div className="max-w-7xl mx-auto px-4 w-full">

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

        <div className="bg-white rounded-3xl shadow-sm border border-gray-200 overflow-hidden">
           {/* Tabs & Search */}
           <div className="p-4 border-b border-gray-100 flex flex-col sm:flex-row gap-4 items-center justify-between bg-gray-50/50">
             <div className="flex gap-2 w-full sm:w-auto">
               <button
                 onClick={() => setActiveTab("queue")}
                 className={`px-6 py-2.5 rounded-xl font-bold text-sm transition-colors ${activeTab === 'queue' ? 'bg-gray-900 text-white' : 'bg-white text-gray-600 border border-gray-200 hover:bg-gray-50'}`}
               >
                 Print Queue
               </button>
               <button
                 onClick={() => setActiveTab("completed")}
                 className={`px-6 py-2.5 rounded-xl font-bold text-sm transition-colors ${activeTab === 'completed' ? 'bg-gray-900 text-white' : 'bg-white text-gray-600 border border-gray-200 hover:bg-gray-50'}`}
               >
                 Completed
               </button>
             </div>
             <div className="relative w-full sm:w-80">
                <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Search by ID or Student..."
                  className="w-full bg-white border border-gray-200 rounded-xl pl-9 pr-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-gray-900"
                />
             </div>
          </div>

          {/* Queue List */}
          <div className="p-6">
            <div className="grid grid-cols-1 gap-4">
              {activeTab === "queue" && printQueue.map((job) => (
                <div key={job.id} className="border border-gray-200 rounded-2xl p-6 flex flex-col md:flex-row justify-between items-start md:items-center gap-6 hover:shadow-md transition-shadow bg-white">
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
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
