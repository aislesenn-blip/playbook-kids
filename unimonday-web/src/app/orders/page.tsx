"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Package, Clock, CheckCircle2, Wrench, X, QrCode } from "lucide-react";
import Image from "next/image";

export default function OrdersPage() {
  const [selectedOrder, setSelectedOrder] = useState<string | null>(null);
  const [timeLeft, setTimeLeft] = useState(300); // 5 minutes in seconds

  useEffect(() => {
    if (selectedOrder) {
      const timer = setInterval(() => {
        setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0));
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [selectedOrder]);

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m}:${s.toString().padStart(2, '0')}`;
  };
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
                  <button
                    onClick={() => setSelectedOrder(order.id)}
                    className="text-sm font-bold text-gray-600 hover:text-gray-900 transition-colors"
                  >
                    View Details
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Order Details Modal (Ticket) */}
      <AnimatePresence>
        {selectedOrder && (
          <div className="fixed inset-0 z-50 flex items-center justify-center px-4 bg-gray-900/60 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="bg-white rounded-[2rem] shadow-2xl w-full max-w-sm overflow-hidden relative"
            >
              <div className="p-6 bg-gray-900 text-white flex items-center justify-between">
                <h2 className="text-xl font-black">Pickup Ticket</h2>
                <button onClick={() => setSelectedOrder(null)} className="p-2 bg-white/10 hover:bg-white/20 rounded-full transition-colors">
                  <X className="w-5 h-5 text-white" />
                </button>
              </div>

              <div className="p-8 flex flex-col items-center text-center">
                <div className="w-full max-w-[200px] aspect-square bg-white border-4 border-gray-100 rounded-3xl p-4 mb-6 shadow-inner flex items-center justify-center relative overflow-hidden">
                   <QrCode className="w-full h-full text-gray-900" />
                   <div className="absolute inset-0 bg-gradient-to-t from-white/80 to-transparent flex items-end justify-center pb-2">
                      <span className="text-xs font-bold text-gray-500 tracking-widest">{selectedOrder}</span>
                   </div>
                </div>

                <h3 className="text-2xl font-black mb-2 text-gray-900">Show this to vendor</h3>
                <p className="text-muted-foreground font-medium mb-8">TechZone UDSM • Student Center</p>

                <div className="w-full bg-gray-50 rounded-2xl p-4 border border-border">
                  <p className="text-sm font-bold text-gray-500 mb-1 uppercase tracking-wider">Ticket expires in</p>
                  <p className={`text-4xl font-black ${timeLeft < 60 ? 'text-red-500 animate-pulse' : 'text-primary'}`}>
                    {formatTime(timeLeft)}
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

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
