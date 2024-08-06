import "./forgot-pass.css";
import { Link } from "react-router-dom";
import {
  ConfirmEmailForm,
  ConfirmOtpForm,
  ConfirNewPassForm,
} from "src/layouts/v2/forgot-pass-form";
import { Typography } from "antd";
import { useState } from "react";

export const ForgotPass = () => {
  const [currStep, setCurrStep] = useState<number>(0);
  const [email, setEmail] = useState<string>("");

  const formMap = () => {
    switch (currStep) {
      case 0:
        return (
          <>
            <Typography.Title level={3} className='title'>
              Reset Password
            </Typography.Title>
            <ConfirmEmailForm
              saveEmail={(userEmail: string) => {
                setEmail(userEmail);
                setCurrStep(1);
              }}
            />
          </>
        );
      case 1:
        return (
          <>
            <Typography.Title level={3} className='title'>
              Verify Token
            </Typography.Title>
            <ConfirmOtpForm
              email={email}
              setStep={(step) => setCurrStep(step)}
            />
          </>
        );
      default:
        return (
          <>
            <Typography.Title level={3} className='title'>
              Change Password
            </Typography.Title>
            <ConfirNewPassForm email={email} />
          </>
        );
    }
  };

  const titleMap = () => {
    switch (currStep) {
      case 0:
        return (
          <div className='forgot-password-title'>
            <h1 className='title'>Reset password </h1>
            <h1 className='title emphasized-text'>Project management</h1>
          </div>
        );
      case 1:
        return (
          <div className='forgot-password-title'>
            <h1 className='title'>Reset password </h1>
            <h1 className='title emphasized-text'>Project management</h1>
          </div>
        );
      default:
        return (
          <>
            <div className='forgot-password-title'>
              <h1 className='title'>Change your </h1>
              <h1 className='title emphasized-text'>Project management</h1>
              <h1 className='title'>account password</h1>
            </div>
          </>
        );
    }
  };

  return (
    <>
      <div className='forgot-pass-page'>
        {titleMap()}
        <div className='forgot-form-container'>
          {formMap()}
          <Typography.Text>
            Remember Password ? <Link to={"/v2/login"}>Login Now</Link>
          </Typography.Text>
        </div>
      </div>
    </>
  );
};
