import {
  Button,
  DatePicker,
  Input,
  Modal,
  Space,
  Form,
  FormProps,
  Select,
  message,
} from "antd";
import React from "react";
import "./modal-create-user.css";
import { UserRole } from "src/share/models";
import { Dayjs } from "dayjs";
import { userRoleOptions } from "src/share/utils";
import { useCreateUserMutation } from "src/share/services";

type ModalCreateUser = {
  isModalOpen: boolean;
  setIsModalOpen: (isShown: boolean) => void;
};
interface ICreateUser {
  user_id?: string;
  username?: string;
  password?: string;
  name: string;
  email: string;
  phone: string;
  birthday?: string | Dayjs;
  role?: UserRole;
}

const ModalCreateUser: React.FC<ModalCreateUser> = ({
  isModalOpen,
  setIsModalOpen,
}) => {
  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const [createUser] = useCreateUserMutation();

  const onFinish: FormProps<ICreateUser>["onFinish"] = async (values) => {
    const sentValues = {
      password: values.password!,
      username: values.username!,
      email: values.email,
      name: values.name,
      role: values.role!,
      birthday: values.birthday,
      phone: values.phone || "",
    };
    await createUser(sentValues)
      .unwrap()
      .then(() => {
        setIsModalOpen(false);
        message.success("New user is created");
      })
      .catch((e) => {
        message.error(e.data.message);
      });
  };

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
        Create User
      </h2>
      <Form name='user-info' onFinish={onFinish} layout='vertical'>
        <div>
          <Form.Item<ICreateUser> name='name' label='Name'>
            <Input placeholder='Name...' size='large' />
          </Form.Item>
        </div>
        <div>
          <Form.Item<ICreateUser>
            name='username'
            rules={[{ required: true, message: "Username is required" }]}
            label='Username'
          >
            <Input placeholder='Username...' size='large' />
          </Form.Item>
        </div>
        <div>
          <Form.Item<ICreateUser>
            name='password'
            rules={[{ required: true, message: "Password is required" }]}
            label='Password'
          >
            <Input.Password placeholder='Password...' size='large' />
          </Form.Item>
        </div>
        <div>
          <Form.Item<ICreateUser> name='phone' label='Phone'>
            <Input placeholder='Phone...' size='large' />
          </Form.Item>
        </div>
        <div>
          <Form.Item<ICreateUser>
            name='email'
            label='Email'
            rules={[{ required: true, message: "Email is required" }]}
          >
            <Input placeholder='Email...' size='large' />
          </Form.Item>
        </div>
        <div>
          <Form.Item<ICreateUser> name='birthday' label='Birthday'>
            <DatePicker
              placeholder='Birthday...'
              size='large'
              style={{ width: "100%" }}
            />
          </Form.Item>
        </div>
        <div>
          <Form.Item<ICreateUser>
            name='role'
            label='Roles'
            rules={[{ required: true, message: "Role is required" }]}
          >
            <Select options={userRoleOptions} size='large' />
          </Form.Item>
        </div>
        <Form.Item className='create-user-form-btn'>
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

export default ModalCreateUser;
