import {
  Button,
  DatePicker,
  Dropdown,
  Flex,
  Input,
  MenuProps,
  message,
  Modal,
  Space,
} from "antd";
import React from "react";
import "./modal-create-post.css";
import { DownOutlined } from "@ant-design/icons";
const { RangePicker } = DatePicker;
type ModalCreatePost = {
  isModalOpen: boolean;
  setIsModalOpen: any;
};
const ModalCreatePost: React.FC<ModalCreatePost> = ({
  isModalOpen,
  setIsModalOpen,
}) => {
  const handleOk = () => {
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };
  const items: MenuProps["items"] = [
    {
      label: "Admin",
      key: "ADMIN",
    },
    {
      label: "Staff",
      key: "STAFF",
    },
    {
      label: "Project Manager",
      key: "PROJECT_MANAGER",
    },
    {
      label: "Manager",
      key: "MANAGER",
    },
  ];
  const handleMenuClick: MenuProps["onClick"] = (e) => {
    console.log("click", e);
  };
  const menuProps = {
    items,
    onClick: handleMenuClick,
  };
  return (
    <Modal
      className="wrapper"
      open={isModalOpen}
      centered
      onOk={handleOk}
      onCancel={handleCancel}
      width={1000}
    >
      <h2
        style={{
          alignItems: "center",
          justifyContent: "center",
          textAlign: "center",
        }}
      >
        Create Post
      </h2>
      <Space direction="vertical" size="middle" style={{ display: "flex" }}>
        <div>
          <span>Project Name</span>
          <Input placeholder="Project name..." size="large" />
        </div>
        <div>
          <span>Project Code</span>
          <Input placeholder="Project code..." size="large" />
        </div>
        <div>
          <span>Investor</span>
          <Input placeholder="Investor..." size="large" />
        </div>
        <div>
          <span>Description</span>
          <Input placeholder="Description..." size="large" />
        </div>

        <div>
          <span>Department</span>
          <Dropdown menu={menuProps}>
            <Button
              style={{
                width: "100%",
                display: "flex",
                alignItems: "center",
              }}
            >
              <Space
                style={{
                  width: "100%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                Progress
                <DownOutlined />
              </Space>
            </Button>
          </Dropdown>
        </div>
        <div>
          <span>Project Manager</span>
          <Dropdown menu={menuProps}>
            <Button
              style={{
                width: "100%",
                display: "flex",
                alignItems: "center",
              }}
            >
              <Space
                style={{
                  width: "100%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                Project
                <DownOutlined />
              </Space>
            </Button>
          </Dropdown>
        </div>
        <div>
          <span>Date</span>
          <RangePicker
            showTime
            style={{
              width: "100%",
            }}
          />
        </div>
      </Space>
    </Modal>
  );
};

export default ModalCreatePost;
