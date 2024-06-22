"use client";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { useAuthStore } from "@/state/auth/auth";
import { RefreshCwIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import * as z from "zod";

export default function Login() {
  const { authCallback, loading } = useAuthStore();
  const form = useForm();

  const router = useRouter();
  const onSubmit = async () => {
    try {
      await authCallback();
      router.push("/dashboard");
    } catch (error: any) {
      await toast.error("Something went wrong!", {
        description: error?.response?.data?.description,
      });
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <Button type="submit" className="w-full text-white" disabled={loading}>
          {loading && <RefreshCwIcon className="mr-2 h-4 w-4 animate-spin" />}{" "}
          Login with Strava
        </Button>
      </form>
    </Form>
  );
}
