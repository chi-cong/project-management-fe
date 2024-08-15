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
} from "src/share/services";
import {
  ModalAddUserToProject,
  ModalUpdateProject,
  AddProjectUserPanel,
} from "src/components/";
import { OUserRole, Project } from "src/share/models";
import { CustomAvatar } from "src/components/v2";
import { useRoleChecker } from "src/share/hooks";

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
  const [messageApi, contextHolder] = message.useMessage();

  const { data: projectStaffs } = useGetProjectStaffsQuery({
    items_per_page: "ALL",
    projectId: project?.project_id,
  });

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

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleDeleteClick = async (event: React.MouseEvent<HTMLElement>) => {
    event.stopPropagation();
  };

  return (
    <>
      {contextHolder}
      <div className='card-project-container'>
        <Card hoverable bordered={false} className='card-Project'>
          <div className='project-wrapper'>
            <Row className='project-header'>
              {/* title */}
              <Col span={12} className='project-header-info' onClick={onClick}>
                <h3 className='project-name'>{name}</h3>
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
                              messageApi.success("Project is deleted");
                              // setOpenProjectTab(false);
                            })
                            .catch(() => {
                              messageApi.error("Failed to delete project");
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
            <div className='project-body' onClick={onClick}>
              {/* info */}
              <div className='project-body-info'>
                <span>{description}</span>
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
                <span>{(project?.endAt as string).substring(0, 10)}</span>
              </div>
              <div className='project-footer-action'>
                <div
                  className='avatat-group-wrapper'
                  onClick={() => setIsModalAddUserOpen(true)}
                >
                  {projectStaffs?.users.length ? (
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
                      {projectStaffs?.users.map((staff, index) => {
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
            {checkRole(OUserRole.Admin) ? (
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
            <ModalUpdateProject
              isModalOpen={isModalOpen}
              setIsModalOpen={setIsModalOpen}
              project={project!}
              isUpdate={true}
            ></ModalUpdateProject>
          </div>
        </Card>
      </div>
    </>
  );
};
