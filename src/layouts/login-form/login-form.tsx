import "./login-form.css";
import { Form, Input, Button, message, Spin } from "antd";
import { useLoginMutation } from "src/share/services/accountServices";
import { useNavigate } from "react-router-dom";
import { localStorageUtil, sessionStorageUtil } from "src/share/utils";
import { Link } from "react-router-dom";

import type { FormProps } from "antd";

export type LoginFieldType = {
  username?: string;
  password?: string;
  remember?: boolean;
};
export type LoginReqBody = {
  email?: string;
  username?: string;
  password?: string;
};

export const LoginForm = () => {
  const navigate = useNavigate();
  const [messageApi, contextHolder] = message.useMessage();
  const [loginService, loginStatus] = useLoginMutation();

  const onFinish: FormProps<LoginFieldType>["onFinish"] = async (values) => {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    let isEmail = false;
    if (values.username) {
      isEmail = emailRegex.test(values?.username);
    }

    await loginService({
      ...(isEmail ? { email: values.username } : { username: values.username }),
      password: values.password,
    } as LoginReqBody)
      .unwrap()
      .then((resp) => {
        sessionStorageUtil.set("accessToken", resp.data.tokens.accessToken);
        localStorageUtil.set("refreshToken", resp.data.tokens.refreshToken);
        localStorageUtil.set("role", resp.data.role);
        localStorageUtil.set("accessDate", Date.now() + 86400000);
        navigate("/dashboard");
      })
      .catch(() => {
        messageApi.error("Failed to Login");
      });
  };

  return (
    <>
      {contextHolder}
      <Spin spinning={loginStatus.isLoading} size='large' tip=''>
        <Form
          name='login'
          onFinish={onFinish}
          className='login-form'
          autoComplete='off'
        >
          <Form.Item<LoginFieldType>
            name='username'
            rules={[
              { required: true, message: "Username or email is required" },
              { pattern: /^\S+$/, message: "Contains no whitespace" },
            ]}
          >
            <Input placeholder='Username or Email' />
          </Form.Item>
          <Form.Item<LoginFieldType>
            name='password'
            rules={[{ required: true, message: "Password is required" }]}
          >
            <Input.Password placeholder='Password' />
          </Form.Item>
          <Form.Item>
            <Link to={"/forgot-password"}>Forgot Password ?</Link>
          </Form.Item>
          <Form.Item>
            <Button className='login-button' type='primary' htmlType='submit'>
              Login
            </Button>
          </Form.Item>
        </Form>
      </Spin>
    </>
  );
};
