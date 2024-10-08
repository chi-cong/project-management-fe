import "./create-task-form.css";
import {
  Button,
  DatePicker,
  Input,
  Modal,
  Space,
  Form,
  FormProps,
  message,
} from "antd";
import React from "react";
import { Dayjs } from "dayjs";
import {
  useCreateTaskMutation,
  useCreateAssigmentMutation,
} from "src/share/services";
import { OAssignmentStatus, Project } from "src/share/models";
import { utcToLocal } from "src/share/utils";

type TaskForm = {
  isModalOpen: boolean;
  setIsModalOpen: (isShown: boolean) => void;
  project?: Project;
};
interface TaskFormFields {
  name: string;
  description: string;
  start: string;
  deadline: string | Dayjs;
  status: boolean;
  assignedStaff: string;
}

export const CreateTaskForm: React.FC<TaskForm> = ({
  isModalOpen,
  setIsModalOpen,
  project,
}) => {
  const [form] = Form.useForm();
  const [createTask] = useCreateTaskMutation();
  const [createAssignment] = useCreateAssigmentMutation();

  const handleCancel = () => {
    form.resetFields();
    setIsModalOpen(false);
  };

  const onFinish: FormProps<TaskFormFields>["onFinish"] = async (values) => {
    const newTask = await createTask({
      description: values.description,
      name: values.name,
    }).unwrap();
    await createAssignment({
      ...{
        project_id: project?.project_id,
        task_id: newTask.task_id,
        user_id: values.assignedStaff,
        endAt: values?.deadline,
        status: OAssignmentStatus.Todo,
      },
    })
      .unwrap()
      .then(() => {
        message.success("successful create task");
        handleCancel();
      })
      .catch(() => message.error("Failed to create task"));
  };

  return (
    <Modal
      className="wrapper"
      open={isModalOpen}
      centered
      onCancel={handleCancel}
      width={"95vw"}
      style={{ maxWidth: "1000px" }}
      footer={[]}
    >
      <h2
        style={{
          alignItems: "center",
          justifyContent: "center",
          textAlign: "center",
        }}
      >
        Create Task
      </h2>

      <Form form={form} name="user-info" onFinish={onFinish} layout="vertical">
        <div>
          <Form.Item<TaskFormFields>
            name="name"
            label="Name"
            rules={[{ required: true, message: "Name is required" }]}
          >
            <Input placeholder="Name..." size="large" />
          </Form.Item>
        </div>
        <div>
          <Form.Item<TaskFormFields>
            name="description"
            rules={[{ required: true, message: "Description is required" }]}
            label="Description"
          >
            <Input.TextArea
              style={{ resize: "none", height: "100px" }}
              placeholder="Description..."
              size="large"
            />
          </Form.Item>
        </div>
        <div>
          <Form.Item<TaskFormFields> name="deadline" label="Deadline">
            <DatePicker
              placeholder="Deadline..."
              size="large"
              style={{ width: "100%" }}
              minDate={
                project?.startAt
                  ? (utcToLocal(project.startAt) as Dayjs)
                  : undefined
              }
              maxDate={
                project?.endAt
                  ? (utcToLocal(project.endAt) as Dayjs)
                  : undefined
              }
            />
          </Form.Item>
        </div>
        <Form.Item className="create-task-form-btn">
          <Space>
            <Button type="primary" htmlType="submit" size="large">
              Create
            </Button>
            <Button
              type="primary"
              ghost
              size="large"
              onClick={() => handleCancel()}
            >
              Cancel
            </Button>
          </Space>
        </Form.Item>
      </Form>
    </Modal>
  );
};
