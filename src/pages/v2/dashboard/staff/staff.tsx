import "./staff.css";
import { Navigate, Outlet } from "react-router-dom";
import { StaffSidebar } from "src/components/v2/staff-sidebar";
import { useRoleChecker } from "src/share/hooks";
import { OUserRole } from "src/share/models";

export const Staff = () => {
  const checkRole = useRoleChecker();
  const route = window.location.pathname.replace(
    "/v2/dashboard/staff",
    ""
  ).length;

  return (
    <div className='staff-page'>
      {checkRole(OUserRole.Staff) && (
        <>
          <StaffSidebar />
          <div className='route-content'>
            {route <= 1 && <Navigate to={"/v2/dashboard/staff/profile"} />}
            <Outlet />
          </div>
        </>
      )}
    </div>
  );
};
