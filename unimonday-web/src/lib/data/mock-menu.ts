import { MenuItem } from "@/lib/store/cart-store";

export const MOCK_MENU: MenuItem[] = [
  {
    id: "1",
    name: "Wali Nyama Premium",
    description: "Rice with tender beef stew, served with a side of beans and fresh greens.",
    price: 3500,
    image: "https://images.unsplash.com/photo-1543339308-43e59d6b73a6?w=800&auto=format&fit=crop",
    vendorId: "v1"
  },
  {
    id: "2",
    name: "Chips Mayai (Zege)",
    description: "Classic Tanzanian street food. French fries omelet with a touch of chili.",
    price: 2500,
    image: "https://images.unsplash.com/photo-1610344589252-94ea4f9c158f?w=800&auto=format&fit=crop",
    vendorId: "v1"
  },
  {
    id: "3",
    name: "Fresh Mango Juice",
    description: "100% natural, freshly squeezed mango juice. No added sugar.",
    price: 1500,
    image: "https://images.unsplash.com/photo-1621263764928-df1444c5e859?w=800&auto=format&fit=crop",
    vendorId: "v2"
  },
  {
    id: "4",
    name: "Print Document (B&W)",
    description: "Standard A4 black and white printing. Price per 10 pages.",
    price: 1000,
    image: "https://images.unsplash.com/photo-1612815154858-60aa4c59eaa6?w=800&auto=format&fit=crop",
    vendorId: "v3"
  }
];
