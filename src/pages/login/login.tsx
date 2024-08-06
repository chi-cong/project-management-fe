import "./login.css";
import { LoginForm } from "src/layouts/login-form";
import { Navigate } from "react-router-dom";
import { localStorageUtil } from "src/share/utils";

export const Login = () => {
  const accessToken = localStorageUtil.get("accessToken");
  const accessDate = Number(localStorageUtil.get("accessDate"));

  return (
    <>
      {accessToken && Date.now() - accessDate < 0 ? (
        <Navigate to={"/dashboard"} replace />
      ) : (
        <div className="login-page">
          <img src="src/assets/demo-logo/random.png" alt="Company Logo" />
          <div className="login-form-container">
            <LoginForm />
          </div>
        </div>
      )}
    </>
  );
};
