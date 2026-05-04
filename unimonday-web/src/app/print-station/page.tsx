"use client";

import { Printer, MapPin, Search, Send, FileText, CheckCircle, UploadCloud, Star, DollarSign } from "lucide-react";
import { useState } from "react";
import { motion } from "framer-motion";

export default function PrintStationPage() {
  const [selectedStationary, setSelectedStationary] = useState<number | null>(null);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);

  const stationaries = [
    { id: 1, name: "Mlimani Campus Main Print", location: "Near Yombo 4, UDSM", distance: "0.2 km", status: "Online", rating: 4.8, reviews: 124, pricePerPage: "TZS 100", services: ["A4 B&W", "Color", "Binding"] },
    { id: 2, name: "Smart Copy & Tech", location: "CoICT Kijitonyama", distance: "1.5 km", status: "Online", rating: 4.9, reviews: 89, pricePerPage: "TZS 150", services: ["A4 B&W", "Color", "Lamination"] },
    { id: 3, name: "Student Center Hub", location: "UDSM Student Center", distance: "0.5 km", status: "Busy", rating: 4.5, reviews: 342, pricePerPage: "TZS 100", services: ["A4 B&W", "Binding"] },
    { id: 4, name: "QuickPrint Mabibo", location: "Mabibo Hostel Block A", distance: "4.2 km", status: "Online", rating: 4.7, reviews: 56, pricePerPage: "TZS 100", services: ["A4 B&W", "Color", "Scanning"] },
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
      {/* Uber for Stationary Header */}
      <div className="max-w-6xl mx-auto px-4 w-full mb-10 text-center">
        <h1 className="text-4xl md:text-5xl font-black tracking-tight mb-4 text-gray-900">
          The Print Network
        </h1>
        <p className="text-xl text-gray-500 font-medium max-w-2xl mx-auto">
          Directly request print jobs from local stationaries. Upload your file, compare prices, and send it straight to their queue.
        </p>
      </div>

      <div className="max-w-6xl mx-auto px-4 w-full flex flex-col lg:flex-row gap-8">

        {/* Left Side - Upload & Print Settings */}
        <div className="w-full lg:w-[35%] flex flex-col gap-6">
          <div className="bg-white p-6 sm:p-8 rounded-3xl shadow-sm border border-gray-200 flex flex-col h-full">
            <h2 className="font-black text-xl mb-6 flex items-center gap-2 text-gray-900">
              <FileText className="w-6 h-6 text-primary" /> Print Setup
            </h2>

            <div className="space-y-6 flex-grow">

              {/* Document Upload Area */}
              <div className="space-y-2">
                 <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">Document to Print</label>
                 <div className="border-2 border-dashed border-gray-300 rounded-2xl p-6 flex flex-col items-center justify-center text-center hover:bg-gray-50 transition-colors cursor-pointer bg-gray-50/50 relative overflow-hidden group">
                   <input type="file" className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" onChange={(e) => setUploadedFile(e.target.files?.[0] || null)} />
                   {!uploadedFile ? (
                     <>
                       <UploadCloud className="w-8 h-8 text-gray-400 mb-2 group-hover:text-primary transition-colors" />
                       <p className="text-sm font-bold text-gray-700">Tap to upload PDF/Word</p>
                       <p className="text-xs text-gray-500 mt-1">Max size: 25MB</p>
                     </>
                   ) : (
                     <div className="flex flex-col items-center gap-2 w-full">
                        <FileText className="w-8 h-8 text-primary" />
                        <p className="text-sm font-bold text-gray-900 truncate w-full px-4">{uploadedFile.name}</p>
                        <span className="text-[10px] font-bold text-emerald-600 bg-emerald-50 px-2 py-1 rounded-full border border-emerald-200">Ready to Print</span>
                     </div>
                   )}
                 </div>
              </div>

              {/* Options Grid */}
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">Copies</label>
                  <input type="number" defaultValue={1} min={1} className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary font-bold text-gray-900" />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">Color Mode</label>
                  <select className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary font-bold text-gray-900 appearance-none">
                    <option>Black & White</option>
                    <option>Full Color</option>
                  </select>
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">Special Requests</label>
                <textarea
                  placeholder="e.g. Please bind with a clear cover, or staple top left."
                  className="w-full h-24 bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary text-gray-900 resize-none placeholder-gray-400 font-medium"
                ></textarea>
              </div>

            </div>
          </div>
        </div>

        {/* Right Side - Stationary Network List */}
        <div className="w-full lg:w-[65%]">
          <div className="bg-white p-6 sm:p-8 rounded-3xl shadow-sm border border-gray-200 h-full flex flex-col">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
              <div>
                <h2 className="font-black text-xl text-gray-900">Available Stationaries</h2>
                <p className="text-sm text-gray-500 font-medium mt-1">Select a shop to see total price and send job.</p>
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

            {/* Filter Pills */}
            <div className="flex gap-2 w-full overflow-x-auto pb-2 sm:pb-4 hide-scrollbar mb-2">
              <button className="whitespace-nowrap px-4 py-2 bg-gray-900 text-white rounded-lg font-bold text-xs shadow-sm">Nearest</button>
              <button className="whitespace-nowrap px-4 py-2 bg-gray-50 border border-gray-200 text-gray-700 hover:bg-gray-100 rounded-lg font-bold text-xs">Top Rated</button>
              <button className="whitespace-nowrap px-4 py-2 bg-gray-50 border border-gray-200 text-gray-700 hover:bg-gray-100 rounded-lg font-bold text-xs">Cheapest B&W</button>
              <button className="whitespace-nowrap px-4 py-2 bg-gray-50 border border-gray-200 text-gray-700 hover:bg-gray-100 rounded-lg font-bold text-xs">Color Print</button>
            </div>

            <div className="space-y-4 flex-grow overflow-y-auto pr-2 custom-scrollbar">
              {stationaries.map((shop) => (
                <div
                  key={shop.id}
                  onClick={() => setSelectedStationary(shop.id)}
                  className={`p-5 border rounded-2xl cursor-pointer transition-all flex flex-col sm:flex-row sm:items-center gap-4 ${selectedStationary === shop.id ? 'border-primary bg-primary/5 ring-1 ring-primary' : 'border-gray-200 hover:border-gray-300 bg-white'}`}
                >
                  <div className="flex items-center gap-4 flex-grow">
                    <div className={`w-14 h-14 rounded-2xl flex items-center justify-center shrink-0 shadow-sm ${selectedStationary === shop.id ? 'bg-primary text-white' : 'bg-gray-50 border border-gray-100 text-gray-600'}`}>
                      <Printer className="w-6 h-6" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="font-black text-gray-900 text-base">{shop.name}</h3>
                        <span className={`text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full ${shop.status === 'Online' ? 'bg-emerald-100 text-emerald-700' : 'bg-amber-100 text-amber-700'}`}>
                          {shop.status}
                        </span>
                      </div>
                      <div className="text-xs text-gray-500 font-medium flex items-center gap-3">
                        <span className="flex items-center gap-1"><MapPin className="w-3 h-3" /> {shop.distance}</span>
                        <span className="flex items-center gap-1 text-amber-500 font-bold"><Star className="w-3 h-3 fill-amber-500" /> {shop.rating} ({shop.reviews})</span>
                      </div>
                      <div className="flex items-center gap-1 mt-2 flex-wrap">
                        {shop.services.map((srv, i) => (
                          <span key={i} className="text-[10px] bg-gray-100 text-gray-600 px-2 py-0.5 rounded-md font-bold">{srv}</span>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="shrink-0 sm:text-right mt-3 sm:mt-0 flex sm:flex-col items-center sm:items-end justify-between border-t sm:border-t-0 border-gray-100 pt-3 sm:pt-0">
                    <div className="flex flex-col">
                      <span className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">Price / Page</span>
                      <span className="font-black text-lg text-gray-900">{shop.pricePerPage}</span>
                    </div>
                    {selectedStationary === shop.id && (
                      <CheckCircle className="w-6 h-6 text-primary hidden sm:block mt-2" />
                    )}
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-6 pt-6 border-t border-gray-100">
               <button
                 onClick={handleSubmit}
                 disabled={!selectedStationary || !uploadedFile}
                 className="w-full bg-gray-900 hover:bg-black disabled:bg-gray-200 disabled:text-gray-400 disabled:cursor-not-allowed text-white font-bold py-5 rounded-2xl flex items-center justify-center gap-2 transition-all shadow-xl text-lg"
               >
                 <Send className="w-5 h-5" /> Request Print Job
               </button>
               {(!uploadedFile || !selectedStationary) && (
                 <p className="text-center text-xs text-gray-500 font-bold mt-3">
                   {!uploadedFile ? "Upload a document" : "Select a stationary"} to continue.
                 </p>
               )}
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
