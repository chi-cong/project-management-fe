import "./noti-list.css";
import { Button, Typography } from "antd";
import { utcToLocal } from "src/share/utils";
import { useMarkAsReadMutation } from "src/share/services";

import type { Notification } from "src/share/models";

interface NotiListProp {
  notifications: Notification[];
  updateNotiList: (notification: Notification[]) => void;
}

export const NotiList = ({ notifications, updateNotiList }: NotiListProp) => {
  const [markAsRead] = useMarkAsReadMutation();

  return (
    <div className='noti-list'>
      <div className='title-row'>
        <h3>Notifications</h3>
        <Button type='link'>Mark all as read</Button>
      </div>
      <div className='noti-list-body'>
        {notifications.map((notification, index) => {
          return (
            <div
              className={`noti-content ${!notification.is_read && "unread-noti"}`}
              key={notification.notifications.notification_id}
            >
              <Typography.Text>
                {notification.notifications.content}
              </Typography.Text>
              <div className='noti-content-footer'>
                <p className='timer'>
                  {utcToLocal(notification.notifications.createdAt)?.fromNow()}
                </p>
                {!notification.is_read && (
                  <Button
                    style={{ paddingLeft: "0px" }}
                    type='link'
                    onClick={() => {
                      markAsRead({
                        id: notification.notifications.notification_id,
                      });
                      let updatedNoti = notification;
                      updatedNoti.is_read = true;
                      const newNotiList: Notification[] = notifications;
                      newNotiList[index] = updatedNoti;
                      updateNotiList(newNotiList);
                    }}
                  >
                    Mark as read
                  </Button>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
