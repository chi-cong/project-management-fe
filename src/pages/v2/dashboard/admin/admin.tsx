import "./admin.css";
import { Sidebar } from "src/components/v2/sidebar";
import { Navigate, Outlet } from "react-router-dom";
import { useRoleChecker } from "src/share/hooks";
import { OUserRole } from "src/share/models";
import { AdminDrawer } from "src/components/v2/drawer";

export const Admin = () => {
  const checkRole = useRoleChecker();
  const route = window.location.pathname.replace(
    "/v2/dashboard/admin",
    ""
  ).length;

  return (
    <>
      <AdminDrawer />
      <div className='admin-page'>
        {checkRole(OUserRole.Admin) && (
          <>
            <Sidebar />
            <div className='route-content'>
              {route <= 1 && <Navigate to={"account"} />}
              <Outlet />
            </div>
          </>
        )}
      </div>
    </>
  );
};
