import React from "react";
import { Modal, Form, Input, Avatar, DatePicker } from "antd";
import dayjs from "dayjs";
import "./modal-department-manager.css";
import { Department } from "src/share/models";
import { randAvaBg } from "src/share/utils";

type ModalDepartmentManagerProps = {
  visible: boolean;
  setVisible: React.Dispatch<React.SetStateAction<boolean>>;
  manager?: string;
  department?: Department;
  detailDepartment?: Department;
  role?: string;
};

export const ModalDepartmentManager = ({
  visible,
  setVisible,
  department,
  detailDepartment,
  role,
}: ModalDepartmentManagerProps) => {
  const getBirthday = () => {
    const birthday =
      role === "MANAGER"
        ? detailDepartment?.information?.manager?.birthday
        : department?.information?.manager?.birthday;

    return birthday ? dayjs(birthday) : null;
  };

  return (
    <Modal
      title='INFORMATION MANAGER'
      open={visible}
      onOk={() => setVisible(false)}
      onCancel={() => setVisible(false)}
      width={900}
    >
      <Form layout='vertical'>
        <div className='main-layout'>
          <div className='layout-1'>
            <Form.Item className='avatar-manager-department'>
              <Avatar
                {...(!department?.information?.manager
                  ? {
                      style: { background: randAvaBg(), fontSize: "80px" },
                    }
                  : { src: department.information.manager.avatar })}
                size={160}
              >
                {!department?.information?.manager?.avatar &&
                  department?.information?.manager?.username
                    ?.substring(0, 1)
                    .toUpperCase()}
              </Avatar>
            </Form.Item>
            <Form.Item label='Role'>
              <Input value='manager' readOnly />
            </Form.Item>
          </div>
          <div className='layout-2'>
            <Form.Item label='Username'>
              <Input
                value={
                  role === "MANAGER"
                    ? detailDepartment?.information?.manager?.username
                    : department?.information?.manager?.username
                }
                readOnly
              />
            </Form.Item>
            <Form.Item label='Name'>
              <Input
                value={
                  role === "MANAGER"
                    ? detailDepartment?.information?.manager?.name
                    : department?.information?.manager?.name
                }
                readOnly
              />
            </Form.Item>
          </div>
          <div className='layout-3'>
            <Form.Item label='Email'>
              <Input
                value={
                  role === "MANAGER"
                    ? detailDepartment?.information?.manager?.email
                    : department?.information?.manager?.email
                }
                readOnly
              />
            </Form.Item>
            <Form.Item label='Phone'>
              <Input
                value={
                  role === "MANAGER"
                    ? detailDepartment?.information?.manager?.phone
                    : department?.information?.manager?.phone
                }
                readOnly
              />
            </Form.Item>
            <Form.Item label='Birthday'>
              <DatePicker value={getBirthday()} format='DD/MM/YYYY' disabled />
            </Form.Item>
          </div>
        </div>
      </Form>
    </Modal>
  );
};
