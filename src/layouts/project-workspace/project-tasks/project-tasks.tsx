import "./project-tasks.css";
import { useEffect, useState } from "react";
import { Modal, Button, List, Spin, Popover, message } from "antd";
import { TaskForm } from "src/layouts";
import {
  useGetProjectTasksQuery,
  useGetAssignmentsQuery,
  useUpdateAssignmentMutation,
} from "src/share/services";
import { ClockCircleOutlined, CheckCircleOutlined } from "@ant-design/icons";

import { Assignment, OUserRole, Project, Task } from "src/share/models";
import { localStorageUtil } from "src/share/utils";

interface ProjectTasksProp {
  project: Project;
}

const role = localStorageUtil.get("role");

export const ProjectTasks = ({ project }: ProjectTasksProp) => {
  const [showTaskForm, setShowTaskForm] = useState<boolean>(false);

  const [page, setPage] = useState<number>(1);
  const [formAction, setFormAction] = useState<"create" | "update">("create");
  const [selectedTask, setSelectedTask] = useState<Task | undefined>(undefined);
  const [selectedAssignment, setSelectedAssignment] = useState<
    Assignment | undefined
  >(undefined);

  const [updateAssignment] = useUpdateAssignmentMutation();
  const { data: taskList, isFetching: taskFetch } = useGetProjectTasksQuery({
    projectId: project?.project_id,
    page,
    items_per_page: 5,
  });
  const { data: assigments, isFetching: assignmentFetch } =
    useGetAssignmentsQuery({
      targetId: project!.project_id!,
      items_per_page: "ALL",
      target: "project",
    });

  const assignTaskSubFetch = () => {
    if (!taskFetch && !assignmentFetch) {
      setSelectedAssignment((prevAssign) =>
        assigments?.assignments.find(
          (assign) => assign.assignment_id === prevAssign?.assignment_id
        )
      );
      setSelectedTask((prevTask) =>
        taskList?.data.find((task) => task.task_id === prevTask?.task_id)
      );
    }
  };

  const updateTaskStatusColor = () => {
    if (selectedAssignment?.status) {
      return "task-done-btn-green";
    }
    return "task-done-btn-gray";
  };

  useEffect(() => {
    assignTaskSubFetch();
  }, [taskList, assigments]);

  return (
    <div className='task-section'>
      <div className='filter-role'>
        <p className='project-section-title'>Tasks</p>
      </div>
      <div className='task-card-container'>
        <Spin spinning={assignmentFetch || taskFetch} tip='Getting Tasks'>
          <List
            pagination={{
              onChange: (selectedPage) => {
                setPage(selectedPage);
              },
              total: taskList?.total,
              pageSize: 5,
              showSizeChanger: false,
            }}
            dataSource={taskList?.data}
            renderItem={(task) => {
              let matchedAssignment: Assignment | undefined;
              if (task.task_id) {
                matchedAssignment = assigments?.assignments?.find(
                  (assignment) => task.task_id === assignment.task_id
                );
                return (
                  <List.Item
                    actions={[
                      <Button
                        type='link'
                        onClick={() => {
                          setShowTaskForm(true);
                          setFormAction("update");
                          setSelectedTask(task);
                          setSelectedAssignment(matchedAssignment);
                        }}
                      >
                        View detail
                      </Button>,
                      matchedAssignment?.status ? (
                        <CheckCircleOutlined className='task-done-icon' />
                      ) : (
                        <ClockCircleOutlined className='task-in-progress-icon' />
                      ),
                    ]}
                  >
                    <List.Item.Meta title={task?.description} />
                  </List.Item>
                );
              }
            }}
          />
        </Spin>
        {!(role === OUserRole.Staff) && (
          <Button
            className='create-task-btn'
            type='default'
            onClick={() => {
              setShowTaskForm(true);
              setFormAction("create");
            }}
          >
            Create new Task
          </Button>
        )}
      </div>
      <Modal
        title={
          formAction === "update" && (
            <Popover
              content={
                selectedAssignment?.status
                  ? "Mark as in progress"
                  : "Mark as complete"
              }
            >
              <CheckCircleOutlined
                className={`task-done-btn ${updateTaskStatusColor()}`}
                onClick={async () => {
                  if (selectedAssignment!.status) {
                    try {
                      await updateAssignment({
                        assignmentId: selectedAssignment!.assignment_id!,
                        value: {
                          status: false,
                        },
                      });
                      message.success("Mark as in progress");
                    } catch {
                      message.error("Action failed");
                    }
                  } else {
                    try {
                      await updateAssignment({
                        assignmentId: selectedAssignment!.assignment_id!,
                        value: {
                          status: true,
                        },
                      });
                      message.success("Mark as completed");
                    } catch {
                      message.error("Action failed");
                    }
                  }
                }}
              />
            </Popover>
          )
        }
        open={showTaskForm}
        onCancel={() => setShowTaskForm(false)}
        onOk={() => setShowTaskForm(false)}
        footer={[]}
        className='task-modal'
      >
        <TaskForm
          project={project}
          action={formAction}
          assignment={selectedAssignment}
          task={selectedTask}
          setShowTaskForm={setShowTaskForm}
        />
      </Modal>
    </div>
  );
};
