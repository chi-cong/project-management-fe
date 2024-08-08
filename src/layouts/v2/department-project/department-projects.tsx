import "./department-projects.css";

import { Typography, List } from "antd";
import { ProjectCard } from "src/components/v2/project-card";
import { Project } from "src/share/models";

interface DepartmentProjectsProp {
  title: string;
  projects: Project[];
}

export const DepartmentProjects = ({
  title,
  projects,
}: DepartmentProjectsProp) => {
  return (
    <div className='department-projects'>
      <Typography.Title level={3}>{title}</Typography.Title>

      <List
        dataSource={projects}
        grid={{
          gutter: 16,
          xs: 1,
          sm: 1,
          md: 1,
          lg: 3,
          xl: 3,
          xxl: 3,
        }}
        renderItem={(project) => {
          return (
            <List.Item>
              <ProjectCard project={project} />
            </List.Item>
          );
        }}
      />
    </div>
  );
};
