"use client";

import { useAppStore } from "@/lib/store/app-store";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Wallet, UploadCloud, Eye, DollarSign, Activity, PlayCircle, LogOut } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { Video } from "@/types";

export default function Dashboard() {
  const creators = useAppStore(state => state.creators);
  const videos = useAppStore(state => state.videos);
  const transactions = useAppStore(state => state.transactions);
  const addVideo = useAppStore(state => state.addVideo);
  const requestWithdrawal = useAppStore(state => state.requestWithdrawal);

  // Auto-login as mkojani for demo purposes
  const creator = creators.find(c => c.username === 'mkojani');
  const creatorVideos = videos.filter(v => v.creatorId === creator?.id);
  const creatorTransactions = transactions.filter(t => t.creatorId === creator?.id);

  const [mounted, setMounted] = useState(false);
  const [activeTab, setActiveTab] = useState<'overview' | 'videos'>('overview');
  const [isUploading, setIsUploading] = useState(false);
  const [isWithdrawing, setIsWithdrawing] = useState(false);

  // New Video State
  const [newTitle, setNewTitle] = useState('');
  const [newPrice, setNewPrice] = useState('2000');
  const [withdrawAmount, setWithdrawAmount] = useState('');

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true);
  }, []);

  if (!mounted || !creator) return null;

  const handleUpload = () => {
    if (!newTitle) return;
    const newVideo: Video = {
      id: crypto.randomUUID(),
      creatorId: creator.id,
      title: newTitle,
      description: 'Newly uploaded exclusive video.',
      thumbnailUrl: 'https://images.unsplash.com/photo-1611162617474-5b21e879e113?q=80&w=1000&auto=format&fit=crop', // generic placeholder
      videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
      price: parseInt(newPrice) || 2000,
      createdAt: new Date().toISOString(),
      views: 0
    };
    addVideo(newVideo);
    setIsUploading(false);
    setNewTitle('');
    setActiveTab('videos');
  };

  const handleWithdraw = () => {
    const amount = parseInt(withdrawAmount);
    if (!amount || amount > creator.walletBalance) return alert('Invalid amount');
    requestWithdrawal(creator.id, amount);
    setIsWithdrawing(false);
    setWithdrawAmount('');
    alert(`Successfully withdrew TZS ${amount.toLocaleString()} to your Mobile Wallet.`);
  };

  return (
    <div className="min-h-screen bg-[#DDA359] text-black font-sans flex flex-col md:flex-row">
      {/* Sidebar */}
      <aside className="w-full md:w-64 bg-black text-[#DDA359] flex flex-col border-r-2 border-black/10">
        <div className="p-6 border-b border-[#DDA359]/20">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-8 h-8 bg-[#DDA359] text-black rounded-lg flex items-center justify-center font-black">CB</div>
            <span className="font-black text-xl tracking-tight">Dashboard</span>
          </div>
          <Link href={`/${creator.username}`} className="text-xs font-bold text-[#DDA359]/70 hover:text-[#DDA359] underline underline-offset-2">
            contentbuddy.com/{creator.username}
          </Link>
        </div>
        <nav className="flex-1 p-4 space-y-2">
          <button
            onClick={() => setActiveTab('overview')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-bold transition-colors ${activeTab === 'overview' ? 'bg-[#DDA359] text-black' : 'hover:bg-white/5'}`}
          >
            <Activity className="w-5 h-5" /> Overview
          </button>
          <button
            onClick={() => setActiveTab('videos')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-bold transition-colors ${activeTab === 'videos' ? 'bg-[#DDA359] text-black' : 'hover:bg-white/5'}`}
          >
            <PlayCircle className="w-5 h-5" /> My Videos
          </button>
        </nav>
        <div className="p-4 border-t border-[#DDA359]/20">
          <Link href="/" className="flex items-center gap-3 px-4 py-3 rounded-xl font-bold hover:bg-white/5 transition-colors text-red-400">
            <LogOut className="w-5 h-5" /> Logout
          </Link>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6 md:p-10 overflow-y-auto">
        <div className="flex justify-between items-center mb-10">
          <h1 className="text-3xl font-black">Welcome back, {creator.displayName}</h1>
          <button
            onClick={() => setIsUploading(true)}
            className="bg-black text-[#DDA359] px-6 py-3 rounded-xl font-black flex items-center gap-2 shadow-xl hover:scale-105 transition-transform"
          >
            <UploadCloud className="w-5 h-5" /> Upload Video
          </button>
        </div>

        {activeTab === 'overview' && (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-8">
            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-black text-[#DDA359] p-6 rounded-3xl shadow-xl border-2 border-black">
                <div className="flex justify-between items-start mb-4">
                  <div className="w-12 h-12 bg-[#DDA359] rounded-xl flex items-center justify-center text-black">
                    <Wallet className="w-6 h-6" />
                  </div>
                  <button onClick={() => setIsWithdrawing(true)} className="text-xs font-black bg-[#DDA359] text-black px-3 py-1.5 rounded-lg hover:bg-white transition-colors">
                    Withdraw
                  </button>
                </div>
                <p className="text-[#DDA359]/70 font-bold mb-1">Available Balance</p>
                <h2 className="text-4xl font-black tracking-tighter">TZS {creator.walletBalance.toLocaleString()}</h2>
              </div>

              <div className="bg-white/40 border-2 border-black/10 p-6 rounded-3xl shadow-xl">
                <div className="w-12 h-12 bg-black rounded-xl flex items-center justify-center text-[#DDA359] mb-4">
                  <Eye className="w-6 h-6" />
                </div>
                <p className="text-black/70 font-bold mb-1">Total Premium Views</p>
                <h2 className="text-4xl font-black tracking-tighter">
                  {creatorVideos.reduce((sum, v) => sum + v.views, 0).toLocaleString()}
                </h2>
              </div>

              <div className="bg-white/40 border-2 border-black/10 p-6 rounded-3xl shadow-xl">
                <div className="w-12 h-12 bg-black rounded-xl flex items-center justify-center text-[#DDA359] mb-4">
                  <DollarSign className="w-6 h-6" />
                </div>
                <p className="text-black/70 font-bold mb-1">Recent Earnings</p>
                <h2 className="text-4xl font-black tracking-tighter">
                  +TZS {creatorTransactions.slice(0, 5).reduce((sum, t) => sum + t.creatorShare, 0).toLocaleString()}
                </h2>
              </div>
            </div>

            {/* Recent Transactions */}
            <div className="bg-white/40 border-2 border-black/10 rounded-3xl overflow-hidden shadow-xl">
              <div className="p-6 border-b-2 border-black/10">
                <h3 className="text-xl font-black">Recent Sales</h3>
              </div>
              <div className="overflow-x-auto min-w-max no-scrollbar">
                <table className="w-full text-left font-bold">
                  <thead>
                    <tr className="border-b-2 border-black/10 text-black/50 text-sm">
                      <th className="p-4">Item</th>
                      <th className="p-4">Fan Phone</th>
                      <th className="p-4">Amount Paid</th>
                      <th className="p-4 text-green-700">Your Share (80%)</th>
                      <th className="p-4">Date</th>
                    </tr>
                  </thead>
                  <tbody>
                    {creatorTransactions.slice(0, 5).map(t => (
                      <tr key={t.id} className="border-b border-black/5 hover:bg-black/5 transition-colors">
                        <td className="p-4">{t.isTimePass ? '7-Day Time-Pass' : 'PPV Video Unlock'}</td>
                        <td className="p-4">{t.fanPhoneNumber}</td>
                        <td className="p-4">TZS {t.amount.toLocaleString()}</td>
                        <td className="p-4 text-green-700">+TZS {t.creatorShare.toLocaleString()}</td>
                        <td className="p-4 text-black/50 text-sm">{new Date(t.createdAt).toLocaleDateString()}</td>
                      </tr>
                    ))}
                    {creatorTransactions.length === 0 && (
                      <tr>
                        <td colSpan={5} className="p-8 text-center text-black/50">No sales yet. Share your link!</td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </motion.div>
        )}

        {activeTab === 'videos' && (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {creatorVideos.map(video => (
              <div key={video.id} className="bg-white/40 border-2 border-black/10 rounded-3xl overflow-hidden shadow-xl flex flex-col">
                <div className="relative aspect-video bg-black">
                  <Image src={video.thumbnailUrl} alt={video.title} fill className="object-cover opacity-80" />
                  <div className="absolute top-2 right-2 bg-black/80 text-[#DDA359] px-2 py-1 rounded-lg text-xs font-black backdrop-blur-sm">
                    TZS {video.price.toLocaleString()}
                  </div>
                </div>
                <div className="p-4 flex-1 flex flex-col">
                  <h3 className="text-lg font-black leading-tight mb-2 line-clamp-2">{video.title}</h3>
                  <div className="mt-auto flex justify-between items-center text-sm font-bold text-black/60 pt-4 border-t border-black/10">
                    <span className="flex items-center gap-1"><Eye className="w-4 h-4" /> {video.views.toLocaleString()}</span>
                    <span>{new Date(video.createdAt).toLocaleDateString()}</span>
                  </div>
                </div>
              </div>
            ))}
          </motion.div>
        )}
      </main>

      {/* Upload Modal */}
      <AnimatePresence>
        {isUploading && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[100] flex items-center justify-center p-4">
            <motion.div initial={{ scale: 0.9 }} animate={{ scale: 1 }} className="bg-[#DDA359] p-8 rounded-3xl w-full max-w-md shadow-2xl border-2 border-black">
              <h2 className="text-2xl font-black mb-6">Upload New Video</h2>
              <div className="space-y-4">
                <div>
                  <label className="block font-bold mb-2">Video Title</label>
                  <input type="text" value={newTitle} onChange={(e) => setNewTitle(e.target.value)} className="w-full bg-white border-2 border-black rounded-xl px-4 py-3 font-bold focus:outline-none" placeholder="e.g. Exclusive Behind the Scenes" />
                </div>
                <div>
                  <label className="block font-bold mb-2">Pay-Per-View Price (TZS)</label>
                  <input type="number" value={newPrice} onChange={(e) => setNewPrice(e.target.value)} className="w-full bg-white border-2 border-black rounded-xl px-4 py-3 font-bold focus:outline-none" />
                </div>
                <div className="border-2 border-dashed border-black/30 rounded-xl p-8 text-center bg-white/20">
                  <UploadCloud className="w-10 h-10 mx-auto mb-2 opacity-50" />
                  <p className="font-bold text-sm opacity-70">Drag & drop video file here<br/>(Simulated Bunny.net upload)</p>
                </div>
              </div>
              <div className="flex gap-4 mt-8">
                <button onClick={() => setIsUploading(false)} className="flex-1 bg-black/10 hover:bg-black/20 text-black font-bold py-3 rounded-xl transition-colors">Cancel</button>
                <button onClick={handleUpload} className="flex-1 bg-black text-[#DDA359] hover:bg-neutral-800 font-bold py-3 rounded-xl transition-colors">Publish</button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Withdraw Modal */}
      <AnimatePresence>
        {isWithdrawing && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[100] flex items-center justify-center p-4">
            <motion.div initial={{ scale: 0.9 }} animate={{ scale: 1 }} className="bg-[#DDA359] p-8 rounded-3xl w-full max-w-md shadow-2xl border-2 border-black">
              <h2 className="text-2xl font-black mb-2">Withdraw Funds</h2>
              <p className="font-bold text-black/70 mb-6">Available: TZS {creator.walletBalance.toLocaleString()}</p>
              <div className="space-y-4">
                <div>
                  <label className="block font-bold mb-2">Amount to Withdraw</label>
                  <input type="number" value={withdrawAmount} onChange={(e) => setWithdrawAmount(e.target.value)} max={creator.walletBalance} className="w-full bg-white border-2 border-black rounded-xl px-4 py-4 font-black text-xl text-center focus:outline-none shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]" placeholder="0" />
                </div>
              </div>
              <div className="flex gap-4 mt-8">
                <button onClick={() => setIsWithdrawing(false)} className="flex-1 bg-black/10 hover:bg-black/20 text-black font-bold py-3 rounded-xl transition-colors">Cancel</button>
                <button onClick={handleWithdraw} className="flex-1 bg-black text-[#DDA359] hover:bg-neutral-800 font-bold py-3 rounded-xl transition-colors">Confirm Transfer</button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}
