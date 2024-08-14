import "./staff.css";
import { Sidebar } from "src/components/v2/sidebar";
import { Navigate, Outlet } from "react-router-dom";

export const Staff = () => {
  const route = window.location.pathname.replace(
    "/v2/dashboard/staff",
    ""
  ).length;

  return (
    <div className="staff-page">
      <Sidebar />
      <div className="route-content">
        {route <= 1 && <Navigate to={"account"} />}
        <Outlet />
      </div>
    </div>
  );
};
