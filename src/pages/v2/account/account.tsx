import { CardAccount } from "src/components/card-account";
import "./account.css";
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
import { useGetUsersQuery } from "src/share/services";
import ModalCreateUser from "src/components/modal-create-user";
import { UserRole, OUserRole } from "src/share/models";

export const Account = () => {
  const [queries] = useState<{
    role: UserRole;
    page: number | undefined;
  }>({ role: OUserRole.All, page: 1 });

  const { data } = useGetUsersQuery({
    ...queries,
    items_per_page: 9,
  });

  const items: MenuProps["items"] = [
    { label: "Admin", key: OUserRole.Admin },
    { label: "Staff", key: OUserRole.Staff },
    { label: "Project Manager", key: OUserRole.ProjectManager },
    { label: "Manager", key: OUserRole.Manager },
  ];

  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleMenuClick: MenuProps["onClick"] = () => {
    message.info("Click on menu item.");
  };

  const menuProps = {
    items,
    onClick: handleMenuClick,
  };

  return (
    <div className="v2-account-page">
      <section className="main">
        <header className="main-header">
          <section className="first-sec">
            <div className="title-des">
              <div className="title-row">
                <h2>Account</h2>
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
                      Roles
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
        <main>
          <List
            grid={{
              gutter: 12,
              xs: 1,
              sm: 1,
              md: 2,
              lg: 2,
              xl: 2,
              xxl: 2,
            }}
            dataSource={data?.users}
            renderItem={(user) => (
              <List.Item>
                <CardAccount userId={user.user_id} account={user} />
              </List.Item>
            )}
          />
        </main>
      </section>
      <ModalCreateUser
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
      />
    </div>
  );
};
