import { io } from "socket.io-client";
import { sessionStorageUtil } from "src/share/utils";
import { OUserStorageVars } from "src/share/models";

const url = import.meta.env.VITE_REQUEST_API_URL;

const getAccessToken = () => {
  return sessionStorageUtil.get(OUserStorageVars.AccessToken);
};

export const socket = io(url, {
  auth: {
    token: getAccessToken(),
    autoConnect: false,
  },
});
