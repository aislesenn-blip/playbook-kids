"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { PenTool, Bot, LayoutTemplate, Printer, FileText, Send, Download, Loader2, Sparkles, AlertCircle } from "lucide-react";

export default function WorkspacePage() {
  const [prompt, setPrompt] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [documentContent, setDocumentContent] = useState<string | null>(null);
  const [documentType, setDocumentType] = useState<"letter" | "table" | "notes" | null>(null);

  const handleGenerate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!prompt.trim()) return;

    setIsGenerating(true);
    setDocumentContent(null);

    // Simulate AI generation delay
    setTimeout(() => {
      let content = "";
      let type: "letter" | "table" | "notes" = "notes";

      const lowerPrompt = prompt.toLowerCase();

      if (lowerPrompt.includes("letter") || lowerPrompt.includes("barua")) {
        type = "letter";
        content = `
          <div class="text-right mb-8">
            <p>Your Name Here</p>
            <p>Registration Number</p>
            <p>University Name</p>
            <p>Date: ${new Date().toLocaleDateString()}</p>
          </div>
          <div class="mb-8">
            <p>To,</p>
            <p>The Dean of Students,</p>
            <p>University Name</p>
          </div>
          <div class="mb-6 font-bold underline text-center">
            <p>REF: PERMISSION REQUEST</p>
          </div>
          <div class="space-y-4 text-justify">
            <p>Dear Sir/Madam,</p>
            <p>I am writing this letter to formally request permission for [Based on prompt: ${prompt.substring(0, 50)}...].</p>
            <p>I understand the academic requirements and I assure you that I will make up for any missed work during my absence.</p>
            <p>Thank you for considering my request.</p>
          </div>
          <div class="mt-12">
            <p>Yours Sincerely,</p>
            <p class="mt-8 border-t border-black w-48 pt-2">Signature & Name</p>
          </div>
        `;
      } else if (lowerPrompt.includes("table") || lowerPrompt.includes("jadwali") || lowerPrompt.includes("timetable")) {
         type = "table";
         content = `
           <h2 class="text-xl font-bold text-center mb-6">Generated Table based on: ${prompt.substring(0, 30)}...</h2>
           <table class="w-full border-collapse border border-gray-300 text-sm">
             <thead>
               <tr class="bg-gray-100">
                 <th class="border border-gray-300 p-2 text-left">No.</th>
                 <th class="border border-gray-300 p-2 text-left">Item Description</th>
                 <th class="border border-gray-300 p-2 text-center">Quantity</th>
                 <th class="border border-gray-300 p-2 text-right">Remarks</th>
               </tr>
             </thead>
             <tbody>
               <tr>
                 <td class="border border-gray-300 p-2">1</td>
                 <td class="border border-gray-300 p-2">Item Alpha</td>
                 <td class="border border-gray-300 p-2 text-center">10</td>
                 <td class="border border-gray-300 p-2 text-right">Pending</td>
               </tr>
               <tr>
                 <td class="border border-gray-300 p-2">2</td>
                 <td class="border border-gray-300 p-2">Item Beta</td>
                 <td class="border border-gray-300 p-2 text-center">5</td>
                 <td class="border border-gray-300 p-2 text-right">Completed</td>
               </tr>
                <tr>
                 <td class="border border-gray-300 p-2">3</td>
                 <td class="border border-gray-300 p-2">Item Gamma</td>
                 <td class="border border-gray-300 p-2 text-center">20</td>
                 <td class="border border-gray-300 p-2 text-right">In Progress</td>
               </tr>
             </tbody>
           </table>
         `;
      } else {
        type = "notes";
        content = `
          <h1 class="text-3xl font-black mb-6 text-center border-b pb-4">Formatted Notes</h1>
          <div class="space-y-4">
             <h3 class="text-lg font-bold text-gray-800">1. Introduction</h3>
             <p class="text-gray-700 leading-relaxed text-justify">Based on your input ("${prompt}"), here is a structured and formatted version of your notes. Proper headings, paragraphs, and spacing have been applied automatically to make it readable and ready for printing.</p>

             <h3 class="text-lg font-bold text-gray-800 mt-6">2. Key Points</h3>
             <ul class="list-disc pl-6 space-y-2 text-gray-700">
               <li>Automatic margin adjustment for standard A4 printing.</li>
               <li>Intelligent paragraph breaks.</li>
               <li>Grammar and typo correction applied.</li>
             </ul>
          </div>
        `;
      }

      setDocumentType(type);
      setDocumentContent(content);
      setIsGenerating(false);
    }, 2500);
  };

  return (
    <div className="min-h-screen bg-gray-50 pt-20 pb-24 flex flex-col">
      <div className="max-w-7xl mx-auto px-4 w-full flex-grow flex flex-col lg:flex-row gap-6">

        {/* Left Side - Prompts & Settings */}
        <div className="w-full lg:w-1/3 flex flex-col gap-6">
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-border">
            <div className="flex items-center gap-3 mb-6">
              <div className="bg-primary/10 p-3 rounded-xl">
                <Bot className="w-6 h-6 text-primary" />
              </div>
              <div>
                <h2 className="text-xl font-bold">AI Assistant</h2>
                <p className="text-sm text-muted-foreground">Tell me what to format or write</p>
              </div>
            </div>

            <form onSubmit={handleGenerate} className="flex flex-col gap-4">
              <div className="relative">
                <textarea
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                  placeholder="e.g. Write a permission letter to the Dean for a 3-day sick leave starting tomorrow..."
                  className="w-full h-40 p-4 bg-gray-50 border border-gray-200 rounded-xl resize-none focus:outline-none focus:ring-2 focus:ring-primary/50 text-gray-800 placeholder-gray-400"
                  disabled={isGenerating}
                />
                <div className="absolute bottom-3 right-3 text-xs font-bold text-gray-400 flex items-center gap-1">
                  <Sparkles className="w-3 h-3"/> AI Magic
                </div>
              </div>

              <button
                type="submit"
                disabled={isGenerating || !prompt.trim()}
                className="w-full bg-primary hover:bg-primary/90 disabled:bg-primary/50 disabled:cursor-not-allowed text-white font-bold py-4 rounded-xl flex items-center justify-center gap-2 transition-colors shadow-lg shadow-primary/20"
              >
                {isGenerating ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" /> Processing...
                  </>
                ) : (
                  <>
                    <Send className="w-5 h-5" /> Generate Document
                  </>
                )}
              </button>
            </form>

            <div className="mt-8 pt-6 border-t border-gray-100">
               <h3 className="text-sm font-bold text-gray-900 mb-4 flex items-center gap-2">
                 <LayoutTemplate className="w-4 h-4"/> Quick Templates
               </h3>
               <div className="flex flex-wrap gap-2">
                 <button onClick={() => setPrompt("Write a formal apology letter for missing an exam")} className="text-xs font-bold bg-gray-100 hover:bg-gray-200 text-gray-700 px-3 py-2 rounded-lg transition-colors">Apology Letter</button>
                 <button onClick={() => setPrompt("Create a 5-column table for my weekly budget")} className="text-xs font-bold bg-gray-100 hover:bg-gray-200 text-gray-700 px-3 py-2 rounded-lg transition-colors">Budget Table</button>
                 <button onClick={() => setPrompt("Format these rough notes into a professional report: [paste notes]")} className="text-xs font-bold bg-gray-100 hover:bg-gray-200 text-gray-700 px-3 py-2 rounded-lg transition-colors">Format Notes</button>
               </div>
            </div>
          </div>

          {/* Send to Print Card (only visible if document is generated) */}
          <AnimatePresence>
            {documentContent && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-gray-900 p-6 rounded-2xl shadow-xl text-white border border-gray-800"
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="bg-white/10 p-3 rounded-xl">
                    <Printer className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h2 className="text-lg font-bold">Ready to Print</h2>
                    <p className="text-sm text-gray-400">Send to local stationary</p>
                  </div>
                </div>
                <p className="text-sm text-gray-300 mb-6 font-medium">
                  Your document is perfectly formatted for A4 paper. Select a nearby stationary to print.
                </p>
                <div className="flex flex-col gap-3">
                  <button className="w-full bg-white hover:bg-gray-100 text-gray-900 font-bold py-3 rounded-xl flex items-center justify-center gap-2 transition-colors">
                    <Printer className="w-4 h-4" /> Send to Print Station
                  </button>
                  <button className="w-full bg-transparent border border-gray-700 hover:bg-gray-800 text-white font-bold py-3 rounded-xl flex items-center justify-center gap-2 transition-colors">
                    <Download className="w-4 h-4" /> Download PDF
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Right Side - Document Preview (A4 Page simulation) */}
        <div className="w-full lg:w-2/3 bg-gray-200/50 rounded-2xl border border-border p-4 sm:p-8 flex items-start justify-center overflow-y-auto max-h-[80vh] custom-scrollbar">

          {isGenerating ? (
            <div className="flex flex-col items-center justify-center h-full w-full text-center text-muted-foreground mt-20">
               <div className="w-24 h-32 bg-white shadow-md rounded flex items-center justify-center mb-6 animate-pulse border border-gray-200">
                 <Loader2 className="w-8 h-8 text-primary animate-spin" />
               </div>
               <p className="font-bold text-lg text-gray-600">AI is formatting your document...</p>
               <p className="text-sm">Applying perfect margins and structure.</p>
            </div>
          ) : documentContent ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-white w-full max-w-[210mm] min-h-[297mm] shadow-2xl p-10 sm:p-16 border border-gray-300 font-serif text-gray-900"
            >
               {/* Document Safe Margin Indicators (visible only in preview) */}
               <div className="absolute top-4 right-4 text-[10px] font-bold text-gray-400 font-sans flex items-center gap-1 bg-gray-100 px-2 py-1 rounded">
                 <AlertCircle className="w-3 h-3"/> Print Preview (A4)
               </div>

               <div
                 className="prose prose-sm sm:prose-base max-w-none w-full"
                 dangerouslySetInnerHTML={{ __html: documentContent }}
               />
            </motion.div>
          ) : (
            <div className="flex flex-col items-center justify-center h-full w-full text-center text-muted-foreground mt-20">
               <div className="w-24 h-32 bg-white shadow-sm rounded flex items-center justify-center mb-6 border border-gray-200 border-dashed">
                 <FileText className="w-8 h-8 text-gray-300" />
               </div>
               <p className="font-bold text-lg text-gray-500">Document Preview</p>
               <p className="text-sm max-w-xs">Your perfectly formatted A4 document will appear here.</p>
            </div>
          )}

        </div>

      </div>
    </div>
  );
}
