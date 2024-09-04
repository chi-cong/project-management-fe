import "./project-card.css";
import { Card, Progress } from "antd";
import { TeamOutlined, InfoCircleOutlined } from "@ant-design/icons";

interface ProjectCardProp {
  onClick: () => void;
  projectName?: string;
  description?: string;
  information?: {
    total_task_is_done: string;
    total_task_is_not_done: string;
  };
}

export const ProjectCard = ({
  onClick,
  projectName,
  information,
  description,
}: ProjectCardProp) => {
  const calculateProgress = (): number => {
    return Math.ceil(
      (parseFloat(information?.total_task_is_done!) /
        (parseFloat(information?.total_task_is_done!) +
          parseFloat(information?.total_task_is_not_done!))) *
        100
    );
  };

  return (
    <Card
      hoverable
      title={projectName}
      onClick={onClick}
      className="project-card"
    >
      <div className="project-card-content">
        <div className="text-info">
          <span className="project-card-line">
            <TeamOutlined className="team-icon" />
            {information?.total_user}
          </span>
          <span className="project-card-line">
            <InfoCircleOutlined className="info-icon" />
            {description}
          </span>
        </div>
        <div className="project-progress">
          <Progress
            type="dashboard"
            steps={6}
            percent={
              information?.total_task?.total_task_is_not_done
                ? calculateProgress()
                : 0
            }
            trailColor="rgba(0, 0, 0, 0.06)"
            size={"small"}
          />
        </div>
      </div>
    </Card>
  );
};
