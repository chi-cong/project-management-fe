import "./projects.css";
import { Button, Col, Input, List, PaginationProps, Row, Spin } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { useState } from "react";
import { ManagerCreateProject } from "src/components/";
import { CardProject } from "src/components/card-project";
import { useNavigate } from "react-router-dom";
import {
  useGetAllProjectDepartmentQuery,
  useGetUserDetailQuery,
} from "src/share/services";
import { selectProject } from "src/libs/redux/selectProjectSlice";
import { useDispatch } from "react-redux";

export const ManagerProjects = () => {
  const dispatch = useDispatch();

  const { data: user } = useGetUserDetailQuery();

  //components

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [queries, setQueries] = useState<{ page: number; search: string }>({
    page: 1,
    search: "",
  });
  const navigate = useNavigate();

  //fetching data
  const { data: allProject, isLoading } = useGetAllProjectDepartmentQuery(
    {
      ...queries,
      items_per_page: 9,
      departmentId: user?.department_id,
    },
    {
      skip: user?.department_id ? false : true,
    }
  );

  //pagination
  const onChangePage: PaginationProps["onChange"] = (page) => {
    setQueries({ ...queries, page });
  };

  return (
    <div className='v2-projects-page'>
      <Spin
        spinning={isLoading}
        tip='Loading Projects'
        className='account-card-loading'
        size='large'
      >
        <section className='main'>
          <header className='main-header'>
            <section className='first-sec'>
              <div className='title-des'>
                <div className='title-row'>
                  <h2>Projects</h2>
                </div>
                <Button
                  onClick={() => navigate("/v2/dashboard/manager/my-projects")}
                  shape='round'
                >
                  My Projects
                </Button>
              </div>
              <Row className='action' gutter={[8, 8]}>
                <Col xs={0} sm={0} md={0} lg={8} />
                <Col xs={12} sm={12} md={8}>
                  <Input.Search
                    placeholder='Search...'
                    style={{ width: "100%" }}
                    onSearch={(value) =>
                      setQueries({ ...queries, search: value })
                    }
                    allowClear
                  />
                </Col>
                <Col xs={12} sm={12} md={8}>
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
          <main className=''>
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
              pagination={{
                position: "bottom",
                align: "center",
                pageSize: 9,
                total: allProject?.total,
                onChange: onChangePage,
                showSizeChanger: false,
              }}
              dataSource={allProject?.data}
              renderItem={(project) => (
                <List.Item>
                  <CardProject
                    name={project?.name}
                    description={project?.description}
                    onClick={() => {
                      dispatch(selectProject(project!.project_id!));
                      navigate(
                        `/v2/dashboard/manager/project/${project!.project_id!}`
                      );
                    }}
                    project={project}
                  />
                </List.Item>
              )}
            />
          </main>
        </section>
      </Spin>
      <ManagerCreateProject
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
        departmentId={user?.department_id}
      ></ManagerCreateProject>
    </div>
  );
};
