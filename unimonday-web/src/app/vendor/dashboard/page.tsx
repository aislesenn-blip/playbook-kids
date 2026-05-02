"use client";

import { useState } from "react";
import { useVendorStore } from "@/lib/store/vendor-store";
import Image from "next/image";
import { TrendingUp, Package, Clock, Settings, BellRing, Check, Tag } from "lucide-react";
import { Switch } from "@/components/ui/switch";
import { cn } from "@/lib/utils";

// Mock Active Orders for demonstration
const MOCK_ORDERS = [
  { id: "ORD-001", customer: "John Doe", items: "2x Burger, 1x Cola", total: "Tsh 12,000", time: "2 min ago", status: "new" },
  { id: "ORD-002", customer: "Jane Smith", items: "1x Pizza", total: "Tsh 15,000", time: "5 min ago", status: "preparing" },
];

export default function VendorDashboard() {
  const [vendorId] = useState("v1"); // Mocking logged in vendor

  const { vendors, menuItems, toggleStoreStatus, toggleItemAvailability } = useVendorStore();

  const vendorData = vendors.find(v => v.id === vendorId);
  const vendorMenuItems = menuItems.filter(m => m.vendorId === vendorId);

  const [orders, setOrders] = useState(MOCK_ORDERS);

  const handleOrderAction = (orderId: string) => {
    setOrders(orders.map(order => {
      if (order.id === orderId) {
        if (order.status === 'new') return { ...order, status: 'preparing' };
        if (order.status === 'preparing') return { ...order, status: 'ready' };
      }
      return order;
    }));
  };

  if (!vendorData) return <div>Vendor not found</div>;

  return (
    <div className="pb-24 max-w-5xl mx-auto pt-4">
      {/* Header & Status */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-8">
        <div>
          <h1 className="text-3xl font-black tracking-tight mb-1">Dashboard</h1>
          <p className="text-muted-foreground font-medium">{vendorData.name} Overview</p>
        </div>

        <div className="flex flex-wrap items-center gap-4">
          <button className="flex items-center gap-2 px-6 py-4 rounded-3xl border border-border/50 bg-white hover:bg-secondary transition-colors text-sm font-bold">
            <Tag className="w-4 h-4" />
            Create Coupon
          </button>
          <div className={cn(
            "flex items-center gap-4 px-6 py-4 rounded-3xl border transition-colors",
            vendorData.isOpen ? "bg-primary/10 border-primary/20" : "bg-destructive/10 border-destructive/20"
          )}>
             <div className="flex flex-col">
               <span className="text-sm font-bold text-foreground">Store Status</span>
               <span className={cn(
                 "text-sm font-bold",
                 vendorData.isOpen ? "text-primary" : "text-destructive"
               )}>
                 {vendorData.isOpen ? "Accepting Orders" : "Closed / Order Full"}
               </span>
             </div>
             <Switch
               checked={vendorData.isOpen}
               onCheckedChange={() => toggleStoreStatus(vendorId)}
               className="data-[state=checked]:bg-primary ml-4"
             />
          </div>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
        {[
          { label: "Today's Revenue", value: "Tsh 145,000", icon: TrendingUp, color: "text-primary", bg: "bg-primary/10" },
          { label: "Active Orders", value: "12", icon: BellRing, color: "text-blue-500", bg: "bg-blue-500/10" },
          { label: "Items Sold", value: "48", icon: Package, color: "text-amber-500", bg: "bg-amber-500/10" },
          { label: "Avg Prep Time", value: "4 min", icon: Clock, color: "text-purple-500", bg: "bg-purple-500/10" },
        ].map((stat, i) => (
          <div key={i} className="bg-white p-6 rounded-[2rem] border border-border/50 shadow-sm flex flex-col justify-between min-h-[120px]">
            <div className="flex justify-between items-start">
              <span className="text-muted-foreground font-medium text-sm">{stat.label}</span>
              <div className={`p-2 rounded-xl ${stat.bg}`}>
                <stat.icon className={`w-4 h-4 ${stat.color}`} />
              </div>
            </div>
            <span className="text-2xl font-black mt-4">{stat.value}</span>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Active Orders Column */}
        <div className="lg:col-span-1">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold tracking-tight">Active Orders</h2>
            <div className="w-8 h-8 rounded-full bg-primary/10 text-primary flex items-center justify-center font-bold text-sm">
              {orders.filter(o => o.status !== 'ready').length}
            </div>
          </div>

          <div className="flex flex-col gap-4">
            {orders.filter(o => o.status !== 'ready').map((order) => (
              <div key={order.id} className={cn(
                "p-5 rounded-[2rem] border-2 shadow-sm transition-all",
                order.status === 'new' ? "border-primary/50 bg-primary/5 animate-pulse" : "border-border/50 bg-white"
              )}>
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <h3 className="font-bold text-lg">{order.id}</h3>
                    <p className="text-sm text-muted-foreground">{order.customer} • {order.time}</p>
                  </div>
                  <span className="font-bold text-primary">{order.total}</span>
                </div>
                <div className="p-3 bg-secondary/50 rounded-2xl mb-4 text-sm font-medium">
                  {order.items}
                </div>
                <button
                  onClick={() => handleOrderAction(order.id)}
                  className={cn(
                    "w-full py-3 rounded-full font-bold text-white transition-all active:scale-95 flex items-center justify-center gap-2",
                    order.status === 'new' ? "bg-primary hover:bg-primary/90" : "bg-blue-500 hover:bg-blue-600"
                  )}
                >
                  {order.status === 'new' ? (
                    <>Accept Order <Check className="w-4 h-4" /></>
                  ) : (
                    <>Mark Ready <Package className="w-4 h-4" /></>
                  )}
                </button>
              </div>
            ))}

            {orders.filter(o => o.status !== 'ready').length === 0 && (
              <div className="text-center p-8 bg-white rounded-[2rem] border border-border/50 border-dashed">
                <BellRing className="w-8 h-8 text-muted-foreground/30 mx-auto mb-2" />
                <p className="text-muted-foreground font-medium">No active orders</p>
              </div>
            )}
          </div>
        </div>

        {/* Menu Management Column */}
        <div className="lg:col-span-2">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold tracking-tight">Menu Management</h2>
            <button className="text-sm font-bold text-primary hover:underline flex items-center gap-1">
              <Settings className="w-4 h-4" /> Edit
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {vendorMenuItems.map((item) => (
              <div
                key={item.id}
                className={cn(
                  "flex items-center gap-4 bg-white p-4 rounded-[2rem] border border-border/50 transition-all",
                  !item.isAvailable && "opacity-75 bg-secondary/30"
                )}
              >
                <div className="relative w-20 h-20 rounded-2xl overflow-hidden shrink-0">
                  <Image src={item.image} alt={item.name} fill className="object-cover" />
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex justify-between items-start mb-1 gap-2">
                    <h3 className="font-bold line-clamp-1">{item.name}</h3>
                    <span className="font-bold text-primary whitespace-nowrap">Tsh {item.price}</span>
                  </div>

                  <div className="flex items-center justify-between mt-3">
                    <span className={cn(
                      "text-xs font-bold px-2.5 py-1 rounded-full",
                      item.isAvailable ? "bg-primary/10 text-primary" : "bg-destructive/10 text-destructive"
                    )}>
                      {item.isAvailable ? "Available" : "Sold Out"}
                    </span>

                    <div className="flex items-center gap-2">
                      <span className="text-xs font-medium text-muted-foreground">In Stock</span>
                      <Switch
                        checked={item.isAvailable}
                        onCheckedChange={() => toggleItemAvailability(item.id)}
                        className="data-[state=checked]:bg-primary scale-90"
                      />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
