import { create } from "zustand";

interface ModelStore {
  selectedModel: string;
  setSelectedModel: (model: string) => void;
}

export const useModelStore = create<ModelStore>((set) => ({
  selectedModel: "openai/gpt-4",
  setSelectedModel: (model: string) => set({ selectedModel: model }),
}));
