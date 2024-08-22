import "./project-team.css";
import { Col, Input, Modal, Row, Table } from "antd";
import React, { useState } from "react";
import { useGetProjectStaffsQuery } from "src/share/services";
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

export const ProjectTeam: React.FC<ModalAddUserToProjectProps> = ({
  project,
  isModalOpen,
  setIsModalOpen,
}) => {
  const [staffPage, setStaffPage] = useState<number>(1);
  const [search, setSearch] = useState<string>("");

  const { data: staffs } = useGetProjectStaffsQuery({
    items_per_page: 5,
    projectId: project?.project_id,
    page: staffPage,
    search,
  });

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
  ];

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const mapTableData = () => {
    if (staffs?.users?.length) {
      return staffs?.users.map((staff): DataType => {
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
    }
  };

  return (
    <Modal
      className='wrapper'
      open={isModalOpen}
      onCancel={handleCancel}
      width={1000}
      style={{ minWidth: "800px" }}
      footer={null}
    >
      <h2
        style={{
          alignItems: "center",
          justifyContent: "center",
          textAlign: "center",
        }}
      >
        Project Team
      </h2>
      {/* search */}
      <Row className='modal-add-user-search-input'>
        <Col span={8}>
          <Input.Search
            placeholder='Search...'
            size='large'
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
          total: staffs?.total,
          onChange: (value) => setStaffPage(value),
          showSizeChanger: false,
          current: staffPage,
        }}
      />
    </Modal>
  );
};
