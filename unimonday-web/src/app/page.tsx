"use client";

import Image from "next/image";
import { ArrowRight, BookOpen, Mic, PenTool, LayoutDashboard, Star, CheckCircle } from "lucide-react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";

export default function Home() {
  const router = useRouter();

  const handleStart = () => {
    router.push('/auth/signup');
  };

  return (
    <div className="flex flex-col min-h-[calc(100vh-4rem)]">
      {/* Hero Section */}
      <section className="flex-1 flex flex-col items-center justify-center text-center px-4 py-16 sm:py-28 relative overflow-hidden">

        {/* Background Decorative Blur */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/5 rounded-full blur-[100px] -z-10 pointer-events-none" />

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-primary/10 text-primary mb-8 font-bold text-sm tracking-wide border border-primary/20 backdrop-blur-sm shadow-sm"
        >
          <Star className="w-4 h-4 fill-primary" />
          <span>The Multibillion-Dollar Nursery Standard</span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1, ease: "easeOut" }}
          className="text-5xl sm:text-7xl md:text-8xl font-black tracking-tight text-foreground max-w-5xl mb-6 leading-[1.05]"
        >
          Build a Lifetime of <br className="hidden sm:block" />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-emerald-400">
            Fluency Today.
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
          className="text-xl sm:text-2xl text-muted-foreground max-w-2xl mb-12 leading-relaxed font-medium"
        >
          A scientifically structured, immersive full-year curriculum designed to transform early childhood language acquisition.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
          className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto"
        >
          <button
            onClick={handleStart}
            className="group inline-flex items-center justify-center gap-3 bg-primary text-primary-foreground px-10 py-6 rounded-[2rem] font-bold text-xl hover:bg-primary/90 hover:scale-[1.02] transition-all active:scale-95 shadow-xl shadow-primary/25"
          >
            Create Parent Account
            <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
          </button>
        </motion.div>
      </section>

      {/* Visual Learning Demo / Lifestyle Section */}
      <motion.section
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1 }}
        className="relative w-full max-w-6xl mx-auto h-[60vh] min-h-[500px] rounded-[3rem] overflow-hidden mb-32 shadow-2xl border-8 border-white/50 backdrop-blur-md"
      >
         <Image
          src="https://images.unsplash.com/photo-1503676260728-1c00da094a0b?q=80&w=2022&auto=format&fit=crop"
          alt="Child learning happily with high quality materials"
          fill
          className="object-cover transition-transform hover:scale-105 duration-1000"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent flex flex-col justify-end p-10 sm:p-16">
          <div className="flex flex-wrap items-center gap-3 mb-6">
            <div className="bg-white/20 backdrop-blur-md px-5 py-2.5 rounded-full text-white text-sm font-bold flex items-center gap-2 border border-white/30">
               <Mic className="w-4 h-4" /> AI Voice Recognition
            </div>
            <div className="bg-primary/90 backdrop-blur-md px-5 py-2.5 rounded-full text-primary-foreground text-sm font-bold flex items-center gap-2 shadow-lg">
               <BookOpen className="w-4 h-4" /> Full-Year Curriculum
            </div>
          </div>
          <h2 className="text-white text-5xl sm:text-6xl font-black mb-4 tracking-tight leading-tight">Elite Education,<br/>Delivered.</h2>
          <p className="text-white/80 text-xl sm:text-2xl font-medium max-w-2xl leading-relaxed">
            Real-time feedback, guided writing challenges, and structured modules ensure measurable progress every single week.
          </p>
        </div>
      </motion.section>

      {/* Testimonials Section */}
      <section className="py-16 mb-32 w-full bg-secondary/30 rounded-[4rem] px-4 sm:px-12 max-w-6xl mx-auto border border-white/50 shadow-inner">
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-black tracking-tight mb-4">Trusted by Parents</h2>
          <p className="text-xl text-muted-foreground font-medium max-w-2xl mx-auto">
            Join thousands of families experiencing the gold standard in early childhood language education.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-white p-8 sm:p-10 rounded-[2.5rem] shadow-xl shadow-black/5 border border-border/50 flex flex-col justify-between"
          >
            <div>
              <div className="flex gap-1 mb-6">
                {[1, 2, 3, 4, 5].map((i) => <Star key={i} className="w-6 h-6 fill-primary text-primary" />)}
              </div>
              <p className="text-xl font-medium leading-relaxed mb-8">
                &quot;We tried other apps, but they felt like games. Unimonday feels like an actual premium school. The structured curriculum and voice recognition have transformed my daughter&apos;s pronunciation in just two months.&quot;
              </p>
            </div>
            <div className="flex items-center gap-4">
              <div className="relative w-14 h-14 rounded-full overflow-hidden border-2 border-primary/20">
                <Image src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=200&auto=format&fit=crop" alt="Sarah Jenkins" fill className="object-cover" />
              </div>
              <div>
                <h4 className="font-bold text-lg">Sarah Jenkins</h4>
                <p className="text-sm text-muted-foreground font-medium">Mother of 4-year-old Emma</p>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="bg-white p-8 sm:p-10 rounded-[2.5rem] shadow-xl shadow-black/5 border border-border/50 flex flex-col justify-between"
          >
            <div>
              <div className="flex gap-1 mb-6">
                {[1, 2, 3, 4, 5].map((i) => <Star key={i} className="w-6 h-6 fill-primary text-primary" />)}
              </div>
              <p className="text-xl font-medium leading-relaxed mb-8">
                &quot;The parent dashboard is incredible. I can see exactly which words my son struggled with and where he excelled. It&apos;s a highly serious, beautifully designed tool for his future.&quot;
              </p>
            </div>
            <div className="flex items-center gap-4">
              <div className="relative w-14 h-14 rounded-full overflow-hidden border-2 border-primary/20">
                <Image src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=200&auto=format&fit=crop" alt="David Chen" fill className="object-cover" />
              </div>
              <div>
                <h4 className="font-bold text-lg">David Chen</h4>
                <p className="text-sm text-muted-foreground font-medium">Father of 5-year-old Leo</p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="pb-24 max-w-6xl mx-auto px-4 w-full">
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-black tracking-tight mb-4">The Complete Solution</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <motion.div
            whileHover={{ y: -10 }}
            className="flex flex-col p-10 rounded-[3rem] bg-white border border-border/50 shadow-lg group relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 p-6 opacity-5 group-hover:opacity-10 transition-opacity">
              <Mic className="w-32 h-32" />
            </div>
            <div className="w-16 h-16 bg-primary/10 text-primary rounded-2xl flex items-center justify-center mb-8 relative z-10">
              <Mic className="w-8 h-8" />
            </div>
            <h3 className="text-2xl font-black mb-4 relative z-10">Interactive Speaking</h3>
            <p className="text-muted-foreground font-medium leading-relaxed text-lg relative z-10">Advanced speech recognition listens and provides immediate, encouraging feedback to perfect pronunciation seamlessly.</p>
          </motion.div>

          <motion.div
            whileHover={{ y: -10 }}
            className="flex flex-col p-10 rounded-[3rem] bg-white border border-border/50 shadow-lg group relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 p-6 opacity-5 group-hover:opacity-10 transition-opacity">
              <PenTool className="w-32 h-32" />
            </div>
            <div className="w-16 h-16 bg-primary/10 text-primary rounded-2xl flex items-center justify-center mb-8 relative z-10">
              <PenTool className="w-8 h-8" />
            </div>
            <h3 className="text-2xl font-black mb-4 relative z-10">Guided Writing</h3>
            <p className="text-muted-foreground font-medium leading-relaxed text-lg relative z-10">Step-by-step spelling and writing challenges ensure your child masters vocabulary visually and actively.</p>
          </motion.div>

          <motion.div
            whileHover={{ y: -10 }}
            className="flex flex-col p-10 rounded-[3rem] bg-white border border-border/50 shadow-lg group relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 p-6 opacity-5 group-hover:opacity-10 transition-opacity">
              <LayoutDashboard className="w-32 h-32" />
            </div>
            <div className="w-16 h-16 bg-primary/10 text-primary rounded-2xl flex items-center justify-center mb-8 relative z-10">
              <LayoutDashboard className="w-8 h-8" />
            </div>
            <h3 className="text-2xl font-black mb-4 relative z-10">Parental Insights</h3>
            <p className="text-muted-foreground font-medium leading-relaxed text-lg relative z-10">Track progress, review mastered words, and manage the curriculum deeply through the dedicated parent dashboard.</p>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
