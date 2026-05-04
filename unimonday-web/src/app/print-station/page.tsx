"use client";

import { Printer, MapPin, Search, Send, FileText, CheckCircle } from "lucide-react";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function PrintStationPage() {
  const [selectedStationary, setSelectedStationary] = useState<number | null>(null);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const stationaries = [
    { id: 1, name: "Mlimani Campus Main Print", location: "Near Yombo 4, UDSM", distance: "0.2 km", status: "Online" },
    { id: 2, name: "Smart Copy & Tech", location: "CoICT Kijitonyama", distance: "1.5 km", status: "Online" },
    { id: 3, name: "Student Center Hub", location: "UDSM Student Center", distance: "0.5 km", status: "Busy" },
  ];

  const handleSubmit = () => {
    if (selectedStationary) {
      setIsSubmitted(true);
    }
  };

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-white p-10 rounded-3xl shadow-xl max-w-md w-full text-center border border-gray-100"
        >
          <div className="w-20 h-20 bg-emerald-100 text-emerald-500 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="w-10 h-10" />
          </div>
          <h2 className="text-2xl font-black mb-2">Print Job Sent!</h2>
          <p className="text-gray-500 font-medium mb-8">
            Your document has been sent to the selected stationary. You will receive a notification when it&apos;s ready for pickup.
          </p>
          <button onClick={() => setIsSubmitted(false)} className="w-full bg-gray-900 text-white font-bold py-4 rounded-xl">
            Print Another Document
          </button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 pt-20 pb-24">
      <div className="max-w-5xl mx-auto px-4 w-full flex flex-col md:flex-row gap-8">

        {/* Left Side - Select Document & Options */}
        <div className="w-full md:w-1/3 flex flex-col gap-6">
          <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-200">
            <h2 className="font-black text-lg mb-4 flex items-center gap-2">
              <FileText className="w-5 h-5 text-gray-500" /> Print Settings
            </h2>

            <div className="space-y-4">
              <div className="p-4 bg-gray-50 border border-gray-200 rounded-xl">
                <p className="text-xs text-gray-500 font-bold uppercase tracking-wider mb-1">Selected File</p>
                <p className="font-bold text-sm text-gray-900 truncate">Research_Proposal_Final.pdf</p>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">Copies</label>
                <input type="number" defaultValue={1} min={1} className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-gray-900 font-bold" />
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">Color Mode</label>
                <select className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-gray-900 font-bold text-sm appearance-none">
                  <option>Black & White</option>
                  <option>Full Color</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side - Select Stationary */}
        <div className="w-full md:w-2/3">
          <div className="bg-white p-6 sm:p-8 rounded-3xl shadow-sm border border-gray-200 h-full flex flex-col">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
              <div>
                <h2 className="font-black text-2xl tracking-tight">Select Stationary</h2>
                <p className="text-sm text-gray-500 font-medium mt-1">Choose a local partner to print your document.</p>
              </div>
              <div className="relative w-full sm:w-64">
                <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Search by location..."
                  className="w-full bg-gray-50 border border-gray-200 rounded-xl pl-9 pr-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-gray-900"
                />
              </div>
            </div>

            <div className="space-y-3 flex-grow overflow-y-auto pr-2 custom-scrollbar">
              {stationaries.map((shop) => (
                <div
                  key={shop.id}
                  onClick={() => setSelectedStationary(shop.id)}
                  className={`p-4 border rounded-2xl cursor-pointer transition-all flex items-center gap-4 ${selectedStationary === shop.id ? 'border-gray-900 bg-gray-50 ring-1 ring-gray-900' : 'border-gray-200 hover:border-gray-300 bg-white'}`}
                >
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center shrink-0 ${selectedStationary === shop.id ? 'bg-gray-900 text-white' : 'bg-gray-100 text-gray-600'}`}>
                    <Printer className="w-5 h-5" />
                  </div>
                  <div className="flex-grow">
                    <h3 className="font-bold text-gray-900">{shop.name}</h3>
                    <p className="text-xs text-gray-500 font-medium flex items-center gap-1 mt-0.5">
                      <MapPin className="w-3 h-3" /> {shop.location} • {shop.distance}
                    </p>
                  </div>
                  <div className="shrink-0 text-right">
                    <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-1 rounded-full ${shop.status === 'Online' ? 'bg-emerald-100 text-emerald-700' : 'bg-amber-100 text-amber-700'}`}>
                      {shop.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>

            <button
              onClick={handleSubmit}
              disabled={!selectedStationary}
              className="w-full mt-6 bg-primary hover:bg-primary/90 disabled:bg-gray-200 disabled:text-gray-400 disabled:cursor-not-allowed text-white font-bold py-5 rounded-2xl flex items-center justify-center gap-2 transition-all shadow-lg"
            >
              <Send className="w-5 h-5" /> Send to Print Queue
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
