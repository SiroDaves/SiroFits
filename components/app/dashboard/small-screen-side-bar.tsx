"use client";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Dialog, DialogHeader } from "@/components/ui/dialog";
import { NavigationProps } from "@/lib/app";
import { matchSidebarPaths } from "@/lib/string";
import { useAppStore } from "@/state/app";
import { useAuthStore } from "@/state/auth/auth";
import { DialogContent, DialogTitle } from "@radix-ui/react-dialog";
import { LogOutIcon, XIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { FC, useRef } from "react";

interface SmallScreenDeviceSidebarProps {
  navigation: NavigationProps[];
  iconMapping: Record<
    string,
    FC<{
      className: string;
    }>
  >;
}

export const SmallScreenDeviceSidebar: FC<SmallScreenDeviceSidebarProps> = ({
  navigation,
  iconMapping,
}) => {
  const { openSidebar, toggleSidebar } = useAppStore();
  const { logout } = useAuthStore();

  const pathname = usePathname();
  const router = useRouter();

  const handleCloseSidebar = () => toggleSidebar(false);
  let defaultFocusRef = useRef(null);
  const signOut = () => {
    logout();
    router.push("/login");
  };

  return (
    <Dialog open={openSidebar} onOpenChange={toggleSidebar}>
      <DialogContent className=" w-full sm:max-w-full sm:max-h-screen">
        <DialogHeader>
          <DialogTitle>
            <div className="absolute top-0 right-0 -mr-12 pt-2">
              <button
                className="ml-1 flex items-center justify-center h-10 w-10 rounded-full focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
                onClick={handleCloseSidebar}
                ref={defaultFocusRef}
              >
                <span className="sr-only">Close sidebar</span>
                <XIcon className="h-6 w-6 text-white" aria-hidden="true" />
              </button>
            </div>
          </DialogTitle>
        </DialogHeader>
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
        <h3 className="text-center pt-2 font-semibold">Siro Fits</h3>
        <div className="pt-5 flex-grow flex flex-col">
          <nav className="flex-1 px-2 bg-tandaPurple space-y-1">
            {navigation.map((navigate) => {
              const pathMatches = matchSidebarPaths(pathname, navigate.path);
              const Icon = iconMapping[navigate.icon];
              if (navigate.children) {
                return (
                  <Accordion
                    type="single"
                    collapsible
                    className="w-full"
                    key={navigate.label}
                  >
                    <AccordionItem value="item-1">
                      <AccordionTrigger
                        className={`group flex hover:no-underline no-underline  items-center px-2 py-2 text-sm font-medium rounded-md w-full ${
                          pathMatches
                            ? "bg-gray-300"
                            : "text-gray-800 hover:bg-gray-300"
                        }`}
                      >
                        <div className="flex items-center">
                          <Icon
                            className="mr-3 flex-shrink-0 h-6 w-6 stroke-[1.4px]"
                            aria-hidden="true"
                          />
                          <span>{navigate.label}</span>
                        </div>
                      </AccordionTrigger>
                      <AccordionContent>
                        {navigate.children?.map((item) => {
                          const pathMatches = matchSidebarPaths(
                            pathname,
                            item.path
                          );
                          return (
                            <Link
                              onClick={handleCloseSidebar}
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
                  onClick={handleCloseSidebar}
                  key={navigate.label}
                  href={navigate.path}
                  className={`group flex items-center px-2 py-2 text-sm font-medium rounded-lg  ${
                    pathMatches
                      ? "bg-gray-300"
                      : "text-gray-800 hover:bg-gray-300"
                  }`}
                >
                  <Icon
                    className="mr-3 flex-shrink-0 h-6 w-6 stroke-[1.4px]"
                    aria-hidden="true"
                  />
                  <span>{navigate.label}</span>
                </Link>
              );
            })}
          </nav>
          
        </div>
      </DialogContent>
    </Dialog>
  );
};
