export interface User {
  id: string;
  name: string;
  email: string;
  role: 'student' | 'vendor' | 'admin' | 'creator' | 'fan';
  avatarUrl?: string;
  region?: string;
  campusName?: string;
}

export interface Vendor {
  id: string;
  userId?: string;
  storeName: string;
  storeSlug: string;
  description: string;
  logoUrl?: string;
  bannerUrl?: string;
  rating: number;
  region: string;
  campusName: string;
  isVerified: boolean;
  paymentAndDeliveryInfo?: string;
}

export interface Product {
  id: string;
  vendorId?: string;
  vendorName: string;
  name: string;
  description: string;
  price: number;
  originalPrice?: number;
  category: 'Fashion & Apparels' | 'Tech & Accessories' | 'Beauty & Cosmetics' | 'Home & Decor' | 'Services';
  images: string[];
  inStock: boolean;
  rating?: number;
}

export interface CartItem {
  id: string;
  product: Product;
  quantity: number;
  selectedOptions?: Record<string, string>;
}

export interface Order {
  type?: string;
  title?: string;
  vendor?: string;
  price?: string;
  image?: string;
  date?: string;
  id: string;
  userId?: string;
  vendorId?: string;
  items?: CartItem[];
  totalAmount?: number;
  deliveryFee?: number;
  status: 'Pending' | 'Paid' | 'Processing' | 'In Transit' | 'Delivered' | 'Cancelled';
  createdAt?: string;
  updatedAt?: string;
}

export interface Creator {
  id: string;
  userId: string;
  username: string; // Used for contentbuddy.com/[username]
  displayName: string;
  bio: string;
  profileImageUrl: string;
  coverImageUrl: string;
  isVerified: boolean;
  walletBalance: number;
  timePassPrice: number; // e.g. 3000 TZS per week
  timePassDurationDays: number; // e.g. 7 days
}

export interface Video {
  id: string;
  creatorId: string;
  title: string;
  description: string;
  thumbnailUrl: string;
  videoUrl: string; // The Bunny.net secure URL
  trailerUrl?: string; // 10-second free trailer
  price: number; // Pay-Per-View price
  createdAt: string;
  views: number;
}

export interface Transaction {
  id: string;
  fanId?: string; // Optional if guest checkout
  fanPhoneNumber: string;
  creatorId: string;
  videoId?: string; // If Pay-Per-View
  isTimePass: boolean;
  amount: number;
  creatorShare: number; // 80%
  platformShare: number; // 20%
  status: 'Pending' | 'Success' | 'Failed';
  createdAt: string;
}
