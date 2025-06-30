import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export const useBrandStore = create(
  persist(
    (set, get) => ({
      brands: [],
      currentBrand: null,
      
      addBrand: (brand) => {
        const newBrand = {
          id: Date.now().toString(),
          createdAt: new Date().toISOString(),
          ...brand
        };
        set((state) => ({
          brands: [...state.brands, newBrand],
          currentBrand: newBrand
        }));
        return newBrand;
      },
      
      updateBrand: (brandId, updates) => {
        set((state) => ({
          brands: state.brands.map(brand => 
            brand.id === brandId ? { ...brand, ...updates } : brand
          ),
          currentBrand: state.currentBrand?.id === brandId 
            ? { ...state.currentBrand, ...updates }
            : state.currentBrand
        }));
      },
      
      setCurrentBrand: (brand) => {
        set({ currentBrand: brand });
      },
      
      deleteBrand: (brandId) => {
        set((state) => ({
          brands: state.brands.filter(brand => brand.id !== brandId),
          currentBrand: state.currentBrand?.id === brandId ? null : state.currentBrand
        }));
      },
      
      getBrandById: (brandId) => {
        return get().brands.find(brand => brand.id === brandId);
      }
    }),
    {
      name: 'brand-storage',
      partialize: (state) => ({
        brands: state.brands,
        currentBrand: state.currentBrand
      })
    }
  )
);