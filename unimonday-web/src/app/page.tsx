"use client";

import { motion, AnimatePresence } from "framer-motion";
import { ShieldCheck, Settings, ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import Link from "next/link";
import { useAppStore } from "@/lib/store/app-store";
import { useEffect, useState } from "react";

const heroBanners = [
  { id: 1, image: "https://images.unsplash.com/photo-1513258496099-48168024aec0?auto=format&fit=crop&w=1920&q=80", alt: "Assignment Drafting" },
  { id: 2, image: "https://images.unsplash.com/photo-1568205612837-017257d2310a?auto=format&fit=crop&w=1920&q=80", alt: "Direct to Printer" },
  { id: 3, image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=1920&q=80", alt: "Smart Formatting" },
  { id: 4, image: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?auto=format&fit=crop&w=1920&q=80", alt: "Leave Letters" },
];

const featureCards = [
  { title: "Smart Formatting", image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=400&q=80", link: "/workspace", linkText: "Try now" },
  { title: "Direct to Printer", image: "https://images.unsplash.com/photo-1568205612837-017257d2310a?w=400&q=80", link: "/print-station", linkText: "Find shops" },
  { title: "Leave Letters", image: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=400&q=80", link: "/workspace", linkText: "Start writing" },
  { title: "Assignment Drafting", image: "https://images.unsplash.com/photo-1513258496099-48168024aec0?w=400&q=80", link: "/workspace", linkText: "Draft now" },
];

export default function Home() {
  const { currentUser } = useAppStore();
  const [currentBanner, setCurrentBanner] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentBanner((prev) => (prev + 1) % heroBanners.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const nextBanner = () => setCurrentBanner((prev) => (prev + 1) % heroBanners.length);
  const prevBanner = () => setCurrentBanner((prev) => (prev - 1 + heroBanners.length) % heroBanners.length);

  return (
    <div className="flex flex-col items-center w-full min-h-screen bg-[#E3E6E6] overflow-x-hidden selection:bg-primary/20 selection:text-primary pb-20">

      {/* Global Trust Prompt */}
      <div className="w-full bg-primary text-white py-2 px-4 text-center font-bold text-sm tracking-wide flex items-center justify-center gap-2 z-20 relative">
        <ShieldCheck className="w-4 h-4 shrink-0" />
        Skip Microsoft Word. Edit documents instantly with your own instructions, spacing. Draw tables. Margins.
      </div>

      {/* Amazon-style Hero Section */}
      <div className="relative w-full bg-[#E3E6E6]">
        {/* Banner Carousel */}
        <div className="relative w-full h-[250px] sm:h-[400px] md:h-[600px] overflow-hidden group">
          <AnimatePresence initial={false}>
            <motion.div
              key={currentBanner}
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ duration: 0.5, ease: "easeInOut" }}
              className="absolute inset-0"
            >
              <img
                src={heroBanners[currentBanner].image}
                alt={heroBanners[currentBanner].alt}
                className="w-full h-full object-cover object-top"
              />
              {/* Amazon style gradient fade at bottom to blend with gray background */}
              <div className="absolute bottom-0 w-full h-1/2 bg-gradient-to-t from-[#E3E6E6] to-transparent" />
              <div className="absolute inset-0 bg-black/10" />
            </motion.div>
          </AnimatePresence>

          {/* Carousel Controls */}
          <button onClick={prevBanner} className="absolute left-4 top-1/4 -translate-y-1/2 bg-transparent text-black p-2 rounded-md hover:border-white/50 border-2 border-transparent transition-all opacity-0 group-hover:opacity-100 z-10 hidden sm:flex items-center justify-center h-48 focus:outline-none">
            <ChevronLeft className="w-12 h-12 drop-shadow-md" />
          </button>
          <button onClick={nextBanner} className="absolute right-4 top-1/4 -translate-y-1/2 bg-transparent text-black p-2 rounded-md hover:border-white/50 border-2 border-transparent transition-all opacity-0 group-hover:opacity-100 z-10 hidden sm:flex items-center justify-center h-48 focus:outline-none">
            <ChevronRight className="w-12 h-12 drop-shadow-md" />
          </button>
        </div>

        {/* Overlapping Grid Cards */}
        <div className="relative z-10 max-w-[1500px] mx-auto px-4 -mt-20 sm:-mt-48 md:-mt-80">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">

            {/* Intro Card / CTA */}
            <div className="bg-white p-4 md:p-5 rounded flex flex-col h-[350px] md:h-[420px] z-20 relative">
              <h2 className="text-xl md:text-2xl font-bold mb-3 text-gray-900 tracking-tight leading-tight">
                Tired of Microsoft Word?<br/>Skip it.
              </h2>
              <div className="flex-grow flex flex-col justify-center items-center text-center bg-emerald-50 rounded p-4 mb-3">
                <Settings className="w-10 h-10 text-emerald-600 mb-3" />
                <p className="text-sm text-gray-700 font-medium">
                  Draw tables, align margins, and edit instantly by just chatting. No hard formatting.
                </p>
              </div>
              <Link href="/workspace" className="mt-auto text-[#007185] hover:text-[#C7511F] hover:underline text-sm md:text-base flex items-center gap-1">
                Enter Workspace
              </Link>
            </div>

            {/* Feature Cards */}
            {featureCards.slice(1).map((card, idx) => (
              <div key={idx} className="bg-white p-4 md:p-5 rounded flex flex-col h-[350px] md:h-[420px] z-20 relative">
                <h2 className="text-xl md:text-2xl font-bold mb-3 text-gray-900">{card.title}</h2>
                <div className="flex-grow relative mb-3 w-full rounded overflow-hidden bg-gray-50">
                  <img src={card.image} alt={card.title} className="w-full h-full object-cover" />
                </div>
                <Link href={card.link} className="mt-auto text-[#007185] hover:text-[#C7511F] hover:underline text-sm md:text-base">
                  {card.linkText}
                </Link>
              </div>
            ))}

            <div className="bg-white p-4 md:p-5 rounded flex flex-col h-[350px] md:h-[420px] z-20 relative">
                <h2 className="text-xl md:text-2xl font-bold mb-3 text-gray-900">Sign in for your best experience</h2>
                <div className="flex-grow flex flex-col justify-center items-center w-full">
                   {!currentUser ? (
                     <Link href="/auth/login" className="w-full bg-[#FFD814] hover:bg-[#F7CA00] text-black text-center py-2 rounded-full font-medium shadow-sm transition-colors text-sm">
                       Sign in securely
                     </Link>
                   ) : (
                     <div className="text-center w-full">
                       <p className="text-gray-600 mb-3 text-sm">Welcome back, {currentUser.name}</p>
                       <Link href="/workspace" className="w-full bg-[#FFD814] hover:bg-[#F7CA00] text-black text-center py-2 px-6 rounded-full font-medium shadow-sm transition-colors text-sm block">
                         Go to Workspace
                       </Link>
                     </div>
                   )}
                </div>
                {!currentUser && (
                  <div className="mt-auto text-sm text-[#007185] text-center w-full">
                    <Link href="/auth/signup" className="hover:text-[#C7511F] hover:underline">Create an account</Link>
                  </div>
                )}
            </div>

          </div>

          {/* Additional Grid Row */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mt-4 md:mt-6 mb-8">
            <div className="bg-white p-4 md:p-5 rounded flex flex-col h-[350px] md:h-[420px]">
              <h2 className="text-xl md:text-2xl font-bold mb-3 text-gray-900">Assignment Drafting</h2>
              <div className="grid grid-cols-2 gap-2 flex-grow mb-3">
                <div className="flex flex-col gap-1">
                  <img src="https://images.unsplash.com/photo-1513258496099-48168024aec0?w=200&q=80" className="w-full h-24 md:h-32 object-cover" alt="img" />
                  <span className="text-xs text-gray-800">Research</span>
                </div>
                <div className="flex flex-col gap-1">
                  <img src="https://images.unsplash.com/photo-1456324504439-367cee3b3c32?w=200&q=80" className="w-full h-24 md:h-32 object-cover" alt="img" />
                  <span className="text-xs text-gray-800">Essays</span>
                </div>
                <div className="flex flex-col gap-1">
                  <img src="https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=200&q=80" className="w-full h-24 md:h-32 object-cover" alt="img" />
                  <span className="text-xs text-gray-800">Letters</span>
                </div>
                <div className="flex flex-col gap-1">
                  <img src="https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=200&q=80" className="w-full h-24 md:h-32 object-cover" alt="img" />
                  <span className="text-xs text-gray-800">Reports</span>
                </div>
              </div>
              <Link href="/workspace" className="mt-auto text-[#007185] hover:text-[#C7511F] hover:underline text-sm md:text-base">
                Explore all formats
              </Link>
            </div>

            <div className="bg-white p-4 md:p-5 rounded flex flex-col h-[350px] md:h-[420px] lg:col-span-3">
               <div className="flex items-center gap-2 mb-3">
                 <h2 className="text-xl md:text-2xl font-bold text-gray-900">Are you a Print Shop?</h2>
                 <Link href="/vendor/apply" className="text-[#007185] hover:text-[#C7511F] hover:underline text-sm">Learn more</Link>
               </div>
               <div className="flex-grow w-full rounded overflow-hidden relative">
                  <img src="https://images.unsplash.com/photo-1568205612837-017257d2310a?w=1200&q=80" alt="Vendor" className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-r from-black/80 to-transparent flex items-center p-6 md:p-8">
                     <div className="max-w-md text-white">
                        <h3 className="text-2xl md:text-3xl font-bold mb-3 text-white">Stop dealing with messy flash drives.</h3>
                        <p className="text-sm md:text-base mb-6 text-gray-200">Join our network to receive perfectly formatted, ready-to-print PDFs directly into your dashboard.</p>
                        <Link href="/vendor/apply" className="bg-[#FFD814] hover:bg-[#F7CA00] text-black py-2 px-6 rounded-full font-medium shadow-sm transition-colors text-sm md:text-base">
                          Register Your Stationary
                        </Link>
                     </div>
                  </div>
               </div>
            </div>

          </div>

        </div>
      </div>

    </div>
  );
}
