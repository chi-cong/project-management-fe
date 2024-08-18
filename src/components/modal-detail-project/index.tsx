import { DatePicker, Form, Input, Modal, Select } from "antd";
import React, { useEffect } from "react";
import "./modal-detail-project.css";
import { Project } from "src/share/models";
import dayjs from "dayjs";
import { useGetDepartmentsQuery, useGetUsersQuery } from "src/share/services";

type ModalDetailProjectProp = {
  isModalOpen: boolean;
  setIsModalOpen: (show: boolean) => void;
  project: Project;
};

export const ModalDetailProject: React.FC<ModalDetailProjectProp> = ({
  isModalOpen,
  setIsModalOpen,
  project,
}) => {
  const { data: departmentData } = useGetDepartmentsQuery({
    itemsPerPage: "ALL",
  });
  const { data: pms } = useGetUsersQuery({
    items_per_page: "ALL",
    role: "PROJECT_MANAGER",
  });

  const [form] = Form.useForm();
  const handleCancel = () => {
    setIsModalOpen(false);
  };

  useEffect(() => {
    form.setFieldsValue({
      ...project,
      startAt: dayjs(
        typeof project?.startAt === "string"
          ? project.startAt.substring(0, 10)
          : new Date()
      ),
      endAt: dayjs(
        typeof project?.endAt === "string"
          ? project.endAt.substring(0, 10)
          : new Date()
      ),
      department_id: project?.department_id,
      pms: project?.project_manager_id,
    });
  }, [form, project]);

  return (
    <Modal
      className='detail-project-modal'
      open={isModalOpen}
      centered
      footer={[]}
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
        Detail Project
      </h2>
      <Form className='project-form' layout='vertical' form={form}>
        <Form.Item<Project>
          name={"name"}
          label='Project name'
          rules={[{ required: true, message: "Project name is required" }]}
        >
          <Input size='large' disabled />
        </Form.Item>
        <Form.Item<Project>
          name={"projectCode"}
          label='Project Code'
          rules={[{ required: true, message: "Project code is required" }]}
        >
          <Input size='large' disabled />
        </Form.Item>
        <Form.Item<Project> name={"investor"} label='Investor'>
          <Input size='large' disabled />
        </Form.Item>
        <Form.Item<Project>
          name={"description"}
          label='Description'
          rules={[
            { required: true, message: "Project description is required" },
          ]}
        >
          <Input.TextArea size='large' disabled />
        </Form.Item>
        <Form.Item<Project> name={"department_id"} label='Department'>
          <Select
            options={departmentData?.departments?.map((department) => {
              return {
                label: department.name,
                value: department.department_id,
              };
            })}
            size='large'
            disabled
          />
        </Form.Item>
        <Form.Item<Project> name={"project_manager_id"} label='Project Manager'>
          <Select
            options={pms?.users?.map((pm) => {
              return {
                label: pm.username,
                value: pm.user_id,
              };
            })}
            size='large'
            disabled
          />
        </Form.Item>
        <Form.Item<Project> name={"startAt"} label='Start'>
          <DatePicker size='large' style={{ width: "100%" }} disabled />
        </Form.Item>
        <Form.Item<Project> name={"endAt"} label='End'>
          <DatePicker size='large' style={{ width: "100%" }} disabled />
        </Form.Item>
      </Form>
    </Modal>
  );
};
