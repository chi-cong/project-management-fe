import { useState } from "react";
import { Button, Empty, Spin, Tabs } from "antd";
import { useGetAllProjectDepartmentQuery } from "src/share/services";
import { ArrowLeftOutlined } from "@ant-design/icons";
import { ProjectCard } from "src/components/project-card";
import { ProjectWorkspace } from "src/layouts/project-workspace";
import { ProjectInfo } from "src/layouts/project-info";
import { ProjectReports } from "src/layouts/project-reports";
import "./tab-project-departments.css";
import type { TabsProps } from "antd";
import { Project } from "src/share/models";

export const TabProjectDepartment = ({
  department_id,
}: {
  department_id?: string;
}) => {
  const [openProjectTab, setOpenProjectTab] = useState<boolean>(false);
  const [selectedProject, setSelectedProject] = useState<Project | undefined>();

  const tabsProps: TabsProps["items"] = [
    {
      key: "1",
      label: "General",
      children: (
        <ProjectInfo
          project={selectedProject}
          allFetch={false}
          departFetch={false}
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

  const { data: projectData, isFetching } = useGetAllProjectDepartmentQuery({
    departmentId: department_id,
  });

  return (
    <>
      {projectData?.data && projectData.data.length > 0 ? (
        openProjectTab ? (
          <>
            <Button onClick={() => setOpenProjectTab(false)}>
              <ArrowLeftOutlined />
              Back to project list
            </Button>
            <Tabs items={tabsProps} className='project-tabs' />
          </>
        ) : (
          <Spin spinning={isFetching}>
            <div className='projects-tab-content'>
              {projectData?.data.map((project: Project, index) => (
                <div className='project-card-department' key={index}>
                  <ProjectCard
                    key={project.project_id}
                    onClick={() => {
                      setOpenProjectTab(true);
                      setSelectedProject(project);
                    }}
                    projectName={project.name}
                    description={project.description}
                    // tempory comment, wait for BE changes
                    // information={project.information}
                  />
                </div>
              ))}
            </div>
          </Spin>
        )
      ) : (
        <Empty />
      )}
    </>
  );
};
