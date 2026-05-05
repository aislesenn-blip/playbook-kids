"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Send, CheckCircle, X, ArrowRight, Terminal, Globe, RefreshCcw, LayoutTemplate, Briefcase, Store, Code2, Sparkles, Database, Layers, PenTool, LayoutDashboard, Users, Mail, Building2, HomeIcon, FileText, Utensils, Search } from "lucide-react";
import Link from "next/link";

const templates = [
  { title: "Portfolio", desc: "Showcase your work", icon: Briefcase, prompt: "A professional portfolio for a freelance designer", image: "https://images.unsplash.com/photo-1634084462412-b54873c0a56d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w4NjMzNTJ8MHwxfHNlYXJjaHwxfHxjcmVhdGl2ZSUyMHdlYiUyMGRlc2lnbiUyMHBvcnRmb2xpbyUyMHNsZWVrfGVufDB8MHx8fDE3NzgwMjAwNjl8MA&ixlib=rb-4.1.0&q=80&w=1080" },
  { title: "E-Commerce", desc: "Sell products online", icon: Store, prompt: "A minimalist e-commerce store for physical products", image: "https://images.unsplash.com/photo-1648134859177-66e35b61e106?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w4NjMzNTJ8MHwxfHNlYXJjaHwxfHxtaW5pbWFsaXN0JTIwZWNvbW1lcmNlJTIwd2Vic2l0ZSUyMHVpJTIwZGVzaWdufGVufDB8MHx8fDE3NzgwMjAwNzB8MA&ixlib=rb-4.1.0&q=80&w=1080" },
  { title: "Landing Page", desc: "Convert visitors", icon: Code2, prompt: "A modern landing page for a SaaS product", image: "https://images.unsplash.com/photo-1642132652860-603f4e3c19b7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w4NjMzNTJ8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBzYWFzJTIwbGFuZGluZyUyMHBhZ2UlMjBkYXNoYm9hcmQlMjBjbGVhbnxlbnwwfDB8fHwxNzc4MDIwMDcxfDA&ixlib=rb-4.1.0&q=80&w=1080" },
  { title: "Personal Blog", desc: "Share your thoughts", icon: PenTool, prompt: "A personal blog about modern technology", image: "https://images.unsplash.com/photo-1490013616775-3ca8865fb129?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w4NjMzNTJ8MHwxfHNlYXJjaHwxfHxtaW5pbWFsaXN0JTIwY2xlYW4lMjBibG9nJTIwd2Vic2l0ZSUyMGRlc2lnbiUyMHR5cG9ncmFwaHl8ZW58MHwwfHx8MTc3ODAyMDA3Mnww&ixlib=rb-4.1.0&q=80&w=1080" },
  { title: "SaaS Dashboard", desc: "Manage metrics", icon: LayoutDashboard, prompt: "A comprehensive SaaS dashboard with charts", image: "https://images.unsplash.com/photo-1776702701448-36220108225d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w4NjMzNTJ8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBhbmFseXRpY3MlMjBkYXNoYm9hcmQlMjB1aSUyMGRlc2lnbiUyMGRhcmslMjBtb2RlfGVufDB8MHx8fDE3NzgwMjAwNzN8MA&ixlib=rb-4.1.0&q=80&w=1080" },
  { title: "Social Network", desc: "Connect with people", icon: Users, prompt: "A community-driven social networking platform", image: "https://images.unsplash.com/photo-1706700392642-dee59f678a09?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w4NjMzNTJ8MHwxfHNlYXJjaHwxfHxjbGVhbiUyMHNvY2lhbCUyMG1lZGlhJTIwYXBwJTIwaW50ZXJmYWNlJTIwZGVzaWdufGVufDB8MHx8fDE3NzgwMjAwNzR8MA&ixlib=rb-4.1.0&q=80&w=1080" },
  { title: "Newsletter", desc: "Send weekly updates", icon: Mail, prompt: "A newsletter subscription landing page", image: "https://images.unsplash.com/photo-1584504923091-71d79a3371b6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w4NjMzNTJ8MHwxfHNlYXJjaHwxfHxuZXdzbGV0dGVyJTIwZW1haWwlMjB0ZW1wbGF0ZSUyMGRlc2lnbiUyMGVsZWdhbnR8ZW58MHwwfHx8MTc3ODAyMDA3NXww&ixlib=rb-4.1.0&q=80&w=1080" },
  { title: "Agency Site", desc: "Corporate website", icon: Building2, prompt: "A corporate website for a digital agency", image: "https://images.unsplash.com/photo-1634084462412-b54873c0a56d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w4NjMzNTJ8MHwxfHNlYXJjaHwxfHxjb3Jwb3JhdGUlMjBidXNpbmVzcyUyMHdlYnNpdGUlMjBkZXNpZ24lMjBwcm9mZXNzaW9uYWx8ZW58MHwwfHx8MTc3ODAyMDA3Nnww&ixlib=rb-4.1.0&q=80&w=1080" },
  { title: "Real Estate", desc: "List properties", icon: HomeIcon, prompt: "A real estate property listing website", image: "https://images.unsplash.com/photo-1591533103012-040525c4d054?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w4NjMzNTJ8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjByZWFsJTIwZXN0YXRlJTIwd2Vic2l0ZSUyMGRlc2lnbiUyMHVpfGVufDB8MHx8fDE3NzgwMjAwNzd8MA&ixlib=rb-4.1.0&q=80&w=1080" },
  { title: "Resume / CV", desc: "Online resume", icon: FileText, prompt: "An interactive online resume and CV", image: "https://images.unsplash.com/photo-1693045181224-9fc2f954f054?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w4NjMzNTJ8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBjbGVhbiUyMHJlc3VtZSUyMGN2JTIwZGVzaWduJTIwdGVtcGxhdGV8ZW58MHwwfHx8MTc3ODAyMDA3OHww&ixlib=rb-4.1.0&q=80&w=1080" },
  { title: "Recipe App", desc: "Discover recipes", icon: Utensils, prompt: "A recipe sharing platform with categories", image: "https://images.unsplash.com/photo-1730817403334-d723c05591e6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w4NjMzNTJ8MHwxfHNlYXJjaHwxfHxmb29kJTIwcmVjaXBlJTIwYXBwJTIwaW50ZXJmYWNlJTIwZGVzaWduJTIwdWl8ZW58MHwwfHx8MTc3ODAyMDA3OXww&ixlib=rb-4.1.0&q=80&w=1080" },
  { title: "Job Board", desc: "Post job openings", icon: Search, prompt: "A specialized job board for remote workers", image: "https://images.unsplash.com/photo-1767449356630-c60094b1d1b4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w4NjMzNTJ8MHwxfHNlYXJjaHwxfHxjbGVhbiUyMGpvYiUyMGJvYXJkJTIwd2Vic2l0ZSUyMGRlc2lnbiUyMFVJfGVufDB8MHx8fDE3NzgwMjAwODB8MA&ixlib=rb-4.1.0&q=80&w=1080" }
];

const placeholders = [
  "A minimalist portfolio for a photographer...",
  "An e-commerce store for handmade ceramics...",
  "A sleek landing page for my new AI startup...",
  "A personal blog about modern technology...",
  "A recipe sharing platform with user accounts...",
];

const backgroundCodes = [
  "function init() { return 'ok'; }",
  "const db = connect();",
  "SELECT * FROM users;",
  "<div className='flex'>Hello</div>",
  "npm install react-dom",
  "git commit -m 'Initial commit'",
  "export default App;",
  "app.listen(3000)",
];

const reactCode = `import React, { useState, useEffect } from 'react';
import { Card, Button, Input } from '@/components/ui';

export default function App() {
  const [data, setData] = useState(null);

  useEffect(() => {
    fetch('/api/init')
      .then(res => res.json())
      .then(setData);
  }, []);

  return (
    <div className="min-h-screen bg-white">
      <nav className="border-b px-6 py-4 flex items-center justify-between">
        <h1 className="text-xl font-bold">Generated App</h1>
        <Button>Login</Button>
      </nav>
      <main className="p-8 max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
        {data ? data.map(item => <Card key={item.id} {...item} />) : <p>Loading...</p>}
      </main>
    </div>
  );
}`;

const sqlCode = `CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  email VARCHAR(255) UNIQUE NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  last_login TIMESTAMP WITH TIME ZONE
);

CREATE TABLE products (
  id UUID PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  price DECIMAL(10, 2) NOT NULL,
  stock_count INTEGER DEFAULT 0
);

CREATE INDEX idx_products_price ON products(price);
`;

const terminalLogs = `[info] Initializing project structure...
[info] Installing dependencies (react, tailwindcss, lucide-react)...
[info] Compiling assets...
[info] Building Next.js application...
[success] Compiled successfully in 1250ms.
[info] Generating static pages (1/5)...
[info] Generating static pages (5/5)...
[info] Pushing to GitHub repository...
[info] Running deployment checks...
[success] Live URL generated.
[success] All systems go! Ready for launch.`;

function TypewriterText({ content, speed = 10 }: { content: string, speed?: number }) {
  const [displayedText, setDisplayedText] = useState("");
  useEffect(() => {
    let i = 0;
    const interval = setInterval(() => {
      setDisplayedText(content.slice(0, i));
      i += 5; // Type chunks for speed
      if (i > content.length) clearInterval(interval);
    }, speed);
    return () => clearInterval(interval);
  }, [content, speed]);

  return <span>{displayedText}</span>;
}

export default function Home() {
  const [prompt, setPrompt] = useState("");
  const [appState, setAppState] = useState<"initial" | "building" | "generated" | "deploying" | "success">("initial");
  const [loadingText, setLoadingText] = useState("Initializing workspace...");
  const [mockUrl, setMockUrl] = useState("");
  const [selectedTemplate, setSelectedTemplate] = useState<typeof templates[0] | null>(null);

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

  const handleBuild = (forcePrompt?: string) => {
    const activePrompt = forcePrompt || prompt;
    if (!activePrompt.trim()) return;
    setAppState("building");

    const stages = [
      "Setting up architecture...",
      "Writing React components...",
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
    }, 2500); // Slightly longer to let the dopamine hit UI play out
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

  const handleNavClick = (navItem: string) => {
    alert(`Navigating to ${navItem}... Wiring ready!`);
  };

  return (
    <div className="w-full min-h-screen bg-[#DDA359] flex flex-col items-center font-sans text-black selection:bg-neutral-800 selection:text-white relative overflow-hidden no-scrollbar">

      {/* Top Navigation */}
      {appState === "initial" && (
        <nav className="w-full flex items-center justify-between p-6 z-20">
          <div className="flex items-center gap-2 text-black font-bold text-2xl tracking-tight">
             <Sparkles className="w-7 h-7" />
             <span>uNiMONDAY</span>
          </div>
          <div className="flex items-center gap-6 text-sm font-bold">
            <button onClick={() => handleNavClick("Showcase")} className="text-black hover:text-neutral-800 transition-colors">Showcase</button>
            <button onClick={() => handleNavClick("Docs")} className="text-black hover:text-neutral-800 transition-colors">Docs</button>
            <button onClick={() => handleNavClick("Sign In")} className="bg-black text-white px-5 py-2.5 rounded-full hover:bg-neutral-800 transition-colors shadow-md">Sign In</button>
          </div>
        </nav>
      )}

      {/* Fading Background Codes for Initial State */}
      {appState === "initial" && (
         <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-[0.04] flex flex-col justify-around z-0">
            {backgroundCodes.map((code, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: i % 2 === 0 ? -100 : 100 }}
                animate={{ opacity: [0, 1, 0], x: i % 2 === 0 ? 100 : -100 }}
                transition={{ duration: 15 + i * 2, repeat: Infinity, ease: "linear", delay: i * 1.5 }}
                className="text-xl font-mono whitespace-nowrap text-black"
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
            className="flex-1 w-full max-w-5xl px-6 flex flex-col items-center justify-center z-10 pb-20 mt-10"
          >
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight text-center mb-4 text-black">
              What do you want to build?
            </h1>
            <p className="text-xl md:text-2xl font-bold text-black/70 text-center mb-10 max-w-2xl">
              From Idea to Live Website in 60 Seconds. No coding required.
            </p>

            <div className="w-full max-w-3xl relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-neutral-400 to-neutral-500 rounded-3xl blur-md opacity-20 group-hover:opacity-40 transition duration-1000" />
              <div className="relative bg-[#DDA359] border-2 border-black/10 rounded-3xl shadow-xl hover:shadow-2xl transition-all p-3 flex flex-col">
                <textarea
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                  placeholder={prompt ? "" : placeholder}
                  className="w-full min-h-[140px] max-h-[400px] p-4 bg-transparent resize-none outline-none text-xl md:text-2xl text-black placeholder:text-black/60 font-bold leading-relaxed"
                  onKeyDown={(e) => {
                    if (e.key === "Enter" && !e.shiftKey) {
                      e.preventDefault();
                      handleBuild();
                    }
                  }}
                />
                <div className="flex justify-between items-center px-4 pb-2 mt-2">
                  <span className="text-xs font-bold text-black/70 uppercase tracking-widest">Press Enter to Build</span>
                  <button
                    onClick={() => handleBuild()}
                    disabled={!prompt.trim()}
                    className="p-4 bg-black hover:bg-neutral-800 disabled:bg-black/20 disabled:text-black/40 text-white rounded-full transition-colors flex items-center justify-center shadow-lg disabled:shadow-none"
                  >
                    <Send className="w-6 h-6" />
                  </button>
                </div>
              </div>
            </div>

            {/* Templates Section - 12 Templates */}
            <div className="mt-20 w-full max-w-6xl pb-20">
               <div className="flex items-center justify-center mb-8 gap-2">
                  <LayoutTemplate className="w-6 h-6 text-black" />
                  <h3 className="text-sm font-bold text-black uppercase tracking-widest">Start with a Template</h3>
               </div>
               <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                  {templates.map((tpl, i) => (
                    <div
                      key={i}
                      onClick={() => setSelectedTemplate(tpl)}
                      className="bg-[#DDA359] border-2 border-black/10 hover:border-black p-5 rounded-2xl cursor-pointer transition-all hover:-translate-y-1 shadow-sm hover:shadow-lg flex flex-col items-center text-center group"
                    >
                       <div className="w-12 h-12 bg-black/5 rounded-full flex items-center justify-center mb-4 group-hover:bg-black group-hover:text-[#DDA359] text-black transition-colors">
                          <tpl.icon className="w-6 h-6" />
                       </div>
                       <h4 className="font-bold text-black mb-1">{tpl.title}</h4>
                       <p className="text-xs font-semibold text-black/60">{tpl.desc}</p>
                    </div>
                  ))}
               </div>
            </div>

            {/* Modal for Template Preview */}
            <AnimatePresence>
              {selectedTemplate && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
                  onClick={() => setSelectedTemplate(null)}
                >
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95, y: 20 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95, y: 20 }}
                    transition={{ type: "spring", damping: 25, stiffness: 300 }}
                    className="w-full max-w-5xl bg-[#FAFAFA] rounded-[32px] overflow-hidden shadow-2xl flex flex-col md:flex-row relative"
                    onClick={(e) => e.stopPropagation()}
                  >
                    {/* Close Button */}
                    <button
                      onClick={() => setSelectedTemplate(null)}
                      className="absolute top-6 right-6 z-10 w-10 h-10 bg-black/5 hover:bg-black/10 rounded-full flex items-center justify-center transition-colors"
                    >
                      <X className="w-5 h-5 text-black" />
                    </button>

                    {/* Left: Image Preview */}
                    <div className="w-full md:w-3/5 h-[300px] md:h-[600px] relative bg-neutral-200">
                      <img
                        src={selectedTemplate.image}
                        alt={selectedTemplate.title}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-r from-black/20 to-transparent" />
                    </div>

                    {/* Right: Content */}
                    <div className="w-full md:w-2/5 p-10 md:p-12 flex flex-col justify-center bg-white">
                      <div className="w-16 h-16 bg-[#DDA359]/20 rounded-2xl flex items-center justify-center mb-8">
                        <selectedTemplate.icon className="w-8 h-8 text-[#DDA359]" />
                      </div>
                      <h2 className="text-4xl font-extrabold text-black mb-4 tracking-tight">{selectedTemplate.title}</h2>
                      <p className="text-lg text-neutral-500 font-medium mb-10 leading-relaxed">
                        {selectedTemplate.desc}. Start with this high-end foundation and customize it to match your exact vision using our AI architect.
                      </p>

                      <button
                        onClick={() => {
                          setPrompt(selectedTemplate.prompt);
                          setSelectedTemplate(null);
                          handleBuild(selectedTemplate.prompt);
                        }}
                        className="w-full py-4 bg-black text-white rounded-2xl font-bold text-lg flex items-center justify-center gap-3 hover:bg-neutral-800 transition-all hover:-translate-y-1 shadow-xl hover:shadow-2xl"
                      >
                        Build This App <ArrowRight className="w-5 h-5" />
                      </button>
                    </div>
                  </motion.div>
                </motion.div>
              )}
            </AnimatePresence>

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
            className="fixed inset-0 bg-[#DDA359] z-50 flex flex-col overflow-hidden"
          >
            {/* Top Status Banner */}
            <div className="w-full bg-black text-white p-5 flex items-center justify-between z-20 shadow-2xl shrink-0 border-b-4 border-[#DDA359]/20">
                <div className="flex items-center gap-4">
                   <Code2 className="w-8 h-8 animate-pulse text-[#DDA359]" />
                   <h2 className="text-2xl font-mono font-bold tracking-tight">System Architecting...</h2>
                </div>
                <div className="text-sm font-mono text-black bg-[#DDA359] px-6 py-2.5 rounded-full font-bold shadow-lg animate-pulse">
                    Status: {loadingText}
                </div>
            </div>

            {/* Content Area - Dark theme for dopamine hit */}
            <div className="flex-1 bg-[#111] p-6 grid grid-cols-1 lg:grid-cols-3 gap-6 overflow-hidden">
                {/* Panel 1: File Structure */}
                <motion.div
                  initial={{ y: 50, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.1 }}
                  className="bg-black border border-neutral-800 rounded-xl p-5 flex flex-col shadow-2xl overflow-hidden"
                >
                    <h3 className="text-white text-sm font-mono border-b border-neutral-800 pb-3 mb-4 flex items-center gap-3"><Layers className="w-5 h-5 text-blue-400"/> File Structure</h3>
                    <div className="flex-1 font-mono text-sm text-neutral-400 overflow-hidden relative">
                         <div className="space-y-2 pb-4">
                           <p className="text-green-400 font-bold">├── src/</p>
                           <p>│   ├── components/</p>
                           <p>│   │   ├── Header.tsx</p>
                           <p>│   │   ├── Hero.tsx</p>
                           <p>│   │   ├── Sidebar.tsx</p>
                           <p>│   │   └── Footer.tsx</p>
                           <p>│   ├── lib/</p>
                           <p>│   │   ├── db.ts</p>
                           <p>│   │   └── utils.ts</p>
                           <p>│   ├── app/</p>
                           <p>│   │   ├── api/</p>
                           <p>│   │   │   └── auth/</p>
                           <p>│   │   ├── page.tsx</p>
                           <p>│   │   ├── layout.tsx</p>
                           <p>│   │   └── globals.css</p>
                           <p>├── package.json</p>
                           <p>├── next.config.js</p>
                           <p>├── tailwind.config.ts</p>
                           <p>└── tsconfig.json</p>
                        </div>
                    </div>
                </motion.div>

                {/* Panel 2: Code Writing */}
                <motion.div
                  initial={{ y: 50, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.2 }}
                  className="bg-black border border-neutral-800 rounded-xl p-5 flex flex-col shadow-2xl lg:col-span-2 overflow-hidden"
                >
                    <h3 className="text-white text-sm font-mono border-b border-neutral-800 pb-3 mb-4 flex items-center gap-3"><Terminal className="w-5 h-5 text-yellow-400"/> Generating Components</h3>
                    <div className="flex-1 font-mono text-xs md:text-sm text-green-400 whitespace-pre-wrap overflow-y-auto no-scrollbar pb-10">
                        <TypewriterText content={reactCode} speed={15} />
                    </div>
                </motion.div>

                {/* Panel 3: Database Schema */}
                <motion.div
                   initial={{ y: 50, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.3 }}
                   className="bg-black border border-neutral-800 rounded-xl p-5 flex flex-col shadow-2xl lg:col-span-1 overflow-hidden"
                >
                    <h3 className="text-white text-sm font-mono border-b border-neutral-800 pb-3 mb-4 flex items-center gap-3"><Database className="w-5 h-5 text-purple-400"/> Database Schema</h3>
                    <div className="flex-1 font-mono text-xs md:text-sm text-pink-400 whitespace-pre-wrap overflow-y-auto no-scrollbar pb-10">
                         <TypewriterText content={sqlCode} speed={30} />
                    </div>
                </motion.div>

                {/* Panel 4: Terminal Logs */}
                <motion.div
                   initial={{ y: 50, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.4 }}
                   className="bg-black border border-neutral-800 rounded-xl p-5 flex flex-col shadow-2xl lg:col-span-2 overflow-hidden"
                >
                    <h3 className="text-white text-sm font-mono border-b border-neutral-800 pb-3 mb-4 flex items-center gap-3"><Terminal className="w-5 h-5 text-gray-400"/> Compilation Logs</h3>
                    <div className="flex-1 font-mono text-xs md:text-sm text-gray-300 space-y-1 overflow-y-auto no-scrollbar pb-10">
                        <TypewriterText content={terminalLogs} speed={40} />
                    </div>
                </motion.div>
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
             <div className="h-16 border-b-2 border-black/10 bg-[#DDA359] px-6 flex items-center justify-between shadow-md">
                <div className="flex items-center gap-4">
                  <button onClick={reset} className="text-black hover:text-neutral-800 transition-colors flex items-center gap-2 text-sm font-bold">
                    <RefreshCcw className="w-5 h-5" /> Start Over
                  </button>
                  <div className="h-6 w-[2px] bg-black/20" />
                  <span className="text-sm font-bold text-black truncate max-w-[200px] sm:max-w-md">
                    &quot;{prompt}&quot;
                  </span>
                </div>
                <button
                  onClick={handleDeploy}
                  className="bg-black hover:bg-neutral-800 text-white px-6 py-2.5 rounded-full text-sm font-bold flex items-center gap-2 transition-colors shadow-lg"
                >
                  <Terminal className="w-4 h-4" /> Deploy to GitHub
                </button>
             </div>

             {/* Canvas Wrapper */}
             <div className="flex-1 p-6 sm:p-12 overflow-hidden flex items-center justify-center">
                <div className="w-full max-w-5xl h-full bg-[#DDA359] rounded-2xl shadow-2xl border-2 border-black/10 overflow-hidden flex flex-col">
                   {/* Browser Chrome */}
                   <div className="h-12 border-b border-black/10 bg-white flex items-center px-4 gap-2">
                      <div className="flex gap-2">
                         <div className="w-3.5 h-3.5 rounded-full bg-red-500" />
                         <div className="w-3.5 h-3.5 rounded-full bg-yellow-500" />
                         <div className="w-3.5 h-3.5 rounded-full bg-green-500" />
                      </div>
                      <div className="ml-4 flex-1 max-w-md mx-auto bg-neutral-100 rounded-md border border-neutral-200 h-8 flex items-center justify-center text-xs text-black font-mono font-bold shadow-inner">
                         localhost:3000
                      </div>
                   </div>
                   {/* Fake Website Content */}
                   <div className="flex-1 p-12 overflow-y-auto bg-white">
                      <div className="max-w-3xl mx-auto space-y-12">
                         <div className="space-y-4 text-center">
                            <div className="w-24 h-24 bg-neutral-200 rounded-3xl mx-auto mb-8 animate-pulse shadow-inner" />
                            <div className="h-12 bg-neutral-200 rounded-xl w-3/4 mx-auto animate-pulse" />
                            <div className="h-4 bg-neutral-200 rounded w-1/2 mx-auto animate-pulse" />
                         </div>
                         <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-12">
                            <div className="h-56 bg-neutral-100 border border-neutral-200 rounded-2xl animate-pulse shadow-sm" />
                            <div className="h-56 bg-neutral-100 border border-neutral-200 rounded-2xl animate-pulse shadow-sm" />
                            <div className="h-56 bg-neutral-100 border border-neutral-200 rounded-2xl animate-pulse shadow-sm" />
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
             <Terminal className="w-24 h-24 text-black animate-bounce mb-8 drop-shadow-lg" />
             <h2 className="text-4xl font-extrabold text-black mb-4 tracking-tight">Deploying to GitHub...</h2>
             <p className="text-black/70 text-xl font-bold">Pushing code and setting up pages</p>
             <div className="w-96 h-4 bg-black/10 rounded-full mt-12 overflow-hidden shadow-inner">
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
             className="flex flex-col items-center justify-center z-10 text-center max-w-lg px-6 flex-1"
          >
             <div className="w-36 h-36 bg-green-500 rounded-full flex items-center justify-center mb-10 relative shadow-2xl">
                <CheckCircle className="w-20 h-20 text-white z-10" />
                <div className="absolute inset-0 border-4 border-green-400 rounded-full animate-ping opacity-50" />
             </div>
             <h2 className="text-5xl font-extrabold text-black mb-6 tracking-tight">Your site is live!</h2>
             <p className="text-black/80 mb-12 text-xl font-bold leading-relaxed">
               We&apos;ve successfully generated and hosted your new website. It&apos;s ready to share with the world.
             </p>

             <div className="w-full bg-[#DDA359] border-2 border-black/20 rounded-2xl p-6 flex items-center justify-between mb-12 shadow-xl hover:shadow-2xl transition-all">
                <div className="flex items-center gap-4 overflow-hidden">
                   <Globe className="w-8 h-8 text-black shrink-0" />
                   <span className="text-black font-mono font-bold text-lg truncate">{mockUrl}</span>
                </div>
                <Link
                  href={mockUrl}
                  target="_blank"
                  className="ml-6 shrink-0 bg-black text-white hover:bg-neutral-800 px-6 py-3 rounded-full text-base font-bold transition-colors shadow-lg"
                  onClick={(e) => { e.preventDefault(); alert("This is a mock prototype. In production, this would open the live site."); }}
                >
                  Visit Site
                </Link>
             </div>

             <button
               onClick={reset}
               className="text-black/70 hover:text-black font-extrabold text-lg transition-colors underline underline-offset-8"
             >
               Build something else
             </button>
          </motion.div>
        )}

      </AnimatePresence>
    </div>
  );
}
