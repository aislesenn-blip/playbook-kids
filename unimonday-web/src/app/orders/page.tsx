"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Package, Clock, CheckCircle2, Wrench } from "lucide-react";
import Image from "next/image";

export default function OrdersPage() {
  const activeOrders = [
    {
      id: "ORD-9821",
      type: "product",
      title: "Pro Wireless Earbuds",
      status: "In Transit",
      vendor: "TechZone UDSM",
      price: "Tsh 45,000",
      icon: Package,
      statusColor: "text-blue-500",
      statusBg: "bg-blue-50",
      image: "https://images.unsplash.com/photo-1546868871-7041f2a55e12?q=80&w=2064&auto=format&fit=crop"
    },
    {
      id: "SRV-4412",
      type: "service",
      title: "iPhone Screen Repair",
      status: "Confirmed",
      vendor: "Fundi Mjanja (Verified)",
      price: "Tsh 80,000",
      icon: Wrench,
      statusColor: "text-amber-500",
      statusBg: "bg-amber-50",
      image: null
    }
  ];

  const pastOrders = [
    {
      id: "ORD-1102",
      type: "product",
      title: "Vintage Denim Jacket",
      status: "Delivered",
      vendor: "Campus Thrift",
      price: "Tsh 35,000",
      icon: CheckCircle2,
      statusColor: "text-primary",
      statusBg: "bg-primary/10",
      image: "https://images.unsplash.com/photo-1523381210434-271e8be1f52b?q=80&w=2070&auto=format&fit=crop"
    }
  ];

  // For demo, uncomment to see empty state:
  // const activeOrders = [];
  // const pastOrders = [];

  if (activeOrders.length === 0 && pastOrders.length === 0) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-24 text-center">
        <div className="w-32 h-32 mx-auto mb-8 bg-gray-50 rounded-full flex items-center justify-center border-8 border-white shadow-xl">
           <Package className="w-12 h-12 text-gray-300" />
        </div>
        <h1 className="text-3xl font-black mb-4">No orders yet</h1>
        <p className="text-muted-foreground font-medium mb-8 max-w-md mx-auto">
          You haven&apos;t placed any orders yet. Start exploring the marketplace to find what you need.
        </p>
        <Link href="/explore" className="inline-flex items-center justify-center bg-primary text-white font-bold py-4 px-8 rounded-xl hover:bg-primary/90 transition-colors shadow-lg shadow-primary/20">
          Start Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="flex items-center gap-4 mb-10">
        <div className="w-12 h-12 bg-primary/10 rounded-2xl flex items-center justify-center text-primary">
          <Package className="w-6 h-6" />
        </div>
        <h1 className="text-4xl font-black text-gray-900 tracking-tight">My Orders</h1>
      </div>

      <div className="mb-12">
        <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
          <Clock className="w-5 h-5 text-amber-500" /> Active
        </h2>
        <div className="space-y-4">
          {activeOrders.map((order, idx) => (
            <motion.div
              key={order.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              className="bg-white rounded-[2rem] p-6 border border-border shadow-sm flex flex-col sm:flex-row gap-6 items-center"
            >
              {order.image ? (
                <div className="w-full sm:w-24 h-24 relative rounded-xl overflow-hidden shrink-0 bg-gray-100">
                  <Image src={order.image} alt={order.title} fill className="object-cover" />
                </div>
              ) : (
                <div className="w-full sm:w-24 h-24 rounded-xl shrink-0 bg-gray-100 flex items-center justify-center">
                  <order.icon className="w-8 h-8 text-gray-400" />
                </div>
              )}

              <div className="flex-1 text-center sm:text-left w-full">
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start mb-2 gap-2">
                  <div>
                    <span className="text-xs font-bold text-muted-foreground uppercase tracking-wider mb-1 block">
                      {order.id} • {order.vendor}
                    </span>
                    <h3 className="text-xl font-bold text-gray-900">{order.title}</h3>
                  </div>
                  <span className="text-lg font-black text-gray-900">{order.price}</span>
                </div>

                <div className="flex items-center justify-center sm:justify-start gap-4 mt-4">
                  <span className={`px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1 ${order.statusBg} ${order.statusColor}`}>
                    <span className="w-1.5 h-1.5 rounded-full bg-current animate-pulse"></span>
                    {order.status}
                  </span>
                  <Link href="/orders/details" className="text-sm font-bold text-gray-600 hover:text-gray-900 transition-colors">
                    View Details
                  </Link>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <div>
        <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
          <CheckCircle2 className="w-5 h-5 text-primary" /> Completed
        </h2>
        <div className="space-y-4">
          {pastOrders.map((order, idx) => (
            <motion.div
              key={order.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 + (idx * 0.1) }}
              className="bg-white rounded-[2rem] p-6 border border-border shadow-sm flex flex-col sm:flex-row gap-6 items-center opacity-75 hover:opacity-100 transition-opacity"
            >
              {order.image && (
                <div className="w-full sm:w-20 h-20 relative rounded-xl overflow-hidden shrink-0 bg-gray-100 grayscale hover:grayscale-0 transition-all">
                  <Image src={order.image} alt={order.title} fill className="object-cover" />
                </div>
              )}

              <div className="flex-1 text-center sm:text-left w-full">
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2">
                  <div>
                    <h3 className="text-lg font-bold text-gray-900">{order.title}</h3>
                    <span className="text-sm font-medium text-muted-foreground">
                      {order.vendor}
                    </span>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-xs font-bold ${order.statusBg} ${order.statusColor}`}>
                    {order.status}
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
