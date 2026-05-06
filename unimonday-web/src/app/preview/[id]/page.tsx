"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { supabase } from "@/lib/supabase/client";
import { Terminal, Lock } from "lucide-react";
import { motion } from "framer-motion";

export default function PreviewPage() {
  const { id } = useParams();
  const [appData, setAppData] = useState<{id: string, html: string, js: string, css: string} | null>(null);
  const [loading, setLoading] = useState(true);
  const [showSetup, setShowSetup] = useState(false);
  const [mockKey, setMockKey] = useState("");

  useEffect(() => {
    async function loadApp() {
      try {
        const { data, error } = await supabase
          .from('generated_apps')
          .select('*')
          .eq('app_id', Array.isArray(id) ? id[0] : id)
          .single();

        if (error || !data) {
          console.error("Error loading app data:", error);
          // Set a friendly fallback for the user if not found
          setAppData({
            id: Array.isArray(id) ? id[0] : id || 'default',
            html: `<div style="text-align:center; padding: 50px; font-family: sans-serif;"><h2>App Not Found</h2><p>The requested application could not be found in the database.</p></div>`,
            css: '',
            js: ''
          });
        } else {
          setAppData(data);
        }
      } catch (e) {
         console.error("Exception loading app data:", e);
      } finally {
        setLoading(false);
      }
    }
    loadApp();
  }, [id]);

  if (loading) {
    return <div className="min-h-screen bg-neutral-900 flex items-center justify-center text-white"><Terminal className="w-8 h-8 animate-bounce" /></div>;
  }

  if (showSetup) {
    return (
      <div className="min-h-screen bg-white text-black p-8 flex items-center justify-center">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="max-w-md w-full border-2 border-black/10 rounded-2xl p-8 shadow-2xl">
          <div className="w-12 h-12 bg-[#DDA359] rounded-xl flex items-center justify-center mb-6">
            <Lock className="text-black w-6 h-6" />
          </div>
          <h1 className="text-2xl font-bold mb-2">Secrets Setup required</h1>
          <p className="text-gray-600 mb-6 text-sm">
            Tafadhali ingiza &quot;Supabase URL&quot; yako hapa chini ili app yako ianze kuhifadhi data laivu. Kama AI siruhusiwi kuhifadhi hizi taarifa!
          </p>
          <input
            type="text"
            placeholder="https://xyz.supabase.co"
            className="w-full p-3 rounded-lg bg-gray-50 border border-gray-200 mb-4 font-mono text-sm"
            value={mockKey}
            onChange={(e) => setMockKey(e.target.value)}
          />
          <button
            onClick={() => setShowSetup(false)}
            className="w-full bg-black text-white font-bold py-3 rounded-xl hover:bg-neutral-800 transition-colors"
          >
            Save & Launch Live App
          </button>
        </motion.div>
      </div>
    );
  }

  // Inject ENV
  const injectedHtml = `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <style>${appData?.css || ''}</style>
        <script>
           // Safely inject JSON to prevent XSS by escaping HTML tags inside the string
           window.ENV = {
             SUPABASE_URL: ${JSON.stringify(mockKey || '').replace(/</g, '\\u003c')}
           };
        </script>
      </head>
      <body>
        ${appData?.html || ''}
        <script>${appData?.js || ''}</script>
      </body>
    </html>
  `;

  return (
    <div className="w-full h-screen flex flex-col bg-white">
      <div className="h-14 border-b border-gray-200 flex items-center justify-between px-4 bg-gray-50 shrink-0">
         <div className="flex flex-col">
           <span className="text-sm font-bold text-gray-800 font-mono">Live Product | ID: {id}</span>
           <span className="text-xs text-green-600 font-medium tracking-tight">Active</span>
         </div>
         <div className="flex items-center gap-3">
           <a href="#" className="text-xs font-bold text-blue-600 hover:underline flex items-center gap-1">
             User Manual & Setup
           </a>
           <button onClick={() => setShowSetup(true)} className="text-sm font-bold text-black flex items-center gap-2 hover:bg-gray-200 px-3 py-1 rounded-md transition-colors">
              <Lock className="w-4 h-4" /> Environment Secrets
           </button>
         </div>
      </div>
      <div className="flex flex-1 overflow-hidden">
        {/* Main Preview */}
        <iframe
          title="App Preview"
          className="flex-1 w-full h-full border-none"
          sandbox="allow-scripts allow-forms allow-popups"
          srcDoc={injectedHtml}
        />
        {/* Chat-to-Edit Side Drawer */}
        <div className="w-80 border-l border-gray-200 bg-gray-50 flex flex-col shrink-0">
          <div className="p-4 border-b border-gray-200 bg-white">
            <h3 className="font-bold text-sm text-black flex items-center gap-2">
              <Terminal className="w-4 h-4 text-[#DDA359]" />
              Chat to Edit
            </h3>
            <p className="text-xs text-gray-500 mt-1">Request modifications to the UI or Logic.</p>
          </div>
          <div className="flex-1 p-4 overflow-y-auto no-scrollbar flex flex-col gap-3">
            {/* Dummy chat history for UX */}
            <div className="bg-white p-3 rounded-xl border border-gray-100 text-sm shadow-sm">
               <span className="font-bold text-xs text-[#DDA359] block mb-1">Architect</span>
               Your product is live. What would you like to change?
            </div>
          </div>
          <div className="p-4 bg-white border-t border-gray-200">
            <div className="relative flex items-center bg-gray-100 rounded-2xl p-1">
              <input
                type="text"
                placeholder="Make the button blue..."
                className="w-full bg-transparent text-sm px-3 py-2 outline-none"
              />
              <button className="bg-black text-white p-2 rounded-xl shrink-0 hover:bg-neutral-800 transition-transform hover:scale-105 active:scale-95">
                <Terminal className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
