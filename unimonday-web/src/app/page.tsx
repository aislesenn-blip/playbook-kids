"use client";

import { motion } from "framer-motion";
import { PenTool, FileText, LayoutTemplate, Printer, ArrowRight, ShieldCheck, UploadCloud, Edit3, Settings } from "lucide-react";
import Link from "next/link";
import { useAppStore } from "@/lib/store/app-store";
import { useEffect, useState } from "react";
import { AnimatePresence } from "framer-motion";

export default function Home() {
  const { currentUser } = useAppStore();

  // Amazon-style Carousel State
  const carouselItems = [
    { img: "https://images.unsplash.com/photo-1513258496099-48168024aec0?ixlib=rb-4.0.3&auto=format&fit=crop&w=1080&q=80", title: "Assignment Drafting", icon: <FileText className="w-5 h-5"/> },
    { img: "https://images.unsplash.com/photo-1568205612837-017257d2310a?ixlib=rb-4.0.3&auto=format&fit=crop&w=1080&q=80", title: "Direct to Printer", icon: <Printer className="w-5 h-5"/> },
    { img: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?ixlib=rb-4.0.3&auto=format&fit=crop&w=1080&q=80", title: "Smart Formatting", icon: <LayoutTemplate className="w-5 h-5"/> },
    { img: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?ixlib=rb-4.0.3&auto=format&fit=crop&w=1080&q=80", title: "Leave Letters", icon: <PenTool className="w-5 h-5"/> },
    { img: "https://images.unsplash.com/photo-1456324504439-367cee3b3c32?ixlib=rb-4.0.3&auto=format&fit=crop&w=1080&q=80", title: "Margin Alignment", icon: <Edit3 className="w-5 h-5"/> },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % carouselItems.length);
    }, 4000); // Pauses for 4 seconds before sliding
    return () => clearInterval(timer);
  }, [carouselItems.length]);

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

        {/* Amazon-Style Visual Flat Cards Carousel */}
        <div className="relative w-full max-w-7xl mx-auto overflow-hidden mt-12 pb-12 px-4">
          <div className="relative h-48 md:h-80 w-full flex justify-center items-center">
            <AnimatePresence mode="popLayout">
              {carouselItems.map((item, i) => {
                // Calculate position relative to center
                const offset = (i - currentIndex + carouselItems.length) % carouselItems.length;

                // Only show a few items around the center for performance and clarity
                if (offset > 1 && offset < carouselItems.length - 1) return null;

                let initialX = "0%";

                if (offset === 1) {
                  initialX = "50%";
                } else if (offset === carouselItems.length - 1) {
                  initialX = "-50%";
                }

                return (
                  <motion.div
                    key={`${item.title}-${i}`}
                    initial={{ x: initialX, opacity: 0, scale: 0.8 }}
                    animate={{
                      x: offset === 0 ? "0%" : offset === 1 ? "105%" : "-105%",
                      opacity: offset === 0 ? 1 : 0.6,
                      scale: offset === 0 ? 1 : 0.85,
                      zIndex: offset === 0 ? 20 : 10
                    }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    className={`w-[85%] md:w-[600px] h-full rounded-3xl overflow-hidden shadow-2xl border border-gray-200 cursor-pointer bg-white absolute`}
                  >
                    <img src={item.img} alt={item.title} className="absolute inset-0 w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />
                    <div className="absolute bottom-6 left-6 right-6 text-white flex flex-col gap-2">
                      <div className="w-12 h-12 bg-white/20 backdrop-blur-md rounded-2xl flex items-center justify-center border border-white/10 shadow-lg mb-2">
                        {item.icon}
                      </div>
                      <span className="font-black text-2xl md:text-3xl tracking-tight">{item.title}</span>
                    </div>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </div>

          {/* Carousel Indicators */}
          <div className="flex justify-center gap-2 mt-8">
            {carouselItems.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrentIndex(i)}
                className={`h-2 rounded-full transition-all duration-500 ${i === currentIndex ? "w-8 bg-primary" : "w-2 bg-gray-300"}`}
              />
            ))}
          </div>
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
      <section className="w-full bg-primary text-white py-16 md:py-24 border-t border-emerald-400">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 md:w-20 md:h-20 bg-white/20 text-white rounded-2xl mb-6 md:mb-8">
            <Printer className="w-8 h-8 md:w-10 md:h-10" />
          </div>
          <h2 className="text-3xl md:text-5xl lg:text-6xl font-black mb-4 md:mb-6 tracking-tight text-white">Are you a Print Shop?</h2>
          <p className="text-base md:text-xl font-medium mb-8 md:mb-10 text-emerald-50 max-w-2xl mx-auto leading-relaxed px-4">
            Stop dealing with messy formatting and virus-filled flash drives.
            Join our network to receive perfectly formatted, ready-to-print PDFs directly into your dashboard.
          </p>
          {currentUser?.role === 'vendor' ? (
            <Link href="/vendor/dashboard" className="inline-flex items-center gap-2 bg-gray-900 text-white font-bold px-6 py-3 md:px-8 md:py-4 rounded-xl hover:bg-black transition-colors shadow-xl text-sm md:text-base">
              Open Print Dashboard <ArrowRight className="w-5 h-5" />
            </Link>
          ) : (
            <Link href="/vendor/apply" className="inline-flex items-center gap-2 bg-gray-900 text-white font-bold px-6 py-3 md:px-8 md:py-4 rounded-xl hover:bg-black transition-colors shadow-xl text-sm md:text-base">
              Register Your Stationary <ArrowRight className="w-5 h-5" />
            </Link>
          )}
        </div>
      </section>

    </div>
  );
}
