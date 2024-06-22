"use client";
import { Loader } from "@/components/reusable";
import { SuccessOrErrorState } from "@/components/reusable/SuccessErrorState";
import { useActivityStore } from "@/state/activity/activity";
import _ from "lodash";
import { useEffect } from "react";
import { toast } from "sonner";
import { ActivityTable } from "./ActivityTable";
export function AllActivities() {
  const { activities, loading, fetchClubActivities } = useActivityStore();

  useEffect(() => {
    const fetchClubActivitiesAsync = async () => await fetchClubActivities('1224590');
    try {
      fetchClubActivitiesAsync();
    } catch (error: any) {
      toast.error("Something went wrong!", {
        description: error?.response?.data?.description,
      });
    }
  }, []);

  if (loading) {
    return (
      <div className="mt-4 rounded-lg flex flex-row items-center justify-center w-full h-60 bg-white">
        <Loader />
      </div>
    );
  }

  return (
    <div>
      {_.isEmpty(activities) && !loading ? (
        <SuccessOrErrorState state="empty" message="No Activity Found" />
      ) : (
        <ActivityTable
          data={activities}
        />
      )}
    </div>
  );
}
