"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Settings, Bot, FileText, Send, Download, Loader2, Sparkles, AlertCircle, UploadCloud, FileType, Columns, Type, CheckCircle, Printer } from "lucide-react";
import Link from "next/link";

export default function WorkspacePage() {
  const [activeTab, setActiveTab] = useState<"upload" | "write">("write");
  const [instructions, setInstructions] = useState("");
  const [rawText, setRawText] = useState("");
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [referenceFile, setReferenceFile] = useState<File | null>(null);

  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedContent, setGeneratedContent] = useState<string | null>(null);
  const [isEditing, setIsEditing] = useState(false); // To toggle Rich Text Editor mode

  const handleGenerate = (e: React.FormEvent) => {
    e.preventDefault();
    if (activeTab === "write" && !rawText.trim()) return;
    if (activeTab === "upload" && !uploadedFile) return;

    setIsGenerating(true);
    setGeneratedContent(null);
    setIsEditing(false);

    // Simulate AI parsing, formatting, grammar fixing, table drawing
    setTimeout(() => {
      let finalContent = "";

      if (instructions.toLowerCase().includes("table") || instructions.toLowerCase().includes("jedwali")) {
        finalContent = `
           <h2 class="text-2xl font-bold text-center mb-6 text-gray-900">Extracted Data Table</h2>
           <p class="mb-4 text-gray-700">As per your instructions, the messy data has been extracted and structured into a professional table.</p>
           <table class="w-full border-collapse border border-gray-400 text-sm">
             <thead>
               <tr class="bg-gray-100 font-bold">
                 <th class="border border-gray-400 p-3 text-left">No.</th>
                 <th class="border border-gray-400 p-3 text-left">Item / Description</th>
                 <th class="border border-gray-400 p-3 text-center">Amount (TZS)</th>
                 <th class="border border-gray-400 p-3 text-right">Status</th>
               </tr>
             </thead>
             <tbody>
               <tr>
                 <td class="border border-gray-400 p-3">1</td>
                 <td class="border border-gray-400 p-3">Stationary Supplies</td>
                 <td class="border border-gray-400 p-3 text-center">15,000</td>
                 <td class="border border-gray-400 p-3 text-right text-emerald-600 font-bold">Cleared</td>
               </tr>
               <tr>
                 <td class="border border-gray-400 p-3">2</td>
                 <td class="border border-gray-400 p-3">Research Field Work</td>
                 <td class="border border-gray-400 p-3 text-center">50,000</td>
                 <td class="border border-gray-400 p-3 text-right text-amber-600 font-bold">Pending</td>
               </tr>
                <tr>
                 <td class="border border-gray-400 p-3">3</td>
                 <td class="border border-gray-400 p-3">Printing & Binding</td>
                 <td class="border border-gray-400 p-3 text-center">25,000</td>
                 <td class="border border-gray-400 p-3 text-right text-emerald-600 font-bold">Cleared</td>
               </tr>
               <tr class="bg-gray-50 font-bold">
                 <td class="border border-gray-400 p-3 text-right" colspan="2">Total</td>
                 <td class="border border-gray-400 p-3 text-center">90,000</td>
                 <td class="border border-gray-400 p-3"></td>
               </tr>
             </tbody>
           </table>
        `;
      } else {
        // Standard formatted document with grammar fix simulation
        finalContent = `
          <div class="text-right mb-12 text-sm text-gray-800">
            <p class="font-bold">John Doe</p>
            <p>Registration Number: 2023-04-12345</p>
            <p>Department of Computer Science</p>
            <p>Date: ${new Date().toLocaleDateString()}</p>
          </div>

          <div class="mb-10 text-sm text-gray-800">
            <p>To,</p>
            <p class="font-bold">The Head of Department,</p>
            <p>Faculty of Science,</p>
          </div>

          <div class="mb-8 font-black underline text-center text-lg text-gray-900 tracking-wide">
            <p>REF: SUBMISSION OF RESEARCH PROPOSAL</p>
          </div>

          <div class="space-y-6 text-justify text-base leading-loose text-gray-800">
            <p>Dear Sir/Madam,</p>
            <p>I am writing to formally submit my research proposal titled "AI-Powered Stationary Engines for African Universities" for your review and approval. The document has been prepared in accordance with the departmental guidelines.</p>
            <p>My raw notes have been automatically corrected for grammatical errors and structural inconsistencies. The margins have been aligned perfectly for A4 printing.</p>
            <p>I kindly request your feedback at your earliest convenience.</p>
          </div>

          <div class="mt-16 text-sm text-gray-800">
            <p>Yours Sincerely,</p>
            <p class="mt-12 border-t border-black w-48 pt-2">John Doe</p>
          </div>
        `;
      }

      setGeneratedContent(finalContent);
      setIsGenerating(false);
    }, 3000);
  };

  return (
    <div className="min-h-screen bg-gray-50 pt-20 pb-24 flex flex-col font-sans">
      <div className="max-w-[1600px] mx-auto px-4 w-full flex-grow flex flex-col xl:flex-row gap-6">

        {/* Left Side - The Engine Input Controls */}
        <div className="w-full xl:w-[450px] flex flex-col gap-6 shrink-0">

          <div className="bg-white rounded-3xl shadow-sm border border-gray-200 overflow-hidden flex flex-col">

            {/* Engine Header */}
            <div className="p-6 border-b border-gray-100 bg-gray-900 text-white">
              <div className="flex items-center gap-3 mb-2">
                <div className="bg-white/10 p-2 rounded-xl">
                  <Settings className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h2 className="text-lg font-bold tracking-tight">Formatting Engine</h2>
                </div>
              </div>
              <p className="text-xs text-gray-400 font-medium leading-relaxed">
                Provide your raw content and instructions. The AI will correct grammar, align margins, draw tables, and prep it for printing.
              </p>
            </div>

            {/* Input Method Tabs */}
            <div className="flex p-2 bg-gray-50 border-b border-gray-100">
              <button
                onClick={() => setActiveTab("write")}
                className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-xl text-sm font-bold transition-all ${activeTab === "write" ? "bg-white text-gray-900 shadow-sm border border-gray-200" : "text-gray-500 hover:text-gray-900"}`}
              >
                <Type className="w-4 h-4" /> Type / Paste
              </button>
              <button
                onClick={() => setActiveTab("upload")}
                className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-xl text-sm font-bold transition-all ${activeTab === "upload" ? "bg-white text-gray-900 shadow-sm border border-gray-200" : "text-gray-500 hover:text-gray-900"}`}
              >
                <UploadCloud className="w-4 h-4" /> Upload File
              </button>
            </div>

            <form onSubmit={handleGenerate} className="p-6 flex flex-col gap-6 flex-grow overflow-y-auto custom-scrollbar">

              {/* Primary Content Input */}
              {activeTab === "write" ? (
                <div className="space-y-2">
                  <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">Raw Content</label>
                  <textarea
                    value={rawText}
                    onChange={(e) => setRawText(e.target.value)}
                    placeholder="Paste your messy notes, rough draft, or unformatted text here..."
                    className="w-full h-48 p-4 bg-gray-50 border border-gray-200 rounded-2xl resize-none focus:outline-none focus:ring-2 focus:ring-gray-900 text-gray-800 placeholder-gray-400 text-sm leading-relaxed"
                  />
                </div>
              ) : (
                <div className="space-y-2">
                  <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">Raw Document</label>
                  <div className="border-2 border-dashed border-gray-300 rounded-2xl p-8 flex flex-col items-center justify-center text-center hover:bg-gray-50 transition-colors cursor-pointer bg-gray-50/50">
                    <FileType className="w-10 h-10 text-gray-400 mb-3" />
                    <p className="text-sm font-bold text-gray-700 mb-1">Click to upload document</p>
                    <p className="text-xs text-gray-500">Supports .docx, .txt, .pdf</p>
                    <input type="file" className="hidden" onChange={(e) => setUploadedFile(e.target.files?.[0] || null)} />
                    {uploadedFile && (
                      <div className="mt-4 flex items-center gap-2 text-xs font-bold text-emerald-600 bg-emerald-50 px-3 py-1.5 rounded-full border border-emerald-200">
                        <CheckCircle className="w-4 h-4" /> {uploadedFile.name}
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Advanced Instructions */}
              <div className="space-y-2 pt-4 border-t border-gray-100">
                <label className="text-xs font-bold text-gray-500 uppercase tracking-wider flex items-center justify-between">
                  Formatting Instructions
                  <span className="bg-primary/10 text-primary px-2 py-0.5 rounded text-[10px]">AI Prompt</span>
                </label>
                <textarea
                  value={instructions}
                  onChange={(e) => setInstructions(e.target.value)}
                  placeholder="e.g. 'Extract the numbers and draw a 4-column table', or 'Fix grammar and format this as a formal APA letter'."
                  className="w-full h-24 p-4 bg-gray-50 border border-gray-200 rounded-2xl resize-none focus:outline-none focus:ring-2 focus:ring-gray-900 text-gray-800 placeholder-gray-400 text-sm leading-relaxed"
                />
              </div>

              {/* Reference Upload (Optional) */}
              <div className="space-y-2 pt-4 border-t border-gray-100">
                <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">Reference Style (Optional)</label>
                <div className="border border-gray-200 rounded-xl p-4 flex items-center justify-between bg-white hover:bg-gray-50 transition-colors cursor-pointer">
                   <div className="flex items-center gap-3">
                     <Columns className="w-5 h-5 text-gray-400" />
                     <div className="text-left">
                       <p className="text-sm font-bold text-gray-700">Upload Example Format</p>
                       <p className="text-xs text-gray-500">Make it look exactly like this file.</p>
                     </div>
                   </div>
                   <input type="file" className="hidden" onChange={(e) => setReferenceFile(e.target.files?.[0] || null)} />
                   {referenceFile && <CheckCircle className="w-5 h-5 text-emerald-500" />}
                </div>
              </div>

              <button
                type="submit"
                disabled={isGenerating || (activeTab === "write" ? !rawText.trim() : !uploadedFile)}
                className="w-full bg-gray-900 hover:bg-black disabled:bg-gray-300 disabled:text-gray-500 disabled:cursor-not-allowed text-white font-bold py-5 rounded-2xl flex items-center justify-center gap-2 transition-all shadow-xl mt-4"
              >
                {isGenerating ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" /> Engine Processing...
                  </>
                ) : (
                  <>
                    <Sparkles className="w-5 h-5" /> Execute Formatting
                  </>
                )}
              </button>
            </form>
          </div>

        </div>

        {/* Right Side - Interactive Output / Rich Text Editor */}
        <div className="w-full flex-grow flex flex-col bg-white rounded-3xl shadow-sm border border-gray-200 overflow-hidden">

          {/* Editor Toolbar */}
          <div className="h-16 border-b border-gray-200 bg-gray-50 flex items-center justify-between px-6 shrink-0">
             <div className="flex items-center gap-6">
                <div className="flex items-center gap-2 text-sm font-bold text-gray-500">
                  <FileText className="w-4 h-4" />
                  {generatedContent ? "Document.pdf" : "Untitled Document"}
                </div>
                {generatedContent && (
                  <div className="hidden sm:flex items-center gap-1 bg-white border border-gray-200 rounded-lg p-1 shadow-sm">
                    <button className="px-3 py-1.5 hover:bg-gray-100 rounded text-xs font-bold text-gray-700">B</button>
                    <button className="px-3 py-1.5 hover:bg-gray-100 rounded text-xs font-bold italic text-gray-700">I</button>
                    <button className="px-3 py-1.5 hover:bg-gray-100 rounded text-xs font-bold underline text-gray-700">U</button>
                    <div className="w-px h-4 bg-gray-300 mx-1"></div>
                    <button className="px-3 py-1.5 hover:bg-gray-100 rounded text-xs font-bold text-gray-700">Align</button>
                  </div>
                )}
             </div>

             <div className="flex items-center gap-3">
                {generatedContent && (
                  <>
                    <button
                      onClick={() => setIsEditing(!isEditing)}
                      className={`px-4 py-2 rounded-xl text-sm font-bold transition-colors ${isEditing ? 'bg-amber-100 text-amber-700' : 'bg-gray-200 hover:bg-gray-300 text-gray-800'}`}
                    >
                      {isEditing ? "Finish Editing" : "Manual Edit"}
                    </button>
                    <Link href="/print-station" className="bg-primary hover:bg-primary/90 text-white px-5 py-2 rounded-xl text-sm font-bold transition-colors shadow-lg shadow-primary/20 flex items-center gap-2">
                      <Printer className="w-4 h-4" /> Print PDF
                    </Link>
                  </>
                )}
             </div>
          </div>

          {/* The A4 Canvas Container */}
          <div className="flex-grow bg-[#E5E7EB] p-8 overflow-y-auto flex justify-center custom-scrollbar relative">

             {isGenerating ? (
                <div className="flex flex-col items-center justify-center mt-32 text-center">
                  <div className="w-24 h-32 bg-white shadow-xl rounded-lg flex flex-col items-center justify-center mb-8 border border-gray-300 relative overflow-hidden">
                     <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/5 to-transparent animate-[scan_2s_ease-in-out_infinite]"></div>
                     <Settings className="w-8 h-8 text-gray-400 animate-spin-slow mb-2" />
                  </div>
                  <h3 className="text-xl font-black text-gray-900 mb-2 tracking-tight">Engine is structuring your document...</h3>
                  <p className="text-gray-500 font-medium">Fixing grammar, aligning margins, and generating tables.</p>
                </div>
             ) : generatedContent ? (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="relative"
                >
                  <div className="absolute -left-12 top-4 flex flex-col gap-2">
                    <div className="w-8 h-8 bg-gray-900 text-white rounded-full flex items-center justify-center text-xs font-bold shadow-lg">1</div>
                  </div>

                  {/* A4 Paper Dimensions: ~210mm x 297mm */}
                  <div
                    contentEditable={isEditing}
                    suppressContentEditableWarning={true}
                    className={`bg-white w-full max-w-[800px] min-h-[1131px] shadow-2xl p-16 sm:p-24 border border-gray-300 font-serif text-gray-900 ${isEditing ? 'ring-4 ring-amber-400/50 outline-none' : ''}`}
                  >
                     <div
                       className="prose prose-sm sm:prose-base max-w-none w-full prose-p:leading-relaxed prose-headings:font-sans"
                       dangerouslySetInnerHTML={{ __html: generatedContent }}
                     />
                  </div>
                </motion.div>
             ) : (
                <div className="flex flex-col items-center justify-center mt-32 text-center opacity-50">
                  <div className="w-24 h-32 bg-white/50 shadow-sm rounded-lg flex items-center justify-center mb-6 border-2 border-dashed border-gray-400">
                     <FileText className="w-8 h-8 text-gray-400" />
                  </div>
                  <p className="font-bold text-xl text-gray-500 tracking-tight">Print Preview</p>
                  <p className="text-sm font-medium text-gray-500 mt-2">Your perfectly formatted A4 document will appear here.</p>
                </div>
             )}
          </div>

        </div>

      </div>
    </div>
  );
}
