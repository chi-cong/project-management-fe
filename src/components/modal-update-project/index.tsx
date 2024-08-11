import {
  Button,
  DatePicker,
  Form,
  FormProps,
  Input,
  message,
  Modal,
  Select,
  Space,
} from "antd";
import React, { useEffect } from "react";
import "./modal-update-project.css";
import { Project, User } from "src/share/models";
import dayjs, { Dayjs } from "dayjs";
import {
  useUpdateProjectMutation,
  useGetDepartmentsQuery,
  useGetUsersQuery,
} from "src/share/services";

type ModalUpdateProjectProp = {
  isModalOpen: boolean;
  setIsModalOpen: (show: boolean) => void;
  userDetail: User;
  project: Project;
  isUpdate: boolean;
};

export const ModalUpdateProject: React.FC<ModalUpdateProjectProp> = ({
  isModalOpen,
  setIsModalOpen,
  project,
  isUpdate,
}) => {
  const [updateProject] = useUpdateProjectMutation();
  const { data: departmentData } = useGetDepartmentsQuery({
    itemsPerPage: "ALL",
  });
  const { data: pms } = useGetUsersQuery({
    items_per_page: "ALL",
    role: "PROJECT_MANAGER",
  });

  const [form] = Form.useForm();

  const onFinish: FormProps<Project>["onFinish"] = async (values) => {
    if (values.endAt) {
      values.endAt = (values.endAt as Dayjs).add(1, "day");
    }
    if (values.startAt) {
      values.startAt = (values.startAt as Dayjs).add(1, "day");
    }
    values.department_id = project.department_id;

    await updateProject({ values, projectId: project.project_id })
      .unwrap()
      .then(() => {
        message.success("Success update project");
      })
      .catch(() => message.error("There was an error"));
  };

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
      className='wrapper'
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
        Update Project
      </h2>
      <Form
        className='project-form'
        layout='vertical'
        form={form}
        onFinish={onFinish}
        // if its detail modal, disable form
        disabled={!isUpdate}
      >
        <Form.Item<Project>
          name={"name"}
          label='Project name'
          rules={[{ required: true, message: "Project name is required" }]}
        >
          <Input size='large' />
        </Form.Item>
        <Form.Item<Project>
          name={"projectCode"}
          label='Project Code'
          rules={[{ required: true, message: "Project code is required" }]}
        >
          <Input size='large' />
        </Form.Item>
        <Form.Item<Project> name={"investor"} label='Investor'>
          <Input size='large' />
        </Form.Item>
        <Form.Item<Project>
          name={"description"}
          label='Description'
          rules={[
            { required: true, message: "Project description is required" },
          ]}
        >
          <Input.TextArea size='large' />
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
          />
        </Form.Item>

        <Form.Item<Project> name={"startAt"} label='Start'>
          <DatePicker size='large' style={{ width: "100%" }} />
        </Form.Item>
        <Form.Item<Project> name={"endAt"} label='End'>
          <DatePicker size='large' style={{ width: "100%" }} />
        </Form.Item>

        {isUpdate && (
          <Form.Item className='create-user-form-btn'>
            <Space>
              <Button type='primary' htmlType='submit' size='large'>
                Update
              </Button>
              <Button
                type='primary'
                ghost
                size='large'
                onClick={() => setIsModalOpen(false)}
              >
                Cancel
              </Button>
            </Space>
          </Form.Item>
        )}
      </Form>
    </Modal>
  );
};
