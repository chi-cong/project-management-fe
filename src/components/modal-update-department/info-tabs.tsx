import { Input, Space } from "antd";

const InfoTabs = () => {
  return (
    <Space direction='vertical' size='middle' style={{ width: "100%" }}>
      <div>
        <span>Name</span>
        <Input placeholder='Name...' size='large' />
      </div>
      <div>
        <span>Description</span>
        <Input placeholder='Description...' size='large' />
      </div>
    </Space>
  );
};

export default InfoTabs;
