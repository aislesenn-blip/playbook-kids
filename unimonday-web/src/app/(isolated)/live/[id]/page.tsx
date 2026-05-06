"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { supabase } from "@/lib/supabase/client";
import { Terminal } from "lucide-react";

export default function LivePage() {
  const { id } = useParams();
  const [appData, setAppData] = useState<{id: string, html: string, js: string, css: string} | null>(null);
  const [loading, setLoading] = useState(true);
  const [blobUrl, setBlobUrl] = useState<string>("");

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
            html: `<div style="text-align:center; padding: 50px; font-family: sans-serif;"><h2>App Not Found</h2><p>The requested application could not be found or is currently unavailable.</p></div>`,
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

  useEffect(() => {
    let url: string | null = null;
    if (appData && !loading) {
      const injectedHtml = `
        <!DOCTYPE html>
        <html>
          <head>
            <meta charset="utf-8">
            <meta name="viewport" content="width=device-width, initial-scale=1">
            <script src="https://cdn.tailwindcss.com"></script>
            <style>
               body { font-family: system-ui, -apple-system, sans-serif; }
               ::-webkit-scrollbar { display: none !important; width: 0 !important; height: 0 !important; }
               * { -ms-overflow-style: none !important; scrollbar-width: none !important; }
               ${appData.css || ''}
            </style>
            <script>
               window.ENV = { SUPABASE_URL: "" };
            </script>
          </head>
          <body>
            ${appData.html || ''}
            <script>${(appData.js || '').replace(/<\/script>/gi, '<\\/script>')}</script>
          </body>
        </html>
      `;
      const blob = new Blob([injectedHtml], { type: 'text/html' });
      url = URL.createObjectURL(blob);
      // use setTimeout to push state update to end of event loop to avoid synchronous set-state-in-effect warning
      setTimeout(() => setBlobUrl(url!), 0);
    }
    return () => {
      if (url) URL.revokeObjectURL(url);
    };
  }, [appData, loading]);

  if (loading) {
    return <div className="min-h-screen bg-neutral-900 flex items-center justify-center text-white"><Terminal className="w-8 h-8 animate-bounce" /></div>;
  }

  return (
    <div className="w-full h-screen flex flex-col bg-white">
      {blobUrl && (
        <iframe
          title="Live App"
          className="flex-1 w-full h-full border-none"
          sandbox="allow-scripts allow-forms allow-popups allow-modals"
          src={blobUrl}
        />
      )}
    </div>
  );
}
