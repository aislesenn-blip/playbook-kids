"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Book, ChevronRight, CheckCircle, AlertCircle, FileText, Upload, Brain, GraduationCap } from "lucide-react";
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
  { role: "ai", content: "Kama nikiitumia mfano wa mtaani... Fikiria chumba chako. Usipokipanga kwa muda mrefu, kinazidi kuwa kichafu na kuvurugika, sawa? Hiyo ndiyo 'Entropy' (vurugu). \n\nSecond Law inasema kwamba, kiasili, vitu vyote hupenda kuelekea kwenye kuvurugika (entropy kuongezeka) isipokuwa ukitumia nguvu/energy kuvipanga. Kama joto linavyosambaa kwenye chai ya moto hadi ipoe sawa na chumba.\n\nJe, umepata picha kidogo?", type: "text" },
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
    <div className="flex flex-col lg:flex-row h-[calc(100vh-80px)] w-full max-w-none">

      {/* Left Panel: Document Viewer */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        className="w-full lg:w-1/2 bg-white flex flex-col overflow-hidden relative border-r border-border"
      >
        <div className="p-4 border-b border-border bg-white flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-gray-100 text-gray-700 rounded-xl">
              <FileText className="w-5 h-5" />
            </div>
            <div>
              <h2 className="font-bold text-base text-gray-900">{mockDocument.title}</h2>
              <p className="text-sm text-muted-foreground">Pages {mockDocument.currentRange[0]} - {mockDocument.currentRange[1]} of {mockDocument.totalPages}</p>
            </div>
          </div>
          <button className="text-sm font-medium bg-gray-50 border border-border px-4 py-2 rounded-full hover:bg-gray-100 transition-colors flex items-center gap-2">
             <Upload className="w-4 h-4" /> Change PDF
          </button>
        </div>

        <div className="p-8 lg:p-12 flex-1 overflow-y-auto">
          <div className="whitespace-pre-wrap text-gray-800 text-lg leading-[1.8] font-medium max-w-3xl mx-auto">
            {mockDocument.content}
          </div>
        </div>

        {/* Subtle decorative element */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-[0.02] pointer-events-none">
          <Book className="w-96 h-96" />
        </div>
      </motion.div>

      {/* Right Panel: AI Study Buddy (Cognitive Engine) */}
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        className="w-full lg:w-1/2 bg-gray-50/50 flex flex-col overflow-hidden relative"
      >
        {/* Chat Area */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-8 space-y-8 lg:p-12">
          <AnimatePresence>
            {messages.map((msg, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"} w-full`}
              >
                <div className={`flex gap-4 max-w-[90%] lg:max-w-[80%] ${msg.role === "user" ? "flex-row-reverse" : "flex-row"}`}>
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 shadow-sm mt-1
                    ${msg.role === "user" ? "bg-gray-200 text-gray-700" : "bg-primary text-white shadow-primary/20"}`}
                  >
                    {msg.role === "user" ? <GraduationCap className="w-5 h-5" /> : <Brain className="w-5 h-5" />}
                  </div>

                  <div className="flex flex-col gap-2">
                    {msg.role === "ai" && idx === 0 && (
                      <span className="text-sm font-bold text-gray-500 uppercase tracking-wider ml-1">Study Companion</span>
                    )}
                    {msg.role === "user" && idx === 1 && (
                      <span className="text-sm font-bold text-gray-500 uppercase tracking-wider mr-1 text-right">You</span>
                    )}
                    <div className={`p-5 rounded-3xl shadow-sm leading-relaxed text-base lg:text-lg
                      ${msg.role === "user"
                        ? "bg-gray-900 text-white rounded-tr-sm"
                        : msg.type === "question"
                          ? "bg-amber-50 border-2 border-amber-200 text-amber-900 rounded-tl-sm font-semibold"
                          : "bg-white border border-gray-200 text-gray-800 rounded-tl-sm"}`}
                    >
                      {msg.type === "question" && (
                        <div className="flex items-center gap-2 mb-3 text-amber-600 font-bold text-sm uppercase tracking-wider bg-amber-100/50 p-2 rounded-xl inline-flex">
                          <AlertCircle className="w-5 h-5" /> Active Recall Test
                        </div>
                      )}
                      <div className="whitespace-pre-wrap">{msg.content}</div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Input Area */}
        <div className="p-6 bg-white border-t border-border/50 sticky bottom-0">
          <div className="max-w-4xl mx-auto w-full">
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
                placeholder={messages[messages.length-1].type === "question" ? "Jibu swali lako hapa... (Usiogope kukosea)" : "Uliza swali lolote kuhusu mada hii..."}
                className={`w-full bg-gray-50 border-2 ${isShaking ? 'border-red-400 bg-red-50' : 'border-gray-200 focus:border-primary/50'} rounded-2xl py-4 px-6 pr-16 focus:outline-none focus:ring-4 focus:ring-primary/10 transition-all resize-none h-16 overflow-hidden shadow-inner text-base lg:text-lg`}
              />
              <button
                onClick={handleSend}
                disabled={!inputValue.trim()}
                className="absolute right-2 p-3 bg-gray-900 text-white rounded-xl hover:bg-gray-800 transition-colors disabled:opacity-50 disabled:hover:bg-gray-900 shadow-md"
              >
                <ChevronRight className="w-6 h-6" />
              </button>
            </div>
            <div className="mt-4 flex items-center justify-between px-2 text-xs text-muted-foreground font-semibold uppercase tracking-wider">
              <span>Press Enter to send</span>
              <span className="flex items-center gap-1.5"><CheckCircle className="w-4 h-4 text-primary" /> Progress saved securely</span>
            </div>
          </div>
        </div>

      </motion.div>
    </div>
  );
}
