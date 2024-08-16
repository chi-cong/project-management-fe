import "./manager.css";
import { ManagerSidebar } from "src/components/v2/sidebar";
import { Navigate, Outlet } from "react-router-dom";
import { useGetUserDetailQuery } from "src/share/services";
import { useRoleChecker } from "src/share/hooks";
import { OUserRole } from "src/share/models";

export const Manager = () => {
  const checkRole = useRoleChecker();
  const { data } = useGetUserDetailQuery();

  const route = window.location.pathname.replace(
    "/v2/dashboard/manager",
    ""
  ).length;

  return (
    <div className='manager-page'>
      {checkRole(OUserRole.Manager) && (
        <>
          <ManagerSidebar />
          <div className='route-content'>
            {route <= 1 && (
              <Navigate to={`department/${data?.department_id}`} />
            )}
            <Outlet />
          </div>
        </>
      )}
    </div>
  );
};
