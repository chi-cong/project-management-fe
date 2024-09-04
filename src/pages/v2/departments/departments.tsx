import "./departments.css";
import { Button, Col, Input, List, PaginationProps, Row, Spin } from "antd";
import { DeleteOutlined, PlusOutlined } from "@ant-design/icons";
import { useState } from "react";
import { CardDepartment } from "src/components/card-department";
import ModalCreateDepartment from "src/components/modal-create-department";
import { useNavigate } from "react-router-dom";
import { useRoleChecker } from "src/share/hooks";
import { useGetDepartmentsQuery } from "src/share/services";
import { OUserRole } from "src/share/models";
import { useDispatch } from "react-redux";
import { selectDepartment } from "src/libs/redux/selectDepartmentSlice";
import { localStorageUtil } from "src/share/utils";

export const Departments = () => {
  const dispatch = useDispatch();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [queries, setQueries] = useState<{
    page: number;
    itemsPerPage: number;
    search: string;
  }>({ page: 1, itemsPerPage: 9, search: "" });

  const checkRole = useRoleChecker();
  const { data, isLoading } = useGetDepartmentsQuery(queries, {
    skip: checkRole(OUserRole.Staff) || checkRole(OUserRole.Manager),
  });

  const navigate = useNavigate();

  const onChangePage: PaginationProps["onChange"] = (page) => {
    setQueries({ ...queries, page });
  };

  return (
    <Spin
      spinning={isLoading}
      tip="Loading Departments"
      className="account-card-loading"
      size="large"
    >
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
                <Col xs={12} sm={12} md={7} lg={5}>
                  <Button
                    type="default"
                    className="title-row-btn"
                    icon={<DeleteOutlined />}
                    style={{ width: "100%" }}
                    onClick={() => {
                      navigate(
                        `/v2/dashboard/${localStorageUtil.get("role")?.toLocaleLowerCase()}/department-trash/`
                      );
                    }}
                  >
                    Trash
                  </Button>
                </Col>
                <Col xs={12} sm={12} md={7} lg={5}>
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
                <Col xs={24} sm={24} md={10} lg={10}>
                  <Input.Search
                    placeholder="Search..."
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
              pagination={{
                position: "bottom",
                align: "center",
                pageSize: 9,
                total: data?.total,
                onChange: onChangePage,
                showSizeChanger: false,
              }}
              dataSource={data?.departments}
              renderItem={
                data
                  ? (department) => (
                      <List.Item>
                        <CardDepartment
                          department={department}
                          onClick={() => {
                            dispatch(
                              selectDepartment(department!.department_id!)
                            );
                            navigate(
                              `/v2/dashboard/${localStorageUtil.get("role")?.toLocaleLowerCase()}/department/${department!.department_id!}`
                            );
                          }}
                        />
                      </List.Item>
                    )
                  : undefined
              }
            />
          </main>
        </section>
        <ModalCreateDepartment
          isModalOpen={isModalOpen}
          setIsModalOpen={setIsModalOpen}
        ></ModalCreateDepartment>
      </div>
    </Spin>
  );
};
