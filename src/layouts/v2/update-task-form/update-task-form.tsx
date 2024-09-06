import "./update-task-form.css";
import {
  Button,
  DatePicker,
  Input,
  Modal,
  Space,
  Form,
  FormProps,
  message,
  Select,
} from "antd";
import React, { useEffect } from "react";
import { Dayjs } from "dayjs";
import {
  useUpdateTaskMutation,
  useUpdateAssignmentMutation,
  useGetAssignmentQuery,
  useGetTaskQuery,
} from "src/share/services";
import { useSelector } from "react-redux";

import { AssignmentStatus, OAssignmentStatus, Project } from "src/share/models";
import { RootState, useDispatch } from "react-redux";
import { selectTaskAssign } from "src/libs/redux/taskAssignSlice";
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
  status: AssignmentStatus;
  assignedStaff: string;
}

export const UpdateTaskForm: React.FC<TaskForm> = ({
  isModalOpen,
  setIsModalOpen,
  project,
}) => {
  const handleCancel = () => {
    setIsModalOpen(false);
    form.setFieldsValue({
      name: task?.name,
      description: task?.description,
      status: assignment?.status,
      deadline: utcToLocal(assignment?.endAt),
    });
  };

  const [form] = Form.useForm();
  const dispatch = useDispatch();

  const taskAssigment = useSelector((state: RootState) => state.taskAssignment);

  const { data: assignment } = useGetAssignmentQuery(
    {
      assignmentId: taskAssigment.assignment?.assignment_id,
    },
    { skip: taskAssigment.assignment ? false : true }
  );
  const { data: task } = useGetTaskQuery(
    {
      taskId: taskAssigment.task?.task_id,
    },
    { skip: taskAssigment.task ? false : true }
  );

  const [updateTask] = useUpdateTaskMutation();
  const [updateAssignment] = useUpdateAssignmentMutation();

  const onFinish: FormProps<TaskFormFields>["onFinish"] = async (values) => {
    await updateTask({
      taskId: taskAssigment.task!.task_id,
      value: {
        description: values.description,
        name: values.name,
      },
    }).unwrap();
    await updateAssignment({
      assignmentId: taskAssigment.assignment!.assignment_id!,
      value: {
        endAt: values.deadline,
        status: values.status,
        user_id: taskAssigment.assignment?.user_id,
      },
    })
      .unwrap()
      .then(() => {
        message.success("successful update task");
        setIsModalOpen(false);
      })
      .catch(() => message.error("Failed to update task"));
  };

  useEffect(() => {
    if (task && assignment) {
      dispatch(selectTaskAssign({ task, assignment }));
    }
    form.setFieldsValue({
      name: task?.name,
      description: task?.description,
      status: taskAssigment.assignment?.status,
      deadline: utcToLocal(taskAssigment.assignment?.endAt),
    });
  }, [form, task, assignment, dispatch]);

  return (
    <Modal
      className='wrapper'
      open={isModalOpen}
      centered
      onCancel={handleCancel}
      width={1000}
      style={{ minWidth: "95vw" }}
      footer={[]}
    >
      <h2
        style={{
          alignItems: "center",
          justifyContent: "center",
          textAlign: "center",
        }}
      >
        Update Task
      </h2>
      <Form form={form} name='user-info' onFinish={onFinish} layout='vertical'>
        <div>
          <Form.Item<TaskFormFields>
            name='name'
            label='Name'
            rules={[{ required: true, message: "Username is required" }]}
          >
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
        <div>
          <Form.Item<TaskFormFields> name='status' label='Status'>
            <Select
              options={[
                { label: "Todo", value: OAssignmentStatus.Todo },
                { label: "On Progress", value: OAssignmentStatus.OnProgress },
                { label: "Done", value: OAssignmentStatus.Done },
              ]}
              size='large'
              style={{ width: "100%" }}
            />
          </Form.Item>
        </div>
        <Form.Item className='create-task-form-btn'>
          <Space>
            <Button type='primary' htmlType='submit' size='large'>
              Update
            </Button>
            <Button
              type='primary'
              ghost
              size='large'
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
