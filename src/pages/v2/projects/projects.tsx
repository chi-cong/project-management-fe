import "./projects.css";
import {
  Button,
  Col,
  Dropdown,
  Input,
  List,
  MenuProps,
  message,
  PaginationProps,
  Row,
  Space,
} from "antd";
import {
  DownOutlined,
  SearchOutlined,
  DeleteOutlined,
  PlusOutlined,
} from "@ant-design/icons";
import { useState } from "react";
import { ModalCreateProject } from "src/components/";
import { CardProject } from "src/components/card-project";
import { useNavigate } from "react-router-dom";
import {
  useGetAllProjectDepartmentQuery,
  useGetAllProjectQuery,
  useGetUserDetailQuery,
  useGetUserProjectQuery,
} from "src/share/services";
import { useRoleChecker } from "src/share/hooks";
import { OUserRole } from "src/share/models";
import { selectProject } from "src/libs/redux/selectProjectSlice";
import { useDispatch } from "react-redux";

export const Projects = () => {
  const dispatch = useDispatch();

  //components
  const items: MenuProps["items"] = [
    {
      label: "On Progress",
      key: "on_progress",
    },
    {
      label: "Done",
      key: "done",
    },
    {
      label: "Expired",
      key: "expired",
    },
  ];
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [queries, setQueries] = useState<{ page: number }>({ page: 1 });
  const navigate = useNavigate();
  const checkRole = useRoleChecker();
  const handleMenuClick: MenuProps["onClick"] = () => {
    message.info("Click on menu item.");
  };
  const menuProps = {
    items,
    onClick: handleMenuClick,
  };

  //fetching data
  const { data: allProject } = useGetAllProjectQuery(
    { ...queries, items_per_page: 9 },
    { skip: !checkRole(OUserRole.Admin) }
  );

  const { data: userDetail } = useGetUserDetailQuery();

  const { data: departmentProject } = useGetAllProjectDepartmentQuery(
    {
      ...queries,
      departmentId: userDetail?.department_id,
    },
    {
      skip: checkRole(OUserRole.Admin) || checkRole(OUserRole.ProjectManager),
    }
  );

  const { data: userProjects } = useGetUserProjectQuery(
    {
      ...queries,
      items_per_page: 9,
    },
    { skip: !checkRole(OUserRole.Staff) }
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
              <Col xs={12} sm={12} md={6}>
                <Dropdown menu={menuProps}>
                  <Button style={{ width: "100%" }}>
                    <Space
                      style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                      }}
                    >
                      Progress
                      <DownOutlined />
                    </Space>
                  </Button>
                </Dropdown>
              </Col>
              <Col xs={12} sm={12} md={6}>
                <Input
                  placeholder='Search...'
                  prefix={<SearchOutlined />}
                  style={{ width: "100%" }}
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
              total: checkRole(OUserRole.Admin)
                ? allProject?.total
                : checkRole(OUserRole.Manager)
                  ? departmentProject?.total
                  : userProjects?.total,
              onChange: onChangePage,
              showSizeChanger: false,
            }}
            dataSource={
              checkRole(OUserRole.Admin)
                ? allProject?.data
                : checkRole(OUserRole.Manager)
                  ? departmentProject?.data
                  : userProjects?.data
            }
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
// function subRefetch() {
//   throw new Error("Function not implemented.");
// }
// function setSelectedProject(arg0: (oldState: any) => any) {
//   throw new Error("Function not implemented.");
// }
