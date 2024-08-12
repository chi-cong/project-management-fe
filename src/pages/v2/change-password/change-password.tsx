import { Card } from "antd";
import { ChangePasswordForm } from "src/layouts/v2/change-password/change-password-form.tsx";
import { useGetUserDetailQuery } from "src/share/services";

interface ChangePasswordForm {
  currentPassword?: string;
  newPassword?: string;
}
export const ChangePassword = () => {
  const { data: user } = useGetUserDetailQuery();

  return (
    <div className='change-password-container'>
      <Card className='personal-information' style={{ height: "100%" }}>
        <h2>Change Password</h2>
        <ChangePasswordForm email={user?.email} />
      </Card>
    </div>
  );
};
