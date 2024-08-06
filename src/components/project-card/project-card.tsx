import "./project-card.css";
import { Card, Progress } from "antd";
import { TeamOutlined, InfoCircleOutlined } from "@ant-design/icons";

interface ProjectCardProp {
  onClick: () => void;
  projectName?: string;
  description?: string;
  information?: {
    total_user: number;
    total_task: {
      total_task_is_done: number;
      total_task_is_not_done: number;
    };
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
      (information!.total_task.total_task_is_done /
        information!.total_task.total_task_is_not_done) *
        100
    );
  };

  return (
    <Card
      hoverable
      title={projectName}
      onClick={onClick}
      className='project-card'
    >
      <div className='project-card-content'>
        <div className='text-info'>
          <span className='project-card-line'>
            <TeamOutlined className='team-icon' />
            {information?.total_user}
          </span>
          <span className='project-card-line'>
            <InfoCircleOutlined className='info-icon' />
            {description}
          </span>
        </div>
        <div className='project-progress'>
          <Progress
            type='dashboard'
            steps={6}
            percent={
              information?.total_task?.total_task_is_not_done
                ? calculateProgress()
                : 0
            }
            trailColor='rgba(0, 0, 0, 0.06)'
            size={"small"}
          />
        </div>
      </div>
    </Card>
  );
};
