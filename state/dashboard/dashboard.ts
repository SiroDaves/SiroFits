import { getApi } from "@/lib/api";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

interface ActivityState {
  proposalSummary: any;
  loading: boolean;
  proposalModal: boolean;

  toggleActivityModal: (payload: any) => void;
  fetchActivitySummary: (status?: string, pagination?: any) => void;
}

export const useDashboardStore = create<ActivityState>()(
  persist(
    (set) => ({
      proposalSummary: {},
      proposalModal: false,
      loading: false,

      // actions
      toggleActivityModal: (payload) => {
        set({ proposalModal: payload });
      },
      fetchActivitySummary: async (status, pagination = {}) => {
        set({ loading: true });
        try {
          const response = await getApi("dashboard").get(
            `/api/v1/proposal/summary`,
            {
              params: { ...pagination, status },
            }
          );
          set({
            proposalSummary: response.data,
            loading: false,
          });
        } catch (error: any) {
          set({
            loading: false,
          });
        }
      },
    }),
    {
      name: "siro-fits-app:dashboard",
      storage: createJSONStorage(() => sessionStorage),
      partialize: (state) => ({ proposalSummary: state.proposalSummary }),
    }
  )
);
