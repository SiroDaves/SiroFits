"use client";
import { usePathname } from "next/navigation";
import { FC } from "react";

const NavbarContext: FC = () => {
  const pathname = usePathname();

  const routes = {
    dashboard: "/dashboard",
  };

  const getTitle = () => {
    if (routes.dashboard && pathname.includes(routes.dashboard)) {
      return <h1 className="text-xl font-semibold text-gray-700">Strava Custom Dashboard</h1>;
    }

    return null;
  };

  return <>{getTitle()}</>;
};

export default NavbarContext;
