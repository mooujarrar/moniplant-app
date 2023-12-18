export enum EPage {
    HOME,
    CONFIG,
    MONITOR,
}

// activePageStore.ts
import { create } from 'zustand';

interface ActivePageStore {
    activePage: EPage;
    setActivePage: (page: EPage) => void;
}

export const useActivePageStore = create<ActivePageStore>((set) => ({
    activePage: EPage.HOME,
    setActivePage: (page) => set({ activePage: page }),
}));