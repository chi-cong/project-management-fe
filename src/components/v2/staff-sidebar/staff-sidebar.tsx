import "./staff-sidebar.css";
import { Layout } from "antd";
import { useState } from "react";
import {
  ClusterOutlined,
  TeamOutlined,
  RocketOutlined,
} from "@ant-design/icons";
import { CustomMenu, CustomMenuItem } from "src/components/v2/custom-menu";
// import { randAvaBg } from "src/share/utils";
import { useNavigate } from "react-router-dom";
import ModalCreateUser from "src/components/modal-create-user";
import { ModalCreateProject } from "src/components";
import ModalCreateDepartment from "src/components/modal-create-department";

export const StaffSidebar = () => {
  const navigate = useNavigate();

  const [createUser, setCreateUser] = useState<boolean>(false);
  const [createDepartment, setCreateDepartment] = useState<boolean>(false);
  const [createProject, setCreateProject] = useState<boolean>(false);

  const items: CustomMenuItem[] = [
    {
      title: "Department",
      onClick() {
        navigate("/v2/dashboard/staff/department/:id");
      },
      icon: <ClusterOutlined />,
      addCallBack() {
        setCreateDepartment(true);
      },
    },
    {
      title: "Project",
      onClick() {
        navigate("/v2/dashboard/staff/projects");
      },
      icon: <RocketOutlined />,
      addCallBack() {
        setCreateProject(true);
      },
    },
  ];
  return (
    <>
      <Layout.Sider className="sidebar">
        <CustomMenu items={items} defaultSelectedItem={0} />
      </Layout.Sider>
      <div className="sidebar-placeholder" style={{ width: 0 }} />
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
