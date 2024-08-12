import { CardAccount } from "src/components/card-account";
import "./account.css";
import {
  Button,
  Col,
  Dropdown,
  Input,
  List,
  MenuProps,
  PaginationProps,
  Row,
  Space,
} from "antd";
import { DownOutlined, DeleteOutlined, PlusOutlined } from "@ant-design/icons";
import { useState } from "react";
import { useGetUsersQuery } from "src/share/services";
import ModalCreateUser from "src/components/modal-create-user";
import { UserRole, OUserRole } from "src/share/models";

export const Account = () => {
  const [queries, setQueries] = useState<{
    role: UserRole;
    page: number | undefined;
    search: string | undefined;
  }>({ role: OUserRole.All, page: 1, search: "" });

  const { data } = useGetUsersQuery({
    ...queries,
    items_per_page: 9,
  });

  const items: MenuProps["items"] = [
    {
      label: "ALL",
      key: OUserRole.All,
      onClick: () => setQueries({ ...queries, role: OUserRole.All }),
    },
    {
      label: "Admin",
      key: OUserRole.Admin,
      onClick: () => setQueries({ ...queries, role: OUserRole.Admin }),
    },
    {
      label: "Staff",
      key: OUserRole.Staff,
      onClick: () => setQueries({ ...queries, role: OUserRole.Staff }),
    },
    {
      label: "Project Manager",
      key: OUserRole.ProjectManager,
      onClick: () => setQueries({ ...queries, role: OUserRole.ProjectManager }),
    },
    {
      label: "Manager",
      key: OUserRole.Manager,
      onClick: () => setQueries({ ...queries, role: OUserRole.Manager }),
    },
  ];

  const [isModalOpen, setIsModalOpen] = useState(false);

  const menuProps = {
    items,
  };

  const onChangePage: PaginationProps["onChange"] = (page) => {
    setQueries({ ...queries, page });
  };

  return (
    <div className='v2-account-page'>
      <section className='main'>
        <header className='main-header'>
          <section className='first-sec'>
            <div className='title-des'>
              <div className='title-row'>
                <h2>Account</h2>
              </div>
            </div>
            <Row className='action' gutter={[8, 8]}>
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
              <Col xs={12} sm={12} md={8}>
                <Input.Search
                  placeholder='Search...'
                  style={{ width: "100%" }}
                  allowClear
                  onSearch={(value) =>
                    setQueries({ ...queries, search: value })
                  }
                />
              </Col>
              <Col xs={12} sm={12} md={5}>
                <Button
                  type='default'
                  className='title-row-btn'
                  icon={<DeleteOutlined />}
                  style={{ width: "100%" }}
                >
                  Trash
                </Button>
              </Col>
              <Col xs={12} sm={12} md={5}>
                <Button
                  type='primary'
                  className='title-row-btn'
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
            pagination={{
              position: "bottom",
              align: "center",
              pageSize: 9,
              total: data?.total,
              onChange: onChangePage,
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
