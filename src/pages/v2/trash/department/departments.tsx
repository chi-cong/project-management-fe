import "./departments.css";
import { Button, Col, Input, List, PaginationProps, Row } from "antd";
import { useState } from "react";
import { useRoleChecker } from "src/share/hooks";
import { useGetDeletedDepartmentsQuery } from "src/share/services";
import { OUserRole } from "src/share/models";
import { CardDepartmentTrash } from "src/components/card-department-trash";
import { ArrowLeftOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";

export const DepartmentTrash = () => {
  const [queries, setQueries] = useState<{
    page: number;
    itemsPerPage: number;
    search: string;
  }>({ page: 1, itemsPerPage: 9, search: "" });

  const checkRole = useRoleChecker();
  const { data } = useGetDeletedDepartmentsQuery(queries, {
    skip: checkRole(OUserRole.Staff) || checkRole(OUserRole.Manager),
  });

  const onChangePage: PaginationProps["onChange"] = (page) => {
    setQueries({ ...queries, page });
  };
  const navigate = useNavigate();
  return (
    <div className='v2-departments-page'>
      <section className='main'>
        <header className='main-header'>
          <section className='first-sec'>
            <div className='title-des'>
              <div className='title-row'>
                <h2>Departments Trash</h2>
              </div>
              <Button
                shape='round'
                style={{ display: "" }}
                onClick={() => navigate(-1)}
              >
                <ArrowLeftOutlined />
                Back to department
              </Button>
            </div>
            <Row className='header-action' gutter={[8, 8]}>
              <Col xs={24} sm={24} md={24}>
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
        <main className='department-main-info'>
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
            }}
            dataSource={data?.departments}
            renderItem={
              data
                ? (department) => (
                    <List.Item>
                      <CardDepartmentTrash department={department} />
                    </List.Item>
                  )
                : undefined
            }
          />
        </main>
      </section>
    </div>
  );
};
