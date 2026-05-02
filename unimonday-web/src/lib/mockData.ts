import { Product, Vendor, Campus } from '@/types';

export const mockCampuses: Campus[] = [
  { id: 'c1', name: 'UDSM - Main Campus', city: 'Dar es Salaam' },
  { id: 'c2', name: 'UDOM - Main Campus', city: 'Dodoma' },
  { id: 'c3', name: 'SUA - Main Campus', city: 'Morogoro' },
  { id: 'c4', name: 'CBE - Dar es Salaam', city: 'Dar es Salaam' },
];

export const mockVendors: Vendor[] = [
  {
    id: 'v1',
    userId: 'u2',
    storeName: 'TechZone UDSM',
    description: 'Best gadgets and phone repairs on campus.',
    logoUrl: 'https://images.unsplash.com/photo-1546868871-7041f2a55e12?q=80&w=2064&auto=format&fit=crop',
    rating: 4.8,
    campusId: 'c1',
    isVerified: true,
  },
  {
    id: 'v2',
    userId: 'u3',
    storeName: 'Campus Thrift',
    description: 'Fresh vintage clothes and sneakers.',
    logoUrl: 'https://images.unsplash.com/photo-1523381210434-271e8be1f52b?q=80&w=2070&auto=format&fit=crop',
    rating: 4.5,
    campusId: 'c1',
    isVerified: true,
  },
];

export const mockProducts: Product[] = [
  {
    id: 'p1',
    vendorId: 'v2',
    vendorName: 'Campus Thrift',
    name: 'Vintage Denim Jacket',
    description: 'Classic vintage denim jacket in excellent condition.',
    price: 35000,
    category: 'Fashion',
    images: ['https://images.unsplash.com/photo-1523381210434-271e8be1f52b?q=80&w=2070&auto=format&fit=crop'],
    inStock: true,
    rating: 4.9,
  },
  {
    id: 'p2',
    vendorId: 'v1',
    vendorName: 'TechZone UDSM',
    name: 'Pro Wireless Earbuds',
    description: 'High quality wireless earbuds with noise cancellation.',
    price: 45000,
    category: 'Tech',
    images: ['https://images.unsplash.com/photo-1546868871-7041f2a55e12?q=80&w=2064&auto=format&fit=crop'],
    inStock: true,
    rating: 4.8,
  },
  {
    id: 'p3',
    vendorId: 'v2',
    vendorName: 'Kicks TZ',
    name: 'Classic Urban Sneakers',
    description: 'Comfortable everyday sneakers.',
    price: 55000,
    category: 'Fashion',
    images: ['https://images.unsplash.com/photo-1543163521-1bf539c55dd2?q=80&w=2080&auto=format&fit=crop'],
    inStock: true,
    rating: 4.7,
  },
];
