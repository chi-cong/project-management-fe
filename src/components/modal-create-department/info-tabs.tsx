import { Form, FormProps, Input } from "antd";

interface CreateDepartment {
  name?: string;
  description?: string;
}
const InfoTabs = ({
  setFields,
}: {
  setFields: (field: CreateDepartment) => void;
}) => {
  return (
    <>
      <Form
        name='update-department'
        layout='vertical'
        onValuesChange={(_changedValue, values) => {
          console.log(values);
          setFields(values);
        }}
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
