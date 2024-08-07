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
} from "antd";
import {
  DownOutlined,
  SearchOutlined,
  DeleteOutlined,
  PlusOutlined,
} from "@ant-design/icons";
import { useState } from "react";
import ModalCreatePost from "src/components/modal-create-project";
import { CardProject } from "src/components/card-project";
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
            <Row className="action" gutter={[8, 8]}>
              <Col xs={12} sm={12} md={6}>
                <Dropdown menu={menuProps}>
                  <Button style={{ width: "100%" }}>
                    <Space
                      style={{
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
              </Col>
              <Col xs={12} sm={12} md={6}>
                <Input
                  placeholder="Search..."
                  prefix={<SearchOutlined />}
                  style={{ width: "100%" }}
                />
              </Col>
              <Col xs={12} sm={12} md={6}>
                <Button
                  type="default"
                  className="title-row-btn"
                  icon={<DeleteOutlined />}
                  style={{ width: "100%" }}
                >
                  Trash
                </Button>
              </Col>
              <Col xs={12} sm={12} md={6}>
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
        <main className="">
          <List
            grid={{
              gutter: 12,
              xs: 1,
              sm: 1,
              md: 1,
              lg: 2,
              xl: 2,
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
