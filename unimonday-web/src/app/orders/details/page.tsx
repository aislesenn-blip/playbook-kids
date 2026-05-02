"use client";

import Link from "next/link";
import { ArrowLeft, Package, CheckCircle2 } from "lucide-react";

export default function OrderDetailsPage() {
  return (
    <div className="max-w-2xl mx-auto py-8 px-4">
      <Link href="/orders" className="flex items-center gap-2 text-muted-foreground hover:text-gray-900 font-bold mb-8 transition-colors">
        <ArrowLeft className="w-5 h-5" /> Back to Orders
      </Link>
      <div className="bg-white p-8 rounded-[2rem] border border-border shadow-sm">
        <div className="flex items-center gap-4 mb-6">
          <div className="w-12 h-12 bg-blue-50 rounded-2xl flex items-center justify-center text-blue-500">
            <Package className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-2xl font-black">Order ORD-9821</h1>
            <p className="text-muted-foreground font-medium">In Transit</p>
          </div>
        </div>
        <div className="space-y-6">
          <div className="bg-gray-50 p-6 rounded-2xl">
            <h3 className="font-bold mb-2">Item Details</h3>
            <p className="text-gray-600">1x Pro Wireless Earbuds</p>
            <p className="text-gray-600">Vendor: TechZone UDSM</p>
          </div>
          <div className="bg-gray-50 p-6 rounded-2xl">
            <h3 className="font-bold mb-2">Payment Info</h3>
            <p className="text-gray-600">Total: Tsh 45,000</p>
            <p className="text-gray-600 flex items-center gap-1"><CheckCircle2 className="w-4 h-4 text-primary" /> Paid via Mobile Money</p>
          </div>
        </div>
      </div>
    </div>
  );
}
