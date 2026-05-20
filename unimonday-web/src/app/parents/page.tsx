"use client";

import { motion } from "framer-motion";
import { TrendingUp, Clock, Star, Trophy, Plus, Settings } from "lucide-react";
import Image from "next/image";
import { mockLearner } from "@/lib/mockData";

export default function ParentsDashboard() {
  return (
    <div className="w-full max-w-6xl mx-auto py-8 sm:py-12 flex flex-col gap-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-4xl font-black tracking-tight">Parent Dashboard</h1>
          <p className="text-foreground/70 font-medium text-lg">Track progress and manage your family&apos;s learning.</p>
        </div>
        <div className="flex gap-3">
          <button className="p-3 bg-card rounded-2xl border-2 border-primary/20 hover:bg-primary/5 transition-colors">
            <Settings className="w-6 h-6" />
          </button>
          <button className="flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-2xl font-bold hover:scale-105 transition-transform">
            <Plus className="w-5 h-5" /> Add Learner
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column: Learner Profiles */}
        <div className="lg:col-span-1 space-y-6">
          <h2 className="text-2xl font-black">Learners</h2>

          <motion.div whileHover={{ y: -4 }} className="bg-card p-6 rounded-[2rem] border-2 border-primary shadow-lg cursor-pointer">
            <div className="flex items-center gap-4 mb-6">
              <div className="relative w-16 h-16 rounded-2xl overflow-hidden border-2 border-primary/20">
                <Image
                  src={mockLearner.avatarUrl || ''}
                  alt={mockLearner.name}
                  fill
                  className="object-cover"
                />
              </div>
              <div>
                <h3 className="text-xl font-bold">{mockLearner.name}</h3>
                <p className="text-primary font-bold text-sm">Age {mockLearner.age} • {mockLearner.level}</p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="bg-background rounded-xl p-3 border border-border">
                <div className="flex items-center gap-2 text-foreground/70 mb-1">
                  <Star className="w-4 h-4" /> <span className="text-xs font-bold uppercase tracking-wider">Points</span>
                </div>
                <p className="font-black text-xl">{mockLearner.totalPoints}</p>
              </div>
              <div className="bg-background rounded-xl p-3 border border-border">
                <div className="flex items-center gap-2 text-foreground/70 mb-1">
                  <Trophy className="w-4 h-4 text-orange-500" /> <span className="text-xs font-bold uppercase tracking-wider">Streak</span>
                </div>
                <p className="font-black text-xl">{mockLearner.currentStreak} Days</p>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Right Column: Reports & Insights */}
        <div className="lg:col-span-2 space-y-6">
          <h2 className="text-2xl font-black">Weekly Insights for {mockLearner.name}</h2>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
             <div className="bg-card p-6 rounded-[2rem] shadow-sm border border-border">
                <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-xl flex items-center justify-center mb-4">
                  <Clock className="w-6 h-6" />
                </div>
                <p className="text-foreground/70 font-medium text-sm mb-1">Time Speaking</p>
                <h3 className="text-3xl font-black">45<span className="text-lg text-foreground/50 ml-1">min</span></h3>
             </div>

             <div className="bg-card p-6 rounded-[2rem] shadow-sm border border-border">
                <div className="w-12 h-12 bg-green-100 text-green-600 rounded-xl flex items-center justify-center mb-4">
                  <TrendingUp className="w-6 h-6" />
                </div>
                <p className="text-foreground/70 font-medium text-sm mb-1">New Words</p>
                <h3 className="text-3xl font-black">12</h3>
             </div>

             <div className="bg-card p-6 rounded-[2rem] shadow-sm border border-border">
                <div className="w-12 h-12 bg-purple-100 text-purple-600 rounded-xl flex items-center justify-center mb-4">
                  <Star className="w-6 h-6" />
                </div>
                <p className="text-foreground/70 font-medium text-sm mb-1">Pronunciation</p>
                <h3 className="text-3xl font-black">92<span className="text-lg text-foreground/50 ml-1">%</span></h3>
             </div>
          </div>

          {/* Activity Graph / Details Placeholder */}
          <div className="bg-card p-8 rounded-[2rem] shadow-sm border border-border min-h-[300px] flex flex-col justify-center items-center text-center">
            <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mb-4">
              <TrendingUp className="w-10 h-10 text-primary" />
            </div>
            <h3 className="text-2xl font-bold mb-2">Great Progress!</h3>
            <p className="text-foreground/70 font-medium max-w-md">
              {mockLearner.name} has been very active this week, completing 3 missions and maintaining a 5-day speaking streak.
            </p>
            <button className="mt-6 px-6 py-3 bg-primary/10 text-primary font-bold rounded-xl hover:bg-primary/20 transition-colors">
              View Detailed Report
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
