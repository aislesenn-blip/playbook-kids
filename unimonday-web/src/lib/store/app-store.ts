import { create } from 'zustand'
import { supabase } from "@/lib/supabase/client"
import { persist } from 'zustand/middleware'
import { CartItem, Product, User, Order } from '@/types'

interface AppState {
  currentUser: User | null;
  currentRegion: string | null;
  currentCampusName: string | null;
  isCartOpen: boolean;
  cart: CartItem[];

  // Auth Actions
  setUser: (user: User | null) => void;
  setLocation: (region: string, campusName: string) => void;

  // Cart Actions
  toggleCart: () => void;
  addToCart: (product: Product, quantity?: number) => void;
  removeFromCart: (itemId: string) => void;
  updateQuantity: (itemId: string, quantity: number) => void;
  clearCart: () => void;

  // Computed
  getCartTotal: () => number;
  getCartCount: () => number;

  // Chat Automation
  pendingMessages: { vendorId: string, text: string }[];
  addPendingMessage: (vendorId: string, text: string) => void;
  removePendingMessage: (vendorId: string) => void;

  // Orders State (Mock)
  orders: Order[];
  vendorProducts: Product[];
  addVendorProduct: (product: Product) => void;
  addOrder: (order: Order) => void;
  updateOrderStatus: (orderId: string, status: "Pending" | "Paid" | "Processing" | "In Transit" | "Delivered" | "Cancelled") => void;

  resetApp: () => void;
  initAuth: () => void;
}

export const useAppStore = create<AppState>()(
  persist(
    (set, get) => ({
      currentUser: null,
      currentRegion: null,
      currentCampusName: null,
      isCartOpen: false,
      cart: [],
      orders: [],
      vendorProducts: [],

      setUser: (user) => set({ currentUser: user }),
      setLocation: (region, campusName) => set({ currentRegion: region, currentCampusName: campusName }),

      toggleCart: () => set((state) => ({ isCartOpen: !state.isCartOpen })),

      addToCart: (product, quantity = 1) => set((state) => {
        const existingItem = state.cart.find((item) => item.product.id === product.id);
        if (existingItem) {
          return {
            cart: state.cart.map((item) =>
              item.product.id === product.id
                ? { ...item, quantity: item.quantity + quantity }
                : item
            ),
            isCartOpen: true,
          };
        }
        return {
          cart: [...state.cart, { id: crypto.randomUUID(), product, quantity }],
          isCartOpen: true,
        };
      }),

      removeFromCart: (itemId) => set((state) => ({
        cart: state.cart.filter((item) => item.id !== itemId),
      })),

      updateQuantity: (itemId, quantity) => set((state) => ({
        cart: state.cart.map((item) =>
          item.id === itemId ? { ...item, quantity: Math.max(1, quantity) } : item
        ),
      })),

      clearCart: () => set({ cart: [] }),

      getCartTotal: () => {
        return get().cart.reduce((total, item) => total + (item.product.price * item.quantity), 0);
      },

      getCartCount: () => {
         return get().cart.reduce((count, item) => count + item.quantity, 0);
      },

      pendingMessages: [],
      addPendingMessage: (vendorId, text) => set((state) => ({
        pendingMessages: [...state.pendingMessages, { vendorId, text }]
      })),
      removePendingMessage: (vendorId) => set((state) => ({
        pendingMessages: state.pendingMessages.filter(msg => msg.vendorId !== vendorId)
      })),

      addVendorProduct: (product) => set((state) => ({ vendorProducts: [product, ...state.vendorProducts] })),
      addOrder: (order) => set((state) => ({
        orders: [order, ...state.orders]
      })),
      updateOrderStatus: (orderId, status) => set((state) => ({
        orders: state.orders.map(o => o.id === orderId ? { ...o, status } : o)
      })),

      resetApp: () => set({ currentUser: null, currentRegion: null, currentCampusName: null, isCartOpen: false, cart: [], pendingMessages: [], orders: [], vendorProducts: [] }),

      initAuth: () => {
        supabase.auth.onAuthStateChange((event, session) => {
          if (event === 'SIGNED_IN' || event === 'TOKEN_REFRESHED') {
            if (session?.user) {
              const userMeta = session.user.user_metadata || {};
              set({
                currentUser: {
                  id: session.user.id,
                  name: userMeta.name || "Student User",
                  email: session.user.email || "",
                  role: userMeta.role || "student",
                  region: userMeta.region || "Dar es Salaam",
                  campusName: userMeta.campusName || "UDSM - Main Campus"
                },
                currentRegion: userMeta.region || "Dar es Salaam",
                currentCampusName: userMeta.campusName || "UDSM - Main Campus"
              });
            }
          } else if (event === 'SIGNED_OUT') {
            set({ currentUser: null });
          }
        });
      }
    }),
    {
      name: 'unimonday-app-storage',
    }
  )
)
