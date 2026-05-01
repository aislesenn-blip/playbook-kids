"use client";

import { useStudentStore } from "@/lib/store/student-store";
import { supabase } from "@/lib/supabase/client";
import { BookOpen, Smile, Star, ArrowRight, Play } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

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
  const { currentStudent, isOnboardingComplete, fetchStats } = useStudentStore();
  const router = useRouter();
  const [modules, setModules] = useState<Module[]>([]);
  const [loading, setLoading] = useState(true);

  const loadModules = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from('modules')
      .select('*')
      .order('order_index', { ascending: true });

    if (data && !error) {
      // Map snake_case from DB to camelCase if needed, or adjust interface
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
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOnboardingComplete, currentStudent, router, fetchStats]);

  if (!currentStudent) return null;

  return (
    <div className="pb-24 max-w-5xl mx-auto pt-4">
      <div className="mb-10 px-4">
        <h1 className="text-4xl sm:text-5xl font-black tracking-tight mb-3">
          Hi, {currentStudent.name}! 👋
        </h1>
        <p className="text-muted-foreground text-lg font-medium">
          Ready for your next adventure in English? Let&apos;s start!
        </p>
      </div>

      {/* Progress Overview Card */}
      <div className="px-4 mb-10">
        <div className="bg-primary/10 border border-primary/20 p-6 rounded-[2.5rem] flex flex-col sm:flex-row items-center justify-between gap-6 shadow-sm">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-full bg-white flex items-center justify-center shadow-md">
              <Star className="w-8 h-8 text-amber-400 fill-amber-400" />
            </div>
            <div>
              <h2 className="text-xl font-bold">Keep it up!</h2>
              <p className="text-primary font-medium text-sm">You are doing great at the {currentStudent.level} level.</p>
            </div>
          </div>
          <Link
            href="/speaking"
            className="flex items-center gap-2 bg-primary text-primary-foreground px-8 py-4 rounded-full font-bold w-full sm:w-auto justify-center hover:scale-105 transition-transform active:scale-95"
          >
            <Play className="w-5 h-5 fill-current" />
            Start Daily Lesson
          </Link>
        </div>
      </div>

      <div className="px-4 mb-6">
        <h2 className="text-2xl font-bold tracking-tight">Your Learning Path</h2>
      </div>

      {/* Modules List */}
      <div className="px-4 flex flex-col gap-6">
        {loading && <p className="text-center text-muted-foreground">Loading learning path...</p>}
        {modules.map((module, index) => {
          const Icon = getIcon(module.iconName);
          const isFirst = index === 0;

          return (
            <div
              key={module.id}
              className={`bg-white p-6 sm:p-8 rounded-[2.5rem] border border-border/50 shadow-sm transition-all relative overflow-hidden group ${isFirst ? 'ring-2 ring-primary border-transparent' : ''}`}
            >
              {isFirst && (
                <div className="absolute top-0 right-0 bg-primary text-primary-foreground text-xs font-bold px-4 py-1 rounded-bl-xl">
                  Current
                </div>
              )}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 relative z-10">
                <div className="flex items-start gap-6">
                  <div className={`w-16 h-16 rounded-2xl flex items-center justify-center shrink-0 shadow-sm ${isFirst ? 'bg-primary text-white' : 'bg-secondary text-primary'}`}>
                    <Icon className="w-8 h-8" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold mb-2">Module {module.orderIndex}: {module.title}</h3>
                    <p className="text-muted-foreground font-medium">{module.description}</p>
                    <div className="flex gap-2 mt-4">
                      <span className="text-xs font-bold bg-secondary px-3 py-1 rounded-full text-muted-foreground">
                        2 Lessons
                      </span>
                      <span className="text-xs font-bold bg-secondary px-3 py-1 rounded-full text-muted-foreground">
                        Vocabulary
                      </span>
                    </div>
                  </div>
                </div>

                <div className="flex gap-3 mt-4 sm:mt-0">
                   <Link
                      href="/speaking"
                      className={`flex items-center justify-center gap-2 px-6 py-4 rounded-2xl font-bold transition-all w-full sm:w-auto ${isFirst ? 'bg-primary text-primary-foreground shadow-md shadow-primary/20 hover:bg-primary/90' : 'bg-secondary text-foreground hover:bg-primary/10 hover:text-primary'}`}
                   >
                     Speak <ArrowRight className="w-4 h-4" />
                   </Link>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}