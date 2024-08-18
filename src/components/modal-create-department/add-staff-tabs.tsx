import { Table } from "antd";
import React from "react";
import { CustomAvatar } from "../v2";
import { ColumnsType } from "antd/es/table";
import { useManagerGetStaffNoDepartmentQuery } from "src/share/services";
import { RoleResponse } from "src/share/models";

interface DataType {
  avatar: {
    src?: string;
    bgColor?: string;
  };
  key?: string;
  name?: string;
  role?: string;
  email?: string;
}

const AddStaffTabs = ({
  setStaffList,
}: {
  setStaffList: (staffs: string[]) => void;
  staffList: string[];
}) => {
  const columns: ColumnsType<DataType> = [
    {
      title: "Avatar",
      dataIndex: "avatar",
      key: "avatar",
      render: (_: string, record: DataType) => (
        <CustomAvatar
          size={50}
          userName={record.name}
          avatarSrc={record.avatar.src}
          bgColor={record.avatar.bgColor}
        />
      ),
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Role",
      dataIndex: "role",
      key: "role",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
  ];
  const { data: noDepartStaffs } = useManagerGetStaffNoDepartmentQuery({});
  const rowSelection = {
    onChange: async (
      _selectedRowKeys: React.Key[],
      selectedStaffs: DataType[]
    ) => {
      setStaffList(selectedStaffs.map((row) => row.key!));
    },
    getCheckboxProps: (record: DataType) => ({
      disabled: record.name === "Disabled User",
      name: record.name,
    }),
  };

  const dataTableMapper = () => {
    return noDepartStaffs?.users.map((user): DataType => {
      return {
        avatar: {
          src: user.avatar,
          bgColor: user.avatar_color,
        },
        key: user.user_id,
        email: user.email,
        name: user.name,
        role: (user?.role as RoleResponse).name,
      };
    });
  };

  return (
    <div>
      <Table
        rowSelection={{
          type: "checkbox",
          ...rowSelection,
        }}
        columns={columns}
        dataSource={dataTableMapper()}
      />
    </div>
  );
};

export default AddStaffTabs;
