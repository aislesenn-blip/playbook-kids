"use client";

import { useStudentStore } from "@/lib/store/student-store";
import { supabase } from "@/lib/supabase/client";
import { BookOpen, Smile, Star, ArrowRight, Play, CheckCircle2, Lock } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";

export interface Module {
  id: string;
  title: string;
  description: string;
  level: string;
  orderIndex: number;
  iconName: string;
}

const getIcon = (name: string) => {
  switch (name) {
    case 'smile': return Smile;
    case 'star': return Star;
    default: return BookOpen;
  }
};

export default function HomePage() {
  const { currentStudent, isOnboardingComplete, fetchStats, stats } = useStudentStore();
  const router = useRouter();
  const [modules, setModules] = useState<Module[]>([]);
  const [loading, setLoading] = useState(true);

  const loadModules = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from('modules')
      .select('*')
      .order('order_index', { ascending: true });

    if (data && !error && data.length > 0) {
      setModules(data.map(d => ({
        id: d.id,
        title: d.title,
        description: d.description,
        level: d.level,
        orderIndex: d.order_index,
        iconName: d.icon_name
      })));
    } else {
      console.error("Failed to fetch modules", error);
    }
    setLoading(false);
  };

  useEffect(() => {
    if (!isOnboardingComplete || !currentStudent) {
      router.push('/');
    } else {
      fetchStats();
      const timeoutId = setTimeout(() => {
        loadModules();
      }, 0);
      return () => clearTimeout(timeoutId);
    }

  }, [isOnboardingComplete, currentStudent, router, fetchStats]);

  if (!currentStudent) return null;

  const getModuleStatus = (index: number) => {
    // Basic logic to determine if a module is unlocked or completed
    // In a real app, this would query lessons for the module and check if all are in stats.completedLessonIds
    if (index === 0) return 'current';
    if (index < 0) return 'completed';
    return 'locked';
  };

  return (
    <div className="pb-24 max-w-5xl mx-auto pt-8">
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-12 px-4"
      >
        <h1 className="text-4xl sm:text-5xl font-black tracking-tight mb-3">
          Welcome back, {currentStudent.name}!
        </h1>
        <p className="text-muted-foreground text-xl font-medium">
          Ready for your next learning adventure? Let&apos;s start!
        </p>
      </motion.div>

      {/* Progress Overview Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="px-4 mb-12"
      >
        <div className="bg-gradient-to-r from-primary/10 to-primary/5 border border-primary/20 p-8 rounded-[3rem] flex flex-col sm:flex-row items-center justify-between gap-8 shadow-sm relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3" />

          <div className="flex items-center gap-6 relative z-10">
            <div className="w-20 h-20 rounded-full bg-white flex items-center justify-center shadow-xl shadow-primary/20">
              <Star className="w-10 h-10 text-amber-400 fill-amber-400" />
            </div>
            <div>
              <h2 className="text-2xl font-black mb-1">Excellent Progress</h2>
              <p className="text-primary font-bold text-lg">Current Accuracy: {stats.accuracy}%</p>
            </div>
          </div>
          <Link
            href="/speaking"
            className="relative z-10 flex items-center gap-3 bg-primary text-primary-foreground px-10 py-5 rounded-full font-bold text-lg w-full sm:w-auto justify-center hover:scale-105 transition-transform active:scale-95 shadow-xl shadow-primary/30"
          >
            <Play className="w-5 h-5 fill-current" />
            Start Daily Lesson
          </Link>
        </div>
      </motion.div>

      <div className="px-4 mb-8">
        <h2 className="text-3xl font-black tracking-tight">Your Learning Path</h2>
        <p className="text-muted-foreground font-medium text-lg mt-2">Follow the structured curriculum to achieve fluency.</p>
      </div>

      {/* Modules List */}
      <div className="px-4 flex flex-col gap-6 relative">
        {loading && (
          <div className="flex justify-center p-12">
            <div className="w-10 h-10 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
          </div>
        )}

        {!loading && modules.length === 0 && (
          <div className="bg-secondary/50 p-12 rounded-[3rem] text-center border border-border/50">
            <BookOpen className="w-16 h-16 mx-auto mb-4 text-muted-foreground/50" />
            <h3 className="text-2xl font-bold mb-2">Curriculum Loading</h3>
            <p className="text-muted-foreground font-medium text-lg">Please ensure the database seed script has been executed to load your personalized modules.</p>
          </div>
        )}

        {!loading && modules.map((module, index) => {
          const Icon = getIcon(module.iconName);
          const status = getModuleStatus(index);
          const isCurrent = status === 'current';
          const isLocked = status === 'locked';

          return (
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 * index }}
              key={module.id}
              className={`bg-white p-8 rounded-[3rem] border shadow-sm transition-all relative group overflow-hidden ${
                isCurrent ? 'ring-2 ring-primary border-transparent shadow-xl shadow-primary/10' : 'border-border/50'
              } ${isLocked ? 'opacity-75' : ''}`}
            >
              {isCurrent && (
                <div className="absolute top-0 right-0 bg-primary text-primary-foreground text-sm font-bold px-6 py-2 rounded-bl-2xl">
                  Current Week
                </div>
              )}

              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-8 relative z-10">
                <div className="flex items-start gap-6">
                  <div className={`w-20 h-20 rounded-3xl flex items-center justify-center shrink-0 shadow-inner ${
                    isCurrent ? 'bg-primary text-white' : isLocked ? 'bg-secondary text-muted-foreground' : 'bg-primary/10 text-primary'
                  }`}>
                    {isLocked ? <Lock className="w-8 h-8" /> : <Icon className="w-10 h-10" />}
                  </div>
                  <div>
                    <h3 className={`text-2xl font-black mb-2 ${isLocked ? 'text-muted-foreground' : ''}`}>
                      Module {module.orderIndex}: {module.title}
                    </h3>
                    <p className="text-muted-foreground font-medium text-lg max-w-xl">{module.description}</p>
                    <div className="flex gap-3 mt-4">
                      <span className={`text-sm font-bold px-4 py-1.5 rounded-full ${isLocked ? 'bg-secondary text-muted-foreground' : 'bg-secondary text-foreground'}`}>
                        2 Lessons
                      </span>
                      <span className={`text-sm font-bold px-4 py-1.5 rounded-full ${isLocked ? 'bg-secondary text-muted-foreground' : 'bg-secondary text-foreground'}`}>
                        Vocabulary
                      </span>
                    </div>
                  </div>
                </div>

                <div className="flex gap-3 mt-4 sm:mt-0 shrink-0">
                   {!isLocked ? (
                     <Link
                        href="/speaking"
                        className={`flex items-center justify-center gap-2 px-8 py-4 rounded-2xl font-bold transition-all w-full sm:w-auto text-lg ${
                          isCurrent
                            ? 'bg-primary text-primary-foreground shadow-lg shadow-primary/20 hover:bg-primary/90 hover:scale-105 active:scale-95'
                            : 'bg-primary/10 text-primary hover:bg-primary/20'
                        }`}
                     >
                       {isCurrent ? 'Continue' : 'Review'} <ArrowRight className="w-5 h-5" />
                     </Link>
                   ) : (
                     <div className="flex items-center justify-center gap-2 px-8 py-4 rounded-2xl font-bold bg-secondary text-muted-foreground w-full sm:w-auto text-lg">
                       <Lock className="w-5 h-5" /> Locked
                     </div>
                   )}
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
