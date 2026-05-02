export interface Campus {
  id: string;
  name: string;
  city: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  phone?: string;
  role: 'student' | 'vendor' | 'admin';
  avatarUrl?: string;
  campusId?: string;
  universityName?: string;
  region?: string;
}

export interface Vendor {
  id: string;
  userId: string;
  storeName: string;
  description: string;
  logoUrl?: string;
  bannerUrl?: string;
  rating: number;
  campusId: string;
  isVerified: boolean;
}

export interface Product {
  id: string;
  vendorId: string;
  vendorName: string;
  name: string;
  description: string;
  price: number;
  originalPrice?: number;
  category: 'Fashion' | 'Tech' | 'Services' | 'Groceries' | 'Other';
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
  id: string;
  userId: string;
  vendorId: string;
  items: CartItem[];
  totalAmount: number;
  deliveryFee: number;
  status: 'Pending' | 'Paid' | 'Processing' | 'In Transit' | 'Delivered' | 'Cancelled';
  createdAt: string;
  updatedAt: string;
}
