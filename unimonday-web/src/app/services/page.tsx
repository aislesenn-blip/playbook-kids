"use client";

import { motion } from "framer-motion";
import { ShieldCheck, Star, MapPin, Search, ArrowRight } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function ServicesPage() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-gray-50/50 pb-24 pt-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <div className="w-16 h-16 bg-blue-50 text-blue-500 rounded-2xl flex items-center justify-center mx-auto mb-6 border border-blue-100 shadow-sm">
            <ShieldCheck className="w-8 h-8" />
          </div>
          <h1 className="text-4xl md:text-5xl font-black mb-4">Verified Services</h1>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Book trusted professionals on campus. From phone repairs to PC maintenance, all verified by the platform.
          </p>
        </motion.div>

        {/* Search */}
        <div className="max-w-2xl mx-auto mb-16">
          <div className="relative">
             <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                className="w-full pl-12 pr-4 py-4 bg-white shadow-sm rounded-full border border-border focus:ring-2 focus:ring-blue-500 text-lg font-medium"
                placeholder="What do you need help with?"
              />
          </div>
        </div>

        {/* Top Technicians List */}
        <div className="space-y-6">
          <h2 className="text-2xl font-black mb-6">Available Technicians Near You</h2>

          {/* Tech 1 */}
          <motion.div
            whileHover={{ y: -5 }}
            className="bg-white p-6 rounded-[2rem] border border-border shadow-sm flex flex-col md:flex-row gap-6 items-center cursor-pointer group"
          >
            <div className="relative w-24 h-24 rounded-full overflow-hidden shrink-0 border border-border">
              <Image src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=200&auto=format&fit=crop" alt="Technician" fill className="object-cover" />
            </div>
            <div className="flex-1 text-center md:text-left">
              <div className="flex items-center justify-center md:justify-start gap-2 mb-1">
                <h3 className="text-xl font-bold">John M.</h3>
                <ShieldCheck className="w-5 h-5 text-blue-500" />
              </div>
              <p className="text-gray-600 font-medium mb-2">Expert Phone & Mac Repair</p>
              <div className="flex flex-wrap items-center justify-center md:justify-start gap-3 text-sm">
                <span className="flex items-center gap-1 text-amber-500 font-bold"><Star className="w-4 h-4 fill-current" /> 4.9 (120 jobs)</span>
                <span className="flex items-center gap-1 text-gray-500"><MapPin className="w-4 h-4" /> UDSM Block A</span>
              </div>
            </div>
            <div className="flex flex-col gap-3 w-full md:w-auto">
              <span className="text-center md:text-right font-black text-xl text-blue-600">Est. Tsh 20,000+</span>
              <button
                onClick={() => router.push('/chat')}
                className="bg-blue-50 text-blue-600 hover:bg-blue-600 hover:text-white font-bold px-8 py-3 rounded-xl transition-colors flex items-center justify-center gap-2"
              >
                Request Service <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </motion.div>

           {/* Tech 2 */}
          <motion.div
            whileHover={{ y: -5 }}
            className="bg-white p-6 rounded-[2rem] border border-border shadow-sm flex flex-col md:flex-row gap-6 items-center cursor-pointer group"
          >
            <div className="relative w-24 h-24 rounded-full overflow-hidden shrink-0 border border-border">
              <Image src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=200&auto=format&fit=crop" alt="Technician" fill className="object-cover" />
            </div>
            <div className="flex-1 text-center md:text-left">
              <div className="flex items-center justify-center md:justify-start gap-2 mb-1">
                <h3 className="text-xl font-bold">Sarah T.</h3>
                <ShieldCheck className="w-5 h-5 text-blue-500" />
              </div>
              <p className="text-gray-600 font-medium mb-2">PC Maintenance & Software</p>
              <div className="flex flex-wrap items-center justify-center md:justify-start gap-3 text-sm">
                <span className="flex items-center gap-1 text-amber-500 font-bold"><Star className="w-4 h-4 fill-current" /> 5.0 (85 jobs)</span>
                <span className="flex items-center gap-1 text-gray-500"><MapPin className="w-4 h-4" /> IT Hub</span>
              </div>
            </div>
            <div className="flex flex-col gap-3 w-full md:w-auto">
              <span className="text-center md:text-right font-black text-xl text-blue-600">Est. Tsh 15,000+</span>
              <button
                onClick={() => router.push('/chat')}
                className="bg-blue-50 text-blue-600 hover:bg-blue-600 hover:text-white font-bold px-8 py-3 rounded-xl transition-colors flex items-center justify-center gap-2"
              >
                Request Service <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </motion.div>

        </div>
      </div>
    </div>
  );
}
