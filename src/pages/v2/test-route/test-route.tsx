import React, { useEffect, useState } from "react";
import io from "socket.io-client";
import { sessionStorageUtil } from "src/share/utils";
// const baseAPI = import.meta.env.VITE_REQUEST_API_URL;
const baseAPI = "http://118.70.171.240:23030/";

export const TestRoute = () => {
  const [notifications, setNotifications] = useState([]);
  const [noti, setNoti] = useState([]);
  useEffect(() => {
    // Connect to Socket.IO server
    const socketInstance = io(baseAPI, {
      auth: {
        token: sessionStorageUtil.get("accessToken"),
      },
    });
    socketInstance.on("connect", () => {
      console.log("Connected to socket server");
    });

    socketInstance.on("new-noti", (msg) => {
      console.log("Received notification:", msg); // Log the received notification
      setNotifications((prevNotifications) => {
        const newNotifications = [...prevNotifications, msg];
        console.log("All notifications after update:", newNotifications); // Log updated notifications
        return newNotifications;
      });
    });

    return () => {
      socketInstance.disconnect();
    };
  }, []);
  // useEffect(() => {
  //   requestApi(
  //     "/user-notifications/get-user-notifications?items_per_page=ALL",
  //     "GET"
  //   )
  //     .then((res) => {
  //       console.log(res.data.data.notifications);
  //       setNoti(res.data.data.notifications);
  //     })
  //     .catch((e) => console.error(e));
  // }, []);
  return (
    <div className="container px-4 my-5">
      <h2>Dashboard</h2>
      {/* Display Notifications */}
      <div className="notification">
        <h4>Thông báo</h4>
        {notifications.length > 0 || noti.length > 0 ? (
          <ul>
            {/* Render notifications từ socket */}
            {notifications.map((notification, index) => (
              <li key={index}>
                {notification.content}-{index}
              </li>
            ))}
            {/* Render notifications từ API */}
            {/* {noti &&
              noti.map((notification, index) => (
                <li key={index}>{notification?.notifications?.content}</li>
              ))} */}
          </ul>
        ) : (
          <p>Chưa có thông báo nào</p>
        )}
      </div>
    </div>
  );
};
