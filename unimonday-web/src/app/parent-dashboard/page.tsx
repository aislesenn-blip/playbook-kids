"use client";
import { useAppStore } from '@/lib/store/app-store';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { ShieldCheck, BarChart3, Clock, Trophy, Target, ArrowRight, Settings, BookOpen, BrainCircuit, Activity } from 'lucide-react';
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
  const totalTimeSpent = completedEpisodes * 15; // Mock: 15 mins per episode

  // Calculate average accuracy (mock logic based on level)
  const levelNumber = profile.level === 'Starter' ? 1 : profile.level === 'Beginner' ? 2 : profile.level === 'Elementary' ? 3 : profile.level === 'Intermediate' ? 4 : 5;
  const averageAccuracy = Math.min(75 + levelNumber * 2, 98);

  const currentFocus = profile.level === 'Starter' ? "Basic Greetings & Animal Names" : "Sentence Construction & Questions";

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
    <div className="w-full bg-[#DDA359] min-h-screen pb-32">

      {/* Parent Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full bg-white border-b border-black/10 pt-28 pb-16 px-4 rounded-b-[3rem] shadow-sm relative overflow-hidden"
      >
        <div className="max-w-7xl mx-auto relative z-10 flex flex-col md:flex-row justify-between items-start md:items-center gap-8">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <ShieldCheck className="w-6 h-6 text-[#DDA359]" />
              <span className="text-sm font-bold uppercase tracking-widest text-[#DDA359]">Parent Portal</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-black mb-3 text-black">
              {profile.name}&apos;s Progress
            </h1>
            <p className="text-black/60 text-lg max-w-xl">
              Track learning milestones, manage settings, and view actionable insights for {profile.targetLanguage}.
            </p>
          </div>

          <div className="flex items-center gap-4">
             <button className="bg-gray-100 hover:bg-gray-200 text-black p-4 rounded-2xl flex items-center justify-center transition-colors">
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
            className="bg-white p-6 rounded-3xl border border-black/10 shadow-xl shadow-black/5 flex flex-col"
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-orange-500/10 flex items-center justify-center">
                <Target className="w-5 h-5 text-orange-500" />
              </div>
              <h3 className="font-bold text-black/60 uppercase text-sm tracking-wider">Current Streak</h3>
            </div>
            <div className="flex items-baseline gap-2">
              <span className="text-4xl font-black text-black">{profile.streak}</span>
              <span className="text-black/60 font-medium">Days</span>
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
            className="bg-white p-6 rounded-3xl border border-black/10 shadow-xl shadow-black/5 flex flex-col"
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-[#DDA359]/10 flex items-center justify-center">
                <Trophy className="w-5 h-5 text-[#DDA359]" />
              </div>
              <h3 className="font-bold text-black/60 uppercase text-sm tracking-wider">Total XP</h3>
            </div>
            <div className="flex items-baseline gap-2">
              <span className="text-4xl font-black text-black">{totalXP}</span>
              <span className="text-black/60 font-medium">Points</span>
            </div>
            <p className="mt-4 text-sm font-medium text-emerald-600 flex items-center gap-1">
              Top 15% of learners
            </p>
          </motion.div>

          {/* Time Spent Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-white p-6 rounded-3xl border border-black/10 shadow-xl shadow-black/5 flex flex-col"
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-blue-500/10 flex items-center justify-center">
                <Clock className="w-5 h-5 text-blue-500" />
              </div>
              <h3 className="font-bold text-black/60 uppercase text-sm tracking-wider">Speaking Time</h3>
            </div>
            <div className="flex items-baseline gap-2">
              <span className="text-4xl font-black text-black">{totalTimeSpent}</span>
              <span className="text-black/60 font-medium">Mins</span>
            </div>
            <p className="mt-4 text-sm font-medium text-blue-600 flex items-center gap-1">
              Active voice immersion
            </p>
          </motion.div>

          {/* Accuracy Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="bg-white p-6 rounded-3xl border border-black/10 shadow-xl shadow-black/5 flex flex-col"
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-emerald-500/10 flex items-center justify-center">
                <BarChart3 className="w-5 h-5 text-emerald-500" />
              </div>
              <h3 className="font-bold text-black/60 uppercase text-sm tracking-wider">Pronunciation</h3>
            </div>
            <div className="flex items-baseline gap-2">
              <span className="text-4xl font-black text-black">{averageAccuracy}%</span>
              <span className="text-black/60 font-medium">Accuracy</span>
            </div>
            <p className="mt-4 text-sm font-medium text-black/60">
               Excellent clarity
            </p>
          </motion.div>

        </div>

        {/* Detailed Sections */}
        <div className="grid lg:grid-cols-3 gap-8">

          {/* Left Column: Milestones & Activity */}
          <div className="lg:col-span-2 space-y-8">

            {/* Cognitive Milestone Tracker */}
            <div className="bg-white p-8 rounded-3xl border border-black/10 shadow-xl shadow-black/5">
               <div className="flex items-center justify-between mb-6">
                 <div>
                   <h2 className="text-2xl font-black text-black mb-1">Current Cognitive Milestone</h2>
                   <p className="text-black/60 font-medium">What {profile.name} is currently mastering.</p>
                 </div>
                 <div className="w-12 h-12 bg-purple-50 rounded-2xl flex items-center justify-center">
                   <BrainCircuit className="w-6 h-6 text-purple-500" />
                 </div>
               </div>

               <div className="p-6 bg-purple-50/50 rounded-2xl border border-purple-100">
                  <h3 className="text-xl font-bold text-black mb-2">&quot;{currentFocus}&quot;</h3>
                  <p className="text-black/60 mb-4">
                    At the {profile.level} level, children focus on building confidence through repetitive, high-frequency vocabulary. We are currently reinforcing active recall over passive listening.
                  </p>

                  <div className="flex flex-col gap-3">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-emerald-100 flex items-center justify-center shrink-0">
                         <ShieldCheck className="w-4 h-4 text-emerald-600" />
                      </div>
                      <span className="text-sm font-medium text-black">Can recognize basic greetings.</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center shrink-0">
                         <Activity className="w-4 h-4 text-blue-600" />
                      </div>
                      <span className="text-sm font-medium text-black">Working on spontaneous sentence formulation.</span>
                    </div>
                  </div>
               </div>
            </div>

            {/* Recent Activity List */}
            <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-black text-black">Recent Sessions</h2>
            </div>

            <div className="bg-white rounded-3xl border border-black/10 shadow-xl shadow-black/5 overflow-hidden">
               <div className="overflow-x-auto min-w-max">
                 <table className="w-full text-left">
                   <thead>
                     <tr className="bg-black/5 border-b border-black/10">
                       <th className="p-6 text-xs font-bold uppercase tracking-wider text-black/60">Episode</th>
                       <th className="p-6 text-xs font-bold uppercase tracking-wider text-black/60">Status</th>
                       <th className="p-6 text-xs font-bold uppercase tracking-wider text-black/60">Score</th>
                       <th className="p-6 text-xs font-bold uppercase tracking-wider text-black/60">Earned</th>
                     </tr>
                   </thead>
                   <tbody>
                     {recentActivities.map((activity, i) => (
                       <tr key={activity.id} className={i !== recentActivities.length - 1 ? 'border-b border-black/5' : ''}>
                         <td className="p-6">
                           <p className="font-bold text-black">{activity.title}</p>
                           <p className="text-sm text-black/60 capitalize">{activity.type}</p>
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
                             <span className="font-bold text-black">{activity.accuracy}%</span>
                           ) : (
                             <span className="text-black/40">-</span>
                           )}
                         </td>
                         <td className="p-6">
                           {activity.xp > 0 ? (
                             <span className="font-bold text-[#DDA359]">+{activity.xp} XP</span>
                           ) : (
                             <span className="text-black/40">-</span>
                           )}
                         </td>
                       </tr>
                     ))}
                   </tbody>
                 </table>
               </div>
            </div>
          </div>
          </div>

          {/* Right Column: Actionable Homework / Suggestions */}
          <div className="space-y-6">
            <div>
              <h2 className="text-2xl font-black text-black mb-1">Take Action</h2>
              <p className="text-black/60 font-medium mb-6">Bridge the gap to the real world.</p>
            </div>

            <div className="bg-[#DDA359] text-white p-8 rounded-3xl shadow-xl shadow-[#DDA359]/20 relative overflow-hidden">
               <div className="absolute -right-6 -top-6 w-32 h-32 bg-white/10 rounded-full blur-2xl pointer-events-none" />
               <div className="relative z-10">
                 <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center mb-6">
                   <BookOpen className="w-6 h-6 text-white" />
                 </div>
                 <h3 className="text-xl font-black mb-2">Dinner Table Challenge</h3>
                 <p className="text-white/90 mb-6 font-medium">
                   {profile.name} learned how to introduce themselves today. Tonight, ask them to introduce their favorite toy in {profile.targetLanguage}.
                 </p>
                 <button className="w-full py-3 bg-white text-[#DDA359] rounded-xl font-bold hover:bg-gray-50 transition-colors">
                   Mark as Complete (+20 XP)
                 </button>
               </div>
            </div>

            <div className="bg-white p-6 rounded-3xl border border-black/10 shadow-xl shadow-black/5">
               <h3 className="font-bold text-black mb-2">Why this matters</h3>
               <p className="text-sm text-black/60 leading-relaxed">
                 Children retain 40% more vocabulary when they use it in a low-pressure, familiar environment with their parents. Your involvement directly increases their fluency ROI.
               </p>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
}