import { create } from "zustand";

const useUploadStore = create((set) => ({
  title: "",
  intro: "",
  tags: [],
  content: "",
  image: null,
  relayId: null,
  tickleId: null,
  setTitle: (newTitle) => set({ title: newTitle }),
  setIntro: (newIntro) => set({ intro: newIntro }),
  setTags: (newTags) => set({ tags: newTags }),
  setContent: (newContent) => set({ content: newContent }),
  setImage: (newImage) => set({ image: newImage }),
  removeImage: () => set({ image: null }),
  setRelayData: (relayId, tickleId, title, tags) =>
    set({ relayId, tickleId, title, tags }),
  resetAll: () =>
    set({
      title: "",
      intro: "",
      tags: [],
      content: "",
      image: null,
      relayId: null,
      tickleId: null,
    }),
}));

export default useUploadStore;
