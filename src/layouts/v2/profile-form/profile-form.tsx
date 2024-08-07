import "./profile-form.css";
import React, { useEffect } from "react";
import {
  Button,
  DatePicker,
  Form,
  Input,
  Select,
  Space,
} from "antd";
import { userRoleOptions } from "src/share/utils";
import dayjs, { Dayjs } from "dayjs";
import { RoleResponse, User, UserRole } from "src/share/models";
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
  user: User;
};

export const ProfileForm: React.FC<ProfileForm> = ({
  user,
}) => {
    const [form] = Form.useForm();
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
    <>
      <Form name='user-info' layout='vertical' form={form}>
        <div>
          <Form.Item<UserInfor> name='name' label='Name'>
            <Input placeholder='Name...' size='large' />
          </Form.Item>
        </div>
        <div>
          <Form.Item<UserInfor>
            name='username'
            rules={[{ required: true, message: "Username is required" }]}
            label='Username'
          >
            <Input placeholder='Username...' size='large' />
          </Form.Item>
        </div>
        <div>
          <Form.Item<UserInfor> name='phone' label='Phone'>
            <Input placeholder='Phone...' size='large' />
          </Form.Item>
        </div>
        <div>
          <Form.Item<UserInfor>
            name='email'
            label='Email'
            rules={[{ required: true, message: "Email is required" }]}
          >
            <Input placeholder='Email...' size='large' />
          </Form.Item>
        </div>
        <div>
          <Form.Item<UserInfor> name='birthday' label='Birthday'>
            <DatePicker
              placeholder='Birthday...'
              size='large'
              style={{ width: "100%" }}
            />
          </Form.Item>
        </div>
        <div>
          <Form.Item<UserInfor>
            name='role'
            label='Roles'
            rules={[{ required: true, message: "Role is required" }]}
          >
            <Select options={userRoleOptions} size='large' />
          </Form.Item>
        </div>
        <Form.Item className='update-infor-btn'>
          <Space>
            <Button type='primary' htmlType='submit' size='large'>
              Update
            </Button>
          </Space>
        </Form.Item>
      </Form>
    </>
  );
};

