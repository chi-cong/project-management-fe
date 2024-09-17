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
import { useState } from "react";
import { OutsideClickHandler, NotiList } from "src/components";

export const Headbar = () => {
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
            content={<NotiList />}
            trigger='click'
            placement='topRight'
            // open={openOptions}
            // onOpenChange={() => setOpenOptions(true)}
          >
            <div className='notification'>
              <Badge count={notifications.length} showZero>
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
