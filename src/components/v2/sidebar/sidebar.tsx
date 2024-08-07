import "./sidebar.css";
import { Layout, Divider } from "antd";
import { useState } from "react";
import { MultiUser } from "src/assets/icons";
import { CustomMenu, CustomMenuItem } from "src/components/v2/custom-menu";
import { randAvaBg } from "src/share/utils";
import { useNavigate } from "react-router-dom";

export const Sidebar = () => {
  const navigate = useNavigate();
  const items: CustomMenuItem[] = [
    {
      title: "Account",
      onClick() {
        navigate("/v2/dashboard/admin/account");
      },
      icon: <MultiUser />,
      addCallBack() {},
    },
    {
      title: "Department",
      onClick() {
        navigate("/v2/dashboard/admin/departments");
      },
      icon: <MultiUser />,
      addCallBack() {},
    },
    {
      title: "Project",
      onClick() {
        navigate("/v2/dashboard/admin/projects");
      },
      icon: <MultiUser />,
      addCallBack() {},
    },
  ];

  const getSublistNode = () => {
    return (
      <div className='sublist-node' style={{ background: randAvaBg() }}></div>
    );
  };

  return (
    <>
      <Layout.Sider className='sidebar'>
        <CustomMenu items={items} />
      </Layout.Sider>
      <div className='sidebar-placeholder' style={{ width: 0 }} />
    </>
  );
};
