"use client";
import Image from "next/image";

interface AuthLayoutProps {
  message: string;
  children: React.ReactNode;
}

export function AuthLayout({ children, message }: AuthLayoutProps) {
  return (
    <div className="min-h-screen bg-white flex">
      <div className="hidden lg:block relative w-0 flex-1">
        <img
          className="absolute inset-0 h-full w-full object-cover"
          src="/images/home-bg.jpg"
          alt="Siro Fits"
        />
      </div>
      <div className="flex-1 flex flex-col justify-center py-12 px-4 sm:px-6 lg:flex-none lg:px-20 xl:px-24 -mt-24">
        <div className="mx-auto w-full max-w-sm lg:w-96">
          <div>
            <div className=" flex flex-row justify-center">
              <Image
                src="/images/logo.png"
                alt="Workflow"
                width={290}
                height={80}
              />
            </div>
            <h2 className="mt-5 text-3xl font-semibold text-gray-900 text-center">
              {message}
            </h2>
          </div>
          <div className="mt-5">{children}</div>
        </div>
      </div>
    </div>
  );
}
