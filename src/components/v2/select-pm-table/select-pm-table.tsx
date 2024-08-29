import { Button, Col, Dropdown, Input, MenuProps, Row, Table } from "antd";
import { DownOutlined } from "@ant-design/icons";
import React, { useState } from "react";
import { useGetUsersQuery } from "src/share/services";
import { CustomAvatar } from "src/components/v2/custom-avatar";
import { OUserRole, RoleResponse, User, UserRole } from "src/share/models";
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
  const [queries, setQueries] = useState<{
    role: UserRole;
    page: number | undefined;
    search: string | undefined;
  }>({ role: OUserRole.Manager, page: 1, search: "" });

  const { data: users } = useGetUsersQuery({
    items_per_page: 5,
    ...queries,
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

  const items: MenuProps["items"] = [
    {
      label: "Staff",
      key: OUserRole.Staff,
      onClick: () => setQueries({ ...queries, role: OUserRole.Staff }),
    },
    {
      label: "Manager",
      key: OUserRole.Manager,
      onClick: () => setQueries({ ...queries, role: OUserRole.Manager }),
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
        <Col xs={8} sm={8} md={6} lg={4}>
          <Dropdown menu={{ items }}>
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
                {queries.role.toLowerCase()}
                <DownOutlined />
              </div>
            </Button>
          </Dropdown>
        </Col>
        <Col offset={1} xs={14} sm={10} md={8} lg={8}>
          <Input.Search
            placeholder='Search...'
            onSearch={(value) => setQueries({ ...queries, search: value })}
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
          onChange: (page) => setQueries({ ...queries, page: page }),
          showSizeChanger: false,
          current: queries.page,
        }}
      />
    </>
  );
};
