
import axios, { AxiosError } from "axios";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import { getBaseUrl, getClientId, getOauthRedirect, getClientSecret } from "@/lib/env";

interface State {
  isAuthenticated: boolean;
  loading: boolean;
  error: null | any;
  athlete: null | any;
  authCode: null | string;
  refreshToken: null | string;
  accessToken: null | string;
  envVars: {
    baseUrl: string;
    clientId: string;
    oauthRedirect: string;
    clientSecret: string;
  };
}

interface Actions {
  setEnvVariables: (envVars: { baseUrl: string; clientId: string; oauthRedirect: String; clientSecret: String }) => void;
  authCallback: () => Promise<any>;
  getAccessToken: () => Promise<any>;
  logout: () => void;
}

export const useAuthStore = create<State & Actions>()(
  persist(
    (set) => ({
      isAuthenticated: false,
      loading: false,
      error: null,
      athlete: null,
      authCode: null,
      refreshToken: null,
      accessToken: null,
      envVars: {
        baseUrl: getBaseUrl() || "",
        clientId: getClientId() || "",
        oauthRedirect: getOauthRedirect() || "",
        clientSecret: getClientSecret() || "",
      },

      setEnvVariables: () => {
        set({
          envVars: {
            baseUrl: getBaseUrl() || "",
            clientId: getClientId() || "",
            oauthRedirect: getOauthRedirect() || "",
            clientSecret: getClientSecret() || "",
          },
        });
      },
      authCallback: async () => {
        const { baseUrl, clientId, oauthRedirect } = useAuthStore.getState().envVars;
        set({ loading: true, error: null });
        return new Promise((resolve, reject) => {
          //To do, needs fixing
          axios.post(`${baseUrl}/oauth/authorize?client_id=${clientId}&redirect_uri=${oauthRedirect}`)
            .then((response) => {
              set({
                authCode: response.data.authCode,
                isAuthenticated: true,
                loading: false,
              });
              return resolve(response);
            })
            .catch((error: AxiosError) => {
              set({ loading: false, error });
              return reject(error);
            });
        });
      },
      getAccessToken: async () => {
        const { baseUrl, clientId, clientSecret } = useAuthStore.getState().envVars;
        set({ loading: true, error: null });
        return new Promise((resolve, reject) => {
          axios.post(`${baseUrl}/oauth/authorize?client_id=${clientId}&client_secret=${clientSecret}&grant_type=authorization_code`)
            .then((response) => {
              set({
                accessToken: response.data.accessToken,
                refreshToken: response.data.refreshToken,
                isAuthenticated: true,
                athlete: response.data.athlete,
                loading: false,
              });
              return resolve(response);
            })
            .catch((error: AxiosError) => {
              set({ loading: false, error });
              return reject(error);
            });
        });
      },
      logout: () => {
        set({ accessToken: null, isAuthenticated: false, athlete: null });
      },
    }),
    {
      name: "siro-fits-app:auth",
      storage: createJSONStorage(() => sessionStorage),
    }
  )
);
