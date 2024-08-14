import "./admin.css";
import { Sidebar } from "src/components/v2/sidebar";
import { Navigate, Outlet } from "react-router-dom";

export const Admin = () => {
  const route = window.location.pathname.replace(
    "/v2/dashboard/admin",
    ""
  ).length;

  return (
    <div className='admin-page'>
      <Sidebar />
      <div className='route-content'>
        {route <= 1 && <Navigate to={"account"} />}
        <Outlet />
      </div>
    </div>
  );
};
