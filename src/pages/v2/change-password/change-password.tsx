import { Card } from "antd";
import { ChangePasswordForm } from "src/layouts/v2/change-password/change-password-form.tsx";

interface ChangePasswordForm {
  currentPassword?: string;
  newPassword?: string;
}
export const ChangePassword = () => {
  return (
    <div className="change-password-container">
      <Card className="personal-information" style={{ height: "100%" }}>
        <h2>Change Password</h2>
        <ChangePasswordForm />
      </Card>
    </div>
  );
};
