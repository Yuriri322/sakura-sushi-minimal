import { create } from 'zustand';

interface MenuFilterState {
  selectedCategory: string | null;
  setSelectedCategory: (categoryId: string | null) => void;
}

export const useMenuFilterStore = create<MenuFilterState>()((set) => ({
  selectedCategory: null,
  setSelectedCategory: (categoryId) => set({ selectedCategory: categoryId }),
}));