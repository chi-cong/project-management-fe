import {
  Button,
  DatePicker,
  Dropdown,
  Form,
  FormProps,
  Input,
  MenuProps,
  message,
  Modal,
  Select,
  Space,
} from "antd";
import React from "react";
import "./modal-create-project.css";
import { DownOutlined } from "@ant-design/icons";
import { Dayjs } from "dayjs";
import { UserRole } from "src/share/models";
import { userRoleOptions } from "src/share/utils";
const { RangePicker } = DatePicker;
type ModalCreateProject = {
  isModalOpen: boolean;
  setIsModalOpen: (show: boolean) => void;
};
interface ProjectInfo {
  projectname?: string;
  projectcode?: string;
  investor: string;
  description: string;
  department: UserRole;
  projectmanager?: UserRole;
  date?: string | Dayjs;
}
const ModalCreateProject: React.FC<ModalCreateProject> = ({
  isModalOpen,
  setIsModalOpen,
}) => {
  const handleOk = () => {
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };
  const items: MenuProps["items"] = [
    {
      label: "Admin",
      key: "ADMIN",
    },
    {
      label: "Staff",
      key: "STAFF",
    },
    {
      label: "Project Manager",
      key: "PROJECT_MANAGER",
    },
    {
      label: "Manager",
      key: "MANAGER",
    },
  ];
  const handleMenuClick: MenuProps["onClick"] = (e) => {};
  const menuProps = {
    items,
    onClick: handleMenuClick,
  };
  const onFinish: FormProps<ProjectInfo>["onFinish"] = async (values) => {
    // const sentValues = {
    //   projectname: values.projectname,
    //   projectcode: values.projectcode,
    //   investor: values.investor,
    //   description: values.description,
    //   department: values.department,
    //   projectmanager: values.projectmanager,
    //   date: values.date,
    // };
    // await createUser(sentValues)
    //   .unwrap()
    //   .then(() => {
    //     setIsModalOpen(false);
    //     message.success("New user is created");
    //   })
    //   .catch((e) => {
    //     message.error(e.data.message);
    //   });
  };
  return (
    <Modal
      className="wrapper"
      open={isModalOpen}
      centered
      onOk={handleOk}
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
      <Form name="create-project" layout="vertical" onFinish={onFinish}>
        <div>
          <Form.Item<ProjectInfo>
            name="projectname"
            label="ProjectName"
            rules={[{ required: true, message: "Project name is required" }]}
          >
            <Input placeholder="Project Name..." size="large" />
          </Form.Item>
        </div>
        <div>
          <Form.Item<ProjectInfo>
            name="projectcode"
            label="Projectcode"
            rules={[{ required: true, message: "Project code is required" }]}
          >
            <Input placeholder="Project Code..." size="large" />
          </Form.Item>
        </div>
        <div>
          <Form.Item<ProjectInfo>
            name="investor"
            label="Investor"
            rules={[{ required: true, message: "Investor is required" }]}
          >
            <Input placeholder="Investor..." size="large" />
          </Form.Item>
        </div>
        <div>
          <Form.Item<ProjectInfo>
            name="description"
            label="Description"
            rules={[{ required: true, message: "Description is required" }]}
          >
            <Input placeholder="Description..." size="large" />
          </Form.Item>
        </div>
        <div>
          <Form.Item<ProjectInfo>
            name="department"
            label="Department"
            rules={[{ required: true, message: "Department is required" }]}
          >
            <Select options={userRoleOptions} size="large" />
          </Form.Item>
        </div>
        <div>
          <Form.Item<ProjectInfo>
            name="projectmanager"
            label="Projectmanager"
            rules={[{ required: true, message: "Project Manager is required" }]}
          >
            <Select options={userRoleOptions} size="large" />
          </Form.Item>
        </div>
        <div>
          <Form.Item<ProjectInfo>
            name="date"
            label=" Date"
            rules={[{ required: true, message: "Date is required" }]}
          >
            <RangePicker
              showTime
              style={{
                width: "100%",
              }}
            />
          </Form.Item>
        </div>
      </Form>
      {/* <Space direction="vertical" size="middle" style={{ display: "flex" }}>
        <div>
          <span>Project Name</span>
          <Input placeholder="Project name..." size="large" />
        </div>
        <div>
          <span>Project Code</span>
          <Input placeholder="Project code..." size="large" />
        </div>
        <div>
          <span>Investor</span>
          <Input placeholder="Investor..." size="large" />
        </div>
        <div>
          <span>Description</span>
          <Input placeholder="Description..." size="large" />
        </div>

        <div>
          <span>Department</span>
          <Dropdown menu={menuProps}>
            <Button
              style={{
                width: "100%",
                display: "flex",
                alignItems: "center",
              }}
            >
              <Space
                style={{
                  width: "100%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                Progress
                <DownOutlined />
              </Space>
            </Button>
          </Dropdown>
        </div>
        <div>
          <span>Project Manager</span>
          <Dropdown menu={menuProps}>
            <Button
              style={{
                width: "100%",
                display: "flex",
                alignItems: "center",
              }}
            >
              <Space
                style={{
                  width: "100%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                Project
                <DownOutlined />
              </Space>
            </Button>
          </Dropdown>
        </div>
        <div>
          <span>Date</span>
          <RangePicker
            showTime
            style={{
              width: "100%",
            }}
          />
        </div>
      </Space> */}
    </Modal>
  );
};

export default ModalCreateProject;
