import { useAuthStore } from "@/state/auth/auth";
import axios from "axios";
import {
  getBaseUrl,
  getClientId,
  getClientSecret
} from "./env";

export const getApi = () => {
  let API = axios.create({
    baseURL: getBaseUrl(),
    headers: {
      "Content-Type": "application/json",
    },
  });

  API.interceptors.request.use(function (config) {
    //todo
    const accessToken = '464baa4a060e801946d283699b03d66455c3e679';//useAuthStore.getState().accessToken;
    config.headers.Authorization = accessToken !== null ? `Bearer ${accessToken}` : "";
    return config;
  });

  API.interceptors.response.use(
    function (response) {
      return response;
    },
    function (error) {
      if (error.response && error.response.status === 401) {
        useAuthStore.getState().logout();
        const url = window.location.origin;
        window.location.assign(`${url}/login`);
      }
      return Promise.reject(error);
    }
  );

  return API;
};
