"use client";
import { AddUser, EditUser } from "@/components/app/user";
import { CustomCard, Loader } from "@/components/reusable";
import { SuccessOrErrorState } from "@/components/reusable/SuccessErrorState";
import { ToggleModal } from "@/components/reusable/ToggleModal";
import { Button } from "@/components/ui/button";
import { useUserStore } from "@/state/user/user";
import _ from "lodash";
import {
  CheckIcon,
  PencilIcon,
  PlusIcon,
  UserCheckIcon,
  UserX2Icon,
  XIcon,
} from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";

export default function UserPage() {
  const {
    users,
    fetchUsers,
    loading,
    updateUser,
    userModals,
    toggleUserModal,
  } = useUserStore();
  const [selectedUser, setSelectedUser] = useState<any>();

  const handleEditModal = (value: any) => {
    setSelectedUser(value);
    toggleUserModal({
      editUser: true,
    });
  };

  const handleOpenToggleStatusModal = (user: any) => {
    setSelectedUser(user);
    toggleUserModal({
      toggleUser: true,
    });
  };

  const handleCloseToggleStatusModal = () =>
    toggleUserModal({
      toggleUser: false,
    });

  const onToggleStatus = async () => {
    if (!!selectedUser) {
      let user = {
        ...selectedUser,
        active: !selectedUser.active,
      };
      try {
        await updateUser(selectedUser?.id, user);
      } catch (error: any) {
        toast.error("Something went wrong!", {
          description: error?.response?.data?.description,
        });
      }
    }
    handleCloseToggleStatusModal();
  };

  useEffect(() => {
    const fetchUsersAsync = async () => {
      try {
        await fetchUsers();
      } catch (error: any) {
        toast.error("Something went wrong!", {
          description: error?.response?.data?.description,
        });
      }
    };

    fetchUsersAsync();
  }, []);

  const handleModal = async () => {
    await toggleUserModal({
      addUser: true,
    });
  };
  if (loading) {
    return (
      <div className="mt-4 rounded-lg flex flex-row items-center justify-center w-full h-60 bg-white">
        <Loader />
      </div>
    );
  }
  return (
    <div className="bg-white px-6 rounded-xl py-4">
      <AddUser />
      <EditUser user={selectedUser} />
      <ToggleModal
        isOpen={userModals.toggleUser}
        onClose={handleCloseToggleStatusModal}
        onSubmit={onToggleStatus}
        message={`You are going to ${
          selectedUser?.active ? "Diactivate" : "Activate"
        } the user`}
        title="Delete"
        loading={userModals.submit}
      />

      <div className="flex justify-between items-center mb-6 mx-2 mt-4">
        <h3 className="font-semibold">Users</h3>

        <Button
          variant={"outline"}
          className="border-primary text-primary hover:text-primary border-[1.5px] rounded-md"
          onClick={handleModal}
        >
          <PlusIcon />
          Add User
        </Button>
      </div>

      {_.isEmpty(users) && !loading ? (
        <SuccessOrErrorState state="empty" message="No User Found" />
      ) : (
        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {users?.map((user) => (
            <CustomCard
              key={1}
              title={
                user?.firstName + " " + user?.middleName + " " + user?.lastName
              }
              label={user?.phoneNumber}
              value={user?.email}
              description={user?.role}
              iconBackGroundColor={
                user.active
                  ? "bg-green-foreground"
                  : "bg-destructive-foreground"
              }
              Icon={() => {
                return (
                  <>
                    {user.active ? (
                      <UserCheckIcon className="h-6 w-6 cursor-pointer text-green " />
                    ) : (
                      <UserX2Icon className="h-6 w-6 cursor-pointer text-destructive" />
                    )}
                  </>
                );
              }}
              SubComponent={() => {
                return (
                  <div className=" flex justify-between py-1 lg:ml-2 space-x-1 lg:space-x-3">
                    <div
                      className={`text-primary flex font-bold text-xs  cursor-pointer  items-center`}
                      onClick={() => handleEditModal(user)}
                    >
                      <PencilIcon className="h-3 mr-1 w-3" />
                      <span className="mt-0.5">Edit</span>
                    </div>
                    <div
                      className={`text-primary flex font-bold text-xs  cursor-pointer`}
                      onClick={() => handleOpenToggleStatusModal(user)}
                    >
                      {user.active ? (
                        <div className="flex items-center text-destructive">
                          <XIcon className="h-3 mr-1 w-3" />
                          <span className="mt-0.5">Diactivate</span>
                        </div>
                      ) : (
                        <div className="flex items-center text-green">
                          <CheckIcon className="h-4 mr-1 w-3" />
                          Activate
                        </div>
                      )}
                    </div>
                  </div>
                );
              }}
            />
          ))}
        </section>
      )}
    </div>
  );
}
