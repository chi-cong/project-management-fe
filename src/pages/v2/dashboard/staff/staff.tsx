import "./staff.css";
import { Navigate, Outlet } from "react-router-dom";
import { StaffSidebar } from "src/components/v2/staff-sidebar";

export const Staff = () => {
  const route = window.location.pathname.replace(
    "/v2/dashboard/staff",
    ""
  ).length;

  return (
    <div className="staff-page">
      <StaffSidebar />
      <div className="route-content">
        {route <= 1 && <Navigate to={"/v2/dashboard/staff/profile"} />}
        <Outlet />
      </div>
    </div>
  );
};
