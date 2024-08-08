import "./project.css";
import { MenuDots, Pen, Trash, Page } from "src/assets/icons";
import {
  Typography,
  Button,
  Avatar,
  Popconfirm,
  Popover,
  List,
  Modal,
} from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { CustomAvatar, DocumentSection } from "src/components/v2";
import { TaskList, TaskDetail } from "src/layouts/v2";
import { useState } from "react";
import { ArrowLeftOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";

export const AdminProject = () => {
  const [taskDetailModal, setTaskDetailModal] = useState<boolean>(false);
  const [docSec, setDocSec] = useState<boolean>(false);
  const navigate = useNavigate();

  const taskListSrc: {
    color: string;
    title: string;
  }[] = [
    {
      color: "var(--primary-color)",
      title: "Todo",
    },
    {
      color: "#FFA500",
      title: "On progress",
    },
    {
      color: "#8BC48A",
      title: "Done",
    },
  ];

  const ProjectOptions = () => {
    return (
      <div className='project-option'>
        <Button type='text' className='project-option-btn'>
          <Page />
          <Typography.Text>Detail</Typography.Text>
        </Button>
        <Button type='text' className='project-option-btn'>
          <Pen />
          <Typography.Text>Edit</Typography.Text>
        </Button>
        <Popconfirm title='Delete project ?'>
          <Button className='project-option-btn' type='text'>
            <Trash />
            <Typography.Text>Delete</Typography.Text>
          </Button>
        </Popconfirm>
      </div>
    );
  };

  return (
    <>
      <div className='admin-project-page'>
        <header className='header-row'>
          <div className='first-part'>
            <Typography.Title level={2}>Mobile App</Typography.Title>
            <Popover content={ProjectOptions} trigger='click'>
              <Button type='text' size='small'>
                <MenuDots />
              </Button>
            </Popover>
            <Button
              shape='round'
              style={{ display: "" }}
              onClick={() => navigate("/v2/dashboard/admin/projects")}
            >
              <ArrowLeftOutlined />
              Back to Projects
            </Button>
          </div>
          <div className='second-part'>
            <Button type='primary' className='create-task-btn'>
              <PlusOutlined />
              <Typography.Text style={{ color: "white" }}>
                Create Task
              </Typography.Text>
            </Button>
            <Avatar.Group maxCount={3}>
              <CustomAvatar size={32} userName='abcd' />
              <CustomAvatar size={32} userName='bcda' />
              <CustomAvatar size={32} userName='cdab' />
              <CustomAvatar size={32} userName='dabc' />
            </Avatar.Group>
          </div>
        </header>
        <List
          grid={{
            gutter: 16,
            xs: 1,
            sm: 1,
            md: 1,
            lg: 1,
            xl: 3,
            xxl: 3,
          }}
          className='task-sec'
          dataSource={taskListSrc}
          renderItem={(taskList) => {
            return (
              <List.Item>
                <TaskList
                  color={taskList.color}
                  title={taskList.title}
                  showTaskDetail={setTaskDetailModal}
                  showDocSec={setDocSec}
                />
              </List.Item>
            );
          }}
        />
      </div>

      <TaskDetail
        open={taskDetailModal}
        setShowTaskDetail={setTaskDetailModal}
        project={{}}
      />
      <Modal open={docSec} onCancel={() => setDocSec(false)} footer={[]}>
        <DocumentSection />
      </Modal>
    </>
  );
};
