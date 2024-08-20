import "./super-admin.css";
import { Sidebar } from "src/components/v2/sidebar";
import { Navigate, Outlet } from "react-router-dom";
import { useRoleChecker } from "src/share/hooks";
import { OUserRole } from "src/share/models";
import { AdminDrawer } from "src/components/v2/drawer";

export const SuperAdmin = () => {
  const checkRole = useRoleChecker();
  const route = window.location.pathname.replace(
    "/v2/dashboard/super_admin",
    ""
  ).length;

  return (
    <>
      <AdminDrawer />
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
    </>
  );
};
