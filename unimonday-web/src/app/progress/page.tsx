import { Target, TrendingUp } from "lucide-react";

export default function ProgressPage() {
  return (
    <div className="flex flex-col items-center justify-center h-[70vh] text-center px-4">
      <div className="w-24 h-24 bg-amber-50 text-amber-500 rounded-full flex items-center justify-center mb-6 border border-amber-100">
        <Target className="w-12 h-12" />
      </div>
      <h1 className="text-4xl font-black text-gray-900 mb-4">Spaced Repetition Stats</h1>
      <p className="text-lg text-muted-foreground max-w-md mb-8">
        Your weak spots are being tracked. Prepare for the Friday Active Recall test.
      </p>
      <div className="flex items-center gap-2 bg-gray-100 px-6 py-3 rounded-2xl text-gray-700 font-bold">
        <TrendingUp className="w-5 h-5 text-primary" /> Memory Retention: 85%
      </div>
    </div>
  );
}
