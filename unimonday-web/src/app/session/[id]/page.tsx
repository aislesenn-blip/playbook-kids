
"use client";
import { useAppStore } from '@/lib/store/app-store';
import { useRouter } from 'next/navigation';
import { useEffect, useState, use } from 'react';
import { Mic, MicOff, X, Volume2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

type Phase = 'CONNECTION' | 'PATTERN_DROP' | 'REAL_CONVERSATION' | 'COMPLETE';

export default function SessionPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = use(params);
  const { episodes, completeEpisode, profile } = useAppStore();
  const router = useRouter();

  const [messages, setMessages] = useState<{role: string, content: string}[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [isVoiceActive, setIsVoiceActive] = useState(false);
  const [currentPhase, setCurrentPhase] = useState<Phase>('CONNECTION');

  const episode = episodes.find(e => e.id === resolvedParams.id);

  useEffect(() => {
    if (!episode || !profile) {
      router.push('/dashboard');
      return;
    }

    // Phase 1: Connection (Native Language)
    setTimeout(() => {
      let greeting = `Hello ${profile.name}! I am so happy to see you.`;
      if (profile.nativeLanguage === 'Swahili') greeting = `Karibu sana uNiMONDAY ${profile.name}! Nafurahi kukuona.`;
      if (profile.nativeLanguage === 'Spanish') greeting = `¡Hola ${profile.name}! Estoy muy feliz de verte.`;

      setMessages([{ role: 'system', content: `[Phase 1: Connection - ${profile.nativeLanguage}]` }, { role: 'assistant', content: greeting + ` Are you ready to practice your ${profile.targetLanguage}?` }]);
    }, 1000);
  }, [episode, profile, router]);

  if (!episode) return null;

  const handleUserResponse = () => {
    if (!profile) return;
    setIsVoiceActive(false);
    setIsProcessing(true);

    setTimeout(() => {
      setMessages(prev => [...prev, { role: 'user', content: '[User speaks...]' }]);

      setTimeout(() => {
        setIsProcessing(false);

        if (currentPhase === 'CONNECTION') {
          // Move to Phase 2: Pattern Drop
          setCurrentPhase('PATTERN_DROP');
          let patternText = `Great! To say 'I am from Tanzania' in ${profile.targetLanguage}, you say...`;
          if (profile.targetLanguage === 'German') patternText = `Great! To say 'I am from Tanzania' in German, you say 'Ich komme aus Tansania'. Your turn, say it.`;
          if (profile.targetLanguage === 'Spanish') patternText = `Great! To say 'I am from Tanzania' in Spanish, you say 'Soy de Tanzania'. Your turn, say it.`;

          setMessages(prev => [...prev, { role: 'system', content: '[Phase 2: Pattern Drop]' }, { role: 'assistant', content: patternText }]);
        }
        else if (currentPhase === 'PATTERN_DROP') {
           // Move to Phase 3: Real Conversation
           setCurrentPhase('REAL_CONVERSATION');
           let roleplayText = `Excellent! Now let's roleplay. Hello! I am Thomas. Where are you from?`;
           if (profile.targetLanguage === 'German') roleplayText = `Perfect! Now let's talk. Hallo! Ich bin Thomas. Woher kommst du?`;
           if (profile.targetLanguage === 'Spanish') roleplayText = `Perfect! Now let's talk. ¡Hola! Soy Thomas. ¿De dónde eres?`;

           setMessages(prev => [...prev, { role: 'system', content: '[Phase 3: Real Conversation]' }, { role: 'assistant', content: roleplayText }]);
        }
        else if (currentPhase === 'REAL_CONVERSATION') {
           setCurrentPhase('COMPLETE');
           setMessages(prev => [...prev, { role: 'assistant', content: `You did amazing today! You've completed the episode.` }]);

           setTimeout(() => {
              completeEpisode(episode.id, 3);
              router.push('/dashboard');
           }, 3000);
        }

      }, 1500);
    }, 1000);
  };

  const toggleVoice = () => {
    if (isVoiceActive) {
      handleUserResponse();
    } else {
      setIsVoiceActive(true);
    }
  };

  return (
    <div className="fixed inset-0 z-[100] bg-white flex flex-col">
      {/* Header */}
      <div className="h-16 flex items-center justify-between px-4 border-b border-gray-100 bg-white/80 backdrop-blur-md z-10">
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
      <div className="flex-1 overflow-y-auto p-4 space-y-6 pb-40">
        <AnimatePresence>
          {messages.map((msg, idx) => (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              key={idx}
              className={`flex ${msg.role === 'user' ? 'justify-end' : msg.role === 'system' ? 'justify-center' : 'justify-start'}`}
            >
               {msg.role === 'system' ? (
                 <div className="bg-gray-100 px-4 py-1.5 rounded-full text-xs font-bold text-gray-500 tracking-widest uppercase">
                   {msg.content}
                 </div>
               ) : (
                <div className={`max-w-[85%] p-5 rounded-3xl ${
                  msg.role === 'user'
                    ? 'bg-gray-100 text-gray-900 rounded-tr-sm'
                    : 'bg-[#DDA359] text-white rounded-tl-sm shadow-xl shadow-[#DDA359]/20'
                }`}>
                  {msg.role === 'assistant' && <Volume2 className="w-5 h-5 mb-3 opacity-50" />}
                  <p className="font-medium text-lg md:text-xl leading-relaxed">{msg.content}</p>
                </div>
               )}
            </motion.div>
          ))}
          {isProcessing && (
             <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex justify-start">
               <div className="bg-[#DDA359]/20 text-[#DDA359] p-5 rounded-3xl rounded-tl-sm flex gap-1.5 items-center">
                 <div className="w-2.5 h-2.5 rounded-full bg-current animate-bounce" />
                 <div className="w-2.5 h-2.5 rounded-full bg-current animate-bounce" style={{ animationDelay: '0.2s' }} />
                 <div className="w-2.5 h-2.5 rounded-full bg-current animate-bounce" style={{ animationDelay: '0.4s' }} />
               </div>
             </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Control Bar */}
      <div className="absolute bottom-0 left-0 right-0 p-8 bg-gradient-to-t from-white via-white to-transparent flex justify-center pb-safe z-10">
        <button
          onClick={toggleVoice}
          disabled={currentPhase === 'COMPLETE' || isProcessing}
          className={`relative w-24 h-24 rounded-full flex items-center justify-center shadow-2xl transition-all disabled:opacity-50 disabled:scale-100 ${
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
