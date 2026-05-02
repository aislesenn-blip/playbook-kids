import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { CartItem, Product, User } from '@/types'

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

  resetApp: () => void;
}

export const useAppStore = create<AppState>()(
  persist(
    (set, get) => ({
      currentUser: null,
      currentRegion: null,
      currentCampusName: null,
      isCartOpen: false,
      cart: [],

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

      resetApp: () => set({ currentUser: null, currentRegion: null, currentCampusName: null, isCartOpen: false, cart: [], pendingMessages: [] }),
    }),
    {
      name: 'unimonday-app-storage',
    }
  )
)
