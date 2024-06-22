import { getApi } from "@/lib/api";
import { getURL } from "@/lib/string";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import { User } from "./types";

interface State {
  selectedUser: any | null;
  users: User[];
  loading: boolean;
  submit: boolean;
  userModals: any;
}
interface Actions {
  toggleUserModal: (payload: any) => void;
  updateSelectedUser: (payload: any) => void;
  fetchUsers: () => Promise<any>;
  addUser: (data: any) => Promise<any>;
  updateUser: (userId: number, data: any) => Promise<any>;
}

export const useUserStore = create<State & Actions>()(
  persist(
    (set) => ({
      selectedUser: null,
      users: [],
      userModals: {
        addUser: false,
        editUser: false,
        toggleUser: false,
      },
      loading: false,
      submit: false,

      toggleUserModal: (payload) => {
        set((state) => ({
          userModals: {
            ...state.userModals,
            ...payload,
          },
        }));
      },
      updateSelectedUser: (payload) => {
        set({ selectedUser: payload });
      },

      fetchUsers: async () => {
        set({ loading: true });
        return new Promise(async (resolve, reject) => {
          try {
            const response = await getApi("auth").get(`/api/v1/admins`);
            set({
              users: response.data,
              loading: false,
            });
            return resolve(response);
          } catch (error: any) {
            set({
              loading: false,
              users: [],
            });
            return reject(error);
          }
        });
      },

      addUser: async (data) => {
        set({ submit: true });
        return new Promise(async (resolve, reject) => {
          try {
            const response = await getApi("auth").post(
              getURL(`/api/v1/admins`),
              data
            );
            set((state) => ({
              users: [response.data, ...state.users],
              submit: false,
            }));
            return resolve(response);
          } catch (error: any) {
            set({ submit: false });
            return reject(error);
          }
        });
      },
      updateUser: async (userId, data) => {
        set({ submit: true });
        return new Promise(async (resolve, reject) => {
          try {
            const response = await getApi("auth").put(
              `/api/v1/admins/${userId}`,
              data
            );
            set((state) => ({
              users: state.users.map((user) =>
                user.id === response.data.id ? response.data : user
              ),
              submit: false,
            }));
            return resolve(response);
          } catch (error: any) {
            set({ submit: false });
            return reject(error);
          }
        });
      },
    }),
    {
      name: "siro-fits-app:user",
      storage: createJSONStorage(() => sessionStorage),
      partialize: (state) => ({
        selectedUser: state.selectedUser,
      }),
    }
  )
);
