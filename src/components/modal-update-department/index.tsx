import { Modal, Space, Tabs } from "antd";
import React from "react";
import "./modal-update-department.css";
import InfoTabs from "./info-tabs";
import AddManagerTabs from "./add-manager-tabs";
import AddStaffTabs from "./add-staff-tabs";
type ModalUpdateDepartment = {
  isModalOpen: boolean;
  setIsModalOpen: any;
};
const ModalUpdateDepartment: React.FC<ModalUpdateDepartment> = ({
  isModalOpen,
  setIsModalOpen,
}) => {
  const handleOk = () => {
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <Modal
      className="wrapper"
      open={isModalOpen}
      centered
      onOk={handleOk}
      onCancel={handleCancel}
      width={1000}
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
      <Tabs defaultActiveKey="1">
        <Tabs.TabPane tab="Info" key="1">
          <InfoTabs />
        </Tabs.TabPane>
        <Tabs.TabPane tab="Manager" key="2">
          <AddManagerTabs />
        </Tabs.TabPane>
        <Tabs.TabPane tab="Staff" key="3">
          <AddStaffTabs />
        </Tabs.TabPane>
      </Tabs>
      <Space
        direction="vertical"
        size="middle"
        style={{ display: "flex" }}
      ></Space>
    </Modal>
  );
};

export default ModalUpdateDepartment;
