import { CardAccount } from "src/components/card-account";
import "./account.css";
import { Button, Dropdown, Input, List, MenuProps, message, Space } from "antd";
import {
  DownOutlined,
  SearchOutlined,
  DeleteOutlined,
  PlusOutlined,
} from "@ant-design/icons";
import { useState } from "react";
import { useGetUsersQuery } from "src/share/services";
import ModalCreateUser from "src/components/modal-create-user";
import { UserRole, OUserRole } from "src/share/models";
export const Account = () => {
  const [queries] = useState<{
    role: UserRole;
    page: number | undefined;
  }>({ role: OUserRole.All, page: 1 });

  const { data } = useGetUsersQuery({
    ...queries,
    items_per_page: 9,
  });

  const items: MenuProps["items"] = [
    {
      label: "Admin",
      key: OUserRole.Admin,
    },
    {
      label: "Staff",
      key: OUserRole.Staff,
    },
    {
      label: "Project Manager",
      key: OUserRole.ProjectManager,
    },
    {
      label: "Manager",
      key: OUserRole.Manager,
    },
  ];
  const [isModalOpen, setIsModalOpen] = useState(false);
  const handleMenuClick: MenuProps["onClick"] = () => {
    message.info("Click on menu item.");
  };
  const menuProps = {
    items,
    onClick: handleMenuClick,
  };
  return (
    <div className='v2-account-page'>
      <section className='main'>
        <header className='main-header'>
          <section className='first-sec'>
            <div className='title-des'>
              <div className='title-row'>
                <h2>Account</h2>
              </div>
            </div>
            <div className='action'>
              <Space>
                <Dropdown menu={menuProps}>
                  <Button>
                    <Space>
                      Roles
                      <DownOutlined />
                    </Space>
                  </Button>
                </Dropdown>
                <Input placeholder='Search...' prefix={<SearchOutlined />} />
                <Button
                  type='default'
                  className='title-row-btn'
                  icon={<DeleteOutlined />}
                >
                  Trash
                </Button>
                <Button
                  type='primary'
                  className='title-row-btn'
                  icon={<PlusOutlined />}
                  onClick={() => setIsModalOpen(true)}
                >
                  Create User
                </Button>
              </Space>
            </div>
          </section>
        </header>
        <main>
          <List
            grid={{
              gutter: 12,
              xs: 2,
              sm: 2,
              md: 2,
              lg: 2,
              xl: 2,
              xxl: 2,
            }}
            dataSource={data?.users}
            renderItem={(user) => (
              <List.Item>
                <CardAccount userId={user.user_id} account={user} />
              </List.Item>
            )}
          />
        </main>
      </section>
      <ModalCreateUser
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
      ></ModalCreateUser>
    </div>
  );
};
