"use client";


import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Sparkles, UploadCloud } from "lucide-react";

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50/50 pb-24">
      {/* Hero Section */}
      <section className="pt-24 pb-16 px-4 sm:px-6 relative overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/10 rounded-full blur-3xl translate-x-1/3 -translate-y-1/3"></div>
          <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-blue-500/5 rounded-full blur-3xl -translate-x-1/3 translate-y-1/3"></div>
        </div>

        <div className="max-w-6xl mx-auto text-center relative z-10 pt-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary font-bold text-sm mb-6"
          >
            <Sparkles className="w-4 h-4" /> Introducing the world&apos;s first Agriculture Marketplace
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-5xl sm:text-7xl font-black tracking-tight text-gray-900 mb-6 leading-[1.1]"
          >
            Don&apos;t stress over logistics.<br className="hidden sm:block" />
            <span className="text-primary">Connect with top farmers.</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-xl text-muted-foreground font-medium max-w-2xl mx-auto mb-10"
          >
            Discover top-tier agricultural machinery, buy fertilizers, and trade produce directly on the platform. Join thousands of farmers optimizing their yields. No middle-men needed.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <Link href="/products" className="w-full sm:w-auto px-8 py-4 bg-gray-900 text-white rounded-full font-bold text-lg hover:bg-primary transition-all flex items-center justify-center gap-2 shadow-xl hover:shadow-primary/20 hover:-translate-y-1">
              Start Exploring Now <ArrowRight className="w-5 h-5" />
            </Link>
            <Link href="/vendor/apply" className="w-full sm:w-auto px-8 py-4 bg-white text-gray-900 border border-gray-200 rounded-full font-bold text-lg hover:bg-gray-50 transition-all flex items-center justify-center gap-2">
              <UploadCloud className="w-5 h-5" /> Partner as a Vendor
            </Link>
          </motion.div>
        </div>
      </section>

      {/* How it Works Section */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-black mb-4">How it works</h2>
            <p className="text-muted-foreground font-medium text-lg">From finding equipment to harvesting produce in 3 taps.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-gray-50 rounded-[2rem] p-8 relative overflow-hidden group">
              <div className="w-16 h-16 bg-blue-100 text-blue-600 rounded-2xl flex items-center justify-center mb-6 relative z-10 group-hover:scale-110 transition-transform">
                <UploadCloud className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold mb-3 relative z-10">1. Browse Products</h3>
              <p className="text-gray-600 font-medium relative z-10">Select what you want to create (Letter, CV, Assignment) and just type in your rough, unformatted ideas. Don&apos;t worry about margins or grammar.</p>
              <div className="absolute -right-8 -bottom-8 w-40 h-40 bg-blue-200/50 rounded-full blur-3xl"></div>
            </div>

            <div className="bg-gray-50 rounded-[2rem] p-8 relative overflow-hidden group">
              <div className="w-16 h-16 bg-primary/20 text-primary rounded-2xl flex items-center justify-center mb-6 relative z-10 group-hover:scale-110 transition-transform">
                <Sparkles className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold mb-3 relative z-10">2. AI Formats Perfectly</h3>
              <p className="text-gray-600 font-medium relative z-10">Connect with sellers, negotiate or purchase directly with secure mobile money.</p>
              <div className="absolute -right-8 -bottom-8 w-40 h-40 bg-primary/20 rounded-full blur-3xl"></div>
            </div>

            <div className="bg-gray-50 rounded-[2rem] p-8 relative overflow-hidden group">
              <div className="w-16 h-16 bg-amber-100 text-amber-600 rounded-2xl flex items-center justify-center mb-6 relative z-10 group-hover:scale-110 transition-transform">
                <Sparkles className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold mb-3 relative z-10">3. Farm Smart</h3>
              <p className="text-gray-600 font-medium relative z-10">Download the flawless PDF or send it directly to a verified campus stationary partner. Walk in, pick up your papers, walk out. No flash drives needed.</p>
              <div className="absolute -right-8 -bottom-8 w-40 h-40 bg-amber-200/50 rounded-full blur-3xl"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Trust Section */}
      <section className="py-16 px-4">
         <div className="max-w-5xl mx-auto bg-gray-900 rounded-[3rem] p-8 sm:p-16 text-center relative overflow-hidden">
           <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1557683316-973673baf926?q=80&w=2000&auto=format&fit=crop')] opacity-10 bg-cover bg-center mix-blend-overlay"></div>

           <div className="relative z-10">
             <h2 className="text-3xl sm:text-5xl font-black text-white mb-6">Stop wasting hours finding the right farming equipment.</h2>
             <p className="text-gray-400 text-lg font-medium mb-10 max-w-2xl mx-auto">Join thousands of farmers optimizing their agriculture supply chain today.</p>
             <Link href="/products" className="inline-flex px-8 py-4 bg-primary text-white rounded-full font-bold text-lg hover:bg-white hover:text-gray-900 transition-all items-center gap-2">
               Open Workspace <Sparkles className="w-5 h-5" />
             </Link>
           </div>
         </div>
      </section>
    </div>
  );
}
