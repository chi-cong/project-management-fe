import { Form, Input, Button, message, Spin } from "antd";
import { useChangePasswordMutation } from "src/share/services/accountServices";
import { Link } from "react-router-dom";

import type { FormProps } from "antd";

export type ChangePasswordFormType = {
  newPassword: string;
  confirm: string;
};

export const ChangePasswordForm = ({ email }: { email: string }) => {
  const [changePassword, changePasswordStatus] = useChangePasswordMutation();

  const onFinish: FormProps<ChangePasswordFormType>["onFinish"] = async (
    values
  ) => {
    await changePassword({
      password: values.newPassword,
      email: email,
    })
      .unwrap()
      .then(() => {
        message.success("Pasword Changed");
      })
      .catch(() => {
        message.error("There was an error");
      });
  };

  return (
    <>
      <Spin
        spinning={changePasswordStatus.isLoading}
        size='large'
        tip='Sending Request'
      >
        <Form
          name='forgor-password'
          onFinish={onFinish}
          className='login-form'
          autoComplete='off'
        >
          <Form.Item<ChangePasswordFormType>
            name='newPassword'
            rules={[{ required: true, message: "New password is required" }]}
          >
            <Input.Password placeholder='New Password' />
          </Form.Item>
          <Form.Item>
            <Button style={{ width: "100%" }} type='primary' htmlType='submit'>
              Change Password
            </Button>
          </Form.Item>
          <Form.Item>
            <Link to={"/login"}>Back to login</Link>
          </Form.Item>
        </Form>
      </Spin>
    </>
  );
};
