"use client";

import { useState, useEffect } from "react";
import { useStudentStore, LearningLevel } from "@/lib/store/student-store";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { User, BookOpen, Star, Sparkles } from "lucide-react";
import { useRouter } from "next/navigation";

const LEVELS: { id: LearningLevel; title: string; desc: string; icon: React.ElementType }[] = [
  { id: "First Words", title: "First Words", desc: "Alphabet, animals, colors", icon: Star },
  { id: "Sentences", title: "Sentences", desc: "Basic grammar and phrasing", icon: BookOpen },
  { id: "Advanced", title: "Advanced", desc: "Reading and storytelling", icon: Sparkles },
];

export function OnboardingFlow() {
  const { isOnboardingComplete, enrollStudent } = useStudentStore();
  const [open, setOpen] = useState(false);
  const [step, setStep] = useState<1 | 2>(1);
  const [studentName, setStudentName] = useState("");
  const router = useRouter();

  useEffect(() => {
    if (!isOnboardingComplete) {
      const timer = setTimeout(() => {
        setOpen(true);
      }, 100);
      return () => clearTimeout(timer);
    }
  }, [isOnboardingComplete]);

  const handleNameSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (studentName.trim().length > 1) {
      setStep(2);
    }
  };

  const handleLevelSelect = (level: LearningLevel) => {
    enrollStudent(studentName, level);
    setOpen(false);
    router.push('/home');
  };

  return (
    <Dialog open={open} onOpenChange={() => {}}>
      <DialogContent className="sm:max-w-[425px] p-0 overflow-hidden border-none rounded-[2rem] shadow-2xl">
        <div className="bg-primary p-6 text-primary-foreground text-center">
          <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center mx-auto mb-4 shadow-lg transform rotate-3">
            <BookOpen className="w-6 h-6 text-primary" />
          </div>
          <DialogTitle className="text-2xl font-black mb-1">
            {step === 1 ? "Student Enrollment" : "Select Starting Level"}
          </DialogTitle>
          <p className="text-primary-foreground/80 text-sm font-medium">
            {step === 1 ? "What is your child's name?" : "Where should they begin their journey?"}
          </p>
        </div>

        <div className="p-6 bg-background">
          {step === 1 && (
            <form onSubmit={handleNameSubmit} className="space-y-4">
              <div className="relative">
                <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
                  <User className="w-5 h-5 text-muted-foreground" />
                </div>
                <input
                  type="text"
                  value={studentName}
                  onChange={(e) => setStudentName(e.target.value)}
                  placeholder="Child's first name"
                  className="w-full pl-12 pr-4 py-4 rounded-2xl bg-secondary/50 border-2 border-transparent focus:border-primary focus:bg-background outline-none transition-all font-bold text-lg"
                  autoFocus
                />
              </div>
              <button
                type="submit"
                disabled={studentName.trim().length < 2}
                className="w-full py-4 rounded-2xl bg-primary text-primary-foreground font-bold text-lg hover:bg-primary/90 transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-md shadow-primary/20"
              >
                Continue
              </button>
            </form>
          )}

          {step === 2 && (
            <div className="space-y-3">
              {LEVELS.map((level) => (
                <button
                  key={level.id}
                  onClick={() => handleLevelSelect(level.id)}
                  className="w-full flex items-center p-4 rounded-2xl border-2 border-transparent hover:border-primary/20 bg-secondary/50 hover:bg-secondary transition-all group text-left"
                >
                  <div className="w-12 h-12 rounded-full bg-background flex items-center justify-center mr-4 shadow-sm group-hover:scale-110 transition-transform">
                    <level.icon className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <div className="font-bold text-foreground text-lg">{level.title}</div>
                    <div className="text-sm text-muted-foreground font-medium">{level.desc}</div>
                  </div>
                </button>
              ))}
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}