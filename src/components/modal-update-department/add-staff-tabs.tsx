import { Button, Table, message } from "antd";
import React, { useState } from "react";
import { CustomAvatar } from "../v2";
import { ColumnsType } from "antd/es/table";
import {
  useManagerGetStaffNoDepartmentQuery,
  useAddStaffDepartmentMutation,
} from "src/share/services";
import { RoleResponse } from "src/share/models";

interface DataType {
  avatar: {
    src?: string;
    bgColor?: string;
  };
  key?: string;
  name?: string;
  role?: string;
  email?: string;
}

const AddStaffTabs: React.FC<{ id?: string }> = ({ id }) => {
  const columns: ColumnsType<DataType> = [
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
      render: (_: string, record: DataType) => (
        <Button
          type='primary'
          onClick={() => [
            addDepartmentStaff({
              departmentId: id,
              listStaff: [record.key],
            })
              .unwrap()
              .then(() => message.success("User added"))
              .catch(() => message.error("Failed to add user")),
          ]}
        >
          Add
        </Button>
      ),
    },
  ];
  const [selectedRows, setSelectedRows] = useState<DataType[]>([]);
  const [addDepartmentStaff] = useAddStaffDepartmentMutation();
  const { data: noDepartStaffs } = useManagerGetStaffNoDepartmentQuery({
    haveDepartment: false,
  });
  const rowSelection = {
    onChange: (_selectedRowKeys: React.Key[], selectedRows: DataType[]) => {
      setSelectedRows(selectedRows);
    },
    getCheckboxProps: (record: DataType) => ({
      disabled: record.name === "Disabled User",
      name: record.name,
    }),
  };

  const dataTableMapper = () => {
    return noDepartStaffs?.users.map((user): DataType => {
      return {
        avatar: {
          bgColor: user.avatar_color,
          src: user.avatar,
        },
        key: user.user_id,
        email: user.email,
        name: user.name,
        role: (user?.role as RoleResponse).name,
      };
    });
  };

  return (
    <div>
      {selectedRows.length > 0 && (
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "start",
          }}
        >
          <Button
            type='primary'
            onClick={async () => {
              addDepartmentStaff({
                departmentId: id,
                listStaff: selectedRows.map((row) => row.key),
              })
                .unwrap()
                .then(() => message.success("User added"))
                .catch(() => message.error("Failed to add user"));
            }}
          >
            Assign
          </Button>
        </div>
      )}
      <Table
        rowSelection={{
          type: "checkbox",
          ...rowSelection,
        }}
        columns={columns}
        dataSource={dataTableMapper()}
      />
    </div>
  );
};

export default AddStaffTabs;
