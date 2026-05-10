export interface User {
  id: string;
  name: string;
  email: string;
  role: 'farmer' | 'vendor' | 'buyer' | 'admin';
  avatarUrl?: string;
  region?: string;
  farmLocation?: string;
}

export interface AgriVendor {
  id: string;
  userId?: string;
  storeName: string;
  storeSlug: string;
  description: string;
  logoUrl?: string;
  bannerUrl?: string;
  rating: number;
  region: string;
  isVerified: boolean;
  locationDetails?: string;
}

export interface AgriProduct {
  id: string;
  vendorId: string;
  title: string;
  description: string;
  category: 'Tractors' | 'Fertilizers' | 'Seeds' | 'Produce' | 'Equipment';
  price: number;
  unit: string;
  imageUrl?: string;
  inStock: boolean;
  popularity?: number;
}

export interface Order {
  id: string;
  userId: string;
  vendorId: string;
  items: { productId: string; quantity: number }[];
  totalCost: number;
  status: 'Pending' | 'Processing' | 'Ready' | 'Completed' | 'Cancelled';
  createdAt: string;
  updatedAt?: string;
}
