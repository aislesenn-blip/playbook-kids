
"use client";
import { useAppStore } from '@/lib/store/app-store';
import { useRouter } from 'next/navigation';
import { useEffect, useState, use } from 'react';
import { Mic, MicOff, X, Volume2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function SessionPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = use(params);
  const { episodes, completeEpisode, isVoiceActive, setVoiceActive, profile } = useAppStore();
  const router = useRouter();
  const [messages, setMessages] = useState<{role: string, content: string}[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);

  const episode = episodes.find(e => e.id === resolvedParams.id);

  useEffect(() => {
    if (!episode || !profile) {
      router.push('/dashboard');
      return;
    }

    // Simulate AI greeting
    setTimeout(() => {
      setMessages([{
        role: 'assistant',
        content: `Hi ${profile.name}! Welcome to ${episode.title}. Are you ready to practice your ${profile.targetLanguage}?`
      }]);
    }, 1000);
  }, [episode, profile, router]);

  if (!episode) return null;

  const toggleVoice = () => {
    if (isVoiceActive) {
      setVoiceActive(false);
      setIsProcessing(true);
      // Simulate user speaking and AI responding
      setTimeout(() => {
        setMessages(prev => [...prev, { role: 'user', content: 'Yes, I am ready!' }]);
        setTimeout(() => {
           setIsProcessing(false);
           setMessages(prev => [...prev, { role: 'assistant', content: 'Fantastic! Let\'s start by saying "Hello". Can you try?' }]);

           // Auto complete for demo after 3 messages
           if(messages.length > 2) {
               setTimeout(() => {
                   completeEpisode(episode.id, 3);
                   router.push('/dashboard');
               }, 3000);
           }
        }, 1500);
      }, 1000);
    } else {
      setVoiceActive(true);
    }
  };

  return (
    <div className="fixed inset-0 z-[100] bg-white flex flex-col">
      {/* Header */}
      <div className="h-16 flex items-center justify-between px-4 border-b border-gray-100">
        <button onClick={() => router.push('/dashboard')} className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-gray-100 text-gray-500">
          <X className="w-6 h-6" />
        </button>
        <div className="flex flex-col items-center">
          <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">Episode {episode.id}</span>
          <h2 className="font-black">{episode.title}</h2>
        </div>
        <div className="w-10" />
      </div>

      {/* Chat Area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-6 pb-32">
        <AnimatePresence>
          {messages.map((msg, idx) => (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              key={idx}
              className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div className={`max-w-[80%] p-4 rounded-3xl ${
                msg.role === 'user'
                  ? 'bg-gray-100 text-gray-900 rounded-tr-sm'
                  : 'bg-[#DDA359] text-white rounded-tl-sm shadow-xl shadow-[#DDA359]/20'
              }`}>
                {msg.role === 'assistant' && <Volume2 className="w-4 h-4 mb-2 opacity-50" />}
                <p className="font-medium text-lg leading-relaxed">{msg.content}</p>
              </div>
            </motion.div>
          ))}
          {isProcessing && (
             <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex justify-start">
               <div className="bg-[#DDA359]/20 text-[#DDA359] p-4 rounded-3xl rounded-tl-sm flex gap-1 items-center">
                 <div className="w-2 h-2 rounded-full bg-current animate-bounce" />
                 <div className="w-2 h-2 rounded-full bg-current animate-bounce" style={{ animationDelay: '0.2s' }} />
                 <div className="w-2 h-2 rounded-full bg-current animate-bounce" style={{ animationDelay: '0.4s' }} />
               </div>
             </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Control Bar */}
      <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-white via-white to-transparent flex justify-center pb-safe">
        <button
          onClick={toggleVoice}
          className={`relative w-24 h-24 rounded-full flex items-center justify-center shadow-2xl transition-all ${
            isVoiceActive
              ? 'bg-red-500 text-white scale-110 shadow-red-500/50'
              : 'bg-[#DDA359] text-white hover:scale-105 shadow-[#DDA359]/50'
          }`}
        >
          {isVoiceActive && (
            <>
              <div className="absolute inset-0 rounded-full border-4 border-red-500 animate-ping opacity-50" />
              <div className="absolute -inset-4 rounded-full border-2 border-red-500 animate-ping opacity-20" style={{ animationDelay: '0.3s' }} />
            </>
          )}
          {isVoiceActive ? <MicOff className="w-10 h-10" /> : <Mic className="w-10 h-10" />}
        </button>
      </div>
    </div>
  );
}
