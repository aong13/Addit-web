import { create } from "zustand";
import { fetchHomeData } from "../apis/homeApi";

const useRelayStore = create((set, get) => ({
  relays: [], // 전체 데이터
  relayIds: [], // 불러온 relay ID 리스트
  focusedRelayId: null, // 포커싱된 relay ID
  loading: false,

  // 데이터 초기화
  resetAll: () =>
    set({ relays: [], relayIds: [], focusedRelayId: null, loading: false }),

  // 데이터 패칭
  fetchRelays: async (page = 5) => {
    set({ loading: true });
    try {
      const relayIds = get().relayIds;
      const response = await fetchHomeData(page, relayIds);
      const newRelays = response.data.relaysWithTickles || [];

      if (newRelays.length > 0) {
        set((state) => ({
          relays: [...state.relays, ...newRelays],
          relayIds: [
            ...new Set([
              ...state.relayIds,
              ...newRelays.map((relay) => relay.relay.relayId),
            ]),
          ],
        }));
      }
    } catch (error) {
      console.error("fetchHomeData Error:", error);
    } finally {
      set({ loading: false });
    }
  },

  // 포커싱된 Relay 변경
  setFocusedRelayId: (id) => set({ focusedRelayId: id }),
}));

export default useRelayStore;
