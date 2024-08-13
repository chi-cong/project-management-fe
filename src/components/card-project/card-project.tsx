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
  // Tooltip,
} from "antd";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import "./card-project.css";
import {
  useDeleteProjectMutation,
  useGetProjectStaffsQuery,
} from "src/share/services";
// import { UserOutlined, PlusOutlined } from "@ant-design/icons";
import ModalAddUserToProject from "../modal-add-user-to-project";
import { ModalUpdateProject } from "src/components/modal-update-project";
import { Project } from "src/share/models";
import { CustomAvatar } from "../v2";

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
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalAddUserOpen, setIsModalAddUserOpen] = useState(false);
  const [deleteProject] = useDeleteProjectMutation();
  const [messageApi, contextHolder] = message.useMessage();

  const { data: projectStaffs } = useGetProjectStaffsQuery({
    items_per_page: "ALL",
    projectId: project?.project_id,
  });

  // const showModalAddUser = () => {
  //   setIsModalAddUserOpen(true);
  // };

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleDeleteClick = async (event: React.MouseEvent<HTMLElement>) => {
    event.stopPropagation();
  };

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
                {role !== "MANAGER" ? (
                  <Space>
                    <div
                      onClick={showModal}
                      className="project-header-action-button"
                    >
                      <EditOutlined />
                    </div>
                    <div
                      className="project-header-action-button icon-delete-Project"
                      onClick={handleDeleteClick}
                    >
                      <Popconfirm
                        key={1}
                        title="Delete Project"
                        description="Are you sure to delete this Project?"
                        okText="Yes"
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
                        cancelText="No"
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
            <div className="project-body" onClick={onClick}>
              {/* info */}
              <div className="project-body-info">
                <span>{description}</span>
                {/* progress */}
                <div className="project-progress">
                  <Progress percent={50} status="active" />
                </div>
              </div>
            </div>
            <div className="project-footer">
              <div className="project-footer-info">
                <span>{(project?.endAt as string).substring(0, 10)}</span>
              </div>
              <div className="project-footer-action">
                <Avatar.Group
                  maxCount={2}
                  maxPopoverTrigger="click"
                  size="small"
                  maxStyle={{
                    color: "#f56a00",
                    backgroundColor: "#fde3cf",
                    cursor: "pointer",
                  }}
                >
                  {projectStaffs?.users.map((staff) => {
                    return (
                      <CustomAvatar
                        avatarSrc={staff.avatar}
                        size={40}
                        userName={staff.name}
                      />
                    );
                  })}
                  {/* <Tooltip placement='bottom' autoAdjustOverflow>
                    <Avatar
                      size='large'
                      style={{ backgroundColor: "#87d068" }}
                      icon={<UserOutlined />}
                    />
                    <Avatar
                      onClick={() => {
                        showModalAddUser();
                      }}
                      size='large'
                      style={{ backgroundColor: "#87d068", cursor: "pointer" }}
                      icon={<PlusOutlined />}
                    />
                  </Tooltip> */}
                </Avatar.Group>
              </div>
            </div>
            <ModalAddUserToProject
              isModalOpen={isModalAddUserOpen}
              setIsModalOpen={setIsModalAddUserOpen}
            ></ModalAddUserToProject>
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
