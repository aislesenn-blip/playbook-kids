"use client";
import { useAppStore } from '@/lib/store/app-store';
import { useRouter, useParams } from 'next/navigation';
import { Play, Lock, Star, ChevronRight, CheckCircle2 } from 'lucide-react';
import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';

export default function DashboardPage() {
  const { profile, episodes, dailyQuests } = useAppStore();
  const router = useRouter();
  const params = useParams();
  const locale = params.locale as string || 'en';
  const t = useTranslations('Dashboard');

  if (!profile) return null;

  const getDayLabel = (index: number) => {
    return `${t('day')} ${index + 1}`;
  };

  return (
    <div className="flex flex-col min-h-screen pb-24 md:pb-8 pt-8">
      {/* Premium Profile Header */}
      <div className="px-4 md:px-8 mb-8">
        <h1 className="text-3xl font-semibold tracking-tight text-zinc-900">
          {t('welcome')}, {profile.name}
        </h1>
        <p className="text-zinc-500 font-medium">{t('yourJourney', { language: profile.targetLanguage })}</p>
      </div>

      {/* Daily Quests - Gamification Card */}
      <div className="px-4 md:px-8 mb-10" data-tour="daily-quests">
        <div className="bg-white rounded-3xl p-6 border border-zinc-100 shadow-[0_4px_40px_rgba(0,0,0,0.02)]">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-zinc-900">{t('dailyQuests')}</h2>
          </div>
          <div className="space-y-4">
            {dailyQuests.map((quest) => (
              <div key={quest.id} className="flex items-center gap-4">
                <div className={`w-10 h-10 shrink-0 rounded-full flex items-center justify-center border-2 ${quest.isCompleted ? 'bg-[#DDA359] border-[#DDA359]' : 'border-zinc-200'}`}>
                  {quest.isCompleted ? <CheckCircle2 className="w-6 h-6 text-white" /> : <div className="w-2 h-2 rounded-full bg-zinc-200" />}
                </div>
                <div className="flex-1">
                  <div className="flex justify-between text-sm mb-1">
                    <span className="font-medium text-zinc-900">{quest.title}</span>
                    <span className="text-zinc-500 font-medium">{quest.progress}/{quest.target}</span>
                  </div>
                  <div className="h-2 w-full bg-zinc-100 rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${(quest.progress / quest.target) * 100}%` }}
                      className="h-full bg-[#DDA359] rounded-full"
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Horizontal Netflix-style Carousel for Episodes */}
      <div className="w-full relative" data-tour="episodes-carousel">
        <div className="px-4 md:px-8 mb-4 flex justify-between items-end">
          <h2 className="text-xl font-semibold text-zinc-900 tracking-tight">{t('curriculum')}</h2>
          <span className="text-sm font-medium text-zinc-500 cursor-pointer hover:text-zinc-900 transition-colors flex items-center gap-1">
            {t('viewAll')} <ChevronRight className="w-4 h-4" />
          </span>
        </div>

        {/* Scrollable Container */}
        <div className="flex overflow-x-auto gap-4 px-4 md:px-8 pb-8 snap-x snap-mandatory hide-scrollbar">
          {episodes.slice(0, 10).map((ep, index) => {
            const isNext = !ep.isCompleted && !ep.isLocked;
            return (
              <motion.div
                key={ep.id}
                whileTap={!ep.isLocked ? { scale: 0.98 } : {}}
                onClick={() => !ep.isLocked && router.push(`/${locale}/session/${ep.id}`)}
                className={`
                  snap-start shrink-0 w-[85vw] sm:w-[280px] md:w-[320px] h-[360px] md:h-[400px] rounded-3xl p-6 md:p-8 flex flex-col justify-between border relative overflow-hidden transition-all
                  ${ep.isLocked ? 'bg-zinc-50/80 border-zinc-200/60 cursor-not-allowed opacity-80' : 'bg-white border-zinc-200 cursor-pointer shadow-[0_8px_30px_rgba(0,0,0,0.04)] hover:shadow-[0_8px_30px_rgba(0,0,0,0.08)] hover:border-zinc-300'}
                  ${isNext ? 'ring-2 ring-zinc-900 ring-offset-4 ring-offset-[#F8F6F3]' : ''}
                `}
              >
                {/* Status Indicator */}
                <div className="flex justify-between items-start z-10">
                  <span className="text-xs font-semibold uppercase tracking-wider text-zinc-500 bg-zinc-100 px-3 py-1 rounded-full">
                    {getDayLabel(index)}
                  </span>
                  {ep.isLocked ? (
                    <div className="w-8 h-8 rounded-full bg-zinc-100 flex items-center justify-center">
                      <Lock className="w-4 h-4 text-zinc-400" />
                    </div>
                  ) : ep.isCompleted ? (
                    <div className="flex gap-0.5">
                       {[1, 2, 3].map((star) => (
                          <Star key={star} className={`w-5 h-5 ${star <= ep.stars ? 'text-[#DDA359] fill-current' : 'text-zinc-200'}`} />
                       ))}
                    </div>
                  ) : null}
                </div>

                {/* Content */}
                <div className="z-10 mt-auto">
                  <h3 className={`text-xl md:text-2xl font-semibold mb-2 leading-tight ${ep.isLocked ? 'text-zinc-400' : 'text-zinc-900'}`}>
                    {ep.title}
                  </h3>
                  <p className={`text-sm md:text-base font-medium line-clamp-2 ${ep.isLocked ? 'text-zinc-400' : 'text-zinc-500'}`}>
                    {ep.description}
                  </p>
                </div>

                {/* Action Button for Next Episode */}
                {isNext && (
                  <div className="mt-6 z-10">
                    <button className="w-full py-4 bg-zinc-900 text-white rounded-2xl font-medium flex items-center justify-center gap-2 hover:bg-zinc-800 transition-colors shadow-[0_4px_20px_rgba(0,0,0,0.1)]">
                      <Play className="w-5 h-5 fill-current" /> {t('start')}
                    </button>
                  </div>
                )}
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
