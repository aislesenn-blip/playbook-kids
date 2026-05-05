with open("unimonday-web/src/app/page.tsx", "r") as f:
    content = f.read()

# Since the previous fix_templates_and_nav script had a duplicated string, the replace logic for the IDE layout failed to actually replace the old building state because the search string wasn't an exact match.
# I need to do a regex replace to completely wipe out the old building state and put the new IDE one.

import re

# Find the start of the building state
start_idx = content.find('{/* State: Building')
# Find the start of the next state to know where to cut
end_idx = content.find('{/* State: Generated Preview */}')

new_building_state = """        {/* State: Building - Full Screen IDE App Builder Experience */}
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

"""

if start_idx != -1 and end_idx != -1:
    content = content[:start_idx] + new_building_state + content[end_idx:]

with open("unimonday-web/src/app/page.tsx", "w") as f:
    f.write(content)
