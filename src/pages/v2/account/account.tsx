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
import { useGetUsersQuery, useGetDepartmentsQuery } from "src/share/services";
import ModalCreateUser from "src/components/modal-create-user";
import { UserRole, OUserRole } from "src/share/models";
import { useNavigate } from "react-router-dom";
import { localStorageUtil } from "src/share/utils";

export const Account = () => {
  const navigate = useNavigate();
  const [queries, setQueries] = useState<{
    role: UserRole;
    page: number | undefined;
    search: string | undefined;
    departmentId?: string;
  }>({ role: OUserRole.All, page: 1, search: "", departmentId: "" });

  const { data } = useGetUsersQuery({
    ...queries,
    items_per_page: 10,
  });
  const { data: departments } = useGetDepartmentsQuery({
    itemsPerPage: "ALL",
  });
  const filterDepartment = (): MenuProps["items"] => {
    const result: MenuProps["items"] = [
      {
        label: "ALL",
        key: "",
        onClick: () => setQueries({ ...queries, departmentId: "" }),
      },
    ];
    departments?.departments!.forEach((department) => {
      result.push({
        label: department.name,
        key: department?.department_id!,
        onClick: () =>
          setQueries({ ...queries, departmentId: department.department_id }),
      });
    });
    return result;
  };

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
              <Col xs={24} sm={12} md={12} lg={7}>
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
                      {queries.role === OUserRole.All ? "Role" : queries.role}
                      <DownOutlined />
                    </Space>
                  </Button>
                </Dropdown>
              </Col>
              <Col xs={24} sm={12} md={12} lg={7}>
                <Dropdown menu={{ items: filterDepartment() }}>
                  <Button style={{ width: "100%" }}>
                    <Space
                      style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        textTransform: "capitalize",
                      }}
                    >
                      {queries.departmentId !== ""
                        ? departments?.departments?.find(
                            (d) => d.department_id === queries.departmentId
                          )?.name
                        : "Department"}
                      <DownOutlined />
                    </Space>
                  </Button>
                </Dropdown>
              </Col>

              <Col xs={24} sm={24} md={24} lg={10}>
                <Input.Search
                  placeholder='Search...'
                  style={{ width: "100%" }}
                  allowClear
                  onSearch={(value) =>
                    setQueries({ ...queries, search: value })
                  }
                />
              </Col>
              <div className='action-row'>
                <Col xs={12} sm={12} md={12} lg={5}>
                  <Button
                    type='default'
                    className='title-row-btn'
                    icon={<DeleteOutlined />}
                    style={{ width: "100%" }}
                    onClick={() => {
                      navigate(
                        `/v2/dashboard/${localStorageUtil.get("role")?.toLocaleLowerCase()}/account-trash/`
                      );
                    }}
                  >
                    Trash
                  </Button>
                </Col>
                <Col xs={12} sm={12} md={12} lg={5}>
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
              </div>
            </Row>
          </section>
        </header>
        <main>
          <List
            grid={{
              gutter: 12,
              xs: 1,
              sm: 1,
              md: 1,
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
              showSizeChanger: false,
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
