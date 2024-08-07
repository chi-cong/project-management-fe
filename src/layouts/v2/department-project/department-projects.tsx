import "./department-projects.css";

import { Typography, List } from "antd";
import { ProjectCard } from "src/components/v2/project-card";

interface DepartmentProjectsProp {
  title: string;
}

export const DepartmentProjects = ({ title }: DepartmentProjectsProp) => {
  return (
    <div className='department-projects'>
      <Typography.Title level={3}>{title}</Typography.Title>

      <List
        dataSource={[1, 2, 3]}
        grid={{
          gutter: 16,
          xs: 1,
          sm: 1,
          md: 2,
          lg: 2,
          xl: 3,
          xxl: 3,
        }}
        renderItem={() => {
          return (
            <List.Item>
              <ProjectCard
                project={{
                  name: "chat app",
                  description: "what ever, bye bye bye",
                }}
              />
            </List.Item>
          );
        }}
      />
    </div>
  );
};
