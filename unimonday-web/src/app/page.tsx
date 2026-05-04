"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { PenTool, FileText, LayoutTemplate, Printer, ArrowRight, ShieldCheck, Zap, Bot } from "lucide-react";
import Link from "next/link";
import { useAppStore } from "@/lib/store/app-store";

export default function Home() {
  const { currentUser } = useAppStore();

  return (
    <div className="flex flex-col items-center justify-center w-full overflow-x-hidden selection:bg-primary/20 selection:text-primary">

      {/* Global Trust Prompt */}
      <div className="w-full bg-primary text-white py-3 px-4 text-center font-bold text-sm sm:text-base tracking-wide flex items-center justify-center gap-2">
        <ShieldCheck className="w-5 h-5 shrink-0" />
        Your Smart Cloud Stationary. No more formatting struggles. Just print.
      </div>

      {/* Hero Section */}
      <section className="w-full bg-gradient-to-b from-primary/10 to-white pt-24 pb-16 px-4">
        <div className="max-w-6xl mx-auto flex flex-col items-center text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 bg-white text-primary px-4 py-2 rounded-full font-bold text-sm shadow-sm border border-primary/20 mb-8"
          >
            <Bot className="w-4 h-4" /> AI-Powered Document Assistant
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-5xl md:text-7xl font-black text-gray-900 tracking-tight leading-[1.1] mb-6"
          >
            Don&apos;t stress over <br className="hidden md:block"/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-emerald-400">
              formatting.
            </span> Let AI do it.
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-lg md:text-xl text-muted-foreground font-medium max-w-2xl mb-10"
          >
            Upload your rough notes or simply give a prompt. Our AI will perfectly format your letters, assignments, and tables. Send them straight to a local stationary for printing.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto"
          >
            <Link href="/workspace" className="w-full sm:w-auto bg-primary hover:bg-primary/90 text-white font-bold px-8 py-4 rounded-xl transition-all shadow-lg shadow-primary/30 flex items-center justify-center gap-2 text-lg">
              <PenTool className="w-5 h-5" /> Start Formatting Now
            </Link>
            <Link href="/templates" className="w-full sm:w-auto bg-white hover:bg-gray-50 text-gray-900 border border-border font-bold px-8 py-4 rounded-xl transition-all flex items-center justify-center gap-2 text-lg">
              <LayoutTemplate className="w-5 h-5" /> Browse Templates
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Features Showcase */}
      <section className="py-24 max-w-6xl mx-auto px-4 w-full bg-white">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-black tracking-tight mb-4">How It Works</h2>
          <p className="text-xl text-muted-foreground font-medium max-w-2xl mx-auto">
            From raw idea to a perfectly printed document in minutes.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <motion.div whileHover={{ y: -10 }} className="bg-gray-50 rounded-3xl p-8 border border-border flex flex-col items-center text-center">
            <div className="w-16 h-16 bg-blue-100 text-blue-600 rounded-2xl flex items-center justify-center mb-6">
              <Bot className="w-8 h-8" />
            </div>
            <h3 className="text-2xl font-black mb-3">1. Tell the AI</h3>
            <p className="text-muted-foreground font-medium">
              Just type what you need. &quot;Write a permission letter to the Dean&quot; or paste your messy notes. The AI understands.
            </p>
          </motion.div>

          <motion.div whileHover={{ y: -10 }} className="bg-gray-50 rounded-3xl p-8 border border-border flex flex-col items-center text-center">
            <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-2xl flex items-center justify-center mb-6">
              <LayoutTemplate className="w-8 h-8" />
            </div>
            <h3 className="text-2xl font-black mb-3">2. Perfect Formatting</h3>
            <p className="text-muted-foreground font-medium">
              Margins, fonts, bolding, and tables are automatically arranged to perfection. No more struggling with Word.
            </p>
          </motion.div>

          <motion.div whileHover={{ y: -10 }} className="bg-gray-50 rounded-3xl p-8 border border-border flex flex-col items-center text-center">
            <div className="w-16 h-16 bg-purple-100 text-purple-600 rounded-2xl flex items-center justify-center mb-6">
              <Printer className="w-8 h-8" />
            </div>
            <h3 className="text-2xl font-black mb-3">3. Cloud Print</h3>
            <p className="text-muted-foreground font-medium">
              Preview the PDF and send it directly to a registered stationary on campus. Just walk in and pick it up.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Capabilities Section */}
      <section className="py-24 bg-gray-900 text-white w-full">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-4xl md:text-5xl font-black tracking-tight mb-6 leading-tight">
                Everything you need for campus paperwork.
              </h2>
              <p className="text-xl text-gray-400 font-medium mb-10">
                Stop wasting hours trying to format tables or writing formal letters. uNiMONDAY Cloud Stationary is built specifically for students.
              </p>

              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="bg-primary/20 p-3 rounded-xl shrink-0">
                    <FileText className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h4 className="text-xl font-bold mb-1">Official Letters</h4>
                    <p className="text-gray-400">Sponsorship requests, permission letters, and official apologies instantly generated with proper structure.</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="bg-primary/20 p-3 rounded-xl shrink-0">
                    <LayoutTemplate className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h4 className="text-xl font-bold mb-1">Smart Tables & Layouts</h4>
                    <p className="text-gray-400">Need a timetable or budget breakdown? Just provide the data and we&apos;ll draw the perfect table.</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="bg-primary/20 p-3 rounded-xl shrink-0">
                    <Zap className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h4 className="text-xl font-bold mb-1">Document Fixing</h4>
                    <p className="text-gray-400">Upload a messy text document and the AI will fix typos, align margins, and apply headings instantly.</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="relative">
              <div className="bg-gray-800 rounded-3xl p-6 border border-gray-700 shadow-2xl relative z-10">
                 {/* Mockup of workspace */}
                 <div className="flex items-center gap-2 mb-6 border-b border-gray-700 pb-4">
                   <div className="w-3 h-3 rounded-full bg-red-500"></div>
                   <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                   <div className="w-3 h-3 rounded-full bg-green-500"></div>
                   <div className="ml-4 text-xs font-bold text-gray-400 font-mono">workspace.unimonday.com</div>
                 </div>
                 <div className="bg-gray-900 rounded-xl p-4 font-mono text-sm text-gray-300 mb-4 h-32 flex items-center justify-center border border-gray-700">
                    &quot;Write a formal permission letter to the Dean of Students requesting leave for medical reasons for next week.&quot;
                 </div>
                 <div className="flex justify-center">
                    <div className="bg-primary/20 text-primary px-4 py-2 rounded-full text-xs font-bold animate-pulse flex items-center gap-2">
                      <Bot className="w-4 h-4"/> Generating Document...
                    </div>
                 </div>
              </div>
              <div className="absolute top-1/2 -right-8 w-64 h-64 bg-primary/30 blur-[100px] rounded-full z-0 pointer-events-none"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Vendor/Stationary CTA Section */}
      <section className="w-full bg-primary text-white py-24">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-4xl md:text-6xl font-black mb-6 tracking-tight">Own a Stationary Shop?</h2>
          <p className="text-xl font-medium mb-10 text-primary-foreground/90 max-w-2xl mx-auto">
            Join the uNiMONDAY Print Network. Receive formatting-ready PDF print jobs directly from students on campus. No more flash drives with viruses.
          </p>
          {currentUser?.role === 'vendor' ? (
            <Link href="/vendor/dashboard" className="inline-flex items-center gap-2 bg-white text-primary font-bold px-8 py-4 rounded-xl hover:bg-gray-100 transition-colors shadow-lg hover:scale-105 transform duration-200 text-lg">
              Go to Print Dashboard <ArrowRight className="w-5 h-5" />
            </Link>
          ) : (
            <Link href="/vendor/apply" className="inline-flex items-center gap-2 bg-white text-primary font-bold px-8 py-4 rounded-xl hover:bg-gray-100 transition-colors shadow-lg hover:scale-105 transform duration-200 text-lg">
              Register Your Stationary <ArrowRight className="w-5 h-5" />
            </Link>
          )}
        </div>
      </section>

    </div>
  );
}
