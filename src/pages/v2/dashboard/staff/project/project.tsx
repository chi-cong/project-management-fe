import "./project.css";
import { MenuDots, Page, Folder, PieChart } from "src/assets/icons";
import { Typography, Button, Avatar, Popover, List, Modal } from "antd";
import {
  CustomAvatar,
  ProjectDocument,
  DocumentSection as TaskDocument,
} from "src/components/v2";
import { TaskList, TaskDetail, ProjectReport } from "src/layouts/v2";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { AssignmentStatus, OAssignmentStatus } from "src/share/models";
import {
  useGetProjectQuery,
  useGetProjectTasksQuery,
  useGetProjectStaffsQuery,
  useGetUserDetailQuery,
} from "src/share/services";
import { Activities } from "src/layouts/v2/task-detail/activities";
import { ModalDetailProject } from "src/components/modal-detail-project";
import { ProjectTeam } from "src/components/v2/project-team/project-team";
import { OutsideClickHandler } from "src/components";
import { ManagerProject as PmProject } from "src/pages/v2/dashboard/manager/project";

export const StaffProject = () => {
  const { id: projectId } = useParams();
  const [openMenu, setOpenMenu] = useState<boolean>(false);
  const [reportModal, setReportModal] = useState<boolean>(false);
  const [taskDetailModal, setTaskDetailModal] = useState<boolean>(false);
  const [projectTeam, setProjectTeam] = useState<boolean>(false);
  const [docSec, setDocSec] = useState<boolean>(false);
  const [taskDocSec, setTaskDocSec] = useState<boolean>(false);
  const [activitySec, setActivitySec] = useState<boolean>(false);
  const [projectDetailModal, setProjectDetailModal] = useState<boolean>(false);

  const { data: projectData } = useGetProjectQuery({
    projectId: projectId!,
  });
  const { data: tasks } = useGetProjectTasksQuery({
    items_per_page: "ALL",
    projectId,
    page: 1,
  });
  const { data: projectStaffs } = useGetProjectStaffsQuery({
    items_per_page: "ALL",
    projectId,
  });
  const { data: user } = useGetUserDetailQuery();

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
      <OutsideClickHandler onClickOutside={() => setOpenMenu(false)}>
        <div className='project-option'>
          <Button
            type='text'
            className='project-option-btn'
            onClick={() => {
              setProjectDetailModal(true);
              setOpenMenu(false);
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
              setOpenMenu(false);
            }}
          >
            <Folder />
            <Typography.Text>Documents</Typography.Text>
          </Button>
        </div>
      </OutsideClickHandler>
    );
  };

  return projectData?.project_manager_id === user?.user_id ? (
    <PmProject />
  ) : (
    <>
      <div className='staff-project-page'>
        <header className='header-row'>
          <div className='first-part'>
            <Typography.Title level={2}>{projectData?.name}</Typography.Title>
            <Popover
              content={ProjectOptions}
              open={openMenu}
              trigger={"click"}
              onOpenChange={() => setOpenMenu(true)}
            >
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
          </div>
          <div className='second-part'>
            <div
              className='avatar-group-wrapper'
              onClick={() => setProjectTeam(true)}
            >
              {projectStaffs?.users.length ? (
                <Avatar.Group maxCount={3}>
                  {projectStaffs?.users.map((staff) => (
                    <CustomAvatar
                      size={32}
                      userName={staff.name}
                      avatarSrc={staff.avatar}
                      bgColor={staff.avatar_color}
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
      <ModalDetailProject
        project={projectData!}
        isModalOpen={projectDetailModal}
        setIsModalOpen={setProjectDetailModal}
      />
      <Modal
        open={reportModal}
        onCancel={() => setReportModal(false)}
        footer={[]}
        title='Department Report'
        width={"90vw"}
      >
        <ProjectReport projectId={projectId} />
      </Modal>
      <ProjectTeam
        project={projectData}
        isModalOpen={projectTeam}
        setIsModalOpen={setProjectTeam}
      />
    </>
  );
};
