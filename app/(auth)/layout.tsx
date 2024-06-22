import { AuthLayout } from "@/components/app/auth/auth-layout";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Strava Custom Dashboard | Siro Fits",
  description: "Strava Custom Dashboard | Siro Fits",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main>
      <AuthLayout message="Sign In">{children}</AuthLayout>
    </main>
  );
}
