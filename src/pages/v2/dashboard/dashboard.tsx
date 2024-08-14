import "./dashboard.css";
import { Headbar } from "src/components/v2/headbar";
import { Outlet } from "react-router-dom";
import { Navigate } from "react-router-dom";
import { RoleResponse } from "src/share/models";
import { localStorageUtil, sessionStorageUtil } from "src/share/utils";
import { useGetUserDetailQuery } from "src/share/services";

export const Dashboard = () => {
  const { data } = useGetUserDetailQuery();

  const route = window.location.pathname.replace("/v2/dashboard", "").length;

  const routingByRole = () => {
    if (!sessionStorageUtil.get("accessToken")) {
      return <Navigate to={"/v2/login"} />;
    }
    if (route <= 1) {
      if ((data?.role as RoleResponse)?.name) {
        localStorageUtil.set("role", (data?.role as RoleResponse).name);
        return (
          <Navigate
            to={
              (data?.role as RoleResponse).name?.toLocaleLowerCase() as string
            }
          />
        );
      }
    }
  };

  return (
    <div className='dashboard'>
      <Headbar />
      <Outlet />
      {routingByRole()}
    </div>
  );
};
