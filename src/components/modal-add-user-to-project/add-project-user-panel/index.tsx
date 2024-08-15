import "./add-project-user-panel.css";
import { Button, Col, Input, message, Modal, Row, Table } from "antd";
import React, { useState } from "react";
import {
  useCreateAssigmentMutation,
  useManagerGetAllStaffDepartmentQuery,
} from "src/share/services";
import { SearchOutlined } from "@ant-design/icons";
import { CustomAvatar } from "src/components/v2/custom-avatar";
import { Project, RoleResponse } from "src/share/models";
interface ModalAddUserToProjectProps {
  isModalOpen: boolean;
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  project?: Project;
}

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

export const AddProjectUserPanel: React.FC<ModalAddUserToProjectProps> = ({
  project,
  isModalOpen,
  setIsModalOpen,
}) => {
  const [staffPage, setStaffPage] = useState<number>(1);

  const { data: staffs } = useManagerGetAllStaffDepartmentQuery({
    items_per_page: 5,
  });

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
          bgColor={record.avatar.src}
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
      title: "Email",
      dataIndex: "email",
      key: "email",
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
    if (staffs?.users.length) {
      return staffs?.users.map((staff): DataType => {
        return {
          avatar: {
            src: staff.avatar,
            bgColor: staff.avatarColor,
          },
          name: staff.name!,
          email: staff.email!,
          role: (staff.role as RoleResponse).name!,
          key: staff.user_id!,
        };
      });
    }
  };
  return (
    <Modal
      className='wrapper'
      open={isModalOpen}
      onCancel={handleCancel}
      centered
      width={1000}
      footer={null}
    >
      <h2
        style={{
          alignItems: "center",
          justifyContent: "center",
          textAlign: "center",
        }}
      >
        Add User To Project
      </h2>
      {/* search */}
      <Row className='modal-add-user-search-input'>
        <Col span={8}>
          <Input
            placeholder='Search...'
            prefix={<SearchOutlined />}
            size='large'
          />
        </Col>
      </Row>
      <Table
        columns={columns}
        dataSource={mapTableData()}
        pagination={{
          pageSize: 5,
          total: staffs?.total,
          onChange: (value) => setStaffPage(value),
          showSizeChanger: false,
          current: staffPage,
        }}
      />
    </Modal>
  );
};
