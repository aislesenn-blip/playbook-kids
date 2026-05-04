"use client";

import { motion } from "framer-motion";
import { PenTool, FileText, LayoutTemplate, Printer, ArrowRight, ShieldCheck, Zap, UploadCloud, Edit3, Settings } from "lucide-react";
import Link from "next/link";
import { useAppStore } from "@/lib/store/app-store";

export default function Home() {
  const { currentUser } = useAppStore();

  return (
    <div className="flex flex-col items-center justify-center w-full overflow-x-hidden selection:bg-primary/20 selection:text-primary">

      {/* Global Trust Prompt */}
      <div className="w-full bg-primary text-white py-3 px-4 text-center font-bold text-sm sm:text-base tracking-wide flex items-center justify-center gap-2">
        <ShieldCheck className="w-5 h-5 shrink-0" />
        The Ultimate Student Cloud Stationary. Upload. Format. Print.
      </div>

      {/* Hero Section - Apple Tier Copywriting */}
      <section className="w-full bg-gradient-to-b from-gray-50 to-white pt-24 pb-20 px-4 border-b border-border">
        <div className="max-w-5xl mx-auto flex flex-col items-center text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 bg-gray-100 text-gray-800 px-4 py-2 rounded-full font-bold text-sm mb-8 border border-gray-200"
          >
            <Settings className="w-4 h-4" /> AI-Powered Formatting Engine
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-6xl md:text-8xl font-black text-gray-900 tracking-tighter leading-[1.05] mb-6"
          >
            Your work. <br className="hidden md:block"/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-gray-900 to-gray-500">
              Perfectly formatted.
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-xl md:text-2xl text-gray-500 font-medium max-w-3xl mb-12 leading-relaxed"
          >
            We don&apos;t write your assignments. We make them look professional.
            Upload your rough draft, provide a reference style, or type raw notes.
            Our engine fixes grammar, aligns margins, draws complex tables, and outputs a print-ready A4 PDF.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto"
          >
            <Link href="/workspace" className="w-full sm:w-auto bg-gray-900 hover:bg-black text-white font-bold px-10 py-5 rounded-2xl transition-all shadow-xl flex items-center justify-center gap-2 text-lg">
              <UploadCloud className="w-5 h-5" /> Enter Workspace
            </Link>
            <Link href="/templates" className="w-full sm:w-auto bg-white hover:bg-gray-50 text-gray-900 border-2 border-gray-200 font-bold px-10 py-5 rounded-2xl transition-all flex items-center justify-center gap-2 text-lg">
              <LayoutTemplate className="w-5 h-5" /> View Formats
            </Link>
          </motion.div>
        </div>
      </section>

      {/* The Workspace Breakdown */}
      <section className="py-32 max-w-7xl mx-auto px-4 w-full bg-white">
        <div className="text-center mb-20">
          <h2 className="text-4xl md:text-6xl font-black tracking-tight mb-6">A true Stationary Engine.</h2>
          <p className="text-2xl text-gray-500 font-medium max-w-3xl mx-auto">
            Built to handle the specific formatting demands of university coursework.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          <div className="flex flex-col">
            <div className="bg-gray-50 rounded-3xl p-8 h-full border border-gray-200">
              <div className="w-14 h-14 bg-white shadow-sm border border-gray-100 text-gray-900 rounded-2xl flex items-center justify-center mb-8">
                <UploadCloud className="w-6 h-6" />
              </div>
              <h3 className="text-2xl font-black mb-4">1. Bring your content.</h3>
              <p className="text-gray-600 font-medium text-lg leading-relaxed">
                Upload a messy Word document, a text file, or simply type out your raw thoughts. You provide the substance, we handle the presentation.
              </p>
            </div>
          </div>

          <div className="flex flex-col">
            <div className="bg-gray-50 rounded-3xl p-8 h-full border border-gray-200">
              <div className="w-14 h-14 bg-white shadow-sm border border-gray-100 text-gray-900 rounded-2xl flex items-center justify-center mb-8">
                <Settings className="w-6 h-6" />
              </div>
              <h3 className="text-2xl font-black mb-4">2. Instruct the Engine.</h3>
              <p className="text-gray-600 font-medium text-lg leading-relaxed">
                Want it in APA format? Need to extract data into a 4-column table? Have a specific campus cover-page style? Just upload the reference or type the instruction.
              </p>
            </div>
          </div>

          <div className="flex flex-col">
            <div className="bg-gray-50 rounded-3xl p-8 h-full border border-gray-200">
              <div className="w-14 h-14 bg-white shadow-sm border border-gray-100 text-gray-900 rounded-2xl flex items-center justify-center mb-8">
                <Edit3 className="w-6 h-6" />
              </div>
              <h3 className="text-2xl font-black mb-4">3. Refine & Print.</h3>
              <p className="text-gray-600 font-medium text-lg leading-relaxed">
                Review the AI&apos;s output in a live Rich Text Editor. Make manual adjustments to margins, bolding, or headers before sending it directly to a local stationary&apos;s print queue.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Vendor/Stationary CTA Section */}
      <section className="w-full bg-gray-900 text-white py-32 border-t border-gray-800">
        <div className="max-w-5xl mx-auto px-4 text-center">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gray-800 text-white rounded-3xl mb-8 border border-gray-700">
            <Printer className="w-10 h-10" />
          </div>
          <h2 className="text-5xl md:text-7xl font-black mb-8 tracking-tighter">Are you a Print Shop?</h2>
          <p className="text-2xl font-medium mb-12 text-gray-400 max-w-3xl mx-auto leading-relaxed">
            Stop dealing with messy formatting and virus-filled flash drives.
            Join our network to receive perfectly formatted, ready-to-print PDFs directly into your dashboard.
          </p>
          {currentUser?.role === 'vendor' ? (
            <Link href="/vendor/dashboard" className="inline-flex items-center gap-2 bg-white text-gray-900 font-bold px-10 py-5 rounded-2xl hover:bg-gray-100 transition-colors shadow-2xl text-xl">
              Open Print Dashboard <ArrowRight className="w-6 h-6" />
            </Link>
          ) : (
            <Link href="/vendor/apply" className="inline-flex items-center gap-2 bg-white text-gray-900 font-bold px-10 py-5 rounded-2xl hover:bg-gray-100 transition-colors shadow-2xl text-xl">
              Register Your Stationary <ArrowRight className="w-6 h-6" />
            </Link>
          )}
        </div>
      </section>

    </div>
  );
}
