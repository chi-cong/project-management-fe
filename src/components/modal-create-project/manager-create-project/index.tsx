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
  Typography,
} from "antd";
import React from "react";
import "./manager-create-project.css";
import { Project } from "src/share/models";
import {
  useCreateProjectMutation,
  useManagerGetAllStaffDepartmentQuery,
  useGetUserDetailQuery,
} from "src/share/services";
import dayjs from "dayjs";
import { CustomAvatar } from "src/components/v2";

type ModalUpdateProjectProp = {
  isModalOpen: boolean;
  setIsModalOpen: (show: boolean) => void;
  departmentId?: string;
};

export const ManagerCreateProject: React.FC<ModalUpdateProjectProp> = ({
  isModalOpen,
  setIsModalOpen,
  departmentId,
}) => {
  const [form] = Form.useForm();
  const startDate = Form.useWatch("startAt", { form, preserve: true });
  const { data: user } = useGetUserDetailQuery();
  const [createProject] = useCreateProjectMutation();
  const { data: staffs } = useManagerGetAllStaffDepartmentQuery(
    {
      items_per_page: "ALL",
    },
    { skip: user?.department_id ? false : true }
  );

  const onFinish: FormProps<Project>["onFinish"] = async (values) => {
    await createProject({
      ...values,
      department_ids: departmentId ? [departmentId] : [],
    })
      .unwrap()
      .then(() => {
        message.success("Success create project");
        handleCancel();
      })
      .catch(() => message.error("There was an error"));
  };

  const handleCancel = () => {
    setIsModalOpen(false);
    form.resetFields();
  };

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
        Create Project
      </h2>
      <Form
        className='project-form'
        layout='vertical'
        onFinish={onFinish}
        disabled={departmentId ? false : true}
        form={form}
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
        <Form.Item<Project>
          name={"investor"}
          label='Investor'
          rules={[{ required: true, message: "Investor is required" }]}
        >
          <Input size='large' />
        </Form.Item>
        <Form.Item<Project> name={"description"} label='Description'>
          <Input.TextArea size='large' />
        </Form.Item>
        <Form.Item<Project> name={"project_manager_id"} label='Project Manager'>
          <Select
            options={staffs?.users?.map((staff) => {
              return {
                label: (
                  <Space>
                    <CustomAvatar
                      bgColor={staff.avatar_color}
                      avatarSrc={staff.avatar}
                      size={32}
                      userName={staff.name}
                    />
                    <Typography>{staff.name}</Typography>
                  </Space>
                ),
                value: staff.user_id,
              };
            })}
            size='large'
          />
        </Form.Item>

        <Form.Item<Project> name={"startAt"} label='Start'>
          <DatePicker
            size='large'
            style={{ width: "100%" }}
            minDate={dayjs().add(1, "day")}
          />
        </Form.Item>
        <Form.Item<Project> name={"endAt"} label='End'>
          <DatePicker
            size='large'
            style={{ width: "100%" }}
            minDate={
              startDate ? dayjs(startDate).add(1, "day") : dayjs().add(1, "day")
            }
          />
        </Form.Item>

        <Form.Item className='create-user-form-btn'>
          <Space>
            <Button type='primary' htmlType='submit' size='large'>
              Create
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
