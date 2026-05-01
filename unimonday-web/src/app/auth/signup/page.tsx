"use client";

import { useState } from "react";
import { useStudentStore, LearningLevel } from "@/lib/store/student-store";
import { User, BookOpen, Star, Sparkles, UserPlus, ArrowRight, ShieldCheck } from "lucide-react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";

const LEVELS: { id: LearningLevel; title: string; desc: string; icon: React.ElementType }[] = [
  { id: "First Words", title: "First Words", desc: "Alphabet, animals, colors", icon: Star },
  { id: "Sentences", title: "Sentences", desc: "Basic grammar and phrasing", icon: BookOpen },
  { id: "Advanced", title: "Advanced", desc: "Reading and storytelling", icon: Sparkles },
];

export default function SignupPage() {
  const { enrollStudent } = useStudentStore();
  const router = useRouter();

  const [step, setStep] = useState<1 | 2>(1);
  const [parentName, setParentName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [studentName, setStudentName] = useState("");
  const [selectedLevel, setSelectedLevel] = useState<LearningLevel | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleParentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (parentName.trim().length > 1 && email.includes("@") && password.length >= 6) {
      setStep(2);
    }
  };

  const handleChildSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (studentName.trim().length > 1 && selectedLevel) {
      setIsLoading(true);
      await enrollStudent(parentName, studentName, selectedLevel);
      router.push('/home');
    }
  };

  return (
    <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md bg-white/60 backdrop-blur-xl border border-white/40 shadow-2xl rounded-[2.5rem] overflow-hidden"
      >
        <div className="bg-primary/10 p-8 text-center border-b border-primary/10 relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-primary/20 to-transparent opacity-50" />
          <div className="relative z-10">
            <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg transform rotate-3">
              <ShieldCheck className="w-8 h-8 text-primary" />
            </div>
            <h1 className="text-3xl font-black text-foreground mb-2 tracking-tight">
              {step === 1 ? "Parent Registration" : "Child Profile"}
            </h1>
            <p className="text-muted-foreground font-medium">
              {step === 1 ? "Create a secure account to track progress." : "Tell us about your little learner."}
            </p>
          </div>
        </div>

        <div className="p-8">
          {step === 1 && (
            <motion.form
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              onSubmit={handleParentSubmit}
              className="space-y-5"
            >
              <div>
                <label className="block text-sm font-bold text-foreground mb-2">Parent&apos;s Name</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
                    <User className="w-5 h-5 text-muted-foreground" />
                  </div>
                  <input
                    type="text"
                    value={parentName}
                    onChange={(e) => setParentName(e.target.value)}
                    placeholder="John Doe"
                    className="w-full pl-12 pr-4 py-4 rounded-2xl bg-secondary/50 border-2 border-transparent focus:border-primary focus:bg-white outline-none transition-all font-semibold text-lg"
                    required
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-bold text-foreground mb-2">Email Address</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="john@example.com"
                  className="w-full px-4 py-4 rounded-2xl bg-secondary/50 border-2 border-transparent focus:border-primary focus:bg-white outline-none transition-all font-semibold text-lg"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-bold text-foreground mb-2">Password</label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Min 6 characters"
                  className="w-full px-4 py-4 rounded-2xl bg-secondary/50 border-2 border-transparent focus:border-primary focus:bg-white outline-none transition-all font-semibold text-lg"
                  required
                  minLength={6}
                />
              </div>

              <button
                type="submit"
                disabled={parentName.trim().length < 2 || !email.includes("@") || password.length < 6}
                className="w-full mt-4 py-4 rounded-2xl bg-primary text-primary-foreground font-bold text-lg hover:bg-primary/90 transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-xl shadow-primary/20 flex items-center justify-center gap-2 group"
              >
                Continue Setup
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>

              <div className="text-center mt-6">
                <p className="text-sm text-muted-foreground font-medium">
                  Already have an account? <Link href="/" className="text-primary font-bold hover:underline">Log in</Link>
                </p>
              </div>
            </motion.form>
          )}

          {step === 2 && (
            <motion.form
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              onSubmit={handleChildSubmit}
              className="space-y-6"
            >
              <div>
                <label className="block text-sm font-bold text-foreground mb-2">Child&apos;s First Name</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
                    <UserPlus className="w-5 h-5 text-muted-foreground" />
                  </div>
                  <input
                    type="text"
                    value={studentName}
                    onChange={(e) => setStudentName(e.target.value)}
                    placeholder="Emma"
                    className="w-full pl-12 pr-4 py-4 rounded-2xl bg-secondary/50 border-2 border-transparent focus:border-primary focus:bg-white outline-none transition-all font-semibold text-lg"
                    required
                    autoFocus
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-bold text-foreground mb-3">Select Starting Level</label>
                <div className="space-y-3">
                  {LEVELS.map((level) => (
                    <button
                      key={level.id}
                      type="button"
                      onClick={() => setSelectedLevel(level.id)}
                      className={`w-full flex items-center p-4 rounded-2xl border-2 transition-all group text-left ${
                        selectedLevel === level.id
                          ? 'border-primary bg-primary/5 shadow-md'
                          : 'border-transparent hover:border-primary/20 bg-secondary/50 hover:bg-secondary'
                      }`}
                    >
                      <div className={`w-12 h-12 rounded-full flex items-center justify-center mr-4 shadow-sm transition-transform ${
                        selectedLevel === level.id ? 'bg-primary text-white scale-110' : 'bg-white text-primary group-hover:scale-110'
                      }`}>
                        <level.icon className="w-6 h-6" />
                      </div>
                      <div>
                        <div className="font-bold text-foreground text-lg">{level.title}</div>
                        <div className="text-sm text-muted-foreground font-medium">{level.desc}</div>
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              <div className="flex gap-3 pt-4">
                <button
                  type="button"
                  onClick={() => setStep(1)}
                  className="w-1/3 py-4 rounded-2xl bg-secondary text-foreground font-bold text-lg hover:bg-secondary/80 transition-all"
                >
                  Back
                </button>
                <button
                  type="submit"
                  disabled={studentName.trim().length < 2 || !selectedLevel || isLoading}
                  className="w-2/3 py-4 rounded-2xl bg-primary text-primary-foreground font-bold text-lg hover:bg-primary/90 transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-xl shadow-primary/20 flex items-center justify-center gap-2"
                >
                  {isLoading ? 'Creating...' : 'Enroll Student'}
                  {!isLoading && <Sparkles className="w-5 h-5" />}
                </button>
              </div>
            </motion.form>
          )}
        </div>
      </motion.div>
    </div>
  );
}
