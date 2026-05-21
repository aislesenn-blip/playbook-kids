"use client";
import { useAppStore } from '@/lib/store/app-store';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { ShieldCheck, BarChart3, Clock, Trophy, Target, ArrowRight, Settings, BookOpen } from 'lucide-react';
import Link from 'next/link';

export default function ParentDashboard() {
  const { profile, episodes } = useAppStore();
  const router = useRouter();

  useEffect(() => {
    if (!profile) {
      router.push('/auth/signup');
    }
  }, [profile, router]);

  if (!profile) return null;

  const completedEpisodes = episodes.filter(e => e.isCompleted).length;
  const totalXP = profile.points || completedEpisodes * 30; // Mock calculation

  // Calculate average accuracy (mock logic based on level)
  const levelNumber = profile.level === 'Starter' ? 1 : profile.level === 'Beginner' ? 2 : profile.level === 'Elementary' ? 3 : profile.level === 'Intermediate' ? 4 : 5;
  const averageAccuracy = Math.min(75 + levelNumber * 2, 98);

  // Mock recent activity based on episodes
  const recentActivities = episodes
    .filter(e => e.isCompleted || !e.isLocked)
    .slice(0, 3)
    .map((e, index) => ({
      id: e.id,
      title: e.title,
      type: e.type,
      date: e.isCompleted ? 'Today' : 'In Progress',
      xp: e.isCompleted ? 30 : 0,
      accuracy: e.isCompleted ? 85 + (index * 5) : null
    }));

  return (
    <div className="w-full bg-zinc-50 min-h-screen pb-32">

      {/* Parent Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full bg-white border-b border-gray-200 pt-28 pb-16 px-4 rounded-b-[3rem] shadow-sm relative overflow-hidden"
      >
        <div className="max-w-7xl mx-auto relative z-10 flex flex-col md:flex-row justify-between items-start md:items-center gap-8">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <ShieldCheck className="w-6 h-6 text-[#DDA359]" />
              <span className="text-sm font-bold uppercase tracking-widest text-[#DDA359]">Parent Portal</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-black mb-3 text-zinc-900">
              {profile.name}&apos;s Progress
            </h1>
            <p className="text-gray-500 text-lg max-w-xl">
              Track learning milestones, manage settings, and view actionable insights for {profile.targetLanguage}.
            </p>
          </div>

          <div className="flex items-center gap-4">
             <button className="bg-gray-100 hover:bg-gray-200 text-zinc-900 p-4 rounded-2xl flex items-center justify-center transition-colors">
               <Settings className="w-6 h-6" />
             </button>
             <Link href="/dashboard" className="bg-[#DDA359] hover:bg-[#DDA359]/90 text-white px-6 py-4 rounded-2xl font-bold flex items-center gap-2 transition-colors">
               Switch to Learner <ArrowRight className="w-5 h-5" />
             </Link>
          </div>
        </div>
      </motion.div>

      {/* Main Content Area */}
      <div className="max-w-7xl mx-auto w-full px-4 md:px-8 mt-12 space-y-12">

        {/* KPI Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">

          {/* Streak Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-white p-6 rounded-3xl border border-gray-100 shadow-xl shadow-gray-200/50 flex flex-col"
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-orange-500/10 flex items-center justify-center">
                <Target className="w-5 h-5 text-orange-500" />
              </div>
              <h3 className="font-bold text-gray-500 uppercase text-sm tracking-wider">Current Streak</h3>
            </div>
            <div className="flex items-baseline gap-2">
              <span className="text-4xl font-black text-zinc-900">{profile.streak}</span>
              <span className="text-gray-500 font-medium">Days</span>
            </div>
            <div className="mt-4 h-2 w-full bg-gray-100 rounded-full overflow-hidden">
               <div className="h-full bg-orange-500 rounded-full" style={{ width: '80%' }} />
            </div>
          </motion.div>

          {/* XP Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white p-6 rounded-3xl border border-gray-100 shadow-xl shadow-gray-200/50 flex flex-col"
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-[#DDA359]/10 flex items-center justify-center">
                <Trophy className="w-5 h-5 text-[#DDA359]" />
              </div>
              <h3 className="font-bold text-gray-500 uppercase text-sm tracking-wider">Total XP</h3>
            </div>
            <div className="flex items-baseline gap-2">
              <span className="text-4xl font-black text-zinc-900">{totalXP}</span>
              <span className="text-gray-500 font-medium">Points</span>
            </div>
            <p className="mt-4 text-sm font-medium text-emerald-600 flex items-center gap-1">
              Top 15% of learners
            </p>
          </motion.div>

          {/* Lessons Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-white p-6 rounded-3xl border border-gray-100 shadow-xl shadow-gray-200/50 flex flex-col"
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-blue-500/10 flex items-center justify-center">
                <BookOpen className="w-5 h-5 text-blue-500" />
              </div>
              <h3 className="font-bold text-gray-500 uppercase text-sm tracking-wider">Lessons Done</h3>
            </div>
            <div className="flex items-baseline gap-2">
              <span className="text-4xl font-black text-zinc-900">{completedEpisodes}</span>
              <span className="text-gray-500 font-medium">Episodes</span>
            </div>
            <p className="mt-4 text-sm font-medium text-gray-500">
               ~{(completedEpisodes * 15) / 60} hours spoken
            </p>
          </motion.div>

          {/* Accuracy Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="bg-white p-6 rounded-3xl border border-gray-100 shadow-xl shadow-gray-200/50 flex flex-col"
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-emerald-500/10 flex items-center justify-center">
                <BarChart3 className="w-5 h-5 text-emerald-500" />
              </div>
              <h3 className="font-bold text-gray-500 uppercase text-sm tracking-wider">Pronunciation</h3>
            </div>
            <div className="flex items-baseline gap-2">
              <span className="text-4xl font-black text-zinc-900">{averageAccuracy}%</span>
              <span className="text-gray-500 font-medium">Accuracy</span>
            </div>
            <p className="mt-4 text-sm font-medium text-gray-500">
               Excellent clarity
            </p>
          </motion.div>

        </div>

        {/* Detailed Sections */}
        <div className="grid lg:grid-cols-3 gap-8">

          {/* Recent Activity List */}
          <div className="lg:col-span-2 space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-black text-zinc-900">Recent Sessions</h2>
            </div>

            <div className="bg-white rounded-3xl border border-gray-100 shadow-xl shadow-gray-200/50 overflow-hidden">
               <div className="overflow-x-auto min-w-max">
                 <table className="w-full text-left">
                   <thead>
                     <tr className="bg-gray-50/50 border-b border-gray-100">
                       <th className="p-6 text-xs font-bold uppercase tracking-wider text-gray-500">Episode</th>
                       <th className="p-6 text-xs font-bold uppercase tracking-wider text-gray-500">Status</th>
                       <th className="p-6 text-xs font-bold uppercase tracking-wider text-gray-500">Score</th>
                       <th className="p-6 text-xs font-bold uppercase tracking-wider text-gray-500">Earned</th>
                     </tr>
                   </thead>
                   <tbody>
                     {recentActivities.map((activity, i) => (
                       <tr key={activity.id} className={i !== recentActivities.length - 1 ? 'border-b border-gray-50' : ''}>
                         <td className="p-6">
                           <p className="font-bold text-zinc-900">{activity.title}</p>
                           <p className="text-sm text-gray-500 capitalize">{activity.type}</p>
                         </td>
                         <td className="p-6">
                           <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-bold ${
                             activity.date === 'Today' ? 'bg-emerald-100 text-emerald-700' : 'bg-orange-100 text-orange-700'
                           }`}>
                             {activity.date}
                           </span>
                         </td>
                         <td className="p-6">
                           {activity.accuracy ? (
                             <span className="font-bold text-zinc-900">{activity.accuracy}%</span>
                           ) : (
                             <span className="text-gray-400">-</span>
                           )}
                         </td>
                         <td className="p-6">
                           {activity.xp > 0 ? (
                             <span className="font-bold text-[#DDA359]">+{activity.xp} XP</span>
                           ) : (
                             <span className="text-gray-400">-</span>
                           )}
                         </td>
                       </tr>
                     ))}
                   </tbody>
                 </table>
               </div>
            </div>
          </div>

          {/* Actionable Homework / Suggestions */}
          <div className="space-y-6">
            <h2 className="text-2xl font-black text-zinc-900">Parent Actions</h2>

            <div className="bg-[#DDA359] text-white p-8 rounded-3xl shadow-xl shadow-[#DDA359]/20 relative overflow-hidden">
               <div className="absolute -right-6 -top-6 w-32 h-32 bg-white/10 rounded-full blur-2xl pointer-events-none" />
               <div className="relative z-10">
                 <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center mb-6">
                   <Clock className="w-6 h-6 text-white" />
                 </div>
                 <h3 className="text-xl font-black mb-2">Offline Practice</h3>
                 <p className="text-white/90 mb-6 font-medium">
                   {profile.name} learned how to introduce themselves today. Ask them to introduce you in {profile.targetLanguage} before dinner!
                 </p>
                 <button className="w-full py-3 bg-white text-[#DDA359] rounded-xl font-bold hover:bg-gray-50 transition-colors">
                   Mark as Done (+10 XP)
                 </button>
               </div>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
}