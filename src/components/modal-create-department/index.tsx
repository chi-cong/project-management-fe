import { Button, message, Modal, Space, Tabs } from "antd";
import React, { useState } from "react";
import "./modal-create-department.css";
import InfoTabs from "./info-tabs";
import AddManagerTabs from "./add-manager-tabs";
import AddStaffTabs from "./add-staff-tabs";
import { useAddDepartmentMutation } from "src/share/services";

type ModalCreateDepartment = {
  isModalOpen: boolean;
  setIsModalOpen: (show: boolean) => void;
};
const ModalCreateDepartment: React.FC<ModalCreateDepartment> = ({
  isModalOpen,
  setIsModalOpen,
}) => {
  const [departInfo, setDepartInfo] = useState<{
    name?: string;
    description?: string;
  }>();
  const [managerId, setManagerId] = useState<string>("");
  const [staffList, setStaffList] = useState<string[]>([]);
  const [createDepartment] = useAddDepartmentMutation();

  const handleCancel = () => {
    setManagerId("");
    setStaffList([]);
    setIsModalOpen(false);
  };
  const createDepart = () => {
    createDepartment({
      name: departInfo?.name,
      description: departInfo?.description,
      list_user_ids: staffList,
      ...(managerId && { manager_id: managerId }),
    })
      .unwrap()
      .then(() => {
        message.success("Department is created ");
        handleCancel();
      })
      .catch(() => message.error("Failed to create department"));
  };

  return (
    <Modal
      className='wrapper'
      open={isModalOpen}
      centered
      onCancel={handleCancel}
      width={1000}
      footer={[
        <Button onClick={createDepart} size='large' type='primary'>
          Create Department
        </Button>,
      ]}
    >
      <h2
        style={{
          alignItems: "center",
          justifyContent: "center",
          textAlign: "center",
        }}
      >
        Create Department
      </h2>
      <Tabs defaultActiveKey='1'>
        <Tabs.TabPane tab='Info' key='1'>
          <InfoTabs setFields={setDepartInfo} />
        </Tabs.TabPane>
        <Tabs.TabPane tab='Manager' key='2'>
          <AddManagerTabs setManagerId={setManagerId} managerId={managerId} />
        </Tabs.TabPane>
        <Tabs.TabPane tab='Staff' key='3'>
          <AddStaffTabs setStaffList={setStaffList} staffList={staffList} />
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

export default ModalCreateDepartment;
