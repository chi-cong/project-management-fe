import { Drawer } from "antd";
import { useEffect, useState } from "react";
import { ClusterOutlined, RocketOutlined } from "@ant-design/icons";
import { CustomMenu, CustomMenuItem } from "src/components/v2/custom-menu";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { ManagerCreateProject } from "src/components";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "src/libs/redux";
import { openDrawer } from "src/libs/redux/drawerSlice";
import { useGetUserDetailQuery } from "src/share/services";

export const ManagerDrawer = () => {
  const { id } = useParams();

  const location = useLocation();
  const { data } = useGetUserDetailQuery();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isOpen = useSelector((root: RootState) => root.openDrawer);

  const [createProject, setCreateProject] = useState<boolean>(false);
  const [selectedItem, setSelectedItem] = useState<number>(0);

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
      <Drawer
        onClose={() => dispatch(openDrawer(false))}
        open={isOpen}
        placement='left'
      >
        <CustomMenu
          items={items}
          selectedItem={selectedItem}
          setSelectedItem={setSelectedItem}
        />
      </Drawer>
      <ManagerCreateProject
        isModalOpen={createProject}
        setIsModalOpen={setCreateProject}
        departmentId={data?.department_id}
      />
    </>
  );
};
