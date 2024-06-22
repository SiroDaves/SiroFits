"use client";
import { LargeDescriptionPanel } from "@/components/reusable";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useAuthStore } from "@/state/auth/auth";
import { zodResolver } from "@hookform/resolvers/zod";
import { RefreshCwIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

const loginFormSchema = z
  .object({
    currentPassword: z.string().max(160).min(8),
    newPassword: z.string().max(160).min(8),
    confirmPassword: z.string().max(160).min(8),
  })
  .refine((data) => data.confirmPassword === data.newPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });

type ProfileFormValues = z.infer<typeof loginFormSchema>;

const defaultValues: Partial<ProfileFormValues> = {
  currentPassword: "",
  newPassword: "",
  confirmPassword: "",
};

export default function Dashboard() {
  const { user, loading, resetPassword, logout } = useAuthStore();
  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(loginFormSchema),
    defaultValues,
    mode: "onChange",
  });
  const router = useRouter();

  const onSubmit = async (data: ProfileFormValues) => {
    try {
      const request = {
        email: user?.email,
        newPassword: data.newPassword,
        currentPassword: data.currentPassword,
      };
      await resetPassword(request);
      await toast.success("Password updated!");
      await logout();
      await router.push("/login");
    } catch (error: any) {
      await toast.error("Something went wrong!", {
        description: error?.response?.data?.description,
      });
    }
  };

  return (
    <div className="bg-white p-10 min-h-full rounded-lg">
      <h4 className="text-center font-semibold text-xl pb-5">Person Details</h4>
      <div className=" grid grid-cols-1 lg:grid-cols-2 gap-4 ">
        {/* Display user infomation */}
        <section>
          <div>
            <LargeDescriptionPanel
              label="Name"
              description={
                user?.firstName + " " + user?.middleName + " " + user?.lastName
              }
            />
            <LargeDescriptionPanel
              label="Phone Number"
              description={user?.phoneNumber}
            />
            <LargeDescriptionPanel
              label="Email Address"
              description={user?.email}
            />
            <LargeDescriptionPanel
              label="Status"
              description={user?.active ? "Active" : "Inactive"}
            />
          </div>
        </section>

        {/* Change password */}
        <section className="">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="currentPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Current Password</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="***********"
                        {...field}
                        type="password"
                        size={2}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="newPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>New Password</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="***********"
                        {...field}
                        type="password"
                        size={2}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="confirmPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Confirm Password</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="***********"
                        {...field}
                        type="password"
                        size={2}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button
                type="submit"
                className="w-full text-white"
                disabled={loading}
              >
                {loading && (
                  <RefreshCwIcon className="mr-2 h-4 w-4 animate-spin" />
                )}{" "}
                Submit
              </Button>
            </form>
          </Form>
        </section>
      </div>
    </div>
  );
}
