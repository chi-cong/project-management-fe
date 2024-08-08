import "./profile.css";
import { ProfileForm } from "src/layouts/v2/profile-form";
import { RoleResponse } from "src/share/models";
import { UploadOutlined } from "@ant-design/icons";
import { CustomAvatar } from "src/components/v2";
import {
  useGetUserDetailQuery,
  useGetAvatarMutation,
} from "src/share/services";
import { Card, Col, message, Row, Space, Upload } from "antd";
import { User } from "src/share/models";
import { sessionStorageUtil } from "src/share/utils";
import { useEffect, useState } from "react";

import type { UploadProps } from "antd";

const baseApi = import.meta.env.VITE_REQUEST_API_URL;

const UserInfo: React.FC<{ user?: User }> = ({ user }) => {
  return (
    <div className="user-profile-form">
      <div className="user-profile">
        <CustomAvatar
          size={350}
          userName={user?.username}
          avatarSrc={user?.avatar}
          className="user-profile-avatar"
        />
        <div className="user-details">
          <h3>{user?.name}</h3>
          <span className="role-label">
            {user?.role ? (user?.role as RoleResponse).name : ""}
          </span>
          <p>{user?.email}</p>
        </div>
      </div>
    </div>
  );
};

const SelectNewAvatar: React.FC<{
  user?: User;
  refetch: () => unknown;
  setAvatar: (avaLink: string) => unknown;
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
    <div className="select-new-avatar-form">
      <h3>Select new avatar</h3>
      <div className="avatar-upload">
        <img
          src="/src/assets/imgs/profile image.png"
          alt="Placeholder Avatar"
          className="img"
          style={{ width: "30%", height: "100%" }}
        />
        <div>
          <UploadOutlined className="upload-icon" />
        </div>
        <Upload {...avaFileProps}>
          <div className="text-content">
            <p style={{ fontWeight: "bolder" }}>Choose new file</p>
            <p>JPG, PNG, WEBP, JEPG,... Max size of 800GB</p>
          </div>
        </Upload>
      </div>
    </div>
  );
};

export const Profile = () => {
  const { data: user, isLoading, refetch } = useGetUserDetailQuery();
  const [avatar, setAvatar] = useState<string>("");

  return (
    <div className="v2-profile-page">
      <header>
        <h1>Profile</h1>
      </header>
      <div className="profile-container">
        <Row
          className="profile-content"
          gutter={[16, 8]}
          style={{ alignItems: "stretch" }}
        >
          <Col sm={24} md={10} lg={7} className="user-profile-container">
            <Space
              direction="vertical"
              style={{ width: "100%", height: "100%" }}
            >
              <Card className="card-box-shadow" style={{ height: "100%" }}>
                <UserInfo user={user} />
              </Card>
              <Card className="card-box-shadow" style={{ height: "100%" }}>
                <SelectNewAvatar
                  refetch={refetch}
                  setAvatar={setAvatar}
                  user={user}
                />
              </Card>
            </Space>
          </Col>
          <Col sm={24} md={14} lg={17}>
            <Card className="personal-information" style={{ height: "100%" }}>
              <h2>Personal Information</h2>
              <ProfileForm user={user} />
            </Card>
          </Col>
        </Row>
      </div>
    </div>
  );
};
