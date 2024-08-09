import { Button, Table } from "antd";
import React, { useState } from "react";
import { CustomAvatar } from "../v2";
import { ColumnsType } from "antd/es/table";
import {
  useManagerGetStaffNoDepartmentQuery,
  useAddStaffDepartmentMutation,
} from "src/share/services";
import { RoleResponse } from "src/share/models";

interface DataType {
  key?: string;
  name?: string;
  role?: string;
  email?: string;
}

const columns: ColumnsType<DataType> = [
  {
    title: "Avatar",
    dataIndex: "avatar",
    key: "avatar",
    render: (text: string) => <CustomAvatar size={50} userName='Dat' />,
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
    render: (_: any, record: DataType) => (
      <Button type='primary'>Assign</Button>
    ),
  },
];

const data: DataType[] = [
  {
    key: "1",
    name: "John Brown",
    role: "Manager",
    email: "datvuhp2002@gmail.com",
  },
  {
    key: "2",
    name: "Jim Green",
    role: "Manager",
    email: "123456@gmail.com",
  },
  {
    key: "3",
    name: "Joe Black",
    role: "Manager",
    email: "abcdefg@gmail.com",
  },
];

const AddStaffTabs: React.FC = () => {
  const [selectedRows, setSelectedRows] = useState<DataType[]>([]);
  const [addDepartmentStaff] = useAddStaffDepartmentMutation();
  const { data: noDepartStaffs } = useManagerGetStaffNoDepartmentQuery({});
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
            marginBottom: "10px",
          }}
        >
          <Button
            type='primary'
            onClick={() => {
              addDepartmentStaff({
                listStaff: selectedRows.map((row) => row.key),
              });
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
