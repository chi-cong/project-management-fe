import React, { useState } from "react";
import { Modal, Tabs, TabsProps, Row, Col, Avatar, Popconfirm } from "antd";
import { UnorderedListOutlined } from "@ant-design/icons";
import {
  EditOutlined,
  DeleteOutlined,
  QuestionCircleOutlined,
  BookOutlined,
} from "@ant-design/icons";
import { ModalDepartmentManager } from "src/layouts/modal-departments/modal-department-manager";
import { ModalListStaffDepartment } from "src/layouts/modal-departments/modal-list-staff-department";
import { ModalAddManager } from "src/layouts/modal-departments/modal-add-manager";
import { ModalReportProjectDepartment } from "src/layouts/modal-departments/modal-report-project-department";
import { Department } from "src/share/models/departmentModels";
import { useDeleteDepartmentsMutation } from "src/share/services";
import "./modal-departments.css";
import { TabProjectDepartment } from "./tab-project-departments";
import { randAvaBg } from "src/share/utils";
import { TabReportDepartment } from "./tab-report-department";
import { UserRole } from "src/share/models";

type ModalDepartmentsProps = {
  visible: boolean;
  setVisible: React.Dispatch<React.SetStateAction<boolean>>;
  department?: Department;
  departmentDetail?: Department;
  closeModal: () => void;
  role?: UserRole;
  isModal: boolean;
};

export const ModalDepartments = ({
  visible,
  setVisible,
  department,
  closeModal,
  departmentDetail,
  role,
  isModal,
}: ModalDepartmentsProps) => {
  const [managerModalVisible, setManagerModalVisible] = useState(false);

  const showModal = () => {
    setManagerModalVisible(true);
  };
  const [staffModalVisible, setstaffModalVisible] = useState(false);
  const showModalStaff = () => {
    setstaffModalVisible(true);
    closeModal();
  };
  const [addManagerVisibel, setAddManagerVisible] = useState(false);
  const showAddManager = () => {
    setAddManagerVisible(true);
    closeModal();
  };
  const [showReportProjectVisibel, setshowReportProjectVisibel] =
    useState(false);

  const [deleteDepartment] = useDeleteDepartmentsMutation();
  const handleDeleteDepartment = async () => {
    await deleteDepartment({ departmentId: department?.department_id })
      .unwrap()
      .then()
      .catch();
  };

  const departmentItems: TabsProps["items"] = [
    {
      key: "1",
      label: "Information",
      children: (
        <>
          <div className='information-departments'>
            <div className='description-department'>
              <BookOutlined />
              <p>
                {role === "MANAGER"
                  ? departmentDetail?.description
                  : department?.description}
              </p>
            </div>
            <div className='info-department-wrapper'>
              <div className='department-manager'>
                <Row>
                  <Col span={10}>
                    <div className='title-manager-department'>
                      <span>Manager</span>
                    </div>
                  </Col>
                  <Col span={12}>
                    <div
                      className='name-manager-department'
                      onClick={
                        role === "MANAGER"
                          ? showModal
                          : department?.information?.manager?.user_id
                            ? showModal
                            : undefined
                      }
                    >
                      {department?.information?.manager?.user_id ? (
                        <Avatar
                          {...(!department?.information?.manager?.avatar
                            ? {
                                style: { background: randAvaBg() },
                              }
                            : { src: department.information.manager.avatar })}
                          size={25}
                        >
                          {!department?.information?.manager?.avatar &&
                            department?.information?.manager?.username
                              ?.substring(0, 1)
                              .toUpperCase()}
                        </Avatar>
                      ) : null}
                      <p>
                        {role === "MANAGER"
                          ? departmentDetail?.manager_info?.username
                          : department?.information?.manager?.user_id
                            ? department.information?.manager?.name
                            : "No Manager"}
                      </p>
                    </div>
                  </Col>
                  <Col span={2} className='edit-manager-icon'>
                    {role !== "MANAGER" ? (
                      <div onClick={showAddManager}>
                        <EditOutlined />
                      </div>
                    ) : null}
                  </Col>
                </Row>
              </div>
            </div>
            <div className='info-staffs-wrapper'>
              <div className='department-staff'>
                <Row>
                  <Col span={10}>
                    <div className='title-staff-department'>
                      <span>Staff</span>
                    </div>
                  </Col>
                  <Col span={12}>
                    <div className='number-staff-department'>
                      <p>
                        {role === "MANAGER"
                          ? departmentDetail?.information?.total_staff
                          : department?.information?.total_staff}
                      </p>
                    </div>
                  </Col>
                  <Col span={2} className='icon-list-staff-department'>
                    <UnorderedListOutlined onClick={showModalStaff} />
                  </Col>
                </Row>
              </div>
            </div>
            {role !== "MANAGER" ? (
              <div className='delete-icon'>
                <Popconfirm
                  title='Are you sure to delete this department?'
                  icon={<QuestionCircleOutlined style={{ color: "red" }} />}
                  onConfirm={() => {
                    handleDeleteDepartment().then(() => {
                      setVisible(false);
                    });
                  }}
                >
                  <DeleteOutlined />
                </Popconfirm>
              </div>
            ) : null}
          </div>
        </>
      ),
    },
    {
      key: "2",
      label: "Projects",
      children: (
        <TabProjectDepartment
          department_id={
            role === "MANAGER"
              ? departmentDetail?.department_id
              : department?.department_id
          }
        />
      ),
    },
    {
      key: "3",
      label: "Report",
      children: (
        <TabReportDepartment
          department_id={
            role === "MANAGER"
              ? departmentDetail?.department_id
              : department?.department_id
          }
        />
      ),
    },
  ];

  return (
    <>
      {isModal ? (
        <Modal
          open={visible}
          onCancel={() => setVisible(false)}
          footer={null}
          title={department?.name}
          width={1000}
        >
          <Tabs defaultActiveKey='1' items={departmentItems} />
        </Modal>
      ) : (
        <Tabs defaultActiveKey='1' items={departmentItems} />
      )}
      <ModalDepartmentManager
        visible={managerModalVisible}
        setVisible={setManagerModalVisible}
        department={department}
        detailDepartment={departmentDetail}
        role={role}
      />
      <ModalListStaffDepartment
        visible={staffModalVisible}
        setVisible={setstaffModalVisible}
        department={department}
        detailDepartment={departmentDetail}
        role={role}
      />
      <ModalAddManager
        visible={addManagerVisibel}
        setVisible={setAddManagerVisible}
        department={department}
      />
      <ModalReportProjectDepartment
        visible={showReportProjectVisibel}
        setVisible={setshowReportProjectVisibel}
      />
    </>
  );
};
