import { Button, message, Table } from "antd";
import { CustomAvatar } from "src/components/v2";
import { RoleResponse } from "src/share/models";
import {
  useGetUsersQuery,
  useUpdateManagerDepartmentMutation,
} from "src/share/services";

interface DataType {
  avatar: {
    src?: string;
    bgColor?: string;
  };
  key?: string;
  name?: string;
  age?: number;
  role?: string;
  email?: string;
}
const AddManagerTabs = ({ id }: { id?: string }) => {
  const { data } = useGetUsersQuery({
    role: "MANAGER",
    items_per_page: "ALL",
    haveDepartment: false,
  });
  const [updateManager] = useUpdateManagerDepartmentMutation();

  const columns = [
    {
      title: "Avatar",
      dataIndex: "avatar",
      key: "avatar",
      render: (_: string, record: DataType) => (
        <CustomAvatar
          size={50}
          userName={record.name}
          avatarSrc={record.avatar.src}
          bgColor={record.avatar.src}
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
        avatar: {
          bgColor: user.avatar_color,
          src: user.avatar,
        },
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
