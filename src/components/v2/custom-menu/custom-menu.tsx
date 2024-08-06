import "./custom-menu.css";
import { ReactNode, useState } from "react";
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
