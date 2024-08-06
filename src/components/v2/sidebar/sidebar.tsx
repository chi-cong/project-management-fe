import "./sidebar.css";
import { Layout, Divider } from "antd";
import { useState } from "react";
import { MultiUser } from "src/assets/icons";
import { CustomMenu, CustomMenuItem } from "src/components/v2/custom-menu";
import { randAvaBg } from "src/share/utils";

const items: CustomMenuItem[] = [
  { title: "Account", onClick() {}, icon: <MultiUser />, addCallBack() {} },
  { title: "Department", onClick() {}, icon: <MultiUser />, addCallBack() {} },
  { title: "Project", onClick() {}, icon: <MultiUser />, addCallBack() {} },
];

export const Sidebar = () => {
  const getSublistNode = () => {
    return (
      <div className='sublist-node' style={{ background: randAvaBg() }}></div>
    );
  };
  const [subList] = useState<CustomMenuItem[]>([
    { title: "Project", onClick() {}, icon: <MultiUser />, addCallBack() {} },
    { title: "Chat app", onClick() {}, icon: getSublistNode() },
    { title: "Project management", onClick() {}, icon: getSublistNode() },
  ]);

  return (
    <Layout.Sider className='sidebar'>
      <CustomMenu items={items} />
      {subList.length > 0 && (
        <>
          <Divider />
          <CustomMenu items={subList} />
        </>
      )}
    </Layout.Sider>
  );
};
