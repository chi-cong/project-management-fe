import { Button, Table } from "antd";
import React from "react";
import { CustomAvatar } from "../v2";

interface DataType {
  key: string;
  name: string;
  age: number;
  role: string;
  email: string;
}
const AddManagerTabs = () => {
  const columns = [
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
  return <Table columns={columns} dataSource={data} pagination={false} />;
};

export default AddManagerTabs;
