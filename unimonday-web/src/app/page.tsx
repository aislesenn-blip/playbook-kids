"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Send, CheckCircle, Terminal, Globe, RefreshCcw, LayoutTemplate, Briefcase, Store, Code2, Sparkles, Database, Layers } from "lucide-react";
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
        <nav className="w-full flex items-center justify-between p-6 z-20">
          <div className="flex items-center gap-2 text-black font-semibold text-xl tracking-tight">
             <Sparkles className="w-6 h-6" />
             <span>BuilderAI</span>
          </div>
          <div className="flex items-center gap-6 text-sm font-medium">
            <Link href="#" className="text-neutral-600 hover:text-black transition-colors">Showcase</Link>
            <Link href="#" className="text-neutral-600 hover:text-black transition-colors">Docs</Link>
            <button className="bg-black text-[#DDA359] px-4 py-2 rounded-full hover:bg-neutral-800 transition-colors">Sign In</button>
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

        {/* State: Initial Prompt */}
        {appState === "initial" && (
          <motion.div
            key="initial"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20, filter: "blur(10px)" }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
            className="flex-1 w-full max-w-4xl px-6 flex flex-col items-center justify-center z-10 pb-20 mt-10"
          >
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-center mb-8 text-black">
              What do you want to build?
            </h1>

            <div className="w-full max-w-3xl relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-neutral-200 to-neutral-300 rounded-3xl blur-md opacity-30 group-hover:opacity-60 transition duration-1000" />
              <div className="relative bg-[#DDA359] border border-neutral-300 rounded-3xl shadow-lg hover:shadow-xl transition-all p-3 flex flex-col">
                <textarea
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                  placeholder={prompt ? "" : placeholder}
                  className="w-full min-h-[140px] max-h-[400px] p-4 bg-transparent resize-none outline-none text-xl md:text-2xl text-black placeholder:text-neutral-400 font-medium leading-relaxed"
                  onKeyDown={(e) => {
                    if (e.key === "Enter" && !e.shiftKey) {
                      e.preventDefault();
                      handleBuild();
                    }
                  }}
                />
                <div className="flex justify-between items-center px-4 pb-2 mt-2">
                  <span className="text-xs font-semibold text-neutral-400 uppercase tracking-wider">Press Enter to Build</span>
                  <button
                    onClick={handleBuild}
                    disabled={!prompt.trim()}
                    className="p-4 bg-black hover:bg-neutral-800 disabled:bg-neutral-200 disabled:text-neutral-400 text-white rounded-full transition-colors flex items-center justify-center shadow-md disabled:shadow-none"
                  >
                    <Send className="w-6 h-6" />
                  </button>
                </div>
              </div>
            </div>

            {/* Templates Section */}
            <div className="mt-16 w-full max-w-4xl">
               <div className="flex items-center justify-center mb-6 gap-2">
                  <LayoutTemplate className="w-5 h-5 text-neutral-500" />
                  <h3 className="text-sm font-semibold text-neutral-500 uppercase tracking-widest">Start with a Template</h3>
               </div>
               <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div
                    onClick={() => setPrompt("A professional portfolio for a freelance designer")}
                    className="bg-[#DDA359] border border-neutral-200 hover:border-black p-5 rounded-2xl cursor-pointer transition-all hover:-translate-y-1 shadow-sm hover:shadow-md flex flex-col items-center text-center group"
                  >
                     <div className="w-12 h-12 bg-neutral-100 rounded-full flex items-center justify-center mb-4 group-hover:bg-black group-hover:text-white transition-colors">
                        <Briefcase className="w-6 h-6" />
                     </div>
                     <h4 className="font-semibold text-black mb-1">Portfolio</h4>
                     <p className="text-sm text-neutral-500">Showcase your work and skills</p>
                  </div>

                  <div
                    onClick={() => setPrompt("A minimalist e-commerce store for physical products")}
                    className="bg-[#DDA359] border border-neutral-200 hover:border-black p-5 rounded-2xl cursor-pointer transition-all hover:-translate-y-1 shadow-sm hover:shadow-md flex flex-col items-center text-center group"
                  >
                     <div className="w-12 h-12 bg-neutral-100 rounded-full flex items-center justify-center mb-4 group-hover:bg-black group-hover:text-white transition-colors">
                        <Store className="w-6 h-6" />
                     </div>
                     <h4 className="font-semibold text-black mb-1">E-Commerce</h4>
                     <p className="text-sm text-neutral-500">Sell products online easily</p>
                  </div>

                  <div
                    onClick={() => setPrompt("A modern landing page for a SaaS product")}
                    className="bg-[#DDA359] border border-neutral-200 hover:border-black p-5 rounded-2xl cursor-pointer transition-all hover:-translate-y-1 shadow-sm hover:shadow-md flex flex-col items-center text-center group"
                  >
                     <div className="w-12 h-12 bg-neutral-100 rounded-full flex items-center justify-center mb-4 group-hover:bg-black group-hover:text-white transition-colors">
                        <Code2 className="w-6 h-6" />
                     </div>
                     <h4 className="font-semibold text-black mb-1">Landing Page</h4>
                     <p className="text-sm text-neutral-500">Convert visitors into customers</p>
                  </div>
               </div>
            </div>
          </motion.div>
        )}

        {/* State: Building - Highly Interactive Dopamine Hit */}
        {appState === "building" && (
          <motion.div
            key="building"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="fixed inset-0 bg-[#DDA359] z-50 flex flex-col items-center justify-center overflow-hidden"
          >
            {/* Background Chaos / Construction */}
            <div className="absolute inset-0 pointer-events-none">
               {/* Floating Code Windows */}
               <motion.div
                 initial={{ opacity: 0, x: -100, y: -50 }}
                 animate={{ opacity: [0, 0.5, 0], x: 50, y: 100 }}
                 transition={{ duration: 4, repeat: Infinity, delay: 0.5 }}
                 className="absolute top-20 left-20 bg-black text-[#DDA359] p-4 rounded-lg font-mono text-xs w-64 shadow-2xl"
               >
                 <div className="flex gap-2 mb-2">
                   <div className="w-2 h-2 rounded-full bg-red-500" />
                   <div className="w-2 h-2 rounded-full bg-yellow-500" />
                   <div className="w-2 h-2 rounded-full bg-green-500" />
                 </div>
                 {`function buildLayout() {
  return <MainLayout />
}`}
               </motion.div>

               <motion.div
                 initial={{ opacity: 0, x: 100, y: 50 }}
                 animate={{ opacity: [0, 0.4, 0], x: -50, y: -100 }}
                 transition={{ duration: 3.5, repeat: Infinity, delay: 1 }}
                 className="absolute bottom-32 right-20 bg-white border border-neutral-200 p-4 rounded-lg w-72 shadow-xl"
               >
                 <div className="h-2 bg-neutral-200 w-1/2 mb-3 rounded" />
                 <div className="h-2 bg-neutral-100 w-full mb-2 rounded" />
                 <div className="h-2 bg-neutral-100 w-full mb-2 rounded" />
                 <div className="h-2 bg-neutral-100 w-3/4 rounded" />
               </motion.div>

               {/* Drawing Tables / DBs */}
               <motion.div
                 initial={{ opacity: 0, scale: 0.8 }}
                 animate={{ opacity: [0, 0.6, 0], scale: 1.1 }}
                 transition={{ duration: 5, repeat: Infinity, delay: 2 }}
                 className="absolute top-40 right-40 flex flex-col items-center"
               >
                  <Database className="w-12 h-12 text-neutral-300 mb-2" />
                  <span className="text-xs font-mono text-neutral-400">user_schema.sql</span>
               </motion.div>

               <motion.div
                 initial={{ opacity: 0, scale: 0.8 }}
                 animate={{ opacity: [0, 0.6, 0], scale: 1.1 }}
                 transition={{ duration: 4.5, repeat: Infinity, delay: 1.5 }}
                 className="absolute bottom-40 left-40 flex flex-col items-center"
               >
                  <Layers className="w-12 h-12 text-neutral-300 mb-2" />
                  <span className="text-xs font-mono text-neutral-400">App.tsx</span>
               </motion.div>
            </div>

            {/* Central Loading Status */}
            <div className="relative z-10 flex flex-col items-center bg-[#DDA359]/80 backdrop-blur-md p-12 rounded-3xl border border-neutral-200 shadow-2xl">
              <div className="w-24 h-24 bg-black rounded-full flex items-center justify-center mb-8 shadow-inner relative">
                 <motion.div
                   animate={{ rotate: 360 }}
                   transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                   className="absolute inset-0 rounded-full border-t-4 border-l-4 border-white opacity-50"
                 />
                 <Code2 className="w-10 h-10 text-white" />
              </div>
              <motion.h2
                 key={loadingText}
                 initial={{ opacity: 0, y: 10 }}
                 animate={{ opacity: 1, y: 0 }}
                 exit={{ opacity: 0, y: -10 }}
                 className="text-3xl font-bold text-black tracking-tight mb-2"
              >
                {loadingText}
              </motion.h2>
              <p className="text-neutral-500 font-mono text-sm">AI is writing the code...</p>
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
                  <button onClick={reset} className="text-neutral-600 hover:text-black transition-colors flex items-center gap-2 text-sm font-semibold">
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
                      <div className="ml-4 flex-1 max-w-md mx-auto bg-white rounded-md border border-neutral-200 h-7 flex items-center justify-center text-xs text-neutral-500 font-mono">
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
             <p className="text-neutral-500 text-lg">Pushing code and setting up pages</p>
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
             <p className="text-neutral-600 mb-10 text-lg leading-relaxed">
               We&apos;ve successfully generated and hosted your new website. It&apos;s ready to share with the world.
             </p>

             <div className="w-full bg-white border border-neutral-300 rounded-2xl p-5 flex items-center justify-between mb-10 shadow-lg">
                <div className="flex items-center gap-3 overflow-hidden">
                   <Globe className="w-6 h-6 text-neutral-400 shrink-0" />
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
               className="text-neutral-500 hover:text-black font-bold transition-colors underline underline-offset-4"
             >
               Build something else
             </button>
          </motion.div>
        )}

      </AnimatePresence>
    </div>
  );
}
