import { Card, Col, message, Popconfirm, Row, Space } from "antd";
import {
  UndoOutlined,
  DeleteOutlined,
  QuestionCircleOutlined,
} from "@ant-design/icons";
import "./card-account-trash.css";
import {
  useRestoreUserMutation,
  useDeleteUserPermanentlyMutation,
} from "src/share/services";
import { CustomAvatar } from "src/components/v2";
import { OUserRole, RoleResponse, User } from "src/share/models";
import { useRoleChecker } from "src/share/hooks";

type CardAccountTrash = {
  account: User;
  manager?: string;
  onClick?: () => void;
  userId?: string;
  staffCount?: number;
};

export const CardAccountTrash: React.FC<CardAccountTrash> = ({
  account,
  onClick,
  userId,
}) => {
  const checkRole = useRoleChecker();
  const [restoreUser] = useRestoreUserMutation();
  const [deletePermanently] = useDeleteUserPermanentlyMutation();

  const handleRestoreClick = async (event: React.MouseEvent<HTMLElement>) => {
    event.stopPropagation();
  };
  const handleDeleteForeverClick = async (
    event: React.MouseEvent<HTMLElement>
  ) => {
    event.stopPropagation();
  };
  const RestoreAccount = async () => {
    await restoreUser({ userId })
      .unwrap()
      .then(() => message.success("Restored account"))
      .catch(() => message.error("Failed to restore account"));
  };
  const DeleteAccountForever = async () => {
    await deletePermanently({ userId })
      .unwrap()
      .then(() => message.success("Account's permanently deleted"))
      .catch(() => message.error("Failed to delete account"));
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
              <div className='account-role'>
                {(account?.role as RoleResponse).name}
              </div>
            </Col>
            <Col span={12} className='account-header-action'>
              {(account.role as RoleResponse).name !== OUserRole.Admin ||
              checkRole("SUPER_ADMIN") ? (
                <Space>
                  <div
                    className='account-header-action-button icon-delete-account'
                    onClick={handleRestoreClick}
                  >
                    <Popconfirm
                      title='Are you sure to restore this account?'
                      icon={<QuestionCircleOutlined style={{ color: "red" }} />}
                      onConfirm={RestoreAccount}
                    >
                      <UndoOutlined />
                    </Popconfirm>
                  </div>
                  <div
                    className='account-header-action-button icon-delete-account'
                    onClick={handleDeleteForeverClick}
                  >
                    <Popconfirm
                      title='Are you sure to delete this account permanently?'
                      icon={<QuestionCircleOutlined style={{ color: "red" }} />}
                      onConfirm={DeleteAccountForever}
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
            </Col>
            <Col span={12} className='account-body-avatar'>
              <CustomAvatar
                size={100}
                userName={account.name}
                bgColor={account.avatar_color}
              />
            </Col>
          </Row>
        </div>
      </Card>
    </div>
  );
};
