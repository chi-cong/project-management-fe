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
import { RoleResponse, User } from "src/share/models";
type CardAccount = {
  account: User;
  manager?: string;
  onClick?: () => void;
  userId?: string;
  staffCount?: number;
};

export const CardAccount: React.FC<CardAccount> = ({
  account,
  onClick,
  userId,
}) => {
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
    <div className='card-account-container'>
      <Card
        hoverable
        bordered={false}
        className='card-account'
        onClick={onClick}
      >
        <div className='account-wrapper'>
          <Row className='account-header'>
            <Col span={12} className='account-header-info'>
              <h3>{account.username}</h3>
              <div className='account-role'>Admin</div>
            </Col>
            <Col span={12} className='account-header-action'>
              {(account.role as RoleResponse).name !== "MANAGER" ? (
                <Space>
                  <div
                    onClick={showModal}
                    className='account-header-action-button'
                  >
                    <EditOutlined />
                  </div>
                  <div
                    className='account-header-action-button icon-delete-account'
                    onClick={handleDeleteClick}
                  >
                    <Popconfirm
                      title='Are you sure to delete this account?'
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
          <Row className='account-body'>
            <Col span={12} className='account-body-info'>
              <div className=''>
                <span>{account.name}</span>
              </div>
              <div>
                <span>
                  <strong>Email:</strong> {account.email}
                </span>
              </div>
              <div>
                <span>
                  <strong>Contact:</strong> {account.phone}
                </span>
              </div>
              <div>
                <span>
                  <strong>Department:</strong> It department
                </span>
              </div>
            </Col>
            <Col span={12} className='account-body-avatar'>
              <CustomAvatar size={100} userName='Dat' />
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
