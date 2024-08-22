import React, { useState } from "react";
import { Card, Col, Popconfirm, Row, Space } from "antd";
import {
  EditOutlined,
  DeleteOutlined,
  QuestionCircleOutlined,
} from "@ant-design/icons";
import "./card-account.css";
import { useDeleteUserMutation } from "src/share/services";
import { CustomAvatar } from "src/components/v2";
import UpdateUserModal from "src/components/modal-update-user";
import { OUserRole, RoleResponse, User } from "src/share/models";
type CardAccount = {
  account: User;
  manager?: string;
  onClick?: () => void;
  userId?: string;
  staffCount?: number;
};

import { useRoleChecker } from "src/share/hooks";

export const CardAccount: React.FC<CardAccount> = ({
  account,
  onClick,
  userId,
}) => {
  const checkRole = useRoleChecker();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const [deleteUser] = useDeleteUserMutation();

  const handleDeleteClick = async (event: React.MouseEvent<HTMLElement>) => {
    event.stopPropagation();
  };
  const deleteAccount = async () => {
    await deleteUser({ userId }).unwrap().then().catch();
  };

  return (
    <div className="card-account-container">
      <Card
        hoverable
        bordered={false}
        className="card-account"
        onClick={onClick}
      >
        <div className="account-wrapper">
          <Row className="account-header">
            <Col className="account-header-info">
              <h3> {account.username}</h3>
              <div className="account-role">
                {(account?.role as RoleResponse).name === OUserRole.SuperAdmin
                  ? "ADMIN"
                  : (account?.role as RoleResponse).name}
              </div>
            </Col>
            <Col className="account-header-action">
              {checkRole(OUserRole.SuperAdmin) ||
              ((account.role as RoleResponse).name !== OUserRole.Admin &&
                (account.role as RoleResponse).name !==
                  OUserRole.SuperAdmin) ? (
                <Space>
                  <div
                    onClick={showModal}
                    className="account-header-action-button"
                  >
                    <EditOutlined />
                  </div>
                  <div
                    className="account-header-action-button icon-delete-account"
                    onClick={handleDeleteClick}
                  >
                    <Popconfirm
                      title="Are you sure to delete this account?"
                      icon={<QuestionCircleOutlined style={{ color: "red" }} />}
                      onConfirm={deleteAccount}
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
          <Row className="account-body">
            <Col span={12} className="account-body-info">
              <div className="account-card-info">
                <span>{account.name}</span>
              </div>
              <div className="account-card-info">
                <span>{account.email}</span>
              </div>
              <div className="account-card-info">
                <span>{account.phone}</span>
              </div>
              <div className="account-card-info-department">
                <div style={{ display: "flex" }}>
                  <div
                    style={{
                      fontWeight: "bolder",
                      color: "var(--primary-color)",
                      marginRight: "5px",
                    }}
                  >
                    Department
                  </div>
                  {account.department_info?.name ?? "Chưa có phòng ban"}
                </div>
              </div>
            </Col>
            <Col span={12} className="account-body-avatar">
              <CustomAvatar
                size={100}
                userName={account.name}
                avatarSrc={account.avatar}
                bgColor={account.avatar_color}
                className="account-card-avatar"
              />
            </Col>
          </Row>
          <UpdateUserModal
            isModalOpen={isModalOpen}
            setIsModalOpen={setIsModalOpen}
            user={account}
          />
        </div>
      </Card>
    </div>
  );
};
