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
import { DownOutlined } from "@ant-design/icons";
import { useState } from "react";
import { useGetDeletedUsersQuery } from "src/share/services";
import ModalCreateUser from "src/components/modal-create-user";
import { UserRole, OUserRole } from "src/share/models";
import { CardAccountTrash } from "src/components/card-account-trash";
import { ArrowLeftOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
export const AccountTrash = () => {
  const [queries, setQueries] = useState<{
    role: UserRole;
    page: number | undefined;
    search: string | undefined;
  }>({ role: OUserRole.All, page: 1, search: "" });

  const { data } = useGetDeletedUsersQuery({
    ...queries,
    items_per_page: 10,
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
  const navigate = useNavigate();

  return (
    <div className='v2-account-page'>
      <section className='main'>
        <header className='main-header'>
          <section className='first-sec'>
            <div className='title-des'>
              <div className='title-row'>
                <h2>Account Trash</h2>
              </div>
              <Button
                shape='round'
                style={{ display: "" }}
                onClick={() => navigate(-1)}
              >
                <ArrowLeftOutlined />
                Back to Account
              </Button>
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
                        textTransform: "capitalize",
                      }}
                    >
                      {queries.role.toLowerCase()}
                      <DownOutlined />
                    </Space>
                  </Button>
                </Dropdown>
              </Col>
              <Col xs={12} sm={12} md={18}>
                <Input.Search
                  placeholder='Search...'
                  style={{ width: "100%" }}
                  allowClear
                  onSearch={(value) =>
                    setQueries({ ...queries, search: value })
                  }
                />
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
              pageSize: 10,
              total: data?.total,
              onChange: onChangePage,
            }}
            dataSource={data?.users}
            renderItem={(user) => (
              <List.Item>
                <CardAccountTrash userId={user.user_id} account={user} />
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
