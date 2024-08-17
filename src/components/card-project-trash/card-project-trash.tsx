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
import {
  EditOutlined,
  DeleteOutlined,
  QuestionCircleOutlined,
  UndoOutlined,
} from "@ant-design/icons";
import "./card-project-trash.css";
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

type CardProjectTrash = {
  name?: string;
  description?: string;
  onClick?: () => void;
  role?: string;
  project?: Project;
};

export const CardProjectTrash: React.FC<CardProjectTrash> = ({
  name,
  description,
  onClick,
  role,
  project,
}) => {
  const checkRole = useRoleChecker();
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
  const handleRestoreClick = async (event: React.MouseEvent<HTMLElement>) => {
    event.stopPropagation();
  };
  const handleDeleteForeverClick = async (
    event: React.MouseEvent<HTMLElement>
  ) => {
    event.stopPropagation();
  };
  const RestoreProject = async () => {};
  const DeleteProjectForever = async () => {};
  return (
    <>
      {contextHolder}
      <div className="card-project-container">
        <Card hoverable bordered={false} className="card-Project">
          <div className="project-wrapper">
            <Row className="project-header">
              {/* title */}
              <Col span={12} className="project-header-info" onClick={onClick}>
                <h3 className="project-name">{name}</h3>
              </Col>
              {/* action (delete, update) */}
              <Col span={12} className="project-header-action">
                <Space>
                  <div
                    className="project-header-action-button icon-delete-project"
                    onClick={handleRestoreClick}
                  >
                    <Popconfirm
                      title="Are you sure to restore this Project?"
                      icon={<QuestionCircleOutlined style={{ color: "red" }} />}
                      onConfirm={RestoreProject}
                    >
                      <UndoOutlined />
                    </Popconfirm>
                  </div>
                  <div
                    className="project-header-action-button icon-delete-project"
                    onClick={handleDeleteForeverClick}
                  >
                    <Popconfirm
                      title="Are you sure to delete this Project forever?"
                      icon={<QuestionCircleOutlined style={{ color: "red" }} />}
                      onConfirm={DeleteProjectForever}
                    >
                      <DeleteOutlined />
                    </Popconfirm>
                  </div>
                </Space>
              </Col>
            </Row>
            <div className="project-body" onClick={onClick}>
              {/* info */}
              <div className="project-body-info">
                <span>{description}</span>
                {/* progress */}
                <div className="project-progress">
                  <Progress
                    percent={progress}
                    status="active"
                    strokeColor={progressColor(progress)}
                  />
                </div>
              </div>
            </div>
            <div className="project-footer">
              <div className="project-footer-info">
                <span>{(project?.endAt as string).substring(0, 10)}</span>
              </div>
              <div className="project-footer-action">
                <div className="avatat-group-wrapper">
                  {projectStaffs?.users.length ? (
                    <Avatar.Group
                      maxCount={2}
                      maxPopoverTrigger="hover"
                      size="small"
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
                    <CustomAvatar size={40} userName="+" />
                  )}
                </div>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </>
  );
};
