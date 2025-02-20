import { create } from 'zustand'

export type Model = 'gpt-4o' | 'gpt-4o-mini' | 'gpt-4-turbo' | 'gpt-3.5-turbo' 

interface ModelStore {
    model: Model,
    resetModel: () => void,
    updateModel: (newModel: Model) => void,
}

export const useModelStore = create<ModelStore>((set) => ({
  model: 'gpt-4o',
  resetModel: () => set({ model: 'gpt-4o' }),
  updateModel: (newModel: Model) => set({ model: newModel }),
}))