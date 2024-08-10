import "./departments.css";
import {
  Button,
  Col,
  Empty,
  Input,
  List,
  MenuProps,
  message,
  PaginationProps,
  Row,
  Space,
} from "antd";
import {
  SearchOutlined,
  DeleteOutlined,
  PlusOutlined,
} from "@ant-design/icons";
import { useState } from "react";
import ModalCreatePost from "src/components/modal-create-project";
import { CardDepartment } from "src/components/card-department";
import ModalCreateDepartment from "src/components/modal-create-department";
import { useNavigate } from "react-router-dom";
import { useRoleChecker } from "src/share/hooks";
import {
  useGetDepartmentsQuery,
  useGetDetailDepartmentQuery,
  useGetUserDetailQuery,
} from "src/share/services";
import { OUserRole } from "src/share/models";
import { UserDepartmentUi } from "src/layouts";

export const Departments = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [queries, setQueries] = useState<{
    page: number;
    itemsPerPage: number;
  }>({ page: 1, itemsPerPage: 9 });
  const handleMenuClick: MenuProps["onClick"] = () => {
    message.info("Click on menu item.");
  };

  const checkRole = useRoleChecker();
  const { data: userDetail } = useGetUserDetailQuery();
  const { data, isFetching } = useGetDepartmentsQuery(queries, {
    skip: checkRole(OUserRole.Staff) || checkRole(OUserRole.Manager),
  });

  const { data: departmentDetail } = useGetDetailDepartmentQuery(
    {
      departmentId: userDetail?.department_id,
    },
    {
      skip:
        checkRole(OUserRole.Admin) ||
        checkRole(OUserRole.ProjectManager) ||
        !userDetail?.department_id,
    }
  );

  const onChangePage: PaginationProps["onChange"] = (page) => {
    setQueries({ ...queries, page });
  };

  if (checkRole(OUserRole.Staff)) {
    if (departmentDetail) {
      return (
        <div className="v2-departments-page">
          <UserDepartmentUi
            department={departmentDetail}
            manager={{
              username: "manager",
              avatar: "",
              email: "manager@gmail.com",
            }}
          />
        </div>
      );
    } else {
      return <Empty description="No department available" />;
    }
  }

  const navigate = useNavigate();
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
                      <CardDepartment
                        name={department.name}
                        description={department.description}
                        onClick={() =>
                          navigate(
                            `/v2/dashboard/admin/department/${department.department_id}`
                          )
                        }
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
  );
};
