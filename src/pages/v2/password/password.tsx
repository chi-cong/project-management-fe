import "./password.css";
import {
  useChangePasswordMutation,
  useGetUserDetailQuery,
} from "src/share/services";
import { Button, Card, Col, Form, FormProps, Input, message, Row } from "antd";

export type ChangePasswordFormType = {
  currentPassword: string;
  newPassword: string;
  confirm: string;
};

export const Password = () => {
  const [changePassword] = useChangePasswordMutation();
  const { data: user } = useGetUserDetailQuery();

  const onFinish: FormProps<ChangePasswordFormType>["onFinish"] = async (
    values
  ) => {
    await changePassword({
      password: values.newPassword,
      email: user?.email,
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
    <div className='v2-password-page'>
      <Row className='content-container' style={{ width: "100%" }}>
        <div
          style={{
            width: "100%",
            display: "flex",
            justifyContent: "center",
            gap: "var(--gap-xl)",
            flexDirection: "column",
          }}
        >
          <div className='title-row'>
            <h2>Change Password</h2>
          </div>
          <div
            className='form-row'
            style={{
              width: "100%",
              display: "flex",
              justifyContent: "center",
            }}
          >
            <div
              className='form-wrapper'
              style={{
                width: "100%",
              }}
            >
              <Col style={{ width: "100%" }}>
                <Card>
                  <Form
                    onFinish={onFinish}
                    name='password'
                    className='password-form'
                    autoComplete='off'
                  >
                    <Form.Item<ChangePasswordFormType>
                      name='currentPassword'
                      rules={[
                        { required: true, message: "Password is required" },
                      ]}
                      style={{ width: "100%" }}
                    >
                      <Input.Password
                        placeholder='Old Password..'
                        size='large'
                      />
                    </Form.Item>
                    <Form.Item<ChangePasswordFormType>
                      name='newPassword'
                      rules={[
                        { required: true, message: "Password is required" },
                      ]}
                      style={{ width: "100%" }}
                    >
                      <Input.Password
                        placeholder='New Password...'
                        size='large'
                      />
                    </Form.Item>
                    <Form.Item<ChangePasswordFormType>
                      name='confirm'
                      rules={[
                        { required: true, message: "Password is required" },
                        ({ getFieldValue }) => ({
                          validator(_, value) {
                            if (
                              !value ||
                              getFieldValue("newPassword") === value
                            ) {
                              return Promise.resolve();
                            }
                            return Promise.reject(
                              new Error(
                                "The new password that you entered do not match!"
                              )
                            );
                          },
                        }),
                      ]}
                      style={{ width: "100%" }}
                    >
                      <Input.Password
                        placeholder='Confirm new Password....'
                        size='large'
                      />
                    </Form.Item>
                    <Form.Item>
                      <Button
                        className='password-button'
                        type='primary'
                        htmlType='submit'
                        size='large'
                      >
                        Change
                      </Button>
                    </Form.Item>
                  </Form>
                </Card>
              </Col>
            </div>
          </div>
        </div>
      </Row>
    </div>
  );
};
