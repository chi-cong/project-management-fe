import "./manager-sidebar.css";
import { Layout } from "antd";
import { ClusterOutlined, RocketOutlined } from "@ant-design/icons";
import { CustomMenu, CustomMenuItem } from "src/components/v2/custom-menu";
import { useNavigate } from "react-router-dom";
import { useGetUserDetailQuery } from "src/share/services";
import { ModalCreateProject } from "src/components";
import { useState } from "react";

export const ManagerSidebar = () => {
  const navigate = useNavigate();
  const { data } = useGetUserDetailQuery();
  const [createProject, setCreateProject] = useState<boolean>(false);

  const items: CustomMenuItem[] = [
    {
      title: "Department",
      onClick() {
        navigate(`/v2/dashboard/manager/department/${data?.department_id}`);
      },
      icon: <ClusterOutlined />,
    },
    {
      title: "Project",
      onClick() {
        navigate("/v2/dashboard/manager/projects");
      },
      icon: <RocketOutlined />,
      addCallBack() {
        setCreateProject(true);
      },
    },
  ];

  return (
    <>
      <Layout.Sider className='sidebar'>
        <CustomMenu items={items} defaultSelectedItem={0} />
      </Layout.Sider>
      <ModalCreateProject
        isModalOpen={createProject}
        setIsModalOpen={setCreateProject}
      />
      <div className='sidebar-placeholder' style={{ width: 0 }} />
    </>
  );
};
