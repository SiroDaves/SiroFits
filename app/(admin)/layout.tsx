import { MainLayout } from "@/components/app/dashboard";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Strava Custom Dashboard",
  description: "Strava Custom Dashboard",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main>
      <MainLayout>{children}</MainLayout>
    </main>
  );
}
