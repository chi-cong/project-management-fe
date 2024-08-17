import React, { useState } from "react";
import {
  Avatar,
  Card,
  Col,
  Divider,
  message,
  Popconfirm,
  Popover,
  Row,
  Space,
} from "antd";
import {
  EditOutlined,
  DeleteOutlined,
  QuestionCircleOutlined,
  UndoOutlined,
} from "@ant-design/icons";
import "./card-department-trash.css";
import {
  useDeleteDepartmentsMutation,
  useGetDepartmentStaffsQuery,
} from "src/share/services";
import { ModalAddUserToProject } from "src/components/";
import { CustomAvatar } from "src/components/v2";
import { UserOutlined, PlusOutlined } from "@ant-design/icons";
import { ModalUpdateDepartment } from "src/components/";
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
  const { data: departmentStaffs } = useGetDepartmentStaffsQuery({
    itemsPerPage: "ALL",
    departmentId: department.department_id,
  });

  const handleRestoreClick = async (event: React.MouseEvent<HTMLElement>) => {
    event.stopPropagation();
  };
  const handleDeleteForeverClick = async (
    event: React.MouseEvent<HTMLElement>
  ) => {
    event.stopPropagation();
  };
  const RestoreDepartment = async () => {};
  const DeleteDepartmentForever = async () => {};

  return (
    <div className="card-department-container">
      <Card hoverable bordered={false}>
        <div className="department-wrapper">
          <Row className="department-header">
            {/* title */}
            <Col span={12} className="department-header-info">
              <h2 className="department-name" onClick={onClick}>
                {department.name}
              </h2>
            </Col>
            {/* action (delete, update) */}
            <Col span={12} className="department-header-action">
              <Space>
                <div
                  className="department-header-action-button icon-delete-department"
                  onClick={handleRestoreClick}
                >
                  <Popconfirm
                    title="Are you sure to restore this Department?"
                    icon={<QuestionCircleOutlined style={{ color: "red" }} />}
                    onConfirm={RestoreDepartment}
                  >
                    <UndoOutlined />
                  </Popconfirm>
                </div>
                <div
                  className="department-header-action-button icon-delete-department"
                  onClick={handleDeleteForeverClick}
                >
                  <Popconfirm
                    title="Are you sure to delete this Department forever?"
                    icon={<QuestionCircleOutlined style={{ color: "red" }} />}
                    onConfirm={DeleteDepartmentForever}
                  >
                    <DeleteOutlined />
                  </Popconfirm>
                </div>
              </Space>
            </Col>
          </Row>
          <div className="department-body">
            <div className="department-manager-info" onClick={onClick}>
              <span>{department.name}</span>
            </div>
            {/* info */}
            <Row className="department-body-info">
              <Col sm={24} xs={24} xxl={18}>
                <Card className="department-body-manager-card">
                  <div className="department-body-manager-info-wrapper">
                    <div style={{ display: "flex", alignItems: "center" }}>
                      <CustomAvatar
                        size={40}
                        userName={department.information?.manager?.name}
                        avatarSrc={department.information?.manager?.avatar}
                        bgColor={department.information?.manager?.avatar_color}
                      />
                    </div>
                    <div className="department-manager-main-info">
                      <h3 style={{ textWrap: "nowrap" }}>
                        {department.information?.manager?.name}
                      </h3>
                      <span className="department-body-manager-role">
                        Manger
                      </span>
                    </div>
                  </div>
                </Card>
              </Col>
              {/* avatar group */}
              <Col>
                <Popover
                  placement="bottom"
                  trigger="hover"
                  // content={
                  //   <Space direction="vertical" style={{ display: "flex" }}>
                  //     <div>
                  //       <Space direction="vertical">
                  //         <h2>Project Manager</h2>
                  //         <Avatar
                  //           size="large"
                  //           style={{ backgroundColor: "#87d068" }}
                  //           icon={<UserOutlined />}
                  //         />
                  //       </Space>
                  //     </div>
                  //     <Divider />
                  //     <Space direction="vertical">
                  //       <h2>Members</h2>
                  //       <Space>
                  //         <Avatar
                  //           size="large"
                  //           style={{ backgroundColor: "#87d068" }}
                  //           icon={<UserOutlined />}
                  //         />
                  //         <Avatar
                  //           size="large"
                  //           style={{ backgroundColor: "#87d068" }}
                  //           icon={<UserOutlined />}
                  //         />
                  //       </Space>
                  //       <Avatar
                  //         onClick={() => {
                  //           showModalAddUser();
                  //         }}
                  //         size="large"
                  //         style={{
                  //           backgroundColor: "#87d068",
                  //           cursor: "pointer",
                  //         }}
                  //         icon={<PlusOutlined />}
                  //       />
                  //     </Space>
                  //   </Space>
                  // }
                >
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
                    {departmentStaffs?.users.map((staff) => (
                      <CustomAvatar
                        avatarSrc={staff.avatar}
                        size={40}
                        userName={staff.name}
                      />
                    ))}
                  </Avatar.Group>
                </Popover>
              </Col>
              {/* progress */}
            </Row>
          </div>
        </div>
      </Card>
    </div>
  );
};
