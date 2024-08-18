import "./projects.css";
import { Col, Input, List, PaginationProps, Row } from "antd";
import { useState } from "react";
import { useGetDeletedProjectsQuery } from "src/share/services";
import { useRoleChecker } from "src/share/hooks";
import { OUserRole } from "src/share/models";
import { CardProjectTrash } from "src/components/card-project-trash";

export const ProjectTrash = () => {
  //components
  const [queries, setQueries] = useState<{ page: number; search: string }>({
    page: 1,
    search: "",
  });
  const checkRole = useRoleChecker();
  //fetching data
  const { data: allProject } = useGetDeletedProjectsQuery(
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
                <h2>Project Trash</h2>
              </div>
            </div>
            <Row className='action' gutter={[8, 8]}>
              <Col xs={12} sm={12} md={24}>
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