import "./forgot-password.css";
import { Navigate } from "react-router-dom";
import { localStorageUtil } from "src/share/utils";
import { ChangePasswordForm, ForgotPasswordForm, OtpForm } from "src/layouts";
import { Steps } from "antd";
import { useState } from "react";

export const ForgotPassword = () => {
  const [currStep, setCurrStep] = useState<number>(0);
  const [email, setEmail] = useState<string>("");
  const accessToken = () => localStorageUtil.get("accessToken");
  const accessDate = () => localStorageUtil.get("accessDate");

  const forgotPasswordForms = [
    {
      title: "Confirm Email",
      content: (
        <ForgotPasswordForm
          saveEmail={(savedEmail: string) => {
            setEmail(savedEmail);
          }}
        />
      ),
    },
    {
      title: "Verify OTP",
      content: <OtpForm email={email} />,
    },
    {
      title: "Change Password",
      content: <ChangePasswordForm email={email} />,
    },
  ];
  return (
    <>
      {accessToken() &&
      accessDate() &&
      Date.now() - parseInt(accessDate() as string) < 0 ? (
        <Navigate to={"/dashboard"} replace />
      ) : (
        <div className='forgot-password-page'>
          <img src='src/assets/demo-logo/random.png' alt='Company Logo' />
          <div className='forgot-password-form-container'>
            <Steps
              current={currStep}
              onChange={(step) => setCurrStep(step)}
              items={forgotPasswordForms}
              progressDot
            />
            {forgotPasswordForms[currStep].content}
          </div>
        </div>
      )}
    </>
  );
};
