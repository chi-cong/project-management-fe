import "./forgot-password-form.css";
import { Form, Input, Button, message, Spin } from "antd";
import { useClaimPasswordMutation } from "src/share/services/accountServices";
import { Link } from "react-router-dom";

import type { FormProps } from "antd";

export type ComfirmEmailFormType = {
  email: string;
};

export const ForgotPasswordForm = ({
  saveEmail,
}: {
  saveEmail: (saveEmail: string) => void;
}) => {
  const [messageApi, contextHolder] = message.useMessage();
  const [claimPassword, claimingStatus] = useClaimPasswordMutation();

  const onFinish: FormProps<ComfirmEmailFormType>["onFinish"] = async (
    values
  ) => {
    await claimPassword({
      email: values.email,
    })
      .unwrap()
      .then(() => {
        messageApi.success("Please check your email");
        saveEmail(values.email);
      })
      .catch(() => {
        messageApi.error("There was an error");
      });
  };

  return (
    <>
      {contextHolder}
      <Spin
        spinning={claimingStatus.isLoading}
        size='large'
        tip='Sending Request'
      >
        <Form
          name='forgor-password'
          onFinish={onFinish}
          className='forgot-password-form'
          autoComplete='off'
        >
          <Form.Item<ComfirmEmailFormType>
            name='email'
            rules={[{ required: true, message: "Email is required" }]}
          >
            <Input placeholder='Email' />
          </Form.Item>
          <Form.Item>
            <Button className='submit-button' type='primary' htmlType='submit'>
              Send OTP to email
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
