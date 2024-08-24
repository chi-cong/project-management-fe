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
import React, { useEffect, useState } from "react";
import "./modal-update-project.css";
import { OUserRole, Project, User } from "src/share/models";
import {
  useUpdateProjectMutation,
  useGetDepartmentsQuery,
} from "src/share/services";
import { utcToLocal } from "src/share/utils";
import dayjs from "dayjs";
import { CustomAvatar, SelectPmTable } from "src/components/v2";
import { useRoleChecker } from "src/share/hooks";

type ModalUpdateProjectProp = {
  isModalOpen: boolean;
  setIsModalOpen: (show: boolean) => void;
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
  const checkRole = useRoleChecker();
  const { data: departmentData } = useGetDepartmentsQuery(
    {
      itemsPerPage: "ALL",
    },
    { skip: checkRole(OUserRole.Staff) || checkRole(OUserRole.Manager) }
  );
  const [form] = Form.useForm();
  const startDate = Form.useWatch("startAt", { form, preserve: true });
  const [selectedPm, setSeletedPm] = useState<User | undefined>(undefined);
  const [openSelectePm, setOpenSeletePm] = useState<boolean>(false);

  const onFinish: FormProps<Project>["onFinish"] = async (values) => {
    await updateProject({
      values: {
        ...values,
        ...(selectedPm && { project_manager_id: selectedPm.user_id }),
      },
      projectId: project.project_id,
    })
      .unwrap()
      .then(() => {
        message.success("Success update project");
        handleCancel();
      })
      .catch(() => message.error("There was an error"));
  };

  const handleCancel = () => {
    setIsModalOpen(false);
    setSeletedPm(project?.project_manager);
    form.setFieldsValue({
      ...project,
      startAt: utcToLocal(project?.startAt),
      endAt: utcToLocal(project?.endAt),
      department_ids: project?.department_ids,
      pms: project?.project_manager_id,
    });
  };

  useEffect(() => {
    form.setFieldsValue({
      ...project,
      startAt: utcToLocal(project?.startAt),
      endAt: utcToLocal(project?.endAt),
      department_ids: project?.department_ids,
      pms: project?.project_manager_id,
    });
    if (project?.project_manager) {
      setSeletedPm(project?.project_manager);
    }
  }, [form, project]);

  return (
    <>
      <Modal
        className='update-project-modal'
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
          {isUpdate ? " Update Project" : "Project Details"}
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
          <Form.Item<Project> name={"department_ids"} label='Department'>
            <Select
              allowClear
              options={departmentData?.departments?.map((department) => {
                return {
                  label: department.name,
                  value: department.department_id,
                };
              })}
              mode='multiple'
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
            <DatePicker size='large' style={{ width: "100%" }} />
          </Form.Item>

          <Form.Item<Project> name={"endAt"} label='End'>
            <DatePicker
              size='large'
              style={{ width: "100%" }}
              minDate={dayjs(startDate).add(1, "day")}
            />
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
                  onClick={() => handleCancel()}
                >
                  Cancel
                </Button>
              </Space>
            </Form.Item>
          )}
        </Form>
      </Modal>
      <Modal
        open={openSelectePm}
        onCancel={() => setOpenSeletePm(false)}
        footer={[]}
        width={"90vw"}
        title={"Select Project Manager"}
      >
        <div style={{ marginTop: "30px" }}>
          <SelectPmTable setSelectedPM={setSeletedPm} selectedPm={selectedPm} />
        </div>
      </Modal>
    </>
  );
};
