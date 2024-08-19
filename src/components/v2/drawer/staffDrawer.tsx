import { Drawer } from "antd";
import { ClusterOutlined, RocketOutlined } from "@ant-design/icons";
import { CustomStaffMenuItem, CustomStaffMenu } from "../custom-staff-menu";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "src/libs/redux";
import { openDrawer } from "src/libs/redux/drawerSlice";
import {
  useGetUserDetailQuery,
  useGetUserProjectQuery,
} from "src/share/services";
import { randAvaBg } from "src/share/utils";

export const StaffDrawer = () => {
  const navigate = useNavigate();
  const { data: projectsResp } = useGetUserProjectQuery({
    page: 1,
    items_per_page: "ALL",
  });
  const { data: user } = useGetUserDetailQuery();
  const dispatch = useDispatch();
  const isOpen = useSelector((root: RootState) => root.openDrawer);

  const getSublistNode = () => {
    return (
      <div
        className='sublist-node'
        style={{
          background: randAvaBg(),
          borderRadius: "50%",
          width: "8px",
          height: "8px",
        }}
      ></div>
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
      <Drawer
        onClose={() => dispatch(openDrawer(false))}
        open={isOpen}
        placement='left'
      >
        <CustomStaffMenu items={items} />
      </Drawer>
    </>
  );
};
