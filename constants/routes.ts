import { NavigationProps, UserMenuNavigationProps } from "@/lib/app";

export const sidebarNavigation: NavigationProps[] = [
  {
    label: "Dashboard",
    path: "/dashboard",
    icon: "dashboard",
  },
];

export const adminSidebarNavigation: NavigationProps[] =
  sidebarNavigation.concat([
    {
      label: "Users",
      path: "/users",
      icon: "users",
    },
  ]);

export const userMenuNavigation: UserMenuNavigationProps[] = [
  { label: "Sign out", path: "/logout" },
];
