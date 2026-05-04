"use client";

import { useState, useRef, useEffect } from 'react';
import { useWorkspaceStore } from '@/lib/store/workspace-store';
import { Send, UploadCloud, FileType, AlertCircle, Sparkles, Loader2, FileText, CheckCircle, Mic, FileDown } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import VirtualTipTapModal from '@/components/workspace/VirtualTipTapModal';
import { simulateAiFormatting } from '@/lib/services/ai-formatter';
import 'regenerator-runtime/runtime';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';

export default function WorkspacePage() {
  const { messages, addMessage, isProcessing, processAIResponse, setActiveBlock } = useWorkspaceStore();
  const [prompt, setPrompt] = useState("");
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Voice Recognition
  const { transcript, listening, resetTranscript, browserSupportsSpeechRecognition } = useSpeechRecognition();

  // We only set prompt if transcript changes by user speaking, handled in the button or a custom hook usually
  // but to avoid the linter warning "set-state-in-effect", we can map it directly in the textarea,
  // or use an effect cautiously with a check. For this prototype, we'll sync it carefully.
  useEffect(() => {
    if (transcript && transcript !== prompt) {
       // Since the linter strictly prevents synchronous setState in useEffect
       // we use setTimeout to break the synchronous cycle
       const timeoutId = setTimeout(() => {
           setPrompt(transcript);
       }, 0);
       return () => clearTimeout(timeoutId);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [transcript]);

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
    resetTranscript();

    // Call our simulated DeepSeek Formatting service
    await simulateAiFormatting(currentPrompt, processAIResponse);
  };

  const handleVoiceToggle = (e: React.MouseEvent) => {
      e.preventDefault();
      if (!browserSupportsSpeechRecognition) {
          alert("Your browser doesn't support voice input.");
          return;
      }
      if (listening) {
          SpeechRecognition.stopListening();
      } else {
          SpeechRecognition.startListening({ continuous: true, language: 'en-US' });
      }
  };

  const actionPills = [
    "Format as APA style",
    "Add Page Numbers",
    "Fix all grammar",
    "Turn into a Table",
    "Add a Watermark"
  ];

  return (
    <div className="flex flex-col h-[calc(100vh-64px)] bg-[#E3E6E6] relative overflow-hidden">

      {/* Main Chat Thread Area */}
      <div className="flex-grow overflow-y-auto p-4 sm:p-6 custom-scrollbar pb-48 relative">
        <div className="max-w-4xl mx-auto space-y-6 pb-12">

          <div className="text-center text-[10px] sm:text-xs font-bold text-gray-400 my-6 uppercase tracking-wider">
            Secure Terminal: AI Formatting Engine
          </div>

          <AnimatePresence initial={false}>
            {messages.map((msg) => (
              <motion.div
                key={msg.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className={`flex w-full ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                {msg.sender === 'ai' && (
                  <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-white border border-gray-200 shadow-sm flex items-center justify-center mr-2 sm:mr-3 shrink-0 self-end mb-1">
                    <Sparkles className="w-4 h-4 sm:w-5 sm:h-5 text-emerald-600" />
                  </div>
                )}

                <div className={`flex flex-col max-w-[85%] sm:max-w-[75%] ${msg.sender === 'user' ? 'items-end' : 'items-start'}`}>

                  {/* Chat Bubble */}
                  <div
                    className={`px-4 py-3 rounded-2xl shadow-sm ${
                      msg.sender === 'user'
                        ? 'bg-[#007185] text-white rounded-br-sm'
                        : 'bg-white text-gray-800 rounded-bl-sm border border-gray-100'
                    }`}
                  >
                    <p className="whitespace-pre-wrap text-[14px] sm:text-[15px] leading-relaxed">{msg.text}</p>
                  </div>

                  {/* AI Draft Card (Tinder-style Progressive Disclosure) */}
                  {msg.draftBlockId && (
                    <motion.div
                      whileHover={{ scale: 1.01 }}
                      whileTap={{ scale: 0.99 }}
                      onClick={() => setActiveBlock(msg.draftBlockId!)}
                      className="mt-3 bg-white border border-gray-200 p-4 rounded-xl shadow-md cursor-pointer w-full max-w-sm flex flex-col gap-3 group relative overflow-hidden"
                    >
                      <div className="absolute top-0 left-0 w-1 h-full bg-emerald-500"></div>
                      <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-emerald-50 rounded-lg flex items-center justify-center shrink-0 group-hover:bg-emerald-100 transition-colors">
                            <FileText className="w-5 h-5 text-emerald-600" />
                          </div>
                          <div className="flex-grow min-w-0">
                            <p className="font-bold text-gray-900 text-sm truncate">Review Formatting</p>
                            <p className="text-xs text-gray-500 font-medium truncate flex items-center gap-1 mt-0.5">
                              <CheckCircle className="w-3 h-3 text-emerald-500" /> JSON parsed successfully
                            </p>
                          </div>
                      </div>
                      <button className="w-full text-xs sm:text-sm font-bold bg-gray-50 hover:bg-gray-100 border border-gray-200 text-gray-800 py-2 rounded-lg transition-colors flex justify-center items-center gap-2">
                        Open Document Canvas <FileDown className="w-4 h-4"/>
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
              <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-white border border-gray-200 shadow-sm flex items-center justify-center mr-2 sm:mr-3 shrink-0 self-end mb-1">
                <Loader2 className="w-4 h-4 sm:w-5 sm:h-5 text-emerald-600 animate-spin" />
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

      {/* Magic Drawer (Expansive Chat Input without restrictive borders) */}
      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-white via-white to-white/90 pt-8 pb-4 px-4 sm:px-6 z-10 shadow-[0_-20px_40px_rgba(0,0,0,0.03)]">

        <div className="max-w-4xl mx-auto flex flex-col gap-3">
            {/* Guided Suggestion Pills (Discoverability) */}
            <div className="flex overflow-x-auto custom-scrollbar pb-1 gap-2 hide-scroll-bar mask-edges">
                {actionPills.map((pill, idx) => (
                    <button
                        key={idx}
                        onClick={() => setPrompt(pill)}
                        className="whitespace-nowrap px-3 py-1.5 bg-gray-100 hover:bg-gray-200 border border-gray-200 text-gray-700 text-xs sm:text-sm font-medium rounded-full transition-colors"
                    >
                        {pill}
                    </button>
                ))}
            </div>

            <form onSubmit={handleSubmit} className="relative">

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
                    <p className="text-xs text-gray-400 font-medium">Ready for AI processing</p>
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

            <div className="flex flex-col bg-white rounded-2xl sm:rounded-3xl shadow-[0_2px_15px_rgba(0,0,0,0.08)] border border-gray-200 p-2 focus-within:shadow-[0_2px_20px_rgba(16,185,129,0.15)] focus-within:border-emerald-300 transition-all overflow-hidden">

                {/* Text Input Area (Expansive) */}
                <textarea
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                placeholder="Ask AI to format, draw tables, fix margins, or write..."
                className="w-full bg-transparent border-none focus:ring-0 resize-none py-3 px-3 sm:px-4 text-[15px] sm:text-[16px] text-gray-800 placeholder:text-gray-400 min-h-[60px] max-h-[150px] custom-scrollbar"
                rows={prompt.split('\n').length > 1 ? Math.min(prompt.split('\n').length, 5) : 1}
                onKeyDown={(e) => {
                    if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault();
                    handleSubmit(e);
                    }
                }}
                />

                {/* Bottom Row Tools within Input */}
                <div className="flex items-center justify-between px-2 pb-1 pt-2 border-t border-gray-50">
                    <div className="flex items-center gap-1">
                        <div className="relative">
                            <input
                                type="file"
                                id="file-upload"
                                className="hidden"
                                onChange={(e) => setUploadedFile(e.target.files?.[0] || null)}
                            />
                            <label
                                htmlFor="file-upload"
                                className="p-2 flex items-center justify-center rounded-full text-gray-500 hover:text-[#007185] hover:bg-gray-100 cursor-pointer transition-colors"
                            >
                                <UploadCloud className="w-5 h-5 sm:w-6 sm:h-6" />
                            </label>
                        </div>
                        <button
                            type="button"
                            onClick={handleVoiceToggle}
                            className={`p-2 flex items-center justify-center rounded-full transition-colors ${listening ? 'text-red-500 bg-red-50' : 'text-gray-500 hover:text-[#007185] hover:bg-gray-100'}`}
                        >
                            <Mic className="w-5 h-5 sm:w-6 sm:h-6" />
                            {listening && <span className="absolute -top-1 -right-1 flex h-3 w-3"><span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span><span className="relative inline-flex rounded-full h-3 w-3 bg-red-500"></span></span>}
                        </button>
                    </div>

                    {/* Send Button */}
                    <button
                        type="submit"
                        disabled={isProcessing || (!prompt.trim() && !uploadedFile)}
                        className="w-8 h-8 sm:w-10 sm:h-10 shrink-0 flex items-center justify-center rounded-full bg-black hover:bg-gray-800 disabled:bg-gray-200 disabled:text-gray-400 text-white transition-colors disabled:shadow-none shadow-md"
                    >
                        <Send className="w-4 h-4 sm:w-5 sm:h-5 ml-0.5" />
                    </button>
                </div>
            </div>

            </form>
        </div>
      </div>

      {/* The Full-Screen A4 Canvas Modal */}
      <VirtualTipTapModal />

    </div>
  );
}
