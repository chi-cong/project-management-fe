import { Form, Input, Button, message, Spin } from "antd";
import { useVerifyOtpMutation } from "src/share/services/accountServices";
import { Link } from "react-router-dom";

import type { FormProps } from "antd";

export type VerifyOtpFormType = {
  Otp: string;
};

export const OtpForm = ({ email }: { email: string }) => {
  const [messageApi, contextHolder] = message.useMessage();
  const [verifyOtp, verifyOtpStatus] = useVerifyOtpMutation();

  const onFinish: FormProps<VerifyOtpFormType>["onFinish"] = async (values) => {
    await verifyOtp({
      token: values.Otp,
      email: email,
    })
      .unwrap()
      .then(() => {
        messageApi.success("OTP verified, continue to change password ");
      })
      .catch(() => {
        messageApi.error("There was an error");
      });
  };

  return (
    <>
      {contextHolder}
      <Spin
        spinning={verifyOtpStatus.isLoading}
        size='large'
        tip='Sending Request'
      >
        <Form
          name='forgor-password'
          onFinish={onFinish}
          className='login-form'
          autoComplete='off'
        >
          <Form.Item<VerifyOtpFormType>
            name='Otp'
            rules={[{ required: true, message: "OTP code is required" }]}
          >
            <Input placeholder='OTP' />
          </Form.Item>
          <Form.Item>
            <Button style={{ width: "100%" }} type='primary' htmlType='submit'>
              Verify
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
