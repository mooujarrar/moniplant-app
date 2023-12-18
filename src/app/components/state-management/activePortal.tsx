
// activePageStore.ts
import { create } from 'zustand';

interface ActivePortalStore {
  activePortal: string | null;
  setActivePortal: (active: string | null) => void;
}

export const useActivePortalStore = create<ActivePortalStore>((set) => ({
  activePortal: null,
  setActivePortal: (portal) => set({ activePortal: portal }),
}));