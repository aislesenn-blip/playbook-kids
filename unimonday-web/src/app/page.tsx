"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Send, Code, ArrowUp, CheckCircle, X, ArrowRight, Terminal, Globe, RefreshCcw, LayoutTemplate, Briefcase, Store, Code2, Sparkles, Database, Layers, PenTool, LayoutDashboard, Users, Mail, Building2, HomeIcon, FileText, Utensils, Search } from "lucide-react";
import Link from "next/link";
import { supabase } from "@/lib/supabase/client";

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
  const [appState, setAppState] = useState<"initial" | "building" | "generated" | "deploying" | "success" | "showcase" | "docs">("initial");
  const [loadingText, setLoadingText] = useState("Initializing workspace...");
  const [mockUrl, setMockUrl] = useState("");
  const [selectedTemplate, setSelectedTemplate] = useState<typeof templates[0] | null>(null);

  const [placeholder, setPlaceholder] = useState("");
  const [phIndex, setPhIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  const [terminalLogsState, setTerminalLogsState] = useState("");
  const [sqlCodeState, setSqlCodeState] = useState("<!-- Waiting for HTML -->");
  const [dynamicReactCode, setDynamicReactCode] = useState("// Waiting for JS...");
  const [dynamicCssCode, setDynamicCssCode] = useState("/* Waiting for CSS... */");
  const [isGenerating, setIsGenerating] = useState(false);

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

  const animateCodeTyping = async (code: string, setter: React.Dispatch<React.SetStateAction<string>>) => {
    // Simulated Typewriter effect for "Dopamine Hits" while the code is fully generated
    // Since we receive it all at once per phase, we simulate the drop-in quickly
    setter("");
    const chunks = code.match(/.{1,15}/g) || [code];
    let current = "";
    for (const chunk of chunks) {
      current += chunk;
      setter(current);
      await new Promise(r => setTimeout(r, 10)); // Ultra-fast typewriter
    }
  };

  const handleBuild = async (forcePrompt?: string) => {
    const activePrompt = forcePrompt || prompt;
    if (!activePrompt.trim()) return;
    setAppState("building");
    setTerminalLogsState("Initializing build process...\n");
    setSqlCodeState("<!-- Waiting for HTML... -->\n");
    setDynamicReactCode("// Waiting for Logic/PRD...\n");
    setDynamicCssCode("/* Waiting for CSS... */\n");

    try {
      // Phase 1: Architecting
      setTerminalLogsState(prev => prev + "\n[Phase 1/4] 🧠 Brainstorming & Architecting Product End-to-End...\n");
      const architectRes = await fetch('/api/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'architect', prompt: activePrompt })
      });
      if (!architectRes.ok) throw new Error("Architecture Phase Failed");
      const prdData = await architectRes.json();
      setTerminalLogsState(prev => prev + "=> Architecture Complete. PRD Generated.\n");
      await animateCodeTyping("// PRD Generated:\n" + JSON.stringify(prdData, null, 2), setDynamicReactCode);

      // Phase 2: HTML
      setTerminalLogsState(prev => prev + "\n[Phase 2/4] 🏗️ Building Full HTML Layout based on PRD...\n");
      const htmlRes = await fetch('/api/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'build_html', prd: prdData })
      });
      if (!htmlRes.ok) throw new Error("HTML Phase Failed");
      const htmlData = await htmlRes.json();
      const finalHtml = htmlData.code || "";
      setTerminalLogsState(prev => prev + "=> HTML compiled successfully.\n");
      await animateCodeTyping(finalHtml, setSqlCodeState);

      // Phase 3: CSS
      setTerminalLogsState(prev => prev + "\n[Phase 3/4] 🎨 Applying Aesthetics & Custom CSS...\n");
      const cssRes = await fetch('/api/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'build_css', prd: prdData, html: finalHtml })
      });
      if (!cssRes.ok) throw new Error("CSS Phase Failed");
      const cssData = await cssRes.json();
      const finalCss = cssData.code || "";
      setTerminalLogsState(prev => prev + "=> CSS applied successfully.\n");
      await animateCodeTyping(finalCss, setDynamicCssCode);

      // Phase 4: JS
      setTerminalLogsState(prev => prev + "\n[Phase 4/4] ⚙️ Wiring Logic & External APIs (Leaflet, etc)...\n");
      const jsRes = await fetch('/api/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'build_js', prd: prdData, html: finalHtml, css: finalCss })
      });
      if (!jsRes.ok) throw new Error("JS Phase Failed");
      const jsData = await jsRes.json();
      const finalJs = jsData.code || "";
      setTerminalLogsState(prev => prev + "=> Logic compiled successfully.\n");
      await animateCodeTyping(finalJs, setDynamicReactCode);


      setTerminalLogsState(prev => prev + "\nFinalizing and Saving to Database...\n");
      const appId = "app-" + Math.random().toString(36).substring(2, 11);
      const { error: dbError } = await supabase
        .from('generated_apps')
        .insert({ app_id: appId, html: finalHtml, css: finalCss, js: finalJs, prompt: activePrompt });

      if (dbError) {
         console.error("Supabase Save Error:", dbError);
         setTerminalLogsState(prev => prev + "=> Warning: Supabase save failed. Proceeding with mock preview.\n");
      } else {
         setTerminalLogsState(prev => prev + "=> Saved to Database successfully.\n");
      }

      setTerminalLogsState(prev => prev + "Deployment successful. Retrieving link...\n");
      setMockUrl(`/preview/${appId}`);
      setAppState("success");
      setIsGenerating(false);

    } catch (error) {
      console.error(error);
      setTerminalLogsState(prev => prev + "Error: Build failed or Server Timeout. Please try again.\n");
      setIsGenerating(false);
      setTimeout(() => {
        setAppState("initial");
      }, 4000);
    }
  };  const reset = () => {
    setPrompt("");
    setAppState("initial");
    setMockUrl("");
  };

  const handleNavClick = (navItem: string) => {
    if (navItem === "Showcase") setAppState("showcase");
    else if (navItem === "Docs") setAppState("docs");
  };

  return (
    <div className="w-full min-h-screen bg-[#DDA359] flex flex-col items-center font-sans text-black selection:bg-neutral-800 selection:text-white relative overflow-hidden no-scrollbar">

      {/* Top Navigation */}
      {appState === "initial" && (
        <nav className="w-full flex items-center justify-between p-6 z-20">
          <div className="flex items-center gap-1 text-black font-extrabold text-2xl tracking-tight">
             <Code className="w-7 h-7 mr-1 text-black" />
             <span>CODE</span>
             <span className="text-black/60">BOOK</span>
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
                {/* Panel 1: HTML Architecture */}
                <motion.div
                  initial={{ y: 50, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.1 }}
                  className="bg-black border border-neutral-800 rounded-xl p-5 flex flex-col shadow-2xl overflow-hidden"
                >
                    <h3 className="text-white text-sm font-mono border-b border-neutral-800 pb-3 mb-4 flex items-center gap-3"><Layers className="w-5 h-5 text-blue-400"/> HTML Architecture</h3>
                    <div className="flex-1 font-mono text-xs md:text-sm text-blue-400 whitespace-pre-wrap overflow-y-auto no-scrollbar pb-10">
                         <TypewriterText content={sqlCodeState} speed={30} />
                    </div>
                </motion.div>

                {/* Panel 2: React/JS Logic */}
                <motion.div
                  initial={{ y: 50, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.2 }}
                  className="bg-black border border-neutral-800 rounded-xl p-5 flex flex-col shadow-2xl lg:col-span-2 overflow-hidden"
                >
                    <h3 className="text-white text-sm font-mono border-b border-neutral-800 pb-3 mb-4 flex items-center gap-3"><Terminal className="w-5 h-5 text-yellow-400"/> React/JS Logic</h3>
                    <div className="flex-1 font-mono text-xs md:text-sm text-green-400 whitespace-pre-wrap overflow-y-auto no-scrollbar pb-10">
                        <TypewriterText content={dynamicReactCode} speed={15} />
                    </div>
                </motion.div>

                {/* Panel 3: CSS/Styling */}
                <motion.div
                   initial={{ y: 50, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.3 }}
                   className="bg-black border border-neutral-800 rounded-xl p-5 flex flex-col shadow-2xl lg:col-span-1 overflow-hidden"
                >
                    <h3 className="text-white text-sm font-mono border-b border-neutral-800 pb-3 mb-4 flex items-center gap-3"><Database className="w-5 h-5 text-purple-400"/> CSS/Styling</h3>
                    <div className="flex-1 font-mono text-xs md:text-sm text-pink-400 whitespace-pre-wrap overflow-y-auto no-scrollbar pb-10">
                         <TypewriterText content={dynamicCssCode} speed={30} />
                    </div>
                </motion.div>

                {/* Panel 4: Terminal Logs */}
                <motion.div
                   initial={{ y: 50, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.4 }}
                   className="bg-black border border-neutral-800 rounded-xl p-5 flex flex-col shadow-2xl lg:col-span-2 overflow-hidden"
                >
                    <h3 className="text-white text-sm font-mono border-b border-neutral-800 pb-3 mb-4 flex items-center gap-3"><Terminal className="w-5 h-5 text-gray-400"/> Compilation Logs</h3>
                    <div className="flex-1 font-mono text-xs md:text-sm text-gray-300 space-y-1 overflow-y-auto no-scrollbar pb-10">
                        <TypewriterText content={terminalLogsState} speed={40} />
                    </div>
                </motion.div>
            </div>
          </motion.div>
        )}

        {/* State: Generated Preview with Chat-to-Edit */}
        {appState === "generated" && (
          <motion.div
            key="generated"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="w-full h-screen flex flex-col z-10 bg-neutral-100"
          >
             {/* Header */}
             <div className="h-16 border-b-2 border-black/10 bg-[#DDA359] px-6 flex items-center justify-between shadow-md z-20">
                <div className="flex items-center gap-4">
                  <button onClick={reset} className="text-black hover:text-neutral-800 transition-colors flex items-center gap-2 text-sm font-bold">
                    <RefreshCcw className="w-5 h-5" /> Start Over
                  </button>
                  <div className="h-6 w-[2px] bg-black/20" />
                  <span className="text-sm font-bold text-black truncate max-w-[200px] sm:max-w-md">
                    &quot;{prompt}&quot;
                  </span>
                </div>

             </div>

             {/* Workspace Split */}
             <div className="flex-1 flex flex-col lg:flex-row overflow-hidden relative">

                {/* Canvas Area (Left/Top) */}
                <div className="flex-1 p-4 sm:p-8 flex items-center justify-center overflow-hidden bg-neutral-100/50 relative z-0">
                   <div className="w-full h-full max-w-5xl bg-white rounded-2xl shadow-2xl border-2 border-black/10 overflow-hidden flex flex-col">
                      {/* Browser Chrome */}
                      <div className="h-12 border-b border-black/10 bg-neutral-50 flex items-center px-4 gap-2 shrink-0">
                         <div className="flex gap-2">
                            <div className="w-3.5 h-3.5 rounded-full bg-red-400" />
                            <div className="w-3.5 h-3.5 rounded-full bg-yellow-400" />
                            <div className="w-3.5 h-3.5 rounded-full bg-green-400" />
                         </div>
                         <div className="ml-4 flex-1 max-w-md mx-auto bg-white rounded-md border border-neutral-200 h-8 flex items-center justify-center text-xs text-black/50 font-mono font-bold shadow-sm">
                            localhost:3000
                         </div>
                      </div>
                      {/* Fake Website Content (Scrollable) */}
                      <div className="flex-1 p-8 overflow-y-auto no-scrollbar relative">
                         <div className="absolute inset-0 bg-gradient-to-b from-transparent to-white/50 pointer-events-none z-10" />
                         <div className="max-w-3xl mx-auto space-y-12 pb-20">
                            {/* Hero Section Mock */}
                            <div className="space-y-6 text-center pt-8">
                               <div className="w-20 h-20 bg-blue-100 text-blue-500 rounded-3xl mx-auto flex items-center justify-center shadow-inner">
                                  <Code className="w-10 h-10" />
                               </div>
                               <h1 className="text-4xl font-extrabold text-black tracking-tight">{prompt || "Your App Name"}</h1>
                               <p className="text-xl text-black/60 max-w-xl mx-auto">This is a live preview of your generated application. Use the chat panel to ask the AI to modify text, colors, layout, or add new sections.</p>
                               <div className="flex gap-4 justify-center pt-4">
                                  <div className="px-6 py-3 bg-black text-white rounded-xl font-bold shadow-lg">Get Started</div>
                                  <div className="px-6 py-3 bg-neutral-200 text-black rounded-xl font-bold">Learn More</div>
                               </div>
                            </div>
                            {/* Feature Grid Mock */}
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-12">
                               <div className="p-6 bg-neutral-50 border border-neutral-100 rounded-2xl shadow-sm space-y-4 hover:shadow-md transition-shadow">
                                  <div className="w-10 h-10 bg-green-100 rounded-full mb-2" />
                                  <div className="h-4 bg-neutral-200 rounded w-3/4" />
                                  <div className="h-3 bg-neutral-100 rounded w-full" />
                                  <div className="h-3 bg-neutral-100 rounded w-5/6" />
                               </div>
                               <div className="p-6 bg-neutral-50 border border-neutral-100 rounded-2xl shadow-sm space-y-4 hover:shadow-md transition-shadow">
                                  <div className="w-10 h-10 bg-purple-100 rounded-full mb-2" />
                                  <div className="h-4 bg-neutral-200 rounded w-2/3" />
                                  <div className="h-3 bg-neutral-100 rounded w-full" />
                                  <div className="h-3 bg-neutral-100 rounded w-4/5" />
                               </div>
                               <div className="p-6 bg-neutral-50 border border-neutral-100 rounded-2xl shadow-sm space-y-4 hover:shadow-md transition-shadow">
                                  <div className="w-10 h-10 bg-orange-100 rounded-full mb-2" />
                                  <div className="h-4 bg-neutral-200 rounded w-3/4" />
                                  <div className="h-3 bg-neutral-100 rounded w-full" />
                                  <div className="h-3 bg-neutral-100 rounded w-full" />
                               </div>
                            </div>
                         </div>
                      </div>
                   </div>
                </div>

                {/* Chat to Edit Panel (Right/Bottom) */}
                <div className="w-full lg:w-[400px] h-[50vh] lg:h-full bg-white border-t lg:border-t-0 lg:border-l border-neutral-200 flex flex-col z-10 shadow-2xl lg:shadow-none">
                   <div className="p-4 border-b border-neutral-100 flex items-center justify-between shrink-0 bg-neutral-50/50">
                      <div className="flex items-center gap-2">
                         <Sparkles className="w-5 h-5 text-yellow-500" />
                         <span className="font-bold text-black text-sm">AI Architect</span>
                      </div>
                      <span className="text-xs font-bold px-2 py-1 bg-green-100 text-green-700 rounded-full">Online</span>
                   </div>

                   <div className="flex-1 overflow-y-auto no-scrollbar p-4 space-y-4 bg-neutral-50/30">
                      <div className="flex gap-3 max-w-[85%]">
                         <div className="w-8 h-8 rounded-full bg-black flex items-center justify-center shrink-0">
                            <Sparkles className="w-4 h-4 text-white" />
                         </div>
                         <div className="bg-white border border-neutral-200 p-3 rounded-2xl rounded-tl-sm shadow-sm">
                            <p className="text-sm text-black">I&apos;ve built the initial version of your app! How does it look?</p>
                         </div>
                      </div>
                      <div className="flex gap-3 max-w-[85%]">
                         <div className="w-8 h-8 rounded-full bg-black flex items-center justify-center shrink-0">
                            <Sparkles className="w-4 h-4 text-white" />
                         </div>
                         <div className="bg-white border border-neutral-200 p-3 rounded-2xl rounded-tl-sm shadow-sm space-y-2">
                            <p className="text-sm text-black">You can ask me to change things like:</p>
                            <ul className="text-xs text-black/70 list-disc pl-4 space-y-1">
                               <li>&quot;Make the hero button rounded&quot;</li>
                               <li>&quot;Change the primary color to dark blue&quot;</li>
                               <li>&quot;Add a pricing section below features&quot;</li>
                            </ul>
                         </div>
                      </div>
                   </div>

                   <div className="p-4 bg-white border-t border-neutral-100 shrink-0">
                      <div className="relative">
                         <input
                            type="text"
                            placeholder="Ask AI to edit the app..."
                            className="w-full bg-neutral-100 text-black text-sm rounded-2xl py-3 pl-4 pr-12 outline-none focus:ring-2 focus:ring-black/5 transition-all placeholder:text-black/40 font-medium"
                            onKeyDown={(e) => {
                               if (e.key === 'Enter') {
                                  e.currentTarget.value = '';
                                  // In a real app, this would append a user message and trigger AI modification
                               }
                            }}
                         />
                         <button className="absolute right-2 top-1/2 -translate-y-1/2 p-1.5 bg-black text-white rounded-xl hover:bg-neutral-800 transition-colors">
                            <ArrowUp className="w-4 h-4" />
                         </button>
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
                  className="ml-6 shrink-0 bg-black text-white hover:bg-neutral-800 px-6 py-3 rounded-full text-base font-bold transition-colors shadow-lg"
                >
                  Visit Live Site
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


        {appState === "showcase" && (
          <div className="w-full h-screen flex flex-col items-center justify-center bg-neutral-100 z-10 p-8">
             <h2 className="text-4xl font-extrabold text-black mb-4">Showcase</h2>
             <p className="text-black/60 mb-8">Discover amazing applications built by the community.</p>
             <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-5xl">
                {[1,2,3].map(i => (
                   <div key={i} className="h-64 bg-white rounded-2xl shadow-sm border border-neutral-200"></div>
                ))}
             </div>
             <button onClick={reset} className="mt-12 text-black font-bold hover:underline">Back to Builder</button>
          </div>
        )}

        {appState === "docs" && (
          <div className="w-full h-screen flex flex-col items-center justify-center bg-neutral-100 z-10 p-8">
             <h2 className="text-4xl font-extrabold text-black mb-4">Documentation</h2>
             <p className="text-black/60 mb-8">Learn how to leverage our AI architect.</p>
             <div className="w-full max-w-3xl bg-white rounded-2xl shadow-sm border border-neutral-200 p-8 min-h-[400px]">
                <div className="h-4 bg-neutral-100 rounded w-1/4 mb-6"></div>
                <div className="h-3 bg-neutral-50 rounded w-full mb-3"></div>
                <div className="h-3 bg-neutral-50 rounded w-5/6 mb-3"></div>
                <div className="h-3 bg-neutral-50 rounded w-full mb-3"></div>
             </div>
             <button onClick={reset} className="mt-12 text-black font-bold hover:underline">Back to Builder</button>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
