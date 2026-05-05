"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Send, Loader2, CheckCircle, Terminal, Globe, RefreshCcw } from "lucide-react";
import Link from "next/link";

export default function BuilderPage() {
  const [prompt, setPrompt] = useState("");
  const [appState, setAppState] = useState<"initial" | "building" | "generated" | "deploying" | "success">("initial");
  const [loadingText, setLoadingText] = useState("Analyzing request...");
  const [mockUrl, setMockUrl] = useState("");

  const handleBuild = () => {
    if (!prompt.trim()) return;
    setAppState("building");

    const stages = [
      "Designing layout...",
      "Writing clean code...",
      "Connecting components...",
      "Polishing UI...",
    ];

    let currentStage = 0;
    const interval = setInterval(() => {
      currentStage++;
      if (currentStage < stages.length) {
        setLoadingText(stages[currentStage]);
      } else {
        clearInterval(interval);
        setAppState("generated");
      }
    }, 1500);
  };

  const handleDeploy = () => {
    setAppState("deploying");
    setTimeout(() => {
      setMockUrl(`https://${prompt.split(" ")[0].toLowerCase().replace(/[^a-z0-9]/g, "") || "my-awesome-app"}.github.io`);
      setAppState("success");
    }, 3000);
  };

  const reset = () => {
    setPrompt("");
    setAppState("initial");
    setMockUrl("");
  };

  return (
    <div className="w-full min-h-screen bg-white flex flex-col items-center justify-center font-sans text-neutral-900 selection:bg-emerald-100 selection:text-emerald-900 relative overflow-hidden">

      {/* Background glow effect for premium feel */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-emerald-50 rounded-full blur-[120px] opacity-60 pointer-events-none" />

      <AnimatePresence mode="wait">

        {/* State: Initial Prompt */}
        {appState === "initial" && (
          <motion.div
            key="initial"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20, filter: "blur(10px)" }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
            className="w-full max-w-3xl px-6 flex flex-col items-center z-10"
          >
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-semibold tracking-tight text-center mb-8 text-neutral-800">
              What do you want to build?
            </h1>

            <div className="w-full relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-emerald-100 to-teal-100 rounded-[2rem] blur opacity-0 group-hover:opacity-100 transition duration-1000 group-hover:duration-200" />
              <div className="relative bg-white border border-neutral-200 rounded-[2rem] shadow-sm hover:shadow-md transition-shadow p-2 flex items-end">
                <textarea
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                  placeholder="e.g. A minimalist portfolio for a photographer..."
                  className="w-full min-h-[120px] max-h-[300px] p-4 bg-transparent resize-none outline-none text-lg text-neutral-800 placeholder:text-neutral-400"
                  onKeyDown={(e) => {
                    if (e.key === "Enter" && !e.shiftKey) {
                      e.preventDefault();
                      handleBuild();
                    }
                  }}
                />
                <button
                  onClick={handleBuild}
                  disabled={!prompt.trim()}
                  className="absolute bottom-4 right-4 p-3 bg-emerald-500 hover:bg-emerald-600 disabled:bg-neutral-100 disabled:text-neutral-300 text-white rounded-full transition-colors flex items-center justify-center shadow-sm disabled:shadow-none"
                >
                  <Send className="w-5 h-5" />
                </button>
              </div>
            </div>

            <div className="mt-8 flex gap-3 text-sm text-neutral-500 flex-wrap justify-center">
               <span className="bg-neutral-50 px-4 py-2 rounded-full border border-neutral-100 cursor-pointer hover:bg-neutral-100 transition-colors" onClick={() => setPrompt("A landing page for my new startup")}>Startup landing page</span>
               <span className="bg-neutral-50 px-4 py-2 rounded-full border border-neutral-100 cursor-pointer hover:bg-neutral-100 transition-colors" onClick={() => setPrompt("A clean blog template for writers")}>Minimalist blog</span>
               <span className="bg-neutral-50 px-4 py-2 rounded-full border border-neutral-100 cursor-pointer hover:bg-neutral-100 transition-colors" onClick={() => setPrompt("An e-commerce store for handmade ceramics")}>E-commerce store</span>
            </div>
          </motion.div>
        )}

        {/* State: Building */}
        {appState === "building" && (
          <motion.div
            key="building"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.05 }}
            transition={{ duration: 0.4 }}
            className="flex flex-col items-center justify-center z-10"
          >
            <div className="w-20 h-20 bg-emerald-50 rounded-full flex items-center justify-center mb-6 shadow-inner">
               <Loader2 className="w-10 h-10 text-emerald-500 animate-spin" />
            </div>
            <motion.h2
               key={loadingText}
               initial={{ opacity: 0, y: 10 }}
               animate={{ opacity: 1, y: 0 }}
               className="text-2xl font-medium text-neutral-800 tracking-tight"
            >
              {loadingText}
            </motion.h2>
          </motion.div>
        )}

        {/* State: Generated Preview */}
        {appState === "generated" && (
          <motion.div
            key="generated"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="w-full h-screen flex flex-col z-10 bg-neutral-50/50"
          >
             {/* Header */}
             <div className="h-16 border-b border-neutral-200 bg-white px-6 flex items-center justify-between shadow-sm">
                <div className="flex items-center gap-4">
                  <button onClick={reset} className="text-neutral-500 hover:text-neutral-800 transition-colors flex items-center gap-2 text-sm font-medium">
                    <RefreshCcw className="w-4 h-4" /> Start Over
                  </button>
                  <div className="h-4 w-[1px] bg-neutral-200" />
                  <span className="text-sm font-medium text-neutral-600 truncate max-w-[200px] sm:max-w-md">
                    &quot;{prompt}&quot;
                  </span>
                </div>
                <button
                  onClick={handleDeploy}
                  className="bg-neutral-900 hover:bg-neutral-800 text-white px-5 py-2 rounded-full text-sm font-medium flex items-center gap-2 transition-colors shadow-sm"
                >
                  <Terminal className="w-4 h-4" /> Deploy to GitHub
                </button>
             </div>

             {/* Canvas Wrapper */}
             <div className="flex-1 p-6 sm:p-12 overflow-hidden flex items-center justify-center">
                <div className="w-full max-w-5xl h-full bg-white rounded-2xl shadow-xl border border-neutral-200 overflow-hidden flex flex-col">
                   {/* Browser Chrome */}
                   <div className="h-12 border-b border-neutral-100 bg-neutral-50 flex items-center px-4 gap-2">
                      <div className="flex gap-1.5">
                         <div className="w-3 h-3 rounded-full bg-red-400" />
                         <div className="w-3 h-3 rounded-full bg-yellow-400" />
                         <div className="w-3 h-3 rounded-full bg-green-400" />
                      </div>
                      <div className="ml-4 flex-1 max-w-md mx-auto bg-white rounded-md border border-neutral-200 h-7 flex items-center justify-center text-xs text-neutral-400 font-mono">
                         localhost:3000
                      </div>
                   </div>
                   {/* Fake Website Content */}
                   <div className="flex-1 p-12 overflow-y-auto">
                      <div className="max-w-3xl mx-auto space-y-12">
                         <div className="space-y-4 text-center">
                            <div className="w-20 h-20 bg-neutral-100 rounded-2xl mx-auto mb-8 animate-pulse" />
                            <div className="h-10 bg-neutral-100 rounded-lg w-3/4 mx-auto animate-pulse" />
                            <div className="h-4 bg-neutral-100 rounded w-1/2 mx-auto animate-pulse" />
                         </div>
                         <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-12">
                            <div className="h-48 bg-neutral-50 border border-neutral-100 rounded-xl animate-pulse" />
                            <div className="h-48 bg-neutral-50 border border-neutral-100 rounded-xl animate-pulse" />
                            <div className="h-48 bg-neutral-50 border border-neutral-100 rounded-xl animate-pulse" />
                         </div>
                      </div>
                   </div>
                </div>
             </div>
          </motion.div>
        )}

        {/* State: Deploying */}
        {appState === "deploying" && (
          <motion.div
             key="deploying"
             initial={{ opacity: 0 }}
             animate={{ opacity: 1 }}
             className="flex flex-col items-center justify-center z-10"
          >
             <Terminal className="w-16 h-16 text-neutral-800 animate-bounce mb-6" />
             <h2 className="text-2xl font-medium text-neutral-800 mb-2">Deploying to GitHub Pages...</h2>
             <p className="text-neutral-500 text-sm">Setting up repository and actions</p>
             <div className="w-64 h-2 bg-neutral-100 rounded-full mt-8 overflow-hidden">
                <motion.div
                  initial={{ width: "0%" }}
                  animate={{ width: "100%" }}
                  transition={{ duration: 3, ease: "easeInOut" }}
                  className="h-full bg-neutral-800 rounded-full"
                />
             </div>
          </motion.div>
        )}

        {/* State: Success */}
        {appState === "success" && (
          <motion.div
             key="success"
             initial={{ opacity: 0, scale: 0.9 }}
             animate={{ opacity: 1, scale: 1 }}
             className="flex flex-col items-center justify-center z-10 text-center max-w-md px-6"
          >
             <div className="w-24 h-24 bg-emerald-50 rounded-full flex items-center justify-center mb-8 relative">
                <CheckCircle className="w-12 h-12 text-emerald-500 z-10" />
                <div className="absolute inset-0 border-4 border-emerald-100 rounded-full animate-ping opacity-50" />
             </div>
             <h2 className="text-3xl font-semibold text-neutral-900 mb-4 tracking-tight">Your site is live!</h2>
             <p className="text-neutral-500 mb-8 leading-relaxed">
               We&apos;ve successfully generated and hosted your new website. It&apos;s ready to share with the world.
             </p>

             <div className="w-full bg-neutral-50 border border-neutral-200 rounded-xl p-4 flex items-center justify-between mb-8 shadow-sm">
                <div className="flex items-center gap-3 overflow-hidden">
                   <Globe className="w-5 h-5 text-neutral-400 shrink-0" />
                   <span className="text-neutral-700 font-mono text-sm truncate">{mockUrl}</span>
                </div>
                <Link
                  href={mockUrl}
                  target="_blank"
                  className="ml-4 shrink-0 bg-white border border-neutral-200 hover:bg-neutral-50 text-neutral-700 px-4 py-1.5 rounded-full text-sm font-medium transition-colors"
                  onClick={(e) => { e.preventDefault(); alert("This is a mock prototype. In production, this would open the live site."); }}
                >
                  Visit Site
                </Link>
             </div>

             <button
               onClick={reset}
               className="text-neutral-500 hover:text-neutral-800 font-medium transition-colors"
             >
               Build something else
             </button>
          </motion.div>
        )}

      </AnimatePresence>
    </div>
  );
}
