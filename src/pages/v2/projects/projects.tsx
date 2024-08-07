import "./projects.css";
import { Button, Dropdown, Input, List, MenuProps, message, Space } from "antd";
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
    <div className='v2-projects-page'>
      <section className='main'>
        <header className='main-header'>
          <section className='first-sec'>
            <div className='title-des'>
              <div className='title-row'>
                <h2>Project</h2>
              </div>
            </div>
            <div className='action'>
              <Space>
                <Dropdown menu={menuProps}>
                  <Button>
                    <Space>
                      Progress
                      <DownOutlined />
                    </Space>
                  </Button>
                </Dropdown>
                <Input placeholder='Search...' prefix={<SearchOutlined />} />
                <Button
                  type='default'
                  className='title-row-btn'
                  icon={<DeleteOutlined />}
                >
                  Trash
                </Button>
                <Button
                  type='primary'
                  className='title-row-btn'
                  icon={<PlusOutlined />}
                  onClick={() => setIsModalOpen(true)}
                >
                  Create Project
                </Button>
              </Space>
            </div>
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
                  name='Tính năng thanh toán zalopay'
                  description='Code giao diện bằng ReactJS và sử dụng các framwork liên quan
                như là....'
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
