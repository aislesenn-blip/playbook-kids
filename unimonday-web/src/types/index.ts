export interface User {
  id: string;
  name: string;
  email: string;
  role: 'student' | 'vendor' | 'admin';
  avatarUrl?: string;
  region?: string;
  campusName?: string;
}

export interface Vendor {
  id: string;
  userId?: string;
  storeName: string;
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
