"use client";

import { useVendorStore } from "@/lib/store/vendor-store";
import Image from "next/image";
import Link from "next/link";
import { useAppStore } from "@/lib/store/app-store";
import { Store, Printer, Coffee, MapPin, Clock } from "lucide-react";

export default function ExplorePage() {
  const { currentCampus } = useAppStore();
  const { vendors } = useVendorStore();

  // Filter vendors by selected campus (or show all if none selected for demo)
  const displayVendors = currentCampus ? vendors.filter(v => v.campusId === currentCampus.id) : vendors;

  return (
    <div className="pb-24 max-w-5xl mx-auto">
      <div className="mb-10 pt-4">
        <h1 className="text-4xl sm:text-5xl font-black tracking-tight mb-3">Explore</h1>
        <p className="text-muted-foreground text-lg font-medium">
          {currentCampus ? `Showing spots at ${currentCampus.name}` : "Select a campus to see nearby spots."}
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {displayVendors.map((vendor) => {
          return (
            <Link
              key={vendor.id}
              href={`/explore/${vendor.id}`}
              className="bg-white rounded-[2rem] overflow-hidden border border-border/50 shadow-sm hover:shadow-xl transition-all group block relative"
            >
              <div className="relative h-56 w-full overflow-hidden">
                <Image
                  src={vendor.image}
                  alt={vendor.name}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

                {/* Badges */}
                <div className="absolute top-4 left-4 flex gap-2">
                   {vendor.isOpen ? (
                      <div className="bg-primary px-3 py-1 rounded-full text-white text-xs font-bold shadow-sm shadow-black/20">
                        Open
                      </div>
                   ) : (
                      <div className="bg-destructive px-3 py-1 rounded-full text-white text-xs font-bold shadow-sm shadow-black/20">
                        {vendor.statusText || "Closed"}
                      </div>
                   )}
                </div>

                <div className="absolute bottom-4 left-4 right-4 text-white">
                   <h3 className="font-bold text-2xl mb-2 drop-shadow-md">{vendor.name}</h3>
                   <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-xs font-medium opacity-90 drop-shadow-sm">
                     <div className="flex items-center gap-1.5">
                       {vendor.category === "Food" && <Coffee className="w-3.5 h-3.5" />}
                       {vendor.category === "Stationery" && <Printer className="w-3.5 h-3.5" />}
                       {vendor.category === "Grocery" && <Store className="w-3.5 h-3.5" />}
                       <span>{vendor.category}</span>
                     </div>
                     <div className="flex items-center gap-1.5">
                       <MapPin className="w-3.5 h-3.5" />
                       <span>{currentCampus ? currentCampus.name : 'University Campus'}</span>
                     </div>
                     <div className="flex items-center gap-1.5">
                       <Clock className="w-3.5 h-3.5" />
                       <span>{vendor.isOpen ? 'Closes at 8 PM' : 'Opens 8 AM'}</span>
                     </div>
                   </div>
                </div>
              </div>
            </Link>
          );
        })}
      </div>

      {displayVendors.length === 0 && currentCampus && (
         <div className="text-center py-20">
           <Store className="w-16 h-16 text-muted-foreground/30 mx-auto mb-4" />
           <h2 className="text-2xl font-bold mb-2">No spots found</h2>
           <p className="text-muted-foreground">We haven&apos;t launched at this campus yet.</p>
         </div>
      )}
    </div>
  );
}
