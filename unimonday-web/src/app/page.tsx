"use client";

import { useState, useEffect, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Send, Loader2, CheckCircle, Terminal, Globe, RefreshCcw, LayoutTemplate, Code2, PenTool, Zap, Image as ImageIcon } from "lucide-react";


// Mock API Functions (Ready for real backend wiring)
const simulateAIGeneration = async (prompt: string, onProgress: (stage: string) => void) => {
  const stages = [
    "Analyzing layout requirements...",
    "Configuring database schema...",
    "Writing React components...",
    "Applying Tailwind CSS styles...",
    "Finalizing interactive elements..."
  ];
  for (let i = 0; i < stages.length; i++) {
    onProgress(stages[i]);
    await new Promise(resolve => setTimeout(resolve, 2000));
  }
  return { success: true };
};

const simulateGithubDeploy = async (projectName: string) => {
  await new Promise(resolve => setTimeout(resolve, 3500));
  const sanitizedName = projectName.split(" ")[0].toLowerCase().replace(/[^a-z0-9]/g, "") || "my-awesome-app";
  return `https://${sanitizedName}.github.io`;
};

// Sub-components for Building State animations
const CodeTyper = () => {
  const [code, setCode] = useState("");

  useEffect(() => {
    const fullCode = `function Hero() {
  return (
    <section className="bg-white py-20">
      <div className="container mx-auto px-4">
        <h1 className="text-5xl font-bold mb-4">
          Built with AI
        </h1>
        <p className="text-xl text-gray-600">
          Deploying in seconds...
        </p>
      </div>
    </section>
  );
}`;
    let i = 0;
    const interval = setInterval(() => {
      setCode(fullCode.slice(0, i));
      i++;
      if (i > fullCode.length) clearInterval(interval);
    }, 30);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="bg-black/90 p-4 rounded-xl text-green-400 font-mono text-sm w-full max-w-sm h-64 overflow-hidden border border-neutral-800 shadow-2xl">
      <div className="flex gap-2 mb-3 border-b border-neutral-800 pb-2">
        <div className="w-3 h-3 rounded-full bg-red-500" />
        <div className="w-3 h-3 rounded-full bg-yellow-500" />
        <div className="w-3 h-3 rounded-full bg-green-500" />
      </div>
      <pre className="whitespace-pre-wrap">{code}<span className="animate-pulse">_</span></pre>
    </div>
  );
};

const WireframeBuilder = () => {
  return (
    <div className="w-full max-w-sm h-64 border-2 border-dashed border-neutral-300 rounded-xl p-4 flex flex-col gap-3 relative overflow-hidden bg-white/50">
      <motion.div initial={{ width: 0 }} animate={{ width: "100%" }} transition={{ duration: 1 }} className="h-8 bg-neutral-200 rounded-md" />
      <div className="flex gap-3 flex-1">
        <motion.div initial={{ height: 0 }} animate={{ height: "100%" }} transition={{ duration: 1, delay: 0.5 }} className="w-1/3 bg-neutral-200 rounded-md" />
        <motion.div initial={{ height: 0 }} animate={{ height: "100%" }} transition={{ duration: 1, delay: 1 }} className="flex-1 bg-neutral-100 rounded-md border border-neutral-200 flex items-center justify-center">
            <LayoutTemplate className="w-8 h-8 text-neutral-400 animate-pulse" />
        </motion.div>
      </div>
    </div>
  );
};


export default function BuilderPage() {
  const [prompt, setPrompt] = useState("");
  const [appState, setAppState] = useState<"initial" | "building" | "generated" | "deploying" | "success">("initial");
  const [loadingText, setLoadingText] = useState("Initializing Engine...");
  const [mockUrl, setMockUrl] = useState("");
  const [unsplashImages, setUnsplashImages] = useState<string[]>([]);

  // Typewriter effect state
  const placeholderIdeas = useMemo(() => [
    "A sleek e-commerce store for handmade ceramics...",
    "A minimalist portfolio for an architect...",
    "A high-end restaurant landing page with reservations...",
    "A clean blog template for writers..."
  ], []);
  const [currentPlaceholder, setCurrentPlaceholder] = useState("");
  const [placeholderIndex, setPlaceholderIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  // Statically define the snippet configs to avoid hydration mismatch and impurity rules
  const snippetConfigs = useMemo(() => [
    { snippet: "<div className='flex items-center'>", y: 150, duration: 18 },
    { snippet: "const [state, setState] = useState(null);", y: 320, duration: 22 },
    { snippet: "await fetch('/api/data')", y: 450, duration: 16 },
    { snippet: "export default function App()", y: 600, duration: 25 },
    { snippet: "gap-4 p-6 rounded-2xl shadow-sm", y: 700, duration: 19 },
    { snippet: "{data.map(item => <Card key={item.id} />)}", y: 200, duration: 21 }
  ], []);

  useEffect(() => {
    if (appState !== "initial") return;

    const timeout = setTimeout(() => {
      const fullText = placeholderIdeas[placeholderIndex];

      if (!isDeleting) {
        setCurrentPlaceholder(fullText.substring(0, currentPlaceholder.length + 1));
        if (currentPlaceholder.length === fullText.length) {
          setTimeout(() => setIsDeleting(true), 2000); // Pause at full text
        }
      } else {
        setCurrentPlaceholder(fullText.substring(0, currentPlaceholder.length - 1));
        if (currentPlaceholder.length === 0) {
          setIsDeleting(false);
          setPlaceholderIndex((prev) => (prev + 1) % placeholderIdeas.length);
        }
      }
    }, isDeleting ? 30 : 80);

    return () => clearTimeout(timeout);
  }, [currentPlaceholder, isDeleting, placeholderIndex, appState, placeholderIdeas]);

  const fetchImages = async (query: string) => {
    try {
      // Extract a simple keyword from the prompt (e.g. "coffee", "startup")
      const keywords = query.split(" ").filter(w => w.length > 4).slice(0, 2).join(",") || "technology";
      const res = await fetch(`https://api.unsplash.com/photos/random?query=${keywords}&count=6&client_id=${process.env.NEXT_PUBLIC_UNSPLASH_ACCESS_KEY}`);
      const data = await res.json();
      if (Array.isArray(data)) {
         setUnsplashImages(data.map(img => img.urls.small));
      }
    } catch (e) {
      console.error("Unsplash fetch failed", e);
    }
  };

  const handleBuild = async () => {
    if (!prompt.trim()) return;
    setAppState("building");

    // Fetch dynamic images while building
    fetchImages(prompt);

    await simulateAIGeneration(prompt, setLoadingText);
    setAppState("generated");
  };

  const handleDeploy = async () => {
    setAppState("deploying");
    const url = await simulateGithubDeploy(prompt);
    setMockUrl(url);
    setAppState("success");
  };

  const reset = () => {
    setPrompt("");
    setAppState("initial");
    setMockUrl("");
    setUnsplashImages([]);
  };

  return (
    <div className="w-full min-h-screen bg-background flex flex-col items-center font-sans text-neutral-900 selection:bg-neutral-200 relative overflow-hidden">

      {/* Dynamic Background Effects for Initial State */}
      {appState === "initial" && (
        <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-20">
          {snippetConfigs.map((config, i) => (
            <motion.div
              key={i}
              initial={{ x: -100, y: config.y, opacity: 0 }}
              animate={{
                x: [null, typeof window !== 'undefined' ? window.innerWidth + 100 : 1500],
                opacity: [0, 0.5, 0]
              }}
              transition={{
                duration: config.duration,
                repeat: Infinity,
                delay: i * 2,
                ease: "linear"
              }}
              className="absolute text-neutral-400 font-mono text-xs whitespace-nowrap"
            >
              {config.snippet}
            </motion.div>
          ))}
        </div>
      )}

      {/* Minimalist Top Navigation */}
      <nav className="w-full h-16 border-b border-neutral-200/50 flex items-center justify-between px-6 z-20 bg-background/80 backdrop-blur-md">
         <div className="font-semibold tracking-tight text-lg flex items-center gap-2">
            <div className="w-6 h-6 bg-black rounded flex items-center justify-center">
              <Zap className="w-4 h-4 text-white" />
            </div>
            AI Builder
         </div>
         <div className="flex gap-4">
            <button className="text-sm font-medium text-neutral-600 hover:text-black transition-colors flex items-center gap-1.5">
              <LayoutTemplate className="w-4 h-4" /> Templates
            </button>
            <button className="text-sm font-medium text-neutral-600 hover:text-black transition-colors hidden sm:flex items-center gap-1.5">
              <Code2 className="w-4 h-4" /> Components
            </button>
         </div>
      </nav>

      <div className="flex-1 w-full flex items-center justify-center p-6">
        <AnimatePresence mode="wait">

          {/* State: Initial Prompt */}
          {appState === "initial" && (
            <motion.div
              key="initial"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20, filter: "blur(10px)" }}
              transition={{ duration: 0.5, ease: "easeInOut" }}
              className="w-full max-w-3xl flex flex-col items-center z-10 -mt-16"
            >
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-semibold tracking-tight text-center mb-10 text-black">
                What do you want to build?
              </h1>

              <div className="w-full relative group">
                {/* Minimalist shadow, no glow */}
                <div className="absolute inset-0 bg-neutral-200 rounded-[2rem] blur-xl opacity-50 group-hover:opacity-80 transition duration-500 -z-10" />
                <div className="relative bg-white border border-neutral-300 rounded-[2rem] shadow-sm p-2 flex items-end">
                  <div className="relative w-full">
                    {!prompt && (
                      <div className="absolute top-4 left-4 text-lg text-neutral-400 pointer-events-none">
                        {currentPlaceholder}
                        <span className="inline-block w-[2px] h-5 bg-neutral-400 ml-0.5 animate-pulse align-middle" />
                      </div>
                    )}
                    <textarea
                      value={prompt}
                      onChange={(e) => setPrompt(e.target.value)}
                      className="w-full min-h-[140px] max-h-[300px] p-4 bg-transparent resize-none outline-none text-lg text-black z-10 relative"
                      onKeyDown={(e) => {
                        if (e.key === "Enter" && !e.shiftKey) {
                          e.preventDefault();
                          handleBuild();
                        }
                      }}
                    />
                  </div>
                  <button
                    onClick={handleBuild}
                    disabled={!prompt.trim()}
                    className="absolute bottom-4 right-4 p-3 bg-black hover:bg-neutral-800 disabled:bg-neutral-200 disabled:text-neutral-400 text-white rounded-full transition-colors flex items-center justify-center shadow-md disabled:shadow-none"
                  >
                    <Send className="w-5 h-5" />
                  </button>
                </div>
              </div>

              <div className="mt-10 flex gap-3 text-sm text-neutral-600 flex-wrap justify-center">
                 <span className="bg-white/50 px-4 py-2 rounded-full border border-neutral-200 cursor-pointer hover:border-black hover:text-black transition-all flex items-center gap-2" onClick={() => setPrompt("A landing page for my new AI startup")}>
                    <PenTool className="w-3.5 h-3.5" /> AI Startup
                 </span>
                 <span className="bg-white/50 px-4 py-2 rounded-full border border-neutral-200 cursor-pointer hover:border-black hover:text-black transition-all flex items-center gap-2" onClick={() => setPrompt("An e-commerce store selling premium coffee")}>
                    <Globe className="w-3.5 h-3.5" /> E-commerce
                 </span>
              </div>
            </motion.div>
          )}

          {/* State: Building */}
          {appState === "building" && (
            <motion.div
              key="building"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex flex-col items-center justify-center z-10 w-full"
            >
              <div className="flex flex-col md:flex-row items-center justify-center gap-8 md:gap-16 w-full max-w-5xl mb-12">
                 {/* Left side: Code generation simulation */}
                 <motion.div initial={{ x: -50, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ delay: 0.2 }}>
                    <CodeTyper />
                 </motion.div>

                 {/* Center: Main loader */}
                 <div className="flex flex-col items-center">
                    <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center shadow-xl border border-neutral-100 relative mb-8">
                       <Loader2 className="w-10 h-10 text-black animate-spin" />
                       {/* Pulsing rings */}
                       <div className="absolute inset-0 border border-black rounded-full animate-ping opacity-20" />
                       <div className="absolute -inset-4 border border-black rounded-full animate-ping opacity-10" style={{ animationDelay: "0.2s"}} />
                    </div>
                 </div>

                 {/* Right side: Layout assembly simulation */}
                 <motion.div initial={{ x: 50, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ delay: 0.4 }}>
                    <WireframeBuilder />
                 </motion.div>
              </div>

              <motion.div
                 key={loadingText}
                 initial={{ opacity: 0, y: 10 }}
                 animate={{ opacity: 1, y: 0 }}
                 className="bg-white px-6 py-3 rounded-full shadow-sm border border-neutral-200 flex items-center gap-3"
              >
                <div className="w-2 h-2 rounded-full bg-black animate-pulse" />
                <span className="text-lg font-medium text-black tracking-tight">
                  {loadingText}
                </span>
              </motion.div>
            </motion.div>
          )}

          {/* State: Generated Preview */}
          {appState === "generated" && (
            <motion.div
              key="generated"
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              className="w-full h-[calc(100vh-4rem)] flex flex-col z-10 bg-neutral-50/50 absolute top-16 left-0"
            >
               {/* Header Toolbar */}
               <div className="h-16 border-b border-neutral-200 bg-white px-6 flex items-center justify-between shadow-sm">
                  <div className="flex items-center gap-4">
                    <button onClick={reset} className="text-neutral-500 hover:text-black transition-colors flex items-center gap-2 text-sm font-medium">
                      <RefreshCcw className="w-4 h-4" /> Start Over
                    </button>
                    <div className="h-4 w-[1px] bg-neutral-200 hidden sm:block" />
                    <span className="text-sm font-medium text-neutral-600 truncate max-w-[200px] sm:max-w-md hidden sm:block">
                      &quot;{prompt}&quot;
                    </span>
                  </div>
                  <button
                    onClick={handleDeploy}
                    className="bg-black hover:bg-neutral-800 text-white px-6 py-2.5 rounded-full text-sm font-medium flex items-center gap-2 transition-colors shadow-lg shadow-black/10"
                  >
                    <Terminal className="w-4 h-4" /> Deploy to GitHub
                  </button>
               </div>

               {/* Canvas Wrapper */}
               <div className="flex-1 p-4 sm:p-8 md:p-12 overflow-hidden flex items-center justify-center">
                  <div className="w-full max-w-6xl h-full bg-white rounded-xl shadow-2xl border border-neutral-200 overflow-hidden flex flex-col relative">
                     {/* Browser Chrome */}
                     <div className="h-12 border-b border-neutral-100 bg-neutral-50/80 backdrop-blur flex items-center px-4 gap-2">
                        <div className="flex gap-1.5">
                           <div className="w-3 h-3 rounded-full bg-neutral-300" />
                           <div className="w-3 h-3 rounded-full bg-neutral-300" />
                           <div className="w-3 h-3 rounded-full bg-neutral-300" />
                        </div>
                        <div className="ml-4 flex-1 max-w-md mx-auto bg-white rounded-md border border-neutral-200 h-7 flex items-center justify-center text-xs text-neutral-400 font-mono">
                           localhost:3000
                        </div>
                     </div>
                     {/* Fake Website Content - High Fidelity Mock */}
                     <div className="flex-1 overflow-y-auto bg-neutral-50 p-8">
                        <div className="max-w-4xl mx-auto bg-white min-h-full rounded-lg shadow-sm border border-neutral-100 p-12">
                           <div className="space-y-6 text-center pb-12 border-b border-neutral-100">
                              <div className="w-16 h-16 bg-black rounded-xl mx-auto mb-6 flex items-center justify-center">
                                 <LayoutTemplate className="w-8 h-8 text-white" />
                              </div>
                              <h2 className="text-4xl font-bold text-black tracking-tight w-3/4 mx-auto leading-tight">
                                Simulated UI based on your prompt
                              </h2>
                              <p className="text-lg text-neutral-500 w-2/3 mx-auto">
                                The engine has mapped out the component structure and applied base styling.
                              </p>
                           </div>
                           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pt-12">
                              {[0,1,2,3,4,5].map(i => (
                                <div key={i} className="group p-4 bg-neutral-50 border border-neutral-100 rounded-2xl hover:border-black transition-colors overflow-hidden flex flex-col">
                                  {unsplashImages[i] ? (
                                    <div className="w-full h-32 rounded-lg mb-4 bg-neutral-200 overflow-hidden">
                                       <img src={unsplashImages[i]} alt="Mock content" className="w-full h-full object-cover" />
                                    </div>
                                  ) : (
                                    <div className="w-full h-32 bg-neutral-200 rounded-lg mb-4 flex items-center justify-center text-neutral-400">
                                       <ImageIcon className="w-6 h-6" />
                                    </div>
                                  )}
                                  <div className="h-4 bg-neutral-200 rounded w-3/4 mb-2" />
                                  <div className="h-3 bg-neutral-200 rounded w-full mb-1" />
                                  <div className="h-3 bg-neutral-200 rounded w-5/6" />
                                </div>
                              ))}
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
               className="flex flex-col items-center justify-center z-10 w-full max-w-md"
            >
               <div className="relative mb-8">
                 <Terminal className="w-20 h-20 text-black" />
                 <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-black rounded-full flex items-center justify-center animate-bounce">
                    <Globe className="w-4 h-4 text-white" />
                 </div>
               </div>
               <h2 className="text-2xl font-semibold text-black mb-2 tracking-tight">Deploying to GitHub...</h2>
               <p className="text-neutral-500 text-sm mb-8 text-center">Committing repository changes and triggering GitHub Pages build pipeline.</p>
               <div className="w-full h-1.5 bg-neutral-200 rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: "0%" }}
                    animate={{ width: "100%" }}
                    transition={{ duration: 3.5, ease: "easeInOut" }}
                    className="h-full bg-black rounded-full"
                  />
               </div>
            </motion.div>
          )}

          {/* State: Success */}
          {appState === "success" && (
            <motion.div
               key="success"
               initial={{ opacity: 0, scale: 0.95, y: 20 }}
               animate={{ opacity: 1, scale: 1, y: 0 }}
               className="flex flex-col items-center justify-center z-10 text-center w-full max-w-lg px-6 bg-white p-12 rounded-[2.5rem] shadow-2xl border border-neutral-100"
            >
               <div className="w-20 h-20 bg-black rounded-full flex items-center justify-center mb-8 shadow-xl shadow-black/20">
                  <CheckCircle className="w-10 h-10 text-white" />
               </div>
               <h2 className="text-3xl font-bold text-black mb-4 tracking-tight">Your site is live!</h2>
               <p className="text-neutral-500 mb-8 text-lg">
                 The AI has successfully compiled your project and pushed it to GitHub Pages.
               </p>

               <div className="w-full bg-neutral-50 border border-neutral-200 rounded-2xl p-4 flex items-center justify-between mb-10">
                  <div className="flex items-center gap-3 overflow-hidden px-2">
                     <Globe className="w-5 h-5 text-neutral-400 shrink-0" />
                     <span className="text-black font-mono text-sm truncate font-medium">{mockUrl}</span>
                  </div>
                  <button
                    className="ml-4 shrink-0 bg-white border border-neutral-200 hover:border-black text-black px-5 py-2 rounded-xl text-sm font-semibold transition-all shadow-sm"
                    onClick={() => { alert("This is a prototype. In production, this opens the GitHub Pages link."); }}
                  >
                    Visit Site
                  </button>
               </div>

               <button
                 onClick={reset}
                 className="text-neutral-500 hover:text-black font-medium transition-colors flex items-center gap-2"
               >
                 <RefreshCcw className="w-4 h-4" /> Build another project
               </button>
            </motion.div>
          )}

        </AnimatePresence>
      </div>
    </div>
  );
}
