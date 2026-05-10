import { create } from 'zustand'
import { supabase } from "@/lib/supabase/client"
import { persist } from 'zustand/middleware'
import { CartItem, Product, User, Order, Creator, Video, Transaction } from '@/types'
import { mockCreator, mockVideos } from '@/lib/mockData'

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

  // ContentBuddy State (Mock)
  creators: Creator[];
  videos: Video[];
  unlockedVideoIds: string[]; // For frictionless fan flow
  transactions: Transaction[];
  activeTimePasses: Record<string, string>; // creatorId -> expiry timestamp string

  // ContentBuddy Actions
  unlockVideo: (videoId: string, fanPhoneNumber: string) => void;
  purchaseTimePass: (creatorId: string, fanPhoneNumber: string) => void;
  addVideo: (video: Video) => void;
  requestWithdrawal: (creatorId: string, amount: number) => void;

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

      // ContentBuddy initial state
      creators: [mockCreator],
      videos: mockVideos,
      unlockedVideoIds: [],
      transactions: [],
      activeTimePasses: {},

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

      // ContentBuddy Actions
      unlockVideo: (videoId, fanPhoneNumber) => set((state) => {
        const video = state.videos.find(v => v.id === videoId);
        if (!video) return state;

        const creator = state.creators.find(c => c.id === video.creatorId);
        if (!creator) return state;

        // 80/20 split
        const creatorShare = video.price * 0.8;
        const platformShare = video.price * 0.2;

        const transaction: Transaction = {
          id: crypto.randomUUID(),
          fanPhoneNumber,
          creatorId: creator.id,
          videoId: video.id,
          isTimePass: false,
          amount: video.price,
          creatorShare,
          platformShare,
          status: 'Success',
          createdAt: new Date().toISOString()
        };

        const updatedCreators = state.creators.map(c =>
          c.id === creator.id ? { ...c, walletBalance: c.walletBalance + creatorShare } : c
        );

        return {
          unlockedVideoIds: [...new Set([...state.unlockedVideoIds, videoId])],
          transactions: [transaction, ...state.transactions],
          creators: updatedCreators
        };
      }),

      purchaseTimePass: (creatorId, fanPhoneNumber) => set((state) => {
        const creator = state.creators.find(c => c.id === creatorId);
        if (!creator) return state;

        const amount = creator.timePassPrice;
        const creatorShare = amount * 0.8;
        const platformShare = amount * 0.2;

        const transaction: Transaction = {
          id: crypto.randomUUID(),
          fanPhoneNumber,
          creatorId: creator.id,
          isTimePass: true,
          amount,
          creatorShare,
          platformShare,
          status: 'Success',
          createdAt: new Date().toISOString()
        };

        const expiryDate = new Date();
        expiryDate.setDate(expiryDate.getDate() + creator.timePassDurationDays);

        const updatedCreators = state.creators.map(c =>
          c.id === creator.id ? { ...c, walletBalance: c.walletBalance + creatorShare } : c
        );

        return {
          activeTimePasses: {
            ...state.activeTimePasses,
            [creator.id]: expiryDate.toISOString()
          },
          transactions: [transaction, ...state.transactions],
          creators: updatedCreators
        };
      }),

      addVideo: (video) => set((state) => ({
        videos: [video, ...state.videos]
      })),

      requestWithdrawal: (creatorId, amount) => set((state) => {
        const creator = state.creators.find(c => c.id === creatorId);
        if (!creator || creator.walletBalance < amount) return state; // Incomplete/failed

        const updatedCreators = state.creators.map(c =>
          c.id === creator.id ? { ...c, walletBalance: c.walletBalance - amount } : c
        );

        return { creators: updatedCreators };
      }),

      resetApp: () => set({
        currentUser: null, currentRegion: null, currentCampusName: null,
        isCartOpen: false, cart: [], pendingMessages: [], orders: [], vendorProducts: [],
        unlockedVideoIds: [], activeTimePasses: {}, transactions: []
      }),

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
          // Do nothing on INITIAL_SESSION if there's no session, to preserve our mock persisted state!
        });
      }
    }),
    {
      name: 'unimonday-app-storage',
    }
  )
)
