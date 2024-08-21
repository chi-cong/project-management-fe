import "./profile.css";
import { ProfileForm } from "src/layouts/v2/profile-form";
import { OUserRole, RoleResponse } from "src/share/models";
import { CloudUploadOutlined, UploadOutlined } from "@ant-design/icons";
import { CustomAvatar } from "src/components/v2";
import {
  useGetUserDetailQuery,
  useGetAvatarMutation,
} from "src/share/services";
import { Button, Card, Col, message, Row, Space, Upload } from "antd";
import { User } from "src/share/models";
import { sessionStorageUtil } from "src/share/utils";
import { useEffect, useState } from "react";
import type { UploadProps } from "antd";
const baseApi = import.meta.env.VITE_REQUEST_API_URL;

const UserInfo: React.FC<{ user?: User; refetch: () => void }> = ({
  user,
  refetch,
}) => {
  const avaFileProps: UploadProps = {
    name: "file",
    action: `${baseApi}upload/upload-avatar-from-local`,
    headers: {
      authorization: sessionStorageUtil.get("accessToken")! as string,
    },
    onChange(info) {
      if (info.file.status === "done") {
        message.success(`Avatar upload successfully`);
        refetch();
      } else if (info.file.status === "error") {
        message.error(`Avatar upload failed.`);
      }
    },
  };

  return (
    <div className='user-profile-form'>
      <div className='user-profile'>
        <CustomAvatar
          userName={user?.username}
          avatarSrc={user?.avatar}
          bgColor={user?.avatar_color}
          className='user-profile-avatar'
        />
        <div className='user-details'>
          <h3>{user?.name}</h3>
          <span className='role-label'>
            <div className='account-role'>
              {(user?.role as RoleResponse)?.name === OUserRole.SuperAdmin
                ? "ADMIN"
                : (user?.role as RoleResponse)?.name}
            </div>
          </span>
          <p>{user?.email}</p>
        </div>
        <Upload {...avaFileProps} className='avatar-upload-btn'>
          <Button className='upload-btn' style={{ width: "fit-contents" }}>
            <UploadOutlined /> Upload Avatar
          </Button>
        </Upload>
      </div>
    </div>
  );
};

const SelectNewAvatar: React.FC<{
  user?: User;
  refetch: () => unknown;
  setAvatar: (avaLink: string) => void;
}> = ({ user, refetch, setAvatar }) => {
  const [getAvatar] = useGetAvatarMutation();

  const avaFileProps: UploadProps = {
    name: "file",
    action: `${baseApi}upload/upload-avatar-from-local`,
    headers: {
      authorization: sessionStorageUtil.get("accessToken")! as string,
    },
    onChange(info) {
      if (info.file.status === "done") {
        message.success(`Avatar upload successfully`);
        refetch();
      } else if (info.file.status === "error") {
        message.error(`Avatar upload failed.`);
      }
    },
  };
  const fetchAvatar = async () => {
    await getAvatar({ avatar: user?.avatar })
      .unwrap()
      .then((link) => setAvatar(link));
  };

  useEffect(() => {
    if (user?.avatar) {
      fetchAvatar();
    }
  }, [user]);

  return (
    <div className='select-new-avatar-form'>
      <h3>Select new avatar</h3>
      <Upload {...avaFileProps}>
        <div className='avatar-upload'>
          <div className='avatar-upload-content'>
            <img
              src='/src/assets/imgs/profile image.png'
              alt='Placeholder Avatar'
              className='img'
              style={{ width: "30%", height: "100%" }}
            />
            <div>
              <CloudUploadOutlined className='upload-icon' />
            </div>
            <div className='text-content'>
              <p style={{ fontWeight: "bolder" }}>Choose new file</p>
              <p>JPG, PNG, WEBP, JEPG,... Max size of 800GB</p>
            </div>
          </div>
        </div>
      </Upload>
    </div>
  );
};

export const Profile = () => {
  const { data: user, refetch } = useGetUserDetailQuery();
  const [avatar, setAvatar] = useState<string>("");

  return (
    <div className='v2-profile-page'>
      <header>
        <h1>Profile</h1>
      </header>
      <div className='profile-container'>
        <Row
          className='profile-content'
          gutter={[16, 8]}
          style={{ alignItems: "stretch" }}
        >
          <Col sm={24} md={24} lg={7} className='user-profile-container'>
            <Space
              direction='vertical'
              style={{ width: "100%", height: "100%" }}
            >
              <Card className='card-box-user' style={{ height: "100%" }}>
                <UserInfo user={user} refetch={refetch} />
              </Card>
              <Card className='card-box-avatar' style={{ height: "100%" }}>
                <SelectNewAvatar
                  refetch={refetch}
                  setAvatar={setAvatar}
                  user={user}
                />
              </Card>
            </Space>
          </Col>
          <Col xs={24} sm={24} md={24} lg={17}>
            <Card className='personal-information' style={{ height: "100%" }}>
              <h2>Personal Information</h2>
              <ProfileForm user={user} />
            </Card>
          </Col>
        </Row>
      </div>
    </div>
  );
};
