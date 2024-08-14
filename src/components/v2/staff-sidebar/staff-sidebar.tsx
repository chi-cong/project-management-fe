import "./staff-sidebar.css";
import { Layout } from "antd";
import { useState } from "react";
import {
  ClusterOutlined,
  TeamOutlined,
  RocketOutlined,
} from "@ant-design/icons";
// import { randAvaBg } from "src/share/utils";
import { useNavigate } from "react-router-dom";
import ModalCreateUser from "src/components/modal-create-user";
import { ModalCreateProject } from "src/components";
import ModalCreateDepartment from "src/components/modal-create-department";
import { CustomStaffMenu, CustomStaffMenuItem } from "../custom-staff-menu";
import { CustomMenuItem } from "../custom-menu";

export const StaffSidebar = () => {
  const navigate = useNavigate();

  const [createUser, setCreateUser] = useState<boolean>(false);
  const [createDepartment, setCreateDepartment] = useState<boolean>(false);
  const [createProject, setCreateProject] = useState<boolean>(false);

  const items: CustomStaffMenuItem[] = [
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
      onClick() {},
      icon: <RocketOutlined />,
      addCallBack() {
        setCreateProject(true);
      },
    },
  ];
  return (
    <>
      <Layout.Sider className="sidebar">
        <CustomStaffMenu items={items} defaultSelectedItem={0} />
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
