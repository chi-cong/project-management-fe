import "./login-form.css";
import { Form, Input, Button, message, Spin, Checkbox } from "antd";
import { useLoginMutation } from "src/share/services/accountServices";
import { useNavigate } from "react-router-dom";
import { localStorageUtil, sessionStorageUtil } from "src/share/utils";
import { Link } from "react-router-dom";
import { useRoleChecker } from "src/share/hooks";

import type { FormProps } from "antd";
import { OUserRole } from "src/share/models";

export type LoginFieldType = {
  username?: string;
  password?: string;
  remember: boolean;
};
export type LoginReqBody = {
  email?: string;
  password?: string;
};

export const LoginForm = () => {
  const navigate = useNavigate();
  const [messageApi, contextHolder] = message.useMessage();
  const [loginService, loginStatus] = useLoginMutation();
  const checkRole = useRoleChecker();

  const onFinish: FormProps<LoginFieldType>["onFinish"] = async (values) => {
    await loginService({
      email: values.username,
      password: values.password,
    } as LoginReqBody)
      .unwrap()
      .then((resp) => {
        sessionStorageUtil.set("accessToken", resp.data.tokens.accessToken);
        sessionStorageUtil.set("role", resp.data.role);
        if (values.remember) {
          localStorageUtil.set("refreshToken", resp.data.tokens.refreshToken);
        }
        if (checkRole(OUserRole.Admin)) {
          navigate("/v2/dashboard/admin/account");
        }
      })
      .catch(() => {
        messageApi.error("Failed to Login");
      });
  };

  return (
    <>
      {contextHolder}
      <Spin spinning={loginStatus.isLoading} size='large' tip='Login...'>
        <Form
          name='login'
          onFinish={onFinish}
          className='login-form'
          autoComplete='off'
        >
          <Form.Item<LoginFieldType>
            name='username'
            rules={[{ required: true, message: "Username is required" }]}
          >
            <Input placeholder='Email' size='large' />
          </Form.Item>
          <Form.Item<LoginFieldType>
            name='password'
            rules={[{ required: true, message: "Password is required" }]}
          >
            <Input.Password placeholder='Password' size='large' />
          </Form.Item>
          <Form.Item>
            <Form.Item name='remember' valuePropName='checked' noStyle>
              <Checkbox>Remember me</Checkbox>
            </Form.Item>

            <Link className='forgot-password' to={"/v2/forgot-password"}>
              Forgot Password ?
            </Link>
          </Form.Item>
          <Form.Item>
            <Button
              className='login-button'
              type='primary'
              htmlType='submit'
              size='large'
            >
              Login
            </Button>
          </Form.Item>
        </Form>
      </Spin>
    </>
  );
};
