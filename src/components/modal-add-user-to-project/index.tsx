import {
  Button,
  Col,
  DatePicker,
  Dropdown,
  Flex,
  Input,
  MenuProps,
  message,
  Modal,
  Row,
  Space,
  Table,
  Tag,
} from "antd";
import React from "react";
import "./modal-add-user-to-project.css";
import { DownOutlined, SearchOutlined } from "@ant-design/icons";
import { CustomAvatar } from "../v2/custom-avatar";
import { Primary } from "src/stories/Button.stories";
interface ModalAddUserToProjectProps {
  isModalOpen: boolean;
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

interface DataType {
  key: string;
  name: string;
  age: number;
  role: string;
  email: string;
}

const ModalAddUserToProject: React.FC<ModalAddUserToProjectProps> = ({
  isModalOpen,
  setIsModalOpen,
}) => {
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
      render: (_: any, record: DataType) => <Button type="primary">Add</Button>,
    },
  ];

  const data: DataType[] = [
    {
      key: "1",
      name: "John Brown",
      age: 32,
      role: "Staff",
      email: "datvuhp2002@gmail.com",
    },
    {
      key: "2",
      name: "Jim Green",
      age: 42,
      role: "Staff",
      email: "datvuhp2002@gmail.com",
    },
    {
      key: "3",
      name: "Joe Black",
      age: 32,
      role: "Staff",
      email: "datvuhp2002@gmail.com",
    },
  ];
  const handleCancel = () => {
    setIsModalOpen(false);
  };
  return (
    <Modal
      className="wrapper"
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
      <Row className="modal-add-user-search-input">
        <Col span={8}>
          <Input
            placeholder="Search..."
            prefix={<SearchOutlined />}
            size="large"
          />
        </Col>
      </Row>
      <Table columns={columns} dataSource={data} pagination={false} />
    </Modal>
  );
};

export default ModalAddUserToProject;
