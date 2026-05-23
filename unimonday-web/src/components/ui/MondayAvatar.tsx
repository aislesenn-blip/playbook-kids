import { motion, } from 'framer-motion';

interface MondayAvatarProps {
  isListening: boolean;
  isProcessing: boolean;
  outfit?: string;
  emotion?: 'neutral' | 'happy' | 'thinking' | 'success';
}

export function MondayAvatar({ isListening, isProcessing, outfit = 'default', emotion = 'neutral' }: MondayAvatarProps) {
  // A clean, stylized vector representation of Monday (the cat)
  // that reacts to state changes

  const getOutfitStyles = () => {
     if (outfit === 'astronaut') return { bg: 'bg-zinc-100', accent: 'text-zinc-800' };
     if (outfit === 'safari') return { bg: 'bg-[#8B9A8B]', accent: 'text-[#4A5D4A]' };
     return { bg: 'bg-[#DDA359]', accent: 'text-[#8C6230]' }; // Default warm orange
  };

  const styles = getOutfitStyles();

  return (
    <div className="relative w-full h-full flex items-center justify-center">
      {/* Head & Body Wrapper for bounce illusion */}
      <motion.div
        animate={{
           scale: isListening ? 1.05 : emotion === 'success' ? [1, 1.1, 1] : 1,
           y: isProcessing ? [-2, 2, -2] : emotion === 'success' ? [-10, 0, -10, 0] : emotion === 'thinking' ? [0, -5, 0] : 0,
           rotate: emotion === 'thinking' ? [0, 5, -5, 0] : 0
        }}
        transition={{
           scale: { type: "spring", stiffness: 300, damping: 20 },
           y: isProcessing ? { repeat: Infinity, duration: 2, ease: "easeInOut" } : { duration: 0.6 },
           rotate: { duration: 2, repeat: Infinity, ease: "easeInOut" }
        }}
        className={`w-3/4 h-3/4 rounded-[40%] ${styles.bg} shadow-inner flex flex-col items-center justify-center relative z-10`}
      >
        {/* Ears */}
        <div className={`absolute -top-4 -left-2 w-10 h-10 ${styles.bg} rounded-tl-full rounded-tr-[10px] rounded-br-[10px] rounded-bl-[10px] -rotate-12 z-0 shadow-inner`} />
        <div className={`absolute -top-4 -right-2 w-10 h-10 ${styles.bg} rounded-tr-full rounded-tl-[10px] rounded-br-[10px] rounded-bl-[10px] rotate-12 z-0 shadow-inner`} />

        {/* Face Elements */}
        <div className="w-full flex justify-center gap-8 mt-2 z-20">
          {/* Eyes */}
          <motion.div
            animate={{
               height: isListening ? '16px' : emotion === 'happy' || emotion === 'success' ? '4px' : '24px',
               borderRadius: isListening ? '8px' : emotion === 'happy' || emotion === 'success' ? '2px' : '12px',
               rotate: emotion === 'happy' || emotion === 'success' ? 10 : 0
            }}
            className="w-6 bg-zinc-900 overflow-hidden relative"
          >
             {/* Eye highlight */}
             <div className="absolute top-1 right-1 w-2 h-2 bg-white rounded-full opacity-80" />
          </motion.div>

          <motion.div
            animate={{
               height: isListening ? '16px' : emotion === 'happy' || emotion === 'success' ? '4px' : '24px',
               borderRadius: isListening ? '8px' : emotion === 'happy' || emotion === 'success' ? '2px' : '12px',
               rotate: emotion === 'happy' || emotion === 'success' ? -10 : 0
            }}
            className="w-6 bg-zinc-900 overflow-hidden relative"
          >
             <div className="absolute top-1 right-1 w-2 h-2 bg-white rounded-full opacity-80" />
          </motion.div>
        </div>

        {/* Nose & Mouth */}
        <div className="mt-4 flex flex-col items-center z-20">
          <div className="w-3 h-2 bg-[#FF9B9B] rounded-full mb-1" />

          {/* Mouth animation based on processing (speaking) or listening */}
          <motion.div
            animate={{
               width: isProcessing ? ['12px', '20px', '12px'] : emotion === 'happy' || emotion === 'success' ? '24px' : '16px',
               height: isProcessing ? ['4px', '12px', '4px'] : emotion === 'happy' || emotion === 'success' ? '12px' : '2px',
               borderRadius: isProcessing ? '8px' : emotion === 'happy' || emotion === 'success' ? '0 0 12px 12px' : '2px',
               marginTop: emotion === 'happy' || emotion === 'success' ? '2px' : '0px'
            }}
            transition={{ repeat: isProcessing ? Infinity : 0, duration: 0.3 }}
            className="bg-zinc-900"
          />
        </div>
      </motion.div>

      {/* Optional Outfit Props (e.g., Helmet for Astronaut) */}
      {outfit === 'astronaut' && (
         <div className="absolute inset-2 border-4 border-white/40 rounded-[45%] pointer-events-none z-30" />
      )}
      {outfit === 'safari' && (
         <div className="absolute -top-4 w-4/5 h-8 bg-[#6B5A40] rounded-t-[20px] pointer-events-none z-30" />
      )}
    </div>
  );
}
