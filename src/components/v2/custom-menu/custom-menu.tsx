import "./custom-menu.css";
import { ReactNode, useEffect, useState } from "react";
import { Typography } from "antd";
import { PlusSquare } from "src/assets/icons";

export interface CustomMenuItem {
  title: string;
  onClick: () => unknown;
  addCallBack?: () => unknown;
  icon?: ReactNode;
}

interface CustomMenuProp {
  items: CustomMenuItem[];
}

export const CustomMenu = ({ items }: CustomMenuProp) => {
  const [selectedItem, setSelectedItem] = useState<number>(0);

  const setDefaultItem = () => {
    const currPath = window.location.pathname.replace(
      "/v2/dashboard/admin/",
      ""
    );

    switch (currPath) {
      case "account":
        setSelectedItem(0);
        break;
      case "departments":
        setSelectedItem(1);
        break;
      default:
        setSelectedItem(2);
    }
  };

  useEffect(() => {
    setDefaultItem();
  }, []);

  return (
    <div className='custom-menu'>
      {items.map((item, index) => {
        return (
          <div
            key={index}
            className={`menu-item ${selectedItem === index && "menu-selected-item"}`}
            onClick={() => {
              setSelectedItem(index);
              item.onClick();
            }}
          >
            <div className='menu-option-content'>
              {item.icon && item.icon}
              <Typography.Text className='item-title'>
                {item.title}
              </Typography.Text>
            </div>
            {item.addCallBack && (
              <div
                className='add-icon'
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
