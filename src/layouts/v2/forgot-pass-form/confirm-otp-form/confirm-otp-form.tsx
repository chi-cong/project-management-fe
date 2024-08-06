import "./confirm-otp-form.css";
import { Form, Input, Button, message, Spin } from "antd";
import { useVerifyOtpMutation } from "src/share/services/accountServices";

import type { FormProps } from "antd";

export type VerifyOtpFormType = {
  Otp: string;
};

export const ConfirmOtpForm = ({
  email,
  setStep,
}: {
  email: string;
  setStep: (step: number) => void;
}) => {
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
        setStep(2);
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
            <Input placeholder='OTP' size='large' />
          </Form.Item>
          <Form.Item>
            <div className='otp-form-btns'>
              <Button
                style={{ width: "47%" }}
                type='primary'
                htmlType='submit'
                size='large'
                ghost
              >
                Verify
              </Button>
              <Button
                style={{ width: "47%" }}
                type='primary'
                size='large'
                onClick={() => setStep(0)}
              >
                Cancel
              </Button>
            </div>
          </Form.Item>
        </Form>
      </Spin>
    </>
  );
};
