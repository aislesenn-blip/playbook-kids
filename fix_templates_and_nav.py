with open("unimonday-web/src/app/page.tsx", "r") as f:
    content = f.read()

# Make sure all Lucide icons are imported
content = content.replace(
    'import { CheckCircle, Terminal, Globe, RefreshCcw, LayoutTemplate, Briefcase, Store, Code2, Sparkles, Database, Layers } from "lucide-react";',
    'import { CheckCircle, Terminal, Globe, RefreshCcw, LayoutTemplate, Briefcase, Store, Code2, Sparkles, Database, Layers, Camera, Pencil, Coffee, Music, Heart, Zap, FolderTree, Cpu, Activity } from "lucide-react";'
)

# Add Nav State Logic
content = content.replace(
    'const [isDeleting, setIsDeleting] = useState(false);',
    'const [isDeleting, setIsDeleting] = useState(false);\n  const [showAuthModal, setShowAuthModal] = useState(false);\n  const [currentNavView, setCurrentNavView] = useState("builder"); // builder, showcase, docs'
)

# Update Navigation to use the logic
nav_search = """      {/* Top Navigation */}
      {appState === "initial" && (
        <nav className="w-full flex items-center justify-between p-6 z-20">
          <div className="flex items-center gap-2 text-black font-semibold text-xl tracking-tight">
             <Sparkles className="w-6 h-6" />
             <span>BuilderAI</span>
          </div>
          <div className="flex items-center gap-6 text-sm font-medium">
            <Link href="#" className="text-black/90 hover:text-black transition-colors">Showcase</Link>
            <Link href="#" className="text-black/90 hover:text-black transition-colors">Docs</Link>
            <button className="bg-black text-[#DDA359] px-4 py-2 rounded-full hover:bg-black transition-colors">Sign In</button>
          </div>
        </nav>
      )}"""

nav_replace = """      {/* Top Navigation */}
      {appState === "initial" && (
        <nav className="w-full flex items-center justify-between p-6 z-20">
          <button onClick={() => setCurrentNavView("builder")} className="flex items-center gap-2 text-black font-bold text-2xl tracking-tight">
             <Sparkles className="w-6 h-6" />
             <span>BuilderAI</span>
          </button>
          <div className="flex items-center gap-8 text-sm font-bold">
            <button onClick={() => setCurrentNavView("showcase")} className={`${currentNavView === "showcase" ? "text-black border-b-2 border-black" : "text-black/80"} hover:text-black transition-colors pb-1`}>Showcase</button>
            <button onClick={() => setCurrentNavView("docs")} className={`${currentNavView === "docs" ? "text-black border-b-2 border-black" : "text-black/80"} hover:text-black transition-colors pb-1`}>Docs</button>
            <button onClick={() => setShowAuthModal(true)} className="bg-black text-[#DDA359] px-6 py-2.5 rounded-full hover:scale-105 transition-transform font-bold">Sign In</button>
          </div>
        </nav>
      )}

      {/* Auth Modal Overlay */}
      {showAuthModal && (
         <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <div className="bg-[#DDA359] border-2 border-black rounded-3xl p-8 max-w-md w-full shadow-2xl">
               <h2 className="text-3xl font-bold text-black mb-2">Welcome Back</h2>
               <p className="text-black/80 mb-6">Sign in to sync your generated projects.</p>
               <input type="email" placeholder="Email address" className="w-full bg-white border-2 border-black rounded-xl p-4 mb-4 text-black placeholder:text-black/60 font-medium" />
               <button className="w-full bg-black text-[#DDA359] font-bold p-4 rounded-xl mb-4 hover:opacity-90">Continue with Email</button>
               <button onClick={() => setShowAuthModal(false)} className="w-full text-black font-bold py-2 underline decoration-2 underline-offset-4">Cancel</button>
            </div>
         </div>
      )}
"""
content = content.replace(nav_search, nav_replace)

# Expanded Templates 12 items
template_search = """            {/* Templates Section */}
            <div className="mt-16 w-full max-w-4xl">
               <div className="flex items-center justify-center mb-6 gap-2">
                  <LayoutTemplate className="w-5 h-5 text-black/80" />
                  <h3 className="text-sm font-semibold text-black/80 uppercase tracking-widest">Start with a Template</h3>
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
                     <p className="text-sm text-black/80">Showcase your work and skills</p>
                  </div>

                  <div
                    onClick={() => setPrompt("A minimalist e-commerce store for physical products")}
                    className="bg-[#DDA359] border border-neutral-200 hover:border-black p-5 rounded-2xl cursor-pointer transition-all hover:-translate-y-1 shadow-sm hover:shadow-md flex flex-col items-center text-center group"
                  >
                     <div className="w-12 h-12 bg-neutral-100 rounded-full flex items-center justify-center mb-4 group-hover:bg-black group-hover:text-white transition-colors">
                        <Store className="w-6 h-6" />
                     </div>
                     <h4 className="font-semibold text-black mb-1">E-Commerce</h4>
                     <p className="text-sm text-black/80">Sell products online easily</p>
                  </div>

                  <div
                    onClick={() => setPrompt("A modern landing page for a SaaS product")}
                    className="bg-[#DDA359] border border-neutral-200 hover:border-black p-5 rounded-2xl cursor-pointer transition-all hover:-translate-y-1 shadow-sm hover:shadow-md flex flex-col items-center text-center group"
                  >
                     <div className="w-12 h-12 bg-neutral-100 rounded-full flex items-center justify-center mb-4 group-hover:bg-black group-hover:text-white transition-colors">
                        <Code2 className="w-6 h-6" />
                     </div>
                     <h4 className="font-semibold text-black mb-1">Landing Page</h4>
                     <p className="text-sm text-black/80">Convert visitors into customers</p>
                  </div>
               </div>
            </div>"""

templates = [
    ("Portfolio", "Briefcase", "Showcase your work and skills", "A professional portfolio for a freelance designer"),
    ("E-Commerce", "Store", "Sell products online easily", "A minimalist e-commerce store for physical products"),
    ("Landing Page", "Code2", "Convert visitors into customers", "A modern landing page for a SaaS product"),
    ("Blog", "Pencil", "Share your thoughts and stories", "A clean, reading-focused blog template"),
    ("Photography", "Camera", "Display your photo gallery", "A high-end photography portfolio grid"),
    ("Cafe", "Coffee", "Menu and reservations", "A cozy cafe website with a menu and booking system"),
    ("Music", "Music", "Tracks and tour dates", "A dark-themed musician profile with audio player"),
    ("Non-Profit", "Heart", "Collect donations & awareness", "A charity website focused on storytelling and donations"),
    ("Startup", "Zap", "Launch your new idea fast", "An energetic tech startup landing page"),
    ("Agency", "Layers", "Creative studio showcase", "A bold creative agency portfolio"),
    ("Directory", "FolderTree", "Listings and categories", "A local business directory with search and filters"),
    ("Dashboard", "Activity", "Analytics and metrics", "A SaaS admin dashboard layout with charts"),
]

template_cards = ""
for title, icon, desc, prompt in templates:
    template_cards += f"""
                  <div
                    onClick={{() => setPrompt("{prompt}")}}
                    className="bg-[#DDA359] border-2 border-black/10 hover:border-black p-4 rounded-2xl cursor-pointer transition-all hover:-translate-y-1 shadow-sm flex flex-col items-center text-center group"
                  >
                     <div className="w-10 h-10 bg-black/5 rounded-full flex items-center justify-center mb-3 group-hover:bg-black group-hover:text-[#DDA359] text-black transition-colors">
                        <{icon} className="w-5 h-5" />
                     </div>
                     <h4 className="font-bold text-black text-sm mb-1">{title}</h4>
                     <p className="text-xs font-medium text-black/60">{desc}</p>
                  </div>"""

template_replace = f"""            {{/* Templates Section */}}
            <div className="mt-12 w-full max-w-6xl px-4">
               <div className="flex items-center justify-center mb-6 gap-2">
                  <LayoutTemplate className="w-5 h-5 text-black" />
                  <h3 className="text-sm font-bold text-black uppercase tracking-widest">Start with a Template</h3>
               </div>
               <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
                  {template_cards}
               </div>
            </div>"""

content = content.replace(template_search, template_replace)

# Condition the main view so we can show "Showcase" and "Docs"
main_view_search = """        {/* State: Initial Prompt */}
        {appState === "initial" && ("""
main_view_replace = """        {/* Nav Views */}
        {appState === "initial" && currentNavView === "showcase" && (
           <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex-1 w-full max-w-6xl px-6 flex flex-col items-center justify-center z-10 text-center">
              <h1 className="text-6xl font-bold text-black mb-6">Made with BuilderAI</h1>
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
        {appState === "initial" && currentNavView === "builder" && ("""
content = content.replace(main_view_search, main_view_replace)

# Redesign "Building" state (IDE App Builder Experience)
building_search = """        {/* State: Building - Highly Interactive Dopamine Hit */}
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
                 {`function buildLayout() {\\n  return <MainLayout />\\n}`}
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
                  <Database className="w-12 h-12 text-black/50 mb-2" />
                  <span className="text-xs font-mono text-black/60">user_schema.sql</span>
               </motion.div>

               <motion.div
                 initial={{ opacity: 0, scale: 0.8 }}
                 animate={{ opacity: [0, 0.6, 0], scale: 1.1 }}
                 transition={{ duration: 4.5, repeat: Infinity, delay: 1.5 }}
                 className="absolute bottom-40 left-40 flex flex-col items-center"
               >
                  <Layers className="w-12 h-12 text-black/50 mb-2" />
                  <span className="text-xs font-mono text-black/60">App.tsx</span>
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
              <p className="text-black/80 font-mono text-sm">AI is writing the code...</p>
            </div>
          </motion.div>
        )}"""

building_replace = """        {/* State: Building - Full Screen IDE App Builder Experience */}
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
                   > {loadingText}
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
                      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }} className="text-black/60">Installing react, react-dom, tailwindcss...</motion.div>
                      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.5 }} className="text-black/60">Resolving packages...</motion.div>
                      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 2.5 }} className="text-[#DDA359]">✓ Added 342 packages in 2s</motion.div>
                      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 3.5 }} className="flex gap-2 mt-2"><span className="text-white">root@builder:~#</span> configuring database schema</motion.div>
                      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 4.5 }} className="text-[#DDA359]">✓ Connected to DB</motion.div>
                   </div>
                </div>
             </div>
          </motion.div>
        )}"""
content = content.replace(building_search, building_replace)


with open("unimonday-web/src/app/page.tsx", "w") as f:
    f.write(content)
