"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAppStore } from "@/lib/store/app-store";
import { mockCampuses } from "@/lib/mockData";
import { ShoppingBag, ArrowRight, ShieldCheck, MapPin } from "lucide-react";
import Link from "next/link";
import { toast } from "sonner";

export default function SignupPage() {
  const router = useRouter();
  const { setUser, setCampus } = useAppStore();
  const [step, setStep] = useState<1 | 2>(1);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    universityName: "",
    region: "Dar es Salaam"
  });
  const [otp, setOtp] = useState("");

  const regions = [
    "Dar es Salaam", "Dodoma", "Mwanza", "Arusha", "Mbeya",
    "Morogoro", "Tanga", "Kahama", "Tabora", "Zanzibar"
  ];

  const handleSendOtp = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.email.includes("@")) {
      toast.error("Please enter a valid email address");
      return;
    }
    toast.success("OTP sent to " + formData.email);
    setStep(2);
  };

  const handleSignup = (e: React.FormEvent) => {
    e.preventDefault();
    if (otp !== "1234") {
      toast.error("Invalid OTP. Use 1234 for demo.");
      return;
    }

    // Mock successful signup
    setUser({
      id: "u" + Date.now(),
      name: formData.name,
      email: formData.email,
      role: "student",
      universityName: formData.universityName,
      region: formData.region,
      campusId: "c1" // Provide a default so explore views have something to show
    });
    setCampus(mockCampuses[0]); // Provide a default to satisfy the current app store requirements

    toast.success("Account created successfully!");

    // Check for redirectTo parameter
    const searchParams = new URLSearchParams(window.location.search);
    const redirectTo = searchParams.get('redirectTo');

    if (redirectTo) {
      router.push(redirectTo);
    } else {
      router.push("/");
    }
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
        {step === 1 ? (
          <form onSubmit={handleSendOtp} className="space-y-5">
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
              <label className="block text-sm font-bold mb-2">University Name</label>
              <div className="relative">
                 <input
                   type="text"
                   required
                   value={formData.universityName}
                   onChange={(e) => setFormData({...formData, universityName: e.target.value})}
                   placeholder="e.g. UDSM, IFM, UDOM"
                   className="w-full px-4 py-4 bg-gray-50 border border-border rounded-xl font-medium focus:outline-none focus:ring-2 focus:ring-primary focus:bg-white transition-all"
                 />
              </div>
            </div>

            <div>
              <label className="block text-sm font-bold mb-2">Region (Mkoa)</label>
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
              <label className="block text-sm font-bold mb-2">Email Address</label>
              <div className="relative flex items-center">
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                  placeholder="student@university.ac.tz"
                  className="w-full px-4 py-4 bg-gray-50 border border-border rounded-xl font-medium focus:outline-none focus:ring-2 focus:ring-primary focus:bg-white transition-all"
                />
              </div>
            </div>
            <button
              type="submit"
              className="w-full bg-primary text-white font-bold py-4 rounded-xl hover:bg-primary/90 transition-colors shadow-lg shadow-primary/20 flex items-center justify-center gap-2 mt-2"
            >
              Continue <ArrowRight className="w-5 h-5" />
            </button>
          </form>
        ) : (
          <form onSubmit={handleSignup} className="space-y-6">
             <div>
              <label className="block text-sm font-bold mb-2">Enter OTP</label>
              <p className="text-sm text-muted-foreground mb-4">Code sent to {formData.email}</p>
              <input
                type="text"
                required
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                placeholder="1234"
                className="w-full px-4 py-4 bg-gray-50 border border-border rounded-xl font-medium focus:outline-none focus:ring-2 focus:ring-primary focus:bg-white transition-all text-center text-2xl tracking-widest"
                maxLength={4}
              />
            </div>
            <button
              type="submit"
              className="w-full bg-primary text-white font-bold py-4 rounded-xl hover:bg-primary/90 transition-colors shadow-lg shadow-primary/20 flex items-center justify-center gap-2"
            >
              Verify & Create Account <ShieldCheck className="w-5 h-5" />
            </button>
            <button
              type="button"
              onClick={() => setStep(1)}
              className="w-full text-gray-500 font-bold py-2 text-sm hover:text-gray-900"
            >
              Back
            </button>
          </form>
        )}
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
