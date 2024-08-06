import React, { useEffect, useState } from "react";
import "./dashboard-sidebar.css";
import { Link, useNavigate } from "react-router-dom";
import {
  TeamOutlined,
  ApartmentOutlined,
  ProjectOutlined,
  UserOutlined,
  LogoutOutlined,
} from "@ant-design/icons";
import { localStorageUtil } from "src/share/utils";
import { useDispatch } from "react-redux";
import { hrManagementApi } from "src/share/services";
import { useRoleChecker } from "src/share/hooks";

import { Layout, Menu } from "antd";
import { OUserRole } from "src/share/models";
const { Sider } = Layout;

const adminMenuItems = [
  {
    key: "0",
    icon: <UserOutlined />,
    label: "Account Detail",
    url: "user-info",
  },
  {
    key: "1",
    icon: <TeamOutlined />,
    label: "Accounts",
    url: "accounts",
  },
  {
    key: "2",
    icon: <ApartmentOutlined />,
    label: "Departments ",
    url: "departments",
  },
  {
    key: "3",
    icon: <ProjectOutlined />,
    label: " Projects",
    url: "projects",
  },
  {
    key: "4",
    icon: <LogoutOutlined />,
    label: "Log Out",
  },
];

const defaultMenuItems2 = [
  {
    key: "0",
    icon: <UserOutlined />,
    label: "Account Detail",
    url: "user-info",
  },
  {
    key: "1",
    icon: <ApartmentOutlined />,
    label: "Departments ",
    url: "departments",
  },
  {
    key: "2",
    icon: <ProjectOutlined />,
    label: " Projects",
    url: "projects",
  },
  {
    key: "3",
    icon: <LogoutOutlined />,
    label: "Log Out",
  },
];

const Dashboardsidebar: React.FC = () => {
  const [collapsed, setCollapsed] = useState<boolean>(false);
  const [selectItem, setSelectItem] = useState<string>("0");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const checkRole = useRoleChecker();

  const authorizedMenuItem = () => {
    if (checkRole(OUserRole.Admin)) {
      return adminMenuItems;
    }
    return defaultMenuItems2;
  };

  const logout = (): void => {
    localStorageUtil.delete("accessToken");
    localStorageUtil.delete("refreshToken");
    dispatch(hrManagementApi.util.resetApiState());
    navigate("/login");
  };

  const setDefaultItem = () => {
    const currPath = window.location.pathname.replace("/dashboard/", "");
    if (checkRole(OUserRole.Admin)) {
      switch (currPath) {
        case "accounts":
          setSelectItem("1");
          break;
        case "departments":
          setSelectItem("2");
          break;
        case "projects":
          setSelectItem("3");
          break;
        default:
          setSelectItem("0");
      }
    } else {
      switch (currPath) {
        case "departments":
          setSelectItem("1");
          break;
        case "projects":
          setSelectItem("2");
          break;
        default:
          setSelectItem("0");
      }
    }
  };

  useEffect(() => {
    setDefaultItem();
  }, []);

  return (
    <Layout
      className={`sidebar-container ${
        collapsed && "extended-sidebar-container"
      }`}
    >
      <Sider
        style={{ position: "absolute", zIndex: 2 }}
        theme='light'
        className='sider'
        trigger={null}
        collapsible
        collapsed={!collapsed}
        onMouseEnter={() => setCollapsed(true)}
        onMouseLeave={() => setCollapsed(false)}
      >
        <Menu className='sider-menu' mode='inline' selectedKeys={[selectItem]}>
          {authorizedMenuItem().map((item, index) => (
            <Menu.Item
              key={index}
              icon={item.icon}
              onClick={() => {
                setSelectItem(index.toString());
                if (!item.url) {
                  logout();
                }
              }}
            >
              {item.url ? (
                <Link to={`/dashboard/${item.url}`}>{item.label}</Link>
              ) : (
                item.label
              )}
            </Menu.Item>
          ))}
        </Menu>
      </Sider>
    </Layout>
  );
};
export { Dashboardsidebar };
