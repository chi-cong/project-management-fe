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
} from "@ant-design/icons";
import "./card-department.css";
import {
  useDeleteDepartmentsMutation,
  useGetDepartmentStaffsQuery,
} from "src/share/services";
import { ModalAddUserToProject } from "src/components/";
import { CustomAvatar } from "src/components/v2";
import { UserOutlined, PlusOutlined } from "@ant-design/icons";
import { ModalUpdateDepartment } from "src/components/";
import { Department } from "src/share/models";
import { shortenLongText } from "src/share/utils";
type CardDepartmentProps = {
  department: Department;
  manager?: string;
  onClick?: () => void;
  departmentId?: string;
  staffCount?: number;
  role?: string;
};

export const CardDepartment: React.FC<CardDepartmentProps> = ({
  department,
  onClick,
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

  const handleDeleteClick = async (event: React.MouseEvent<HTMLElement>) => {
    event.stopPropagation();
  };

  const deleteDepartmentHandler = async () => {
    try {
      await deleteDepartment({
        departmentId: department.department_id,
      }).unwrap();
      await message.success("Deleted department");
    } catch (error) {
      message.error("Failed to delete department");
    }
  };

  return (
    <>
      <div className='card-department-container' onClick={onClick}>
        <Card hoverable bordered={false}>
          <div className='department-wrapper'>
            <Row className='department-header'>
              {/* title */}
              <Col sm={12} md={20} className='department-header-info'>
                <h2 className='department-name'>{department.name}</h2>
              </Col>
              {/* action (delete, update) */}
              <Col sm={12} md={4} className='department-header-action'>
                <Space size={[8, 24]} wrap={true}>
                  <div
                    onClick={showModal}
                    className='department-header-action-button'
                  >
                    <EditOutlined />
                  </div>
                  <div
                    className='department-header-action-button icon-delete-Project'
                    onClick={handleDeleteClick}
                  >
                    <Popconfirm
                      title='Are you sure to delete this department?'
                      icon={<QuestionCircleOutlined style={{ color: "red" }} />}
                      onConfirm={() => {
                        deleteDepartmentHandler();
                      }}
                    >
                      <DeleteOutlined />
                    </Popconfirm>
                  </div>
                </Space>
              </Col>
            </Row>
            <div className='department-body'>
              <span className='description'>{department?.description}</span>

              {/* info */}
              <Row className='department-body-info'>
                <Col sm={24} xs={24} xxl={18}>
                  <Card
                    className='department-body-manager-card'
                    style={{ marginBottom: "var(--gap-s)" }}
                  >
                    <div className='department-body-manager-info-wrapper'>
                      {department.information?.manager?.user_id ? (
                        <>
                          <div
                            style={{ display: "flex", alignItems: "center" }}
                          >
                            <CustomAvatar
                              size={45}
                              userName={department.information?.manager?.name}
                              avatarSrc={
                                department.information?.manager?.avatar
                              }
                              bgColor={
                                department.information?.manager?.avatar_color
                              }
                            />
                          </div>
                          <div className='department-manager-main-info'>
                            <h3 style={{ textWrap: "nowrap" }}>
                              {shortenLongText(
                                20,
                                department.information?.manager?.name
                              )}
                            </h3>
                            <span className='department-body-manager-role'>
                              Manger
                            </span>
                          </div>
                        </>
                      ) : (
                        <div
                          style={{
                            height: "40px",
                            display: "flex",
                            alignItems: "center",
                          }}
                        >
                          <h4>No Manager</h4>
                        </div>
                      )}
                    </div>
                  </Card>
                </Col>
                {/* avatar group */}
                <Col>
                  <Popover
                    placement='bottom'
                    trigger='hover'
                    content={
                      <Space direction='vertical' style={{ display: "flex" }}>
                        <div>
                          <Space direction='vertical'>
                            <h2>Project Manager</h2>
                            <Avatar
                              size='large'
                              style={{ backgroundColor: "#87d068" }}
                              icon={<UserOutlined />}
                            />
                          </Space>
                        </div>
                        <Divider />
                        <Space direction='vertical'>
                          <h2>Members</h2>
                          <Space>
                            <Avatar
                              size='large'
                              style={{ backgroundColor: "#87d068" }}
                              icon={<UserOutlined />}
                            />
                            <Avatar
                              size='large'
                              style={{ backgroundColor: "#87d068" }}
                              icon={<UserOutlined />}
                            />
                          </Space>
                          <Avatar
                            onClick={() => {
                              showModalAddUser();
                            }}
                            size='large'
                            style={{
                              backgroundColor: "#87d068",
                              cursor: "pointer",
                            }}
                            icon={<PlusOutlined />}
                          />
                        </Space>
                      </Space>
                    }
                  >
                    <Avatar.Group
                      maxCount={2}
                      maxPopoverTrigger='click'
                      size={40}
                      style={{ minHeight: "40px", minWidth: "40px" }}
                      maxStyle={{
                        color: "#f56a00",
                        backgroundColor: "#fde3cf",
                        cursor: "pointer",
                      }}
                    >
                      {departmentStaffs?.users.map((staff, index) => (
                        <CustomAvatar
                          avatarSrc={staff.avatar}
                          size={40}
                          userName={staff.name}
                          key={index}
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
      <ModalAddUserToProject
        isModalOpen={isModalAddUserOpen}
        setIsModalOpen={setIsModalAddUserOpen}
      />
      <ModalUpdateDepartment
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
        department={department}
      />
    </>
  );
};
