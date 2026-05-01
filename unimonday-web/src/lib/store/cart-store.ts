"use client";

import { create } from 'zustand';

export interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  vendorId: string;
}

export interface CartItem extends MenuItem {
  quantity: number;
}

interface CartState {
  items: CartItem[];
  addItem: (item: MenuItem) => void;
  removeItem: (id: string) => void;
  clearCart: () => void;
  total: number;
}

export const useCartStore = create<CartState>((set, get) => ({
  items: [],
  total: 0,
  addItem: (item) => {
    const { items } = get();
    const existing = items.find(i => i.id === item.id);
    let newItems;
    if (existing) {
      newItems = items.map(i => i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i);
    } else {
      newItems = [...items, { ...item, quantity: 1 }];
    }
    const newTotal = newItems.reduce((sum, i) => sum + (i.price * i.quantity), 0);
    set({ items: newItems, total: newTotal });
  },
  removeItem: (id) => {
    const { items } = get();
    const existing = items.find(i => i.id === id);
    if (!existing) return;

    let newItems;
    if (existing.quantity > 1) {
      newItems = items.map(i => i.id === id ? { ...i, quantity: i.quantity - 1 } : i);
    } else {
      newItems = items.filter(i => i.id !== id);
    }
    const newTotal = newItems.reduce((sum, i) => sum + (i.price * i.quantity), 0);
    set({ items: newItems, total: newTotal });
  },
  clearCart: () => set({ items: [], total: 0 }),
}));
