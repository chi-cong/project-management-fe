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
  message,
} from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { CustomAvatar, DocumentSection } from "src/components/v2";
import { TaskList, TaskDetail, CreateTaskForm } from "src/layouts/v2";
import { useState } from "react";
import { ArrowLeftOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { AssignmentStatus, OAssignmentStatus } from "src/share/models";
import {
  useGetProjectQuery,
  useGetProjectTasksQuery,
  useDeleteProjectMutation,
  useGetProjectStaffsQuery,
} from "src/share/services";
import { ModalUpdateProject } from "src/components";

export const AdminProject = () => {
  const { data: projectData } = useGetProjectQuery({
    projectId: "66aa0f19c16d87c10c297035",
  });
  const { data: tasks } = useGetProjectTasksQuery({
    items_per_page: "ALL",
    projectId: "66aa0f19c16d87c10c297035",
    page: 1,
  });
  const [deleteProject] = useDeleteProjectMutation();
  const { data: projectStaffs } = useGetProjectStaffsQuery({
    items_per_page: "ALL",
    projectId: "66aa0f19c16d87c10c297035",
  });

  const [taskDetailModal, setTaskDetailModal] = useState<boolean>(false);
  const [createTaskModal, setCreateTaskModal] = useState<boolean>(false);
  const [projectUpdateModal, setProjectUpdateModal] = useState<boolean>(false);
  const [isUpdateProject, setIsUpdateProject] = useState<boolean>(false);
  const [docSec, setDocSec] = useState<boolean>(false);
  const navigate = useNavigate();

  const taskListSrc: {
    color: string;
    title: string;
    type: AssignmentStatus;
  }[] = [
    {
      color: "var(--primary-color)",
      title: "Todo",
      type: OAssignmentStatus.Todo,
    },
    {
      color: "#FFA500",
      title: "On progress",
      type: OAssignmentStatus.OnProgress,
    },
    {
      color: "#8BC48A",
      title: "Done",
      type: OAssignmentStatus.Done,
    },
  ];

  const ProjectOptions = () => {
    return (
      <div className='project-option'>
        <Button
          type='text'
          className='project-option-btn'
          onClick={() => {
            setIsUpdateProject(false);
            setProjectUpdateModal(true);
          }}
        >
          <Page />
          <Typography.Text>Detail</Typography.Text>
        </Button>
        <Button
          type='text'
          className='project-option-btn'
          onClick={() => {
            setIsUpdateProject(true);
            setProjectUpdateModal(true);
          }}
        >
          <Pen />
          <Typography.Text>Edit</Typography.Text>
        </Button>
        <Popconfirm
          title='Delete this project ?'
          onConfirm={() => {
            deleteProject({ projectId: projectData?.project_id })
              .unwrap()
              .then(() => {
                navigate(-1);
              })
              .catch(() => message.error("failed to delete this project"));
          }}
        >
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
            <Typography.Title level={2}>{projectData?.name}</Typography.Title>
            <Popover content={ProjectOptions} trigger='click'>
              <Button type='text' size='small'>
                <MenuDots />
              </Button>
            </Popover>
            <Button
              shape='round'
              style={{ display: "" }}
              onClick={() => navigate(-1)}
            >
              <ArrowLeftOutlined />
              Back to Projects
            </Button>
          </div>
          <div className='second-part'>
            <Button
              type='primary'
              className='create-task-btn'
              onClick={() => {
                setCreateTaskModal(true);
              }}
            >
              <PlusOutlined />
              <Typography.Text style={{ color: "white" }}>
                Create Task
              </Typography.Text>
            </Button>
            <Avatar.Group maxCount={3}>
              {projectStaffs?.users.map((staff) => (
                <CustomAvatar size={32} userName={staff.name} />
              ))}
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
                  type={taskList.type}
                  project={projectData}
                  tasks={tasks?.data}
                />
              </List.Item>
            );
          }}
        />
      </div>

      <TaskDetail
        open={taskDetailModal}
        setShowTaskDetail={setTaskDetailModal}
        project={projectData}
      />
      <Modal open={docSec} onCancel={() => setDocSec(false)} footer={[]}>
        <DocumentSection />
      </Modal>
      <ModalUpdateProject
        project={projectData!}
        isModalOpen={projectUpdateModal}
        setIsModalOpen={setProjectUpdateModal}
        userDetail={{}}
        isUpdate={isUpdateProject}
      />
      <CreateTaskForm
        isModalOpen={createTaskModal}
        setIsModalOpen={setCreateTaskModal}
        project={projectData}
      />
    </>
  );
};
