"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Send, Store, ArrowLeft, Image as ImageIcon } from "lucide-react";
import { useRouter } from "next/navigation";

export default function ChatInterface() {
  const router = useRouter();
  const [messages, setMessages] = useState([
    { id: 1, text: "Hi there! Is the Vintage Denim Jacket still available?", sender: "user", time: "10:00 AM" },
    { id: 2, text: "Hello! Yes, it is still available. What size are you looking for?", sender: "vendor", time: "10:05 AM" },
  ]);
  const [input, setInput] = useState("");

  const handleSend = () => {
    if (!input.trim()) return;

    setMessages(prev => [
      ...prev,
      { id: Date.now(), text: input, sender: "user", time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) }
    ]);
    setInput("");

    // Simulate vendor reply
    setTimeout(() => {
      setMessages(prev => [
        ...prev,
        { id: Date.now() + 1, text: "Great! Let me check the stock for you.", sender: "vendor", time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) }
      ]);
    }, 1500);
  };

  return (
    <div className="max-w-3xl mx-auto h-[80vh] flex flex-col bg-white rounded-[2rem] shadow-xl border border-border overflow-hidden">
      {/* Header */}
      <div className="bg-gray-50 border-b border-border p-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <button onClick={() => router.back()} className="p-2 hover:bg-gray-200 rounded-full transition-colors">
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center text-primary">
              <Store className="w-5 h-5" />
            </div>
            <div>
              <h2 className="font-bold text-gray-900">Campus Thrift</h2>
              <p className="text-xs text-primary font-medium flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-primary inline-block"></span> Online
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50/50">
        <AnimatePresence>
          {messages.map((msg) => (
            <motion.div
              key={msg.id}
              initial={{ opacity: 0, y: 10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ type: "spring", stiffness: 400, damping: 25 }}
              className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div className={`max-w-[75%] rounded-2xl p-4 shadow-sm ${
                msg.sender === 'user'
                  ? 'bg-gray-900 text-white rounded-br-sm'
                  : 'bg-white border border-border text-gray-900 rounded-bl-sm'
              }`}>
                <p className="text-sm font-medium">{msg.text}</p>
                <span className={`text-[10px] mt-2 block ${msg.sender === 'user' ? 'text-gray-400' : 'text-muted-foreground'}`}>
                  {msg.time}
                </span>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Input Area */}
      <div className="p-4 bg-white border-t border-border">
        <div className="flex items-center gap-2">
          <button className="p-3 text-muted-foreground hover:bg-gray-100 rounded-xl transition-colors">
            <ImageIcon className="w-5 h-5" />
          </button>
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            placeholder="Type your message..."
            className="flex-1 bg-gray-100 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-primary/50 transition-shadow text-sm font-medium"
          />
          <button
            onClick={handleSend}
            disabled={!input.trim()}
            className="p-3 bg-primary text-white rounded-xl hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Send className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
}
