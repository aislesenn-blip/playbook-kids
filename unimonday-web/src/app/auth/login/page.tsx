"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAppStore } from "@/lib/store/app-store";
import { mockCampuses } from "@/lib/mockData";
import { ShoppingBag, ArrowRight, ShieldCheck } from "lucide-react";
import Link from "next/link";
import { toast } from "sonner";

export default function LoginPage() {
  const router = useRouter();
  const { setUser, setCampus } = useAppStore();
  const [step, setStep] = useState<1 | 2>(1);
  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState("");

  const handleSendOtp = (e: React.FormEvent) => {
    e.preventDefault();
    if (phone.length < 9) {
      toast.error("Please enter a valid phone number");
      return;
    }
    toast.success("OTP sent to " + phone);
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
      phone: phone,
      role: "student",
      campusId: "c1"
    });
    setCampus(mockCampuses[0]); // Default to UDSM

    toast.success("Logged in successfully!");
    router.push("/");
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
              <label className="block text-sm font-bold mb-2">Phone Number</label>
              <div className="relative flex items-center">
                <span className="absolute left-4 font-bold text-gray-500">+255</span>
                <input
                  type="tel"
                  required
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="712 345 678"
                  className="w-full pl-16 pr-4 py-4 bg-gray-50 border border-border rounded-xl font-medium focus:outline-none focus:ring-2 focus:ring-primary focus:bg-white transition-all"
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
              <p className="text-sm text-muted-foreground mb-4">Code sent to +255 {phone}</p>
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
              Change Phone Number
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
