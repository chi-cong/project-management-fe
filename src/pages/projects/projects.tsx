import "./projects.css";
import { useEffect, useState } from "react";
import { Tabs, Modal, Popconfirm, Button, List, message, Spin } from "antd";
import { ProjectInfo } from "src/layouts/project-info";
import { ProjectReports } from "src/layouts/project-reports";
import { ProjectWorkspace } from "src/layouts/project-workspace";
import { ProjectCard } from "src/components/project-card";
import { MngPageHeader } from "src/layouts/mng-page-header";
import {
  useGetAllProjectQuery,
  useDeleteProjectMutation,
  useGetUserDetailQuery,
  useGetAllProjectDepartmentQuery,
  useGetUserProjectQuery,
} from "src/share/services";
import { useRoleChecker } from "src/share/hooks";

import type { TabsProps, PaginationProps } from "antd";
import { OUserRole, type Project } from "src/share/models";
export const Projects = () => {
  const [openProjectTab, setOpenProjectTab] = useState<boolean>(false);
  const [selectedProject, setSelectedProject] = useState<Project | undefined>();
  const [isCreate, setIsCreate] = useState<boolean>(false);
  const [queries, setQueries] = useState<{
    page: number;
  }>({ page: 1 });
  const [messageApi, contextHolder] = message.useMessage();
  const checkRole = useRoleChecker();

  const { data: allProject, isFetching } = useGetAllProjectQuery(
    { ...queries, items_per_page: 9 },
    { skip: !checkRole(OUserRole.Admin) }
  );
  const { data: userDetail } = useGetUserDetailQuery();
  const { data: departmentProject, isFetching: departProjectFetch } =
    useGetAllProjectDepartmentQuery(
      {
        ...queries,
        departmentId: userDetail?.department_id,
      },
      {
        skip:
          checkRole(OUserRole.Admin) ||
          checkRole(OUserRole.ProjectManager) ||
          checkRole(OUserRole.Staff),
      }
    );
  const { data: userProjects } = useGetUserProjectQuery(
    {
      ...queries,
      items_per_page: 9,
    },
    { skip: !checkRole(OUserRole.Staff) }
  );
  const [deleteProject] = useDeleteProjectMutation();

  const subRefetch = () => {
    setSelectedProject((oldState) => {
      if (checkRole(OUserRole.Admin)) {
        return allProject?.data.find(
          (newState) => newState.project_id === oldState?.project_id
        );
      } else if (checkRole(OUserRole.Manager)) {
        return departmentProject?.data.find(
          (newState) => newState.project_id === oldState?.project_id
        );
      }
      return userProjects?.data.find(
        (newState) => newState.project_id === oldState?.project_id
      );
    });
  };

  const tabsProps: TabsProps["items"] = [
    {
      key: "1",
      label: "General",
      children: (
        <ProjectInfo
          project={selectedProject}
          departFetch={departProjectFetch}
          allFetch={isFetching}
        />
      ),
    },
    {
      key: "2",
      label: "Workspace",
      children: <ProjectWorkspace project={selectedProject} />,
    },
    {
      key: "3",
      label: "Reports",
      children: <ProjectReports projectId={selectedProject?.project_id} />,
    },
  ];

  const createProjectTab: TabsProps["items"] = [
    {
      key: "1",
      label: "General",
      children: (
        <ProjectInfo
          project={undefined}
          departFetch={departProjectFetch}
          allFetch={isFetching}
        />
      ),
    },
  ];

  const onChangePage: PaginationProps["onChange"] = (page) => {
    setQueries({ ...queries, page });
  };

  useEffect(() => {
    subRefetch();
  }, [departmentProject, allProject]);

  return (
    <>
      {contextHolder}
      <Spin
        spinning={isFetching || departProjectFetch}
        tip="Loading Projects"
        className="project-card-loading"
        size="large"
      >
        <MngPageHeader
          title="Projects"
          {...(!checkRole(OUserRole.Staff) && {
            addBtnContent: "Create Project",
            addBtnOnClick: () => {
              setIsCreate(true);
              setOpenProjectTab(true);
            },
          })}
          itemCount={
            checkRole(OUserRole.Admin)
              ? allProject?.total
              : departmentProject?.total
          }
        />
        <div className="project-card-container">
          <List
            grid={{
              gutter: 16,
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
            renderItem={
              allProject?.data || departmentProject?.data
                ? (project) => {
                    return (
                      <List.Item>
                        <ProjectCard
                          onClick={() => {
                            setOpenProjectTab(true);
                            setSelectedProject(project);
                            setIsCreate(false);
                          }}
                          projectName={project?.name}
                          description={project.description}
                          information={{
                            total_user: parseFloat(project.total_staff!),
                            total_task: {
                              total_task_is_done: parseFloat(
                                project.total_task!.total_task_is_done
                              ),
                              total_task_is_not_done: parseFloat(
                                project.total_task!.total_task_is_not_done
                              ),
                            },
                          }}
                        />
                      </List.Item>
                    );
                  }
                : undefined
            }
          />
        </div>
      </Spin>
      <Modal
        title={isCreate ? "Create Project" : "Project Details"}
        className="project-detail-modal"
        open={openProjectTab}
        onCancel={() => {
          setOpenProjectTab(false);
        }}
        footer={
          !checkRole(OUserRole.Staff) && !isCreate
            ? [
                <Popconfirm
                  key={1}
                  title="Delete Project"
                  description="Are you sure to delete this Project?"
                  okText="Yes"
                  onConfirm={async () => {
                    await deleteProject(selectedProject!.project_id!)
                      .unwrap()
                      .then(() => {
                        messageApi.success("Project deleted");
                        setOpenProjectTab(false);
                      })
                      .catch(() => {
                        messageApi.error("Failed to delete project");
                      });
                  }}
                  cancelText="No"
                >
                  <Button type="primary" danger>
                    Delete Project
                  </Button>
                </Popconfirm>,
              ]
            : []
        }
      >
        <Tabs
          items={isCreate ? createProjectTab : tabsProps}
          className="project-tabs"
        />
      </Modal>
    </>
  );
};
