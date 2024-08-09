import "./login.css";
import { LoginForm } from "src/layouts/v2";
import { Col, Row, Typography } from "antd";

export const Login = () => {
  return (
    <div className="v2-login-page">
      <Row className="content-container">
        <Col className="login-title">
          <h1 className="title">Sign in to </h1>
          <h1 className="title emphasized-text">Project management</h1>
          <Typography.Text>
            Welcome <span className="emphasized-text">back !</span>
          </Typography.Text>
        </Col>
        <Col
          xxl={11}
          xl={11}
          lg={11}
          md={24}
          sm={24}
          xs={24}
          className="login-form-container"
        >
          <h2>Welcome to</h2>
          <h2 className="project-manager-title">Project Management</h2>
          <LoginForm />
        </Col>
      </Row>
    </div>
  );
};
