import { Form, Input, Button, message, Spin } from "antd";
import { useChangePasswordMutation } from "src/share/services/accountServices";

import type { FormProps } from "antd";

export type ChangePasswordFormType = {
  newPassword: string;
  confirm: string;
};

export const ConfirNewPassForm = ({ email }: { email: string }) => {
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
            <Input.Password placeholder='Confirm New Password' size='large' />
          </Form.Item>
          <Form.Item<ChangePasswordFormType>
            name='confirm'
            rules={[
              { required: true, message: "Confirm your new password" },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue("newPassword") === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(
                    new Error("The new password that you entered do not match!")
                  );
                },
              }),
            ]}
          >
            <Input.Password placeholder='New Password' size='large' />
          </Form.Item>
          <Form.Item>
            <Button
              style={{ width: "100%" }}
              type='primary'
              htmlType='submit'
              size='large'
            >
              Change Password
            </Button>
          </Form.Item>
        </Form>
      </Spin>
    </>
  );
};
