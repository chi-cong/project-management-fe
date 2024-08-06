import "./dashboard.css";
import { Layout } from "antd";
import { Outlet, Navigate } from "react-router-dom";
import { Dashboardsidebar } from "src/layouts/dashboard-sidebar";

import { localStorageUtil } from "src/share/utils";

export const Dashboard = () => {
  const accessToken = () => localStorageUtil.get("accessToken");
  const accessDate = () => Number(localStorageUtil.get("accessDate"));
  const { Content } = Layout;

  return (
    <>
      {accessToken() && Date.now() - accessDate() <= 0 ? (
        <Layout>
          <Dashboardsidebar />
          <Layout>
            <Content className='content'>
              {window.location.pathname.replace("/dashboard", "").length <=
                1 && <Navigate to={"/dashboard/user-info"} />}
              <Outlet />
            </Content>
          </Layout>
        </Layout>
      ) : (
        <Navigate to={"/login"} replace />
      )}
    </>
  );
};
