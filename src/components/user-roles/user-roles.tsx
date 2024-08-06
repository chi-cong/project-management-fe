import React from "react";
import "./user-roles.css";
import { UserOutlined } from '@ant-design/icons';
import { Avatar, Space } from 'antd';

const UserRoles: React.FC = () => (
    <Space direction="vertical" size={16}>
      <Space wrap size={16}>
        <Avatar className= "avatar-roles"size={29} icon={<UserOutlined />} />
      </Space>
    </Space>
)
export {UserRoles}