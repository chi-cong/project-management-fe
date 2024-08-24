import {
  Button,
  Form,
  FormInstance,
  FormProps,
  Input,
  message,
  Space,
} from "antd";
import { useUpdateMngDepartmentMutation } from "src/share/services";
import React from "react";

interface DepartmentInfo {
  name?: string;
  description?: string;
  id?: string;
  form: FormInstance;
}

const InfoTabs: React.FC<DepartmentInfo> = ({ form, id }) => {
  const [updateDepartment] = useUpdateMngDepartmentMutation();

  const onFinish: FormProps<DepartmentInfo>["onFinish"] = async (values) => {
    const sentValues = {
      name: values.name,
      description: values.description,
    };
    await updateDepartment({
      body: { ...sentValues },
      departmentId: id,
    })
      .unwrap()
      .then(() => {
        message.success("Department updated successfully");
      })
      .catch((e) => {
        message.error(e.data.message);
      });
  };

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
              Update
            </Button>
          </Space>
        </Form.Item>
      </Form>
    </>
  );
};

export default InfoTabs;
