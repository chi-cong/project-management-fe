import React, { useState } from "react";
import { Modal, Col, Divider, Row, Avatar, Checkbox, message } from "antd";
import "./modal-add-manager.css";
import { useGetUsersQuery } from "src/share/services";
import { useUpdateManagerDepartmentMutation } from "src/share/services/departmentServices";
import { Department, OUserRole } from "src/share/models";
import { randAvaBg } from "src/share/utils";
import { useRoleChecker } from "src/share/hooks";

type ModalAddManagerProps = {
  visible: boolean;
  setVisible: React.Dispatch<React.SetStateAction<boolean>>;
  department?: Department;
};

export const ModalAddManager = ({
  visible,
  setVisible,
  department,
}: ModalAddManagerProps) => {
  const checkRole = useRoleChecker();

  const [mainManager, setMainManager] = useState<string | undefined>();
  const { data } = useGetUsersQuery(
    { role: "MANAGER" },
    { skip: !checkRole(OUserRole.Admin) }
  );

  const [selectedManager, setSelectedManager] = useState<number | null>(null);
  const [updateManager] = useUpdateManagerDepartmentMutation();

  const resetModalState = () => {
    setMainManager(undefined);
    setSelectedManager(null);
  };

  const handleUpdateManager = async () => {
    await updateManager({
      departmentId: department?.department_id,
      managerId: mainManager,
    })
      .unwrap()
      .then(() => {
        message.success("Manager Updated");
      })
      .catch(() => {
        message.error("Failed to update manager");
      });
    setVisible(false);
  };

  const handleCancel = () => {
    resetModalState();
    setVisible(false);
  };

  return (
    <>
      <Modal
        title='Select Manager'
        visible={visible}
        onOk={() => {
          handleUpdateManager();
          setSelectedManager(null);
        }}
        onCancel={handleCancel}
        width={800}
        className='modal-select-manager'
        okText='Save'
      >
        <div className='select-manager-wrapper'>
          <p className='decribe-select-manager'>
            Select manager for your department
          </p>
          <div className='list-manager'>
            <Divider orientation='left' className='title-manager-list'>
              List Manager
            </Divider>
            <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
              {data?.users
                .filter((user) => user?.department_id === null)
                .map((manager, index) => (
                  <Col className='gutter-row' span={6} key={index}>
                    <div
                      className='item-list-manager'
                      onClick={() => {
                        setSelectedManager(
                          selectedManager === index ? null : index
                        );
                        setMainManager(manager.user_id);
                      }}
                    >
                      <div className='checkbox-select-staff'>
                        <Checkbox checked={selectedManager === index} />
                      </div>
                      <div className='avatar-manager'>
                        <Avatar
                          {...(!manager?.avatar
                            ? {
                                style: {
                                  background: randAvaBg(),
                                  fontSize: "25px",
                                },
                              }
                            : { src: manager.avatar })}
                          size={50}
                        >
                          {!manager?.avatar &&
                            manager?.username?.substring(0, 1).toUpperCase()}
                        </Avatar>
                      </div>
                      <div className='name-manager'>{manager.name}</div>
                    </div>
                  </Col>
                ))}
            </Row>
          </div>
        </div>
      </Modal>
    </>
  );
};
