import { Button, Form, FormProps, Input, Space } from "antd";

interface CreateDepartment {
  name?: string;
  description?: string;
}
const InfoTabs = ({
  setFields,
}: {
  setFields: (field: CreateDepartment) => void;
}) => {
  const [form] = Form.useForm();

  const onFinish: FormProps<CreateDepartment>["onFinish"] = async (values) => {
    setFields(values);
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
          <Form.Item<CreateDepartment>
            name='name'
            label='Name'
            rules={[{ required: true, message: "Name is required" }]}
          >
            <Input placeholder='Name...' size='large' />
          </Form.Item>
        </div>
        <div>
          <Form.Item<CreateDepartment> name='description' label='Description'>
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
