import "./headbar.css";
import { Typography, Popover, Button, Card } from "antd";
import { CustomAvatar } from "src/components/v2/custom-avatar";
import { Logout, Lock, Person } from "src/assets/icons";
import { useNavigate } from "react-router-dom";
import { localStorageUtil, sessionStorageUtil } from "src/share/utils";
import { useDispatch } from "react-redux";
import { hrManagementApi } from "src/share/services/";
import { useGetUserDetailQuery } from "src/share/services/";
import { MenuOutlined } from "@ant-design/icons";
import { openDrawer } from "src/libs/redux/drawerSlice";

export const Headbar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { data: user } = useGetUserDetailQuery();

  const logout = (): void => {
    sessionStorageUtil.delete("accessToken");
    localStorageUtil.delete("refreshToken");
    dispatch(hrManagementApi.util.resetApiState());
    navigate("/v2/login");
  };

  const UserHeadbarOption = () => {
    return (
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
          onClick={() =>
            navigate(
              `./${localStorageUtil.get("role")?.toLocaleLowerCase()}/profile`
            )
          }
        >
          <Person />
          <Typography.Text>Profile</Typography.Text>
        </Button>
        <Button
          type='text'
          className='user-headbar-option-btn'
          onClick={() =>
            navigate(
              `./${localStorageUtil.get("role")?.toLocaleLowerCase()}/password`
            )
          }
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
    );
  };

  return (
    <>
      <header className='headbar'>
        <div
          style={{ display: "flex", alignItems: "center", gap: "var(--gap-s)" }}
        >
          <Button
            className='show-drawer-button'
            type='text'
            onClick={() => dispatch(openDrawer(true))}
          >
            <MenuOutlined />
          </Button>
          <h5 style={{ fontSize: "18px" }}>Project Management</h5>
        </div>
        <Popover content={<UserHeadbarOption />} trigger='click'>
          <div className='headbar-avatar-wraper'>
            <CustomAvatar
              size={45}
              userName={user?.name}
              avatarSrc={user?.avatar}
              bgColor={user?.avatar_color}
            />
          </div>
        </Popover>
      </header>
      <div className='headbar-placeholder'></div>
    </>
  );
};
