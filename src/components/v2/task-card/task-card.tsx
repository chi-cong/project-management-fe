import { Task } from "src/share/models";
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

interface TaskCardProp {
  task: Task;
  openDetail: () => void;
  openFile: () => void;
  openActivities: () => void;
}

export const TaskCard = ({
  openDetail,
  openActivities,
  openFile,
}: TaskCardProp) => {
  const TaskCardOptions = () => {
    return (
      <div className='task-card-options'>
        <Button type='text' className='task-card-option-btn'>
          <CheckCircle />
          <Typography.Text>Todo</Typography.Text>
        </Button>
        <Button type='text' className='task-card-option-btn'>
          <Loading />
          <Typography.Text>On progress</Typography.Text>
        </Button>
        <Button className='task-card-option-btn' type='text'>
          <DoubleCheck />
          <Typography.Text>Done</Typography.Text>
        </Button>
      </div>
    );
  };

  return (
    <Card className='task-card'>
      <div className='task-card-title'>
        <Typography.Title level={5}>Card title</Typography.Title>
        <div className='title-options'>
          <Button type='text' size='small' onClick={() => openDetail()}>
            <Eye />
          </Button>
          <Popover content={<TaskCardOptions />} trigger='click'>
            <Button type='text' size='small'>
              <MenuDots />
            </Button>
          </Popover>
        </div>
      </div>
      <Typography.Text>This is Task description section</Typography.Text>
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
          onClick={() => openActivities}
        >
          <Chat />
          <Typography.Text>{`${0} activities`}</Typography.Text>
        </Button>
        <Button
          className='task-card-footer-btn'
          type='text'
          size='small'
          onClick={() => openFile()}
        >
          <Folder />
          <Typography.Text>{`${0} Files`}</Typography.Text>
        </Button>
      </div>
    </Card>
  );
};
