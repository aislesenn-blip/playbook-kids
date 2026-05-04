"use client";

import { Printer, Store, CheckCircle, ArrowRight, UploadCloud, Banknote } from "lucide-react";
import { useRouter } from "next/navigation";

export default function ApplyPage() {
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app we would submit the form data to an API here.
    // For now we simulate success and redirect directly to the vendor dashboard.
    router.push('/vendor/dashboard');
  };
  return (
    <div className="min-h-screen bg-gray-50 pt-20 pb-24">
      <div className="max-w-4xl mx-auto px-4 w-full">

        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-primary/10 text-primary rounded-full mb-6">
            <Printer className="w-8 h-8" />
          </div>
          <h1 className="text-4xl md:text-5xl font-black tracking-tight mb-4 text-gray-900">
            Join the uNiMONDAY Print Network
          </h1>
          <p className="text-xl text-muted-foreground font-medium max-w-2xl mx-auto">
            Turn your stationary shop into a smart printing hub. Receive perfect PDF print jobs directly from students on campus.
          </p>
          <div className="mt-6">
            <button onClick={() => router.push('/auth/login?role=vendor')} className="text-primary font-bold hover:underline">
              Already a Partner? Login to your Dashboard
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div className="bg-white p-6 rounded-2xl border border-border text-center shadow-sm">
            <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-xl flex items-center justify-center mx-auto mb-4">
              <UploadCloud className="w-6 h-6" />
            </div>
            <h3 className="font-bold text-lg mb-2">No More Flash Drives</h3>
            <p className="text-muted-foreground text-sm font-medium">Students send perfectly formatted PDFs directly to your queue. Say goodbye to viruses.</p>
          </div>
          <div className="bg-white p-6 rounded-2xl border border-border text-center shadow-sm">
            <div className="w-12 h-12 bg-emerald-100 text-emerald-600 rounded-xl flex items-center justify-center mx-auto mb-4">
              <CheckCircle className="w-6 h-6" />
            </div>
            <h3 className="font-bold text-lg mb-2">Zero Formatting Issues</h3>
            <p className="text-muted-foreground text-sm font-medium">Our AI formats the documents. You only need to hit &quot;Print&quot;. Save hours of editing time.</p>
          </div>
          <div className="bg-white p-6 rounded-2xl border border-border text-center shadow-sm">
            <div className="w-12 h-12 bg-amber-100 text-amber-600 rounded-xl flex items-center justify-center mx-auto mb-4">
              <Banknote className="w-6 h-6" />
            </div>
            <h3 className="font-bold text-lg mb-2">Increase Revenue</h3>
            <p className="text-muted-foreground text-sm font-medium">Get listed on our app so students can easily find your shop and send jobs remotely.</p>
          </div>
        </div>

        <div className="bg-white rounded-3xl p-8 md:p-12 border border-border shadow-xl">
          <h2 className="text-2xl font-black mb-8 border-b pb-4">Stationary Registration Form</h2>

          <form className="space-y-6" onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-bold text-gray-700">Stationary Name <span className="text-red-500">*</span></label>
                <input type="text" placeholder="e.g. Mlimani Campus Print Shop" className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary/50 font-medium" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-bold text-gray-700">Owner&apos;s Name <span className="text-red-500">*</span></label>
                <input type="text" placeholder="Full Name" className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary/50 font-medium" />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
               <div className="space-y-2">
                <label className="text-sm font-bold text-gray-700">Phone Number <span className="text-red-500">*</span></label>
                <input type="tel" placeholder="+255..." className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary/50 font-medium" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-bold text-gray-700">Email Address (Optional)</label>
                <input type="email" placeholder="Email" className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary/50 font-medium" />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-bold text-gray-700">Location / Campus <span className="text-red-500">*</span></label>
              <textarea placeholder="e.g. UDSM Main Campus, Near Yombo 4" rows={2} className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary/50 font-medium"></textarea>
            </div>

            <div className="bg-primary/5 p-6 rounded-xl border border-primary/20 flex gap-4 items-start">
              <Store className="w-6 h-6 text-primary shrink-0 mt-1" />
              <div>
                <h4 className="font-bold text-gray-900 mb-1">What happens next?</h4>
                <p className="text-sm text-gray-600 font-medium">Once you submit this form, our team will verify your shop location. You will then receive login credentials to access the Print Dashboard where you will receive student print jobs.</p>
              </div>
            </div>

            <button type="submit" className="w-full bg-gray-900 hover:bg-black text-white font-bold py-4 rounded-xl flex items-center justify-center gap-2 transition-colors shadow-lg mt-8 text-lg">
              Submit Application <ArrowRight className="w-5 h-5" />
            </button>
            <p className="text-center text-xs text-muted-foreground font-medium mt-4">By submitting, you agree to our Terms of Service as a Print Partner.</p>
          </form>

        </div>
      </div>
    </div>
  );
}
