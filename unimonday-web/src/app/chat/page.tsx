"use client";

import { useState, useEffect, Suspense } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Send, Store, ArrowLeft, Image as ImageIcon, Search } from "lucide-react";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import { mockVendors } from "@/lib/mockData";
import { useAppStore } from "@/lib/store/app-store";
import { toast } from "sonner";

function ChatInterfaceContent() {
  const searchParams = useSearchParams();
  const initialVendorId = searchParams.get('vendor');

  const [searchQuery, setSearchQuery] = useState("");

  const chats = mockVendors.map(v => ({
    id: v.id,
    name: v.storeName,
    avatar: v.logoUrl || "https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80",
    lastMsg: v.id === "v1" ? "Your repair is complete." : "Great! Let me check...",
    unread: v.id === "v1" ? 2 : 0
  })).filter(c => c.name.toLowerCase().includes(searchQuery.toLowerCase()));

  const initialChatId = (initialVendorId && chats.some(c => c.id === initialVendorId))
    ? initialVendorId
    : ""; // Don't auto-open a chat unless requested via URL

  const [messages, setMessages] = useState([
    { id: 1, text: "Hi there! Is the Vintage Denim Jacket still available?", sender: "user", time: "10:00 AM" },
    { id: 2, text: "Hello! Yes, it is still available. What size are you looking for?", sender: "vendor", time: "10:05 AM" },
  ]);
  const [input, setInput] = useState("");
  const [activeChat, setActiveChat] = useState(initialChatId);

  const { pendingMessages, removePendingMessage, currentUser } = useAppStore();

  useEffect(() => {
    if (activeChat) {
       const pending = pendingMessages.find(msg => msg.vendorId === activeChat);
       if (pending) {
          // Wrap in a setTimeout to avoid synchronous setState inside effect warning
          setTimeout(() => {
            setMessages(prev => [
              ...prev,
              { id: Date.now(), text: pending.text, sender: "user", time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) }
            ]);
            removePendingMessage(activeChat);

            // Simulate vendor automated response based on order
            setTimeout(() => {
               setMessages(prev => [
                 ...prev,
                 { id: Date.now() + 1, text: "Thanks for your order! Please send the payment screenshot here once you have paid.", sender: "vendor", time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) }
               ]);
            }, 1500);
          }, 0);
       }
    }
  }, [activeChat, pendingMessages, removePendingMessage]);

  const handleSend = () => {
    if (!input.trim()) return;

    setMessages(prev => [
      ...prev,
      { id: Date.now(), text: input, sender: "user", time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) }
    ]);
    setInput("");

    setTimeout(() => {
      setMessages(prev => [
        ...prev,
        { id: Date.now() + 1, text: "Alright, noted!", sender: "vendor", time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) }
      ]);
    }, 1000);
  };

  return (
    <div className="w-full h-[calc(100vh-4rem)] bg-white overflow-hidden flex">
      {/* Sidebar - Chat List */}
      <div className={`w-full md:w-1/3 border-r border-border flex flex-col ${activeChat ? 'hidden md:flex' : 'flex'}`}>
        <div className="p-4 border-b border-border">
          <h2 className="text-xl font-black mb-4">Messages</h2>
          <div className="relative">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search chats..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-gray-50 rounded-xl pl-9 pr-4 py-2 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>
        </div>
        <div className="flex-1 overflow-y-auto">
          {chats.length === 0 ? (
            <div className="p-8 text-center text-gray-500 font-medium">
              No conversations found.
            </div>
          ) : (
            chats.map(chat => (
              <div
                key={chat.id}
                onClick={() => setActiveChat(chat.id)}
                className={`p-4 flex items-center gap-3 cursor-pointer transition-colors ${activeChat === chat.id ? 'bg-primary/5 border-l-4 border-primary' : 'hover:bg-gray-50'}`}
              >
                <div className="relative w-12 h-12 rounded-full overflow-hidden shrink-0">
                  <Image src={chat.avatar} alt={chat.name} fill className="object-cover" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex justify-between items-baseline mb-1">
                    <h3 className="font-bold text-sm truncate">{chat.name}</h3>
                    <span className="text-xs text-muted-foreground">10:05 AM</span>
                  </div>
                  <p className="text-sm text-muted-foreground truncate">{chat.lastMsg}</p>
                </div>
                {chat.unread > 0 && (
                  <div className="w-5 h-5 bg-primary text-white rounded-full flex items-center justify-center text-xs font-bold shrink-0">
                    {chat.unread}
                  </div>
                )}
              </div>
            ))
          )}
        </div>
      </div>

      {/* Main Chat Area */}
      <div className={`w-full md:w-2/3 flex flex-col h-full bg-gray-50/50 ${!activeChat ? 'hidden md:flex' : 'flex'}`}>
        {!activeChat ? (
          <div className="flex-1 flex flex-col items-center justify-center text-center p-8">
            <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mb-6">
               <Store className="w-10 h-10 text-gray-300" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Your Messages</h2>
            <p className="text-muted-foreground font-medium max-w-sm mx-auto">
              Select a conversation from the sidebar to view your chat or check order updates.
            </p>
          </div>
        ) : (
          <>
            <div className="p-4 bg-white border-b border-border flex items-center gap-3">
              <button onClick={() => setActiveChat("")} className="md:hidden p-2 -ml-2 text-gray-500 hover:bg-gray-100 rounded-full">
                <ArrowLeft className="w-5 h-5" />
              </button>
              {(() => {
                const currentChat = chats.find(c => c.id === activeChat);
                return (
                  <>
                    <div className="w-10 h-10 bg-primary/10 text-primary rounded-full flex items-center justify-center shrink-0 overflow-hidden relative">
                      {currentChat ? (
                          <Image src={currentChat.avatar} alt="avatar" fill className="object-cover"/>
                      ) : <Store className="w-5 h-5" />}
                    </div>
                    <div>
                      <h2 className="font-bold">{currentChat?.name || 'Store'}</h2>
                      <p className="text-xs text-primary font-medium">● Online</p>
                    </div>
                  </>
                );
              })()}
            </div>

            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              <AnimatePresence>
                {messages.map((msg) => (
                  <motion.div
                    key={msg.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`flex flex-col max-w-[80%] ${msg.sender === "user" ? "ml-auto items-end" : "mr-auto items-start"}`}
                  >
                    <div
                      className={`p-3 rounded-2xl ${
                        msg.sender === "user"
                          ? "bg-primary text-white rounded-br-none"
                          : "bg-white border border-border text-gray-900 rounded-bl-none shadow-sm"
                      }`}
                    >
                      {msg.text}
                    </div>
                    <span className="text-xs text-muted-foreground mt-1 font-medium">{msg.time}</span>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>

            {/* Vendor Quick Actions if the logged in user is a vendor */}
            {currentUser?.role === 'vendor' && (
              <div className="px-4 py-2 bg-gray-50 border-t border-border flex gap-2 overflow-x-auto [&::-webkit-scrollbar]:hidden">
                 <button onClick={() => toast.success("Payment confirmed! Student notified.")} className="text-xs font-bold bg-emerald-100 text-emerald-700 px-3 py-1.5 rounded-lg hover:bg-emerald-200 whitespace-nowrap">
                    Confirm Payment
                 </button>
                 <button onClick={() => toast.success("Order status changed to In Transit")} className="text-xs font-bold bg-blue-100 text-blue-700 px-3 py-1.5 rounded-lg hover:bg-blue-200 whitespace-nowrap">
                    Mark In Transit
                 </button>
                 <button onClick={() => toast.error("Cancellation notice sent.")} className="text-xs font-bold bg-red-100 text-red-700 px-3 py-1.5 rounded-lg hover:bg-red-200 whitespace-nowrap">
                    Cancel Order
                 </button>
              </div>
            )}

            <div className="p-4 bg-white border-t border-border">
              <div className="flex items-center gap-2 relative">
                <label className="p-3 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-xl transition-colors shrink-0 cursor-pointer">
                  <input
                    type="file"
                    className="hidden"
                    accept="image/*"
                    onChange={(e) => {
                      if (e.target.files && e.target.files[0]) {
                         setMessages(prev => [
                            ...prev,
                            { id: Date.now(), text: "Sent an image", sender: "user", time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) }
                         ]);
                         setTimeout(() => {
                            setMessages(prev => [
                              ...prev,
                              { id: Date.now() + 1, text: "Thanks for sending the payment screenshot. I will verify it now.", sender: "vendor", time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) }
                            ]);
                         }, 1500);
                      }
                    }}
                  />
                  <ImageIcon className="w-5 h-5" />
                </label>
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleSend()}
                  placeholder="Type a message or upload payment screenshot..."
                  className="flex-1 bg-gray-100 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary text-sm font-medium"
                />
                <button
                  onClick={handleSend}
                  disabled={!input.trim()}
                  className="p-3 bg-primary text-white rounded-xl hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed shrink-0"
                >
                  <Send className="w-5 h-5" />
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default function ChatInterface() {
  return (
    <Suspense fallback={<div className="p-8 text-center">Loading...</div>}>
      <ChatInterfaceContent />
    </Suspense>
  );
}
