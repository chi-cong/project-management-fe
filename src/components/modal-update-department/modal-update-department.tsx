import { Form, Modal, Space, Tabs } from "antd";
import React, { useEffect } from "react";
import "./modal-update-department.css";
import InfoTabs from "./info-tabs";
import AddManagerTabs from "./add-manager-tabs";
import AddStaffTabs from "./add-staff-tabs";
import { Department } from "src/share/models";
type ModalUpdateDepartment = {
  isModalOpen: boolean;
  setIsModalOpen: (show: boolean) => void;
  department?: Department;
};
export const ModalUpdateDepartment: React.FC<ModalUpdateDepartment> = ({
  isModalOpen,
  setIsModalOpen,
  department,
}) => {
  const handleOk = () => {
    setIsModalOpen(true);
  };

  const [form] = Form.useForm();

  const handleCancel = () => {
    setIsModalOpen(false);
    form.setFieldsValue({
      name: department?.name,
      description: department?.description,
    });
  };

  useEffect(() => {
    form.setFieldsValue({
      name: department?.name,
      description: department?.description,
    });
  }, [department, form]);

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
          <InfoTabs id={department?.department_id} form={form} />
        </Tabs.TabPane>
        <Tabs.TabPane tab='Manager' key='2'>
          <AddManagerTabs id={department?.department_id} />
        </Tabs.TabPane>
        <Tabs.TabPane tab='Staff' key='3'>
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
