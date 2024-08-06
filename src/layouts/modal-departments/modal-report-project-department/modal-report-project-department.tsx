import React from "react";
import { Modal } from "antd";
type ModalReportProjectDepartmentProps = {
  visible: boolean;
  setVisible: React.Dispatch<React.SetStateAction<boolean>>;
};
export const ModalReportProjectDepartment = ({
  visible,
  setVisible,
}: ModalReportProjectDepartmentProps) => {
  return (
    <>
      <Modal
        title='Report Project'
        open={visible}
        onOk={() => setVisible(false)}
        onCancel={() => setVisible(false)}
        width={800}
        className='modal-report-project-department'
      ></Modal>
    </>
  );
};
