"use client";

import { LayoutTemplate, Search, Filter, ArrowRight, FileText, Columns } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";

export default function TemplatesPage() {
  const templates = [
    { id: 1, title: "APA Research Paper", category: "Academic", icon: FileText, desc: "Standard APA format with title page, abstract, and references." },
    { id: 2, title: "Official Leave Letter", category: "Letters", icon: FileText, desc: "Formal letter format for requesting absence from the Dean." },
    { id: 3, title: "Weekly Timetable", category: "Tables", icon: Columns, desc: "Clean 7-day grid format for class schedules." },
    { id: 4, title: "Budget Proposal", category: "Tables", icon: Columns, desc: "Financial table layout for student organization budgets." },
    { id: 5, title: "Lab Report (Chemistry)", category: "Academic", icon: FileText, desc: "Structured layout for methodology, results, and discussion." },
    { id: 6, title: "Sponsorship Request", category: "Letters", icon: FileText, desc: "Professional letter format for corporate sponsorship." },
  ];

  return (
    <div className="min-h-screen bg-gray-50 pt-20 pb-24">
      <div className="max-w-6xl mx-auto px-4 w-full">

        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-primary/10 text-primary rounded-full mb-6">
            <LayoutTemplate className="w-8 h-8" />
          </div>
          <h1 className="text-4xl md:text-5xl font-black tracking-tight mb-4 text-gray-900">
            Campus Formats Library
          </h1>
          <p className="text-xl text-muted-foreground font-medium max-w-2xl mx-auto">
            Choose a strict, predefined format. Provide your raw text to the engine and it will perfectly map it to the selected template.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 items-center justify-between mb-12">
           <div className="relative w-full sm:w-96">
              <Search className="w-5 h-5 text-gray-400 absolute left-4 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search templates (e.g. 'APA', 'Cover Page')..."
                className="w-full bg-white border border-gray-200 rounded-2xl pl-12 pr-4 py-4 focus:outline-none focus:ring-2 focus:ring-primary shadow-sm font-medium"
              />
           </div>
           <div className="flex gap-2 w-full sm:w-auto overflow-x-auto pb-2 sm:pb-0 hide-scrollbar">
             <button className="whitespace-nowrap px-6 py-3 bg-gray-900 text-white rounded-xl font-bold text-sm shadow-md">All Formats</button>
             <button className="whitespace-nowrap px-6 py-3 bg-white border border-gray-200 text-gray-700 hover:bg-gray-50 rounded-xl font-bold text-sm">Academic</button>
             <button className="whitespace-nowrap px-6 py-3 bg-white border border-gray-200 text-gray-700 hover:bg-gray-50 rounded-xl font-bold text-sm">Letters</button>
             <button className="whitespace-nowrap px-6 py-3 bg-white border border-gray-200 text-gray-700 hover:bg-gray-50 rounded-xl font-bold text-sm">Tables</button>
           </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {templates.map((template) => (
            <motion.div whileHover={{ y: -5 }} key={template.id} className="bg-white rounded-3xl p-6 border border-gray-200 shadow-sm hover:shadow-xl transition-all group flex flex-col">
              <div className="flex items-start justify-between mb-6">
                <div className="w-14 h-14 bg-gray-50 border border-gray-100 rounded-2xl flex items-center justify-center shrink-0">
                  <template.icon className="w-6 h-6 text-gray-700" />
                </div>
                <span className="bg-gray-100 text-gray-600 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">{template.category}</span>
              </div>

              <h3 className="text-xl font-black mb-2 text-gray-900">{template.title}</h3>
              <p className="text-gray-500 font-medium text-sm leading-relaxed mb-8 flex-grow">
                {template.desc}
              </p>

              <Link href="/workspace" className="w-full bg-gray-50 hover:bg-gray-100 text-gray-900 border border-gray-200 font-bold py-3 rounded-xl flex items-center justify-center gap-2 transition-colors mt-auto">
                Use Template <ArrowRight className="w-4 h-4" />
              </Link>
            </motion.div>
          ))}
        </div>

      </div>
    </div>
  );
}
