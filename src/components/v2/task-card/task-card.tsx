import { Assignment, OUserRole, Task } from "src/share/models";
import "./task-card.css";
import { Button, Card, Typography, Popover } from "antd";
import {
  Eye,
  MenuDots,
  Chat,
  Folder,
  CheckCircle,
  Loading,
  DoubleCheck,
} from "src/assets/icons";
import { CustomAvatar } from "../custom-avatar";
import { OAssignmentStatus, Project } from "src/share/models/projectModels";
import {
  useUpdateAssignmentMutation,
  useGetUserDetailQuery,
} from "src/share/services";
import { useDispatch } from "react-redux";
import { selectTaskAssign } from "src/libs/redux/taskAssignSlice";
import { useRoleChecker } from "src/share/hooks";
import { shortenLongText } from "src/share/utils";

interface TaskCardProp {
  task: Task;
  assignment: Assignment;
  project?: Project;
  openDetail: () => void;
  openFile: () => void;
  openActivities: () => void;
}

export const TaskCard = ({
  task,
  openDetail,
  openActivities,
  openFile,
  assignment,
  project,
}: TaskCardProp) => {
  const [updateAssignment] = useUpdateAssignmentMutation();

  const dispatch = useDispatch();
  const { data: user } = useGetUserDetailQuery();

  const TaskCardOptions = () => {
    return (
      <div className='task-card-options'>
        {assignment?.status !== OAssignmentStatus.Todo && (
          <Button
            type='text'
            className='task-card-option-btn'
            onClick={() =>
              updateAssignment({
                assignmentId: assignment.assignment_id!,
                value: { status: OAssignmentStatus.Todo },
              })
            }
          >
            <CheckCircle />
            <Typography.Text>Todo</Typography.Text>
          </Button>
        )}
        {assignment?.status !== OAssignmentStatus.OnProgress && (
          <Button
            type='text'
            className='task-card-option-btn'
            onClick={() =>
              updateAssignment({
                assignmentId: assignment.assignment_id!,
                value: { status: OAssignmentStatus.OnProgress },
              })
            }
          >
            <Loading />
            <Typography.Text>On progress</Typography.Text>
          </Button>
        )}
        {assignment?.status !== OAssignmentStatus.Done && (
          <Button
            className='task-card-option-btn'
            type='text'
            onClick={() =>
              updateAssignment({
                assignmentId: assignment.assignment_id!,
                value: { status: OAssignmentStatus.Done },
              })
            }
          >
            <DoubleCheck />
            <Typography.Text>Done</Typography.Text>
          </Button>
        )}
      </div>
    );
  };
  const checkRole = useRoleChecker();
  return (
    <Card className='task-card'>
      <div className='task-card-title'>
        <Typography.Title level={5} className='task-name'>
          {task.name}
        </Typography.Title>
        <div className='title-options'>
          {(!checkRole(OUserRole.Staff) ||
            user?.user_id === project?.project_manager_id) && (
            <Button
              type='text'
              size='small'
              onClick={() => {
                dispatch(selectTaskAssign({ task, assignment }));
                openDetail();
              }}
            >
              <Eye />
            </Button>
          )}
          <Popover content={<TaskCardOptions />} trigger='click'>
            <Button type='text' size='small'>
              <MenuDots />
            </Button>
          </Popover>
        </div>
      </div>
      <Typography.Text>
        {shortenLongText(120, task.description)}
      </Typography.Text>
      <div className='task-card-footer'>
        {assignment.user ? (
          <div className='avatar'>
            <CustomAvatar
              size={32}
              userName={assignment.user?.name}
              avatarSrc={assignment.user?.avatar}
              bgColor={assignment.user.avatar_color}
              className='custom-avatar'
            />
            <Typography.Text>{assignment.user?.name}</Typography.Text>
          </div>
        ) : (
          <Typography.Text>Not Assigned</Typography.Text>
        )}
        <Button
          className='task-card-footer-btn'
          type='text'
          size='small'
          onClick={() => {
            dispatch(selectTaskAssign({ task }));
            openActivities();
          }}
        >
          <Chat />
          <Typography.Text>{`${task.total_activities} activities`}</Typography.Text>
        </Button>
        <Button
          className='task-card-footer-btn'
          type='text'
          size='small'
          onClick={() => {
            dispatch(selectTaskAssign({ task, assignment }));
            openFile();
          }}
        >
          <Folder />
          <Typography.Text>{`${task.document.length} Files`}</Typography.Text>
        </Button>
      </div>
    </Card>
  );
};
