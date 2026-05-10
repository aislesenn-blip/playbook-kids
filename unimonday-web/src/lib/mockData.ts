import { Product, Vendor, Creator, Video } from '@/types';

export const mockVendors: Vendor[] = [
  {
    id: 'v1',
    userId: 'u2',
    storeName: 'TechZone UDSM',
    storeSlug: 'store-1',
    description: 'Best gadgets and phone repairs on campus.',
    logoUrl: 'https://images.unsplash.com/photo-1546868871-7041f2a55e12?q=80&w=2064&auto=format&fit=crop',
    rating: 4.8,
    region: 'Dar es Salaam',
    campusName: 'HQ',
    isVerified: true,
    paymentAndDeliveryInfo: 'Free Delivery around Dar es Salaam. Pay on Delivery or via Mobile Money.',
  },
  {
    id: 'v2',
    userId: 'u3',
    storeName: 'Campus Thrift',
    storeSlug: 'store-2',
    description: 'Fresh vintage clothes and sneakers.',
    logoUrl: 'https://images.unsplash.com/photo-1523381210434-271e8be1f52b?q=80&w=2070&auto=format&fit=crop',
    rating: 4.5,
    region: 'Dar es Salaam',
    campusName: 'HQ',
    isVerified: true,
    paymentAndDeliveryInfo: 'Delivery depends on where you are. Mobile money preferred.',
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
    category: 'Fashion & Apparels',
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
    category: 'Tech & Accessories',
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
    category: 'Fashion & Apparels',
    images: ['https://images.unsplash.com/photo-1543163521-1bf539c55dd2?q=80&w=2080&auto=format&fit=crop'],
    inStock: true,
    rating: 4.7,
  },
];

export const mockCreator: Creator = {
  id: 'c1',
  userId: 'u4',
  username: 'mkojani',
  displayName: 'Mkojani TV',
  bio: 'The home of exclusive, premium Swahili comedy and behind-the-scenes content you won\'t find anywhere else.',
  profileImageUrl: 'https://images.unsplash.com/photo-1531384441138-2736e62e0919?q=80&w=2000&auto=format&fit=crop', // African man smiling
  coverImageUrl: 'https://images.unsplash.com/photo-1598899134739-24c46f58b8c0?q=80&w=2000&auto=format&fit=crop', // Cinema/movie set
  isVerified: true,
  walletBalance: 250000,
  timePassPrice: 3000,
  timePassDurationDays: 7
};

export const mockVideos: Video[] = [
  {
    id: 'vid1',
    creatorId: 'c1',
    title: 'Mkojani: The Untold Story (Part 1)',
    description: 'Exclusive first look at the behind the scenes of my upcoming movie. Real drama, no cuts.',
    thumbnailUrl: 'https://images.unsplash.com/photo-1536440136628-849c177e76a1?q=80&w=2000&auto=format&fit=crop',
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4', // Safe mock video
    trailerUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
    price: 2000,
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 2).toISOString(), // 2 days ago
    views: 1250
  },
  {
    id: 'vid2',
    creatorId: 'c1',
    title: 'Vunja Mbavu: Live at Mlimani City',
    description: 'Full unedited standup comedy show live from Dar es Salaam.',
    thumbnailUrl: 'https://images.unsplash.com/photo-1516280440502-124b8d76e78b?q=80&w=2000&auto=format&fit=crop',
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4',
    trailerUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4',
    price: 5000,
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 10).toISOString(), // 10 days ago
    views: 4500
  }
];
