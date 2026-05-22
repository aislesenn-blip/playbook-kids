"use client";
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { ArrowRight, Play, ShieldCheck, Heart } from 'lucide-react';

export default function DemoIntroPage() {
  const router = useRouter();

  return (
    <div className="w-full min-h-screen bg-[#F8F6F3] flex flex-col items-center pt-24 pb-32 px-4">
      <div className="w-full max-w-2xl bg-white p-8 md:p-12 rounded-[2rem] shadow-[0_4px_40px_rgba(0,0,0,0.02)] border border-zinc-100">

        <div className="flex justify-center mb-8">
            <div className="w-16 h-16 bg-[#DDA359]/10 rounded-2xl flex items-center justify-center">
              <Play className="w-8 h-8 text-[#DDA359] ml-1 fill-current" />
            </div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-10"
        >
          <h1 className="text-3xl font-semibold text-zinc-900 mb-4 tracking-tight">Before we begin</h1>
          <p className="text-zinc-500 font-medium leading-relaxed max-w-md mx-auto">
            This demo lets your child experience our calm, voice-based learning environment. Here is what to expect.
          </p>
        </motion.div>

        <div className="space-y-6 mb-12">
           <motion.div initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.1 }} className="flex gap-4 items-start">
             <div className="w-10 h-10 rounded-full bg-zinc-50 flex items-center justify-center shrink-0 border border-zinc-100">
               <ShieldCheck className="w-5 h-5 text-zinc-600" />
             </div>
             <div>
               <h3 className="font-semibold text-zinc-900 mb-1">Safe & Anxiety-Free</h3>
               <p className="text-sm text-zinc-500 leading-relaxed">No screen staring. Just a calm voice conversation. Mistakes are encouraged as part of learning.</p>
             </div>
           </motion.div>

           <motion.div initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 }} className="flex gap-4 items-start">
             <div className="w-10 h-10 rounded-full bg-zinc-50 flex items-center justify-center shrink-0 border border-zinc-100">
               <Heart className="w-5 h-5 text-zinc-600" />
             </div>
             <div>
               <h3 className="font-semibold text-zinc-900 mb-1">Short & Sweet</h3>
               <p className="text-sm text-zinc-500 leading-relaxed">The demo takes about 2 minutes. We will gently guide them through a simple introduction.</p>
             </div>
           </motion.div>
        </div>

        <div className="flex flex-col sm:flex-row gap-4">
           <button
             onClick={() => router.push('/demo/session')}
             className="flex-1 py-4 px-6 bg-zinc-900 text-white rounded-xl font-medium text-lg hover:bg-zinc-800 transition-colors flex items-center justify-center gap-2 shadow-sm"
           >
             Start Demo <ArrowRight className="w-5 h-5" />
           </button>
           <button
             onClick={() => router.push('/auth/signup')}
             className="flex-1 py-4 px-6 bg-white border border-zinc-200 text-zinc-700 rounded-xl font-medium text-lg hover:bg-zinc-50 transition-colors flex items-center justify-center"
           >
             Skip to Setup
           </button>
        </div>

      </div>
    </div>
  );
}
