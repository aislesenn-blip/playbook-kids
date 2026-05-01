"use client";

import Image from "next/image";
import { ArrowRight, BookOpen, Mic, PenTool, LayoutDashboard } from "lucide-react";
import { useStudentStore } from "@/lib/store/student-store";
import { useRouter } from "next/navigation";

export default function Home() {
  const { currentStudent, isOnboardingComplete } = useStudentStore();
  const router = useRouter();

  const handleStart = () => {
    if (!isOnboardingComplete || !currentStudent) {
      // Allow OnboardingFlow to naturally open by clearing state or just relying on its logic
      // In this version, OnboardingFlow opens if isOnboardingComplete is false
      // So if they click start and it's not complete, we can just ensure the store is reset to trigger it
      useStudentStore.getState().resetApp();
      setTimeout(() => {
        window.location.reload();
      }, 100);
    } else {
      router.push('/home');
    }
  };

  return (
    <div className="flex flex-col min-h-[calc(100vh-4rem)]">
      {/* Hero Section */}
      <section className="flex-1 flex flex-col items-center justify-center text-center px-4 py-12 sm:py-24">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary mb-8 font-semibold text-sm animate-in fade-in slide-in-from-bottom-4 duration-700">
          <BookOpen className="w-4 h-4 text-primary" />
          <span>The Premier Nursery University</span>
        </div>

        <h1 className="text-5xl sm:text-6xl md:text-8xl font-black tracking-tight text-foreground max-w-4xl mb-6 leading-[1.1] animate-in fade-in slide-in-from-bottom-6 duration-700 delay-100">
          Early English <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-primary/60">
            Mastery
          </span>
        </h1>

        <p className="text-lg sm:text-2xl text-muted-foreground max-w-2xl mb-12 leading-relaxed font-medium animate-in fade-in slide-in-from-bottom-8 duration-700 delay-200">
          A scientifically designed, interactive learning path for nursery students to master English speaking and writing.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto animate-in fade-in slide-in-from-bottom-10 duration-700 delay-300">
          <button
            onClick={handleStart}
            className="inline-flex items-center justify-center gap-2 bg-primary text-primary-foreground px-8 py-5 rounded-[2rem] font-bold text-lg hover:bg-primary/90 hover:scale-[1.02] transition-all active:scale-95 shadow-xl shadow-primary/25"
          >
            Enroll Now
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>
      </section>

      {/* Visual Learning Demo / Lifestyle Section */}
      <section className="relative w-full max-w-5xl mx-auto h-[50vh] min-h-[400px] rounded-[3rem] overflow-hidden mb-24 shadow-2xl">
         <Image
          src="https://images.unsplash.com/photo-1503676260728-1c00da094a0b?q=80&w=2022&auto=format&fit=crop"
          alt="Child learning happily"
          fill
          className="object-cover transition-transform hover:scale-105 duration-1000"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex flex-col justify-end p-10 sm:p-16">
          <div className="flex items-center gap-3 mb-4">
            <div className="bg-white/20 backdrop-blur-md px-4 py-2 rounded-full text-white text-sm font-semibold flex items-center gap-2">
               <Mic className="w-4 h-4" /> Speaking Lab
            </div>
            <div className="bg-primary px-4 py-2 rounded-full text-primary-foreground text-sm font-bold flex items-center gap-2">
               <BookOpen className="w-4 h-4" /> Module 1
            </div>
          </div>
          <h2 className="text-white text-4xl sm:text-5xl font-black mb-2 tracking-tight">Learn with confidence.</h2>
          <p className="text-white/80 text-xl font-medium max-w-lg">Interactive voice recognition and guided writing exercises for rapid progress.</p>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-8 mb-24 max-w-5xl mx-auto px-4 w-full">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="flex flex-col p-8 rounded-[2.5rem] bg-secondary/50 border border-border/50 hover:bg-secondary transition-colors group">
            <div className="w-16 h-16 bg-white text-foreground rounded-full flex items-center justify-center shadow-sm mb-6 group-hover:scale-110 transition-transform">
              <Mic className="w-8 h-8 text-primary" />
            </div>
            <h3 className="text-2xl font-bold mb-3">Interactive Speaking</h3>
            <p className="text-muted-foreground font-medium leading-relaxed">Our advanced system listens and provides immediate, encouraging feedback to perfect pronunciation.</p>
          </div>
          <div className="flex flex-col p-8 rounded-[2.5rem] bg-secondary/50 border border-border/50 hover:bg-secondary transition-colors group">
            <div className="w-16 h-16 bg-white text-foreground rounded-full flex items-center justify-center shadow-sm mb-6 group-hover:scale-110 transition-transform">
              <PenTool className="w-8 h-8 text-primary" />
            </div>
            <h3 className="text-2xl font-bold mb-3">Guided Writing</h3>
            <p className="text-muted-foreground font-medium leading-relaxed">Step-by-step spelling and writing challenges ensure your child masters vocabulary visually and actively.</p>
          </div>
          <div className="flex flex-col p-8 rounded-[2.5rem] bg-secondary/50 border border-border/50 hover:bg-secondary transition-colors group">
            <div className="w-16 h-16 bg-white text-foreground rounded-full flex items-center justify-center shadow-sm mb-6 group-hover:scale-110 transition-transform">
              <LayoutDashboard className="w-8 h-8 text-primary" />
            </div>
            <h3 className="text-2xl font-bold mb-3">Parental Insights</h3>
            <p className="text-muted-foreground font-medium leading-relaxed">Track progress, see words mastered, and celebrate learning streaks in the real-time student profile.</p>
          </div>
        </div>
      </section>
    </div>
  );
}