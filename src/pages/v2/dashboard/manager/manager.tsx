import "./manager.css";
import { Sidebar } from "src/components/v2/sidebar";
import { Navigate, Outlet } from "react-router-dom";
import { useGetUserDetailQuery } from "src/share/services";

export const Manager = () => {
  const { data } = useGetUserDetailQuery();

  const route = window.location.pathname.replace(
    "/v2/dashboard/manager",
    ""
  ).length;

  return (
    <div className='manager-page'>
      <Sidebar />
      <div className='route-content'>
        {route <= 1 && <Navigate to={`department/${data?.department_id}`} />}
        <Outlet />
      </div>
    </div>
  );
};
