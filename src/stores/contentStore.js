import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export const useContentStore = create(
  persist(
    (set, get) => ({
      contentPieces: [],
      
      addContent: (content) => {
        const newContent = {
          id: Date.now().toString(),
          createdAt: new Date().toISOString(),
          platforms: [],
          status: 'draft',
          ...content
        };
        set((state) => ({
          contentPieces: [...state.contentPieces, newContent]
        }));
        return newContent;
      },
      
      updateContent: (contentId, updates) => {
        set((state) => ({
          contentPieces: state.contentPieces.map(content => 
            content.id === contentId ? { ...content, ...updates } : content
          )
        }));
      },
      
      deleteContent: (contentId) => {
        set((state) => ({
          contentPieces: state.contentPieces.filter(content => content.id !== contentId)
        }));
      },
      
      getContentByBrand: (brandId) => {
        return get().contentPieces.filter(content => content.brandId === brandId);
      }
    }),
    {
      name: 'content-storage'
    }
  )
);