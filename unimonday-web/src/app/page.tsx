"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Send, CheckCircle, Terminal, Globe, RefreshCcw, LayoutTemplate, Briefcase, Store, Code2, Sparkles, Database, Layers, Camera, Pencil, Coffee, Music, Heart, Zap, FolderTree, Cpu, Activity, X, ArrowRight } from "lucide-react";
import Link from "next/link";

const placeholders = [
  "A minimalist portfolio for a photographer...",
  "An e-commerce store for handmade ceramics...",
  "A sleek landing page for my new AI startup...",
  "A personal blog about modern architecture..."
];

const backgroundCodes = [
  "const Layout = ({ children }) => <div className='flex'>{children}</div>;",
  "import { useState } from 'react';",
  "function App() { return <main />; }",
  "export default function HomePage() {}",
  "const db = connect('postgres://...');",
  "app.get('/api/users', (req, res) => res.json(users));",
  "// Initializing UI components...",
  "SELECT * FROM users WHERE active = true;"
];

export default function BuilderPage() {
  const [prompt, setPrompt] = useState("");
  const [appState, setAppState] = useState<"initial" | "building" | "generated" | "deploying" | "success">("initial");
  const [loadingText, setLoadingText] = useState("Setting up pan...");
  const [mockUrl, setMockUrl] = useState("");

  // Typewriter effect state
  const [placeholder, setPlaceholder] = useState("");
  const [phIndex, setPhIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [currentNavView, setCurrentNavView] = useState("home");

  useEffect(() => {
    if (appState !== "initial") return;

    const currentString = placeholders[phIndex];
    let timeout: NodeJS.Timeout;

    if (!isDeleting && charIndex < currentString.length) {
      timeout = setTimeout(() => {
        setPlaceholder(prev => prev + currentString[charIndex]);
        setCharIndex(c => c + 1);
      }, 50); // Typing speed
    } else if (!isDeleting && charIndex === currentString.length) {
      timeout = setTimeout(() => setIsDeleting(true), 2000); // Pause before delete
    } else if (isDeleting && charIndex > 0) {
      timeout = setTimeout(() => {
        setPlaceholder(prev => prev.slice(0, -1));
        setCharIndex(c => c - 1);
      }, 30); // Deleting speed
    } else if (isDeleting && charIndex === 0) {
      timeout = setTimeout(() => {
        setIsDeleting(false);
        setPhIndex((prev) => (prev + 1) % placeholders.length);
      }, 500); // Pause before next string
    }

    return () => clearTimeout(timeout);
  }, [charIndex, isDeleting, phIndex, appState]);

  const handleBuild = () => {
    if (!prompt.trim()) return;
    setAppState("building");

    const stages = [
      "Setting up pan...",
      "Writing components...",
      "Wiring database schemas...",
      "Injecting Tailwind CSS...",
      "Finalizing layout...",
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
    }, 2000);
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
    <div className="w-full min-h-screen bg-[#DDA359] flex flex-col items-center font-sans text-black selection:bg-neutral-200 selection:text-black relative overflow-hidden">

      {/* Top Navigation */}
      {appState === "initial" && (
        <nav className="w-full flex items-center justify-between p-6 z-50 relative">
          <div className="flex items-center gap-2">
            <Sparkles className="w-6 h-6 text-black" />
            <span className="text-xl font-bold tracking-tight text-black">uNiMONDAY</span>
          </div>
          <div className="hidden md:flex items-center gap-8">
            <button onClick={() => setCurrentNavView('showcase')} className="text-sm font-medium text-black hover:text-black/70 transition-colors">Showcase</button>
            <button onClick={() => setCurrentNavView('docs')} className="text-sm font-medium text-black hover:text-black/70 transition-colors">Docs</button>
            <button onClick={() => setShowAuthModal(true)} className="text-sm font-medium bg-black text-white px-5 py-2.5 rounded-full hover:bg-black/80 transition-colors shadow-lg">
              Sign In
            </button>
          </div>
        </nav>
      )}

      {/* Fading Background Codes for Initial State */}
      {appState === "initial" && (
         <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-[0.03] flex flex-col justify-around z-0">
            {backgroundCodes.map((code, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: i % 2 === 0 ? -100 : 100 }}
                animate={{ opacity: [0, 1, 0], x: i % 2 === 0 ? 100 : -100 }}
                transition={{ duration: 15 + i * 2, repeat: Infinity, ease: "linear", delay: i * 1.5 }}
                className="text-xl font-mono whitespace-nowrap"
              >
                {code}
              </motion.div>
            ))}
         </div>
      )}

      <AnimatePresence mode="wait">

        {/* State: Auth Modal */}
        {showAuthModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4">
            <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="bg-white rounded-3xl p-8 max-w-md w-full shadow-2xl relative">
              <button onClick={() => setShowAuthModal(false)} className="absolute top-4 right-4 p-2 text-black/50 hover:text-black bg-neutral-100 rounded-full">
                 <X className="w-5 h-5" />
              </button>
              <h3 className="text-2xl font-bold text-black mb-2">Welcome Back</h3>
              <p className="text-black/60 mb-6">Sign in to your uNiMONDAY account to continue.</p>
              <div className="space-y-4">
                <input type="email" placeholder="Email address" className="w-full px-4 py-3 rounded-xl border border-neutral-200 bg-neutral-50 text-black outline-none focus:border-black transition-colors" />
                <button className="w-full bg-black text-white font-bold py-3 rounded-xl hover:bg-neutral-800 transition-colors">Continue with Email</button>
              </div>
            </motion.div>
          </div>
        )}

        {/* State: Showcase/Docs Views (Mock) */}
        {currentNavView !== 'home' && (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="absolute inset-0 z-40 bg-[#DDA359] flex flex-col items-center justify-center p-8">
             <button onClick={() => setCurrentNavView('home')} className="absolute top-24 left-8 flex items-center gap-2 text-black font-bold hover:underline">
               <ArrowRight className="w-5 h-5 rotate-180" /> Back to Builder
             </button>
             <h2 className="text-5xl font-bold text-black mb-4 capitalize">{currentNavView}</h2>
             <p className="text-xl text-black/80 max-w-2xl text-center">
               This is a mock view for the {currentNavView} section. In production, this would route to a dedicated page.
             </p>
          </motion.div>
        )}


        {/* Nav Views */}
        {appState === "initial" && currentNavView === "showcase" && (
           <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex-1 w-full max-w-6xl px-6 flex flex-col items-center justify-center z-10 text-center">
              <h1 className="text-6xl font-bold text-black mb-6">Made with uNiMONDAY</h1>
              <p className="text-xl text-black/80 max-w-2xl font-medium">Explore incredible projects generated entirely through prompts by our community.</p>
           </motion.div>
        )}

        {appState === "initial" && currentNavView === "docs" && (
           <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex-1 w-full max-w-4xl px-6 flex flex-col items-start justify-center z-10">
              <h1 className="text-6xl font-bold text-black mb-6">Documentation</h1>
              <p className="text-xl text-black/80 font-medium mb-8">Learn how to write the perfect prompts to generate bulletproof frontend and backend code.</p>
              <div className="w-full bg-black/5 border-2 border-black/10 rounded-2xl p-6 font-mono text-sm text-black">npm install builder-ai</div>
           </motion.div>
        )}

        {/* State: Initial Prompt */}
        {appState === "initial" && currentNavView === "home" && (
          <motion.div
            key="initial"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20, filter: "blur(10px)" }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
            className="flex-1 w-full max-w-4xl px-6 flex flex-col items-center justify-center z-10 pb-20 mt-10"
          >
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-center mb-4 text-black">
              What do you want to build?
            </h1>
            <p className="text-lg md:text-xl text-black/80 font-medium text-center max-w-2xl mb-10 leading-relaxed">
              Stop coding. Start shipping. Describe your idea and watch uNiMONDAY generate a production-ready application in seconds.
            </p>

            <div className="w-full max-w-3xl relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-neutral-200 to-neutral-300 rounded-3xl blur-md opacity-30 group-hover:opacity-60 transition duration-1000" />
              <div className="relative bg-[#DDA359] border border-neutral-300 rounded-3xl shadow-lg hover:shadow-xl transition-all p-3 flex flex-col">
                <textarea
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                  placeholder={prompt ? "" : placeholder}
                  className="w-full min-h-[140px] max-h-[400px] p-4 bg-transparent resize-none outline-none text-xl md:text-2xl text-black placeholder:text-black/80 font-medium leading-relaxed"
                  onKeyDown={(e) => {
                    if (e.key === "Enter" && !e.shiftKey) {
                      e.preventDefault();
                      handleBuild();
                    }
                  }}
                />
                <div className="flex justify-between items-center px-4 pb-2 mt-2">
                  <span className="text-xs font-semibold text-black/80 uppercase tracking-wider">Press Enter to Build</span>
                  <button
                    onClick={handleBuild}
                    disabled={!prompt.trim()}
                    className="p-4 bg-black hover:bg-neutral-800 disabled:bg-neutral-200 disabled:text-black/80 text-white rounded-full transition-colors flex items-center justify-center shadow-md disabled:shadow-none"
                  >
                    <Send className="w-6 h-6" />
                  </button>
                </div>
              </div>
            </div>

            {/* Templates Section */}
            <div className="mt-12 w-full max-w-6xl px-4">
               <div className="flex items-center justify-center mb-6 gap-2">
                  <LayoutTemplate className="w-5 h-5 text-black" />
                  <h3 className="text-sm font-bold text-black uppercase tracking-widest">Start with a Template</h3>
               </div>
               <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">

                  <div
                    onClick={() => setPrompt("A professional portfolio for a freelance designer")}
                    className="bg-[#DDA359] border-2 border-black/10 hover:border-black p-4 rounded-2xl cursor-pointer transition-all hover:-translate-y-1 shadow-sm flex flex-col items-center text-center group"
                  >
                     <div className="w-10 h-10 bg-black/5 rounded-full flex items-center justify-center mb-3 group-hover:bg-black group-hover:text-[#DDA359] text-black transition-colors">
                        <Briefcase className="w-5 h-5" />
                     </div>
                     <h4 className="font-bold text-black text-sm mb-1">Portfolio</h4>
                     <p className="text-xs font-medium text-black/80">Showcase your work and skills</p>
                  </div>
                  <div
                    onClick={() => setPrompt("A minimalist e-commerce store for physical products")}
                    className="bg-[#DDA359] border-2 border-black/10 hover:border-black p-4 rounded-2xl cursor-pointer transition-all hover:-translate-y-1 shadow-sm flex flex-col items-center text-center group"
                  >
                     <div className="w-10 h-10 bg-black/5 rounded-full flex items-center justify-center mb-3 group-hover:bg-black group-hover:text-[#DDA359] text-black transition-colors">
                        <Store className="w-5 h-5" />
                     </div>
                     <h4 className="font-bold text-black text-sm mb-1">E-Commerce</h4>
                     <p className="text-xs font-medium text-black/80">Sell products online easily</p>
                  </div>
                  <div
                    onClick={() => setPrompt("A modern landing page for a SaaS product")}
                    className="bg-[#DDA359] border-2 border-black/10 hover:border-black p-4 rounded-2xl cursor-pointer transition-all hover:-translate-y-1 shadow-sm flex flex-col items-center text-center group"
                  >
                     <div className="w-10 h-10 bg-black/5 rounded-full flex items-center justify-center mb-3 group-hover:bg-black group-hover:text-[#DDA359] text-black transition-colors">
                        <Code2 className="w-5 h-5" />
                     </div>
                     <h4 className="font-bold text-black text-sm mb-1">Landing Page</h4>
                     <p className="text-xs font-medium text-black/80">Convert visitors into customers</p>
                  </div>
                  <div
                    onClick={() => setPrompt("A clean, reading-focused blog template")}
                    className="bg-[#DDA359] border-2 border-black/10 hover:border-black p-4 rounded-2xl cursor-pointer transition-all hover:-translate-y-1 shadow-sm flex flex-col items-center text-center group"
                  >
                     <div className="w-10 h-10 bg-black/5 rounded-full flex items-center justify-center mb-3 group-hover:bg-black group-hover:text-[#DDA359] text-black transition-colors">
                        <Pencil className="w-5 h-5" />
                     </div>
                     <h4 className="font-bold text-black text-sm mb-1">Blog</h4>
                     <p className="text-xs font-medium text-black/80">Share your thoughts and stories</p>
                  </div>
                  <div
                    onClick={() => setPrompt("A high-end photography portfolio grid")}
                    className="bg-[#DDA359] border-2 border-black/10 hover:border-black p-4 rounded-2xl cursor-pointer transition-all hover:-translate-y-1 shadow-sm flex flex-col items-center text-center group"
                  >
                     <div className="w-10 h-10 bg-black/5 rounded-full flex items-center justify-center mb-3 group-hover:bg-black group-hover:text-[#DDA359] text-black transition-colors">
                        <Camera className="w-5 h-5" />
                     </div>
                     <h4 className="font-bold text-black text-sm mb-1">Photography</h4>
                     <p className="text-xs font-medium text-black/80">Display your photo gallery</p>
                  </div>
                  <div
                    onClick={() => setPrompt("A cozy cafe website with a menu and booking system")}
                    className="bg-[#DDA359] border-2 border-black/10 hover:border-black p-4 rounded-2xl cursor-pointer transition-all hover:-translate-y-1 shadow-sm flex flex-col items-center text-center group"
                  >
                     <div className="w-10 h-10 bg-black/5 rounded-full flex items-center justify-center mb-3 group-hover:bg-black group-hover:text-[#DDA359] text-black transition-colors">
                        <Coffee className="w-5 h-5" />
                     </div>
                     <h4 className="font-bold text-black text-sm mb-1">Cafe</h4>
                     <p className="text-xs font-medium text-black/80">Menu and reservations</p>
                  </div>
                  <div
                    onClick={() => setPrompt("A dark-themed musician profile with audio player")}
                    className="bg-[#DDA359] border-2 border-black/10 hover:border-black p-4 rounded-2xl cursor-pointer transition-all hover:-translate-y-1 shadow-sm flex flex-col items-center text-center group"
                  >
                     <div className="w-10 h-10 bg-black/5 rounded-full flex items-center justify-center mb-3 group-hover:bg-black group-hover:text-[#DDA359] text-black transition-colors">
                        <Music className="w-5 h-5" />
                     </div>
                     <h4 className="font-bold text-black text-sm mb-1">Music</h4>
                     <p className="text-xs font-medium text-black/80">Tracks and tour dates</p>
                  </div>
                  <div
                    onClick={() => setPrompt("A charity website focused on storytelling and donations")}
                    className="bg-[#DDA359] border-2 border-black/10 hover:border-black p-4 rounded-2xl cursor-pointer transition-all hover:-translate-y-1 shadow-sm flex flex-col items-center text-center group"
                  >
                     <div className="w-10 h-10 bg-black/5 rounded-full flex items-center justify-center mb-3 group-hover:bg-black group-hover:text-[#DDA359] text-black transition-colors">
                        <Heart className="w-5 h-5" />
                     </div>
                     <h4 className="font-bold text-black text-sm mb-1">Non-Profit</h4>
                     <p className="text-xs font-medium text-black/80">Collect donations & awareness</p>
                  </div>
                  <div
                    onClick={() => setPrompt("An energetic tech startup landing page")}
                    className="bg-[#DDA359] border-2 border-black/10 hover:border-black p-4 rounded-2xl cursor-pointer transition-all hover:-translate-y-1 shadow-sm flex flex-col items-center text-center group"
                  >
                     <div className="w-10 h-10 bg-black/5 rounded-full flex items-center justify-center mb-3 group-hover:bg-black group-hover:text-[#DDA359] text-black transition-colors">
                        <Zap className="w-5 h-5" />
                     </div>
                     <h4 className="font-bold text-black text-sm mb-1">Startup</h4>
                     <p className="text-xs font-medium text-black/80">Launch your new idea fast</p>
                  </div>
                  <div
                    onClick={() => setPrompt("A bold creative agency portfolio")}
                    className="bg-[#DDA359] border-2 border-black/10 hover:border-black p-4 rounded-2xl cursor-pointer transition-all hover:-translate-y-1 shadow-sm flex flex-col items-center text-center group"
                  >
                     <div className="w-10 h-10 bg-black/5 rounded-full flex items-center justify-center mb-3 group-hover:bg-black group-hover:text-[#DDA359] text-black transition-colors">
                        <Layers className="w-5 h-5" />
                     </div>
                     <h4 className="font-bold text-black text-sm mb-1">Agency</h4>
                     <p className="text-xs font-medium text-black/80">Creative studio showcase</p>
                  </div>
                  <div
                    onClick={() => setPrompt("A local business directory with search and filters")}
                    className="bg-[#DDA359] border-2 border-black/10 hover:border-black p-4 rounded-2xl cursor-pointer transition-all hover:-translate-y-1 shadow-sm flex flex-col items-center text-center group"
                  >
                     <div className="w-10 h-10 bg-black/5 rounded-full flex items-center justify-center mb-3 group-hover:bg-black group-hover:text-[#DDA359] text-black transition-colors">
                        <FolderTree className="w-5 h-5" />
                     </div>
                     <h4 className="font-bold text-black text-sm mb-1">Directory</h4>
                     <p className="text-xs font-medium text-black/80">Listings and categories</p>
                  </div>
                  <div
                    onClick={() => setPrompt("A SaaS admin dashboard layout with charts")}
                    className="bg-[#DDA359] border-2 border-black/10 hover:border-black p-4 rounded-2xl cursor-pointer transition-all hover:-translate-y-1 shadow-sm flex flex-col items-center text-center group"
                  >
                     <div className="w-10 h-10 bg-black/5 rounded-full flex items-center justify-center mb-3 group-hover:bg-black group-hover:text-[#DDA359] text-black transition-colors">
                        <Activity className="w-5 h-5" />
                     </div>
                     <h4 className="font-bold text-black text-sm mb-1">Dashboard</h4>
                     <p className="text-xs font-medium text-black/80">Analytics and metrics</p>
                  </div>
               </div>
            </div>
          </motion.div>
        )}

                {/* State: Building - Full Screen IDE App Builder Experience */}
        {appState === "building" && (
          <motion.div
            key="building"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-[#DDA359] z-50 flex flex-col"
          >
             {/* Header Bar */}
             <div className="h-16 border-b-2 border-black flex items-center justify-between px-6 bg-[#DDA359]">
               <div className="flex items-center gap-3">
                  <Cpu className="w-6 h-6 text-black animate-pulse" />
                  <span className="font-bold text-black text-xl">Builder Engine Active</span>
               </div>
               <div className="flex items-center gap-2 bg-black text-[#DDA359] px-6 py-2 rounded-full font-mono text-sm font-bold shadow-[4px_4px_0px_0px_rgba(0,0,0,0.3)]">
                 <motion.span
                   key={loadingText}
                   initial={{ opacity: 0, y: 5 }} animate={{ opacity: 1, y: 0 }}
                 >
                   &gt; {loadingText}
                 </motion.span>
                 <span className="w-2 h-4 bg-[#DDA359] animate-pulse ml-1" />
               </div>
             </div>

             {/* IDE Layout */}
             <div className="flex-1 flex overflow-hidden">
                {/* Left Sidebar - File Structure */}
                <div className="w-64 border-r-2 border-black p-4 flex flex-col">
                   <div className="text-xs font-bold text-black/60 tracking-widest uppercase mb-4">Project Structure</div>
                   <div className="space-y-3 font-mono text-sm font-bold text-black">
                      <motion.div initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 }} className="flex items-center gap-2">
                        <FolderTree className="w-4 h-4 text-black" /> src/
                      </motion.div>
                      <motion.div initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.6 }} className="flex items-center gap-2 pl-4">
                        <Layers className="w-4 h-4 text-black" /> components/
                      </motion.div>
                      <motion.div initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 1.0 }} className="flex items-center gap-2 pl-8">
                        <Code2 className="w-4 h-4 text-black" /> Header.tsx
                      </motion.div>
                      <motion.div initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 1.4 }} className="flex items-center gap-2 pl-8">
                        <Code2 className="w-4 h-4 text-black" /> Layout.tsx
                      </motion.div>
                      <motion.div initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 1.8 }} className="flex items-center gap-2 pl-4">
                        <Database className="w-4 h-4 text-black" /> lib/db.ts
                      </motion.div>
                      <motion.div initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 2.2 }} className="flex items-center gap-2 pl-4">
                        <Terminal className="w-4 h-4 text-black" /> api/route.ts
                      </motion.div>
                   </div>
                </div>

                {/* Main Content Area - Code Editor & Logs */}
                <div className="flex-1 flex flex-col">
                   {/* Code Editor */}
                   <div className="flex-1 p-6 relative">
                      <div className="absolute inset-4 border-2 border-black rounded-xl bg-[#DDA359]/50 overflow-hidden flex flex-col shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
                         <div className="h-10 border-b-2 border-black flex items-center px-4 gap-2 bg-[#DDA359]">
                            <div className="w-3 h-3 rounded-full bg-black" />
                            <div className="w-3 h-3 rounded-full bg-black/60" />
                            <div className="w-3 h-3 rounded-full bg-black/30" />
                            <span className="ml-4 font-mono text-xs font-bold text-black/80">App.tsx</span>
                         </div>
                         <div className="p-6 font-mono text-sm font-bold text-black leading-relaxed whitespace-pre overflow-hidden">
                            <motion.div
                              initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}
                            >
                               {`import { useState, useEffect } from "react";
import { MainLayout } from "./components/Layout";
import { Header } from "./components/Header";

export default function App() {
  const [data, setData] = useState(null);

  useEffect(() => {
    // Initializing components...`}
                            </motion.div>
                            <motion.div
                              initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 2, duration: 0.5 }}
                            >
                               {`    fetch("/api/init").then(res => res.json()).then(setData);
  }, []);

  return (
    <MainLayout>
      <Header title="Generated App" />
      <main>
        {/* Content injected here */}
      </main>
    </MainLayout>
  );
}`}
                            </motion.div>
                         </div>
                      </div>
                   </div>

                   {/* Terminal/Logs Bottom Panel */}
                   <div className="h-48 border-t-2 border-black bg-black p-4 font-mono text-sm text-green-400 overflow-y-auto">
                      <div className="flex gap-2 mb-2"><span className="text-white">root@builder:~#</span> npm install dependencies</div>
                      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }} className="text-white/60">Installing react, react-dom, tailwindcss...</motion.div>
                      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.5 }} className="text-white/60">Resolving packages...</motion.div>
                      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 2.5 }} className="text-[#DDA359]">✓ Added 342 packages in 2s</motion.div>
                      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 3.5 }} className="flex gap-2 mt-2"><span className="text-white">root@builder:~#</span> configuring database schema</motion.div>
                      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 4.5 }} className="text-[#DDA359]">✓ Connected to DB</motion.div>
                   </div>
                </div>
             </div>
          </motion.div>
        )}

{/* State: Generated Preview */}
        {appState === "generated" && (
          <motion.div
            key="generated"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="w-full h-screen flex flex-col z-10 bg-neutral-100"
          >
             {/* Header */}
             <div className="h-16 border-b border-neutral-300 bg-[#DDA359] px-6 flex items-center justify-between shadow-sm">
                <div className="flex items-center gap-4">
                  <button onClick={reset} className="text-black hover:text-black transition-colors flex items-center gap-2 text-sm font-semibold">
                    <RefreshCcw className="w-4 h-4" /> Start Over
                  </button>
                  <div className="h-4 w-[1px] bg-neutral-300" />
                  <span className="text-sm font-semibold text-black truncate max-w-[200px] sm:max-w-md">
                    &quot;{prompt}&quot;
                  </span>
                </div>
                <button
                  onClick={handleDeploy}
                  className="bg-black hover:bg-neutral-800 text-white px-5 py-2.5 rounded-full text-sm font-semibold flex items-center gap-2 transition-colors shadow-sm"
                >
                  <Terminal className="w-4 h-4" /> Deploy to GitHub
                </button>
             </div>

             {/* Canvas Wrapper */}
             <div className="flex-1 p-6 sm:p-12 overflow-hidden flex items-center justify-center">
                <div className="w-full max-w-5xl h-full bg-[#DDA359] rounded-2xl shadow-2xl border border-neutral-300 overflow-hidden flex flex-col">
                   {/* Browser Chrome */}
                   <div className="h-12 border-b border-neutral-200 bg-neutral-100 flex items-center px-4 gap-2">
                      <div className="flex gap-1.5">
                         <div className="w-3 h-3 rounded-full bg-red-400" />
                         <div className="w-3 h-3 rounded-full bg-yellow-400" />
                         <div className="w-3 h-3 rounded-full bg-green-400" />
                      </div>
                      <div className="ml-4 flex-1 max-w-md mx-auto bg-white rounded-md border border-neutral-200 h-7 flex items-center justify-center text-xs text-black/80 font-mono">
                         localhost:3000
                      </div>
                   </div>
                   {/* Fake Website Content */}
                   <div className="flex-1 p-12 overflow-y-auto bg-white">
                      <div className="max-w-3xl mx-auto space-y-12">
                         <div className="space-y-4 text-center">
                            <div className="w-24 h-24 bg-neutral-100 rounded-3xl mx-auto mb-8 animate-pulse" />
                            <div className="h-12 bg-neutral-100 rounded-xl w-3/4 mx-auto animate-pulse" />
                            <div className="h-4 bg-neutral-100 rounded w-1/2 mx-auto animate-pulse" />
                         </div>
                         <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-12">
                            <div className="h-56 bg-neutral-50 border border-neutral-200 rounded-2xl animate-pulse" />
                            <div className="h-56 bg-neutral-50 border border-neutral-200 rounded-2xl animate-pulse" />
                            <div className="h-56 bg-neutral-50 border border-neutral-200 rounded-2xl animate-pulse" />
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
             className="flex flex-col items-center justify-center z-10 flex-1"
          >
             <Terminal className="w-20 h-20 text-black animate-bounce mb-8" />
             <h2 className="text-3xl font-bold text-black mb-3 tracking-tight">Deploying to GitHub...</h2>
             <p className="text-black/80 text-lg">Pushing code and setting up pages</p>
             <div className="w-80 h-3 bg-neutral-200 rounded-full mt-10 overflow-hidden">
                <motion.div
                  initial={{ width: "0%" }}
                  animate={{ width: "100%" }}
                  transition={{ duration: 3, ease: "easeInOut" }}
                  className="h-full bg-black rounded-full"
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
             className="flex flex-col items-center justify-center z-10 text-center max-w-md px-6 flex-1"
          >
             <div className="w-32 h-32 bg-green-50 rounded-full flex items-center justify-center mb-10 relative">
                <CheckCircle className="w-16 h-16 text-green-600 z-10" />
                <div className="absolute inset-0 border-4 border-green-200 rounded-full animate-ping opacity-50" />
             </div>
             <h2 className="text-4xl font-bold text-black mb-4 tracking-tight">Your site is live!</h2>
             <p className="text-black mb-10 text-lg leading-relaxed">
               We&apos;ve successfully generated and hosted your new website. It&apos;s ready to share with the world.
             </p>

             <div className="w-full bg-white border border-neutral-300 rounded-2xl p-5 flex items-center justify-between mb-10 shadow-lg">
                <div className="flex items-center gap-3 overflow-hidden">
                   <Globe className="w-6 h-6 text-black/80 shrink-0" />
                   <span className="text-black font-mono text-base truncate">{mockUrl}</span>
                </div>
                <Link
                  href={mockUrl}
                  target="_blank"
                  className="ml-4 shrink-0 bg-black text-white hover:bg-neutral-800 px-5 py-2 rounded-full text-sm font-semibold transition-colors"
                  onClick={(e) => { e.preventDefault(); alert("This is a mock prototype. In production, this would open the live site."); }}
                >
                  Visit Site
                </Link>
             </div>

             <button
               onClick={reset}
               className="text-black/80 hover:text-black font-bold transition-colors underline underline-offset-4"
             >
               Build something else
             </button>
          </motion.div>
        )}

      </AnimatePresence>
    </div>
  );
}
