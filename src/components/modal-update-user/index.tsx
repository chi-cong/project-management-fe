import "./modal-update-user.css";
import React, { useEffect } from "react";
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
import { userRoleOptions } from "src/share/utils";
import dayjs, { Dayjs } from "dayjs";
import { RoleResponse, User, UserRole } from "src/share/models";
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
        setIsModalOpen(false);
        message.success("New user is created");
      })
      .catch((e) => {
        message.error(e.data.message);
      });
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  useEffect(() => {
    form.setFieldsValue({
      ...user,
      email: user.email,
      name: user.name,
      phone: user.phone,
      role: user.role && (user.role as RoleResponse).name,
      birthday: dayjs(
        user.birthday ? (user.birthday as string).substring(0, 10) : new Date()
      ),
    });
  });

  return (
    <Modal
      className='wrapper'
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
      <Form name='user-info' onFinish={onFinish} layout='vertical' form={form}>
        <div>
          <Form.Item<IUpdateUser> name='name' label='Name'>
            <Input placeholder='Name...' size='large' />
          </Form.Item>
        </div>
        <div>
          <Form.Item<IUpdateUser>
            name='username'
            rules={[{ required: true, message: "Username is required" }]}
            label='Username'
          >
            <Input placeholder='Username...' size='large' />
          </Form.Item>
        </div>
        <div>
          <Form.Item<IUpdateUser> name='phone' label='Phone'>
            <Input placeholder='Phone...' size='large' />
          </Form.Item>
        </div>
        <div>
          <Form.Item<IUpdateUser>
            name='email'
            label='Email'
            rules={[{ required: true, message: "Email is required" }]}
          >
            <Input placeholder='Email...' size='large' />
          </Form.Item>
        </div>
        <div>
          <Form.Item<IUpdateUser> name='birthday' label='Birthday'>
            <DatePicker
              placeholder='Birthday...'
              size='large'
              style={{ width: "100%" }}
            />
          </Form.Item>
        </div>
        <div>
          <Form.Item<IUpdateUser>
            name='role'
            label='Roles'
            rules={[{ required: true, message: "Role is required" }]}
          >
            <Select options={userRoleOptions} size='large' />
          </Form.Item>
        </div>
        <Form.Item className='update-user-form-btn'>
          <Space>
            <Button type='primary' htmlType='submit' size='large'>
              Create
            </Button>
            <Button
              type='primary'
              ghost
              size='large'
              onClick={() => setIsModalOpen(false)}
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
