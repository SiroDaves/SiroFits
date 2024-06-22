"use client";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { User } from "@/state/user/types";
import { useUserStore } from "@/state/user/user";
import { zodResolver } from "@hookform/resolvers/zod";
import _ from "lodash";
import { RefreshCwIcon } from "lucide-react";
import { FC, useEffect } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

interface EditUser {
  user: User;
}
const editUserFormSchema = z.object({
  firstName: z.string().min(1),
  middleName: z.string().optional(),
  lastName: z.string().min(1),
  email: z.string().email(),
  phoneNumber: z.string().min(1),
  role: z.string().min(1),
  active: z.boolean(),
});

type EditUserFormValues = z.infer<typeof editUserFormSchema>;

const defaultValues: Partial<EditUserFormValues> = {
  firstName: "",
  lastName: "",
  middleName: "",
  email: "",
  phoneNumber: "",
  role: "USER",
  active: true,
};

export const EditUser: FC<EditUser> = ({ user }) => {
  const { submit, userModals, toggleUserModal, updateUser } = useUserStore();

  const form = useForm<EditUserFormValues>({
    resolver: zodResolver(editUserFormSchema),
    defaultValues,
    mode: "onChange",
  });

  const onClose = async () => {
    form.reset();
    await toggleUserModal({ editUser: false });
  };

  useEffect(() => {
    if (!_.isEmpty(user)) {
      form.reset({
        firstName: user?.firstName || "",
        lastName: user?.lastName || "",
        middleName: user?.middleName || "",
        email: user?.email || "",
        phoneNumber: user?.phoneNumber || "",
        role: user?.role || "",
        active: user?.active || true,
      });
    }
  }, [user]);

  const onSubmit = async (data: EditUserFormValues) => {
    try {
      await updateUser(user.id, data);

      await onClose();
      await toast.success("User updated Successfully!");
    } catch (error: any) {
      await toast.error("Something went wrong!", {
        description: error?.response?.data?.description,
      });
    }
  };

  return (
    <div>
      <Dialog open={userModals?.editUser} onOpenChange={onClose}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit User</DialogTitle>
          </DialogHeader>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className=" grid grid-cols-1 lg:grid-cols-2 gap-3"
            >
              <FormField
                control={form.control}
                name="firstName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>First Name</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="firstName"
                        type="text"
                        {...field}
                        size={6}
                        className=""
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="middleName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Middle Name</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="middleName"
                        type="text"
                        {...field}
                        size={6}
                        className=""
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="col-span-2">
                <FormField
                  control={form.control}
                  name="lastName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Last Name</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="lastName"
                          type="text"
                          {...field}
                          size={6}
                          className=""
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="col-span-2">
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="email"
                          type="email"
                          {...field}
                          size={6}
                          className=""
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="col-span-2">
                <FormField
                  control={form.control}
                  name="phoneNumber"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Phone Number</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="phoneNumber"
                          type="text"
                          {...field}
                          size={6}
                          className=""
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="col-span-2">
                <FormField
                  control={form.control}
                  name="role"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Status</FormLabel>
                      <Select
                        onValueChange={(value) => {
                          field.onChange(value);
                        }}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select a role" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent defaultValue="Not Selected">
                          <SelectItem value="ADMIN">Admin</SelectItem>
                          <SelectItem value="USER">User</SelectItem>
                          <SelectItem value="ISC_USER">ISC User</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="col-span-2">
                <Button
                  type="submit"
                  className="w-full text-white"
                  disabled={submit}
                >
                  {submit && (
                    <RefreshCwIcon className="mr-2 h-4 w-4 animate-spin" />
                  )}
                  Submit
                </Button>
              </div>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </div>
  );
};
