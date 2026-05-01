"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Book, BrainCircuit, ChevronRight, CheckCircle, AlertCircle, FileText, Upload, Brain, GraduationCap } from "lucide-react";
import confetti from "canvas-confetti";

// Dummy data for demonstration
const mockDocument = {
  title: "Introduction to Thermodynamics",
  totalPages: 120,
  currentRange: [45, 60],
  content: `
Chapter 4: The Laws of Thermodynamics

4.1 The First Law (Conservation of Energy)
Energy can neither be created nor destroyed; it can only be transferred or changed from one form to another. For example, turning on a light would seem to produce energy; however, it is electrical energy that is converted.

4.2 The Second Law (Entropy)
The entropy of any isolated system always increases. Isolated systems spontaneously evolve towards thermal equilibrium—the state of maximum entropy of the system.
  `
};

const mockChat = [
  { role: "ai", content: "Karibu! Naona tunasoma kuhusu Thermodynamics (Page 45-60). Uko tayari tuanze kuchambua au una swali lolote kabla hatujaanza?", type: "text" },
  { role: "user", content: "Hii Second Law of Thermodynamics inanichanganya kidogo, inamaanisha nini hasa kwa lugha nyepesi?", type: "text" },
  { role: "ai", content: "Kama nikiitumia 'Feynman Technique' kuelezea... Fikiria chumba chako. Usipokipanga kwa muda mrefu, kinazidi kuwa kichafu na kuvurugika, sawa? Hiyo ndiyo 'Entropy' (vurugu). \n\nSecond Law inasema kwamba, kiasili, vitu vyote hupenda kuelekea kwenye kuvurugika (entropy kuongezeka) isipokuwa ukitumia nguvu/energy kuvipanga. Kama joto linavyosambaa kwenye chai ya moto hadi ipoe sawa na chumba.\n\nJe, umepata picha kidogo?", type: "text" },
  { role: "user", content: "Yeah nimeelewa vizuri sana sasa!", type: "text" },
  { role: "ai", content: "Safi sana! Sasa hebu tufanye 'Active Recall'. Fumba macho (au usome tena document), kisha niandikie kwa maneno yako mwenyewe: Nini kitatokea kwenye mfumo uliofungwa (isolated system) kulingana na hii sheria ya pili?", type: "question", correctAnswer: "entropy itaongezeka" }
];

export function StudyInterface() {
  const [messages, setMessages] = useState(mockChat);
  const [inputValue, setInputValue] = useState("");
  const [isShaking, setIsShaking] = useState(false);

  const handleSend = () => {
    if (!inputValue.trim()) return;

    // Check if answering a question
    const lastMessage = messages[messages.length - 1];
    if (lastMessage.role === "ai" && lastMessage.type === "question") {
      if (inputValue.toLowerCase().includes(lastMessage.correctAnswer!)) {
        // Success
        confetti({
          particleCount: 100,
          spread: 70,
          origin: { y: 0.6 },
          colors: ['#00E676', '#00C853', '#B9F6CA']
        });

        setMessages(prev => [...prev,
          { role: "user", content: inputValue, type: "text" },
          { role: "ai", content: "Sahihi kabisa! Umepata. 🎉 Entropy inaongezeka hadi ifikie thermal equilibrium. Twende kipengele kinachofuata?", type: "text" }
        ]);
        setInputValue("");
      } else {
        // Incorrect
        setIsShaking(true);
        setTimeout(() => setIsShaking(false), 400);
      }
      return;
    }

    setMessages(prev => [...prev, { role: "user", content: inputValue, type: "text" }]);
    setInputValue("");
  };

  return (
    <div className="flex flex-col lg:flex-row h-[calc(100vh-80px)] gap-6 p-4 sm:p-6 w-full max-w-7xl mx-auto">

      {/* Left Panel: Document Viewer */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        className="w-full lg:w-1/2 bg-white rounded-3xl border border-border shadow-lg flex flex-col overflow-hidden relative"
      >
        <div className="p-4 border-b border-border bg-gray-50/50 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-primary/10 text-primary rounded-xl">
              <FileText className="w-5 h-5" />
            </div>
            <div>
              <h2 className="font-bold text-sm">{mockDocument.title}</h2>
              <p className="text-xs text-muted-foreground">Pages {mockDocument.currentRange[0]} - {mockDocument.currentRange[1]} of {mockDocument.totalPages}</p>
            </div>
          </div>
          <button className="text-xs bg-white border border-border px-3 py-1.5 rounded-full shadow-sm hover:bg-gray-50 transition-colors flex items-center gap-2">
             <Upload className="w-3 h-3" /> Change Range
          </button>
        </div>

        <div className="p-6 flex-1 overflow-y-auto prose prose-sm max-w-none prose-p:leading-relaxed prose-headings:text-gray-800">
          <div className="whitespace-pre-wrap text-gray-700 font-medium">
            {mockDocument.content}
          </div>
        </div>

        {/* Subtle decorative element */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-[0.02] pointer-events-none">
          <Book className="w-64 h-64" />
        </div>
      </motion.div>

      {/* Right Panel: AI Study Buddy (Cognitive Engine) */}
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        className="w-full lg:w-1/2 bg-white rounded-3xl border border-border shadow-lg flex flex-col overflow-hidden"
      >
        {/* Header */}
        <div className="p-4 border-b border-border flex items-center justify-between bg-gradient-to-r from-white to-primary/5">
          <div className="flex items-center gap-3">
             <div className="p-2 bg-primary text-white rounded-xl shadow-md shadow-primary/20">
              <BrainCircuit className="w-5 h-5" />
            </div>
            <div>
              <h2 className="font-bold">Cognitive Study Engine</h2>
              <div className="flex items-center gap-2">
                <span className="flex w-2 h-2 rounded-full bg-primary animate-pulse"></span>
                <p className="text-xs text-muted-foreground font-medium">Socratic & Feynman Mode Active</p>
              </div>
            </div>
          </div>
          <div className="px-3 py-1 bg-primary/10 text-primary text-xs font-bold rounded-full">
            Friday Test Prep
          </div>
        </div>

        {/* Chat Area */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-6 bg-gray-50/30">
          <AnimatePresence>
            {messages.map((msg, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"} w-full`}
              >
                <div className={`flex gap-3 max-w-[85%] ${msg.role === "user" ? "flex-row-reverse" : "flex-row"}`}>
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 shadow-sm
                    ${msg.role === "user" ? "bg-gray-100 text-gray-600" : "bg-primary/10 text-primary border border-primary/20"}`}
                  >
                    {msg.role === "user" ? <GraduationCap className="w-4 h-4" /> : <Brain className="w-4 h-4" />}
                  </div>

                  <div className={`p-4 rounded-2xl shadow-sm leading-relaxed
                    ${msg.role === "user"
                      ? "bg-gray-800 text-white rounded-tr-sm"
                      : msg.type === "question"
                        ? "bg-amber-50 border border-amber-200 text-amber-900 rounded-tl-sm"
                        : "bg-white border border-border text-gray-800 rounded-tl-sm"}`}
                  >
                    {msg.type === "question" && (
                      <div className="flex items-center gap-2 mb-2 text-amber-700 font-bold text-xs uppercase tracking-wider">
                        <AlertCircle className="w-4 h-4" /> Active Recall Challenge
                      </div>
                    )}
                    <div className="text-sm font-medium whitespace-pre-wrap">{msg.content}</div>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Input Area */}
        <div className="p-4 border-t border-border bg-white">
          <div className={`relative flex items-center transition-transform ${isShaking ? 'animate-shake' : ''}`}>
            <textarea
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault();
                  handleSend();
                }
              }}
              placeholder={messages[messages.length-1].type === "question" ? "Jibu swali hapa (Fumba macho!)..." : "Uliza swali au omba ufafanuzi..."}
              className={`w-full bg-gray-50 border ${isShaking ? 'border-red-400 bg-red-50' : 'border-border focus:border-primary/50'} rounded-2xl py-3 px-4 pr-12 focus:outline-none focus:ring-4 focus:ring-primary/10 transition-all resize-none h-14 overflow-hidden shadow-inner text-sm`}
            />
            <button
              onClick={handleSend}
              disabled={!inputValue.trim()}
              className="absolute right-2 p-2 bg-primary text-white rounded-xl hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:hover:bg-primary shadow-sm"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
          <div className="mt-3 flex items-center justify-between px-2 text-[10px] text-muted-foreground font-medium uppercase tracking-wider">
            <span>Press Enter to send</span>
            <span className="flex items-center gap-1"><CheckCircle className="w-3 h-3 text-primary" /> Auto-saving progress to Supabase</span>
          </div>
        </div>

      </motion.div>
    </div>
  );
}
