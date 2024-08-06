import "./department-projects.css";

import { Typography } from "antd";
import { ProjectCard } from "src/components/v2/project-card";

interface DepartmentProjectsProp {
  title: string;
}

export const DepartmentProjects = ({ title }: DepartmentProjectsProp) => {
  return (
    <div className='department-projects'>
      <Typography.Title level={3}>{title}</Typography.Title>
      <div className='projects'>
        <div className='project-card-wrapper'>
          <ProjectCard
            project={{
              name: "chat app",
              description: "what ever, bye bye bye",
            }}
          />
        </div>
      </div>
    </div>
  );
};
