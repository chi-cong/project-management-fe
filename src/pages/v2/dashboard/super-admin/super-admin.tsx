import "./super-admin.css";
import { Sidebar } from "src/components/v2/sidebar";
import { Navigate, Outlet } from "react-router-dom";
import { useRoleChecker } from "src/share/hooks";
import { OUserRole } from "src/share/models";

export const SuperAdmin = () => {
  const checkRole = useRoleChecker();
  const route = window.location.pathname.replace(
    "/v2/dashboard/super_admin",
    ""
  ).length;

  return (
    <div className='super-admin-page'>
      {checkRole(OUserRole.SuperAdmin) && (
        <>
          <Sidebar />
          <div className='route-content'>
            {route <= 1 && <Navigate to={"account"} />}
            <Outlet />
          </div>
        </>
      )}
    </div>
  );
};
