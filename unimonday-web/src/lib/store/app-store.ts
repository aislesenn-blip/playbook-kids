import { create } from 'zustand'
import { supabase } from "@/lib/supabase/client"
import { persist } from 'zustand/middleware'
import { CartItem, Product, User, Order, WorkspaceDocument, DocumentBlock } from '@/types'

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

  // Workspace Architecture
  activeDocument: WorkspaceDocument | null;
  setActiveDocument: (doc: WorkspaceDocument | null) => void;
  updateDocumentBlock: (blockId: string, updates: Partial<DocumentBlock>) => void;
  addDocumentBlock: (block: DocumentBlock, afterBlockId?: string) => void;
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


      // Workspace Actions
      activeDocument: null,
      setActiveDocument: (doc) => set({ activeDocument: doc }),
      updateDocumentBlock: (blockId, updates) => set((state) => {
        if (!state.activeDocument) return state;
        return {
          activeDocument: {
            ...state.activeDocument,
            blocks: state.activeDocument.blocks.map(block =>
              block.id === blockId ? { ...block, ...updates } : block
            )
          }
        };
      }),
      addDocumentBlock: (block, afterBlockId) => set((state) => {
        if (!state.activeDocument) return state;
        const blocks = [...state.activeDocument.blocks];
        if (afterBlockId) {
          const index = blocks.findIndex(b => b.id === afterBlockId);
          if (index !== -1) {
            blocks.splice(index + 1, 0, block);
          } else {
            blocks.push(block);
          }
        } else {
          blocks.push(block);
        }
        return {
          activeDocument: {
            ...state.activeDocument,
            blocks
          }
        };
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
                  campusName: userMeta.campusName || "Global"
                },
                currentRegion: userMeta.region || "Dar es Salaam",
                currentCampusName: userMeta.campusName || "Global"
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
