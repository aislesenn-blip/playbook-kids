"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Store, ArrowRight, TrendingUp, Zap, MapPin, ShieldCheck } from "lucide-react";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { supabase } from "@/lib/supabase/client";
import { useAppStore } from "@/lib/store/app-store";

export default function VendorApply() {
  const router = useRouter();
  const { setUser, setLocation } = useAppStore();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    ownerName: "",
    email: "",
    password: "",
    storeName: "",
    category: "",
    region: "Dar es Salaam",
    campusName: ""
  });

  const handleApply = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.email.includes("@")) {
      toast.error("Please enter a valid email address");
      return;
    }
    if (!formData.password || formData.password.length < 6) {
      toast.error("Password must be at least 6 characters");
      return;
    }

    setIsLoading(true);
    try {
      // Try Supabase first
      const { data, error } = await supabase.auth.signUp({
        email: formData.email,
        password: formData.password,
        options: {
          data: {
            name: formData.ownerName,
            role: "vendor",
            region: formData.region,
            campusName: formData.campusName,
            storeName: formData.storeName,
            category: formData.category
          }
        }
      });

      if (error) {
         console.warn("Supabase error, falling back to mock auth", error);
      }
    } catch (e) {
      console.warn("Supabase failed, falling back to mock auth");
    } finally {
      // ALWAYS sync state for demo regardless of Supabase
      setUser({
        id: "v" + Date.now(),
        name: formData.ownerName,
        email: formData.email,
        role: "vendor",
        region: formData.region,
        campusName: formData.campusName
      });
      setLocation(formData.region, formData.campusName);

      toast.success("Store application submitted successfully!");
      router.push("/vendor/dashboard");
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto py-12 px-4">
      <div className="text-center mb-12">
        <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center text-primary mx-auto mb-6">
          <Store className="w-8 h-8" />
        </div>
        <h1 className="text-4xl sm:text-5xl font-black mb-4 tracking-tight">Partner With Us</h1>
        <p className="text-xl text-muted-foreground font-medium max-w-2xl mx-auto">
          Turn your campus hustle into a verified business. Reach thousands of students instantly.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        <div className="bg-white p-6 rounded-[2rem] border border-border shadow-sm text-center">
          <TrendingUp className="w-8 h-8 text-blue-500 mx-auto mb-4" />
          <h3 className="font-bold text-lg mb-2">Grow Sales</h3>
          <p className="text-sm text-muted-foreground">Access the largest verified student market.</p>
        </div>
        <div className="bg-white p-6 rounded-[2rem] border border-border shadow-sm text-center">
          <Zap className="w-8 h-8 text-amber-500 mx-auto mb-4" />
          <h3 className="font-bold text-lg mb-2">Instant Pay</h3>
          <p className="text-sm text-muted-foreground">Get paid instantly via mobile money networks.</p>
        </div>
        <div className="bg-white p-6 rounded-[2rem] border border-border shadow-sm text-center">
          <ShieldCheck className="w-8 h-8 text-primary mx-auto mb-4" />
          <h3 className="font-bold text-lg mb-2">Verified Status</h3>
          <p className="text-sm text-muted-foreground">Build trust with the official campus verification.</p>
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white p-8 rounded-[3rem] border border-border shadow-xl max-w-2xl mx-auto"
      >
        <h2 className="text-2xl font-black mb-6">Application Form</h2>
        <form className="space-y-4">
          <div className="space-y-2">
            <label className="text-sm font-bold text-gray-700">Store Name</label>
            <input type="text" placeholder="e.g. Kicks TZ" className="w-full p-4 bg-gray-50 border border-border rounded-xl outline-none focus:ring-2 focus:ring-primary transition-all" />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-bold text-gray-700">Category</label>
                              <select required value={formData.category} onChange={(e) => setFormData({...formData, category: e.target.value})} className="w-full px-4 py-4 bg-gray-50 border border-border rounded-xl font-medium focus:outline-none focus:ring-2 focus:ring-primary focus:bg-white transition-all appearance-none">
                    <option value="" disabled>Select primary category</option>
                    <option value="Fashion & Apparels">Fashion & Apparels</option>
                    <option value="Tech & Accessories">Tech & Accessories</option>
                    <option value="Beauty & Cosmetics">Beauty & Cosmetics</option>
                    <option value="Home & Decor">Home & Decor</option>
                    <option value="Services">Services</option>
                  </select>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-bold text-gray-700">Campus Location</label>
            <input type="text" placeholder="e.g. UDSM Block A" className="w-full p-4 bg-gray-50 border border-border rounded-xl outline-none focus:ring-2 focus:ring-primary transition-all" />
          </div>

          <div className="pt-4">
            <button type="submit" disabled={isLoading} className="w-full flex items-center justify-center gap-2 bg-gray-900 text-white hover:bg-gray-800 font-bold py-4 rounded-xl transition-colors shadow-lg disabled:opacity-70">
              {isLoading ? "Submitting..." : "Submit Application"} <ArrowRight className="w-5 h-5" />
            </button>
            <p className="text-xs text-center text-muted-foreground mt-4 font-medium">By submitting, you agree to our Vendor Terms & Conditions.</p>
          </div>
        </form>
      </motion.div>
    </div>
  );
}
