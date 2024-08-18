import React from "react";
import { Avatar, Card, Col, message, Popconfirm, Row, Space } from "antd";
import {
  DeleteOutlined,
  QuestionCircleOutlined,
  UndoOutlined,
} from "@ant-design/icons";
import "./card-project-trash.css";
import {
  useRestoreProjectMutation,
  useDeleteProjectPermanentlyMutation,
  useGetProjectStaffsQuery,
} from "src/share/services";

import { Project } from "src/share/models";
import { CustomAvatar } from "src/components/v2";
import { shortenLongText } from "src/share/utils";

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
  project,
}) => {
  const [restore] = useRestoreProjectMutation();
  const [deletePermanently] = useDeleteProjectPermanentlyMutation();

  const { data: projectStaffs } = useGetProjectStaffsQuery({
    items_per_page: "ALL",
    projectId: project?.project_id,
  });

  const handleRestoreClick = async (event: React.MouseEvent<HTMLElement>) => {
    event.stopPropagation();
  };
  const handleDeleteForeverClick = async (
    event: React.MouseEvent<HTMLElement>
  ) => {
    event.stopPropagation();
  };
  const RestoreProject = async () => {
    await restore({
      projectId: project?.project_id,
    })
      .unwrap()
      .then(() => {
        message.success("Project is restored");
      })
      .catch(() => {
        message.error("Failed to restore project");
      });
  };
  const DeleteProjectForever = async () => {
    await deletePermanently({
      projectId: project?.project_id,
    })
      .unwrap()
      .then(() => {
        message.success("Project's deleted permanently");
      })
      .catch(() => {
        message.error("Failed to delete project");
      });
  };
  return (
    <>
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
                <Space>
                  <div
                    className='project-header-action-button icon-delete-project'
                    onClick={handleRestoreClick}
                  >
                    <Popconfirm
                      title='Are you sure to restore this Project?'
                      icon={<QuestionCircleOutlined style={{ color: "red" }} />}
                      onConfirm={RestoreProject}
                    >
                      <UndoOutlined />
                    </Popconfirm>
                  </div>
                  <div
                    className='project-header-action-button icon-delete-project'
                    onClick={handleDeleteForeverClick}
                  >
                    <Popconfirm
                      title='Are you sure to delete this Project forever?'
                      icon={<QuestionCircleOutlined style={{ color: "red" }} />}
                      onConfirm={DeleteProjectForever}
                    >
                      <DeleteOutlined />
                    </Popconfirm>
                  </div>
                </Space>
              </Col>
            </Row>
            <div className='project-body' onClick={onClick}>
              {/* info */}
              <div className='project-body-info'>
                <span>{shortenLongText(80, description)}</span>
              </div>
            </div>
            <div className='project-footer'>
              <div className='project-footer-info'>
                <span>{(project?.endAt as string).substring(0, 10)}</span>
              </div>
              <div className='project-footer-action'>
                <div className='avatat-group-wrapper'>
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
          </div>
        </Card>
      </div>
    </>
  );
};
