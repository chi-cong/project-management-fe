import "./project.css";
import { MenuDots, Pen, Trash, Page, Folder, PieChart } from "src/assets/icons";
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
import {
  CustomAvatar,
  ProjectDocument,
  DocumentSection as TaskDocument,
} from "src/components/v2";
import {
  TaskList,
  TaskDetail,
  CreateTaskForm,
  ProjectReport,
} from "src/layouts/v2";
import { useState } from "react";
import { ArrowLeftOutlined } from "@ant-design/icons";
import { useNavigate, useParams } from "react-router-dom";
import { AssignmentStatus, OAssignmentStatus } from "src/share/models";
import {
  useGetProjectQuery,
  useGetProjectTasksQuery,
  useDeleteProjectMutation,
  useGetProjectStaffsQuery,
} from "src/share/services";
import { ModalUpdateProject, ModalAddUserToProject } from "src/components";
import { Activities } from "src/layouts/v2/task-detail/activities";
export const AdminProject = () => {
  const { id: projectId } = useParams();

  const [reportModal, setReportModal] = useState<boolean>(false);
  const [taskDetailModal, setTaskDetailModal] = useState<boolean>(false);
  const [createTaskModal, setCreateTaskModal] = useState<boolean>(false);
  const [projectUpdateModal, setProjectUpdateModal] = useState<boolean>(false);
  const [isUpdateProject, setIsUpdateProject] = useState<boolean>(false);
  const [addUserModal, setAddUserModal] = useState<boolean>(false);
  const [docSec, setDocSec] = useState<boolean>(false);
  const [taskDocSec, setTaskDocSec] = useState<boolean>(false);
  const [activitySec, setActivitySec] = useState<boolean>(false);
  const navigate = useNavigate();

  const { data: projectData } = useGetProjectQuery({
    projectId: projectId!,
  });
  const { data: tasks } = useGetProjectTasksQuery({
    items_per_page: "ALL",
    projectId,
    page: 1,
  });
  const [deleteProject] = useDeleteProjectMutation();
  const { data: projectStaffs } = useGetProjectStaffsQuery({
    items_per_page: "ALL",
    projectId,
  });

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
            setDocSec(true);
          }}
        >
          <Folder />
          <Typography.Text>Documents</Typography.Text>
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
            <h2>{projectData?.name}</h2>
            <Popover content={ProjectOptions}>
              <Button type='text' size='small'>
                <MenuDots />
              </Button>
            </Popover>
            <Button
              type='default'
              className='title-row-btn'
              shape='round'
              onClick={() => setReportModal(true)}
            >
              <PieChart />
              Reports
            </Button>
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
            <div
              className='avatar-group-wrapper'
              onClick={() => setAddUserModal(true)}
            >
              {projectStaffs?.users.length ? (
                <Avatar.Group maxCount={3}>
                  {projectStaffs?.users.map((staff, index) => (
                    <CustomAvatar
                      size={32}
                      userName={staff.name}
                      avatarSrc={staff.avatar}
                      bgColor={staff.avatar_color}
                      key={index}
                    />
                  ))}
                </Avatar.Group>
              ) : (
                <CustomAvatar size={32} userName='+' />
              )}
            </div>
          </div>
        </header>
        <List
          grid={{
            gutter: [16, 16],
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
                  showDocSec={setTaskDocSec}
                  showActies={setActivitySec}
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
        <ProjectDocument project={projectData} />
      </Modal>
      <Modal
        open={taskDocSec}
        onCancel={() => setTaskDocSec(false)}
        footer={[]}
      >
        <TaskDocument />
      </Modal>
      <Modal
        open={activitySec}
        onCancel={() => setActivitySec(false)}
        footer={[]}
      >
        <Activities />
      </Modal>
      <ModalUpdateProject
        project={projectData!}
        isModalOpen={projectUpdateModal}
        setIsModalOpen={setProjectUpdateModal}
        isUpdate={isUpdateProject}
      />
      <CreateTaskForm
        isModalOpen={createTaskModal}
        setIsModalOpen={setCreateTaskModal}
        project={projectData}
      />
      <Modal
        open={reportModal}
        onCancel={() => setReportModal(false)}
        footer={[]}
        title='Project Report'
        width={"80%"}
      >
        <ProjectReport projectId={projectId} />
      </Modal>
      <ModalAddUserToProject
        isModalOpen={addUserModal}
        setIsModalOpen={setAddUserModal}
        project={projectData}
      />
    </>
  );
};
