"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Store, Upload, CheckCircle } from "lucide-react";

export default function VendorApplyPage() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Simulate a network request
    setTimeout(() => {
      router.push("/vendor/dashboard");
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-gray-50 pt-24 pb-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-[2rem] p-8 shadow-sm border border-border"
        >
          <div className="flex justify-center mb-6">
            <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center text-primary">
              <Store className="w-8 h-8" />
            </div>
          </div>

          <div className="text-center mb-8">
            <h1 className="text-3xl font-black mb-2">Partner with uNiMONDAY</h1>
            <p className="text-muted-foreground">Start selling to thousands of students on campus today.</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="storeName" className="block text-sm font-bold text-gray-700 mb-1">
                Store Name
              </label>
              <input
                type="text"
                id="storeName"
                required
                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all"
                placeholder="e.g. Campus Thrift"
              />
            </div>

            <div>
              <label htmlFor="category" className="block text-sm font-bold text-gray-700 mb-1">
                Category
              </label>
              <select
                id="category"
                required
                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all"
              >
                <option value="">Select a category</option>
                <option value="fashion">Fashion & Apparel</option>
                <option value="tech">Tech & Accessories</option>
                <option value="services">Services</option>
                <option value="other">Other</option>
              </select>
            </div>

            <div>
              <label htmlFor="contact" className="block text-sm font-bold text-gray-700 mb-1">
                Contact Number
              </label>
              <input
                type="tel"
                id="contact"
                required
                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all"
                placeholder="+255 7XX XXX XXX"
              />
            </div>

            <div>
              <label htmlFor="description" className="block text-sm font-bold text-gray-700 mb-1">
                Store Description
              </label>
              <textarea
                id="description"
                rows={4}
                required
                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all resize-none"
                placeholder="Tell us about what you sell..."
              />
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-4 bg-primary text-white rounded-xl font-bold text-lg hover:bg-primary/90 transition-colors flex justify-center items-center gap-2"
            >
              {isSubmitting ? (
                <>
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Submitting...
                </>
              ) : (
                <>Submit Application <CheckCircle className="w-5 h-5" /></>
              )}
            </button>
          </form>
        </motion.div>
      </div>
    </div>
  );
}
