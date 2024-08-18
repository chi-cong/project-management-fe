import { Form, Input } from "antd";
import { useEffect } from "react";

interface CreateDepartment {
  name?: string;
  description?: string;
}
const InfoTabs = ({
  setFields,
  fields,
}: {
  setFields: (field: CreateDepartment) => void;
  fields: CreateDepartment;
}) => {
  const [form] = Form.useForm();

  useEffect(() => {
    form.setFieldsValue(fields);
  }, [fields, form]);

  return (
    <>
      <Form
        name='update-department'
        layout='vertical'
        onValuesChange={(_changedValue, values) => {
          setFields(values);
        }}
        form={form}
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
      </Form>
    </>
  );
};

export default InfoTabs;
