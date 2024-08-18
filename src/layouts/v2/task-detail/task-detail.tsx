import "./task-detail.css";
import {
  Modal,
  Input,
  Button,
  Typography,
  Card,
  Popconfirm,
  Popover,
  Tooltip,
  message,
} from "antd";
import { useState } from "react";
import { UserPlus, MenuDots, Down, Folder, Pen, Trash } from "src/assets/icons";
import { DocumentSection, CustomAvatar } from "src/components/v2";
import {
  useGetProjectStaffsQuery,
  useUpdateAssignmentMutation,
  useGetAssignmentQuery,
  useDeleteAssignmentMutation,
  useDeleteTaskMutation,
} from "src/share/services";
import { useSelector, useDispatch } from "react-redux";
import { selectTaskAssign } from "src/libs/redux/taskAssignSlice";
import { Activities } from "./activities";

import { UpdateTaskForm } from "../update-task-form";
import type { RootState } from "src/libs/redux";

import type { Project } from "src/share/models";

interface TaskFormProps {
  project?: Project;
  open: boolean;
  setShowTaskDetail: (isOpen: boolean) => void;
}

export const TaskDetail = ({
  project,
  open,
  setShowTaskDetail,
}: TaskFormProps) => {
  const taskAssignment = useSelector(
    (state: RootState) => state.taskAssignment
  );
  const dispatch = useDispatch();

  const { data: assignment } = useGetAssignmentQuery(
    {
      assignmentId: taskAssignment.assignment?.assignment_id,
    },
    { skip: !taskAssignment.assignment?.assignment_id }
  );

  const [deleteTask] = useDeleteTaskMutation();
  const [deleteAssignment] = useDeleteAssignmentMutation();
  const [updateAssignment] = useUpdateAssignmentMutation();

  const [editModal, setEditModal] = useState<boolean>(false);
  const [modalWidth, setModalWidth] = useState<number>(750);
  const [search, setSearch] = useState<string>("");
  const { data: projectStaffs } = useGetProjectStaffsQuery({
    projectId: project?.project_id,
    items_per_page: "ALL",
    search,
  });

  const TaskOption = () => {
    return (
      <div className='task-option'>
        <Button
          type='text'
          className='task-option-btn'
          onClick={() => {
            setEditModal(true);
          }}
        >
          <Pen />
          <Typography.Text>Edit</Typography.Text>
        </Button>
        <Popconfirm title='Delete this task ?'>
          <Button
            className='task-option-btn'
            type='text'
            onClick={async () => {
              await deleteTask({ taskId: taskAssignment.task?.task_id });
              await deleteAssignment({
                assigmentId: taskAssignment.assignment!.assignment_id,
              })
                .unwrap()
                .then(() => {
                  setShowTaskDetail(false);
                  message.success("Task is deleted");
                })
                .catch(() => message.error("failed to delete this task"));
            }}
          >
            <Trash />
            <Typography.Text>Delete</Typography.Text>
          </Button>
        </Popconfirm>
      </div>
    );
  };

  const AssignUserPopover = () => {
    return (
      <div className='assign-user-popover'>
        <Input.Search
          placeholder='Search'
          onSearch={(value) => {
            setSearch(value);
          }}
          allowClear
        />
        {projectStaffs?.users.map((staff) => {
          return (
            <Card
              hoverable
              className='assignable-user-card'
              style={{ marginTop: "10px" }}
              onClick={() => {
                updateAssignment({
                  assignmentId: taskAssignment.assignment!.assignment_id!,
                  value: { user_id: staff.user_id },
                })
                  .unwrap()
                  .then(() => {
                    dispatch(
                      selectTaskAssign({
                        task: taskAssignment.task,
                        assignment: assignment,
                      })
                    );
                    message.success("Staff is assigned to this task");
                  })
                  .catch(() => message.error("Failed to assign staff"));
              }}
            >
              <Card.Meta
                avatar={
                  <CustomAvatar
                    size={32}
                    userName={staff.name}
                    avatarSrc={staff.avatar}
                    bgColor={staff.avatar_color}
                  />
                }
                title={staff.name}
                description={staff.email}
              />
            </Card>
          );
        })}
      </div>
    );
  };

  return (
    <Modal
      centered
      width={modalWidth}
      open={open}
      onCancel={() => setShowTaskDetail(false)}
      className='task-detail-modal'
      title={
        <div className='task-detail-modal-title'>
          <Popover
            content={AssignUserPopover}
            placement='bottomLeft'
            trigger='click'
          >
            <Button className='assign-task-btn' size='small' type='text'>
              <UserPlus className='assign-task-icon' />
              <h5>Assign task to</h5>
              <Down className='assign-task-icon' />
            </Button>
          </Popover>
          <div className='task-detail-head-right-size'>
            <Tooltip title='files'>
              <Button
                type='text'
                size='small'
                onClick={() => {
                  if (modalWidth === 750) {
                    setModalWidth(1000);
                  } else {
                    setModalWidth(750);
                  }
                }}
              >
                <Folder className='menu-dots-task-detail' />
              </Button>
            </Tooltip>
            <Popover content={<TaskOption />} trigger='click'>
              <Button type='text' size='small'>
                <MenuDots className='menu-dots-task-detail' />
              </Button>
            </Popover>
          </div>
        </div>
      }
      footer={[]}
    >
      <div className='task-detail-content'>
        <div
          className={`main-task-detail-section ${modalWidth === 750 && "main-task-detail-section-full"}`}
        >
          {taskAssignment.assignment?.user && (
            <Card loading={false} className='assigned-user-card'>
              <Card.Meta
                {...(taskAssignment && {
                  avatar: <CustomAvatar size={40} userName='ABC' />,
                })}
                title={taskAssignment.assignment.user?.name}
                description={taskAssignment.assignment.user?.email}
              />
            </Card>
          )}
          <div className='task-description'>
            <Typography.Title level={3}>
              {taskAssignment.task?.name}
            </Typography.Title>
            <Typography.Text>
              {taskAssignment.task?.description}
            </Typography.Text>
          </div>
          <Activities />
        </div>
        {modalWidth === 1000 && <DocumentSection />}
      </div>
      <UpdateTaskForm
        isModalOpen={editModal}
        setIsModalOpen={setEditModal}
        project={project}
      />
    </Modal>
  );
};
