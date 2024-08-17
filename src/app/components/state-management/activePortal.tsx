
// activePageStore.ts
import { create } from 'zustand';

interface PortalStore {
  activePortal: string | null;
  hoveredPortal: string | null;
  setActivePortal: (active: string | null) => void;
  setHoveredPortal: (hovered: string | null) => void;
}

export const usePortalStore = create<PortalStore>((set) => ({
  activePortal: null,
  hoveredPortal: null,
  setActivePortal: (portal) => set({ activePortal: portal }),
  setHoveredPortal: (portal) => set({ hoveredPortal: portal }),
}));