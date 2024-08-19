import "./departments.css";
import { Button, Col, Empty, Input, List, PaginationProps, Row } from "antd";
import { DeleteOutlined, PlusOutlined } from "@ant-design/icons";
import { useState } from "react";
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
  const { data: userDetail } = useGetUserDetailQuery();
  const { data } = useGetDepartmentsQuery(queries, {
    skip: checkRole(OUserRole.Staff) || checkRole(OUserRole.Manager),
  });

  const { data: departmentDetail } = useGetDetailDepartmentQuery({
    departmentId: userDetail?.department_id,
  });
  const navigate = useNavigate();

  const onChangePage: PaginationProps["onChange"] = (page) => {
    setQueries({ ...queries, page });
  };

  if (checkRole(OUserRole.Staff)) {
    if (departmentDetail) {
      return (
        <div className='v2-departments-page'>
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
      return <Empty description='No department available' />;
    }
  }

  return (
    <div className='v2-departments-page'>
      <section className='main'>
        <header className='main-header'>
          <section className='first-sec'>
            <div className='title-des'>
              <div className='title-row'>
                <h2>Departments</h2>
              </div>
            </div>
            <Row className='header-action' gutter={[8, 8]}>
              <Col xs={12} sm={12} md={12}>
                <Input.Search
                  placeholder='Search...'
                  style={{ width: "100%" }}
                  allowClear
                  onSearch={(value) =>
                    setQueries({ ...queries, search: value })
                  }
                />
              </Col>
              <Col xs={12} sm={12} md={6}>
                <Button
                  type='default'
                  className='title-row-btn'
                  icon={<DeleteOutlined />}
                  style={{ width: "100%" }}
                  onClick={() => {
                    navigate(
                      `/v2/dashboard/${localStorageUtil.get("role")?.toLocaleUpperCase}/department-trash/`
                    );
                  }}
                >
                  Trash
                </Button>
              </Col>

              <Col xs={24} sm={24} md={6}>
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
  );
};
