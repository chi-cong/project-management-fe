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
  useDeleteTaskMutation,
} from "src/share/services";
import { useSelector, useDispatch } from "react-redux";
import { selectTaskAssign } from "src/libs/redux/taskAssignSlice";
import { Activities } from "./activities";

import { UpdateTaskForm } from "../update-task-form";
import type { RootState } from "src/libs/redux";

import type { Project } from "src/share/models";
import { OutsideClickHandler } from "src/components";

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
    { skip: taskAssignment.assignment ? false : true }
  );

  const [deleteTask] = useDeleteTaskMutation();
  const [updateAssignment] = useUpdateAssignmentMutation();
  const [isOpenAssignUser, setIsOpenAssignUser] = useState<boolean>(false);
  const [taskOptions, setTaskOptions] = useState<boolean>(false);

  const [editModal, setEditModal] = useState<boolean>(false);
  const [modalWidth, setModalWidth] = useState<number>(750);
  const [search, setSearch] = useState<string>("");
  const { data: projectStaffs } = useGetProjectStaffsQuery(
    {
      projectId: project?.project_id,
      items_per_page: "ALL",
      search,
    },
    { skip: project?.project_id ? false : true }
  );

  const TaskOption = () => {
    return (
      <OutsideClickHandler onClickOutside={() => setTaskOptions(false)}>
        <div className="task-option">
          <Button
            type="text"
            className="task-option-btn"
            onClick={() => {
              setEditModal(true);
              setTaskOptions(false);
            }}
          >
            <Pen />
            <Typography.Text>Edit</Typography.Text>
          </Button>
          <Popconfirm
            title="Delete this task ?"
            onConfirm={async () => {
              await deleteTask({ taskId: taskAssignment.task?.task_id })
                .unwrap()
                .then(() => {
                  setShowTaskDetail(false);
                  message.success("Task is deleted");
                  setTaskOptions(false);
                })
                .catch(() => message.error("failed to delete this task"));
            }}
          >
            <Button className="task-option-btn" type="text">
              <Trash />
              <Typography.Text>Delete</Typography.Text>
            </Button>
          </Popconfirm>
        </div>
      </OutsideClickHandler>
    );
  };

  const AssignUserPopover = () => {
    return (
      <OutsideClickHandler onClickOutside={() => setIsOpenAssignUser(false)}>
        <div className="assign-user-popover">
          <Input.Search
            placeholder="Search"
            onSearch={(value) => {
              setSearch(value);
            }}
            allowClear
          />
          {projectStaffs?.users.map((staff) => {
            return (
              <Card
                hoverable
                className="assignable-user-card"
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
                      setIsOpenAssignUser(false);
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
      </OutsideClickHandler>
    );
  };

  return (
    <Modal
      centered
      width={modalWidth}
      open={open}
      onCancel={() => setShowTaskDetail(false)}
      className="task-detail-modal"
      title={
        <div className="task-detail-modal-title">
          <Popover
            content={AssignUserPopover}
            placement="bottomLeft"
            trigger="click"
            open={isOpenAssignUser}
            onOpenChange={() => setIsOpenAssignUser(true)}
          >
            <Button className="assign-task-btn" size="small" type="text">
              <UserPlus className="assign-task-icon" />
              <h5>Assign task to</h5>
              <Down className="assign-task-icon" />
            </Button>
          </Popover>
          <div className="task-detail-head-right-size">
            <Tooltip title="files" className="open-files-btn">
              <Button
                type="text"
                size="small"
                onClick={() => {
                  if (modalWidth === 750) {
                    setModalWidth(1000);
                  } else {
                    setModalWidth(750);
                  }
                }}
              >
                <Folder className="menu-dots-task-detail" />
              </Button>
            </Tooltip>
            <Popover
              open={taskOptions}
              content={<TaskOption />}
              trigger="click"
              onOpenChange={() => setTaskOptions(true)}
            >
              <Button type="text" size="small">
                <MenuDots className="menu-dots-task-detail" />
              </Button>
            </Popover>
          </div>
        </div>
      }
      footer={[]}
    >
      <div className="task-detail-content">
        <div
          className={`main-task-detail-section ${modalWidth === 750 && "main-task-detail-section-full "}`}
        >
          {taskAssignment.assignment?.user && (
            <div className="assigned-user-section">
              <Card loading={false} className="assigned-user-card">
                <Card.Meta
                  {...(taskAssignment && {
                    avatar: (
                      <CustomAvatar
                        size={40}
                        userName={taskAssignment.assignment?.user?.name}
                        avatarSrc={taskAssignment?.assignment?.user?.avatar}
                        bgColor={taskAssignment.assignment?.user?.avatar_color}
                      />
                    ),
                  })}
                  title={taskAssignment.assignment.user?.name}
                  description={taskAssignment.assignment.user?.email}
                />
                <Button
                  style={{ width: "fit-content" }}
                  type="link"
                  onClick={() => {
                    updateAssignment({
                      // eslint-disable-next-line @typescript-eslint/no-non-null-asserted-optional-chain
                      assignmentId: assignment?.assignment_id!,
                      value: { user_id: null },
                    })
                      .unwrap()
                      .then(() => message.success("Unassigned user"))
                      .catch(() => message.error("Failed to unassign user"));
                  }}
                >
                  Unassign
                </Button>
              </Card>
            </div>
          )}
          <div className="task-description">
            <Typography.Title level={3}>
              {taskAssignment.task?.name}
            </Typography.Title>
            <Typography.Text>
              {taskAssignment.task?.description}
            </Typography.Text>
          </div>
          <Activities />
        </div>
        {modalWidth === 1000 && (
          <div className="document-container">
            <DocumentSection project={project} />
          </div>
        )}
      </div>
      <UpdateTaskForm
        isModalOpen={editModal}
        setIsModalOpen={setEditModal}
        project={project}
        assignment={assignment}
      />
    </Modal>
  );
};
