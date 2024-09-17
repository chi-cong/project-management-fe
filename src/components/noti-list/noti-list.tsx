import "./noti-list.css";
import { Button } from "antd";
import { useState } from "react";
import { useGetInitNotisQuery } from "src/share/services";

export const NotiList = () => {
  const { data: notis } = useGetInitNotisQuery(undefined);
  const [notifications, setNotifications] = useState([
    {
      content: "Livestream is updated by Admin",
    },
    {
      content: "Livestream is updated by Admin",
    },
    {
      content: "Livestream is updated by Admin",
    },
    {
      content: "Livestream is updated by Admin",
    },
    {
      content: "Livestream is updated by Admin",
    },
    {
      content: "Livestream is updated by Admin",
    },
    {
      content: "Livestream is updated by Admin",
    },
    {
      content: "Livestream is updated by Admin",
    },
    {
      content: "Livestream is updated by Admin",
    },
    {
      content: "Livestream is updated by Admin",
    },
    {
      content: "Livestream is updated by Admin",
    },
    {
      content: "Livestream is updated by Admin",
    },
  ]);

  console.log(notis);

  return (
    <div className='noti-list'>
      <div className='title-row'>
        <h3>Notifications</h3>
        <Button type='link'>Mark all as read</Button>
      </div>
      <div className='noti-list-body'>
        {notis &&
          notis.map(() => {
            return (
              <div className='noti-content'>
                <p>Notification</p>
                <Button
                  style={{ fontSize: "11px", paddingLeft: "0px" }}
                  type='link'
                >
                  Mark as read
                </Button>
              </div>
            );
          })}
      </div>
    </div>
  );
};
