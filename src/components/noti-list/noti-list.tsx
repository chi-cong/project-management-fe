import "./noti-list.css";
import { Button, Typography } from "antd";
import { utcToLocal } from "src/share/utils";
import { useMarkAsReadMutation } from "src/share/services";

import type { Notification } from "src/share/models";

interface NotiListProp {
  notifications: Notification[];
  updateNotiList: (notification: Notification[]) => void;
  setUnreadCount: (unreadCount: number) => void;
  unreadCount: number;
}

export const NotiList = ({
  notifications,
  updateNotiList,
  setUnreadCount,
  unreadCount,
}: NotiListProp) => {
  const [markAsRead] = useMarkAsReadMutation();

  return (
    <div className='noti-list'>
      <div className='title-row'>
        <h3>Notifications</h3>
      </div>
      <div className='noti-list-body'>
        {notifications.map((notification, index) => {
          return (
            <div
              className={`noti-content ${!notification.is_read && "unread-noti"}`}
              key={notification.notification_id}
            >
              <Typography.Text>
                {notification.notifications.content}
              </Typography.Text>
              <div className='noti-content-footer'>
                <p className='timer'>
                  {utcToLocal(notification.createdAt)?.fromNow()}
                </p>
                {!notification.is_read && (
                  <Button
                    style={{ paddingLeft: "0px" }}
                    type='link'
                    onClick={() => {
                      markAsRead({
                        id: notification.notification_id,
                      })
                        .unwrap()
                        .then(() => {
                          const updatedNoti: Notification = {
                            ...notification,
                            is_read: true,
                          };
                          let newNotiList: Notification[] = [...notifications];
                          newNotiList[index] = updatedNoti;
                          updateNotiList(newNotiList);
                          setUnreadCount(unreadCount - 1);
                        });
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
