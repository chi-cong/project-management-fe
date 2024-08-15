import "./custom-staff-menu.css";
import { ReactNode, useEffect, useState } from "react";
import { Typography } from "antd";
import { PlusSquare } from "src/assets/icons";

export interface CustomStaffMenuItem {
  title: string | JSX.Element;
  onClick: () => unknown;
  addCallBack?: () => unknown;
  icon?: ReactNode;
}

interface CustomStaffMenuProp {
  items: CustomStaffMenuItem[];
  defaultSelectedItem: number;
}

export const CustomStaffMenu = ({ items }: CustomStaffMenuProp) => {
  const [selectedItem, setSelectedItem] = useState<number>(0);

  const setDefaultItem = () => {
    const currPath = window.location.pathname.replace(
      "v2/dashboard/admin/",
      ""
    );

    switch (currPath) {
      case "accounts":
        setSelectedItem(0);
        break;
      case "departments":
        setSelectedItem(1);
        break;
      case "projects":
        setSelectedItem(2);
        break;
      default:
        setSelectedItem(10);
    }
  };

  useEffect(() => {
    setDefaultItem();
  }, []);

  return (
    <div className="custom-menu">
      {items.map((item, index) => {
        const isDisabled = item.title === "Project";
        return (
          <div
            key={index}
            className={`menu-item ${selectedItem === index && "menu-selected-item"} ${isDisabled ? "menu-disabled" : ""}`}
            onClick={() => {
              if (!isDisabled) {
                setSelectedItem(index);
                item.onClick();
              }
            }}
          >
            <div className="menu-option-content">
              {item.icon && item.icon}
              <Typography.Text className="item-title">
                {item.title}
              </Typography.Text>
            </div>
            {item.addCallBack && (
              <div
                className="add-icon"
                onClick={() => {
                  item.addCallBack!();
                }}
              >
                <PlusSquare />
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};
