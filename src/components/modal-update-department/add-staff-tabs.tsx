import { Button, Table } from "antd";
import React, { useState } from "react";
import { CustomAvatar } from "../v2";
import { ColumnsType } from "antd/es/table";

interface DataType {
  key: string;
  name: string;
  age: number;
  role: string;
  email: string;
}

const columns: ColumnsType<DataType> = [
  {
    title: "Avatar",
    dataIndex: "avatar",
    key: "avatar",
    render: (text: string) => <CustomAvatar size={50} userName="Dat" />,
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
      <Button type="primary">Assign</Button>
    ),
  },
];

const data: DataType[] = [
  {
    key: "1",
    name: "John Brown",
    age: 32,
    role: "Manager",
    email: "datvuhp2002@gmail.com",
  },
  {
    key: "2",
    name: "Jim Green",
    age: 42,
    role: "Manager",
    email: "123456@gmail.com",
  },
  {
    key: "3",
    name: "Joe Black",
    age: 32,
    role: "Manager",
    email: "abcdefg@gmail.com",
  },
];

const AddStaffTabs: React.FC = () => {
  const [selectedRows, setSelectedRows] = useState<DataType[]>([]);
  const rowSelection = {
    onChange: (selectedRowKeys: React.Key[], selectedRows: DataType[]) => {
      console.log(
        `selectedRowKeys: ${selectedRowKeys}`,
        "selectedRows: ",
        selectedRows
      );
      setSelectedRows(selectedRows);
    },
    getCheckboxProps: (record: DataType) => ({
      disabled: record.name === "Disabled User",
      name: record.name,
    }),
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
          <Button type="primary">Assign</Button>
        </div>
      )}
      <Table
        rowSelection={{
          type: "checkbox",
          ...rowSelection,
        }}
        columns={columns}
        dataSource={data}
      />
    </div>
  );
};

export default AddStaffTabs;
