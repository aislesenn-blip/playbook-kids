import { motion, AnimatePresence } from 'framer-motion';
import { X, Play, Lock, Star } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { Episode } from '@/types';

interface CategoryExplorerProps {
  isOpen: boolean;
  onClose: () => void;
  categoryTitle: string;
  episodes: Episode[];
}

export function CategoryExplorer({ isOpen, onClose, categoryTitle, episodes }: CategoryExplorerProps) {
  const router = useRouter();

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[200] bg-zinc-900/40 backdrop-blur-sm flex items-end sm:items-center justify-center sm:p-4"
        >
          <motion.div
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="w-full h-[90vh] sm:h-auto sm:max-h-[85vh] sm:max-w-3xl bg-[#F8F6F3] rounded-t-[32px] sm:rounded-[32px] overflow-hidden flex flex-col shadow-2xl relative"
          >
            {/* Header */}
            <div className="w-full bg-white px-6 py-5 sm:px-8 sm:py-6 flex items-center justify-between border-b border-zinc-100 z-10 shrink-0">
              <div>
                <h2 className="text-2xl font-semibold text-zinc-900">{categoryTitle}</h2>
                <p className="text-zinc-500 text-sm mt-1">{episodes.length} Episodes</p>
              </div>
              <button
                onClick={onClose}
                className="w-10 h-10 rounded-full bg-zinc-100 flex items-center justify-center text-zinc-500 hover:bg-zinc-200 hover:text-zinc-900 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Content List */}
            <div className="flex-1 overflow-y-auto p-4 sm:p-6 pb-20">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {episodes.map((ep, idx) => (
                  <motion.div
                    key={ep.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: idx * 0.05 }}
                    onClick={() => {
                        if (!ep.isLocked) {
                            onClose();
                            router.push(`/session/${ep.id}`);
                        }
                    }}
                    className={`p-5 rounded-[20px] border transition-all flex gap-4 ${
                      ep.isLocked
                        ? 'bg-zinc-50 border-transparent opacity-60 cursor-not-allowed'
                        : 'bg-white border-zinc-200 hover:border-zinc-300 shadow-sm cursor-pointer'
                    }`}
                  >
                     <div className={`w-12 h-12 rounded-full shrink-0 flex items-center justify-center ${ep.isLocked ? 'bg-zinc-200' : 'bg-[#DDA359]/10 text-[#DDA359]'}`}>
                        {ep.isLocked ? <Lock className="w-5 h-5 text-zinc-400" /> : <Play className="w-5 h-5 fill-current" />}
                     </div>
                     <div className="flex-1">
                        <div className="flex items-center justify-between mb-1">
                            <span className="text-[10px] font-semibold text-zinc-400 uppercase tracking-wider">{ep.type}</span>
                            {ep.isCompleted && (
                                <div className="flex gap-0.5">
                                  {[...Array(3)].map((_, i) => (
                                    <Star key={i} className={`w-3 h-3 ${i < ep.stars ? 'text-[#DDA359] fill-current' : 'text-zinc-200'}`} />
                                  ))}
                                </div>
                            )}
                        </div>
                        <h4 className="font-semibold text-zinc-900 leading-tight mb-1">{ep.title}</h4>
                        <p className="text-zinc-500 text-xs line-clamp-2 leading-relaxed">{ep.description}</p>
                     </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
