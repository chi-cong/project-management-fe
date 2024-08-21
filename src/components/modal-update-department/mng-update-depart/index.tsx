import { Modal, Space, Tabs } from "antd";
import React from "react";
import "./modal-update-department.css";
import InfoTabs from "./info-tabs";
import AddStaffTabs from "./add-staff-tabs";
import { Department } from "src/share/models";
type ModalUpdateDepartment = {
  isModalOpen: boolean;
  setIsModalOpen: (show: boolean) => void;
  department?: Department;
};
export const MngUpdateDepart: React.FC<ModalUpdateDepartment> = ({
  isModalOpen,
  setIsModalOpen,
  department,
}) => {
  const handleOk = () => {
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <Modal
      className='wrapper'
      open={isModalOpen}
      onOk={handleOk}
      onCancel={handleCancel}
      width={1000}
      style={{ minWidth: "500px" }}
      footer={[]}
    >
      <h2
        style={{
          alignItems: "center",
          justifyContent: "center",
          textAlign: "center",
        }}
      >
        Update Department
      </h2>
      <Tabs defaultActiveKey='1'>
        <Tabs.TabPane tab='Info' key='1'>
          <InfoTabs
            name={department?.name}
            description={department?.description}
            id={department?.department_id}
          />
        </Tabs.TabPane>
        <Tabs.TabPane tab='Staff' key='2'>
          <AddStaffTabs id={department?.department_id} />
        </Tabs.TabPane>
      </Tabs>
      <Space
        direction='vertical'
        size='middle'
        style={{ display: "flex" }}
      ></Space>
    </Modal>
  );
};
