import React, { useState } from "react";
import {
  Avatar,
  Card,
  Col,
  Popconfirm,
  Progress,
  Row,
  Space,
  Tooltip,
} from "antd";
import {
  EditOutlined,
  DeleteOutlined,
  QuestionCircleOutlined,
} from "@ant-design/icons";
import "./card-project.css";
import { useDeleteDepartmentsMutation } from "src/share/services";
import { UserOutlined, PlusOutlined } from "@ant-design/icons";
import ModalAddUserToProject from "../modal-add-user-to-project";
import ModalUpdatePost from "../modal-update-project";
type CardProject = {
  name?: string;
  description?: string;
  manager?: string;
  onClick?: () => void;
  departmentId?: string;
  staffCount?: number;
  role?: string;
};

export const CardProject: React.FC<CardProject> = ({
  name,
  description,
  manager,
  onClick,
  departmentId,
  staffCount,
  role,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalAddUserOpen, setIsModalAddUserOpen] = useState(false);

  const showModalAddUser = () => {
    setIsModalAddUserOpen(true);
  };

  const showModal = () => {
    setIsModalOpen(true);
  };

  const [deleteDepartment] = useDeleteDepartmentsMutation();

  const handleDeleteClick = async (event: React.MouseEvent<HTMLElement>) => {
    event.stopPropagation();
  };
  const deleteDapartment = async () => {
    await deleteDepartment({ departmentId }).unwrap().then().catch();
  };

  return (
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
                      title='Are you sure to delete this Project?'
                      icon={<QuestionCircleOutlined style={{ color: "red" }} />}
                      onConfirm={deleteDapartment}
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
                <Progress percent={50} status='active' />
              </div>
            </div>
          </div>
          <div className='project-footer'>
            <div className='project-footer-info'>
              <span>Start: Nov 2, 2022</span>
            </div>
            <div className='project-footer-action'>
              <Avatar.Group
                maxCount={2}
                maxPopoverTrigger='click'
                size='small'
                maxStyle={{
                  color: "#f56a00",
                  backgroundColor: "#fde3cf",
                  cursor: "pointer",
                }}
              >
                <Avatar src='https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png' />
                <Avatar style={{ backgroundColor: "#f56a00" }}>K</Avatar>
                <Tooltip placement='bottom' autoAdjustOverflow>
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
                </Tooltip>
              </Avatar.Group>
            </div>
          </div>
          <ModalAddUserToProject
            isModalOpen={isModalAddUserOpen}
            setIsModalOpen={setIsModalAddUserOpen}
          ></ModalAddUserToProject>
          <ModalUpdatePost
            isModalOpen={isModalOpen}
            setIsModalOpen={setIsModalOpen}
          ></ModalUpdatePost>
        </div>
      </Card>
    </div>
  );
};
