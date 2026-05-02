"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useAppStore } from "@/lib/store/app-store";
import { ShoppingBag, ArrowRight, ShieldCheck, MapPin } from "lucide-react";
import Link from "next/link";
import { toast } from "sonner";

const regions = [
  "Arusha", "Dar es Salaam", "Dodoma", "Geita", "Iringa", "Kagera", "Katavi", "Kigoma", "Kilimanjaro", "Lindi", "Manyara", "Mara", "Mbeya", "Morogoro", "Mtwara", "Mwanza", "Njombe", "Pemba North", "Pemba South", "Pwani", "Rukwa", "Ruvuma", "Shinyanga", "Simiyu", "Singida", "Tabora", "Tanga", "Zanzibar North", "Zanzibar South", "Zanzibar West"
];

export default function SignupPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirectTo = searchParams.get('redirectTo') || '/';

  const { setUser, setLocation } = useAppStore();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    region: regions[1], // Default Dar es Salaam
    campusName: ""
  });

  const handleSignup = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.email.includes("@")) {
      toast.error("Please enter a valid email address");
      return;
    }
    if (!formData.password || formData.password.length < 6) {
      toast.error("Password must be at least 6 characters");
      return;
    }
    if (!formData.campusName.trim()) {
      toast.error("Please enter your campus name");
      return;
    }

    // Mock successful signup
    setUser({
      id: "u" + Date.now(),
      name: formData.name,
      email: formData.email,
      role: "student",
      region: formData.region,
      campusName: formData.campusName
    });
    setLocation(formData.region, formData.campusName);

    toast.success("Account created successfully!");
    router.push(redirectTo);
  };

  return (
    <div className="max-w-md mx-auto py-12 px-4 min-h-[70vh] flex flex-col justify-center">
      <div className="text-center mb-8">
        <div className="w-16 h-16 bg-gray-900 rounded-2xl flex items-center justify-center mx-auto mb-6">
          <ShoppingBag className="w-8 h-8 text-white" />
        </div>
        <h1 className="text-3xl font-black mb-2 tracking-tight">Create Account</h1>
        <p className="text-muted-foreground font-medium">
          Join the largest campus marketplace
        </p>
      </div>

      <div className="bg-white p-6 sm:p-8 rounded-[2rem] border border-border shadow-sm">
          <form onSubmit={handleSignup} className="space-y-5">
            <div>
              <label className="block text-sm font-bold mb-2">Full Name</label>
              <input
                type="text"
                required
                value={formData.name}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
                placeholder="John Doe"
                className="w-full px-4 py-4 bg-gray-50 border border-border rounded-xl font-medium focus:outline-none focus:ring-2 focus:ring-primary focus:bg-white transition-all"
              />
            </div>

            <div>
              <label className="block text-sm font-bold mb-2">Region</label>
              <div className="relative">
                 <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
                    <MapPin className="h-5 w-5 text-gray-400" />
                 </div>
                 <select
                   required
                   value={formData.region}
                   onChange={(e) => setFormData({...formData, region: e.target.value})}
                   className="w-full pl-12 pr-4 py-4 bg-gray-50 border border-border rounded-xl font-medium focus:outline-none focus:ring-2 focus:ring-primary focus:bg-white transition-all appearance-none"
                 >
                   {regions.map(region => (
                     <option key={region} value={region}>{region}</option>
                   ))}
                 </select>
              </div>
            </div>

            <div>
              <label className="block text-sm font-bold mb-2">Campus Name</label>
              <input
                type="text"
                required
                value={formData.campusName}
                onChange={(e) => setFormData({...formData, campusName: e.target.value})}
                placeholder="e.g. UDSM Main Campus"
                className="w-full px-4 py-4 bg-gray-50 border border-border rounded-xl font-medium focus:outline-none focus:ring-2 focus:ring-primary focus:bg-white transition-all"
              />
            </div>

            <div>
              <label className="block text-sm font-bold mb-2">Email Address</label>
              <div className="relative flex items-center">
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                  placeholder="student@example.com"
                  className="w-full px-4 py-4 bg-gray-50 border border-border rounded-xl font-medium focus:outline-none focus:ring-2 focus:ring-primary focus:bg-white transition-all"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-bold mb-2">Password</label>
              <div className="relative flex items-center">
                <input
                  type="password"
                  required
                  value={formData.password}
                  onChange={(e) => setFormData({...formData, password: e.target.value})}
                  placeholder="••••••••"
                  className="w-full px-4 py-4 bg-gray-50 border border-border rounded-xl font-medium focus:outline-none focus:ring-2 focus:ring-primary focus:bg-white transition-all"
                />
              </div>
            </div>
            <button
              type="submit"
              className="w-full bg-primary text-white font-bold py-4 rounded-xl hover:bg-primary/90 transition-colors shadow-lg shadow-primary/20 flex items-center justify-center gap-2 mt-2"
            >
              Create Account <ShieldCheck className="w-5 h-5" />
            </button>
          </form>
      </div>

      <p className="text-center mt-8 text-muted-foreground font-medium text-sm">
        Already have an account?{" "}
        <Link href="/auth/login" className="text-primary font-bold hover:underline">
          Sign in
        </Link>
      </p>
    </div>
  );
}
