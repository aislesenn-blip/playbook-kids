"use client";

import { useTranslations } from "next-intl";
import Image from "next/image";
import { ArrowRight, Zap, ShieldCheck, Clock, MapPin, ShoppingBag } from "lucide-react";
import { useAppStore, Campus } from "@/lib/store/app-store";
import { useRouter } from "next/navigation";

export default function Home() {
  const t = useTranslations("Hero");
  const { currentCampus, userRole, setCampus, setUserRole } = useAppStore();
  const router = useRouter();

  const handleStart = () => {
    if (!currentCampus || !userRole) {
      // Re-trigger onboarding by resetting
      setCampus(null as unknown as Campus); // hack to satisfy type while resetting
      setUserRole(null);
      // Wait for re-render to open modal
      setTimeout(() => {
        window.location.reload();
      }, 100);
    } else if (userRole === 'vendor') {
      router.push('/vendor/dashboard');
    } else {
      router.push('/explore');
    }
  };

  return (
    <div className="flex flex-col min-h-[calc(100vh-4rem)]">
      {/* Hero Section */}
      <section className="flex-1 flex flex-col items-center justify-center text-center px-4 py-12 sm:py-24">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary mb-8 font-semibold text-sm animate-in fade-in slide-in-from-bottom-4 duration-700">
          <Zap className="w-4 h-4 fill-primary" />
          <span>The Next Generation of Ordering</span>
        </div>

        <h1 className="text-5xl sm:text-6xl md:text-8xl font-black tracking-tight text-foreground max-w-4xl mb-6 leading-[1.1] animate-in fade-in slide-in-from-bottom-6 duration-700 delay-100">
          {t("title")} <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-primary/60">
            {t("subtitle")}
          </span>
        </h1>

        <p className="text-lg sm:text-2xl text-muted-foreground max-w-2xl mb-12 leading-relaxed font-medium animate-in fade-in slide-in-from-bottom-8 duration-700 delay-200">
          {t("description")}
        </p>

        <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto animate-in fade-in slide-in-from-bottom-10 duration-700 delay-300">
          <button
            onClick={handleStart}
            className="inline-flex items-center justify-center gap-2 bg-primary text-primary-foreground px-8 py-5 rounded-[2rem] font-bold text-lg hover:bg-primary/90 hover:scale-[1.02] transition-all active:scale-95 shadow-xl shadow-primary/25"
          >
            Get Started
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>
      </section>

      {/* Visual App Demo / Lifestyle Section */}
      <section className="relative w-full max-w-5xl mx-auto h-[50vh] min-h-[400px] rounded-[3rem] overflow-hidden mb-24 shadow-2xl">
         <Image
          src="https://images.unsplash.com/photo-1504674900247-0877df9cc836?q=80&w=2070&auto=format&fit=crop"
          alt="Delicious campus food"
          fill
          className="object-cover transition-transform hover:scale-105 duration-1000"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex flex-col justify-end p-10 sm:p-16">
          <div className="flex items-center gap-3 mb-4">
            <div className="bg-white/20 backdrop-blur-md px-4 py-2 rounded-full text-white text-sm font-semibold flex items-center gap-2">
               <MapPin className="w-4 h-4" /> Campus View
            </div>
            <div className="bg-primary px-4 py-2 rounded-full text-primary-foreground text-sm font-bold flex items-center gap-2">
               <Clock className="w-4 h-4" /> 2 Min Pickup
            </div>
          </div>
          <h2 className="text-white text-4xl sm:text-5xl font-black mb-2 tracking-tight">Order from anywhere.</h2>
          <p className="text-white/80 text-xl font-medium max-w-lg">Walk past the line. Show your live ticket. Grab your items.</p>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-8 mb-24 max-w-5xl mx-auto px-4 w-full">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="flex flex-col p-8 rounded-[2.5rem] bg-secondary/50 border border-border/50 hover:bg-secondary transition-colors group">
            <div className="w-16 h-16 bg-white text-foreground rounded-full flex items-center justify-center shadow-sm mb-6 group-hover:scale-110 transition-transform">
              <Zap className="w-8 h-8 text-primary" />
            </div>
            <h3 className="text-2xl font-bold mb-3">Instant Pay</h3>
            <p className="text-muted-foreground font-medium leading-relaxed">Pay securely via local mobile money in seconds. No fumbling for cash or waiting for change.</p>
          </div>
          <div className="flex flex-col p-8 rounded-[2.5rem] bg-secondary/50 border border-border/50 hover:bg-secondary transition-colors group">
            <div className="w-16 h-16 bg-white text-foreground rounded-full flex items-center justify-center shadow-sm mb-6 group-hover:scale-110 transition-transform">
              <ShieldCheck className="w-8 h-8 text-primary" />
            </div>
            <h3 className="text-2xl font-bold mb-3">Anti-Screenshot</h3>
            <p className="text-muted-foreground font-medium leading-relaxed">Our 10-second live digital tickets change color dynamically. Screenshots don&apos;t work here.</p>
          </div>
          <div className="flex flex-col p-8 rounded-[2.5rem] bg-secondary/50 border border-border/50 hover:bg-secondary transition-colors group">
            <div className="w-16 h-16 bg-white text-foreground rounded-full flex items-center justify-center shadow-sm mb-6 group-hover:scale-110 transition-transform">
              <ShoppingBag className="w-8 h-8 text-primary" />
            </div>
            <h3 className="text-2xl font-bold mb-3">Skip the Line</h3>
            <p className="text-muted-foreground font-medium leading-relaxed">Walk straight to the collection counter. Your time is for studying and socializing, not queuing.</p>
          </div>
        </div>
      </section>
    </div>
  );
}
