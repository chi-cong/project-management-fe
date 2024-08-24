import "./login.css";
import { LoginForm } from "src/layouts/v2";
import { Col, Row, Typography } from "antd";
import { useNavigate } from "react-router-dom";
import { sessionStorageUtil } from "src/share/utils";
import { useRefreshTokenQuery } from "src/share/services";
import { useEffect } from "react";

export const Login = () => {
  const navigate = useNavigate();
  const getAccessToken = () => sessionStorageUtil.get("accessToken");
  const { data: newAccessToken, isSuccess } = useRefreshTokenQuery(undefined, {
    skip: getAccessToken() ? true : false,
  });

  useEffect(() => {
    const checkToken = () => {
      const accessToken = getAccessToken();
      if (!accessToken) {
        if (isSuccess) {
          sessionStorageUtil.set("accessToken", newAccessToken.accessToken);
          navigate("/v2/dashboard");
        }
      } else {
        navigate("/v2/dashboard");
      }
    };

    checkToken();
  }, [navigate, isSuccess, newAccessToken]);

  return (
    <div className='v2-login-page'>
      <Row className='content-container'>
        <Col className='login-title'>
          <h1 className='title'>Sign in to </h1>
          <h1 className='title emphasized-text'>Project management</h1>
          <Typography.Text>
            Welcome <span className='emphasized-text'>back !</span>
          </Typography.Text>
        </Col>
        <Col
          xxl={11}
          xl={11}
          lg={11}
          md={24}
          sm={24}
          xs={24}
          className='login-form-container'
        >
          <h2>Welcome to</h2>
          <h2 className='project-manager-title'>Project Management</h2>
          <LoginForm />
        </Col>
      </Row>
    </div>
  );
};
