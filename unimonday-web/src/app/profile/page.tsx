"use client";

import { useStudentStore } from "@/lib/store/student-store";
import Image from "next/image";
import { TrendingUp, BookOpen, Clock, Settings, Trophy, CheckCircle2, Star, Target } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function ProfilePage() {
  const { currentStudent, stats, resetApp } = useStudentStore();
  const router = useRouter();

  useEffect(() => {
    if (!currentStudent) {
      router.push('/');
    }
  }, [currentStudent, router]);

  if (!currentStudent) return null;

  const handleLogout = () => {
    resetApp();
    router.push('/');
  };

  return (
    <div className="pb-24 max-w-5xl mx-auto pt-4 px-4">
      {/* Header & Status */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-8">
        <div className="flex items-center gap-6">
          <div className="relative w-24 h-24 rounded-[2rem] bg-secondary/50 border-4 border-white shadow-xl overflow-hidden shrink-0">
             <Image src={currentStudent.avatarUrl} alt="Avatar" fill className="object-cover" />
          </div>
          <div>
            <h1 className="text-3xl font-black tracking-tight mb-1">{currentStudent.name}</h1>
            <p className="text-primary font-bold">{currentStudent.level} Scholar</p>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-4">
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 px-6 py-4 rounded-3xl border border-border/50 bg-white hover:bg-destructive/10 hover:text-destructive hover:border-destructive/20 transition-colors text-sm font-bold"
          >
            <Settings className="w-4 h-4" />
            Parent Settings / Logout
          </button>
        </div>
      </div>

      {/* Quick Stats (Adapted from Vendor Dashboard) */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
        {[
          { label: "Words Mastered", value: stats.wordsMastered, icon: BookOpen, color: "text-primary", bg: "bg-primary/10" },
          { label: "Accuracy", value: `${stats.accuracy}%`, icon: Target, color: "text-blue-500", bg: "bg-blue-500/10" },
          { label: "Learning Streak", value: `${stats.streak} Days`, icon: TrendingUp, color: "text-amber-500", bg: "bg-amber-500/10" },
          { label: "Lessons Done", value: stats.completedLessonIds.length, icon: CheckCircle2, color: "text-purple-500", bg: "bg-purple-500/10" },
        ].map((stat, i) => (
          <div key={i} className="bg-white p-6 rounded-[2rem] border border-border/50 shadow-sm flex flex-col justify-between min-h-[120px]">
            <div className="flex justify-between items-start">
              <span className="text-muted-foreground font-medium text-sm">{stat.label}</span>
              <div className={`p-2 rounded-xl ${stat.bg}`}>
                <stat.icon className={`w-4 h-4 ${stat.color}`} />
              </div>
            </div>
            <span className="text-2xl font-black mt-4">{stat.value}</span>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Achievements Column */}
        <div className="lg:col-span-1">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold tracking-tight">Achievements</h2>
            <div className="w-8 h-8 rounded-full bg-amber-500/10 text-amber-500 flex items-center justify-center font-bold text-sm">
              3
            </div>
          </div>

          <div className="flex flex-col gap-4">
            <div className="p-5 rounded-[2rem] border-2 border-primary/20 bg-primary/5 flex items-center gap-4">
               <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-sm text-primary">
                 <Star className="w-6 h-6 fill-primary" />
               </div>
               <div>
                 <h3 className="font-bold">First Word Spoken</h3>
                 <p className="text-sm text-muted-foreground">Completed the first speaking challenge.</p>
               </div>
            </div>
            <div className="p-5 rounded-[2rem] border-2 border-blue-500/20 bg-blue-500/5 flex items-center gap-4">
               <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-sm text-blue-500">
                 <Trophy className="w-6 h-6" />
               </div>
               <div>
                 <h3 className="font-bold">Perfect Score</h3>
                 <p className="text-sm text-muted-foreground">Got 100% on a writing lesson.</p>
               </div>
            </div>
             <div className="p-5 rounded-[2rem] border border-border/50 bg-secondary/30 flex items-center gap-4 opacity-75">
               <div className="w-12 h-12 bg-background rounded-full flex items-center justify-center shadow-sm text-muted-foreground">
                 <Clock className="w-6 h-6" />
               </div>
               <div>
                 <h3 className="font-bold">7-Day Streak</h3>
                 <p className="text-sm text-muted-foreground">Learn for 7 days in a row.</p>
               </div>
            </div>
          </div>
        </div>

        {/* Progress Report Column */}
        <div className="lg:col-span-2">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold tracking-tight">Recent Activity</h2>
          </div>

          <div className="grid grid-cols-1 gap-4">
            {stats.completedLessonIds.length === 0 ? (
               <div className="bg-white p-8 rounded-[2rem] border border-border/50 text-center flex flex-col items-center justify-center py-16">
                 <BookOpen className="w-12 h-12 text-muted-foreground/30 mb-4" />
                 <h3 className="text-xl font-bold mb-2">No activity yet</h3>
                 <p className="text-muted-foreground">Start a lesson on the Learning Path to see progress here.</p>
               </div>
            ) : (
              stats.completedLessonIds.map((id, index) => (
                <div key={index} className="flex items-center gap-4 bg-white p-4 sm:p-6 rounded-[2rem] border border-border/50">
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center text-primary shrink-0">
                    <CheckCircle2 className="w-6 h-6" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-bold text-lg">Lesson Completed</h3>
                    <p className="text-muted-foreground">ID: {id} • Excellent accuracy!</p>
                  </div>
                  <div className="text-right">
                    <span className="bg-primary/10 text-primary font-bold px-3 py-1 rounded-full text-sm">
                      +100 pts
                    </span>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}