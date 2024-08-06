import React, { useState } from "react";
import {
  Modal,
  Radio,
  Input,
  Avatar,
  List,
  Checkbox,
  Pagination,
  Button,
} from "antd";
import VirtualList from "rc-virtual-list";
import { SearchOutlined, UserOutlined } from "@ant-design/icons";
import type { RadioChangeEvent } from "antd";
import { useManagerGetStaffNoDepartmentQuery } from "src/share/services";
import { useGetUsersQuery } from "src/share/services";
import { useCreateUserMutation } from "src/share/services";
import { useAddStaffDepartmentMutation } from "src/share/services";
import { OUserRole, User } from "src/share/models/accountModels";
import { Department } from "src/share/models";
import "./modal-add-staffs-departments.css";
import { randAvaBg } from "src/share/utils";
import { useRoleChecker } from "src/share/hooks";

type ModalAddStaffsDepartmentProps = {
  visible: boolean;
  setVisible: React.Dispatch<React.SetStateAction<boolean>>;
  department?: Department;
  detailDepartment?: Department;
  role?: string;
};

const ContainerHeight = 300;

export const ModalAddStaffsDepartment = ({
  visible,
  setVisible,
  department,
  detailDepartment,
  role,
}: ModalAddStaffsDepartmentProps) => {
  const [value, setValue] = useState(1);
  const [searchValue, setSearchValue] = useState("");
  const [listStaff, setListStaff] = useState<(string | undefined)[]>([]);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [checkedItems, setCheckedItems] = useState<boolean[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const checkRole = useRoleChecker();

  const itemsPerPage = 6;

  const onChange = (e: RadioChangeEvent) => {
    setValue(e.target.value);
  };

  const handleCheckChange = (index: number, id: string | undefined) => {
    setCheckedItems((prevState) => {
      const newState = [...prevState];
      newState[index] = !newState[index];
      if (newState[index]) {
        setListStaff((prevList) => [...prevList, id]);
      } else {
        setListStaff((prevList) =>
          prevList.filter((staffId) => staffId !== id)
        );
      }
      return newState;
    });
  };

  const { data: staffData } = useGetUsersQuery(
    {
      role: "STAFF",
      search: searchValue,
    },
    { skip: !checkRole(OUserRole.Admin) }
  );
  const { data: staffNoDepartmentData } = useManagerGetStaffNoDepartmentQuery({
    search: searchValue,
  });
  const [addStaffDepartment] = useAddStaffDepartmentMutation();
  const [createUserDepartment] = useCreateUserMutation();

  const handleAddStaffDepartment = async () => {
    const filteredListStaff = listStaff.filter((id) => id !== undefined);
    await addStaffDepartment({
      departmentId:
        role === "MANAGER"
          ? detailDepartment?.department_id
          : department?.department_id,
      listStaff: filteredListStaff,
    })
      .unwrap()
      .then()
      .catch();
  };

  const handleCreateUserDepartment = async () => {
    await createUserDepartment({
      username,
      email,
      password,
      role: "STAFF",
      department_id: department?.department_id,
    })
      .unwrap()
      .then()
      .catch();
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(event.target.value);
  };

  const resetState = () => {
    setValue(1);
    setSearchValue("");
    setListStaff([]);
    setUsername("");
    setPassword("");
    setEmail("");
    setCheckedItems([]);
    setCurrentPage(1);
  };

  return (
    <>
      <Modal
        title='Add Staffs To Department'
        open={visible}
        onCancel={() => {
          setVisible(false);
          resetState();
        }}
        width={700}
        footer={null}
      >
        <hr />
        <div className='Change-select-staff-option'>
          <Radio.Group
            className='group-radio-select-add-staffs'
            value={value}
            onChange={onChange}
          >
            <div className={`select-staffs ${value === 1 ? "active" : ""}`}>
              <Radio value={1}>All Staffs</Radio>
            </div>
            {role !== "MANAGER" ? (
              <div className={`create-staffs ${value === 2 ? "active" : ""}`}>
                <Radio value={2}>Create new staff</Radio>
              </div>
            ) : null}
          </Radio.Group>
        </div>
        <div className={`select-staffs-content ${value === 2 ? "hidden" : ""}`}>
          <p>Choose who can join this department</p>
          {role !== "MANAGER" ? (
            <div className='searchbar-staffs '>
              <Input
                size='large'
                placeholder='Search staffs....'
                prefix={
                  <div className='icon-search-staffs'>
                    <SearchOutlined />
                  </div>
                }
                value={searchValue}
                onChange={handleSearchChange}
              />
            </div>
          ) : null}
          <hr />
          <div className='list-add-staffs'>
            <List>
              {role !== "MANAGER" ? (
                <VirtualList
                  data={
                    staffData?.users
                      .filter((user) => user?.department_id === null)
                      .slice(
                        (currentPage - 1) * itemsPerPage,
                        currentPage * itemsPerPage
                      ) ?? []
                  }
                  height={ContainerHeight}
                  itemHeight={47}
                  itemKey='email'
                >
                  {(item: User, index: number) => (
                    <List.Item key={item.email}>
                      <List.Item.Meta
                        avatar={
                          <Avatar
                            {...(!item?.avatar
                              ? {
                                  style: { background: randAvaBg() },
                                }
                              : { src: item.avatar })}
                            size={25}
                          >
                            {!item?.avatar &&
                              item?.username?.substring(0, 1).toUpperCase()}
                          </Avatar>
                        }
                        title={item.username}
                        description={item.name}
                      />
                      <Checkbox
                        className='checkbox-staff'
                        checked={checkedItems[index]}
                        onChange={() => handleCheckChange(index, item.user_id)}
                      />
                    </List.Item>
                  )}
                </VirtualList>
              ) : (
                <VirtualList
                  data={
                    staffNoDepartmentData?.users
                      .filter((user) => user?.department_id === null)
                      .slice(
                        (currentPage - 1) * itemsPerPage,
                        currentPage * itemsPerPage
                      ) ?? []
                  }
                  height={ContainerHeight}
                  itemHeight={47}
                  itemKey='email'
                >
                  {(item: User, index: number) => (
                    <List.Item key={item.email}>
                      <List.Item.Meta
                        avatar={
                          <Avatar
                            {...(!item?.avatar
                              ? {
                                  style: { background: randAvaBg() },
                                }
                              : { src: item.avatar })}
                            size={25}
                          >
                            {!item?.avatar &&
                              item?.username?.substring(0, 1).toUpperCase()}
                          </Avatar>
                        }
                        title={item.username}
                        description={item.name}
                      />
                      <Checkbox
                        className='checkbox-staff'
                        checked={checkedItems[index]}
                        onChange={() => handleCheckChange(index, item.user_id)}
                      />
                    </List.Item>
                  )}
                </VirtualList>
              )}
            </List>
            <Pagination
              current={currentPage}
              total={staffData?.users.length}
              pageSize={itemsPerPage}
              onChange={setCurrentPage}
            />
            <div className='button-save-staffs'>
              <Button
                type='primary'
                onClick={async () => {
                  await handleAddStaffDepartment();
                  setVisible(false);
                  resetState();
                }}
              >
                Save
              </Button>
            </div>
          </div>
        </div>
        <div
          className={`select-create-new-staffs ${value === 2 ? "" : "hidden"}`}
        >
          <div className='title-add-staff'>
            <UserOutlined />
            <h2>Add staff</h2>
          </div>

          <hr />
          <form action='' className='form-add-staff'>
            <div className='input-add-staff'>
              <strong>Username</strong>
              <Input
                placeholder='diepvt123'
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
            <div className='input-add-staff'>
              <strong>Password</strong>
              <Input
                type='password'
                placeholder='Password'
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <div className='input-add-staff'>
              <div className='email-phone-staff'>
                <div className='email-staff'>
                  <strong>Email</strong>
                  <Input
                    placeholder='Email'
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                <div className='phone-number-staff'>
                  <strong>Role</strong>
                  <Input placeholder='Staff' disabled />
                </div>
              </div>
            </div>
            <div className='input-add-staff'>
              <strong>Deparment</strong>
              <div className='department-staff'>
                <Input placeholder={department?.name} disabled />
              </div>
            </div>
            <div className='button-save-staffs'>
              <Button
                type='primary'
                onClick={async () => {
                  await handleCreateUserDepartment();
                  setVisible(false);
                  resetState();
                }}
              >
                Save
              </Button>
            </div>
          </form>
        </div>
      </Modal>
    </>
  );
};
