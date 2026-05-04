"use client";

import { motion, useAnimationControls } from "framer-motion";
import { PenTool, FileText, LayoutTemplate, Printer, ArrowRight, ShieldCheck, Zap, UploadCloud, Edit3, Settings } from "lucide-react";
import Link from "next/link";
import { useAppStore } from "@/lib/store/app-store";
import { useEffect } from "react";

export default function Home() {
  const { currentUser } = useAppStore();

  return (
    <div className="flex flex-col items-center justify-center w-full overflow-x-hidden selection:bg-primary/20 selection:text-primary">

      {/* Global Trust Prompt */}
      <div className="w-full bg-primary text-white py-3 px-4 text-center font-bold text-sm sm:text-base tracking-wide flex items-center justify-center gap-2">
        <ShieldCheck className="w-5 h-5 shrink-0" />
        The Ultimate Student Cloud Stationary. Upload. Format. Print.
      </div>

      {/* Hero Section - High End Visual First Design */}
      <section className="w-full bg-gradient-to-b from-emerald-50/30 to-white pt-16 md:pt-24 pb-12 px-4 overflow-hidden border-b border-border">
        <div className="max-w-7xl mx-auto flex flex-col items-center text-center mb-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 bg-emerald-50 text-emerald-800 px-4 py-2 rounded-full font-bold text-xs sm:text-sm mb-6 border border-emerald-200"
          >
            <Settings className="w-4 h-4" /> AI-Powered Formatting Engine
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl sm:text-5xl md:text-7xl font-black text-gray-900 tracking-tight leading-[1.1] mb-6"
          >
            Your work. <br className="hidden md:block"/>
            <span className="text-primary">Perfectly formatted.</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-base sm:text-lg md:text-xl text-gray-500 font-medium max-w-2xl mb-8 leading-relaxed px-2"
          >
            Upload your rough draft, provide a reference style, or type raw notes.
            Our engine fixes grammar, aligns margins, draws complex tables, and outputs a print-ready A4 PDF.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto px-4"
          >
            <Link href="/workspace" className="w-full sm:w-auto bg-primary hover:bg-emerald-600 text-white font-bold px-8 py-4 rounded-xl transition-all shadow-xl shadow-emerald-500/20 flex items-center justify-center gap-2 text-base md:text-lg">
              <UploadCloud className="w-5 h-5" /> Enter Workspace
            </Link>
            <Link href="/print-station" className="w-full sm:w-auto bg-white hover:bg-gray-50 text-gray-900 border-2 border-gray-200 font-bold px-8 py-4 rounded-xl transition-all flex items-center justify-center gap-2 text-base md:text-lg">
              <Printer className="w-5 h-5" /> Find Print Shops
            </Link>
          </motion.div>
        </div>

        {/* Visual Flat Cards Auto Scroll */}
        <div className="relative w-full max-w-[100vw] overflow-hidden -mx-4 pb-8">
          <div className="absolute left-0 top-0 bottom-0 w-8 md:w-32 bg-gradient-to-r from-white to-transparent z-10" />
          <div className="absolute right-0 top-0 bottom-0 w-8 md:w-32 bg-gradient-to-l from-white to-transparent z-10" />

          <motion.div
            initial={{ x: "0%" }}
            animate={{ x: "-50%" }}
            transition={{
              repeat: Infinity,
              ease: "linear",
              duration: 30
            }}
            className="flex gap-4 md:gap-6 px-4 w-max"
          >
            {[
              { img: "https://images.unsplash.com/photo-1704748082614-8163a88e56b8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w4NjMzNTJ8MHwxfHNlYXJjaHwxfHx1bml2ZXJzaXR5JTIwc3R1ZGVudCUyMHN0dWR5aW5nfGVufDB8fHx8MTc3Nzg4NTk5N3ww&ixlib=rb-4.1.0&q=80&w=1080", title: "Assignment Drafting", icon: <FileText className="w-5 h-5"/> },
              { img: "https://images.unsplash.com/photo-1593499881934-2a652f450a85?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w4NjMzNTJ8MHwxfHNlYXJjaHwxfHxwcmludGluZyUyMHBhcGVyJTIwc3RhdGlvbmFyeXxlbnwwfHx8fDE3Nzc4ODU5OTd8MA&ixlib=rb-4.1.0&q=80&w=1080", title: "Direct to Printer", icon: <Printer className="w-5 h-5"/> },
              { img: "https://images.unsplash.com/photo-1758612214882-03f8a1d7211f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w4NjMzNTJ8MHwxfHNlYXJjaHwxfHx0eXBpbmclMjBsYXB0b3AlMjBzdHVkZW50fGVufDB8fHx8MTc3Nzg4NTk5OHww&ixlib=rb-4.1.0&q=80&w=1080", title: "Smart Formatting", icon: <LayoutTemplate className="w-5 h-5"/> },
              { img: "https://images.unsplash.com/photo-1546953304-5d96f43c2e94?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w4NjMzNTJ8MHwxfHNlYXJjaHwxfHxsaWJyYXJ5JTIwc3R1ZHl8ZW58MHx8fHwxNzc3ODg1OTk4fDA&ixlib=rb-4.1.0&q=80&w=1080", title: "Leave Letters", icon: <PenTool className="w-5 h-5"/> },
              { img: "https://images.unsplash.com/photo-1748609422318-7301636fb625?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w4NjMzNTJ8MHwxfHNlYXJjaHwxfHx3cml0aW5nJTIwbm90ZXMlMjBwYXBlcnxlbnwwfHx8fDE3Nzc4ODU5OTl8MA&ixlib=rb-4.1.0&q=80&w=1080", title: "Margin Alignment", icon: <Edit3 className="w-5 h-5"/> },
              // Duplicate for infinite scroll
              { img: "https://images.unsplash.com/photo-1704748082614-8163a88e56b8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w4NjMzNTJ8MHwxfHNlYXJjaHwxfHx1bml2ZXJzaXR5JTIwc3R1ZGVudCUyMHN0dWR5aW5nfGVufDB8fHx8MTc3Nzg4NTk5N3ww&ixlib=rb-4.1.0&q=80&w=1080", title: "Assignment Drafting", icon: <FileText className="w-5 h-5"/> },
              { img: "https://images.unsplash.com/photo-1593499881934-2a652f450a85?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w4NjMzNTJ8MHwxfHNlYXJjaHwxfHxwcmludGluZyUyMHBhcGVyJTIwc3RhdGlvbmFyeXxlbnwwfHx8fDE3Nzc4ODU5OTd8MA&ixlib=rb-4.1.0&q=80&w=1080", title: "Direct to Printer", icon: <Printer className="w-5 h-5"/> },
              { img: "https://images.unsplash.com/photo-1758612214882-03f8a1d7211f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w4NjMzNTJ8MHwxfHNlYXJjaHwxfHx0eXBpbmclMjBsYXB0b3AlMjBzdHVkZW50fGVufDB8fHx8MTc3Nzg4NTk5OHww&ixlib=rb-4.1.0&q=80&w=1080", title: "Smart Formatting", icon: <LayoutTemplate className="w-5 h-5"/> },
            ].map((item, i) => (
              <div key={i} className="relative w-64 md:w-80 h-40 md:h-56 rounded-2xl md:rounded-3xl overflow-hidden shadow-sm shrink-0 group">
                <img src={item.img} alt={item.title} className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                <div className="absolute bottom-4 left-4 right-4 text-white flex items-center gap-3">
                  <div className="p-2 bg-white/20 backdrop-blur-md rounded-xl">
                    {item.icon}
                  </div>
                  <span className="font-bold text-sm md:text-base">{item.title}</span>
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* The Workspace Breakdown */}
      <section className="py-16 md:py-24 max-w-7xl mx-auto px-4 w-full bg-white">
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-3xl md:text-5xl font-black tracking-tight mb-4">A true Stationary Engine.</h2>
          <p className="text-lg md:text-xl text-gray-500 font-medium max-w-2xl mx-auto px-4">
            Built to handle the specific formatting demands of university coursework.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          <div className="flex flex-col">
            <div className="bg-gray-50 rounded-3xl p-6 md:p-8 h-full border border-gray-200 hover:border-primary/50 transition-colors">
              <div className="w-12 h-12 bg-white shadow-sm border border-gray-100 text-primary rounded-xl flex items-center justify-center mb-6">
                <UploadCloud className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold mb-3">1. Bring your content</h3>
              <p className="text-gray-600 font-medium text-sm md:text-base leading-relaxed">
                Upload a messy Word document, a text file, or simply type out your raw thoughts. You provide the substance, we handle the presentation.
              </p>
            </div>
          </div>

          <div className="flex flex-col">
            <div className="bg-gray-50 rounded-3xl p-6 md:p-8 h-full border border-gray-200 hover:border-primary/50 transition-colors">
              <div className="w-12 h-12 bg-white shadow-sm border border-gray-100 text-primary rounded-xl flex items-center justify-center mb-6">
                <Settings className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold mb-3">2. Instruct the Engine</h3>
              <p className="text-gray-600 font-medium text-sm md:text-base leading-relaxed">
                Want it in APA format? Need to extract data into a 4-column table? Have a specific campus cover-page style? Just upload the reference or type the instruction.
              </p>
            </div>
          </div>

          <div className="flex flex-col">
            <div className="bg-gray-50 rounded-3xl p-6 md:p-8 h-full border border-gray-200 hover:border-primary/50 transition-colors">
              <div className="w-12 h-12 bg-white shadow-sm border border-gray-100 text-primary rounded-xl flex items-center justify-center mb-6">
                <Printer className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold mb-3">3. Direct to Print Shop</h3>
              <p className="text-gray-600 font-medium text-sm md:text-base leading-relaxed">
                Review the AI&apos;s output. Make manual adjustments to margins before sending it directly to a local stationary&apos;s print queue.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Vendor/Stationary CTA Section */}
      <section className="w-full bg-emerald-950 text-white py-16 md:py-24 border-t border-emerald-900">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 md:w-20 md:h-20 bg-emerald-900 text-emerald-400 rounded-2xl md:rounded-3xl mb-6 md:mb-8 border border-emerald-800">
            <Printer className="w-8 h-8 md:w-10 md:h-10" />
          </div>
          <h2 className="text-3xl md:text-5xl lg:text-6xl font-black mb-4 md:mb-6 tracking-tight">Are you a Print Shop?</h2>
          <p className="text-base md:text-xl font-medium mb-8 md:mb-10 text-emerald-100/70 max-w-2xl mx-auto leading-relaxed px-4">
            Stop dealing with messy formatting and virus-filled flash drives.
            Join our network to receive perfectly formatted, ready-to-print PDFs directly into your dashboard.
          </p>
          {currentUser?.role === 'vendor' ? (
            <Link href="/vendor/dashboard" className="inline-flex items-center gap-2 bg-primary text-white font-bold px-6 py-3 md:px-8 md:py-4 rounded-xl hover:bg-emerald-400 transition-colors shadow-xl shadow-primary/20 text-sm md:text-base">
              Open Print Dashboard <ArrowRight className="w-5 h-5" />
            </Link>
          ) : (
            <Link href="/vendor/apply" className="inline-flex items-center gap-2 bg-white text-emerald-950 font-bold px-6 py-3 md:px-8 md:py-4 rounded-xl hover:bg-gray-100 transition-colors shadow-xl text-sm md:text-base">
              Register Your Stationary <ArrowRight className="w-5 h-5" />
            </Link>
          )}
        </div>
      </section>

    </div>
  );
}
