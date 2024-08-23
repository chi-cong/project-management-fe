import "./custom-staff-menu.css";
import { ReactNode, useEffect, useState } from "react";
import { Typography } from "antd";
import { PlusSquare } from "src/assets/icons";
import { useLocation, useParams } from "react-router-dom";

export interface CustomStaffMenuItem {
  title: string | JSX.Element;
  onClick: () => unknown;
  addCallBack?: () => unknown;
  icon?: ReactNode;
  id?: string;
}

interface CustomStaffMenuProp {
  items: CustomStaffMenuItem[];
}

export const CustomStaffMenu = ({ items }: CustomStaffMenuProp) => {
  const { id } = useParams();

  const location = useLocation();
  const [selectedItem, setSelectedItem] = useState<number>(-1);

  useEffect(() => {
    const setDefaultItem = () => {
      const currPath = window.location.pathname.replace(
        "v2/dashboard/staff/",
        ""
      );

      if (currPath === `/department/${id}` && id) {
        setSelectedItem(0);
      } else {
        const selectedProject = items.findIndex((item) => {
          return item.id === id;
        });
        if (selectedProject) {
          setSelectedItem(selectedProject);
        }
      }
    };
    setDefaultItem();
  }, [id, items, location]);

  return (
    <div className='custom-menu'>
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
