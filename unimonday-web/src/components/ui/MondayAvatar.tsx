import { motion, } from 'framer-motion';

interface MondayAvatarProps {
  isListening: boolean;
  isProcessing: boolean;
  outfit?: string;
  emotion?: 'neutral' | 'happy' | 'thinking' | 'success';
}

export function MondayAvatar({ isListening, isProcessing, outfit = 'default', emotion = 'neutral' }: MondayAvatarProps) {
  const getOutfitStyles = () => {
     if (outfit === 'astronaut') return { bg: 'bg-zinc-100', accent: 'text-zinc-800' };
     if (outfit === 'safari') return { bg: 'bg-[#8B9A8B]', accent: 'text-[#4A5D4A]' };
     return { bg: 'bg-[#DDA359]', accent: 'text-[#8C6230]' }; // Default warm orange
  };

  const styles = getOutfitStyles();

  return (
    <div className="relative w-full h-full flex flex-col items-center justify-end pb-8">
      {/* Full Body Container */}
      <motion.div
        animate={{
           scale: isListening ? 1.05 : emotion === 'success' ? [1, 1.1, 1] : 1,
           y: emotion === 'success' ? [-40, 0, -40, 0] : isProcessing ? [-4, 4, -4] : emotion === 'thinking' ? [0, -8, 0] : 0,
        }}
        transition={{
           scale: { type: "spring", stiffness: 300, damping: 20 },
           y: emotion === 'success' ? { duration: 0.8, ease: "easeInOut" } : isProcessing ? { repeat: Infinity, duration: 2, ease: "easeInOut" } : { duration: 0.6 },
        }}
        className="relative flex flex-col items-center z-10"
      >
        {/* Wagging Tail */}
        <motion.div
          animate={{
             rotate: emotion === 'success' || emotion === 'happy' ? [-20, 20, -20] : [-5, 5, -5]
          }}
          transition={{ repeat: Infinity, duration: emotion === 'success' || emotion === 'happy' ? 0.3 : 2, ease: "easeInOut" }}
          className={`absolute -right-8 bottom-4 w-16 h-4 ${styles.bg} rounded-full origin-left z-0 shadow-inner`}
        />

        {/* Head */}
        <motion.div
           animate={{
              rotate: emotion === 'thinking' ? [0, 8, -8, 0] : isListening ? [-2, 2, -2] : 0
           }}
           transition={{
             rotate: { duration: emotion === 'thinking' ? 2 : 3, repeat: Infinity, ease: "easeInOut" }
           }}
           className={`w-32 h-28 sm:w-40 sm:h-36 rounded-[45%] ${styles.bg} shadow-inner flex flex-col items-center justify-center relative z-20`}
        >
          {/* Ears */}
          <div className={`absolute -top-6 -left-2 w-12 h-12 ${styles.bg} rounded-tl-full rounded-tr-[10px] rounded-br-[10px] rounded-bl-[10px] -rotate-12 z-0 shadow-inner`} />
          <div className={`absolute -top-6 -right-2 w-12 h-12 ${styles.bg} rounded-tr-full rounded-tl-[10px] rounded-br-[10px] rounded-bl-[10px] rotate-12 z-0 shadow-inner`} />

          {/* Eyes */}
          <div className="w-full flex justify-center gap-8 mt-2 z-20">
            <motion.div
              animate={{
                 height: isListening ? '20px' : emotion === 'happy' || emotion === 'success' ? '6px' : '28px',
                 borderRadius: isListening ? '10px' : emotion === 'happy' || emotion === 'success' ? '3px' : '14px',
                 rotate: emotion === 'happy' || emotion === 'success' ? 12 : 0
              }}
              className="w-7 bg-zinc-900 overflow-hidden relative"
            >
               <div className="absolute top-1.5 right-1.5 w-2.5 h-2.5 bg-white rounded-full opacity-80" />
            </motion.div>

            <motion.div
              animate={{
                 height: isListening ? '20px' : emotion === 'happy' || emotion === 'success' ? '6px' : '28px',
                 borderRadius: isListening ? '10px' : emotion === 'happy' || emotion === 'success' ? '3px' : '14px',
                 rotate: emotion === 'happy' || emotion === 'success' ? -12 : 0
              }}
              className="w-7 bg-zinc-900 overflow-hidden relative"
            >
               <div className="absolute top-1.5 right-1.5 w-2.5 h-2.5 bg-white rounded-full opacity-80" />
            </motion.div>
          </div>

          {/* Nose & Mouth */}
          <div className="mt-4 flex flex-col items-center z-20">
            <div className="w-4 h-2.5 bg-[#FF9B9B] rounded-full mb-1.5" />
            <motion.div
              animate={{
                 width: isProcessing ? ['16px', '26px', '16px'] : emotion === 'happy' || emotion === 'success' ? '32px' : '20px',
                 height: isProcessing ? ['6px', '16px', '6px'] : emotion === 'happy' || emotion === 'success' ? '16px' : '3px',
                 borderRadius: isProcessing ? '10px' : emotion === 'happy' || emotion === 'success' ? '0 0 16px 16px' : '3px',
                 marginTop: emotion === 'happy' || emotion === 'success' ? '2px' : '0px'
              }}
              transition={{ repeat: isProcessing ? Infinity : 0, duration: 0.3 }}
              className="bg-zinc-900"
            />
          </div>

          {/* Outfits specific to Head */}
          {outfit === 'astronaut' && (
             <div className="absolute inset-2 border-4 border-white/50 rounded-[45%] pointer-events-none z-30" />
          )}
          {outfit === 'safari' && (
             <div className="absolute -top-6 w-[110%] h-10 bg-[#6B5A40] rounded-t-[24px] pointer-events-none z-30 shadow-md" />
          )}
        </motion.div>

        {/* Torso/Body */}
        <div className={`w-24 h-28 sm:w-28 sm:h-32 -mt-4 rounded-[40%] ${styles.bg} shadow-inner relative z-10 flex justify-center`}>
           {/* Belly highlight */}
           <div className="w-16 h-20 sm:w-20 sm:h-24 bg-white/20 rounded-full mt-4" />

           {/* Arms */}
           <motion.div
             animate={{
                rotate: emotion === 'success' ? [-20, -140, -20] : isListening ? -10 : 15,
                y: emotion === 'success' ? -10 : 0
             }}
             transition={{ duration: emotion === 'success' ? 0.6 : 0.4 }}
             className={`absolute -left-6 top-6 w-8 h-16 ${styles.bg} rounded-full origin-top z-20 shadow-sm`}
           />
           <motion.div
             animate={{
                rotate: emotion === 'success' ? [20, 140, 20] : isListening ? 10 : -15,
                y: emotion === 'success' ? -10 : 0
             }}
             transition={{ duration: emotion === 'success' ? 0.6 : 0.4 }}
             className={`absolute -right-6 top-6 w-8 h-16 ${styles.bg} rounded-full origin-top z-20 shadow-sm`}
           />

           {/* Legs */}
           <div className={`absolute -bottom-4 left-4 w-8 h-12 ${styles.bg} rounded-full z-0`} />
           <div className={`absolute -bottom-4 right-4 w-8 h-12 ${styles.bg} rounded-full z-0`} />

           {/* Outfit Specific to Torso */}
           {outfit === 'astronaut' && (
             <div className="absolute inset-0 bg-white/40 rounded-[40%] pointer-events-none border-x-4 border-white z-10" />
           )}
           {outfit === 'safari' && (
             <div className="absolute top-4 w-full h-16 bg-[#C1A87D] rounded-xl pointer-events-none z-10 shadow-sm flex flex-col justify-between p-2">
                 <div className="w-full h-2 bg-[#8B7355] opacity-50 rounded" />
                 <div className="w-full h-2 bg-[#8B7355] opacity-50 rounded" />
             </div>
           )}
        </div>
      </motion.div>
    </div>
  );
}
