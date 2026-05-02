"use client";

import { useAppStore } from "@/lib/store/app-store";
import { useRouter } from "next/navigation";
import { User, LogOut, Settings, MapPin, Mail, ShieldAlert } from "lucide-react";
import { toast } from "sonner";
import Link from "next/link";

export default function ProfilePage() {
  const router = useRouter();
  const { currentUser, resetApp } = useAppStore();

  if (!currentUser) {
    router.push("/auth/login");
    return null;
  }

  const handleLogout = () => {
    resetApp();
    toast.success("Logged out successfully");
    router.push("/");
  };

  return (
    <div className="max-w-3xl mx-auto py-12 px-4">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-black tracking-tight">My Profile</h1>
        <button
          onClick={handleLogout}
          className="flex items-center gap-2 px-4 py-2 bg-red-50 text-red-500 hover:bg-red-100 rounded-full font-bold text-sm transition-colors"
        >
          <LogOut className="w-4 h-4" /> Log Out
        </button>
      </div>

      <div className="bg-white rounded-[2rem] p-8 border border-border shadow-sm mb-8 flex flex-col md:flex-row items-center gap-8">
        <div className="w-24 h-24 bg-primary/10 text-primary rounded-full flex items-center justify-center shrink-0">
          <User className="w-10 h-10" />
        </div>
        <div className="text-center md:text-left flex-1">
          <h2 className="text-2xl font-bold text-gray-900 mb-1">{currentUser.name}</h2>
          <div className="flex flex-col md:flex-row items-center md:items-start gap-4 text-muted-foreground font-medium mt-3">
             <span className="flex items-center gap-2 bg-gray-50 px-3 py-1.5 rounded-lg text-sm">
                <Mail className="w-4 h-4 text-gray-400" /> {currentUser.email}
             </span>
             <span className="flex items-center gap-2 bg-gray-50 px-3 py-1.5 rounded-lg text-sm">
                <MapPin className="w-4 h-4 text-gray-400" /> {currentUser.campusName}, {currentUser.region}
             </span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Link href="/orders" className="bg-white rounded-[2rem] p-6 border border-border shadow-sm hover:shadow-md transition-shadow group flex items-center gap-4 cursor-pointer">
          <div className="w-12 h-12 bg-primary/10 text-primary rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
             <Settings className="w-6 h-6" />
          </div>
          <div>
            <h3 className="font-bold text-lg">My Orders</h3>
            <p className="text-sm text-muted-foreground">Track and manage your purchases</p>
          </div>
        </Link>
        <Link href="/vendor/apply" className="bg-white rounded-[2rem] p-6 border border-border shadow-sm hover:shadow-md transition-shadow group flex items-center gap-4 cursor-pointer">
          <div className="w-12 h-12 bg-amber-50 text-amber-500 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
             <ShieldAlert className="w-6 h-6" />
          </div>
          <div>
            <h3 className="font-bold text-lg">Become a Vendor</h3>
            <p className="text-sm text-muted-foreground">Start selling to your campus</p>
          </div>
        </Link>
      </div>
    </div>
  );
}