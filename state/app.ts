import { NotificationProps } from "@/lib/app";
import { create } from "zustand";

interface AppState {
  openSidebar: boolean;
  notifications: NotificationProps[];
  toggleSidebar: any;
  closeNotification: any;
  openNotification: any;
}

export const useAppStore = create<AppState>((set) => ({
  openSidebar: false,
  notifications: [],

  toggleSidebar: (openSidebar: boolean) => set({ openSidebar }),

  closeNotification: () =>
    set((state) => ({
      notifications: state.notifications.slice(1),
    })),

  openNotification: (payload: NotificationProps) =>
    set((state) => ({
      notifications: [...state.notifications, payload],
    })),
}));
