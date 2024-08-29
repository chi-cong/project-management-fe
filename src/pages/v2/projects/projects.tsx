import "./projects.css";
import {
  Button,
  Col,
  Dropdown,
  Input,
  List,
  MenuProps,
  PaginationProps,
  Row,
} from "antd";
import { DeleteOutlined, PlusOutlined, DownOutlined } from "@ant-design/icons";
import { useState } from "react";
import { ModalCreateProject } from "src/components/";
import { CardProject } from "src/components/card-project";
import { useNavigate } from "react-router-dom";
import {
  useGetAllProjectQuery,
  useGetDepartmentsQuery,
} from "src/share/services";
import { selectProject } from "src/libs/redux/selectProjectSlice";
import { useDispatch } from "react-redux";
import { localStorageUtil } from "src/share/utils";

export const Projects = () => {
  const dispatch = useDispatch();
  const { data: departments } = useGetDepartmentsQuery({
    itemsPerPage: "ALL",
    page: 1,
  });

  //components
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [queries, setQueries] = useState<{
    page: number;
    search: string;
    department_id?: string;
  }>({
    page: 1,
    search: "",
    department_id: "",
  });
  const navigate = useNavigate();

  //fetching data
  const { data: allProject } = useGetAllProjectQuery({
    ...queries,
    items_per_page: 9,
  });

  //pagination
  const onChangePage: PaginationProps["onChange"] = (page) => {
    setQueries({ ...queries, page });
  };

  const filterDepartment = (): MenuProps["items"] => {
    const result: MenuProps["items"] = [
      {
        label: "All departments",
        key: "",
        onClick: () => setQueries({ ...queries, department_id: "" }),
      },
    ];
    departments?.departments!.forEach((department) => {
      result.push({
        label: department.name,
        // eslint-disable-next-line @typescript-eslint/no-non-null-asserted-optional-chain
        key: department?.department_id!,
        onClick: () =>
          setQueries({ ...queries, department_id: department.department_id }),
      });
    });
    return result;
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
              <Col xs={24} sm={12} md={8}>
                <Input.Search
                  placeholder='Search...'
                  style={{ width: "100%" }}
                  allowClear
                  onSearch={(value) =>
                    setQueries({ ...queries, search: value })
                  }
                />
              </Col>
              <Col xs={24} sm={12} md={8}>
                <Dropdown menu={{ items: filterDepartment() }}>
                  <Button style={{ width: "100%" }}>
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        textTransform: "capitalize",
                        width: "100%",
                      }}
                    >
                      <span className='page-filter'>
                        {queries.department_id !== ""
                          ? departments?.departments?.find(
                              (d) => d.department_id === queries.department_id
                            )?.name
                          : "All departments"}
                      </span>
                      <DownOutlined />
                    </div>
                  </Button>
                </Dropdown>
              </Col>
              <Col xs={12} sm={12} md={4}>
                <Button
                  type='default'
                  className='title-row-btn'
                  icon={<DeleteOutlined />}
                  style={{ width: "100%" }}
                  onClick={() => {
                    navigate(
                      `/v2/dashboard/${localStorageUtil.get("role")?.toLocaleLowerCase()}/project-trash/`
                    );
                  }}
                >
                  Trash
                </Button>
              </Col>
              <Col xs={12} sm={12} md={4}>
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
                      `/v2/dashboard/${localStorageUtil.get("role")?.toLocaleLowerCase()}/project/${project!.project_id!}`
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
