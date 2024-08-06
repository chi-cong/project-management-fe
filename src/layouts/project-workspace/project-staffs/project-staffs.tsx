import "./project-staffs.css";
import { useState } from "react";
import { List, Avatar, Popconfirm, Spin } from "antd";
import {
  useGetDepartmentStaffsQuery,
  useGetProjectStaffsQuery,
} from "src/share/services";

import { randAvaBg } from "src/share/utils";

import { Project } from "src/share/models";

interface ProjectStaffsProps {
  project?: Project;
}

export const ProjectStaffs = ({ project }: ProjectStaffsProps) => {
  const [page, setPage] = useState<number>(1);

  const { data: projectStaffs, isFetching: projectStaffFetch } =
    useGetProjectStaffsQuery(
      {
        projectId: project?.project_id,
        page,
        items_per_page: 5,
      },
      { skip: !project?.project_id }
    );

  const departmentStaffs = useGetDepartmentStaffsQuery(
    {
      departmentId: project?.department_id,
    },
    { skip: !project?.department_id }
  );

  return (
    <div className='project-staffs'>
      <p className='project-section-title'>Staffs</p>
      <Spin spinning={departmentStaffs.isFetching || projectStaffFetch}>
        <List
          pagination={{
            total: projectStaffs?.total,
            pageSize: 5,
            onChange: (currPage) => {
              setPage(currPage);
            },
            showSizeChanger: false,
          }}
          dataSource={projectStaffs?.users}
          renderItem={(user) => {
            return (
              <List.Item
                actions={[
                  <Popconfirm
                    title='Remove from project ?'
                    onConfirm={() => {}}
                  ></Popconfirm>,
                ]}
              >
                <List.Item.Meta
                  avatar={
                    <Avatar
                      {...(user.avatar
                        ? { src: user.avatar }
                        : { style: { background: randAvaBg() } })}
                    >
                      {!user.avatar && user.username!.substring(0, 1)}
                    </Avatar>
                  }
                  title={user.username}
                  description={user.email}
                />
              </List.Item>
            );
          }}
        />
      </Spin>
    </div>
  );
};
