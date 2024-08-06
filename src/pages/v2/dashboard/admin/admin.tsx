import "./admin.css";
import { Sidebar } from "src/components/v2/sidebar";
import { Outlet } from "react-router-dom";

export const Admin = () => {
  return (
    <div className='admin-page'>
      <Sidebar />
      <div className='route-content'>
        <Outlet />
      </div>
    </div>
  );
};
