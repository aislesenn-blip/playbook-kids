"use client";

import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { Mic, MicOff, Send, Sparkles } from "lucide-react";
import Image from "next/image";

type Message = {
  id: string;
  role: "user" | "ai";
  content: string;
};

export default function ChatPage() {
  const [messages, setMessages] = useState<Message[]>([
    { id: "1", role: "ai", content: "Hi Bertha! Ready for our next adventure? Say hello!" }
  ]);
  const [input, setInput] = useState("");
  const [isRecording, setIsRecording] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSend = () => {
    if (!input.trim()) return;

    const newMsg: Message = { id: Date.now().toString(), role: "user", content: input };
    setMessages(prev => [...prev, newMsg]);
    setInput("");

    // Mock AI response
    setTimeout(() => {
      setMessages(prev => [...prev, {
        id: (Date.now() + 1).toString(),
        role: "ai",
        content: "That sounds amazing! Let's practice saying that together."
      }]);
    }, 1500);
  };

  return (
    <div className="flex flex-col h-[calc(100vh-8rem)] w-full max-w-4xl mx-auto relative overflow-hidden bg-card rounded-t-[3rem] sm:rounded-[3rem] mt-4 sm:mt-8 shadow-2xl border-2 sm:border-4 border-primary">

      {/* Header */}
      <div className="absolute top-0 left-0 right-0 p-6 z-20 flex justify-between items-center bg-gradient-to-b from-card to-transparent">
        <div className="flex items-center gap-4">
          <div className="relative w-12 h-12 rounded-full overflow-hidden border-2 border-primary">
            <Image
              src="https://images.unsplash.com/photo-1616423640778-28d1b53229bd?q=80&w=2000&auto=format&fit=crop"
              alt="AI Companion"
              fill
              className="object-cover"
            />
          </div>
          <div>
            <h2 className="font-black text-xl leading-tight">uNiMONDAY</h2>
            <p className="text-primary font-bold text-sm flex items-center gap-1">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
              </span>
              Listening
            </p>
          </div>
        </div>
      </div>

      {/* Voice Visualizer (Background) */}
      <div className="absolute inset-0 flex items-center justify-center opacity-10 pointer-events-none">
        <div className={`w-64 h-64 rounded-full bg-primary ${isRecording ? 'animate-ping' : ''} blur-3xl transition-all duration-1000`} />
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-6 pt-24 pb-32 space-y-6 relative z-10 scrollbar-hide">
        {messages.map((msg) => (
          <motion.div
            key={msg.id}
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div className={`max-w-[80%] rounded-[2rem] p-5 text-lg font-medium shadow-md ${
              msg.role === 'user'
                ? 'bg-primary text-primary-foreground rounded-tr-sm'
                : 'bg-background text-foreground rounded-tl-sm border-2 border-primary/10'
            }`}>
              {msg.role === 'ai' && <Sparkles className="w-4 h-4 text-primary mb-2" />}
              {msg.content}
            </div>
          </motion.div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-card via-card to-transparent z-20">
        <div className="flex items-center gap-3 max-w-2xl mx-auto bg-background p-2 rounded-[2rem] shadow-xl border-2 border-primary/20">
          <button
            onClick={() => setIsRecording(!isRecording)}
            className={`p-4 rounded-full transition-colors ${
              isRecording
                ? 'bg-red-500 text-white animate-pulse'
                : 'bg-primary/10 text-primary hover:bg-primary hover:text-primary-foreground'
            }`}
          >
            {isRecording ? <MicOff className="w-6 h-6" /> : <Mic className="w-6 h-6" />}
          </button>

          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            placeholder="Type or speak to reply..."
            className="flex-1 bg-transparent border-none focus:outline-none text-lg font-medium px-2"
          />

          <button
            onClick={handleSend}
            disabled={!input.trim()}
            className="p-4 bg-primary text-primary-foreground rounded-full hover:scale-105 transition-transform disabled:opacity-50 disabled:hover:scale-100"
          >
            <Send className="w-6 h-6" />
          </button>
        </div>
      </div>
    </div>
  );
}
