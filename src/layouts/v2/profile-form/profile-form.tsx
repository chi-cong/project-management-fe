import "./profile-form.css";
import React, { useState, useEffect } from "react";
import {
  Button,
  DatePicker,
  Form,
  Input,
  Select,
  FormProps,
  Space,
  message,
} from "antd";
import { userRoleOptions } from "src/share/utils";
import dayjs, { Dayjs } from "dayjs";
import { RoleResponse, User, UserRole } from "src/share/models";
import { useUpdateUserDetailMutation } from "src/share/services";
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
      birthday: dayjs(
        user?.birthday
          ? (user?.birthday as string).substring(0, 10)
          : new Date()
      ),
    });
  });

  const handleUpdateClick = () => {
    setIsEdit(true);
  };

  const handleSaveClick = () => {};

  const handleCancelClick = () => {
    form.resetFields();
    setIsEdit(false);
  };

  return (
    <>
      <Form
        name='user-info'
        onFinish={onFinish}
        layout='vertical'
        form={form}
        disabled={!isEdit}
      >
        <div>
          <Form.Item<UserInfor> name='name' label='Name'>
            <Input
              placeholder='Name...'
              size='large'
              className={isEdit ? "input-enable" : "input-disable"}
            />
          </Form.Item>
        </div>
        <div>
          <Form.Item<UserInfor>
            name='username'
            rules={[{ required: true, message: "Username is required" }]}
            label='Username'
          >
            <Input
              placeholder='Username...'
              size='large'
              className={isEdit ? "input-enable" : "input-disable"}
            />
          </Form.Item>
        </div>
        <div>
          <Form.Item<UserInfor> name='phone' label='Phone'>
            <Input
              placeholder='Phone...'
              size='large'
              className={isEdit ? "input-enable" : "input-disable"}
            />
          </Form.Item>
        </div>
        <div>
          <Form.Item<UserInfor>
            name='email'
            label='Email'
            rules={[{ required: true, message: "Email is required" }]}
          >
            <Input
              placeholder='Email...'
              size='large'
              className={isEdit ? "input-enable" : "input-disable"}
            />
          </Form.Item>
        </div>
        <div>
          <Form.Item<UserInfor> name='birthday' label='Birthday'>
            <DatePicker
              placeholder='Birthday...'
              size='large'
              style={{ width: "100%" }}
              className={isEdit ? "input-enable" : "input-disable"}
            />
          </Form.Item>
        </div>
        <div>
          <Form.Item<UserInfor>
            name='role'
            label='Roles'
            rules={[{ required: true, message: "Role is required" }]}
          >
            <Select
              options={userRoleOptions}
              size='large'
              className={isEdit ? "input-enable" : "input-disable"}
            />
          </Form.Item>
        </div>
        {isEdit && (
          <Form.Item>
            <Space className='profile-form-btn'>
              <Button
                type='primary'
                htmlType='submit'
                size='large'
                onClick={handleSaveClick}
                className='update-infor-btn'
                disabled={false}
              >
                Save
              </Button>
              <Button
                type='primary'
                size='large'
                onClick={handleCancelClick}
                className='cancel-infor-btn'
              >
                Cancel
              </Button>
            </Space>
          </Form.Item>
        )}
      </Form>
      <Space className='profile-form-btn'>
        {!isEdit && (
          <Button
            type='primary'
            size='large'
            onClick={handleUpdateClick}
            className='update-infor-btn'
          >
            Update
          </Button>
        )}
      </Space>
    </>
  );
};
