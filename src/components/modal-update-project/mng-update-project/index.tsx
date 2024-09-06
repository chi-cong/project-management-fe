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
import React, { useEffect } from "react";
import { Project } from "src/share/models";
import {
  useUpdateProjectMutation,
  useManagerGetAllStaffDepartmentQuery,
} from "src/share/services";
import { utcToLocal } from "src/share/utils";
import dayjs from "dayjs";
import { CustomAvatar } from "src/components/v2";

type ModalUpdateProjectProp = {
  isModalOpen: boolean;
  setIsModalOpen: (show: boolean) => void;
  project: Project;
  isUpdate: boolean;
  isPm: boolean;
};

export const MngUpdateProject: React.FC<ModalUpdateProjectProp> = ({
  isModalOpen,
  setIsModalOpen,
  project,
  isUpdate,
  isPm,
}) => {
  const [updateProject] = useUpdateProjectMutation();
  const { data: pms } = useManagerGetAllStaffDepartmentQuery({
    items_per_page: "ALL",
  });

  const [form] = Form.useForm();
  const startDate = Form.useWatch("startAt", { form, preserve: true });

  const onFinish: FormProps<Project>["onFinish"] = async (values) => {
    values.department_ids = project?.department_ids;

    await updateProject({ values, projectId: project.project_id })
      .unwrap()
      .then(() => {
        message.success("Success update project");
        handleCancel();
      })
      .catch(() => message.error("There was an error"));
  };

  const handleCancel = () => {
    setIsModalOpen(false);
    form.setFieldsValue({
      ...project,
      startAt: utcToLocal(project?.startAt),
      endAt: utcToLocal(project?.endAt),
      department_ids: project?.department_ids,
      pms: project?.project_manager_id,
    });
  };

  const addedMissingPMList = () => {
    const newList = [...pms!.users, project!.project_manager!];
    return newList?.map((pm) => {
      return {
        label: (
          <Space>
            <CustomAvatar
              bgColor={pm.avatar_color}
              avatarSrc={pm.avatar}
              size={32}
              userName={pm.name}
            />
            <Typography>{pm.name}</Typography>
          </Space>
        ),
        value: pm.user_id,
      };
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
  }, [form, project]);

  return (
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
        <Form.Item<Project> name={"project_manager_id"} label='Project Manager'>
          {isPm ? (
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "var(--gap-s)",
              }}
            >
              <CustomAvatar
                bgColor={project?.project_manager?.avatar_color}
                avatarSrc={project?.project_manager?.avatar}
                size={40}
                userName={project?.project_manager?.name}
              />
              <Typography>{project?.project_manager?.name}</Typography>
            </div>
          ) : (
            <Select
              options={
                project?.project_manager_id &&
                pms?.users.findIndex(
                  (user) => project.project_manager_id === user.user_id
                )
                  ? addedMissingPMList()
                  : pms?.users?.map((pm) => {
                      return {
                        label: (
                          <Space>
                            <CustomAvatar
                              bgColor={pm.avatar_color}
                              avatarSrc={pm.avatar}
                              size={32}
                              userName={pm.name}
                            />
                            <Typography>{pm.name}</Typography>
                          </Space>
                        ),
                        value: pm.user_id,
                      };
                    })
              }
              size='large'
            />
          )}
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
  );
};
