import "./departments.css";
import { Button, Input, List, MenuProps, message, Space } from "antd";
import {
  SearchOutlined,
  DeleteOutlined,
  PlusOutlined,
} from "@ant-design/icons";
import React, { useState } from "react";
import ModalCreatePost from "src/components/modal-create-project";
import { CardDepartment } from "src/components/card-department";
import ModalCreateDepartment from "src/components/modal-create-department";
export const Departments = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const handleMenuClick: MenuProps["onClick"] = (e) => {
    message.info("Click on menu item.");
    console.log("click", e);
  };
  return (
    <div className="v2-departments-page">
      <section className="main">
        <header className="main-header">
          <section className="first-sec">
            <div className="title-des">
              <div className="title-row">
                <h2>Departments</h2>
              </div>
            </div>
            <div className="header-action">
              <Space>
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
                  Create Department
                </Button>
              </Space>
            </div>
          </section>
        </header>
        <main className="department-main-info">
          <List
            grid={{
              gutter: 12,
              xs: 1,
              sm: 1,
              md: 2,
              lg: 2,
              xl: 2,
              xxl: 3,
            }}
            dataSource={[0, 1, 2, 4]}
            renderItem={() => (
              <List.Item>
                <CardDepartment
                  name="Nguyen Van A"
                  description="Code giao diện bằng ReactJS và sử dụng các framework liên quan
                như là...."
                />
              </List.Item>
            )}
          />
        </main>
      </section>
      <ModalCreateDepartment
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
      ></ModalCreateDepartment>
    </div>
  );
};
