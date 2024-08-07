import "./departments.css";
import { Button, Col, Input, List, MenuProps, message, Row, Space } from "antd";
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
            <Row className="header-action" gutter={[8, 8]}>
              <Col xs={12} sm={12} md={8}>
                <Input
                  placeholder="Search..."
                  prefix={<SearchOutlined />}
                  style={{ width: "100%" }}
                />
              </Col>
              <Col xs={12} sm={12} md={8}>
                <Button
                  type="default"
                  className="title-row-btn"
                  icon={<DeleteOutlined />}
                  style={{ width: "100%" }}
                >
                  Trash
                </Button>
              </Col>

              <Col xs={24} sm={24} md={8}>
                <Button
                  type="primary"
                  className="title-row-btn"
                  icon={<PlusOutlined />}
                  onClick={() => setIsModalOpen(true)}
                  style={{ width: "100%" }}
                >
                  Create
                </Button>
              </Col>
            </Row>
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
