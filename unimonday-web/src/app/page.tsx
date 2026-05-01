"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { BrainCircuit, ArrowRight, Zap, Target, Repeat, Upload } from "lucide-react";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  const handleStart = () => {
    router.push("/study");
  };

  return (
    <div className="flex flex-col items-center justify-center w-full overflow-x-hidden selection:bg-primary/20 selection:text-primary">

      {/* Hero Section */}
      <section className="relative w-full max-w-5xl mx-auto pt-20 sm:pt-32 pb-16 sm:pb-24 px-4 flex flex-col items-center text-center">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/5 rounded-full blur-3xl -z-10 pointer-events-none"></div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-8 inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-border shadow-sm"
        >
          <span className="flex w-2 h-2 rounded-full bg-primary animate-pulse"></span>
          <span className="text-sm font-bold text-gray-800 tracking-wide uppercase">Cognitive Study Engine</span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1, ease: "easeOut" }}
          className="text-5xl sm:text-7xl lg:text-8xl font-black tracking-tighter mb-8 text-gray-900 leading-[1.1]"
        >
          Never Forget <br className="hidden sm:block" />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-emerald-400">
            What You Read.
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
          className="text-xl sm:text-2xl text-muted-foreground max-w-2xl mb-12 leading-relaxed font-medium"
        >
          An AI companion that forces you to understand using the Feynman Technique, Active Recall, and Spaced Repetition.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
          className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto"
        >
          <button
            onClick={handleStart}
            className="group inline-flex items-center justify-center gap-3 bg-gray-900 text-white px-10 py-6 rounded-[2rem] font-bold text-xl hover:bg-gray-800 hover:scale-[1.02] transition-all active:scale-95 shadow-xl shadow-gray-900/20"
          >
            Upload Document & Study
            <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
          </button>
        </motion.div>
      </section>

      {/* Visual Demo Section */}
      <motion.section
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1 }}
        className="relative w-full max-w-6xl mx-auto h-[60vh] min-h-[500px] rounded-[3rem] overflow-hidden mb-32 shadow-2xl border-8 border-white/50 backdrop-blur-md bg-gray-900"
      >
        <Image
          src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=2071&auto=format&fit=crop"
          alt="University students studying together"
          fill
          className="object-cover opacity-60 mix-blend-overlay transition-transform hover:scale-105 duration-1000"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/40 to-transparent flex flex-col justify-end p-10 sm:p-16">
          <div className="flex flex-wrap items-center gap-3 mb-6">
            <div className="bg-white/10 backdrop-blur-md px-5 py-2.5 rounded-full text-white text-sm font-bold flex items-center gap-2 border border-white/20">
               <BrainCircuit className="w-4 h-4" /> DeepSeek V4 Powered
            </div>
            <div className="bg-primary/90 backdrop-blur-md px-5 py-2.5 rounded-full text-primary-foreground text-sm font-bold flex items-center gap-2 shadow-lg">
               <Upload className="w-4 h-4" /> 1M Token Context
            </div>
          </div>
          <h2 className="text-white text-5xl sm:text-6xl font-black mb-4 tracking-tight leading-tight">Read 500 Pages.<br/>Retain Everything.</h2>
          <p className="text-white/80 text-xl sm:text-2xl font-medium max-w-2xl leading-relaxed">
            Stop skimming. Our Sequential Chunking forces the AI to analyze your PDF chapter-by-chapter without being lazy.
          </p>
        </div>
      </motion.section>

      {/* Scientific Pedagogy Section */}
      <section className="pb-24 max-w-6xl mx-auto px-4 w-full">
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-black tracking-tight mb-4">Scientific Pedagogy</h2>
          <p className="text-xl text-muted-foreground font-medium max-w-2xl mx-auto">
            We don&apos;t just give you answers. We rewire your brain to understand complex concepts permanently.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <motion.div
            whileHover={{ y: -10 }}
            className="flex flex-col p-10 rounded-[3rem] bg-white border border-border/50 shadow-lg group relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 p-6 opacity-5 group-hover:opacity-10 transition-opacity">
              <Zap className="w-32 h-32" />
            </div>
            <div className="w-16 h-16 bg-blue-50 text-blue-500 rounded-2xl flex items-center justify-center mb-8 relative z-10 border border-blue-100">
              <Zap className="w-8 h-8" />
            </div>
            <h3 className="text-2xl font-black mb-4 relative z-10">The Feynman Technique</h3>
            <p className="text-muted-foreground font-medium leading-relaxed text-lg relative z-10">
              Struggling with Thermodynamics or Asynchronous JS? The AI breaks it down using real-world analogies like daladala traffic or bajaji engines.
            </p>
          </motion.div>

          <motion.div
            whileHover={{ y: -10 }}
            className="flex flex-col p-10 rounded-[3rem] bg-white border border-border/50 shadow-lg group relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 p-6 opacity-5 group-hover:opacity-10 transition-opacity">
              <Target className="w-32 h-32" />
            </div>
            <div className="w-16 h-16 bg-amber-50 text-amber-500 rounded-2xl flex items-center justify-center mb-8 relative z-10 border border-amber-100">
              <Target className="w-8 h-8" />
            </div>
            <h3 className="text-2xl font-black mb-4 relative z-10">Active Recall</h3>
            <p className="text-muted-foreground font-medium leading-relaxed text-lg relative z-10">
              The AI randomly stops and commands you to close your eyes and explain the concept back to it. This hardcodes knowledge into your brain.
            </p>
          </motion.div>

          <motion.div
            whileHover={{ y: -10 }}
            className="flex flex-col p-10 rounded-[3rem] bg-white border border-border/50 shadow-lg group relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 p-6 opacity-5 group-hover:opacity-10 transition-opacity">
              <Repeat className="w-32 h-32" />
            </div>
            <div className="w-16 h-16 bg-primary/10 text-primary rounded-2xl flex items-center justify-center mb-8 relative z-10 border border-primary/20">
              <Repeat className="w-8 h-8" />
            </div>
            <h3 className="text-2xl font-black mb-4 relative z-10">Spaced Repetition (Friday Tests)</h3>
            <p className="text-muted-foreground font-medium leading-relaxed text-lg relative z-10">
              Every mistake you make from Monday to Thursday is logged in Supabase. On Friday, you face a brutal, customized exam on your weak points.
            </p>
          </motion.div>
        </div>
      </section>

    </div>
  );
}
