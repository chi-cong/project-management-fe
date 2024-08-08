// import "./task-form.css";
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
import { Project } from "src/share/models";

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

const ModalCreateUser: React.FC<TaskForm> = ({
  isModalOpen,
  setIsModalOpen,
  project,
}) => {
  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const [createTask] = useCreateTaskMutation();
  const [createAssignment] = useCreateAssigmentMutation();

  const onFinish: FormProps<TaskFormFields>["onFinish"] = async (values) => {
    const newTask = await createTask({
      description: values.description,
    }).unwrap();
    await createAssignment({
      ...{
        project_id: project?.project_id,
        task_id: newTask.task_id,
        user_id: values.assignedStaff,
        endAt: values?.deadline,
      },
    });
    await createAssignment({
      ...{
        project_id: project?.project_id,
        task_id: newTask.task_id,
        user_id: values.assignedStaff,
        endAt: values?.deadline,
      },
    })
      .unwrap()
      .then(() => {
        message.success("successful create task");
      })
      .catch(() => message.error("Failed to create task"));
  };

  return (
    <Modal
      className='wrapper'
      open={isModalOpen}
      centered
      onCancel={handleCancel}
      width={1000}
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
      <Form name='user-info' onFinish={onFinish} layout='vertical'>
        <div>
          <Form.Item<TaskFormFields> name='name' label='Name'>
            <Input placeholder='Name...' size='large' />
          </Form.Item>
        </div>
        <div>
          <Form.Item<TaskFormFields>
            name='description'
            rules={[{ required: true, message: "Username is required" }]}
            label='Description'
          >
            <Input.TextArea
              style={{ resize: "none", height: "100px" }}
              placeholder='Description...'
              size='large'
            />
          </Form.Item>
        </div>
        <div>
          <Form.Item<TaskFormFields> name='deadline' label='Deadline'>
            <DatePicker
              placeholder='Deadline...'
              size='large'
              style={{ width: "100%" }}
            />
          </Form.Item>
        </div>
        <Form.Item className='create-task-form-btn'>
          <Space>
            <Button type='primary' htmlType='submit' size='large'>
              Create
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
      </Form>
    </Modal>
  );
};

export default ModalCreateUser;
