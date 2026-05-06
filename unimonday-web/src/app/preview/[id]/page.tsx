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
  const [showManual, setShowManual] = useState(false);
  const [mockKey, setMockKey] = useState("");

  // Chat-to-edit state
  const [chatPrompt, setChatPrompt] = useState("");
  const [isUpdating, setIsUpdating] = useState(false);

  const handleCopyLink = () => {
    const livePath = '/live/' + (Array.isArray(id) ? id[0] : id);
    const liveLink = window.location.origin + livePath;
    navigator.clipboard.writeText(liveLink);
    alert("Live Link Copied to Clipboard!");
  };

  const handleChatEdit = async () => {
    if (!chatPrompt.trim() || !appData) return;

    setIsUpdating(true);
    try {
      const fullPrompt = `Here is my current code:\nHTML: ${appData.html}\nCSS: ${appData.css}\nJS: ${appData.js}\n\nI need you to modify it according to this new request: ${chatPrompt}. Output the full new code.`;

      const res = await fetch('/api/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt: fullPrompt })
      });

      if (!res.ok) throw new Error("Modification failed");

      const data = await res.json();

      // Update Database
      const { error: dbError } = await supabase
        .from('generated_apps')
        .update({ html: data.html, css: data.css, js: data.js })
        .eq('app_id', Array.isArray(id) ? id[0] : id);

      if (!dbError) {
        setAppData({ ...appData, html: data.html, css: data.css, js: data.js });
        setChatPrompt("");
      }
    } catch (e) {
      console.error(e);
      alert("Failed to apply edits.");
    } finally {
      setIsUpdating(false);
    }
  };

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
      <div className="min-h-screen bg-black/50 backdrop-blur-md text-black p-8 flex items-center justify-center fixed inset-0 z-50">
        <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="max-w-md w-full bg-white border border-gray-200 rounded-3xl p-8 shadow-2xl relative">
          <div className="w-12 h-12 bg-[#DDA359]/20 rounded-2xl flex items-center justify-center mb-6 border border-[#DDA359]/30">
            <Lock className="text-[#DDA359] w-6 h-6" />
          </div>
          <h1 className="text-2xl font-bold mb-2 text-black">Environment Secrets</h1>
          <p className="text-gray-500 mb-6 text-sm leading-relaxed">
            Please provide your Database or API URLs below to connect the frontend to your live backend. Note: Keys are stored securely in your local environment.
          </p>
          <input
            type="text"
            placeholder="e.g. https://xyz.supabase.co"
            className="w-full p-4 rounded-xl bg-gray-50 border border-gray-200 mb-6 font-mono text-sm focus:ring-2 focus:ring-[#DDA359] focus:outline-none"
            value={mockKey}
            onChange={(e) => setMockKey(e.target.value)}
          />
          <button
            onClick={() => setShowSetup(false)}
            className="w-full bg-black text-white font-bold py-4 rounded-xl hover:bg-neutral-800 transition-all active:scale-95"
          >
            Save & Launch Live Product
          </button>
        </motion.div>
      </div>
    );
  }

  if (showManual) {
    return (
      <div className="min-h-screen bg-black/50 backdrop-blur-md text-black p-8 flex items-center justify-center fixed inset-0 z-50">
        <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="max-w-2xl w-full bg-white border border-gray-200 rounded-3xl p-8 shadow-2xl relative">
          <h1 className="text-3xl font-bold mb-4 text-black">Product Setup Manual</h1>
          <div className="prose prose-sm text-gray-600 mb-8 max-h-[60vh] overflow-y-auto no-scrollbar">
            <h3>Congratulations on your new product!</h3>
            <p>Your application architecture has been fully compiled and deployed into a live environment. Below are the steps to take ownership:</p>
            <ol className="list-decimal pl-5 space-y-3 mt-4 font-mono text-sm">
                <li><strong>Review the UI:</strong> Test all buttons and screens to ensure the product matches your initial vision.</li>
                <li><strong>Iterate with AI:</strong> Use the Chat-to-Edit panel on the right side to request any layout or logic modifications.</li>
                <li><strong>Connect Backend:</strong> Click on &quot;Environment Secrets&quot; to safely paste your Supabase URL or alternative API endpoints.</li>
                <li><strong>Share with Users:</strong> Click the &quot;Copy Live Link&quot; button to immediately share this working prototype with investors or target users.</li>
            </ol>
            <p className="mt-6 font-bold text-black text-lg">You are now ready to scale.</p>
          </div>
          <button
            onClick={() => setShowManual(false)}
            className="w-full bg-black text-white font-bold py-4 rounded-xl hover:bg-neutral-800 transition-all active:scale-95"
          >
            Return to Application
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
        <script src="https://cdn.tailwindcss.com"></script>
        <style>
           body { font-family: system-ui, -apple-system, sans-serif; }
           ${appData?.css || ''}
        </style>
        <script>
           // Safely inject JSON to prevent XSS by escaping HTML tags inside the string
           window.ENV = {
             SUPABASE_URL: ${JSON.stringify(mockKey || '').replace(/</g, '\\u003c')}
           };
        </script>
      </head>
      <body>
        ${appData?.html || ''}
        <script>${(appData?.js || '').replace(/<\/script>/gi, '<\\/script>')}</script>
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
           <button onClick={() => setShowManual(true)} className="text-xs font-bold text-blue-600 hover:underline flex items-center gap-1 bg-transparent border-none cursor-pointer outline-none">
             User Manual & Setup
           </button>
           <button onClick={handleCopyLink} className="text-sm font-bold text-neutral-600 flex items-center gap-2 hover:bg-gray-200 px-3 py-1 rounded-md transition-colors border border-gray-300">
              Copy Live Link
           </button>
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
          sandbox="allow-scripts allow-forms allow-popups allow-modals"
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
                value={chatPrompt}
                onChange={(e) => setChatPrompt(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleChatEdit()}
                placeholder={isUpdating ? "Applying changes..." : "Make the button blue..."}
                disabled={isUpdating}
                className="w-full bg-transparent text-sm px-3 py-2 outline-none disabled:opacity-50"
              />
              <button
                 onClick={handleChatEdit}
                 disabled={isUpdating || !chatPrompt.trim()}
                 className="bg-black text-white p-2 rounded-xl shrink-0 hover:bg-neutral-800 transition-transform hover:scale-105 active:scale-95 disabled:opacity-50 disabled:hover:scale-100"
              >
                {isUpdating ? <span className="animate-spin text-xs">...</span> : <Terminal className="w-4 h-4" />}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
