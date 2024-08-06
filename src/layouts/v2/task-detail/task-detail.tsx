import "./task-detail.css";
import {
  Modal,
  Select,
  Input,
  Button,
  Typography,
  Card,
  List,
  Popconfirm,
  Popover,
  Tooltip,
} from "antd";
import { useState } from "react";
import { UserPlus, MenuDots, Down, Folder, Pen, Trash } from "src/assets/icons";
import { DocumentSection, CustomAvatar } from "src/components/v2";

import type { Assignment, Task, Project, Activity } from "src/share/models";

interface TaskFormProps {
  assignment?: Assignment;
  task?: Task;
  action: "create" | "update";
  project: Project;
  setShowTaskForm: (isOpen: boolean) => void;
}

export const TaskDetail = ({ assignment, task }: TaskFormProps) => {
  const [actiDesc, setActiDesc] = useState<string>("");
  const [modalWidth, setModalWidth] = useState<number>(750);
  const activityData: Activity[] = [
    {
      user: { username: "Trinh Van Musk" },
      description: "Lorem ipsum odor amet, consectetuer adipiscing elit.",
    },
    {
      user: { username: "Elon Quyet" },
      description: "Lorem ipsum odor amet, consectetuer adipiscing elit.",
    },
  ];

  const TaskOption = () => {
    return (
      <div className='task-option'>
        <Button type='text' className='task-option-btn'>
          <Pen />
          <Typography.Text>Edit</Typography.Text>
        </Button>
        <Popconfirm title='Delete task ?'>
          <Button className='task-option-btn' type='text'>
            <Trash />
            <Typography.Text>Delete</Typography.Text>
          </Button>
        </Popconfirm>
      </div>
    );
  };

  return (
    <Modal
      width={modalWidth}
      open={true}
      className='task-detail-modal'
      title={
        <div className='task-detail-modal-title'>
          <Select
            className='task-assignment-selector'
            defaultValue={assignment ? assignment.user_id : ""}
            options={[]}
          />
          <div className='assign-task-btn'>
            <UserPlus className='assign-task-icon' />
            <h5>Assign task to</h5>
            <Down className='assign-task-icon' />
          </div>
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
          <Card loading={false} className='assigned-user-card'>
            <Card.Meta
              avatar={<CustomAvatar size={40} userName='ABC' />}
              title={"Nguyen Thi A"}
              description={"abc@gmail.com"}
            />
          </Card>
          <div className='task-description'>
            <Typography.Title level={3}>
              {task?.description || "Design User Interfaces"}
            </Typography.Title>
          </div>
          <div className='acti-section'>
            <Typography.Title level={4}>Activity</Typography.Title>
            <div className='acti-des-row'>
              <CustomAvatar size={40} userName='Nguyen Van A' />
              <div className='acti-des-container'>
                <Input.TextArea
                  style={{ resize: "none", height: "100px" }}
                  className='task-text-area'
                  placeholder='New activity'
                  value={actiDesc}
                  onChange={(e) => {
                    setActiDesc(e.target.value);
                  }}
                />
                <Button type='primary' className='add-acti-btn'>
                  Send
                </Button>
              </div>
            </div>
            {activityData && (
              <List
                style={{ width: "100%" }}
                dataSource={activityData ? activityData : []}
                renderItem={(activity) => (
                  <List.Item>
                    <List.Item.Meta
                      avatar={
                        <CustomAvatar
                          userName={activity.user?.username}
                          size={40}
                        />
                      }
                      title={activity.description}
                      description={
                        <Typography.Paragraph>
                          Make America Great Again
                        </Typography.Paragraph>
                      }
                    />
                    <Typography.Text>1 hour ago</Typography.Text>
                  </List.Item>
                )}
              />
            )}
          </div>
        </div>
        {modalWidth === 1000 && <DocumentSection />}
      </div>
    </Modal>
  );
};
