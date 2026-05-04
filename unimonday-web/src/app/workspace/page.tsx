"use client";

import { useState, useRef, useEffect } from "react";
import { useAppStore } from "@/lib/store/app-store";
import { motion, AnimatePresence } from "framer-motion";
import { Printer, Settings, CheckCircle, Search, FileText, Download, User, Share2, Filter, PenTool, LayoutTemplate, MessageSquare, Plus, Check, Columns, Send, Sparkles, X, Loader2, Maximize2, Minimize2, Save, ChevronUp, ChevronDown, Paperclip, ArrowLeft, List } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function WorkspacePage() {
  const { currentUser } = useAppStore();
  const router = useRouter();

  // HYBRID UI STATE
  const [activeView, setActiveView] = useState<"chat" | "canvas">("chat");
  const [chatInput, setChatInput] = useState("");
  const [messages, setMessages] = useState<Array<{id: number, text: string, sender: string, isDraftCard?: boolean, documentId?: string}>>([
    { id: 1, text: "Hello! I am your AI Cloud Stationary. Upload your messy drafts, or paste text here and tell me how to format them.", sender: "ai" }
  ]);
  const [isProcessing, setIsProcessing] = useState(false);

  // CANVAS UI STATE
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isTocOpen, setIsTocOpen] = useState(false);
  const [fileName, setFileName] = useState("Draft_v1.0.pdf");

  // MOCK BLOCKS (Simulating JSON chunks from DeepSeek)
  const [blocks, setBlocks] = useState([
    { id: 'h1', type: 'heading', content: 'Chapter 1: The AI Paradigm', isHighlighting: false },
    { id: 'p1', type: 'paragraph', content: 'Artificial intelligence fundamentally shifts individualized learning...', isHighlighting: false },
    { id: 'h2', type: 'heading', content: 'Methodology', isHighlighting: false },
    { id: 'p2', type: 'paragraph', content: 'We deployed a multi-variable analysis across 500 samples.', isHighlighting: false },
  ]);

  // Chat Submission Handler
  const handleChatSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!chatInput.trim()) return;

    setMessages(prev => [...prev, { id: Date.now(), text: chatInput, sender: "user" }]);
    setChatInput("");
    setIsProcessing(true);

    // Simulate AI Processing & returning a Progress Card
    setTimeout(() => {
      setIsProcessing(false);
      setMessages(prev => [
        ...prev,
        { id: Date.now() + 1, text: "Structuring your document... I have fixed the grammar, aligned margins, and formatted headings.", sender: "ai", isDraftCard: true }
      ]);
    }, 2000);
  };

  // Magic Drawer (Focused Edit) Handler
  const handleFocusedEdit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!chatInput.trim()) return;

    setIsDrawerOpen(false);

    // Simulate AI modifying a specific chunk
    setTimeout(() => {
      setBlocks(prev => prev.map(b =>
        b.id === 'p1' ? { ...b, content: 'Artificial intelligence fundamentally shifts the paradigm of individualized learning, allowing for real-time pedagogical adjustments.', isHighlighting: true } : b
      ));

      setChatInput("");

      // Remove dopamine highlight after 2.5 seconds
      setTimeout(() => {
         setBlocks(prev => prev.map(b => ({ ...b, isHighlighting: false })));
      }, 2500);
    }, 1500);
  };

  const handlePrint = () => {
    if (!currentUser) {
      alert("Please log in or create an account to send print jobs. This protects our vendors from fraud.");
      router.push("/auth/signup?redirectTo=/workspace");
      return;
    }
    alert(`${fileName} saved to My Files! Routing to Print Station.`);
    router.push('/print-station');
  };

  return (
    <div className="fixed inset-0 top-14 bg-gray-50 flex overflow-hidden z-40 pb-20 sm:pb-0">

       <AnimatePresence mode="wait">
         {/* ======================================================== */}
         {/* VIEW 1: WHATSAPP-STYLE CHAT INTERFACE                      */}
         {/* ======================================================== */}
         {activeView === "chat" && (
            <motion.div
               key="chat"
               initial={{ opacity: 0, x: -20 }}
               animate={{ opacity: 1, x: 0 }}
               exit={{ opacity: 0, x: -20 }}
               className="w-full h-full flex flex-col max-w-4xl mx-auto border-x border-gray-200 bg-white"
            >
               {/* Chat Header */}
               <div className="p-4 border-b border-gray-100 flex items-center justify-between bg-white/90 backdrop-blur shrink-0 z-10">
                 <div className="flex items-center gap-3">
                   <div className="w-10 h-10 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center">
                     <Sparkles className="w-5 h-5" />
                   </div>
                   <div>
                     <h2 className="font-bold text-gray-900">Formatting Engine</h2>
                     <p className="text-xs text-emerald-600 font-bold">● Online</p>
                   </div>
                 </div>
                 <button className="p-2 text-gray-400 hover:bg-gray-100 rounded-full transition-colors">
                   <Settings className="w-5 h-5" />
                 </button>
               </div>

               {/* Messages Area */}
               <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-6 custom-scrollbar bg-gray-50/50">
                 {messages.map((msg) => (
                   <motion.div
                     key={msg.id}
                     initial={{ opacity: 0, y: 10 }}
                     animate={{ opacity: 1, y: 0 }}
                     className={`flex flex-col max-w-[85%] sm:max-w-[70%] ${msg.sender === "user" ? "ml-auto items-end" : "mr-auto items-start"}`}
                   >
                     {!msg.isDraftCard ? (
                       <div className={`p-4 rounded-2xl text-sm sm:text-base leading-relaxed shadow-sm ${msg.sender === "user" ? "bg-emerald-600 text-white rounded-br-none" : "bg-white border border-gray-200 text-gray-800 rounded-bl-none"}`}>
                         {msg.text}
                       </div>
                     ) : (
                       /* AI Draft Card */
                       <div className="bg-white border border-gray-200 rounded-2xl rounded-bl-none shadow-lg overflow-hidden w-full sm:w-80">
                         <div className="p-4 border-b border-gray-100 bg-emerald-50">
                           <div className="flex items-center gap-2 text-emerald-700 font-bold mb-1">
                             <CheckCircle className="w-4 h-4" /> Processing Complete
                           </div>
                           <p className="text-sm text-gray-600">{msg.text}</p>
                         </div>
                         <div className="p-4 flex flex-col gap-3">
                           <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl border border-gray-100">
                             <FileText className="w-8 h-8 text-gray-400" />
                             <div>
                               <p className="text-sm font-bold text-gray-900">Draft_v1.0.pdf</p>
                               <p className="text-xs text-gray-500">4 Blocks • A4 Size</p>
                             </div>
                           </div>
                           <button onClick={() => setActiveView("canvas")} className="w-full bg-gray-900 hover:bg-black text-white font-bold py-3 rounded-xl flex items-center justify-center gap-2 transition-all">
                             <Maximize2 className="w-4 h-4" /> Open Canvas Viewer
                           </button>
                         </div>
                       </div>
                     )}
                   </motion.div>
                 ))}

                 {isProcessing && (
                   <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex gap-3 max-w-[70%] mr-auto items-start">
                     <div className="w-8 h-8 bg-emerald-100 rounded-full flex items-center justify-center shrink-0">
                       <Loader2 className="w-4 h-4 text-emerald-600 animate-spin" />
                     </div>
                     <div className="bg-white border border-gray-200 p-4 rounded-2xl rounded-bl-none shadow-sm flex items-center gap-2">
                       <span className="w-2 h-2 bg-gray-300 rounded-full animate-bounce"></span>
                       <span className="w-2 h-2 bg-gray-300 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></span>
                       <span className="w-2 h-2 bg-gray-300 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></span>
                     </div>
                   </motion.div>
                 )}
               </div>

               {/* Chat Input Area */}
               <div className="p-4 bg-white border-t border-gray-100 shrink-0">
                 <form onSubmit={handleChatSubmit} className="flex items-end gap-2 relative max-w-3xl mx-auto">
                   <button type="button" className="p-3 sm:p-4 text-gray-400 hover:text-emerald-600 hover:bg-emerald-50 rounded-2xl transition-colors shrink-0">
                     <Paperclip className="w-5 h-5 sm:w-6 sm:h-6" />
                   </button>
                   <textarea
                     value={chatInput}
                     onChange={(e) => setChatInput(e.target.value)}
                     onKeyDown={(e) => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); handleChatSubmit(e); } }}
                     placeholder="Type instructions or paste text..."
                     className="flex-1 max-h-32 min-h-[56px] sm:min-h-[60px] bg-gray-100 border-none rounded-3xl px-4 sm:px-6 py-3 sm:py-4 focus:outline-none focus:ring-2 focus:ring-emerald-500 text-sm sm:text-base resize-none custom-scrollbar"
                   />
                   <button
                     type="submit"
                     disabled={isProcessing || !chatInput.trim()}
                     className="p-3 sm:p-4 bg-emerald-600 text-white rounded-full hover:bg-emerald-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed shrink-0 shadow-lg shadow-emerald-600/20"
                   >
                     <Send className="w-5 h-5 sm:w-6 sm:h-6" />
                   </button>
                 </form>
               </div>
            </motion.div>
         )}

         {/* ======================================================== */}
         {/* VIEW 2: THE CANVAS & MAGIC DRAWER (Full Screen Edge-to-Edge) */}
         {/* ======================================================== */}
         {activeView === "canvas" && (
            <motion.div
               key="canvas"
               initial={{ opacity: 0, scale: 0.95 }}
               animate={{ opacity: 1, scale: 1 }}
               exit={{ opacity: 0, scale: 0.95 }}
               className="fixed inset-0 top-14 bg-[#E5E7EB] z-40 flex flex-col md:flex-row overflow-hidden pb-20 sm:pb-0"
            >
               {/* TOC Navigator (Desktop Sidebar / Mobile Overlay) */}
               {isTocOpen && (
                 <motion.div
                    initial={{ x: -300 }}
                    animate={{ x: 0 }}
                    exit={{ x: -300 }}
                    className="absolute md:relative z-40 w-[280px] h-full bg-white border-r border-gray-200 shadow-2xl md:shadow-none flex flex-col"
                 >
                    <div className="p-4 border-b border-gray-100 flex items-center justify-between">
                      <h3 className="font-bold text-gray-900 flex items-center gap-2"><List className="w-4 h-4 text-emerald-600"/> Contents</h3>
                      <button onClick={() => setIsTocOpen(false)} className="md:hidden p-1.5 hover:bg-gray-100 rounded-lg"><X className="w-4 h-4"/></button>
                    </div>
                    <div className="p-4 flex-1 overflow-y-auto space-y-2">
                       <button className="w-full text-left text-sm font-bold text-emerald-600 bg-emerald-50 p-2 rounded-lg">Chapter 1: The AI Paradigm</button>
                       <button className="w-full text-left text-sm font-medium text-gray-600 hover:bg-gray-50 p-2 rounded-lg">Methodology</button>
                       <button className="w-full text-left text-sm font-medium text-gray-600 hover:bg-gray-50 p-2 rounded-lg">Results Table</button>
                    </div>
                 </motion.div>
               )}

               {/* The Canvas Area */}
               <div className="flex-1 overflow-y-auto custom-scrollbar relative p-0 sm:p-8 flex justify-center pb-24 sm:pb-8">
                  {/* Floating Action Bar */}
                  <div className="fixed top-20 left-4 sm:left-8 z-30 flex gap-2">
                     <button onClick={() => setActiveView("chat")} className="p-3 bg-white text-gray-700 shadow-lg border border-gray-200 rounded-full hover:bg-gray-50 transition-colors">
                       <ArrowLeft className="w-5 h-5" />
                     </button>
                     <button onClick={() => setIsTocOpen(!isTocOpen)} className="p-3 bg-white text-gray-700 shadow-lg border border-gray-200 rounded-full hover:bg-gray-50 transition-colors">
                       <List className="w-5 h-5" />
                     </button>
                  </div>

                  <motion.div
                     className="bg-white w-full max-w-[1000px] min-h-[1131px] shadow-2xl border-x sm:border border-gray-300 relative font-serif mt-0 sm:mt-12"
                  >
                     {/* Document Header / Toolbar */}
                     <div className="sticky top-0 bg-white/95 backdrop-blur-md border-b border-gray-200 p-4 sm:p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4 z-20">
                       <input
                         type="text"
                         value={fileName}
                         onChange={(e) => setFileName(e.target.value)}
                         className="text-xl sm:text-2xl font-black text-gray-900 bg-transparent outline-none hover:bg-gray-50 px-2 py-1 rounded transition-colors w-full sm:w-1/2"
                       />
                       <button onClick={handlePrint} className="flex items-center justify-center gap-2 bg-gray-900 text-white px-6 py-3 rounded-xl text-sm font-bold shadow-lg hover:bg-black transition-colors shrink-0">
                         <Printer className="w-4 h-4" /> Save & Print
                       </button>
                     </div>

                     {/* Document Body (TipTap Block Renderer Mock) */}
                     <div className="p-8 sm:p-16 text-gray-800 leading-relaxed space-y-6">
                        {blocks.map((block) => (
                          <motion.div
                            key={block.id}
                            onClick={() => setIsDrawerOpen(true)}
                            animate={{
                              backgroundColor: block.isHighlighting ? 'rgba(16, 185, 129, 0.15)' : 'transparent',
                              scale: block.isHighlighting ? [1, 1.01, 1] : 1
                            }}
                            transition={{ duration: 0.5 }}
                            className={`rounded-xl p-2 -mx-2 transition-colors cursor-text group ${block.isHighlighting ? 'ring-2 ring-emerald-400' : 'hover:bg-gray-50 hover:ring-1 hover:ring-gray-200'}`}
                          >
                            {block.type === 'heading' && <h1 className="text-3xl font-bold font-sans text-gray-900 mb-2">{block.content}</h1>}
                            {block.type === 'paragraph' && <p className="text-base sm:text-lg text-justify">{block.content}</p>}
                            <div className="opacity-0 group-hover:opacity-100 absolute -left-6 text-gray-300 transition-opacity">
                              <PenTool className="w-4 h-4" />
                           </div>
                          </motion.div>
                        ))}
                     </div>
                  </motion.div>
               </div>

               {/* MAGIC DRAWER (Bottom Sheet for Editing Specific Blocks) */}
               <AnimatePresence>
                 {isDrawerOpen ? (
                   <motion.div
                     initial={{ y: "100%" }}
                     animate={{ y: 0 }}
                     exit={{ y: "100%" }}
                     transition={{ type: "spring", damping: 25, stiffness: 200 }}
                     className="fixed bottom-0 left-0 right-0 md:left-1/4 md:right-1/4 bg-white shadow-[0_-10px_40px_rgba(0,0,0,0.1)] z-50 rounded-t-3xl flex flex-col border border-gray-200"
                   >
                      <div className="p-3 border-b border-gray-100 flex items-center justify-between bg-gray-50/80 rounded-t-3xl cursor-pointer" onClick={() => setIsDrawerOpen(false)}>
                         <div className="w-12 h-1 bg-gray-300 rounded-full mx-auto absolute left-1/2 -translate-x-1/2 top-3"></div>
                         <h3 className="font-bold text-gray-900 flex items-center gap-2 ml-4 mt-2">
                           <Sparkles className="w-4 h-4 text-emerald-500" /> Edit Section
                         </h3>
                         <button className="p-1 text-gray-400 hover:bg-gray-200 rounded-full transition-colors mt-2">
                           <ChevronDown className="w-5 h-5" />
                         </button>
                      </div>
                      <div className="p-4 bg-white">
                         <form onSubmit={handleFocusedEdit} className="flex items-end gap-2 relative">
                           <textarea
                             value={chatInput}
                             onChange={(e) => setChatInput(e.target.value)}
                             onKeyDown={(e) => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); handleFocusedEdit(e); } }}
                             placeholder="e.g. 'Make this paragraph formal' or 'Underline key words'"
                             className="flex-1 h-20 bg-gray-100 border-none rounded-2xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-emerald-500 text-sm resize-none"
                             autoFocus
                           />
                           <button
                             type="submit"
                             disabled={!chatInput.trim()}
                             className="p-3 bg-emerald-600 text-white rounded-xl hover:bg-emerald-700 transition-colors disabled:opacity-50 shrink-0 shadow-lg"
                           >
                             <Send className="w-5 h-5" />
                           </button>
                         </form>
                      </div>
                   </motion.div>
                 ) : (
                   <motion.div
                     initial={{ y: 100, opacity: 0 }}
                     animate={{ y: 0, opacity: 1 }}
                     className="fixed bottom-6 left-1/2 -translate-x-1/2 z-40"
                   >
                     <button
                       onClick={() => setIsDrawerOpen(true)}
                       className="bg-gray-900 text-white px-6 py-4 rounded-full font-bold shadow-2xl flex items-center gap-2 border-2 border-white/20 hover:scale-105 transition-transform"
                     >
                       <Sparkles className="w-5 h-5 text-emerald-400" /> Edit with AI
                     </button>
                   </motion.div>
                 )}
               </AnimatePresence>

            </motion.div>
         )}
       </AnimatePresence>
    </div>
  );
}
