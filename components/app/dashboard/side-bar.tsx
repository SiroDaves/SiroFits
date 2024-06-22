"use client";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { NavigationProps } from "@/lib/app";
import { matchSidebarPaths } from "@/lib/string";
import { useAuthStore } from "@/state/auth/auth";
import { LogOutIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { FC } from "react";

interface SidebarProps {
  navigation: NavigationProps[];
  iconMapping: Record<
    string,
    FC<{
      className: string;
    }>
  >;
}

export const Sidebar: FC<SidebarProps> = ({ navigation, iconMapping }) => {
  const { logout } = useAuthStore();
  const pathname = usePathname();
  const router = useRouter();
  const signOut = () => {
    logout();
    router.push("/login");
  };
  return (
    <div className="hidden md:flex md:flex-shrink-0">
      <div className="flex flex-col w-60">
        <div className="flex flex-col flex-grow border-r border-gray-200 bg-white pb-4 overflow-y-auto">
          <div className="flex items-center flex-shrink-0 px-4 justify-center align-middle mt-5 font-bold">
            <div className="flex-shrink-0 flex items-center px-4">
              <Image
                className="h-12 w-auto"
                src="/images/logo.png"
                alt="Workflow"
                width={200}
                height={100}
              />
            </div>
          </div>
          <div className="pt-8 flex-grow flex flex-col">
            <nav className="flex-1 px-2  bg-white space-y-1">
              {navigation.map((navigate) => {
                const pathMatches = matchSidebarPaths(pathname, navigate.path);
                const Icon = iconMapping[navigate.icon];
                if (navigate.children) {
                  return (
                    <Accordion
                      type="single"
                      collapsible
                      className="w-full mt-3"
                      key={navigate.label}
                    >
                      <AccordionItem value="item-1" className="border-b-0">
                        <AccordionTrigger
                          className={`group flex hover:no-underline no-underline items-center space-x-1 px-2 py-2 
                          text-sm font-medium rounded-lg  w-full ${
                            pathMatches
                              ? "bg-gray-300"
                              : "text-gray-800 hover:bg-gray-300"
                          }`}
                        >
                          <div className="flex items-center hover:no-underline">
                            <Icon
                              className="mr-6 flex-shrink-0 h-6 w-6 stroke-[1.4px]"
                              aria-hidden="true"
                            />
                            <span>{navigate.label}</span>
                          </div>
                        </AccordionTrigger>
                        <AccordionContent className="py-1">
                          {navigate.children?.map((item) => {
                            const pathMatches = matchSidebarPaths(
                              pathname,
                              item.path
                            );
                            return (
                              <Link
                                key={item.label}
                                href={item.path}
                                className={`group flex items-center pl-11 pr-2 py-2 text-sm font-medium rounded-lg ${
                                  pathMatches
                                    ? "bg-gray-300"
                                    : "text-gray-800 hover:bg-gray-300"
                                }`}
                              >
                                {item.label}
                              </Link>
                            );
                          })}
                        </AccordionContent>
                      </AccordionItem>
                    </Accordion>
                  );
                }
                return (
                  <Link
                    key={navigate.label}
                    href={navigate.path}
                    className={`group flex items-center px-2 py-2 text-sm font-semibold rounded-lg ${
                      pathMatches
                        ? "bg-gray-300"
                        : "text-gray-800 hover:bg-gray-300"
                    }`}
                  >
                    <Icon
                      className="mr-6  flex-shrink-0 h-6 w-6 stroke-[1.4px]"
                      aria-hidden="true"
                    />
                    <span>{navigate.label}</span>
                  </Link>
                );
              })}
            </nav>
          </div>
        </div>
      </div>
    </div>
  );
};
