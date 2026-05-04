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
  storeSlug: string;
  description: string;
  logoUrl?: string;
  bannerUrl?: string;
  rating: number;
  region: string;
  campusName: string;
  isVerified: boolean;
  paymentAndDeliveryInfo?: string;
  paymentNumber?: string;
  paymentPolicy?: string;
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

export interface DocumentBlock {
  id: string;
  type: 'heading' | 'paragraph' | 'table' | 'list';
  content: string; // The HTML or JSON content of this chunk
  isEditing?: boolean;
  isHighlighting?: boolean; // For the dopamine feedback effect
}

export interface WorkspaceDocument {
  id: string;
  title: string;
  blocks: DocumentBlock[];
  updatedAt: string;
}
