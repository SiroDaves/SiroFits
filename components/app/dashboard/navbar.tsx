"use client";
import { UserMenuNavigationProps } from "@/lib/app";
import { useAppStore } from "@/state/app";
import { useAuthStore } from "@/state/auth/auth";
import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarTrigger,
} from "@radix-ui/react-menubar";
import {
  AlignLeftIcon,
  ChevronDownIcon,
  LockIcon,
  User2Icon,
  UserCircle,
} from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FC } from "react";
import NavbarContext from "./nav-context";

interface NavbarProps {
  navigation: UserMenuNavigationProps[];
}

export const Navbar: FC<NavbarProps> = ({ navigation }) => {
  const { toggleSidebar } = useAppStore();
  const { user, logout } = useAuthStore();

  const router = useRouter();
  const signOut = () => {
    logout();
    router.push("/login");
  };
  const handleOpenSidebar = () => toggleSidebar(true);

  return (
    <div className="relative z-10 flex-shrink-0 flex h-16 bg-white">
      <button
        className="px-4 border-r border-gray-200 text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-tandaPurple md:hidden"
        onClick={handleOpenSidebar}
      >
        <span className="sr-only">Open sidebar</span>
        <AlignLeftIcon className="h-6 w-6" aria-hidden="true" />
      </button>
      <div className="flex-1 px-4 flex justify-between">
        <div className="flex-1 flex items-center">
          <NavbarContext />
        </div>
      </div>
    </div>
  );
};
