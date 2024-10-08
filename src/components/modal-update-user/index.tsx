import "./modal-update-user.css";
import React, { useEffect, useState } from "react";
import {
  Button,
  DatePicker,
  Form,
  FormProps,
  Input,
  message,
  Modal,
  Select,
  Space,
} from "antd";
import { userRoleOptions, utcToLocal } from "src/share/utils";
import dayjs, { Dayjs } from "dayjs";
import { OUserRole, RoleResponse, User, UserRole } from "src/share/models";
import { useUpdateUserMutation } from "src/share/services";

interface IUpdateUser {
  user_id?: string;
  username?: string;
  name: string;
  email: string;
  phone: string;
  birthday?: string | Dayjs;
  role?: UserRole;
}

type ModalUpdateUser = {
  isModalOpen: boolean;
  setIsModalOpen: (isShown: boolean) => void;
  user: User;
};

const ModalUpdateUser: React.FC<ModalUpdateUser> = ({
  isModalOpen,
  setIsModalOpen,
  user,
}) => {
  const [updateUser] = useUpdateUserMutation();
  const [form] = Form.useForm();
  const [currentRole, setCurrentRole] = useState<string | undefined>();
  const isAdmin =
    (user.role as RoleResponse)?.name === OUserRole.Admin ||
    (user.role as RoleResponse)?.name === OUserRole.SuperAdmin;

  const onFinish: FormProps<IUpdateUser>["onFinish"] = async (values) => {
    const sentValues = {
      username: values.username!,
      email: values.email,
      name: values.name,
      role: values.role!,
      birthday: values.birthday,
      phone: values.phone || "",
    };
    await updateUser({ userId: user.user_id, values: sentValues })
      .unwrap()
      .then(() => {
        message.success("User is Updated");
        setIsModalOpen(false);
      })
      .catch((e) => {
        message.error(e.data.message);
      });
  };

  const handleCancel = () => {
    setIsModalOpen(false);
    form.setFieldsValue({
      ...user,
      email: user.email,
      name: user.name,
      phone: user.phone,
      role: user.role && (user.role as RoleResponse).name,
      birthday: user.birthday ? utcToLocal(user?.birthday) : dayjs(),
    });
  };

  useEffect(() => {
    form.setFieldsValue({
      ...user,
      email: user.email,
      name: user.name,
      phone: user.phone,
      role: user.role && (user.role as RoleResponse).name,
      birthday: user.birthday ? utcToLocal(user?.birthday) : dayjs(),
    });
  }, [user, form]);

  return (
    <Modal
      className="wrapper"
      open={isModalOpen}
      centered
      onCancel={handleCancel}
      width={1000}
      footer={[]}
    >
      <h2
        style={{
          alignItems: "center",
          justifyContent: "center",
          textAlign: "center",
        }}
      >
        Update User
      </h2>
      <Form name="user-info" onFinish={onFinish} layout="vertical" form={form}>
        <div>
          <Form.Item<IUpdateUser>
            name="name"
            label="Name"
            rules={[{ required: true, message: "Name is required" }]}
          >
            <Input placeholder="Name..." size="large" disabled={isAdmin} />
          </Form.Item>
        </div>
        <div>
          <Form.Item<IUpdateUser>
            name="username"
            rules={[
              { required: true, message: "Username is required" },
              { pattern: /^\S+$/, message: "No whitespace's allowed" },
            ]}
            label="Username"
          >
            <Input placeholder="Username..." size="large" disabled={isAdmin} />
          </Form.Item>
        </div>
        <div>
          <Form.Item<IUpdateUser>
            name="email"
            label="Email"
            rules={[
              { required: true, message: "Email is required" },
              { pattern: /^\S+$/, message: "No whitespace's allowed" },
              {
                pattern: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                message: "Invalid email",
              },
            ]}
          >
            <Input placeholder="Email..." size="large" disabled={isAdmin} />
          </Form.Item>
        </div>
        <div>
          <Form.Item<IUpdateUser>
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
            <Input placeholder="Phone..." size="large" disabled={isAdmin} />
          </Form.Item>
        </div>
        <div>
          <Form.Item<IUpdateUser> name="birthday" label="Birthday">
            <DatePicker
              placeholder="Birthday..."
              size="large"
              style={{ width: "100%" }}
              maxDate={dayjs()}
              disabled={isAdmin}
            />
          </Form.Item>
        </div>
        <div>
          <Form.Item<IUpdateUser>
            name="role"
            label="Roles"
            rules={[{ required: true, message: "Role is required" }]}
          >
            <Select
              options={userRoleOptions.map((option) => ({
                ...option,
                disabled:
                  (option.value === OUserRole.Admin && isAdmin) ||
                  option.value === currentRole,
              }))}
              size="large"
              onChange={(value) => setCurrentRole(value as UserRole)}
              disabled={isAdmin}
            />
          </Form.Item>
        </div>
        <Form.Item className="update-user-form-btn">
          <Space>
            <Button
              type="primary"
              htmlType="submit"
              size="large"
              disabled={isAdmin}
            >
              Update
            </Button>
            <Button
              type="primary"
              ghost
              size="large"
              onClick={() => handleCancel()}
            >
              Cancel
            </Button>
          </Space>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default ModalUpdateUser;
