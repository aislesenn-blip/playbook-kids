"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Send, FileText, Loader2, Sparkles, AlertCircle, UploadCloud, FileType, CheckCircle, Bot } from "lucide-react";
import { useWorkspaceStore } from "@/lib/store/workspace-store";
import TipTapModal from "@/components/workspace/TipTapModal";

export default function WorkspacePage() {
  const { messages, isProcessing, addMessage, processAIResponse, setActiveBlock } = useWorkspaceStore();
  const [prompt, setPrompt] = useState("");
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom of chat
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isProcessing]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!prompt.trim() && !uploadedFile) return;

    const userMessage = prompt.trim() || `Uploaded: ${uploadedFile?.name}`;
    addMessage({ sender: 'user', text: userMessage });

    setPrompt("");
    setUploadedFile(null);

    // Simulate sending to DeepSeek API
    const mockJsonStructure = JSON.stringify({
      type: "doc",
      content: [
        { type: "heading", attrs: { level: 2 }, content: [{ type: "text", text: "Extracted Data Table" }] },
        { type: "paragraph", content: [{ type: "text", text: "As requested, here is the beautifully structured table." }] },
        {
          type: "table",
          content: [
             {
               type: "tableRow",
               content: [
                 { type: "tableHeader", content: [{ type: "paragraph", content: [{ type: "text", text: "Item" }] }] },
                 { type: "tableHeader", content: [{ type: "paragraph", content: [{ type: "text", text: "Amount" }] }] }
               ]
             },
             {
               type: "tableRow",
               content: [
                 { type: "tableCell", content: [{ type: "paragraph", content: [{ type: "text", text: "Stationary Supplies" }] }] },
                 { type: "tableCell", content: [{ type: "paragraph", content: [{ type: "text", text: "$450" }] }] }
               ]
             }
          ]
        }
      ]
    });

    // Simulate AI thinking delay before calling the store
    setTimeout(() => {
       processAIResponse(mockJsonStructure, "Data Table Extraction");
    }, 1500);
  };

  return (
    <div className="flex flex-col h-[calc(100vh-64px)] bg-[#f0f2f5] relative overflow-hidden">

      {/* Main Chat Thread Area */}
      <div className="flex-grow overflow-y-auto p-4 sm:p-6 custom-scrollbar pb-32">
        <div className="max-w-3xl mx-auto space-y-6">

          <div className="text-center text-xs font-bold text-gray-400 my-4 uppercase tracking-wider">Today</div>

          <AnimatePresence initial={false}>
            {messages.map((msg) => (
              <motion.div
                key={msg.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className={`flex w-full ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                {msg.sender === 'ai' && (
                  <div className="w-8 h-8 rounded-full bg-emerald-100 flex items-center justify-center mr-2 shrink-0 self-end mb-1">
                    <Bot className="w-5 h-5 text-emerald-600" />
                  </div>
                )}

                <div className={`flex flex-col max-w-[85%] sm:max-w-[75%] ${msg.sender === 'user' ? 'items-end' : 'items-start'}`}>

                  {/* Chat Bubble */}
                  <div
                    className={`px-4 py-3 rounded-2xl shadow-sm ${
                      msg.sender === 'user'
                        ? 'bg-emerald-600 text-white rounded-br-sm'
                        : 'bg-white text-gray-800 rounded-bl-sm border border-gray-100'
                    }`}
                  >
                    <p className="whitespace-pre-wrap text-[15px] leading-relaxed">{msg.text}</p>
                  </div>

                  {/* AI Draft Card (Progressive Disclosure) */}
                  {msg.draftBlockId && (
                    <motion.div
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => setActiveBlock(msg.draftBlockId!)}
                      className="mt-2 bg-white border border-gray-200 p-4 rounded-xl shadow-md cursor-pointer w-full max-w-sm flex items-center gap-4 group"
                    >
                      <div className="w-12 h-12 bg-emerald-50 rounded-lg flex items-center justify-center shrink-0 group-hover:bg-emerald-100 transition-colors">
                        <FileText className="w-6 h-6 text-emerald-600" />
                      </div>
                      <div className="flex-grow min-w-0">
                        <p className="font-bold text-gray-900 text-sm truncate">Review Document Draft</p>
                        <p className="text-xs text-gray-500 font-medium truncate flex items-center gap-1 mt-1">
                          <CheckCircle className="w-3 h-3 text-emerald-500" /> Ready for review
                        </p>
                      </div>
                      <button className="text-xs font-bold bg-gray-100 hover:bg-gray-200 text-gray-700 px-3 py-1.5 rounded-lg transition-colors shrink-0">
                        Open
                      </button>
                    </motion.div>
                  )}

                  <span className="text-[10px] font-bold text-gray-400 mt-1 mx-1">
                    {new Date(msg.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </span>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>

          {/* Typing Indicator */}
          {isProcessing && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex items-center gap-2 text-gray-500"
            >
              <div className="w-8 h-8 rounded-full bg-emerald-100 flex items-center justify-center mr-2 shrink-0">
                <Loader2 className="w-5 h-5 text-emerald-600 animate-spin" />
              </div>
              <div className="bg-white px-4 py-3 rounded-2xl rounded-bl-sm border border-gray-100 shadow-sm flex items-center gap-1">
                <span className="w-2 h-2 bg-gray-300 rounded-full animate-bounce"></span>
                <span className="w-2 h-2 bg-gray-300 rounded-full animate-bounce" style={{ animationDelay: "0.2s" }}></span>
                <span className="w-2 h-2 bg-gray-300 rounded-full animate-bounce" style={{ animationDelay: "0.4s" }}></span>
              </div>
            </motion.div>
          )}

          <div ref={messagesEndRef} />
        </div>
      </div>

      {/* Input Area (Magic Drawer) */}
      <div className="absolute bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-4 py-3 sm:px-6 z-10 shadow-[0_-10px_40px_rgba(0,0,0,0.05)]">
        <form onSubmit={handleSubmit} className="max-w-3xl mx-auto">

          {/* File Upload Preview */}
          <AnimatePresence>
            {uploadedFile && (
              <motion.div
                initial={{ opacity: 0, y: 10, height: 0 }}
                animate={{ opacity: 1, y: 0, height: 'auto' }}
                exit={{ opacity: 0, y: 10, height: 0 }}
                className="mb-3 flex items-center gap-3 bg-gray-50 p-2 rounded-xl border border-gray-200"
              >
                <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center shadow-sm border border-gray-100">
                  <FileType className="w-5 h-5 text-gray-500" />
                </div>
                <div className="flex-grow min-w-0">
                  <p className="text-sm font-bold text-gray-700 truncate">{uploadedFile.name}</p>
                  <p className="text-xs text-gray-400 font-medium">Ready to process</p>
                </div>
                <button
                  type="button"
                  onClick={() => setUploadedFile(null)}
                  className="p-2 hover:bg-gray-200 rounded-lg text-gray-500 transition-colors"
                >
                  <AlertCircle className="w-4 h-4" />
                </button>
              </motion.div>
            )}
          </AnimatePresence>

          <div className="flex items-end gap-2 bg-gray-100 rounded-3xl p-1.5 focus-within:ring-2 focus-within:ring-emerald-500/20 transition-all border border-transparent focus-within:border-emerald-500/30">
            {/* File Upload Button */}
            <div className="relative shrink-0">
              <input
                type="file"
                id="file-upload"
                className="hidden"
                onChange={(e) => setUploadedFile(e.target.files?.[0] || null)}
              />
              <label
                htmlFor="file-upload"
                className="w-10 h-10 flex items-center justify-center rounded-full bg-white hover:bg-gray-50 text-gray-500 cursor-pointer transition-colors shadow-sm"
              >
                <UploadCloud className="w-5 h-5" />
              </label>
            </div>

            {/* Text Input */}
            <textarea
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="E.g., Turn this messy text into a neat table..."
              className="flex-grow bg-transparent border-none focus:ring-0 resize-none py-3 px-2 text-[15px] font-medium text-gray-800 placeholder:text-gray-400 max-h-32 min-h-[44px] custom-scrollbar"
              rows={1}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault();
                  handleSubmit(e);
                }
              }}
            />

            {/* Send Button */}
            <button
              type="submit"
              disabled={isProcessing || (!prompt.trim() && !uploadedFile)}
              className="w-10 h-10 shrink-0 flex items-center justify-center rounded-full bg-emerald-600 hover:bg-emerald-700 disabled:bg-gray-300 disabled:text-gray-500 text-white transition-colors shadow-md disabled:shadow-none"
            >
              <Send className="w-4 h-4 ml-0.5" />
            </button>
          </div>

          <div className="text-center mt-2">
             <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider flex items-center justify-center gap-1">
               <Sparkles className="w-3 h-3" /> Powered by DeepSeek V4 Formatting Engine
             </span>
          </div>
        </form>
      </div>

      {/* The Full-Screen A4 Canvas Modal */}
      <TipTapModal />

    </div>
  );
}
