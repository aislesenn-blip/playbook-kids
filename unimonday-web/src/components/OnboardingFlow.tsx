"use client";

import { useState, useEffect } from "react";
import { useAppStore, Campus, UserRole } from "@/lib/store/app-store";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { MapPin, GraduationCap, Store } from "lucide-react";
import { useRouter } from "next/navigation";

const MOCK_CAMPUSES: Campus[] = [
  { id: "udsm-main", name: "UDSM Main Campus", city: "Dar es Salaam" },
  { id: "udom", name: "UDOM", city: "Dodoma" },
  { id: "sua", name: "SUA Main Campus", city: "Morogoro" },
  { id: "mzumba", name: "Mzumbe University", city: "Morogoro" },
];

export function OnboardingFlow() {
  const { isOnboardingComplete, setCampus, setUserRole, completeOnboarding } = useAppStore();
  const [open, setOpen] = useState(false);
  const [step, setStep] = useState<1 | 2>(1);
  const router = useRouter();

  useEffect(() => {
    // Show onboarding if not complete
    if (!isOnboardingComplete) {
      const timer = setTimeout(() => {
        setOpen(true);
      }, 100);
      return () => clearTimeout(timer);
    }
  }, [isOnboardingComplete]);

  const handleCampusSelect = (campus: Campus) => {
    setCampus(campus);
    setStep(2);
  };

  const handleRoleSelect = (role: UserRole) => {
    setUserRole(role);
    completeOnboarding();
    setOpen(false);

    if (role === 'vendor') {
      router.push('/vendor/dashboard');
    } else {
      router.push('/explore');
    }
  };

  return (
    <Dialog open={open} onOpenChange={() => {}}> {/* Prevent closing by clicking outside */}
      <DialogContent className="sm:max-w-[425px] p-0 overflow-hidden border-none rounded-[2rem] shadow-2xl">
        <div className="bg-primary p-6 text-primary-foreground text-center">
          <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center transform rotate-3 mx-auto mb-4 shadow-lg">
            <span className="text-primary font-black text-2xl leading-none">U</span>
          </div>
          <DialogTitle className="text-2xl font-black mb-1">
            {step === 1 ? "Select Your Campus" : "Who are you?"}
          </DialogTitle>
          <p className="text-primary-foreground/80 text-sm font-medium">
            {step === 1 ? "Where are you currently studying?" : "Choose how you want to use Unimonday."}
          </p>
        </div>

        <div className="p-6 bg-background">
          {step === 1 && (
            <div className="space-y-3">
              {MOCK_CAMPUSES.map((campus) => (
                <button
                  key={campus.id}
                  onClick={() => handleCampusSelect(campus)}
                  className="w-full flex items-center p-4 rounded-2xl border-2 border-transparent hover:border-primary/20 bg-secondary/50 hover:bg-secondary transition-all group text-left"
                >
                  <div className="w-10 h-10 rounded-full bg-background flex items-center justify-center mr-4 shadow-sm group-hover:scale-110 transition-transform">
                    <MapPin className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <div className="font-bold text-foreground">{campus.name}</div>
                    <div className="text-xs text-muted-foreground font-medium">{campus.city}</div>
                  </div>
                </button>
              ))}
            </div>
          )}

          {step === 2 && (
            <div className="space-y-4">
              <button
                onClick={() => handleRoleSelect('student')}
                className="w-full flex flex-col items-center justify-center p-6 rounded-3xl border-2 border-transparent hover:border-primary bg-secondary/50 hover:bg-primary/5 transition-all group relative overflow-hidden"
              >
                <div className="w-16 h-16 rounded-full bg-white flex items-center justify-center mb-4 shadow-md group-hover:scale-110 transition-transform shrink-0">
                  <GraduationCap className="w-8 h-8 text-primary" />
                </div>
                <div className="font-bold text-lg mb-2">I am a Student</div>
                <div className="text-sm text-muted-foreground text-center leading-relaxed px-2">I want to order items, skip lines, and pay instantly.</div>
              </button>

              <button
                onClick={() => handleRoleSelect('vendor')}
                className="w-full flex flex-col items-center justify-center p-6 rounded-3xl border-2 border-transparent hover:border-primary bg-secondary/50 hover:bg-primary/5 transition-all group relative overflow-hidden"
              >
                <div className="w-16 h-16 rounded-full bg-white flex items-center justify-center mb-4 shadow-md group-hover:scale-110 transition-transform shrink-0">
                  <Store className="w-8 h-8 text-primary" />
                </div>
                <div className="font-bold text-lg mb-2">I am a Vendor</div>
                <div className="text-sm text-muted-foreground text-center leading-relaxed px-2">I want to manage my shop, receive orders, and get paid.</div>
              </button>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
