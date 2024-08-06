import React, { useState } from "react";
import { Avatar, Card, Col, Popconfirm, Row, Space, Tooltip } from "antd";
import {
  EditOutlined,
  DeleteOutlined,
  QuestionCircleOutlined,
} from "@ant-design/icons";
import "./card-department.css";
import { useDeleteDepartmentsMutation } from "src/share/services";
import ModalUpdatePost from "../modal-update-project";
import ModalAddUserToProject from "../modal-add-user-to-project";
import { CustomAvatar } from "../v2";
import {
  AntDesignOutlined,
  UserOutlined,
  PlusOutlined,
} from "@ant-design/icons";
import ModalUpdateDepartment from "../modal-update-department";
type CardDepartmentProps = {
  name?: string;
  description?: string;
  manager?: string;
  onClick?: () => void;
  departmentId?: string;
  staffCount?: number;
  role?: string;
};

export const CardDepartment: React.FC<CardDepartmentProps> = ({
  name,
  description,
  onClick,
  departmentId,
  role,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalAddUserOpen, setIsModalAddUserOpen] = useState(false);
  const showModalAddUser = () => {
    setIsModalAddUserOpen(true);
  };
  const showModal = (e: React.MouseEvent<HTMLElement>) => {
    e.stopPropagation();
    setIsModalOpen(true);
  };

  const [deleteDepartment] = useDeleteDepartmentsMutation();

  const handleDeleteClick = async (event: React.MouseEvent<HTMLElement>) => {
    event.stopPropagation();
  };

  const deleteDepartmentHandler = async () => {
    try {
      await deleteDepartment({ departmentId: departmentId! }).unwrap();
    } catch (error) {
      console.error("Failed to delete department:", error);
    }
  };

  return (
    <div className="card-department-container">
      <Card hoverable bordered={false} onClick={onClick}>
        <div className="department-wrapper">
          <Row className="department-header">
            {/* title */}
            <Col span={12} className="department-header-info">
              <h2 className="department-name">{name}</h2>
            </Col>
            {/* action (delete, update) */}
            <Col span={12} className="department-header-action">
              {role !== "MANAGER" && (
                <Space>
                  <div
                    onClick={showModal}
                    className="department-header-action-button"
                  >
                    <EditOutlined />
                  </div>
                  <div
                    className="department-header-action-button icon-delete-Project"
                    onClick={handleDeleteClick}
                  >
                    <Popconfirm
                      title="Are you sure to delete this department?"
                      icon={<QuestionCircleOutlined style={{ color: "red" }} />}
                      onConfirm={deleteDepartmentHandler}
                    >
                      <DeleteOutlined />
                    </Popconfirm>
                  </div>
                </Space>
              )}
            </Col>
          </Row>
          <div className="department-body">
            <div className="department-manager-info">
              <span>{description}</span>
            </div>

            {/* info */}
            <Row className="department-body-info">
              <Col span={18}>
                <Card className="department-body-manager-card">
                  <div className="department-body-manager-info-wrapper">
                    <div style={{ display: "flex", alignItems: "center" }}>
                      <CustomAvatar size={40} userName={name} />
                    </div>
                    <div className="department-manager-main-info">
                      <h3 style={{ textWrap: "nowrap" }}>{name}</h3>
                      <span className="department-body-manager-role">
                        Manger
                      </span>
                    </div>
                  </div>
                </Card>
              </Col>
              {/* avatar group */}
              <Col>
                <Avatar.Group
                  maxCount={2}
                  maxPopoverTrigger="click"
                  size={40}
                  maxStyle={{
                    color: "#f56a00",
                    backgroundColor: "#fde3cf",
                    cursor: "pointer",
                  }}
                >
                  <Avatar
                    src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
                    gap={1}
                  />
                  <Avatar style={{ backgroundColor: "#f56a00" }} gap={1}>
                    K
                  </Avatar>
                  <Tooltip placement="bottom">
                    <Avatar
                      size="large"
                      style={{ backgroundColor: "#87d068" }}
                      icon={<UserOutlined />}
                    />
                    <Avatar
                      onClick={() => {
                        showModalAddUser();
                      }}
                      size="large"
                      style={{ backgroundColor: "#87d068", cursor: "pointer" }}
                      icon={<PlusOutlined />}
                    />
                  </Tooltip>
                </Avatar.Group>
              </Col>
              {/* progress */}
            </Row>
          </div>
          <ModalAddUserToProject
            isModalOpen={isModalAddUserOpen}
            setIsModalOpen={setIsModalAddUserOpen}
          />
          <ModalUpdateDepartment
            isModalOpen={isModalOpen}
            setIsModalOpen={setIsModalOpen}
          />
        </div>
      </Card>
    </div>
  );
};
