import { create } from 'zustand';
import { MOCK_VENDORS, MOCK_MENU } from '@/lib/data/mock-data';

type VendorStore = {
  vendors: typeof MOCK_VENDORS;
  menuItems: typeof MOCK_MENU;
  toggleStoreStatus: (vendorId: string) => void;
  toggleItemAvailability: (itemId: string) => void;
};

export const useVendorStore = create<VendorStore>((set) => ({
  vendors: MOCK_VENDORS,
  menuItems: MOCK_MENU,
  toggleStoreStatus: (vendorId) => set((state) => ({
    vendors: state.vendors.map((v) =>
      v.id === vendorId ? {
        ...v,
        isOpen: !v.isOpen,
        statusText: !v.isOpen ? "Open" : "Closed"
      } : v
    )
  })),
  toggleItemAvailability: (itemId) => set((state) => ({
    menuItems: state.menuItems.map((item) =>
      item.id === itemId ? { ...item, isAvailable: !item.isAvailable } : item
    )
  }))
}));
