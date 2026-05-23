import { motion, AnimatePresence } from 'framer-motion';
import { useEffect } from 'react';

interface ComingSoonToastProps {
  isVisible: boolean;
  onClose: () => void;
  message?: string;
}

export function ComingSoonToast({ isVisible, onClose, message = "More content coming soon!" }: ComingSoonToastProps) {
  useEffect(() => {
    if (isVisible) {
      const timer = setTimeout(() => {
        onClose();
      }, 2500);
      return () => clearTimeout(timer);
    }
  }, [isVisible, onClose]);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: 50, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 20, scale: 0.95 }}
          className="fixed bottom-24 left-1/2 -translate-x-1/2 z-[200] bg-zinc-900 text-white px-6 py-3 rounded-full shadow-2xl font-medium text-sm border border-zinc-800"
        >
          {message}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
