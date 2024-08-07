import { Typography, Badge } from "antd";
import "./task-list.css";

import { TaskCard } from "src/components/v2";

interface TaskListProp {
  color?: string;
  title: string;
  showTaskDetail: (show: boolean) => void;
  showDocSec: (show: boolean) => void;
}

export const TaskList = ({
  color,
  title,
  showTaskDetail,
  showDocSec,
}: TaskListProp) => {
  return (
    <div className='task-list'>
      <div className='title' style={{ borderColor: color }}>
        <Badge dot className='node' color={color} />
        <Typography.Title level={5} style={{ marginBottom: 0 }}>
          {title}
        </Typography.Title>
      </div>
      <TaskCard
        openDetail={() => showTaskDetail(true)}
        openFile={() => showDocSec(true)}
      />
      <TaskCard
        openDetail={() => showTaskDetail(true)}
        openFile={() => showDocSec(true)}
      />
    </div>
  );
};
