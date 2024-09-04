import {
  Button,
  Col,
  Dropdown,
  Input,
  message,
  Modal,
  Row,
  Table,
  Tabs,
} from "antd";
import React, { useState } from "react";
import "./modal-add-user-to-project.css";
import {
  useCreateAssigmentMutation,
  useGetUsersQuery,
} from "src/share/services";
import { CustomAvatar } from "src/components/v2/custom-avatar";
import { DownOutlined } from "@ant-design/icons";
import { OUserRole, Project, RoleResponse, UserRole } from "src/share/models";
interface ModalAddUserToProjectProps {
  isModalOpen: boolean;
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  project?: Project;
}
import { ProjectTeam } from "./project-team";
import { useRoleChecker } from "src/share/hooks";

import type { MenuProps, TabsProps } from "antd";

interface DataType {
  avatar: {
    src?: string;
    bgColor?: string;
  };
  key: string;
  name: string;
  role: string;
  email: string;
}

export const ModalAddUserToProject: React.FC<ModalAddUserToProjectProps> = ({
  project,
  isModalOpen,
  setIsModalOpen,
}) => {
  const checkRole = useRoleChecker();
  const [staffPage, setStaffPage] = useState<number>(1);
  const [search, setSearch] = useState<string>("");
  const [role, setRole] = useState<UserRole>(OUserRole.All);

  const { data: allUsers } = useGetUsersQuery(
    { role, page: staffPage, search, items_per_page: 5 },
    { skip: !checkRole(OUserRole.Admin) }
  );

  const [createAssignment] = useCreateAssigmentMutation();

  const columns = [
    {
      title: "Avatar",
      dataIndex: "avatar",
      key: "avatar",
      render: (_: string, record: DataType) => (
        <CustomAvatar
          size={50}
          userName={record.name}
          avatarSrc={record.avatar.src}
          bgColor={record.avatar.bgColor}
        />
      ),
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Role",
      dataIndex: "role",
      key: "role",
    },

    {
      title: "Action",
      key: "action",
      render: (_text: string, record: DataType) => (
        <Button
          type='primary'
          onClick={() => {
            createAssignment({
              project_id: project?.project_id,
              user_id: record.key,
            })
              .unwrap()
              .then(() => {
                message.success("User added");
              })
              .catch(() => message.error("Failed to add user"));
          }}
        >
          Add
        </Button>
      ),
    },
  ];

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const mapTableData = () => {
    return allUsers?.users
      ?.filter(
        (staff) =>
          (staff.role as RoleResponse).name !== OUserRole.Admin &&
          (staff.role as RoleResponse).name !== OUserRole.SuperAdmin
      )
      .map((staff): DataType => {
        return {
          avatar: {
            src: staff.avatar,
            bgColor: staff.avatar_color,
          },
          name: staff.name!,
          email: staff.email!,
          role: (staff.role as RoleResponse).name!,
          key: staff.user_id!,
        };
      });
  };

  const roleFilter: MenuProps["items"] = [
    {
      label: "Manager",
      key: OUserRole.Manager,
      onClick: () => setRole(OUserRole.Manager),
    },
    {
      label: "Staff",
      key: OUserRole.Staff,
      onClick: () => setRole(OUserRole.Staff),
    },
  ];

  const projectStaffTabs: TabsProps["items"] = [
    {
      key: "1",
      label: "Project Team",
      children: <ProjectTeam project={project} />,
    },
    {
      key: "2",
      label: "Add User To Project",
      children: (
        <>
          <Row className='modal-add-user-search-input'>
            <Col span={6}>
              <Dropdown menu={{ items: roleFilter }}>
                <Button style={{ width: "100%" }}>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      textTransform: "capitalize",
                      width: "100%",
                    }}
                  >
                    {role === OUserRole.All ? "All Roles" : role.toLowerCase()}
                    <DownOutlined />
                  </div>
                </Button>
              </Dropdown>
            </Col>
            <Col offset={1} span={8}>
              <Input.Search
                placeholder='Search...'
                onSearch={(value) => setSearch(value)}
                allowClear
              />
            </Col>
          </Row>
          <Table
            columns={columns}
            dataSource={mapTableData()}
            pagination={{
              pageSize: 5,
              total: allUsers?.total,
              onChange: (value) => setStaffPage(value),
              showSizeChanger: false,
              current: staffPage,
            }}
          />
        </>
      ),
    },
  ];

  return (
    <Modal
      className='wrapper'
      open={isModalOpen}
      onCancel={handleCancel}
      width={1000}
      style={{ minWidth: "500px" }}
      footer={[]}
    >
      <Tabs items={projectStaffTabs} defaultActiveKey='1' />
    </Modal>
  );
};
