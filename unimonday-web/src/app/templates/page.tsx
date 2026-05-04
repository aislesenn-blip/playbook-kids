"use client";

import { documentTemplates } from "@/lib/mockData";
import { FileText, BookOpen, Briefcase, PieChart, ArrowRight } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";

const iconMap: Record<string, React.ReactNode> = {
  "FileText": <FileText className="w-8 h-8" />,
  "BookOpen": <BookOpen className="w-8 h-8" />,
  "Briefcase": <Briefcase className="w-8 h-8" />,
  "PieChart": <PieChart className="w-8 h-8" />
};

export default function TemplatesPage() {
  return (
    <div className="min-h-screen bg-gray-50/50 pb-24 pt-24 px-4 sm:px-6">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-black mb-4">Document Templates</h1>
          <p className="text-muted-foreground font-medium max-w-2xl mx-auto text-lg">
            Choose a format. Drop your messy text. Let AI structure it perfectly.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {documentTemplates.map((tpl, idx) => (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              key={tpl.id}
            >
              <Link href="/workspace" className="block h-full">
                <div className="bg-white rounded-3xl p-6 border border-border shadow-sm hover:shadow-md transition-all hover:-translate-y-1 h-full flex flex-col cursor-pointer">
                  <div className={`w-16 h-16 rounded-2xl flex items-center justify-center mb-6
                    ${tpl.color === 'blue' ? 'bg-blue-50 text-blue-500' : ''}
                    ${tpl.color === 'emerald' ? 'bg-emerald-50 text-emerald-500' : ''}
                    ${tpl.color === 'purple' ? 'bg-purple-50 text-purple-500' : ''}
                    ${tpl.color === 'amber' ? 'bg-amber-50 text-amber-500' : ''}
                  `}>
                    {iconMap[tpl.icon || "FileText"] || <FileText className="w-8 h-8" />}
                  </div>
                  <h3 className="font-bold text-xl mb-2">{tpl.title}</h3>
                  <p className="text-muted-foreground text-sm flex-1">{tpl.description}</p>
                  <div className="mt-6 flex items-center text-primary font-bold text-sm">
                    Use Template <ArrowRight className="w-4 h-4 ml-1" />
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
