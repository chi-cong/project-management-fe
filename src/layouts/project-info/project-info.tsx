import { Project } from "src/share/models";
import "./project-info.css";

import { ProjectForm } from "src/layouts/project-info/project-form";

interface ProjectInfoProp {
  project?: Project;
  departFetch?: boolean;
  allFetch?: boolean;
}

export const ProjectInfo = ({
  project,
  departFetch,
  allFetch,
}: ProjectInfoProp) => {
  return (
    <div className='project-info-container'>
      <ProjectForm
        project={project}
        departFetch={departFetch}
        allFetch={allFetch}
      />
    </div>
  );
};
