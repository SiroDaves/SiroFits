import { getApi } from "@/lib/api";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import { Activity } from "./types";

interface ActivityState {
  activities: Activity[];
  loading: boolean;
  lookUpListLoading: boolean;
  submit: boolean;
  fetchClubActivities: (
    clubId?: string,
    pagination?: any,
  ) => Promise<any>;
}

export const useActivityStore = create<ActivityState>()(
  persist(
    (set) => ({
      activities: [],
      activityModals: {
        showImages: false,
        reviewActivity: false,
        activityDetails: false,
        uploadDocuments: false,
      },
      loading: false,
      lookUpListLoading: false,
      submit: false,
      fetchClubActivities: async (
        clubId,
        pagination = {},
      ) => {
        set({ loading: true });
        return new Promise(async (resolve, reject) => {
          try {
            const response = await getApi().get(`/api/v3/clubs/${clubId}/activities`, {
              params: { ...pagination },
            });
            set({
              activities: response.data,
              loading: false,
            });
            return resolve(response);
          } catch (error: any) {
            set({
              loading: false,
              activities: [],
            });
            return reject(error);
          }
        });
      },
    }),
    {
      name: "siro-fits-app:activities",
      storage: createJSONStorage(() => sessionStorage),
    }
  )
);
