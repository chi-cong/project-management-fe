import React from "react";
import { Card, Col, message, Popconfirm, Row, Space, Typography } from "antd";
import {
  DeleteOutlined,
  QuestionCircleOutlined,
  UndoOutlined,
} from "@ant-design/icons";
import "./card-department-trash.css";
import {
  useRestoreDepartmentMutation,
  useDeleteDepartmentPermanentlyMutation,
} from "src/share/services";
import { CustomAvatar } from "src/components/v2";
import { Department } from "src/share/models";
type CardDepartmentTrashProps = {
  department: Department;
  manager?: string;
  onClick?: () => void;
  departmentId?: string;
  staffCount?: number;
  role?: string;
};

export const CardDepartmentTrash: React.FC<CardDepartmentTrashProps> = ({
  department,
  onClick,
}) => {
  const [restoreDepartment] = useRestoreDepartmentMutation();
  const [deletePermanently] = useDeleteDepartmentPermanentlyMutation();

  const handleRestoreClick = async (event: React.MouseEvent<HTMLElement>) => {
    event.stopPropagation();
  };
  const handleDeleteForeverClick = async (
    event: React.MouseEvent<HTMLElement>
  ) => {
    event.stopPropagation();
  };
  const RestoreDepartment = async () => {
    try {
      await restoreDepartment({
        departmentId: department.department_id,
      }).unwrap();
      await message.success("Restored department");
    } catch (error) {
      message.error("Failed to restore department");
    }
  };
  const DeleteDepartmentForever = async () => {
    try {
      await deletePermanently({
        departmentId: department.department_id,
      }).unwrap();
      await message.success("Delete department permanently");
    } catch (error) {
      message.error("Failed to delete department");
    }
  };

  return (
    <div className='card-department-container'>
      <Card hoverable bordered={false}>
        <div className='department-wrapper'>
          <Row className='department-header'>
            {/* title */}
            <Col span={12} className='department-header-info'>
              <h2 className='department-name' onClick={onClick}>
                {department.name}
              </h2>
            </Col>
            {/* action (delete, update) */}
            <Col span={12} className='department-header-action'>
              <Space>
                <div
                  className='department-header-action-button icon-delete-department'
                  onClick={handleRestoreClick}
                >
                  <Popconfirm
                    title='Are you sure to restore this Department?'
                    icon={<QuestionCircleOutlined style={{ color: "red" }} />}
                    onConfirm={RestoreDepartment}
                  >
                    <UndoOutlined />
                  </Popconfirm>
                </div>
                <div
                  className='department-header-action-button icon-delete-department'
                  onClick={handleDeleteForeverClick}
                >
                  <Popconfirm
                    title='Are you sure to delete this department permanently?'
                    icon={<QuestionCircleOutlined style={{ color: "red" }} />}
                    onConfirm={DeleteDepartmentForever}
                  >
                    <DeleteOutlined />
                  </Popconfirm>
                </div>
              </Space>
            </Col>
          </Row>
          <div className='department-body'>
            <div className='department-manager-info' onClick={onClick}>
              <span>{department.name}</span>
            </div>
            {/* info */}
            <Row className='department-body-info'>
              <Col sm={24} xs={24} xxl={18}>
                <Card className='department-body-manager-card'>
                  <div className='department-body-manager-info-wrapper'>
                    {department.information?.manager?.user_id ? (
                      <>
                        <div style={{ display: "flex", alignItems: "center" }}>
                          <CustomAvatar
                            size={40}
                            userName={department.information?.manager?.name}
                            avatarSrc={department.information?.manager?.avatar}
                            bgColor={
                              department.information?.manager?.avatar_color
                            }
                          />
                        </div>
                        <div className='department-manager-main-info'>
                          <h3 style={{ textWrap: "nowrap" }}>
                            {department.information?.manager?.name}
                          </h3>
                          <span className='department-body-manager-role'>
                            Manger
                          </span>
                        </div>
                      </>
                    ) : (
                      <Typography.Text>No Manager</Typography.Text>
                    )}
                  </div>
                </Card>
              </Col>
              {/* avatar group */}
              {/* progress */}
            </Row>
          </div>
        </div>
      </Card>
    </div>
  );
};
