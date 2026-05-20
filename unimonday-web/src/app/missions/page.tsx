"use client";

import { motion } from "framer-motion";
import { Star, Lock, PlayCircle, CheckCircle2 } from "lucide-react";
import Image from "next/image";
import { mockSeasons, mockEpisodes } from "@/lib/mockData";

export default function MissionsPage() {
  const activeSeason = mockSeasons[0];

  return (
    <div className="w-full max-w-5xl mx-auto py-8 sm:py-12 flex flex-col gap-12">
      {/* Header */}
      <div className="text-center space-y-4">
        <h1 className="text-4xl sm:text-5xl font-black tracking-tight">Your Adventures</h1>
        <p className="text-xl text-foreground/70 font-medium">Complete missions to unlock new seasons and stories!</p>
      </div>

      {/* Active Season Hero */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative bg-card rounded-[3rem] overflow-hidden border-4 border-primary shadow-xl group"
      >
        <div className="absolute inset-0 bg-black/40 z-10" />
        <div className="absolute inset-0 z-0">
          <Image
            src={activeSeason.coverImage || ''}
            alt={activeSeason.title}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-700"
          />
        </div>

        <div className="relative z-20 p-8 sm:p-12 flex flex-col items-center text-center h-[300px] justify-center">
          <span className="bg-primary text-primary-foreground px-4 py-1.5 rounded-full font-bold text-sm tracking-widest uppercase mb-4">
            Current Season
          </span>
          <h2 className="text-4xl sm:text-5xl font-black text-white mb-4 drop-shadow-lg">{activeSeason.title}</h2>
          <p className="text-white/90 text-lg sm:text-xl font-medium max-w-2xl drop-shadow-md">
            {activeSeason.description}
          </p>
        </div>
      </motion.div>

      {/* Path / Episodes */}
      <div className="relative">
        <div className="absolute left-8 top-10 bottom-10 w-2 bg-primary/20 rounded-full sm:left-1/2 sm:-ml-1" />

        <div className="space-y-8 relative">
          {mockEpisodes.map((episode, index) => {
            const isLeft = index % 2 === 0;
            return (
              <motion.div
                key={episode.id}
                initial={{ opacity: 0, x: isLeft ? -20 : 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className={`flex items-center gap-6 sm:gap-0 sm:justify-between relative ${isLeft ? 'sm:flex-row' : 'sm:flex-row-reverse'}`}
              >
                <div className="hidden sm:block sm:w-5/12" />

                {/* Center Node */}
                <div className="relative z-10 flex flex-col items-center justify-center sm:w-2/12 shrink-0">
                  <div className={`w-16 h-16 rounded-full border-4 flex items-center justify-center bg-card shadow-lg ${episode.isCompleted ? 'border-primary' : 'border-primary/30'}`}>
                    {episode.isCompleted ? (
                      <CheckCircle2 className="w-8 h-8 text-primary" />
                    ) : (
                      <Lock className="w-6 h-6 text-foreground/40" />
                    )}
                  </div>
                </div>

                {/* Content Card */}
                <div className="w-full sm:w-5/12">
                  <div className={`p-6 rounded-[2rem] border-2 shadow-md transition-transform hover:-translate-y-1 ${episode.isCompleted ? 'bg-card border-primary' : 'bg-card/50 border-border opacity-70'}`}>
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="font-bold text-xl">{episode.title}</h3>
                      {episode.score && (
                        <div className="flex items-center gap-1 bg-yellow-400 text-yellow-900 px-2 py-1 rounded-lg text-sm font-bold">
                          <Star className="w-4 h-4 fill-yellow-900" /> {episode.score}
                        </div>
                      )}
                    </div>
                    <p className="text-foreground/70 font-medium mb-4">{episode.description}</p>

                    <button
                      className={`w-full py-3 rounded-xl font-bold flex items-center justify-center gap-2 transition-colors ${
                        episode.isCompleted
                          ? 'bg-primary/10 text-primary hover:bg-primary/20'
                          : 'bg-primary text-primary-foreground hover:bg-primary/90'
                      }`}
                    >
                      <PlayCircle className="w-5 h-5" />
                      {episode.isCompleted ? 'Replay Mission' : 'Start Mission'}
                    </button>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
