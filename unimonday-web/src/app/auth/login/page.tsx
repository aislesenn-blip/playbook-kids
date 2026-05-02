"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useAppStore } from "@/lib/store/app-store";
import { ShoppingBag, ArrowRight, ShieldCheck } from "lucide-react";
import Link from "next/link";
import { toast } from "sonner";

export default function LoginPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirectTo = searchParams.get('redirectTo') || '/';

  const { setUser, setLocation } = useAppStore();
  const [step, setStep] = useState<1 | 2>(1);
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");

  const handleSendOtp = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.includes("@")) {
      toast.error("Please enter a valid email address");
      return;
    }
    toast.success("OTP sent to " + email);
    setStep(2);
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (otp !== "1234") {
      toast.error("Invalid OTP. Use 1234 for demo.");
      return;
    }

    // Mock successful login
    setUser({
      id: "u1",
      name: "Student User",
      email: email,
      role: "student",
      region: "Dar es Salaam",
      campusName: "UDSM - Main Campus"
    });
    setLocation("Dar es Salaam", "UDSM - Main Campus"); // Default

    toast.success("Logged in successfully!");
    router.push(redirectTo);
  };

  return (
    <div className="max-w-md mx-auto py-12 px-4 min-h-[70vh] flex flex-col justify-center">
      <div className="text-center mb-8">
        <div className="w-16 h-16 bg-gray-900 rounded-2xl flex items-center justify-center mx-auto mb-6">
          <ShoppingBag className="w-8 h-8 text-white" />
        </div>
        <h1 className="text-3xl font-black mb-2 tracking-tight">Welcome Back</h1>
        <p className="text-muted-foreground font-medium">
          Sign in to your uNiMONDAY account
        </p>
      </div>

      <div className="bg-white p-6 sm:p-8 rounded-[2rem] border border-border shadow-sm">
        {step === 1 ? (
          <form onSubmit={handleSendOtp} className="space-y-6">
            <div>
              <label className="block text-sm font-bold mb-2">Email Address</label>
              <div className="relative flex items-center">
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="student@example.com"
                  className="w-full px-4 py-4 bg-gray-50 border border-border rounded-xl font-medium focus:outline-none focus:ring-2 focus:ring-primary focus:bg-white transition-all"
                />
              </div>
            </div>
            <button
              type="submit"
              className="w-full bg-primary text-white font-bold py-4 rounded-xl hover:bg-primary/90 transition-colors shadow-lg shadow-primary/20 flex items-center justify-center gap-2"
            >
              Send Verification Code <ArrowRight className="w-5 h-5" />
            </button>
          </form>
        ) : (
          <form onSubmit={handleLogin} className="space-y-6">
             <div>
              <label className="block text-sm font-bold mb-2">Enter OTP</label>
              <p className="text-sm text-muted-foreground mb-4">Code sent to {email}</p>
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
              Verify & Sign In <ShieldCheck className="w-5 h-5" />
            </button>
            <button
              type="button"
              onClick={() => setStep(1)}
              className="w-full text-gray-500 font-bold py-2 text-sm hover:text-gray-900"
            >
              Change Email
            </button>
          </form>
        )}
      </div>

      <p className="text-center mt-8 text-muted-foreground font-medium text-sm">
        Don&apos;t have an account?{" "}
        <Link href="/auth/signup" className="text-primary font-bold hover:underline">
          Sign up
        </Link>
      </p>
    </div>
  );
}
