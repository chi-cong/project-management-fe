import React, { useState } from "react";
import {
  Avatar,
  Card,
  Col,
  message,
  Popconfirm,
  Progress,
  Row,
  Space,
} from "antd";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import "./card-project.css";
import {
  useDeleteProjectMutation,
  useGetProjectStaffsQuery,
  useGetUserDetailQuery,
} from "src/share/services";
import {
  ModalAddUserToProject,
  ModalUpdateProject,
  MngUpdateProject,
  AddProjectUserPanel,
} from "src/components/";
import { OUserRole, Project } from "src/share/models";
import { CustomAvatar } from "src/components/v2";
import { useRoleChecker } from "src/share/hooks";
import { shortenLongText, utcToLocal } from "src/share/utils";
import { Dayjs } from "dayjs";

type CardProject = {
  name?: string;
  description?: string;
  onClick?: () => void;
  role?: string;
  project?: Project;
};

export const CardProject: React.FC<CardProject> = ({
  name,
  description,
  onClick,
  role,
  project,
}) => {
  const checkRole = useRoleChecker();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalAddUserOpen, setIsModalAddUserOpen] = useState(false);
  const [deleteProject] = useDeleteProjectMutation();

  const { data: projectStaffs } = useGetProjectStaffsQuery({
    items_per_page: "ALL",
    projectId: project?.project_id,
  });

  const { data: user } = useGetUserDetailQuery();

  const calculateProgress = (): number => {
    if (project) {
      return Math.ceil(
        (parseInt(project.total_task!.total_task_is_done) /
          parseInt(project.total_task!.total_task_is_not_done)) *
          100
      );
    }
    return 0;
  };

  const progressColor = (percent: number) => {
    if (percent <= 33) {
      return "#f5222d";
    }
    if (33 < percent && percent <= 66) {
      return "#ffc008";
    }
    if (66 < percent && percent <= 99) {
      return "#14A2B8";
    }
    return "#28A745";
  };

  const progress: number = calculateProgress();

  const showModal = (event: React.MouseEvent<HTMLElement>) => {
    event.stopPropagation();
    setIsModalOpen(true);
  };

  const handleDeleteClick = async (event: React.MouseEvent<HTMLElement>) => {
    event.stopPropagation();
  };

  return (
    <>
      <div className='card-project-container' onClick={onClick}>
        <Card hoverable bordered={false} className='card-Project'>
          <div className='project-wrapper'>
            <Row className='project-header'>
              {/* title */}
              <Col span={12} className='project-header-info'>
                <h3 className='project-name'>{shortenLongText(30, name)}</h3>
              </Col>
              {/* action (delete, update) */}
              <Col span={12} className='project-header-action'>
                {role !== "MANAGER" ? (
                  <Space>
                    <div
                      onClick={showModal}
                      className='project-header-action-button'
                    >
                      <EditOutlined />
                    </div>
                    <div
                      className='project-header-action-button icon-delete-Project'
                      onClick={handleDeleteClick}
                    >
                      <Popconfirm
                        key={1}
                        title='Delete Project'
                        description='Are you sure to delete this Project?'
                        okText='Yes'
                        onConfirm={async () => {
                          await deleteProject({
                            projectId: project?.project_id,
                          })
                            .unwrap()
                            .then(() => {
                              message.success("Project is deleted");
                            })
                            .catch(() => {
                              message.error("Failed to delete project");
                            });
                        }}
                        cancelText='No'
                      >
                        <DeleteOutlined />
                      </Popconfirm>
                    </div>
                  </Space>
                ) : (
                  ""
                )}
              </Col>
            </Row>
            <div className='project-body'>
              {/* info */}
              <div className='project-body-info'>
                <span style={{ minHeight: "22px" }}>
                  {shortenLongText(40, description)}
                </span>
                {/* progress */}
                <div className='project-progress'>
                  <Progress
                    percent={progress}
                    status='active'
                    strokeColor={progressColor(progress)}
                  />
                </div>
              </div>
            </div>
            <div className='project-footer'>
              <div className='project-footer-info'>
                <span>
                  {project?.endAt &&
                    (utcToLocal(project.endAt) as Dayjs).fromNow()}
                </span>
              </div>
              <div className='project-footer-action'>
                <div
                  className='avatat-group-wrapper'
                  onClick={(event: React.MouseEvent<HTMLElement>) => {
                    event.stopPropagation();
                    setIsModalAddUserOpen(true);
                  }}
                >
                  {projectStaffs?.users?.length ? (
                    <Avatar.Group
                      maxCount={2}
                      maxPopoverTrigger='hover'
                      size='small'
                      maxStyle={{
                        color: "#f56a00",
                        backgroundColor: "#fde3cf",
                        width: "40px",
                        height: "40px",
                        cursor: "pointer",
                      }}
                    >
                      {projectStaffs?.users?.map((staff, index) => {
                        return (
                          <CustomAvatar
                            avatarSrc={staff.avatar}
                            size={40}
                            userName={staff.name}
                            bgColor={staff.avatar_color}
                            key={index}
                          />
                        );
                      })}
                    </Avatar.Group>
                  ) : (
                    <CustomAvatar size={40} userName='+' />
                  )}
                </div>
              </div>
            </div>
          </div>
        </Card>
      </div>
      {checkRole(OUserRole.Admin) || checkRole(OUserRole.SuperAdmin) ? (
        <ModalAddUserToProject
          isModalOpen={isModalAddUserOpen}
          setIsModalOpen={setIsModalAddUserOpen}
          project={project}
        />
      ) : (
        checkRole(OUserRole.Manager) && (
          <AddProjectUserPanel
            isModalOpen={isModalAddUserOpen}
            setIsModalOpen={setIsModalAddUserOpen}
            project={project}
          />
        )
      )}
      {checkRole(OUserRole.Admin) || checkRole(OUserRole.SuperAdmin) ? (
        <ModalUpdateProject
          isModalOpen={isModalOpen}
          setIsModalOpen={setIsModalOpen}
          project={project!}
          isUpdate={true}
        />
      ) : (
        <MngUpdateProject
          isModalOpen={isModalOpen}
          setIsModalOpen={setIsModalOpen}
          project={project!}
          isUpdate={true}
          isPm={user?.user_id === project?.project_manager_id}
        ></MngUpdateProject>
      )}
    </>
  );
};
