import "./projects.css";
import { Button, Col, Input, List, PaginationProps, Row } from "antd";
import { DeleteOutlined, PlusOutlined } from "@ant-design/icons";
import { useState } from "react";
import { ModalCreateProject } from "src/components/";
import { CardProject } from "src/components/card-project";
import { useNavigate } from "react-router-dom";
import { useGetAllProjectQuery } from "src/share/services";
import { selectProject } from "src/libs/redux/selectProjectSlice";
import { useDispatch } from "react-redux";
import { useRoleChecker } from "src/share/hooks";
import { OUserRole } from "src/share/models";

export const Projects = () => {
  const dispatch = useDispatch();

  //components
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [queries, setQueries] = useState<{ page: number; search: string }>({
    page: 1,
    search: "",
  });
  const navigate = useNavigate();

  const checkRole = useRoleChecker();

  //fetching data
  const { data: allProject } = useGetAllProjectQuery(
    {
      ...queries,
      items_per_page: 9,
    },
    { skip: !checkRole(OUserRole.Admin) }
  );

  //pagination
  const onChangePage: PaginationProps["onChange"] = (page) => {
    setQueries({ ...queries, page });
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
            <Row className='action' gutter={[8, 8]}>
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
                >
                  Trash
                </Button>
              </Col>
              <Col xs={12} sm={12} md={6}>
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
                      `/v2/dashboard/admin/project/${project!.project_id!}`
                    );
                  }}
                  project={project}
                />
              </List.Item>
            )}
          />
        </main>
      </section>
      <ModalCreateProject
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
      ></ModalCreateProject>
    </div>
  );
};
