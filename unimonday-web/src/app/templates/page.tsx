"use client";

import { LayoutTemplate, Search, ArrowRight, FileText, Columns } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";

export default function TemplatesPage() {
  const templates = [
    { id: 1, title: "APA Research Paper", category: "Academic", img: "https://images.unsplash.com/photo-1586162481176-7abc53f1f7c2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w4NjMzNTJ8MHwxfHNlYXJjaHwxfHxhc3NpZ25tZW50JTIwcGFwZXJ8ZW58MHx8fHwxNzc3ODg2MjI3fDA&ixlib=rb-4.1.0&q=80&w=1080", desc: "Standard APA format with title page, abstract, and references." },
    { id: 2, title: "Official Leave Letter", category: "Letters", img: "https://images.unsplash.com/photo-1590080790166-59c6bb8d90ed?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w4NjMzNTJ8MHwxfHNlYXJjaHwxfHxsZWF2ZSUyMGxldHRlciUyMHBhcGVyfGVufDB8fHx8MTc3Nzg4NjIyN3ww&ixlib=rb-4.1.0&q=80&w=1080", desc: "Formal letter format for requesting absence from the Dean." },
    { id: 3, title: "Weekly Timetable", category: "Tables", img: "https://images.unsplash.com/photo-1523001021477-53f37adf2df3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w4NjMzNTJ8MHwxfHNlYXJjaHwxfHxjbGFzcyUyMHRpbWV0YWJsZSUyMHNjaGVkdWxlfGVufDB8fHx8MTc3Nzg4NjIyN3ww&ixlib=rb-4.1.0&q=80&w=1080", desc: "Clean 7-day grid format for class schedules." },
    { id: 4, title: "Curriculum Vitae", category: "Career", img: "https://images.unsplash.com/photo-1705544363568-425eabe4de51?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w4NjMzNTJ8MHwxfHNlYXJjaHwxfHxjdXJyaWN1bHVtJTIwdml0YWUlMjByZXN1bWV8ZW58MHx8fHwxNzc3ODg2MjI4fDA&ixlib=rb-4.1.0&q=80&w=1080", desc: "Professional one-page resume layout." },
    { id: 5, title: "Lab Report (Chemistry)", category: "Academic", img: "https://images.unsplash.com/photo-1532094349884-543bc11b234d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w4NjMzNTJ8MHwxfHNlYXJjaHwxfHxsYWIlMjByZXBvcnQlMjBzY2llbmNlfGVufDB8fHx8MTc3Nzg4NjIyOXww&ixlib=rb-4.1.0&q=80&w=1080", desc: "Structured layout for methodology, results, and discussion." },
    { id: 6, title: "Sponsorship Request", category: "Letters", img: "https://images.unsplash.com/photo-1554774853-719586f82d77?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w4NjMzNTJ8MHwxfHNlYXJjaHwxfHxidXNpbmVzcyUyMGxldHRlcnxlbnwwfHx8fDE3Nzc4ODYyMjl8MA&ixlib=rb-4.1.0&q=80&w=1080", desc: "Professional letter format for corporate sponsorship." },
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

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {templates.map((template) => (
            <motion.div whileHover={{ y: -5 }} key={template.id} className="bg-white rounded-3xl overflow-hidden border border-gray-200 shadow-sm hover:shadow-xl transition-all group flex flex-col">
              {/* Visual Psychology: Show what the user gets */}
              <div className="relative w-full h-48 bg-gray-100 overflow-hidden">
                <img src={template.img} alt={template.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm text-gray-900 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider shadow-sm">
                  {template.category}
                </div>
              </div>

              <div className="p-6 flex flex-col flex-grow">
                <h3 className="text-xl font-black mb-2 text-gray-900 line-clamp-1">{template.title}</h3>
                <p className="text-gray-500 font-medium text-sm leading-relaxed mb-6 flex-grow line-clamp-2">
                  {template.desc}
                </p>

                <Link href="/workspace" className="w-full bg-primary/10 hover:bg-primary text-primary hover:text-white font-bold py-3 rounded-xl flex items-center justify-center gap-2 transition-colors mt-auto">
                  Use Format <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </div>
  );
}
