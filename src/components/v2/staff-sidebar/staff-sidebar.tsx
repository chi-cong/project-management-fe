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
  const { data: user } = useGetUserDetailQuery();
  const getSublistNode = () => {
    return (
      <div className='sublist-node' style={{ background: randAvaBg() }}></div>
    );
  };

  const projectItems: CustomStaffMenuItem[] = (projectsResp?.data || [])
    .filter((project) => project.name)
    .map((project) => ({
      id: project.project_id,
      title: (
        <div className='sidebar-menu-item'>
          {getSublistNode()}
          <span className='menu-item-title'>{project.name}</span>
        </div>
      ),
      icon: null,
      onClick() {
        navigate(`/v2/dashboard/staff/project/${project!.project_id!}`);
      },
    }));

  const items: CustomStaffMenuItem[] = [
    {
      title: "Department",
      onClick() {
        navigate(`/v2/dashboard/staff/department/${user?.department_id}`);
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
      <Layout.Sider className='sidebar'>
        <CustomStaffMenu items={items} />
      </Layout.Sider>
      <div className='sidebar-placeholder' style={{ width: 0 }} />
    </>
  );
};
