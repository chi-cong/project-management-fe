import "./account-modal.css";
import { Modal, Tabs } from "antd";
import { UserAdvance, UserInfoForm } from "src/layouts";
import { User, RoleResponse } from "src/share/models";

import type { TabsProps } from "antd";

interface AccountModalProps {
  selectedAcc?: User | null;
  openAccountTab: boolean;
  setOpenAccountTab: (isOpen: boolean) => void;
  action: "detail" | "update" | "create";
}

export const AccountModal = ({
  selectedAcc,
  openAccountTab,
  setOpenAccountTab,
  action,
}: AccountModalProps) => {
  const tabProps: {
    accDetail: TabsProps["items"];
    createAcc: TabsProps["items"];
  } = {
    accDetail: [
      {
        key: "1",
        label: "General",
        children: (
          <UserInfoForm
            action={action}
            {...(selectedAcc !== null ? { initValues: selectedAcc } : {})}
          />
        ),
      },
      {
        key: "2",
        label: "Advanced",
        children: (
          <UserAdvance
            userRole={
              selectedAcc?.role && (selectedAcc.role as RoleResponse).name
            }
            userId={selectedAcc?.user_id}
            userEmail={selectedAcc?.email}
            setOpenAccountTab={setOpenAccountTab}
          />
        ),
      },
    ],
    createAcc: [
      {
        key: "1",
        label: "General",
        children: <UserInfoForm action='create' />,
      },
    ],
  };

  return (
    <Modal
      title={selectedAcc ? " Account Details" : "Create Account"}
      className='account-detail-modal'
      open={openAccountTab}
      onCancel={() => {
        setOpenAccountTab(false);
      }}
      footer={[]}
    >
      <Tabs
        defaultActiveKey='1'
        items={selectedAcc ? tabProps.accDetail : tabProps.createAcc}
        className='account-tab'
      />
    </Modal>
  );
};
