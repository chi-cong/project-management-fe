import { CardAccount } from "src/components/card-account";
import "./projects.css";
import {
  Button,
  Col,
  Dropdown,
  Input,
  List,
  MenuProps,
  message,
  Row,
  Space,
  Tooltip,
  Typography,
} from "antd";
import {
  DownOutlined,
  SearchOutlined,
  DeleteOutlined,
  PlusOutlined,
} from "@ant-design/icons";
import React, { useState } from "react";
import ModalCreateUser from "src/components/modal-create-user";
import ModalCreatePost from "src/components/modal-create-post";
import { CardProject } from "src/components/card-project";
import ModalUpdatePost from "src/components/modal-update-post";
export const Projects = () => {
  const items: MenuProps["items"] = [
    {
      label: "On Progress",
      key: "on_progress",
    },
    {
      label: "Done",
      key: "done",
    },
    {
      label: "Expired",
      key: "expired",
    },
  ];
  const [isModalOpen, setIsModalOpen] = useState(false);
  const handleMenuClick: MenuProps["onClick"] = (e) => {
    message.info("Click on menu item.");
    console.log("click", e);
  };
  const menuProps = {
    items,
    onClick: handleMenuClick,
  };
  return (
    <div className="v2-projects-page">
      <section className="main">
        <header className="main-header">
          <section className="first-sec">
            <div className="title-des">
              <div className="title-row">
                <h2>Project</h2>
              </div>
            </div>
            <div className="action">
              <Space>
                <Dropdown menu={menuProps}>
                  <Button>
                    <Space>
                      Progress
                      <DownOutlined />
                    </Space>
                  </Button>
                </Dropdown>
                <Input placeholder="Search..." prefix={<SearchOutlined />} />
                <Button
                  type="default"
                  className="title-row-btn"
                  icon={<DeleteOutlined />}
                >
                  Trash
                </Button>
                <Button
                  type="primary"
                  className="title-row-btn"
                  icon={<PlusOutlined />}
                  onClick={() => setIsModalOpen(true)}
                >
                  Create Project
                </Button>
              </Space>
            </div>
          </section>
        </header>
        <main>
          <List
            grid={{
              gutter: 12,
              xs: 3,
              sm: 3,
              md: 3,
              lg: 3,
              xl: 3,
              xxl: 3,
            }}
            dataSource={[0, 1, 2, 4]}
            renderItem={() => (
              <List.Item>
                <CardProject
                  name="Tính năng thanh toán zalopay"
                  description="Code giao diện bằng ReactJS và sử dụng các framwork liên quan
                như là...."
                />
              </List.Item>
            )}
          />
        </main>
      </section>
      <ModalCreatePost
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
      ></ModalCreatePost>
    </div>
  );
};
