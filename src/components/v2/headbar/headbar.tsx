import "./headbar.css";
import { Typography, Popover, Button, Card } from "antd";
import { CustomAvatar } from "src/components/v2/custom-avatar";
import { Logout, Lock, Person } from "src/assets/icons";
import { useNavigate } from "react-router-dom";
import { localStorageUtil, sessionStorageUtil } from "src/share/utils";
import { useDispatch } from "react-redux";
import { hrManagementApi } from "src/share/services/";

export const Headbar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const logout = (): void => {
    sessionStorageUtil.delete("accessToken");
    localStorageUtil.delete("refreshToken");
    dispatch(hrManagementApi.util.resetApiState());
    navigate("/login");
  };

  const UserHeadbarOption = () => {
    return (
      <div className='user-headbar-options'>
        <Card className='user-headbar-options-card'>
          <Card.Meta
            avatar={<CustomAvatar size={45} userName='N' />}
            title={"Nguyen Van A"}
            description={"nguyenvana@gmail.com"}
          />
        </Card>
        <Button
          type='text'
          className='user-headbar-option-btn'
          onClick={() => navigate("./profile")}
        >
          <Person />
          <Typography.Text>Profile</Typography.Text>
        </Button>
        <Button type='text' className='user-headbar-option-btn'>
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
        <Typography.Title level={5}>Project Management</Typography.Title>
        <Popover content={<UserHeadbarOption />} trigger='click'>
          <div className='headbar-avatar-wraper'>
            <CustomAvatar size={45} userName='N' />
          </div>
        </Popover>
      </header>
      <div className='headbar-placeholder'></div>
    </>
  );
};
