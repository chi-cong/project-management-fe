import "./user-advance.css";
import { Button, Typography, Row, Col, Popconfirm, message, Input } from "antd";
import {
  useDeleteUserMutation,
  useChangePasswordMutation,
} from "src/share/services";

import type { UserRole } from "src/share/models";
import { useState } from "react";

interface propsType {
  userRole?: UserRole;
  userId?: string;
  userEmail?: string;
  setOpenAccountTab: (isOpen: false) => void;
}

export const UserAdvance = ({
  userId,
  userEmail,
  setOpenAccountTab,
}: propsType) => {
  const { Text } = Typography;

  const [newPassword, setNewPassword] = useState<string>("");
  const [messageApi] = message.useMessage();
  const [deleteUser] = useDeleteUserMutation();
  const [changePassword] = useChangePasswordMutation();

  const confirmDeleteUser = async () => {
    await deleteUser({ userId })
      .then(() => {
        message.success("Succesfully delete account");
        setOpenAccountTab(false);
      })
      .catch(() => {
        message.error("Failed to delete account");
      });
  };

  return (
    <>
      <div className='user-advance-tab'>
        <Row className='reset-password'>
          <Col span={4}>
            <Text>Reset Password</Text>
          </Col>
          <Col span={14}>
            <Input.Password
              placeholder='New password'
              className='new-password-input'
              onChange={(e) => {
                setNewPassword(e.target.value);
              }}
            />
          </Col>
          <Col span={6}>
            <Popconfirm
              title='Reset Password'
              description="Are you sure to reset this account's password ?"
              okText='Yes'
              cancelText='No'
              onConfirm={async () => {
                messageApi.loading("Changing Password");
                await changePassword({
                  email: userEmail,
                  password: newPassword,
                })
                  .unwrap()
                  .then(() => messageApi.success("Password changed"))
                  .catch(() => messageApi.error("Failed to change password"));
              }}
            >
              <Button type='primary' danger>
                Reset
              </Button>
            </Popconfirm>
          </Col>
        </Row>
        <Row className='reset-password'>
          <Col span={4}>
            <Text>Delete Account</Text>
          </Col>
          <Col offset={14} span={6}>
            <Popconfirm
              title='Delete Account'
              description='Are you sure to delete this account ?'
              okText='Yes'
              cancelText='No'
              onConfirm={confirmDeleteUser}
            >
              <Button type='primary' danger>
                Delete
              </Button>
            </Popconfirm>
          </Col>
        </Row>
      </div>
    </>
  );
};
