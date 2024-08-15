import { Button, message, Table } from "antd";
import React, { useState } from "react";
import { CustomAvatar } from "src/components/v2";
import { ColumnsType } from "antd/es/table";
import {
  useManagerGetAllStaffDepartmentQuery,
  useDeleteStaffDepartmentMutation,
} from "src/share/services";
import { RoleResponse } from "src/share/models";

interface DataType {
  key?: string;
  name?: string;
  role?: string;
  email?: string;
}

export const MngRmDepartStaff = ({
  departmentId,
}: {
  departmentId?: string;
}) => {
  const columns: ColumnsType<DataType> = [
    {
      title: "Avatar",
      dataIndex: "avatar",
      key: "avatar",
      render: () => <CustomAvatar size={50} userName='Dat' />,
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
    {
      title: "Action",
      key: "action",
      render: (_: string, record: DataType) => (
        <Button
          type='primary'
          onClick={() => [
            rmDepartmentStaff({
              departmentId,
              listStaff: [record.key] as string[],
            })
              .unwrap()
              .then(() => message.success("Removed memeber"))
              .catch(() => message.error("Failed to remove member")),
          ]}
        >
          Remove
        </Button>
      ),
    },
  ];
  const [selectedRows, setSelectedRows] = useState<DataType[]>([]);
  const [rmDepartmentStaff] = useDeleteStaffDepartmentMutation();
  const { data: departStaffs } = useManagerGetAllStaffDepartmentQuery({
    items_per_page: "ALL",
  });
  const rowSelection = {
    onChange: (_selectedRowKeys: React.Key[], selectedRows: DataType[]) => {
      setSelectedRows(selectedRows);
    },
    getCheckboxProps: (record: DataType) => ({
      disabled: record.name === "Disabled User",
      name: record.name,
    }),
  };

  const dataTableMapper = () => {
    return departStaffs?.users.map((user): DataType => {
      return {
        key: user.user_id,
        email: user.email,
        name: user.name,
        role: (user?.role as RoleResponse).name,
      };
    });
  };

  return (
    <div>
      {selectedRows.length > 0 && (
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "start",
          }}
        >
          <Button
            type='primary'
            onClick={() => {
              rmDepartmentStaff({
                departmentId,
                listStaff: selectedRows.map((row) => row.key) as string[],
              })
                .unwrap()
                .then(() => message.success("Removed memebers"))
                .catch(() => message.error("Failed to remove members"));
            }}
          >
            Assign
          </Button>
        </div>
      )}
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