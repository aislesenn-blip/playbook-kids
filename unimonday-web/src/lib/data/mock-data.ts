export interface Vendor {
  id: string;
  name: string;
  category: "Food" | "Stationery" | "Grocery";
  campusId: string;
  image: string;
  isOpen: boolean;
  statusText?: string;
}

export const MOCK_VENDORS: Vendor[] = [
  {
    id: "v1",
    name: "Cafe Ubuntu",
    category: "Food",
    campusId: "udsm-main",
    image: "https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=800&auto=format&fit=crop",
    isOpen: true,
  },
  {
    id: "v2",
    name: "UDBS Canteen",
    category: "Food",
    campusId: "udsm-main",
    image: "https://images.unsplash.com/photo-1590846406792-0adc7f928f1e?w=800&auto=format&fit=crop",
    isOpen: false,
    statusText: "Order Full",
  },
  {
    id: "v3",
    name: "Speedy PrintStation",
    category: "Stationery",
    campusId: "udsm-main",
    image: "https://images.unsplash.com/photo-1562564055-71e051d33c19?w=800&auto=format&fit=crop",
    isOpen: true,
  }
];

export interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  vendorId: string;
  isAvailable: boolean;
}

export const MOCK_MENU: MenuItem[] = [
  {
    id: "1",
    name: "Wali Nyama Premium",
    description: "Rice with tender beef stew, served with a side of beans and fresh greens.",
    price: 3500,
    image: "https://images.unsplash.com/photo-1543339308-43e59d6b73a6?w=800&auto=format&fit=crop",
    vendorId: "v1",
    isAvailable: true
  },
  {
    id: "2",
    name: "Chips Mayai (Zege)",
    description: "Classic Tanzanian street food. French fries omelet with a touch of chili.",
    price: 2500,
    image: "https://images.unsplash.com/photo-1623653387945-2fd25214f8fc?w=800&auto=format&fit=crop",
    vendorId: "v1",
    isAvailable: true
  },
  {
    id: "3",
    name: "Fresh Mango Juice",
    description: "100% natural, freshly squeezed mango juice. No added sugar.",
    price: 1500,
    image: "https://images.unsplash.com/photo-1621263764928-df1444c5e859?w=800&auto=format&fit=crop",
    vendorId: "v1",
    isAvailable: false
  },
  {
    id: "4",
    name: "Print Document (B&W)",
    description: "Standard A4 black and white printing. Price per 10 pages.",
    price: 1000,
    image: "https://images.unsplash.com/photo-1612815154858-60aa4c59eaa6?w=800&auto=format&fit=crop",
    vendorId: "v3",
    isAvailable: true
  }
];
