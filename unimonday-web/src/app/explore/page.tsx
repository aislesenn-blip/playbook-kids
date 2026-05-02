"use client";

import { useVendorStore } from "@/lib/store/vendor-store";
import Image from "next/image";
import Link from "next/link";
import { useAppStore } from "@/lib/store/app-store";
import { Store, Printer, Coffee, MapPin, Clock, Search, Shirt, Smartphone } from "lucide-react";
import { useState, useMemo } from "react";

const CATEGORIES = ["All", "Food", "Fashion", "Tech", "Stationery", "Grocery", "Services"];

const getCategoryIcon = (category: string) => {
  switch (category) {
    case "Food": return <Coffee className="w-4 h-4" />;
    case "Fashion": return <Shirt className="w-4 h-4" />;
    case "Tech": return <Smartphone className="w-4 h-4" />;
    case "Stationery": return <Printer className="w-4 h-4" />;
    default: return <Store className="w-4 h-4" />;
  }
};

export default function ExplorePage() {
  const { currentCampus } = useAppStore();
  const { vendors } = useVendorStore();

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  // Filter vendors by selected campus, search query, and category
  const displayVendors = useMemo(() => {
    let filtered = currentCampus ? vendors.filter(v => v.campusId === currentCampus.id) : vendors;

    if (selectedCategory !== "All") {
      filtered = filtered.filter(v => v.category === selectedCategory);
    }

    if (searchQuery.trim() !== "") {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(v =>
        v.name.toLowerCase().includes(query) ||
        v.category.toLowerCase().includes(query)
      );
    }

    return filtered;
  }, [vendors, currentCampus, selectedCategory, searchQuery]);

  return (
    <div className="pb-24 max-w-5xl mx-auto">
      <div className="mb-8 pt-4">
        <h1 className="text-4xl sm:text-5xl font-black tracking-tight mb-3">Explore</h1>
        <p className="text-muted-foreground text-lg font-medium mb-6">
          {currentCampus ? `Showing spots at ${currentCampus.name}` : "Select a campus to see nearby spots."}
        </p>

        {/* Search Bar */}
        <div className="relative mb-6">
          <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
            <Search className="w-5 h-5 text-muted-foreground" />
          </div>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search for stores, food, tech..."
            className="w-full pl-12 pr-4 py-4 rounded-2xl bg-white border border-border/50 shadow-sm focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all font-medium text-lg"
          />
        </div>

        {/* Category Filters (Horizontal Scroll) */}
        <div className="flex overflow-x-auto pb-4 gap-3 hide-scrollbar w-full" style={{ scrollbarWidth: 'thin' }}>
          {CATEGORIES.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`flex items-center gap-2 px-5 py-3 rounded-full font-bold text-sm whitespace-nowrap transition-colors border ${
                selectedCategory === category
                  ? "bg-primary text-white border-primary shadow-md"
                  : "bg-white text-gray-700 border-border/50 hover:bg-gray-50"
              }`}
            >
              {category !== "All" && getCategoryIcon(category)}
              {category}
            </button>
          ))}
        </div>
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
                       {getCategoryIcon(vendor.category)}
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

      {displayVendors.length === 0 && (
         <div className="text-center py-20 bg-white rounded-[2rem] border border-border/50 shadow-sm">
           <Search className="w-16 h-16 text-muted-foreground/30 mx-auto mb-4" />
           <h2 className="text-2xl font-bold mb-2">No spots found</h2>
           <p className="text-muted-foreground font-medium">Try adjusting your search or category filter.</p>
         </div>
      )}
    </div>
  );
}
