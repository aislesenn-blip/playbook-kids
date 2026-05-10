"use client";

import { useAppStore } from "@/lib/store/app-store";
import { useParams, useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Lock, PlayCircle, Eye, ShieldCheck, Ticket } from "lucide-react";
import { useState, useEffect } from "react";
import Image from "next/image";

export default function FanProfilePage() {
  const params = useParams();
  const username = params.username as string;

  const creators = useAppStore(state => state.creators);
  const videos = useAppStore(state => state.videos);
  const unlockedVideoIds = useAppStore(state => state.unlockedVideoIds);
  const activeTimePasses = useAppStore(state => state.activeTimePasses);
  const unlockVideo = useAppStore(state => state.unlockVideo);
  const purchaseTimePass = useAppStore(state => state.purchaseTimePass);

  const [mounted, setMounted] = useState(false);
  const [selectedVideoId, setSelectedVideoId] = useState<string | null>(null);
  const [paymentType, setPaymentType] = useState<'ppv' | 'timepass' | null>(null);
  const [phone, setPhone] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const creator = creators.find(c => c.username === username);

  if (!creator) {
    return (
      <div className="min-h-screen bg-[#DDA359] flex items-center justify-center text-black font-black text-2xl">
        Creator not found.
      </div>
    );
  }

  const creatorVideos = videos.filter(v => v.creatorId === creator.id);
  const hasActiveTimePass = activeTimePasses[creator.id] && new Date(activeTimePasses[creator.id]) > new Date();

  const handlePayment = () => {
    if (!phone) return alert("Please enter your phone number");
    setIsProcessing(true);

    // Simulate 30-second seamless payment
    setTimeout(() => {
      setIsProcessing(false);
      if (paymentType === 'ppv' && selectedVideoId) {
        unlockVideo(selectedVideoId, phone);
      } else if (paymentType === 'timepass') {
        purchaseTimePass(creator.id, phone);
      }
      setSelectedVideoId(null);
      setPaymentType(null);
      setPhone('');
    }, 2000); // 2 second mock delay for demo purposes
  };

  return (
    <div className="min-h-screen bg-[#DDA359] text-black font-sans pb-20">
      {/* Cover & Profile */}
      <div className="relative h-48 sm:h-64 bg-black">
        {creator.coverImageUrl && (
          <Image src={creator.coverImageUrl} alt="Cover" fill className="object-cover opacity-50" />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-[#DDA359] to-transparent" />
      </div>

      <div className="max-w-3xl mx-auto px-4 sm:px-6 relative -mt-16 z-10">
        <div className="flex flex-col items-center text-center">
          <div className="w-32 h-32 rounded-full border-4 border-[#DDA359] bg-black overflow-hidden relative shadow-2xl mb-4">
            {creator.profileImageUrl ? (
               <Image src={creator.profileImageUrl} alt={creator.displayName} fill className="object-cover" />
            ) : (
               <div className="w-full h-full flex items-center justify-center text-4xl font-black text-[#DDA359]">
                 {creator.displayName.charAt(0)}
               </div>
            )}
          </div>
          <h1 className="text-3xl font-black flex items-center gap-2">
            {creator.displayName}
            {creator.isVerified && <ShieldCheck className="w-6 h-6 text-black fill-black/10" />}
          </h1>
          <p className="text-black/70 font-bold mt-2 max-w-lg">{creator.bio}</p>
        </div>

        {/* The African Subscription (Time-Pass) Banner */}
        {!hasActiveTimePass && (
          <div className="mt-8 bg-black text-[#DDA359] p-6 rounded-3xl shadow-xl flex flex-col sm:flex-row items-center justify-between gap-4">
            <div>
               <h3 className="text-xl font-black flex items-center gap-2">
                 <Ticket className="w-6 h-6" /> Get the Time-Pass
               </h3>
               <p className="font-bold opacity-80 text-sm mt-1">Unlock ALL videos for {creator.timePassDurationDays} days.</p>
            </div>
            <button
              onClick={() => { setPaymentType('timepass'); setSelectedVideoId(null); }}
              className="w-full sm:w-auto bg-[#DDA359] text-black px-6 py-3 rounded-xl font-black hover:scale-105 transition-transform"
            >
              Buy for TZS {creator.timePassPrice.toLocaleString()}
            </button>
          </div>
        )}

        {hasActiveTimePass && (
          <div className="mt-8 bg-green-500/20 border-2 border-green-600 text-green-900 p-4 rounded-2xl font-bold flex items-center justify-center gap-2">
            <ShieldCheck className="w-5 h-5" /> Time-Pass Active! All videos unlocked.
          </div>
        )}

        {/* Video Feed */}
        <div className="mt-12 space-y-8">
          {creatorVideos.map(video => {
            const isUnlocked = hasActiveTimePass || unlockedVideoIds.includes(video.id);

            return (
              <div key={video.id} className="bg-white/40 border-2 border-black/10 rounded-3xl overflow-hidden shadow-xl">
                {/* Player Area */}
                <div className="relative aspect-video bg-black group">
                  {isUnlocked ? (
                    // Unlocked State: Show full video (mocked)
                    <div className="absolute inset-0 flex items-center justify-center">
                       <Image src={video.thumbnailUrl} alt={video.title} fill className="object-cover opacity-60" />
                       <div className="absolute inset-0 flex items-center justify-center flex-col z-10">
                          <PlayCircle className="w-20 h-20 text-[#DDA359] cursor-pointer hover:scale-110 transition-transform" />
                          <div className="absolute bottom-4 right-4 bg-black/60 backdrop-blur-sm px-3 py-1 rounded-md text-white/50 text-xs font-mono select-none">
                             Purchased by: 07XX XXX XXX (Watermark)
                          </div>
                       </div>
                    </div>
                  ) : (
                    // Locked State
                    <div className="absolute inset-0">
                      <Image src={video.thumbnailUrl} alt={video.title} fill className="object-cover opacity-40 blur-sm" />
                      <div className="absolute inset-0 flex flex-col items-center justify-center z-10 p-4 text-center">
                         <div className="w-20 h-20 bg-black/80 rounded-full flex items-center justify-center mb-4 shadow-2xl backdrop-blur-md">
                           <Lock className="w-10 h-10 text-[#DDA359]" />
                         </div>
                         <h3 className="text-[#DDA359] text-xl font-black max-w-sm">Premium Content Locked</h3>
                         <button
                           onClick={() => { setSelectedVideoId(video.id); setPaymentType('ppv'); }}
                           className="mt-6 bg-[#DDA359] text-black px-8 py-4 rounded-full font-black text-lg shadow-2xl hover:scale-105 transition-transform"
                         >
                           Unlock for TZS {video.price.toLocaleString()}
                         </button>
                         {video.trailerUrl && (
                           <button className="mt-4 text-[#DDA359]/70 font-bold text-sm underline underline-offset-4 hover:text-[#DDA359]">
                             Watch free trailer
                           </button>
                         )}
                      </div>
                    </div>
                  )}
                </div>

                {/* Video Info */}
                <div className="p-6">
                  <h2 className="text-2xl font-black mb-2">{video.title}</h2>
                  <p className="text-black/70 font-bold mb-4">{video.description}</p>
                  <div className="flex items-center gap-4 text-sm font-bold text-black/50">
                    <span className="flex items-center gap-1"><Eye className="w-4 h-4"/> {video.views.toLocaleString()}</span>
                    <span>•</span>
                    <span>{new Date(video.createdAt).toLocaleDateString()}</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Frictionless Payment Modal */}
      <AnimatePresence>
        {(selectedVideoId || paymentType === 'timepass') && (
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[100] flex items-end sm:items-center justify-center sm:p-4"
          >
             <motion.div
               initial={{ y: "100%" }} animate={{ y: 0 }} exit={{ y: "100%" }}
               className="bg-[#DDA359] w-full sm:max-w-md rounded-t-3xl sm:rounded-3xl p-6 sm:p-8 shadow-2xl border-t-2 sm:border-2 border-black"
             >
               <div className="flex justify-between items-center mb-6">
                 <h2 className="text-2xl font-black">Instant Checkout</h2>
                 <button onClick={() => { setSelectedVideoId(null); setPaymentType(null); }} className="w-8 h-8 bg-black/10 rounded-full flex items-center justify-center font-bold">✕</button>
               </div>

               <div className="bg-white/50 border-2 border-black/10 p-4 rounded-2xl mb-6">
                 <p className="font-bold text-black/70 text-sm">You are purchasing:</p>
                 <p className="font-black text-lg">
                   {paymentType === 'timepass' ? `${creator.timePassDurationDays}-Day Time-Pass` : videos.find(v => v.id === selectedVideoId)?.title}
                 </p>
                 <div className="mt-2 text-3xl font-black">
                   TZS {paymentType === 'timepass' ? creator.timePassPrice.toLocaleString() : videos.find(v => v.id === selectedVideoId)?.price.toLocaleString()}
                 </div>
               </div>

               <div className="space-y-4">
                 <div>
                   <label className="block font-bold mb-2">M-Pesa / Tigo Pesa Number</label>
                   <input
                     type="tel"
                     placeholder="07XX XXX XXX"
                     value={phone}
                     onChange={(e) => setPhone(e.target.value)}
                     className="w-full bg-white border-2 border-black rounded-xl px-4 py-4 font-black text-lg text-center focus:outline-none shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]"
                   />
                 </div>
                 <button
                   onClick={handlePayment}
                   disabled={isProcessing}
                   className="w-full bg-black text-[#DDA359] py-4 rounded-xl font-black text-lg hover:bg-neutral-800 transition-colors disabled:opacity-50"
                 >
                   {isProcessing ? "Processing..." : "Pay Now"}
                 </button>
                 <p className="text-center text-xs font-bold text-black/50 mt-4 flex items-center justify-center gap-1">
                   <Lock className="w-3 h-3" /> Secure payment via Snippe API
                 </p>
               </div>
             </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
