import { Button, Col, Input, Row, Table } from "antd";
import React, { useState } from "react";
import { useGetUsersQuery } from "src/share/services";
import { CustomAvatar } from "src/components/v2/custom-avatar";
import { OUserRole, RoleResponse, User } from "src/share/models";
interface ModalAddUserToProjectProps {
  setSelectedPM: (pm?: User) => void;
  selectedPm?: User;
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

export const SelectPmTable: React.FC<ModalAddUserToProjectProps> = ({
  setSelectedPM,
  selectedPm,
}) => {
  const [userPage, setUserPage] = useState<number>(1);
  const [search, setSearch] = useState<string>("");

  const { data: users } = useGetUsersQuery({
    items_per_page: 5,
    page: userPage,
    search,
    role: OUserRole.All,
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
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },

    {
      title: "Action",
      key: "action",
      render: (_text: string, record: DataType) => {
        return (
          selectedPm?.user_id !== record.key && (
            <Button
              type='primary'
              onClick={() => {
                setSelectedPM(
                  users?.users.find((user) => record.key === user.user_id)
                );
              }}
            >
              Select
            </Button>
          )
        );
      },
    },
  ];

  const mapTableData = () => {
    if (users?.users.length) {
      return users?.users.map((user): DataType => {
        return {
          avatar: {
            src: user.avatar,
            bgColor: user.avatar_color,
          },
          name: user.name!,
          email: user.email!,
          role: (user.role as RoleResponse).name!,
          key: user.user_id!,
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
          total: users?.total,
          onChange: (value) => setUserPage(value),
          showSizeChanger: false,
          current: userPage,
        }}
      />
    </>
  );
};
