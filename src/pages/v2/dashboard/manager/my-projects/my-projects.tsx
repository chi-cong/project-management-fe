import "./my-projects.css";
import { Button, Col, Input, List, PaginationProps, Row } from "antd";
import { ArrowLeftOutlined } from "@ant-design/icons";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useGetUserProjectQuery } from "src/share/services";
import { selectProject } from "src/libs/redux/selectProjectSlice";
import { useDispatch } from "react-redux";
import { MyCardProject } from "src/components/v2";

export const MyProjects = () => {
  const dispatch = useDispatch();

  const [queries, setQueries] = useState<{ page: number; search: string }>({
    page: 1,
    search: "",
  });
  const navigate = useNavigate();

  //fetching data
  const { data: allProject } = useGetUserProjectQuery({
    ...queries,
    items_per_page: 9,
  });

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
                <h2>My Projects</h2>
              </div>
              <Button onClick={() => navigate(-1)} shape='round'>
                <ArrowLeftOutlined /> Go Back
              </Button>
            </div>
            <Row className='action' gutter={[8, 8]}>
              <Col sm={0} md={12} />
              <Col md={12}>
                <Input.Search
                  placeholder='Search...'
                  style={{ width: "100%" }}
                  onSearch={(value) =>
                    setQueries({ ...queries, search: value })
                  }
                  allowClear
                />
              </Col>
              <Col sm={12} md={0} />
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
                <MyCardProject
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
    </div>
  );
};
