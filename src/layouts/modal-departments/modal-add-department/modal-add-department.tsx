import React, { useState } from "react";
import {
  Modal,
  Button,
  message,
  Steps,
  theme,
  Input,
  List,
  Avatar,
  Checkbox,
} from "antd";
import { useAddDepartmentMutation } from "src/share/services";
import { useGetUsersQuery } from "src/share/services";
import { OUserRole, User } from "src/share/models";
import "./modal-add-department.css";
import { randAvaBg } from "src/share/utils";
import { useRoleChecker } from "src/share/hooks";

const { TextArea } = Input;

type ModalAddDepartmentProps = {
  visible: boolean;
  setVisible: React.Dispatch<React.SetStateAction<boolean>>;
};

export const ModalAddDepartment = ({
  visible,
  setVisible,
}: ModalAddDepartmentProps) => {
  const { token } = theme.useToken();
  const [current, setCurrent] = useState(0);
  const [listStaffs, setListStaffs] = useState<string[]>([]);
  const [manager, setManager] = useState<string | undefined>(undefined);
  const [name, setName] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [selectedItem, setSelectedItem] = useState<User | null>(null);
  const contentStyle: React.CSSProperties = {
    lineHeight: "260px",
    textAlign: "center",
    color: token.colorTextTertiary,
    backgroundColor: token.colorFillAlter,
    borderRadius: token.borderRadiusLG,
    border: `1px dashed ${token.colorBorder}`,
    marginTop: 16,
  };

  const checkRole = useRoleChecker();

  const { data: managerData } = useGetUsersQuery(
    { role: "MANAGER" },
    { skip: !checkRole(OUserRole.Admin) }
  );
  const { data: staffData } = useGetUsersQuery(
    { role: "STAFF" },
    { skip: !checkRole(OUserRole.Admin) }
  );

  const handleCheckChangeStaff = (
    checked: boolean,
    userId: string | undefined
  ) => {
    if (userId) {
      if (checked) {
        setListStaffs((prevStaffs) => [...prevStaffs, userId]);
      } else {
        setListStaffs((prevStaffs) =>
          prevStaffs.filter((user) => user !== userId)
        );
      }
    }
  };

  const resetModalState = () => {
    setCurrent(0);
    setListStaffs([]);
    setManager(undefined);
    setName("");
    setDescription("");
    setSelectedItem(null);
  };

  const steps = [
    {
      title: "First",
      content: (
        <div className='create-departments-step1'>
          <div className='create-departments-step1-title'>
            <label>Name</label>
            <div className='input-title'>
              <Input
                placeholder='Department name'
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
          </div>
          <div className='create-departments-step1-decription'>
            <label>Description</label>
            <div className='input-decription'>
              <TextArea
                rows={4}
                placeholder='Department decription'
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>
          </div>
        </div>
      ),
    },
    {
      title: "Second",
      content: (
        <>
          <List
            className='list-user'
            itemLayout='horizontal'
            dataSource={
              managerData?.users.filter(
                (user) => user?.department_id === null
              ) ?? []
            }
            renderItem={(item) => (
              <List.Item
                onClick={() => {
                  if (selectedItem === item) {
                    setSelectedItem(null);
                    setManager(undefined);
                  } else {
                    setSelectedItem(item);
                    setManager(item.user_id);
                  }
                }}
                style={
                  item === selectedItem ? { backgroundColor: "#f0f0f0" } : {}
                }
              >
                <List.Item.Meta
                  avatar={
                    <Avatar
                      {...(item?.avatar
                        ? {
                            style: {
                              background: randAvaBg(),
                              fontSize: "25px",
                            },
                          }
                        : { src: item.avatar })}
                      size={50}
                    >
                      {!item?.avatar &&
                        item?.username?.substring(0, 1).toUpperCase()}
                    </Avatar>
                  }
                  title={<a href=''>{item.name}</a>}
                  description={item.email}
                />
              </List.Item>
            )}
            pagination={{ pageSize: 5 }}
          />
        </>
      ),
    },
    {
      title: "Last",
      content: (
        <>
          <List
            className='list-user'
            itemLayout='horizontal'
            dataSource={
              staffData?.users.filter((user) => user?.department_id === null) ??
              []
            }
            renderItem={(item) => (
              <List.Item>
                <List.Item.Meta
                  avatar={
                    <Avatar
                      {...(item?.avatar
                        ? {
                            style: {
                              background: randAvaBg(),
                              fontSize: "25px",
                            },
                          }
                        : { src: item.avatar })}
                      size={50}
                    >
                      {!item?.avatar &&
                        item?.username?.substring(0, 1).toUpperCase()}
                    </Avatar>
                  }
                  title={<p>{item.name}</p>}
                  description='this is staff'
                />

                <Checkbox
                  onChange={(e) =>
                    handleCheckChangeStaff(e.target.checked, item.user_id)
                  }
                />
              </List.Item>
            )}
            pagination={{ pageSize: 5 }}
          />
        </>
      ),
    },
  ];

  const next = () => {
    setCurrent(current + 1);
  };

  const prev = () => {
    setCurrent(current - 1);
  };

  const items = steps.map((item) => ({ key: item.title, title: item.title }));

  const [addDepartment] = useAddDepartmentMutation();

  const handleAddDepartment = async () => {
    try {
      await addDepartment({
        name,
        description,
        manager_id: manager,
        list_user_ids: listStaffs,
      });
      message.success("Department added successfully!");
      setVisible(false);
      resetModalState();
    } catch (error) {
      message.error("Failed to add department!");
    }
  };

  return (
    <>
      <Modal
        title='Create Department'
        open={visible}
        onOk={handleAddDepartment}
        onCancel={() => {
          setVisible(false);
          resetModalState();
        }}
        okText='Save'
        className='modal-add-department'
        width={600}
      >
        <Steps current={current} items={items} />
        <div style={contentStyle}>{steps[current].content}</div>
        <div style={{ marginTop: 24 }}>
          {current < steps.length - 1 && (
            <Button type='primary' onClick={() => next()}>
              Next
            </Button>
          )}
          {current > 0 && (
            <Button style={{ margin: "0 8px" }} onClick={() => prev()}>
              Previous
            </Button>
          )}
        </div>
      </Modal>
    </>
  );
};
