import "./confirm-email-form.css";
import { Form, Input, Button, message, Spin } from "antd";
import { useClaimPasswordMutation } from "src/share/services/accountServices";

import type { FormProps } from "antd";

export type ComfirmEmailFormType = {
  email: string;
};

export const ConfirmEmailForm = ({
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
        >
          <Form.Item<ComfirmEmailFormType>
            name='email'
            rules={[{ required: true, message: "Email is required" }]}
          >
            <Input placeholder='Email' size='large' />
          </Form.Item>
          <Form.Item>
            <Button
              className='submit-button'
              type='primary'
              htmlType='submit'
              size='large'
            >
              Send OTP to email
            </Button>
          </Form.Item>
        </Form>
      </Spin>
    </>
  );
};
