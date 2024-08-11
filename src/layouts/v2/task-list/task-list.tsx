import { Typography, Badge } from "antd";
import "./task-list.css";

import { TaskCard } from "src/components/v2";
import { Assignment, AssignmentStatus, Project, Task } from "src/share/models";
import { useGetAssignmentsQuery } from "src/share/services";

interface TaskListProp {
  color?: string;
  title: string;
  showTaskDetail: (show: boolean) => void;
  showDocSec: (show: boolean) => void;
  type: AssignmentStatus;
  project?: Project;
  tasks?: Task[];
}

export const TaskList = ({
  color,
  title,
  showTaskDetail,
  showDocSec,
  type,
  project,
  tasks,
}: TaskListProp) => {
  const { data: assigments } = useGetAssignmentsQuery(
    {
      targetId: project?.project_id || "",
      items_per_page: 5,
      target: "project",
      status: type,
    },
    { skip: !project }
  );

  return (
    <div className='task-list'>
      <div className='title' style={{ borderColor: color }}>
        <Badge dot className='node' color={color} />
        <Typography.Title level={5} style={{ marginBottom: 0 }}>
          {title}
        </Typography.Title>
      </div>
      <div className='tasks'>
        {tasks?.map((task) => {
          const matchedAssignment: Assignment | undefined =
            assigments?.assignments?.find(
              (assignment) => task.task_id === assignment.task_id
            );
          if (matchedAssignment) {
            return (
              <TaskCard
                openDetail={() => showTaskDetail(true)}
                openFile={() => showDocSec(true)}
                assignment={matchedAssignment}
                openActivities={() => {}}
                task={task}
              />
            );
          }
        })}
      </div>
    </div>
  );
};
