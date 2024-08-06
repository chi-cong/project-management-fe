import "./login.css";
import { LoginForm } from "src/layouts/v2";
import { Typography } from "antd";

export const Login = () => {
  return (
    <div className='v2-login-page'>
      <div className='content-container'>
        <div className='login-title'>
          <h1 className='title'>Sign in to </h1>
          <h1 className='title emphasized-text'>Project management</h1>
          <Typography.Text>
            Welcome <span className='emphasized-text'>back !</span>{" "}
          </Typography.Text>
        </div>
        <div className='login-form-container'>
          <h2>Welcome to</h2>
          <h2 className='project-manager-title'>Project Management</h2>
          <LoginForm />
        </div>
      </div>
    </div>
  );
};
