"use client";
import { useAppStore } from '@/lib/store/app-store';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { Settings, BarChart3, Clock, Trophy, BookOpen, BrainCircuit, Activity, ShieldCheck, ChevronLeft } from 'lucide-react';
import { motion } from 'framer-motion';
import Link from 'next/link';

export default function ParentDashboard() {
  const { profile } = useAppStore();
  const router = useRouter();

  useEffect(() => {
    if (!profile) {
      router.push('/auth/signup');
    }
  }, [profile, router]);

  if (!profile) return null;

  const totalXP = profile.points;
  const totalTimeSpent = 45; // minutes mock
  const averageAccuracy = 92; // percent mock
  const currentFocus = "Active spontaneous recall of greetings";

  const recentActivities = [
    { id: 1, title: 'The Greetings Forest', type: 'story', date: 'Today', accuracy: 95, xp: 30 },
    { id: 2, title: 'Color Carnival', type: 'roleplay', date: 'Yesterday', accuracy: 88, xp: 45 },
    { id: 3, title: 'Number Quest', type: 'challenge', date: '2 days ago', accuracy: 100, xp: 50 },
  ];

  return (
    <div className="w-full bg-[#F8F6F3] min-h-screen pb-32 overflow-x-hidden pt-20">

      {/* Header */}
      <div className="w-full max-w-5xl mx-auto px-4 md:px-8 mb-12">
        <Link href="/profile" className="inline-flex items-center gap-2 text-zinc-500 hover:text-zinc-900 transition-colors font-medium mb-8">
          <ChevronLeft className="w-4 h-4" /> Back to Profile
        </Link>

        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 bg-white p-8 rounded-3xl border border-zinc-100 shadow-[0_4px_40px_rgba(0,0,0,0.02)] relative overflow-hidden">
          <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-[#DDA359]/5 rounded-full blur-[80px] pointer-events-none" />
          <div className="relative z-10">
            <div className="flex items-center gap-2 mb-3">
               <ShieldCheck className="w-5 h-5 text-[#DDA359]" />
               <span className="text-xs font-semibold tracking-widest uppercase text-[#DDA359]">Parent Portal</span>
            </div>
            <h1 className="text-3xl md:text-4xl font-semibold mb-2 tracking-tight text-zinc-900">{profile.name}&apos;s Progress</h1>
            <p className="text-zinc-500 font-medium">Monitoring cognitive development and language acquisition.</p>
          </div>
          <button className="relative z-10 w-12 h-12 rounded-2xl bg-zinc-50 border border-zinc-100 flex items-center justify-center hover:bg-zinc-100 transition-colors">
            <Settings className="w-5 h-5 text-zinc-600" />
          </button>
        </div>
      </div>

      <div className="w-full max-w-5xl mx-auto px-4 md:px-8 space-y-8">

        {/* Top Stats Row */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="bg-white p-6 rounded-3xl border border-zinc-100 shadow-[0_4px_40px_rgba(0,0,0,0.02)] flex flex-col">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-[#DDA359]/10 flex items-center justify-center">
                <Trophy className="w-5 h-5 text-[#DDA359]" />
              </div>
              <h3 className="font-semibold text-zinc-500 uppercase text-xs tracking-wider">Total XP</h3>
            </div>
            <div className="flex items-baseline gap-2">
              <span className="text-3xl font-semibold text-zinc-900">{totalXP}</span>
              <span className="text-zinc-500 font-medium text-sm">Points</span>
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="bg-white p-6 rounded-3xl border border-zinc-100 shadow-[0_4px_40px_rgba(0,0,0,0.02)] flex flex-col">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-zinc-50 flex items-center justify-center border border-zinc-100">
                <Clock className="w-5 h-5 text-zinc-600" />
              </div>
              <h3 className="font-semibold text-zinc-500 uppercase text-xs tracking-wider">Speaking Time</h3>
            </div>
            <div className="flex items-baseline gap-2">
              <span className="text-3xl font-semibold text-zinc-900">{totalTimeSpent}</span>
              <span className="text-zinc-500 font-medium text-sm">Mins</span>
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="bg-white p-6 rounded-3xl border border-zinc-100 shadow-[0_4px_40px_rgba(0,0,0,0.02)] flex flex-col">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-zinc-50 flex items-center justify-center border border-zinc-100">
                <BarChart3 className="w-5 h-5 text-zinc-600" />
              </div>
              <h3 className="font-semibold text-zinc-500 uppercase text-xs tracking-wider">Pronunciation</h3>
            </div>
            <div className="flex items-baseline gap-2">
              <span className="text-3xl font-semibold text-zinc-900">{averageAccuracy}%</span>
              <span className="text-zinc-500 font-medium text-sm">Accuracy</span>
            </div>
          </motion.div>
        </div>

        {/* Detailed Sections */}
        <div className="grid lg:grid-cols-3 gap-8 pt-4">

          {/* Left Column: Milestones & Activity */}
          <div className="lg:col-span-2 space-y-8">

            <div className="bg-white p-8 rounded-3xl border border-zinc-100 shadow-[0_4px_40px_rgba(0,0,0,0.02)]">
               <div className="flex items-center justify-between mb-8">
                 <div>
                   <h2 className="text-xl font-semibold text-zinc-900 mb-1">Cognitive Milestone</h2>
                   <p className="text-zinc-500 font-medium text-sm">What {profile.name} is currently mastering.</p>
                 </div>
                 <div className="w-12 h-12 bg-zinc-50 border border-zinc-100 rounded-2xl flex items-center justify-center">
                   <BrainCircuit className="w-5 h-5 text-zinc-600" />
                 </div>
               </div>

               <div className="p-6 bg-zinc-50/50 rounded-2xl border border-zinc-100">
                  <h3 className="text-lg font-semibold text-zinc-900 mb-3">&quot;{currentFocus}&quot;</h3>
                  <p className="text-zinc-600 text-sm mb-6 leading-relaxed">
                    At the {profile.level} level, children focus on building confidence through repetitive, high-frequency vocabulary. We are currently reinforcing active recall over passive listening.
                  </p>

                  <div className="flex flex-col gap-4">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-white border border-zinc-200 flex items-center justify-center shrink-0 shadow-sm">
                         <ShieldCheck className="w-4 h-4 text-zinc-700" />
                      </div>
                      <span className="text-sm font-medium text-zinc-700">Can recognize basic greetings.</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-white border border-zinc-200 flex items-center justify-center shrink-0 shadow-sm">
                         <Activity className="w-4 h-4 text-zinc-700" />
                      </div>
                      <span className="text-sm font-medium text-zinc-700">Working on spontaneous sentence formulation.</span>
                    </div>
                  </div>
               </div>
            </div>

            <div className="space-y-4">
              <h2 className="text-xl font-semibold text-zinc-900 px-2">Recent Sessions</h2>
              <div className="bg-white rounded-3xl border border-zinc-100 shadow-[0_4px_40px_rgba(0,0,0,0.02)] overflow-hidden">
                 <div className="overflow-x-auto min-w-max">
                   <table className="w-full text-left">
                     <thead>
                       <tr className="bg-zinc-50/50 border-b border-zinc-100">
                         <th className="p-5 text-xs font-semibold uppercase tracking-wider text-zinc-500">Episode</th>
                         <th className="p-5 text-xs font-semibold uppercase tracking-wider text-zinc-500">Status</th>
                         <th className="p-5 text-xs font-semibold uppercase tracking-wider text-zinc-500">Accuracy</th>
                         <th className="p-5 text-xs font-semibold uppercase tracking-wider text-zinc-500">Earned</th>
                       </tr>
                     </thead>
                     <tbody>
                       {recentActivities.map((activity, i) => (
                         <tr key={activity.id} className={i !== recentActivities.length - 1 ? 'border-b border-zinc-50' : ''}>
                           <td className="p-5">
                             <p className="font-semibold text-zinc-900 text-sm mb-1">{activity.title}</p>
                             <p className="text-xs text-zinc-500 capitalize">{activity.type}</p>
                           </td>
                           <td className="p-5">
                             <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-[10px] font-semibold uppercase tracking-wider ${
                               activity.date === 'Today' ? 'bg-[#DDA359]/10 text-[#DDA359]' : 'bg-zinc-100 text-zinc-500'
                             }`}>
                               {activity.date}
                             </span>
                           </td>
                           <td className="p-5">
                             <span className="font-semibold text-zinc-900 text-sm">{activity.accuracy}%</span>
                           </td>
                           <td className="p-5">
                             <span className="font-semibold text-zinc-600 text-sm">+{activity.xp} XP</span>
                           </td>
                         </tr>
                       ))}
                     </tbody>
                   </table>
                 </div>
              </div>
            </div>
          </div>

          {/* Right Column: Actionable Homework */}
          <div className="space-y-6">
            <div className="bg-zinc-900 text-white p-8 rounded-3xl shadow-xl relative overflow-hidden">
               <div className="absolute -right-6 -top-6 w-32 h-32 bg-white/5 rounded-full blur-2xl pointer-events-none" />
               <div className="relative z-10">
                 <div className="flex items-center justify-between mb-6">
                   <div className="w-12 h-12 bg-white/10 rounded-2xl flex items-center justify-center">
                     <BookOpen className="w-5 h-5 text-white" />
                   </div>
                   <span className="px-3 py-1 bg-[#DDA359] text-white text-[10px] font-semibold uppercase tracking-widest rounded-full">
                     Action
                   </span>
                 </div>
                 <h3 className="text-xl font-semibold mb-3">Dinner Table Challenge</h3>
                 <p className="text-white/80 text-sm leading-relaxed mb-8">
                   {profile.name} learned how to introduce themselves today. Tonight, ask them to introduce their favorite toy in {profile.targetLanguage}.
                 </p>
                 <button className="w-full py-3.5 bg-white text-zinc-900 rounded-xl font-semibold hover:bg-zinc-100 transition-colors text-sm">
                   Mark as Complete (+20 XP)
                 </button>
               </div>
            </div>

            <div className="bg-white p-6 rounded-3xl border border-zinc-100 shadow-[0_4px_40px_rgba(0,0,0,0.02)]">
               <h3 className="font-semibold text-zinc-900 mb-2">Why this matters</h3>
               <p className="text-sm text-zinc-500 leading-relaxed">
                 Children retain 40% more vocabulary when they use it in a low-pressure, familiar environment with their parents. Your involvement directly increases their fluency.
               </p>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
