"use client";
import {
  adminSidebarNavigation,
  sidebarNavigation,
  userMenuNavigation,
} from "@/constants";
import { useAuthStore } from "@/state/auth/auth";
import { BoxIcon, KanbanSquareIcon, Users2Icon } from "lucide-react";
import { FC } from "react";
import { Navbar, Sidebar, SmallScreenDeviceSidebar } from ".";

const iconMapping: Record<string, FC> = {
  dashboard: KanbanSquareIcon,
  product: BoxIcon,
  users: Users2Icon,
};

export function MainLayout({ children }: { children: React.ReactNode }) {
  let routes = sidebarNavigation;
  const user = useAuthStore.getState().athlete;
  if (user?.role === "ADMIN") {
    routes = adminSidebarNavigation;
  }

  return (
    <div>
      <div className="h-screen flex overflow-hidden bg-gray-100">
        <SmallScreenDeviceSidebar
          navigation={routes}
          iconMapping={iconMapping}
        />
        <Sidebar navigation={routes} iconMapping={iconMapping} />
        <div className="flex flex-col w-0 flex-1 overflow-hidden">
          <Navbar navigation={userMenuNavigation} />
          <main className="flex-1 relative overflow-y-auto focus:outline-none">
            <div className="py-6">
              <div className="max-w-7xl mx-auto">{children}</div>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}
