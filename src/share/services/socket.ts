import { io } from "socket.io-client";
import { sessionStorageUtil } from "src/share/utils";

const url = import.meta.env.VITE_REQUEST_API_URL;
const getAccessToken = () => {
  return sessionStorageUtil.get("accessToken");
};

export const socket = io(url, {
  auth: {
    token: getAccessToken(),
    autoConnect: false
  },
});
