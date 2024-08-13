import { Button, message, Table } from "antd";
import { CustomAvatar } from "src/components/v2";
import { RoleResponse } from "src/share/models";
import {
  useGetUsersQuery,
  useUpdateManagerDepartmentMutation,
} from "src/share/services";

interface DataType {
  key?: string;
  name?: string;
  age?: number;
  role?: string;
  email?: string;
}
const AddManagerTabs = ({ id }: { id?: string }) => {
  const { data } = useGetUsersQuery({ role: "MANAGER", items_per_page: "ALL" });
  const [updateManager] = useUpdateManagerDepartmentMutation();

  const columns = [
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
      render: (_text: string, record: DataType) => (
        <Button
          type='primary'
          onClick={() => {
            updateManager({
              managerId: record.key,
              departmentId: id,
            })
              .unwrap()
              .then(() => message.success("Updated User"))
              .catch(() => message.error("failed to update manager"));
          }}
        >
          Assign
        </Button>
      ),
    },
  ];

  const dataTableMapper = () => {
    return data?.users.map((user): DataType => {
      return {
        key: user.user_id,
        email: user.email,
        name: user.name,
        role: (user?.role as RoleResponse).name,
      };
    });
  };

  return (
    <Table
      columns={columns}
      dataSource={dataTableMapper()}
      pagination={false}
    />
  );
};

export default AddManagerTabs;
