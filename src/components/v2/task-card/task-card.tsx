import { Assignment, Task } from "src/share/models";
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
import { OAssignmentStatus } from "src/share/models";
import { useUpdateAssignmentMutation } from "src/share/services";
import { useDispatch } from "react-redux";
import { selectTaskAssign } from "src/libs/redux/taskAssignSlice";

interface TaskCardProp {
  task: Task;
  assignment: Assignment;
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
}: TaskCardProp) => {
  const [updateAssignment] = useUpdateAssignmentMutation();

  const dispatch = useDispatch();

  const TaskCardOptions = () => {
    return (
      <div className='task-card-options'>
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
      </div>
    );
  };

  return (
    <Card className='task-card'>
      <div className='task-card-title'>
        <Typography.Title level={5}>{task.name}</Typography.Title>
        <div className='title-options'>
          <Button
            type='text'
            size='small'
            onClick={() => {
              openDetail();
              dispatch(selectTaskAssign({ task, assignment }));
            }}
          >
            <Eye />
          </Button>
          <Popover content={<TaskCardOptions />} trigger='click'>
            <Button type='text' size='small'>
              <MenuDots />
            </Button>
          </Popover>
        </div>
      </div>
      <Typography.Text>{task.description}</Typography.Text>
      <div className='task-card-footer'>
        <div className='avatar'>
          <CustomAvatar
            size={32}
            userName='Deadpool'
            className='custom-avatar'
          />
          <Typography.Text>Today</Typography.Text>
        </div>
        <Button
          className='task-card-footer-btn'
          type='text'
          size='small'
          onClick={() => openActivities()}
        >
          <Chat />
          <Typography.Text>{`${task.total_activities} activities`}</Typography.Text>
        </Button>
        <Button
          className='task-card-footer-btn'
          type='text'
          size='small'
          onClick={() => openFile()}
        >
          <Folder />
          <Typography.Text>{`${task.document.length} Files`}</Typography.Text>
        </Button>
      </div>
    </Card>
  );
};
