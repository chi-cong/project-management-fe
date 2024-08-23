import { DatePicker, Form, Input, Modal, Typography } from "antd";
import React, { useEffect } from "react";
import "./modal-detail-project.css";
import { Project } from "src/share/models";
import dayjs from "dayjs";
import { CustomAvatar } from "src/components/v2";

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
      department_ids: project?.department_ids,
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
        <Form.Item<Project> name={"name"} label='Project name'>
          <Input size='large' disabled />
        </Form.Item>
        <Form.Item<Project> name={"projectCode"} label='Project Code'>
          <Input size='large' disabled />
        </Form.Item>
        <Form.Item<Project> name={"investor"} label='Investor'>
          <Input size='large' disabled />
        </Form.Item>
        <Form.Item<Project> name={"description"} label='Description'>
          <Input.TextArea size='large' disabled />
        </Form.Item>
        <Form.Item<Project> name={"project_manager_id"} label='Project Manager'>
          {project?.project_manager ? (
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "var(--gap-s)",
              }}
            >
              <CustomAvatar
                avatarSrc={project?.project_manager.avatar}
                bgColor={project?.project_manager.avatar_color}
                userName={project?.project_manager.name}
                size={40}
              />
              <h4>{project?.project_manager.name}</h4>
            </div>
          ) : (
            <Typography.Text>No Manager</Typography.Text>
          )}
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
