"use client";

import { motion } from "framer-motion";
import { ArrowRight, Sparkles, Volume2, Gamepad2, BrainCircuit } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-col w-full h-full min-h-screen">
      {/* Hero Section */}
      <section className="relative w-full overflow-hidden flex flex-col items-center justify-center pt-24 pb-16 px-4 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-4xl mx-auto flex flex-col items-center"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-primary font-bold mb-8">
            <Sparkles className="w-5 h-5" />
            <span>Meet your new AI companion</span>
          </div>

          <h1 className="text-5xl sm:text-7xl font-black tracking-tighter leading-tight mb-6">
            The Future of <br className="hidden sm:block" />
            <span className="text-primary relative inline-block">
              Language Learning
              <svg className="absolute w-full h-3 -bottom-1 left-0 text-primary opacity-30" viewBox="0 0 100 10" preserveAspectRatio="none">
                <path d="M0 5 Q 50 10 100 5" fill="none" stroke="currentColor" strokeWidth="2" />
              </svg>
            </span>
          </h1>

          <p className="text-xl sm:text-2xl text-foreground/80 font-medium max-w-2xl mx-auto mb-12">
            An AI-powered living universe where learning happens through emotionally engaging conversations, roleplay, and interactive missions.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 w-full justify-center">
            <Link href="/onboarding" className="group relative inline-flex items-center justify-center px-8 py-4 font-bold text-background bg-primary rounded-2xl overflow-hidden transition-transform hover:scale-105 active:scale-95">
              <span className="relative z-10 flex items-center gap-2">
                Start Learning Now <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </span>
            </Link>
            <Link href="/parents" className="group inline-flex items-center justify-center px-8 py-4 font-bold text-primary bg-primary/10 border-2 border-primary rounded-2xl hover:bg-primary/20 transition-colors">
              Parent Dashboard
            </Link>
          </div>
        </motion.div>
      </section>

      {/* Feature Grid */}
      <section className="w-full max-w-7xl mx-auto px-4 py-24">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <motion.div whileHover={{ y: -10 }} className="bg-card p-8 rounded-[2rem] border-2 border-primary shadow-lg flex flex-col items-center text-center">
            <div className="w-16 h-16 bg-primary/10 text-primary rounded-2xl flex items-center justify-center mb-6">
              <Volume2 className="w-8 h-8" />
            </div>
            <h3 className="text-2xl font-black mb-4">Conversational AI</h3>
            <p className="text-foreground/80 font-medium">Learn by speaking. Real-time voice interactions with an emotionally aware AI companion.</p>
          </motion.div>

          <motion.div whileHover={{ y: -10 }} className="bg-card p-8 rounded-[2rem] border-2 border-primary shadow-lg flex flex-col items-center text-center">
            <div className="w-16 h-16 bg-primary/10 text-primary rounded-2xl flex items-center justify-center mb-6">
              <Gamepad2 className="w-8 h-8" />
            </div>
            <h3 className="text-2xl font-black mb-4">Episodic Adventures</h3>
            <p className="text-foreground/80 font-medium">Immersive missions and mini-stories that adapt to your progress and make learning addictive.</p>
          </motion.div>

          <motion.div whileHover={{ y: -10 }} className="bg-card p-8 rounded-[2rem] border-2 border-primary shadow-lg flex flex-col items-center text-center">
            <div className="w-16 h-16 bg-primary/10 text-primary rounded-2xl flex items-center justify-center mb-6">
              <BrainCircuit className="w-8 h-8" />
            </div>
            <h3 className="text-2xl font-black mb-4">Smart Curriculum</h3>
            <p className="text-foreground/80 font-medium">Structured learning paths integrated seamlessly into engaging roleplay and real-world scenarios.</p>
          </motion.div>
        </div>
      </section>

      {/* Live Demo Preview (Visual Only) */}
      <section className="w-full max-w-5xl mx-auto px-4 pb-24">
        <div className="bg-card border-4 border-primary rounded-[3rem] overflow-hidden shadow-2xl relative">
          <div className="absolute inset-0 bg-primary/5 pointer-events-none" />
          <div className="p-8 md:p-12 flex flex-col md:flex-row items-center gap-12">
            <div className="flex-1 space-y-6 relative z-10">
              <h2 className="text-3xl md:text-5xl font-black">Not just a chatbot. <br/> A playful companion.</h2>
              <p className="text-xl text-foreground/80 font-medium">
                The AI adapts its tone, vocabulary, and pacing based on age and skill level. It remembers previous conversations, creating a continuous, personalized universe.
              </p>
              <Link href="/chat" className="inline-flex items-center gap-2 text-primary font-bold text-lg hover:underline mt-4">
                Try a quick conversation <ArrowRight className="w-5 h-5" />
              </Link>
            </div>
            <div className="flex-1 relative w-full aspect-square max-w-md">
              <div className="absolute inset-0 bg-primary/20 rounded-full animate-pulse" />
              <div className="absolute inset-4 bg-primary/40 rounded-full animate-pulse" style={{ animationDelay: "0.5s" }} />
              <div className="absolute inset-0 flex items-center justify-center relative z-10">
                <Image
                  src="https://images.unsplash.com/photo-1616423640778-28d1b53229bd?q=80&w=2000&auto=format&fit=crop"
                  alt="Child interacting with AI"
                  width={300}
                  height={300}
                  className="rounded-full object-cover border-8 border-primary shadow-2xl"
                />
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
