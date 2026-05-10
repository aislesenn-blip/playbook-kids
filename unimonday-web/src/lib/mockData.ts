import { AgriProduct, AgriVendor } from '@/types';

export const products: AgriProduct[] = [
  {
    id: "prod-1",
    vendorId: "vendor-1",
    title: "Massey Ferguson Tractor 385",
    description: "Heavy duty tractor available for daily rental. Perfect for large scale plowing.",
    category: "Tractors",
    price: 150000,
    unit: "per day",
    imageUrl: "https://images.unsplash.com/photo-1592982537447-6f2a6a0a0b2d?q=80&w=1000&auto=format&fit=crop",
    inStock: true,
    popularity: 98
  },
  {
    id: "prod-2",
    vendorId: "vendor-2",
    title: "YaraMila Cereal Fertilizer (50kg)",
    description: "High quality NPK fertilizer optimized for maize and wheat farming.",
    category: "Fertilizers",
    price: 85000,
    unit: "per bag",
    imageUrl: "https://images.unsplash.com/photo-1628352081506-83c43123ed6d?q=80&w=1000&auto=format&fit=crop",
    inStock: true,
    popularity: 95
  },
  {
    id: "prod-3",
    vendorId: "vendor-2",
    title: "Pioneer Hybrid Maize Seeds",
    description: "Drought resistant maize seeds with high yield potential.",
    category: "Seeds",
    price: 35000,
    unit: "per 2kg",
    imageUrl: "https://images.unsplash.com/photo-1574323347407-f5e1ad6d992a?q=80&w=1000&auto=format&fit=crop",
    inStock: true,
    popularity: 92
  },
  {
    id: "prod-4",
    vendorId: "vendor-3",
    title: "Premium Grade Wheat",
    description: "Freshly harvested premium wheat ready for milling.",
    category: "Produce",
    price: 120000,
    unit: "per 100kg",
    imageUrl: "https://images.unsplash.com/photo-1574323347407-f5e1ad6d992a?q=80&w=1000&auto=format&fit=crop",
    inStock: true,
    popularity: 88
  }
];

export const vendors: AgriVendor[] = [
  {
    id: "vendor-1",
    storeName: "AgriTech Equipment Rentals",
    storeSlug: "agritech-rentals",
    description: "Top provider of agricultural machinery and equipment for rent.",
    logoUrl: "https://images.unsplash.com/photo-1586771107445-d3ca888129ff?q=80&w=200&auto=format&fit=crop",
    bannerUrl: "https://images.unsplash.com/photo-1592982537447-6f2a6a0a0b2d?q=80&w=1000&auto=format&fit=crop",
    rating: 4.8,
    region: "Dodoma",
    isVerified: true,
    locationDetails: "Plot 45, Nzuguni Industrial Area"
  },
  {
    id: "vendor-2",
    storeName: "Kilimo Kwanza Supplies",
    storeSlug: "kilimo-kwanza",
    description: "Your one-stop shop for certified seeds and fertilizers.",
    logoUrl: "https://images.unsplash.com/photo-1628352081506-83c43123ed6d?q=80&w=200&auto=format&fit=crop",
    rating: 4.5,
    region: "Morogoro",
    isVerified: true,
    locationDetails: "Sokoine Road, near Central Market"
  },
  {
    id: "vendor-3",
    storeName: "Highland Farmers Market",
    storeSlug: "highland-farmers",
    description: "Direct sales of fresh produce from trusted local farmers.",
    rating: 4.9,
    region: "Mbeya",
    isVerified: true,
    locationDetails: "Uyole Agriculture Center"
  }
];
