import { getApi } from "@/lib/api";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import { Activity, Type } from "./types";
import { ClubAthlete } from "../athlete/types";

interface ActivityState {
  activities: ClubAthlete[];
  loading: boolean;
  fetchClubActivities: (
    clubId?: string,
    activityType?: string,
  ) => Promise<any>;
}

export const useActivityStore = create<ActivityState>()(
  persist(
    (set) => ({
      activities: [],
      loading: false,
      fetchClubActivities: async (clubId, activityType) => {
        set({ loading: true });
        return new Promise(async (resolve, reject) => {
          try {
            const response = await getApi().get(`/api/v3/clubs/${clubId}/activities?per_page=200`);
            const responseData = activitiesByAthlete(response.data, activityType);
            set({
              activities: responseData,
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
export function activitiesByAthlete(
  activities: Activity[],
  activityType?: string
): ClubAthlete[] {
  const athleteMap = new Map<string, ClubAthlete>();

  activities.forEach(activity => {
    // Apply type filter if provided and activity type matches
    if (!activityType || activity.type === activityType) {
      const fullname = `${activity.athlete.firstname} ${activity.athlete.lastname}`;
      const existing = athleteMap.get(fullname);

      if (existing) {
        existing.distance += activity.distance;
        existing.activities += 1;
        existing.longest = Math.max(existing.longest, activity.distance);
        existing.time += activity.moving_time;
        existing.elevation += activity.total_elevation_gain;
      } else {
        // Create a new ClubAthlete entry
        athleteMap.set(fullname, {
          fullname: fullname,
          distance: activity.distance,
          activities: 1,
          longest: activity.distance,
          time: activity.moving_time,
          elevation: activity.total_elevation_gain,
        });
      }
    }
  });

  // Convert the map to an array of ClubAthlete objects
  const clubAthletes = Array.from(athleteMap.values());

  // Sort the array based on the total time from highest to lowest
  clubAthletes.sort((a, b) => b.time - a.time);

  return clubAthletes;
}
