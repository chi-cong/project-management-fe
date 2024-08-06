import "./project-card.css";
import {
  Typography,
  Button,
  Progress,
  Divider,
  Popconfirm,
  Popover,
} from "antd";
import { MenuDots, Pen, Trash } from "src/assets/icons";
import type { Project } from "src/share/models";

interface ProjectCardProp {
  project: Project;
}

export const ProjectCard = ({ project }: ProjectCardProp) => {
  const calculateProgress = (): number => {
    if (
      parseFloat(project.total_task!.total_task_is_done) === 0 ||
      parseFloat(project.total_task!.total_task_is_not_done)! === 0
    ) {
      return 0;
    }
    return Math.ceil(
      (parseFloat(project?.total_task!.total_task_is_done) /
        parseFloat(project?.total_task!.total_task_is_not_done)) *
        100
    );
  };

  const progressColor = (percent: number) => {
    if (percent <= 33) {
      return "#f5222d";
    }
    if (33 < percent && percent <= 66) {
      return "#ffc008";
    }
    if (66 < percent && percent <= 99) {
      return "#14A2B8";
    }
    return "#28A745";
  };

  const ProjectCardOption = () => {
    return (
      <div className='project-option'>
        <Button type='text' className='project-option-btn'>
          <Pen />
          <Typography.Text>Edit</Typography.Text>
        </Button>
        <Popconfirm title='Delete project ?'>
          <Button className='project-option-btn' type='text'>
            <Trash />
            <Typography.Text>Delete</Typography.Text>
          </Button>
        </Popconfirm>
      </div>
    );
  };

  return (
    <div className='project-card-v2'>
      <div className='project-card-head'>
        <Typography.Title level={4}>{project.name}</Typography.Title>
        <Popover trigger='click' content={ProjectCardOption}>
          <Button type='text' size='small'>
            <MenuDots />
          </Button>
        </Popover>
      </div>
      <div className='project-card-body'>
        <Typography.Text>{project.description}</Typography.Text>
        <div className='progress-sec'>
          <Progress
            percent={100}
            showInfo={false}
            strokeColor={progressColor(100)}
          />
          <div className='progress-second-line'>
            <Typography.Text>progress</Typography.Text>
            <Typography.Text>50%</Typography.Text>
          </div>
        </div>
      </div>
      <Divider />
      <div className='project-card-footer'>
        <Typography.Text>Nov 2, 2021</Typography.Text>
        <Typography.Text>3 hours left</Typography.Text>
      </div>
    </div>
  );
};
