import "./staff-sidebar.css";
import { Layout } from "antd";
import { ClusterOutlined, RocketOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { CustomStaffMenu, CustomStaffMenuItem } from "../custom-staff-menu";
import { useGetUserProjectQuery } from "src/share/services";
import { randAvaBg } from "src/share/utils";
import { useGetUserDetailQuery } from "src/share/services";
export const StaffSidebar = () => {
  const navigate = useNavigate();
  const { data: projectsResp } = useGetUserProjectQuery({
    page: 1,
    items_per_page: "ALL",
  });
  const { data: user, refetch } = useGetUserDetailQuery();
  const getSublistNode = () => {
    return (
      <div className="sublist-node" style={{ background: randAvaBg() }}></div>
    );
  };

  const projectItems: CustomStaffMenuItem[] = (projectsResp?.data || [])
    .filter((project) => project.name)
    .map((project) => ({
      title: (
        <div className="sidebar-menu-item">
          {getSublistNode()}
          <span className="menu-item-title">{project.name}</span>
        </div>
      ),
      icon: null,
      onClick() {
        navigate(`/v2/dashboard/STAFF/project/${project!.project_id!}`);
      },
    }));

  const items: CustomStaffMenuItem[] = [
    {
      title: "Department",
      onClick() {
        navigate(`/v2/dashboard/STAFF/department/${user?.department_id}`);
      },
      icon: <ClusterOutlined />,
    },
    {
      title: "Project",
      onClick() {},
      icon: <RocketOutlined />,
    },
    ...projectItems,
  ];

  return (
    <>
      <Layout.Sider className="sidebar">
        <CustomStaffMenu items={items} defaultSelectedItem={0} />
      </Layout.Sider>
      <div className="sidebar-placeholder" style={{ width: 0 }} />
    </>
  );
};
