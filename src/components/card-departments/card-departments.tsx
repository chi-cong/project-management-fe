import React from "react";
import { Card, Popconfirm } from "antd";
import {
  TeamOutlined,
  UserOutlined,
  DeleteOutlined,
  QuestionCircleOutlined,
} from "@ant-design/icons";
import "./card-departments.css";
import { useDeleteDepartmentsMutation } from "src/share/services";

type CardDepartmentssProps = {
  title?: string;
  manager?: string;
  onClick?: () => void;
  departmentId?: string;
  staffCount?: number;
  role?: string;
};

export const CardDepartmentss: React.FC<CardDepartmentssProps> = ({
  title,
  manager,
  onClick,
  departmentId,
  staffCount,
  role,
}) => {
  const [deleteDepartment] = useDeleteDepartmentsMutation();

  const handleDeleteClick = async (event: React.MouseEvent<HTMLElement>) => {
    event.stopPropagation();
  };
  const deleteDapartment = async () => {
    await deleteDepartment({ departmentId }).unwrap().then().catch();
  };

  return (
    <>
      <Card
        hoverable
        title={
          <span className="card-department-title">
            {title}
            {role !== "MANAGER" ? (
              <div
                className="icon-delete-department"
                onClick={handleDeleteClick}
              >
                <Popconfirm
                  title="Are you sure to delete this department?"
                  icon={<QuestionCircleOutlined style={{ color: "red" }} />}
                  onConfirm={deleteDapartment}
                >
                  <DeleteOutlined />
                </Popconfirm>
              </div>
            ) : (
              ""
            )}
          </span>
        }
        bordered={false}
        className="card-department"
        onClick={onClick}
      >
        <div className="departments-info">
          <div className="manager-departments-info">
            <UserOutlined /> <p>{manager}</p>
          </div>
          <div className="staff-departments-info">
            <TeamOutlined />
            <p>{staffCount}</p>
          </div>
        </div>
      </Card>
    </>
  );
};
