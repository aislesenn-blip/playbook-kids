"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Package, Clock, CheckCircle2, Wrench, XCircle, ArrowRight } from "lucide-react";
import Image from "next/image";
import { toast } from "sonner";
import { Order } from "@/types";
import { useAppStore } from "@/lib/store/app-store";

export default function OrdersPage() {
  const { orders, updateOrderStatus } = useAppStore();

  const getStatusColor = (status: string) => {
    switch(status) {
      case 'Pending': return { text: 'text-amber-500', bg: 'bg-amber-50' };
      case 'Confirmed': return { text: 'text-blue-500', bg: 'bg-blue-50' };
      case 'In Transit': return { text: 'text-purple-500', bg: 'bg-purple-50' };
      case 'Delivered': return { text: 'text-primary', bg: 'bg-primary/10' };
      case 'Cancelled': return { text: 'text-red-500', bg: 'bg-red-50' };
      default: return { text: 'text-gray-500', bg: 'bg-gray-100' };
    }
  };

  const activeStatuses = ['Pending', 'Paid', 'Confirmed', 'Processing', 'In Transit'];
  const activeOrders = orders.filter((o: Order) => activeStatuses.includes(o.status));
  const pastOrders = orders.filter((o: Order) => !activeStatuses.includes(o.status));

  if (orders.length === 0) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-24 text-center flex flex-col items-center">
        <motion.div
           initial={{ scale: 0.8, opacity: 0 }}
           animate={{ scale: 1, opacity: 1 }}
           className="w-40 h-40 mx-auto mb-8 bg-gray-50 rounded-full flex items-center justify-center border-[12px] border-white shadow-xl relative"
        >
           <Package className="w-16 h-16 text-gray-300" />
           <div className="absolute -top-2 -right-2 bg-amber-100 text-amber-600 rounded-full w-10 h-10 flex items-center justify-center font-black text-xl shadow-sm rotate-12">
             ?
           </div>
        </motion.div>
        <motion.h1
          initial={{ y: 10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.1 }}
          className="text-4xl font-black mb-4"
        >
          No orders yet
        </motion.h1>
        <motion.p
          initial={{ y: 10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-muted-foreground text-lg font-medium mb-10 max-w-md mx-auto"
        >
          Ready to treat yourself? Discover amazing campus deals and start filling up your orders.
        </motion.p>
        <motion.div
           initial={{ y: 10, opacity: 0 }}
           animate={{ y: 0, opacity: 1 }}
           transition={{ delay: 0.3 }}
        >
           <Link href="/explore" className="inline-flex items-center justify-center gap-2 bg-primary text-white font-bold py-4 px-10 rounded-full hover:bg-primary/90 transition-all hover:scale-105 shadow-xl shadow-primary/30 text-lg">
             Discover Deals <ArrowRight className="w-5 h-5" />
           </Link>
        </motion.div>
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
                  <Image src={order.image || ""} alt={order.title || ""} fill className="object-cover" />
                </div>
              ) : (
                <div className="w-full sm:w-24 h-24 rounded-xl shrink-0 bg-gray-100 flex items-center justify-center">
                  {order.type === 'service' ? <Wrench className="w-8 h-8 text-gray-400" /> : <Package className="w-8 h-8 text-gray-400" />}
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

                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mt-4">
                  <div className="flex items-center justify-center sm:justify-start gap-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1 ${getStatusColor(order.status).bg} ${getStatusColor(order.status).text}`}>
                      <span className="w-1.5 h-1.5 rounded-full bg-current animate-pulse"></span>
                      {order.status}
                    </span>
                    <Link href="/orders/details" className="text-sm font-bold text-gray-600 hover:text-gray-900 transition-colors">
                      View Details
                    </Link>
                  </div>

                  <div className="flex items-center gap-2">
                    {["Pending", "Confirmed", "In Transit"].includes(order.status) && (
                      <button
                        onClick={() => {
                          updateOrderStatus(order.id, 'Delivered');
                          toast.success(`Order ${order.id} confirmed as received!`);
                        }}
                        className="px-4 py-2 bg-primary text-white text-sm font-bold rounded-lg hover:bg-primary/90 transition-colors shadow-sm shadow-primary/20 flex items-center gap-1"
                      >
                        <CheckCircle2 className="w-4 h-4" /> Mark Received
                      </button>
                    )}
                    {order.status === "Pending" && (
                      <button
                        onClick={() => {
                          updateOrderStatus(order.id, 'Cancelled');
                          toast.error(`Order ${order.id} has been cancelled.`);
                        }}
                        className="px-4 py-2 bg-red-50 text-red-500 text-sm font-bold rounded-lg hover:bg-red-100 transition-colors flex items-center gap-1"
                      >
                        <XCircle className="w-4 h-4" /> Cancel
                      </button>
                    )}
                  </div>
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
                  <Image src={order.image || ""} alt={order.title || ""} fill className="object-cover" />
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
                  <span className={`px-3 py-1 rounded-full text-xs font-bold ${getStatusColor(order.status).bg} ${getStatusColor(order.status).text}`}>
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
