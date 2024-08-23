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
import React, { useState } from "react";
import "./modal-create-project.css";
import { Project, User } from "src/share/models";
import {
  useCreateProjectMutation,
  useGetDepartmentsQuery,
  // useGetUsersQuery,
} from "src/share/services";
import dayjs from "dayjs";
import { CustomAvatar, SelectPmTable } from "src/components/v2";

type ModalUpdateProjectProp = {
  isModalOpen: boolean;
  setIsModalOpen: (show: boolean) => void;
};

export const ModalCreateProject: React.FC<ModalUpdateProjectProp> = ({
  isModalOpen,
  setIsModalOpen,
}) => {
  const [form] = Form.useForm();
  const startDate = Form.useWatch("startAt", { form, preserve: true });
  const [createProject] = useCreateProjectMutation();
  const [selectedPm, setSeletedPm] = useState<User | undefined>(undefined);
  const [openSelectePm, setOpenSeletePm] = useState<boolean>(false);

  const { data: departmentData } = useGetDepartmentsQuery({
    itemsPerPage: "ALL",
  });

  const onFinish: FormProps<Project>["onFinish"] = async (values) => {
    await createProject({
      ...values,
      ...(selectedPm && { project_manager_id: selectedPm.user_id }),
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
    setSeletedPm(undefined);
  };

  return (
    <>
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
          <Form.Item<Project> name={"department_ids"} label='Department'>
            <Select
              allowClear
              mode='multiple'
              options={departmentData?.departments?.map((department) => {
                return {
                  label: department.name,
                  value: department.department_id,
                };
              })}
              size='large'
            />
          </Form.Item>
          <Form.Item<Project>
            name={"project_manager_id"}
            label='Project Manager'
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "var(--gap-s)",
              }}
            >
              <Button
                onClick={() => setOpenSeletePm(true)}
                type='primary'
                ghost
              >
                Select
              </Button>
              {selectedPm && (
                <>
                  <CustomAvatar
                    avatarSrc={selectedPm.avatar}
                    bgColor={selectedPm.avatar_color}
                    userName={selectedPm.name}
                    size={40}
                  />
                  <h4>{selectedPm.name}</h4>
                </>
              )}
            </div>
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
                startDate
                  ? dayjs(startDate).add(1, "day")
                  : dayjs().add(1, "day")
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
      <Modal
        open={openSelectePm}
        onCancel={() => setOpenSeletePm(false)}
        footer={[]}
        width={"90vw"}
      >
        <div style={{ marginTop: "30px" }}>
          <SelectPmTable setSelectedPM={setSeletedPm} selectedPm={selectedPm} />
        </div>
      </Modal>
    </>
  );
};
