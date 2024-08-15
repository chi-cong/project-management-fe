import { Button, Table } from "antd";
import { CustomAvatar } from "../v2";
import { useGetUsersQuery } from "src/share/services";
import { RoleResponse } from "src/share/models";

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
const AddManagerTabs = ({
  setManagerId,
  managerId,
}: {
  setManagerId: (id: string) => void;
  managerId: string;
}) => {
  const { data } = useGetUsersQuery({ role: "MANAGER", items_per_page: "ALL" });

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
      render: (_text: string, record: DataType) => {
        if (record.key === managerId) {
          return (
            <Button type='primary' onClick={() => setManagerId("")}>
              Unassign
            </Button>
          );
        } else {
          return (
            <Button
              type='primary'
              onClick={() => setManagerId(record.key || "")}
            >
              Assign
            </Button>
          );
        }
      },
    },
  ];

  const dataTableMapper = () => {
    return data?.users
      .filter((user) => {
        return !user.department_id;
      })
      .map((user) => {
        return {
          avatar: {
            src: user.avatar,
            bgColor: user.avatarColor,
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
