import "./user-department-ui.css";
import { Typography, List, Card, Tag, Avatar } from "antd";
import {
  useGetDepartmentProjectInfoQuery,
  useGetUserDepartmentStaffsQuery,
} from "src/share/services";

import type { Department, User } from "src/share/models";
import { randAvaBg } from "src/share/utils";

interface UserDepartmentUiProp {
  department: Department;
  manager: User;
}

export const UserDepartmentUi = ({
  department,
  manager,
}: UserDepartmentUiProp) => {
  const { data: projects } = useGetDepartmentProjectInfoQuery({
    departmentId: department.department_id,
  });
  const { data: departmentStaffs } = useGetUserDepartmentStaffsQuery({
    itemsPerPage: "ALL",
  });
  return (
    <div className='user-department-ui'>
      <div className='user-depart-header'>
        <Typography.Title level={2}>{department?.name}</Typography.Title>
        <Typography.Title level={4}>{department?.description}</Typography.Title>
      </div>
      <section className='manager-info'>
        <Typography.Title level={5}>Manager</Typography.Title>
        <Card className='department-manager-card'>
          <Card.Meta
            avatar={
              <Avatar
                size={32}
                {...(manager?.avatar
                  ? { src: manager.avatar }
                  : { style: { background: randAvaBg(), fontSize: 16 } })}
              >
                {!manager?.avatar &&
                  manager?.username?.substring(0, 1).toUpperCase()}
              </Avatar>
            }
            title={manager.username}
            description={manager.email}
          />
        </Card>
      </section>
      <section className='user-depart-main'>
        <div className='user-depart-main-part'>
          <Typography.Title level={5}>Staffs</Typography.Title>
          <List
            dataSource={departmentStaffs?.users}
            renderItem={(user, index) => [
              <List.Item key={index}>
                <List.Item.Meta
                  avatar={
                    <Avatar
                      size={32}
                      {...(user?.avatar
                        ? { src: user.avatar }
                        : { style: { background: randAvaBg(), fontSize: 16 } })}
                    >
                      {!user?.avatar &&
                        user?.username?.substring(0, 1).toUpperCase()}
                    </Avatar>
                  }
                  title={user.username}
                  description={user.email}
                />
              </List.Item>,
            ]}
          />
        </div>
        <div className='user-depart-main-part'>
          <Typography.Title level={5}>Projects</Typography.Title>
          <List
            dataSource={projects?.data}
            renderItem={(project, index) => [
              <List.Item key={index}>
                <List.Item.Meta
                  title={
                    <>
                      {project.name} - <Tag>{project.projectCode}</Tag>
                    </>
                  }
                  description={project.description}
                />
              </List.Item>,
            ]}
          />
        </div>
      </section>
    </div>
  );
};
