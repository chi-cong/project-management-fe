import { LoginFieldType } from "src/layouts";
import "./password.css";
import { Button, Card, Col, Form, Input, Row, Space, Typography } from "antd";

export const Password = () => {
  return (
    <div className="v2-password-page">
      <Row className="content-container">
        <Space direction="vertical" size="middle" style={{ width: "100%" }}>
          <div className="title-row">
            <h2>Change Password</h2>
          </div>
          <Row className="form-wrapper">
            <Col span={12}>
              <Card>
                <Form
                  name="password"
                  className="password-form"
                  autoComplete="off"
                >
                  <Form.Item<LoginFieldType>
                    name="password"
                    rules={[
                      { required: true, message: "Password is required" },
                    ]}
                    style={{ width: "100%" }}
                  >
                    <Input.Password placeholder="Old Password.." size="large" />
                  </Form.Item>
                  <Form.Item<LoginFieldType>
                    name="password"
                    rules={[
                      { required: true, message: "Password is required" },
                    ]}
                    style={{ width: "100%" }}
                  >
                    <Input.Password
                      placeholder="New Password..."
                      size="large"
                    />
                  </Form.Item>
                  <Form.Item<LoginFieldType>
                    name="password"
                    rules={[
                      { required: true, message: "Password is required" },
                    ]}
                    style={{ width: "100%" }}
                  >
                    <Input.Password
                      placeholder="Confirm new Password...."
                      size="large"
                    />
                  </Form.Item>
                  <Form.Item>
                    <Button
                      className="password-button"
                      type="primary"
                      htmlType="submit"
                      size="large"
                    >
                      Change
                    </Button>
                  </Form.Item>
                </Form>
              </Card>
            </Col>
          </Row>
        </Space>
      </Row>
    </div>
  );
};
