import { Button, Col, Input, message, Row, Table } from "antd";
import React, { useState } from "react";
import {
  useGetProjectStaffsQuery,
  useRmStaffFromPjMutation,
} from "src/share/services";
import { CustomAvatar } from "src/components/v2/custom-avatar";
import { Project, RoleResponse } from "src/share/models";
interface ModalAddUserToProjectProps {
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
}) => {
  const [staffPage, setStaffPage] = useState<number>(1);
  const [search, setSearch] = useState<string>("");

  const { data: staffs } = useGetProjectStaffsQuery(
    {
      items_per_page: 5,
      projectId: project?.project_id,
      page: staffPage,
      search,
    },
    { skip: project?.project_id ? false : true }
  );

  const [removeFromPj] = useRmStaffFromPjMutation();

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
            removeFromPj({
              projectId: project?.project_id,
              ids: [record.key],
            })
              .unwrap()
              .then(() => {
                message.success("Staff is removed");
              })
              .catch(() => message.error("Failed to remove staff"));
          }}
        >
          Remove
        </Button>
      ),
    },
  ];

  const mapTableData = () => {
    if (staffs?.users.length) {
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
    <>
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
    </>
  );
};
