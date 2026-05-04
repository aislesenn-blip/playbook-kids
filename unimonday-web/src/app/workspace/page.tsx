"use client";

import { useState, useRef, useEffect } from 'react';
import { useWorkspaceStore } from '@/lib/store/workspace-store';
import { Send, UploadCloud, FileType, AlertCircle, Sparkles, Loader2, Bot, FileText, CheckCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import TipTapModal from '@/components/workspace/TipTapModal';
import { simulateAiFormatting } from '@/lib/services/ai-formatter';

export default function WorkspacePage() {
  const { messages, addMessage, isProcessing, processAIResponse, setActiveBlock } = useWorkspaceStore();
  const [prompt, setPrompt] = useState("");
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom of chat
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isProcessing]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!prompt.trim() && !uploadedFile) return;

    const userMessage = prompt.trim() || `Uploaded: ${uploadedFile?.name}`;
    addMessage({ sender: 'user', text: userMessage });

    const currentPrompt = prompt;
    setPrompt("");
    setUploadedFile(null);

    // Call our simulated DeepSeek Formatting service
    await simulateAiFormatting(currentPrompt, processAIResponse);
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
                    className={`px-3 py-2.5 rounded-2xl shadow-sm ${
                      msg.sender === 'user'
                        ? 'bg-emerald-600 text-white rounded-br-sm'
                        : 'bg-white text-gray-700 rounded-bl-sm border border-gray-100'
                    }`}
                  >
                    <p className="whitespace-pre-wrap text-[14px] leading-relaxed">{msg.text}</p>
                  </div>

                  {/* AI Draft Card (Progressive Disclosure) */}
                  {msg.draftBlockId && (
                    <motion.div
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => setActiveBlock(msg.draftBlockId!)}
                      className="mt-1.5 bg-white border border-gray-200 p-3 rounded-xl shadow-sm cursor-pointer w-full max-w-[280px] flex items-center gap-3 group"
                    >
                      <div className="w-10 h-10 bg-emerald-50 rounded-lg flex items-center justify-center shrink-0 group-hover:bg-emerald-100 transition-colors">
                        <FileText className="w-5 h-5 text-emerald-600" />
                      </div>
                      <div className="flex-grow min-w-0">
                        <p className="font-bold text-gray-800 text-[13px] truncate">Review Draft</p>
                        <p className="text-[11px] text-gray-500 font-medium truncate flex items-center gap-1 mt-0.5">
                          <CheckCircle className="w-3 h-3 text-emerald-500" /> Ready
                        </p>
                      </div>
                      <button className="text-[11px] font-bold bg-gray-100 hover:bg-gray-200 text-gray-700 px-2.5 py-1.5 rounded-lg transition-colors shrink-0">
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

          <div className="flex flex-col bg-gray-100 rounded-2xl border border-gray-200 focus-within:ring-2 focus-within:ring-emerald-500/20 focus-within:border-emerald-500/30 transition-all shadow-sm overflow-hidden">
            {/* Text Input */}
            <textarea
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="E.g., Turn this messy text into a neat table..."
              className="w-full bg-transparent border-none focus:ring-0 resize-none p-4 text-[15px] font-medium text-gray-800 placeholder:text-gray-400 max-h-48 min-h-[80px] custom-scrollbar"
              rows={2}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault();
                  handleSubmit(e);
                }
              }}
            />

            {/* Bottom Controls inside the Input Box */}
            <div className="flex items-center justify-between px-3 pb-3 pt-1">
              <div className="relative">
                <input
                  type="file"
                  id="file-upload"
                  className="hidden"
                  onChange={(e) => setUploadedFile(e.target.files?.[0] || null)}
                />
                <label
                  htmlFor="file-upload"
                  className="p-2 flex items-center justify-center rounded-lg text-gray-500 hover:bg-gray-200 hover:text-gray-700 cursor-pointer transition-colors"
                >
                  <UploadCloud className="w-5 h-5" />
                </label>
              </div>

              <button
                type="submit"
                disabled={isProcessing || (!prompt.trim() && !uploadedFile)}
                className="w-9 h-9 flex items-center justify-center rounded-lg bg-emerald-600 hover:bg-emerald-700 disabled:bg-gray-300 disabled:text-gray-500 text-white transition-colors shadow-sm disabled:shadow-none"
              >
                <Send className="w-4 h-4 ml-0.5" />
              </button>
            </div>
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
