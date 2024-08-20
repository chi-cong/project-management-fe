import "./manager-sidebar.css";
import { Layout } from "antd";
import { ClusterOutlined, RocketOutlined } from "@ant-design/icons";
import { CustomMenu, CustomMenuItem } from "src/components/v2/custom-menu";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import { useGetUserDetailQuery } from "src/share/services";
import { ManagerCreateProject } from "src/components";
import { useEffect, useState } from "react";

export const ManagerSidebar = () => {
  const location = useLocation();
  const { id } = useParams();
  const navigate = useNavigate();
  const { data } = useGetUserDetailQuery();
  const [createProject, setCreateProject] = useState<boolean>(false);
  const [selectedItem, setSelectedItem] = useState<number>(0);

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

  const setDefaultItem = () => {
    const currPath = window.location.pathname.replace(
      `v2/dashboard/manager/`,
      ""
    );

    switch (currPath) {
      case `/department/${id}`:
        setSelectedItem(0);
        break;
      case "/projects":
        setSelectedItem(1);
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
      <ManagerCreateProject
        isModalOpen={createProject}
        setIsModalOpen={setCreateProject}
        departmentId={data?.department_id}
      />
      <div className='sidebar-placeholder' style={{ width: 0 }} />
    </>
  );
};
