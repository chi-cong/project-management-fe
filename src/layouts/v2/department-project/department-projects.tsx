import "./department-projects.css";

import { Typography, Empty } from "antd";
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
      <div className='project-list'>
        {projects.length > 0 ? (
          projects.map((project, index) => {
            return (
              <div className='wrapper' key={index}>
                <ProjectCard project={project} />
              </div>
            );
          })
        ) : (
          <Empty />
        )}
      </div>
    </div>
  );
};
