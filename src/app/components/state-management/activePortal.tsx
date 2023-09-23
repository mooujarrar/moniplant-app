import { create } from 'zustand'

const useStore = create((set) => ({
  active: null,
  setActive: (active: string | null) => set(() => ({ active: active })),
}))

export default useStore;