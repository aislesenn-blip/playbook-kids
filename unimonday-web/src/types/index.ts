export interface User {
  id: string;
  name: string;
  email: string;
  role: 'student' | 'stationary' | 'admin';
  avatarUrl?: string;
  region?: string;
  campusName?: string;
}

export interface StationaryPartner {
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
  printCostPerPage?: number;
  locationDetails?: string;
}

export interface DocumentTemplate {
  id: string;
  title: string;
  description: string;
  category: 'Letters' | 'Assignments' | 'CVs & Resumes' | 'Reports' | 'Forms';
  icon?: string;
  color?: string;
  popularity?: number;
}

export interface PrintJob {
  id: string;
  userId: string;
  stationaryId: string;
  documentTitle: string;
  pageCount: number;
  copies: number;
  color: boolean;
  totalCost: number;
  status: 'Pending' | 'Printing' | 'Ready' | 'Completed' | 'Cancelled';
  fileUrl?: string;
  createdAt: string;
  updatedAt?: string;
}
