import { Button, Form, FormProps, Input, message, Space } from "antd";
import { useUpdateDepartmentMutation } from "src/share/services";
import React, { useEffect } from "react";

interface DepartmentInfo {
  name?: string;
  description?: string;
}

const InfoTabs: React.FC<DepartmentInfo> = ({ name, description }) => {
  const [form] = Form.useForm();
  const [updateDepartment] = useUpdateDepartmentMutation();

  const onFinish: FormProps<DepartmentInfo>["onFinish"] = async (values) => {
    const sentValues = {
      name: values.name,
      description: values.description,
    };
    await updateDepartment({
      body: { ...sentValues },
      departmentId: "66aa0782193b7aa0827eace0",
    })
      .unwrap()
      .then(() => {
        message.success("Department updated successfully");
      })
      .catch((e) => {
        message.error(e.data.message);
      });
  };

  useEffect(() => {
    form.setFieldsValue({ name, description });
  }, [name, description]);

  return (
    <>
      <Form
        form={form}
        name='update-department'
        onFinish={onFinish}
        layout='vertical'
      >
        <div>
          <Form.Item<DepartmentInfo>
            name='name'
            label='Name'
            rules={[{ required: true, message: "Name is required" }]}
          >
            <Input placeholder='Name...' size='large' />
          </Form.Item>
        </div>
        <div>
          <Form.Item<DepartmentInfo> name='description' label='Description'>
            <Input placeholder='Description...' size='large' />
          </Form.Item>
        </div>
        <Form.Item className='create-user-form-btn'>
          <Space>
            <Button type='primary' htmlType='submit' size='large'>
              Save
            </Button>
            <Button type='primary' ghost size='large'>
              Cancel
            </Button>
          </Space>
        </Form.Item>
      </Form>
    </>
  );
};

export default InfoTabs;
