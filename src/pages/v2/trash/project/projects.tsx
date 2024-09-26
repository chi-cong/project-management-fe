import "./projects.css";
import { Button, Col, Input, List, PaginationProps, Row } from "antd";
import { useState } from "react";
import { useGetDeletedProjectsQuery } from "src/share/services";
import { CardProjectTrash } from "src/components/card-project-trash";
import { ArrowLeftOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";

export const ProjectTrash = () => {
  //components
  const [queries, setQueries] = useState<{ page: number; search: string }>({
    page: 1,
    search: "",
  });
  //fetching data
  const { data: allProject } = useGetDeletedProjectsQuery({
    ...queries,
    items_per_page: 9,
  });
  //pagination
  const onChangePage: PaginationProps["onChange"] = (page) => {
    setQueries({ ...queries, page });
  };
  const navigate = useNavigate();

  return (
    <div className='v2-projects-trash-page'>
      <section className='main'>
        <header className='main-header'>
          <section className='first-sec'>
            <div className='title-des'>
              <div className='title-row'>
                <h2>Project Trash</h2>
              </div>
              <Button
                shape='round'
                style={{ display: "" }}
                onClick={() => navigate(-1)}
              >
                <ArrowLeftOutlined />
                Back to Project
              </Button>
            </div>
            <Row className='header-action' gutter={[8, 8]}>
              <Col span={24}>
                <Input.Search
                  placeholder='Search...'
                  allowClear
                  onSearch={(value) =>
                    setQueries({ ...queries, search: value })
                  }
                />
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
                <CardProjectTrash
                  name={project?.name}
                  description={project?.description}
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
