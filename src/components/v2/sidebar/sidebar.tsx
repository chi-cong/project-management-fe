import "./sidebar.css";
import { Layout } from "antd";
import { useEffect, useState } from "react";
import {
  ClusterOutlined,
  TeamOutlined,
  RocketOutlined,
} from "@ant-design/icons";
import { CustomMenu, CustomMenuItem } from "src/components/v2/custom-menu";
import { useNavigate, useLocation } from "react-router-dom";
import ModalCreateUser from "src/components/modal-create-user";
import { ModalCreateProject } from "src/components";
import ModalCreateDepartment from "src/components/modal-create-department";
import { localStorageUtil } from "src/share/utils";

export const Sidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [createUser, setCreateUser] = useState<boolean>(false);
  const [createDepartment, setCreateDepartment] = useState<boolean>(false);
  const [createProject, setCreateProject] = useState<boolean>(false);
  const [selectedItem, setSelectedItem] = useState<number>(0);

  const items: CustomMenuItem[] = [
    {
      title: "Account",
      onClick() {
        navigate(
          `/v2/dashboard/${(localStorageUtil.get("role") as string).toLocaleLowerCase()}/account`
        );
      },
      icon: <TeamOutlined />,
      addCallBack(e: React.MouseEvent) {
        e.stopPropagation();
        setCreateUser(true);
      },
    },
    {
      title: "Department",
      onClick() {
        navigate(
          `/v2/dashboard/${(localStorageUtil.get("role") as string).toLocaleLowerCase()}/departments`
        );
      },
      icon: <ClusterOutlined />,
      addCallBack(e: React.MouseEvent) {
        e.stopPropagation();
        setCreateDepartment(true);
      },
    },
    {
      title: "Project",
      onClick() {
        navigate(
          `/v2/dashboard/${(localStorageUtil.get("role") as string).toLocaleLowerCase()}/projects`
        );
      },
      icon: <RocketOutlined />,
      addCallBack(e: React.MouseEvent) {
        e.stopPropagation();
        setCreateProject(true);
      },
    },
  ];

  const setDefaultItem = () => {
    const currPath = window.location.pathname.replace(
      `v2/dashboard/${localStorageUtil.get("role")?.toLocaleLowerCase()}/`,
      ""
    );

    switch (currPath) {
      case "/account":
        setSelectedItem(0);
        break;
      case "/departments":
        setSelectedItem(1);
        break;
      case "/projects":
        setSelectedItem(2);
        break;
      default:
        setSelectedItem(10);
    }
  };

  useEffect(() => {
    setDefaultItem();
  }, [location]);

  return (
    <>
      <Layout.Sider className='sidebar'>
        <CustomMenu
          items={items}
          selectedItem={selectedItem}
          setSelectedItem={setSelectedItem}
        />
      </Layout.Sider>
      <div className='sidebar-placeholder' style={{ width: 0 }} />
      <ModalCreateDepartment
        isModalOpen={createDepartment}
        setIsModalOpen={setCreateDepartment}
      />
      <ModalCreateProject
        isModalOpen={createProject}
        setIsModalOpen={setCreateProject}
      />
      <ModalCreateUser
        isModalOpen={createUser}
        setIsModalOpen={setCreateUser}
      />
    </>
  );
};
