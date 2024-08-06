import "./dashboard.css";
import { Headbar } from "src/components/v2/headbar";
import { Outlet } from "react-router-dom";

export const Dashboard = () => {
  return (
    <div className='dashboard'>
      <Headbar />
      <Outlet />
    </div>
  );
};
