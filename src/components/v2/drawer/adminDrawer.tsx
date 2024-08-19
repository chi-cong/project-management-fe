import { Drawer } from "antd";
import { useEffect, useState } from "react";
import {
  ClusterOutlined,
  TeamOutlined,
  RocketOutlined,
} from "@ant-design/icons";
import { CustomMenu, CustomMenuItem } from "src/components/v2/custom-menu";
import { useNavigate } from "react-router-dom";
import ModalCreateUser from "src/components/modal-create-user";
import { ModalCreateProject } from "src/components";
import ModalCreateDepartment from "src/components/modal-create-department";
import { localStorageUtil } from "src/share/utils";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "src/libs/redux";
import { openDrawer } from "src/libs/redux/drawerSlice";

export const AdminDrawer = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isOpen = useSelector((root: RootState) => root.openDrawer);

  const [createUser, setCreateUser] = useState<boolean>(false);
  const [createDepartment, setCreateDepartment] = useState<boolean>(false);
  const [createProject, setCreateProject] = useState<boolean>(false);
  const [selectedItem, setSelectedItem] = useState<number>(0);

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
  }, []);

  const items: CustomMenuItem[] = [
    {
      title: "Account",
      onClick() {
        navigate(
          `/v2/dashboard/${(localStorageUtil.get("role") as string).toLocaleLowerCase()}/account`
        );
      },
      icon: <TeamOutlined />,
      addCallBack() {
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
      addCallBack() {
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
