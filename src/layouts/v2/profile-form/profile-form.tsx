import "./profile-form.css";
import React, { useState, useEffect } from "react";
import {
  Button,
  DatePicker,
  Form,
  Input,
  FormProps,
  Space,
  message,
} from "antd";
import dayjs, { Dayjs } from "dayjs";
import { RoleResponse, User, UserRole } from "src/share/models";
import { useUpdateUserDetailMutation } from "src/share/services";
import { utcToLocal } from "src/share/utils";
import { useRoleChecker } from "src/share/hooks";
import { OUserRole, Project } from "src/share/models";
interface UserInfor {
  user_id?: string;
  username?: string;
  name: string;
  email: string;
  phone: string;
  birthday?: string | Dayjs;
  role?: UserRole;
}

type ProfileForm = {
  user?: User;
};

export const ProfileForm: React.FC<ProfileForm> = ({ user }) => {
  const [form] = Form.useForm();
  const [isEdit, setIsEdit] = useState(false);
  const [updateUserDetail] = useUpdateUserDetailMutation();
  const checkRole = useRoleChecker();
  const isStaff = checkRole(OUserRole.Staff);

  const onFinish: FormProps<UserInfor>["onFinish"] = async (values) => {
    const sentValues = {
      username: values.username!,
      email: values.email,
      name: values.name,
      role: values.role!,
      birthday: values.birthday,
      phone: values.phone || "",
    };
    await updateUserDetail({ ...sentValues })
      .unwrap()
      .then(() => {
        message.success("Your Profile is updated");
        handleCancelClick();
      })
      .catch((e) => {
        message.error(e.data.message);
      });
  };

  useEffect(() => {
    form.setFieldsValue({
      ...user,
      email: user?.email,
      name: user?.name,
      phone: user?.phone,
      role: user?.role && (user?.role as RoleResponse).name,
      birthday: utcToLocal(user?.birthday),
    });
  }, [user, form]);

  const handleUpdateClick = () => {
    setIsEdit(true);
  };

  const handleCancelClick = () => {
    setIsEdit(false);
  };

  return (
    <>
      <Form
        name="user-info"
        onFinish={onFinish}
        layout="vertical"
        form={form}
        disabled={!isEdit}
      >
        <div>
          <Form.Item<UserInfor>
            name="name"
            label="Name"
            rules={[{ required: true, message: "Username is required" }]}
          >
            <Input
              placeholder="Name..."
              size="large"
              className={isEdit ? "input-enable" : "input-disable"}
            />
          </Form.Item>
        </div>
        {!isStaff && (
          <div>
            <Form.Item<UserInfor>
              name="username"
              rules={[
                { required: true, message: "Username is required" },
                { pattern: /^\S+$/, message: "Contains no whitespace" },
              ]}
              label="Username"
            >
              <Input
                placeholder="Username..."
                size="large"
                className={
                  isEdit && !isStaff ? "input-enable" : "input-disable"
                }
              />
            </Form.Item>
          </div>
        )}
        <div>
          <Form.Item<UserInfor>
            name="email"
            label="Email"
            rules={[
              { required: true, message: "Email is required" },
              { pattern: /^\S+$/, message: "Contains no whitespace" },
              {
                pattern: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                message: "Invalid email form",
              },
            ]}
          >
            <Input
              placeholder="Email..."
              size="large"
              className={isEdit ? "input-enable" : "input-disable"}
            />
          </Form.Item>
        </div>
        <div>
          <Form.Item<UserInfor>
            name="phone"
            label="Phone"
            rules={[
              { required: true, message: "Phone is required" },
              {
                pattern:
                  /(?:\+84|0084|0)[235789][0-9]{1,2}[0-9]{7}(?:[^\d]+|$)/g,
                message: "Invalid Vietnam phone number",
              },
            ]}
          >
            <Input
              placeholder="Phone..."
              size="large"
              className={isEdit ? "input-enable" : "input-disable"}
            />
          </Form.Item>
        </div>
        <div>
          <Form.Item<UserInfor> name="birthday" label="Birthday">
            <DatePicker
              placeholder="Birthday..."
              size="large"
              style={{ width: "100%" }}
              className={isEdit ? "input-enable" : "input-disable"}
              maxDate={dayjs()}
            />
          </Form.Item>
        </div>
        {isEdit && (
          <Form.Item>
            <Space className="profile-form-btn">
              <Button
                type="primary"
                htmlType="submit"
                size="large"
                className="update-infor-btn"
                disabled={false}
              >
                Save
              </Button>
              <Button
                type="primary"
                size="large"
                onClick={handleCancelClick}
                className="cancel-infor-btn"
              >
                Cancel
              </Button>
            </Space>
          </Form.Item>
        )}
      </Form>
      <Space className="profile-form-btn">
        {!isEdit && (
          <Button
            type="primary"
            size="large"
            onClick={handleUpdateClick}
            className="update-infor-btn"
          >
            Update
          </Button>
        )}
      </Space>
    </>
  );
};
