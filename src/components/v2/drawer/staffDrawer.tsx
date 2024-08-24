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
import { useEffect, useState } from "react";

export const StaffDrawer = () => {
  const navigate = useNavigate();
  const { data: projectsResp } = useGetUserProjectQuery({
    page: 1,
    items_per_page: "ALL",
  });
  const { data: user } = useGetUserDetailQuery();
  const dispatch = useDispatch();
  const isOpen = useSelector((root: RootState) => root.openDrawer);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

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
          <span className='menu-item-title'>{`${project.name?.substring(0, 15)}...`}</span>
        </div>
      ),
      icon: null,
      onClick() {
        navigate(`/v2/dashboard/staff/project/${project!.project_id!}`);
        dispatch(openDrawer(false));
      },
    }));
  const items: CustomStaffMenuItem[] = [
    {
      title: "Department",
      onClick() {
        navigate(`/v2/dashboard/staff/department/${user?.department_id}`);
        dispatch(openDrawer(false));
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

  const setDrawerWidth = (width: number) => {
    if (width < 500) {
      return "75vw";
    }
    if (width < 768) {
      return "50vw";
    }
    return "55vw";
  };

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <>
      <Drawer
        onClose={() => dispatch(openDrawer(false))}
        open={isOpen}
        placement='left'
        width={setDrawerWidth(windowWidth)}
      >
        <CustomStaffMenu items={items} />
      </Drawer>
    </>
  );
};
