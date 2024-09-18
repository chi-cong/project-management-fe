import "./headbar.css";
import { Typography, Popover, Button, Card, Badge } from "antd";
import { CustomAvatar } from "src/components/v2/custom-avatar";
import { Logout, Lock, Person } from "src/assets/icons";
import { useNavigate } from "react-router-dom";
import { localStorageUtil, sessionStorageUtil } from "src/share/utils";
import { useDispatch } from "react-redux";
import { hrManagementApi } from "src/share/services/";
import {
  useGetUserDetailQuery,
  useGetInitNotisQuery,
} from "src/share/services/";
import { MenuOutlined, BellOutlined } from "@ant-design/icons";
import { openDrawer } from "src/libs/redux/drawerSlice";
import { useEffect, useState } from "react";
import { OutsideClickHandler, NotiList } from "src/components";
import { socket } from "src/share/services/";

import type { Notification } from "src/share/models";

export const Headbar = () => {
  const { data: notis } = useGetInitNotisQuery(undefined);
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [unreadNoti, setUnreadNoti] = useState<number>(0);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [openOptions, setOpenOptions] = useState<boolean>(false);
  const { data: user } = useGetUserDetailQuery();

  const logout = (): void => {
    sessionStorageUtil.delete("accessToken");
    localStorageUtil.delete("refreshToken");
    dispatch(hrManagementApi.util.resetApiState());
    navigate("/v2/login");
  };

  // setup initial notifications
  useEffect(() => {
    if (notis) {
      setNotifications(notis.notifications);
      let unread = 0;
      notis.notifications.forEach((noti) => {
        if (!noti.is_read) {
          unread++;
        }
      });
      setUnreadNoti(unread);
    }
  }, [notis]);

  // setup socket
  useEffect(() => {
    socket.connect();
    socket.on("new-noti", (msg: Notification) => {
      setNotifications((prevNotifications) => [msg, ...prevNotifications]);
    });
    return () => {
      socket.disconnect();
    };
  }, []);

  const UserHeadbarOption = () => {
    return (
      <OutsideClickHandler onClickOutside={() => setOpenOptions(false)}>
        <div className='user-headbar-options'>
          <Card className='user-headbar-options-card'>
            <Card.Meta
              avatar={
                <CustomAvatar
                  size={45}
                  userName={user?.name}
                  avatarSrc={user?.avatar}
                  bgColor={user?.avatar_color}
                />
              }
              title={user?.name}
              description={user?.email}
            />
          </Card>
          <Button
            type='text'
            className='user-headbar-option-btn'
            onClick={() => {
              navigate(
                `./${localStorageUtil.get("role")?.toLocaleLowerCase()}/profile`
              );
              setOpenOptions(false);
            }}
          >
            <Person />
            <Typography.Text>Profile</Typography.Text>
          </Button>
          <Button
            type='text'
            className='user-headbar-option-btn'
            onClick={() => {
              navigate(
                `./${localStorageUtil.get("role")?.toLocaleLowerCase()}/password`
              );
              setOpenOptions(false);
            }}
          >
            <Lock />
            <Typography.Text>Password</Typography.Text>
          </Button>
          <Button
            className='user-headbar-option-btn'
            onClick={() => logout()}
            type='text'
          >
            <Logout />
            <Typography.Text>Logout</Typography.Text>
          </Button>
        </div>
      </OutsideClickHandler>
    );
  };

  return (
    <>
      <header className='headbar'>
        <div
          style={{ display: "flex", alignItems: "center", gap: "var(--gap-s)" }}
          className='first-part'
        >
          <Button
            className='show-drawer-button'
            type='text'
            onClick={() => dispatch(openDrawer(true))}
          >
            <MenuOutlined />
          </Button>
          <h5 className='app-name' style={{ fontSize: "18px" }}>
            Project Management
          </h5>
        </div>
        <div className='second-part'>
          <Popover
            content={
              <div style={{ width: "300px", height: "400px" }}>
                <NotiList
                  notifications={notifications}
                  updateNotiList={setNotifications}
                />
              </div>
            }
            trigger='click'
          >
            <div className='notification'>
              <Badge count={unreadNoti} showZero>
                <BellOutlined className='bell-icon' />
              </Badge>
            </div>
          </Popover>
          <Popover
            content={<UserHeadbarOption />}
            trigger='click'
            open={openOptions}
            onOpenChange={() => setOpenOptions(true)}
          >
            <div className='headbar-avatar-wraper'>
              <CustomAvatar
                size={45}
                userName={user?.name}
                avatarSrc={user?.avatar}
                bgColor={user?.avatar_color}
              />
            </div>
          </Popover>
        </div>
      </header>
      <div className='headbar-placeholder'></div>
    </>
  );
};
