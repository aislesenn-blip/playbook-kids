import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { User, Order } from '@/types';

interface AppState {
  currentUser: User | null;
  setCurrentUser: (user: User | null) => void;
  selectedRegion: string;
  setSelectedRegion: (region: string) => void;
  cart: { productId: string; quantity: number }[];
  addToCart: (productId: string, quantity: number) => void;
  removeFromCart: (productId: string) => void;
  clearCart: () => void;
  orders: Order[];
  addOrder: (order: Order) => void;
  updateOrderStatus: (orderId: string, status: Order['status']) => void;
  pendingMessages: { vendorId: string; text: string }[];
  removePendingMessage: (vendorId: string) => void;
  initAuth: () => void;
}

export const useAppStore = create<AppState>()(
  persist(
    (set) => ({
      currentUser: null,
      setCurrentUser: (user) => set({ currentUser: user }),
      selectedRegion: 'Dodoma', // Updated to Dodoma as it's a major farming region
      setSelectedRegion: (region) => set({ selectedRegion: region }),
      cart: [],
      addToCart: (productId, quantity) => set((state) => {
        const existing = state.cart.find(item => item.productId === productId);
        if (existing) {
          return { cart: state.cart.map(item => item.productId === productId ? { ...item, quantity: item.quantity + quantity } : item) };
        }
        return { cart: [...state.cart, { productId, quantity }] };
      }),
      removeFromCart: (productId) => set((state) => ({ cart: state.cart.filter(item => item.productId !== productId) })),
      clearCart: () => set({ cart: [] }),
      orders: [],
      addOrder: (order) => set((state) => ({ orders: [...state.orders, order] })),
      updateOrderStatus: (orderId, status) => set((state) => ({
        orders: state.orders.map((o) => o.id === orderId ? { ...o, status } : o)
      })),
      pendingMessages: [],
      removePendingMessage: (vendorId) => set((state) => ({ pendingMessages: state.pendingMessages.filter(m => m.vendorId !== vendorId) })),
      initAuth: () => {},
    }),
    {
      name: 'unimonday-agri-marketplace-store',
    }
  )
);
