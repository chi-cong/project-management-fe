import { Typography, Badge, Modal } from "antd";
import "./task-list.css";

import { TaskCard } from "src/components/v2";
import { Assignment, AssignmentStatus, Project, Task } from "src/share/models";
import { useGetAssignmentsQuery } from "src/share/services";
import { DocumentSection } from "src/components/v2";
import { useState } from "react";

interface TaskListProp {
  color?: string;
  title: string;
  showTaskDetail: (show: boolean) => void;
  showDocSec: (show: boolean) => void;
  showActies: (show: boolean) => void;
  type: AssignmentStatus;
  project?: Project;
  tasks?: Task[];
}

export const TaskList = ({
  color,
  title,
  showTaskDetail,
  showDocSec,
  showActies,
  type,
  project,
  tasks,
}: TaskListProp) => {
  const [params] = useState<{
    items_per_page: number | "ALL";
    target: "project";
    status: AssignmentStatus;
    page: number;
  }>({
    items_per_page: "ALL",
    target: "project",
    status: type,
    page: 1,
  });

  const { data: assigments } = useGetAssignmentsQuery(
    { ...params, targetId: project?.project_id },
    {
      skip: !project,
    }
  );

  return (
    <>
      <div className='task-list'>
        <div className='title' style={{ borderColor: color }}>
          <Badge dot className='node' color={color} />
          <Typography.Title level={5} style={{ marginBottom: 0 }}>
            {title}
          </Typography.Title>
        </div>
        <div className='tasks'>
          {tasks?.map((task, index) => {
            const matchedAssignment: Assignment | undefined =
              assigments?.assignments?.find(
                (assignment) => task.task_id === assignment.task_id
              );
            if (matchedAssignment) {
              return (
                <TaskCard
                  key={index}
                  openDetail={() => showTaskDetail(true)}
                  openFile={() => showDocSec(true)}
                  assignment={matchedAssignment}
                  openActivities={() => showActies(true)}
                  task={task}
                  project={project}
                />
              );
            }
          })}
        </div>
      </div>
      <Modal>
        <DocumentSection project={project} />
      </Modal>
    </>
  );
};
